import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestDecision {
  requestId: string;
  requestType: "rental" | "provider";
  status: "approved" | "rejected";
  adminNotes?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { requestId, requestType, status, adminNotes }: RequestDecision = await req.json();

    console.log(`Processing ${requestType} request ${requestId} - ${status}`);

    // Update the appropriate table based on request type
    const tableName = requestType === "rental" ? "rental_requests" : "providers";
    
    const { data: requestData, error: updateError } = await supabase
      .from(tableName)
      .update({
        status,
        response_date: new Date().toISOString(),
        admin_notes: adminNotes || null,
      })
      .eq("id", requestId)
      .select()
      .single();

    if (updateError) {
      console.error("Update error:", updateError);
      throw updateError;
    }

    // Fetch user profile to get email
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("user_id", requestData.user_id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      throw profileError;
    }

    if (!profile?.email) {
      console.log("No email found for user, skipping notification");
      return new Response(
        JSON.stringify({ success: true, message: "Status updated (no email)" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate email content based on request type and status
    const requestTypeName = requestType === "rental" ? "Equipment Rental" : "Provider Registration";
    const itemName = requestType === "rental" 
      ? requestData.equipment_name 
      : requestData.company_name;

    const subject = `${requestTypeName} Request ${status === "approved" ? "Approved" : "Rejected"}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: ${status === "approved" ? "#10b981" : "#ef4444"};">
          Request ${status === "approved" ? "Approved" : "Rejected"}
        </h1>
        <p>Dear ${profile.full_name || "User"},</p>
        <p>Your ${requestTypeName.toLowerCase()} request has been <strong>${status}</strong>.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Request Details</h3>
          <p><strong>Type:</strong> ${requestTypeName}</p>
          <p><strong>${requestType === "rental" ? "Equipment" : "Company"}:</strong> ${itemName}</p>
          ${requestType === "rental" ? `<p><strong>Price:</strong> $${requestData.equipment_price}/day</p>` : ""}
          <p><strong>Status:</strong> ${status.toUpperCase()}</p>
          ${adminNotes ? `<p><strong>Admin Notes:</strong> ${adminNotes}</p>` : ""}
        </div>

        ${status === "approved" 
          ? `<p>Congratulations! ${requestType === "rental" 
              ? "You can now proceed with your equipment rental. Our team will contact you shortly with further details." 
              : "Welcome to our provider network! You can now start listing your equipment."}</p>` 
          : `<p>Unfortunately, your request could not be approved at this time. ${adminNotes ? "Please review the admin notes above." : "If you have any questions, please contact our support team."}</p>`
        }
        
        <p style="margin-top: 30px;">Best regards,<br>CropMate Team</p>
      </div>
    `;

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "CropMate <onboarding@resend.dev>",
      to: [profile.email],
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailSent: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in handle-request-decision function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
