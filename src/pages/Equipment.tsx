import { useState } from 'react';
import { EquipmentCard } from '@/components/EquipmentCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

// Import equipment images
import tractorImg from '@/assets/tractor.jpg';
import harvesterImg from '@/assets/harvester.jpg';
import tillerImg from '@/assets/tiller.jpg';
import rotavatorImg from '@/assets/rotavator.jpg';
import seedDrillImg from '@/assets/seed-drill.jpg';
import sprayerImg from '@/assets/sprayer.jpg';
import threshingImg from '@/assets/threshing-machine.jpg';
import fertilizerImg from '@/assets/fertilizer-spreader.jpg';
import weederImg from '@/assets/weeder.jpg';
import grainDryerImg from '@/assets/grain-dryer.jpg';

const equipmentData = [
  {
    name: 'Tractor',
    image: tractorImg,
    price: '₹1,500',
    description: 'Heavy-duty tractor for plowing and field preparation',
    availableSlots: ['6:00 AM - 12:00 PM', '2:00 PM - 6:00 PM', 'Tomorrow 8:00 AM'],
    location: 'Bangalore, Karnataka',
    category: 'Heavy Equipment'
  },
  {
    name: 'Harvester',
    image: harvesterImg,
    price: '₹2,500',
    description: 'Combine harvester for wheat, rice, and grain crops',
    availableSlots: ['5:00 AM - 11:00 AM', 'Day after tomorrow', 'Next week'],
    location: 'Mysore, Karnataka',
    category: 'Heavy Equipment'
  },
  {
    name: 'Tiller',
    image: tillerImg,
    price: '₹600',
    description: 'Soil cultivation and seedbed preparation equipment',
    availableSlots: ['8:00 AM - 2:00 PM', '4:00 PM - 8:00 PM'],
    location: 'Hassan, Karnataka',
    category: 'Soil Preparation'
  },
  {
    name: 'Rotavator',
    image: rotavatorImg,
    price: '₹800',
    description: 'Rotary tillage equipment for soil mixing and preparation',
    availableSlots: ['6:00 AM - 12:00 PM', 'Tomorrow morning'],
    location: 'Tumkur, Karnataka',
    category: 'Soil Preparation'
  },
  {
    name: 'Automatic Seed Drill',
    image: seedDrillImg,
    price: '₹800',
    description: 'Precision seeding equipment for optimal crop establishment',
    availableSlots: ['7:00 AM - 1:00 PM', '3:00 PM - 7:00 PM'],
    location: 'Mandya, Karnataka',
    category: 'Seeding'
  },
  {
    name: 'Sprayer',
    image: sprayerImg,
    price: '₹400',
    description: 'Crop protection and fertilizer application equipment',
    availableSlots: ['Early morning', 'Evening 5:00 PM - 8:00 PM'],
    location: 'Belgaum, Karnataka',
    category: 'Crop Protection'
  },
  {
    name: 'Threshing Machine',
    image: threshingImg,
    price: '₹1,200',
    description: 'Grain separation and processing equipment',
    availableSlots: ['9:00 AM - 5:00 PM', 'Next week available'],
    location: 'Hubli, Karnataka',
    category: 'Post Harvest'
  },
  {
    name: 'Fertilizer Spreader',
    image: fertilizerImg,
    price: '₹500',
    description: 'Uniform fertilizer distribution equipment',
    availableSlots: ['6:00 AM - 10:00 AM', '4:00 PM - 7:00 PM'],
    location: 'Chitradurga, Karnataka',
    category: 'Fertilization'
  },
  {
    name: 'Weeder',
    image: weederImg,
    price: '₹300',
    description: 'Weed control and crop cultivation equipment',
    availableSlots: ['7:00 AM - 11:00 AM', '2:00 PM - 6:00 PM'],
    location: 'Shimoga, Karnataka',
    category: 'Crop Maintenance'
  },
  {
    name: 'Grain Dryer',
    image: grainDryerImg,
    price: '₹1,800',
    description: 'Post-harvest grain drying and preservation equipment',
    availableSlots: ['10:00 AM - 6:00 PM', 'Tomorrow full day'],
    location: 'Raichur, Karnataka',
    category: 'Post Harvest'
  }
];

const categories = [
  'All Categories',
  'Heavy Equipment',
  'Soil Preparation',
  'Seeding',
  'Crop Protection',
  'Fertilization',
  'Crop Maintenance',
  'Post Harvest'
];

export default function Equipment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData);

  const handleSearch = () => {
    let filtered = equipmentData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredEquipment(filtered);
  };

  // Trigger search on input change
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    // Auto-search as user types
    let filtered = equipmentData;
    if (value) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.location.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    setFilteredEquipment(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    let filtered = equipmentData;
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category && category !== 'All Categories') {
      filtered = filtered.filter(item => item.category === category);
    }
    setFilteredEquipment(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-earth py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Equipment Catalog</h1>
            <p className="text-lg text-muted-foreground">Find the perfect agricultural equipment for your farming needs</p>
          </div>
          
          {/* Search and Filter */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filter Equipment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by equipment name, location, or description..."
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch} variant="hero">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Available Equipment ({filteredEquipment.length})
            </h2>
            <div className="text-sm text-muted-foreground">
              Showing {filteredEquipment.length} of {equipmentData.length} items
            </div>
          </div>
          
          {filteredEquipment.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEquipment.map((equipment, index) => (
                <EquipmentCard 
                  key={index} 
                  name={equipment.name}
                  image={equipment.image}
                  price={equipment.price}
                  availableSlots={equipment.availableSlots}
                  description={equipment.description}
                  location={equipment.location}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-foreground mb-2">No Equipment Found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
                setFilteredEquipment(equipmentData);
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}