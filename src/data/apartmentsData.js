export const apartmentsData = [
  {
    id: 1,
    code: 'GKL',
    name: 'Grand Kamala Lagoon',
    location: 'Bekasi',
    address: 'Jl Chandrabhaga, RT.006/RW.003, Pekayon Jaya, Kec. Bekasi Sel., Kota Bks, Jawa Barat 17148',
    about: 'Luxurious stay with lagoon views. Modern apartments with swimming pool access and 24-hour security.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    unitsList: [
      {
        id: 'gkl-studio',
        name: 'Studio',
        capacity: 'Maks. 2 tamu',
        available: 5,
        price: 'Rp 350.000',
        priceNumber: 350000,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        about: 'Compact studio apartment perfect for solo travelers or couples.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Water Heater', type: 'heater' },
          { name: 'Kitchen', type: 'kitchen' },
          { name: 'Balcony', type: 'balcony' },
          { name: 'Pool Access', type: 'pool' },
          { name: 'Gym Access', type: 'gym' },
          { name: 'Parking', type: 'parking' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 350.000' },
          { label: '3 Jam', price: 'Rp 150.000' },
          { label: '6 Jam', price: 'Rp 200.000' },
          { label: '12 Jam', price: 'Rp 300.000' },
          { label: '24 Jam', price: 'Rp 400.000' }
        ],
        weekendExtra: '+Rp 50.000'
      },
      {
        id: 'gkl-2br',
        name: '2 Bedroom',
        capacity: 'Maks. 4 tamu',
        available: 3,
        price: 'Rp 550.000',
        priceNumber: 550000,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        about: 'Spacious two bedroom apartment with scenic lagoon view and master suite.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Water Heater', type: 'heater' },
          { name: 'Kitchen', type: 'kitchen' },
          { name: 'Balcony', type: 'balcony' },
          { name: 'Pool Access', type: 'pool' },
          { name: 'Gym Access', type: 'gym' },
          { name: 'Parking', type: 'parking' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 550.000' },
          { label: '3 Jam', price: 'Rp 250.000' },
          { label: '6 Jam', price: 'Rp 350.000' },
          { label: '12 Jam', price: 'Rp 450.000' },
          { label: '24 Jam', price: 'Rp 600.000' }
        ],
        weekendExtra: '+Rp 75.000'
      }
    ]
  },
  {
    id: 2,
    code: 'TJ',
    name: 'Transpark Juanda',
    location: 'Bekasi',
    address: 'Jl. Ir. H. Juanda No.180, Margahayu, Kec. Bekasi Tim., Kota Bks, Jawa Barat 17113',
    about: 'Integrated resort living with Snow World, Water Park, and modern shopping mall facilities.',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
    unitsList: [
      {
        id: 'tj-studio',
        name: 'Studio Cozy',
        capacity: 'Maks. 2 tamu',
        available: 6,
        price: 'Rp 320.000',
        priceNumber: 320000,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        about: 'Modern studio with direct access to Transpark Mall and waterpark view.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Water Heater', type: 'heater' },
          { name: 'Kitchen', type: 'kitchen' },
          { name: 'Pool Access', type: 'pool' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 320.000' },
          { label: '3 Jam', price: 'Rp 140.000' },
          { label: '6 Jam', price: 'Rp 190.000' },
          { label: '12 Jam', price: 'Rp 280.000' },
          { label: '24 Jam', price: 'Rp 380.000' }
        ],
        weekendExtra: '+Rp 40.000'
      },
      {
        id: 'tj-2br',
        name: '2 Bedroom Executive',
        capacity: 'Maks. 4 tamu',
        available: 4,
        price: 'Rp 520.000',
        priceNumber: 520000,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        about: 'Executive suite with dual bedrooms and modern kitchen set.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Water Heater', type: 'heater' },
          { name: 'Kitchen', type: 'kitchen' },
          { name: 'Balcony', type: 'balcony' },
          { name: 'Pool Access', type: 'pool' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 520.000' },
          { label: '3 Jam', price: 'Rp 230.000' },
          { label: '6 Jam', price: 'Rp 330.000' },
          { label: '12 Jam', price: 'Rp 430.000' },
          { label: '24 Jam', price: 'Rp 580.000' }
        ],
        weekendExtra: '+Rp 60.000'
      }
    ]
  },
  {
    id: 3,
    code: 'ME',
    name: 'Meikarta',
    location: 'Cikarang',
    address: 'Central Park Meikarta, Jayamukti, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530',
    about: 'Futuristic apartment township surrounded by Central Park lake and international dining spots.',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80',
    unitsList: [
      {
        id: 'me-studio',
        name: 'Studio Deluxe',
        capacity: 'Maks. 2 tamu',
        available: 8,
        price: 'Rp 280.000',
        priceNumber: 280000,
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
        about: 'Clean, minimalist studio overlooking the central park lake.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Kitchen', type: 'kitchen' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 280.000' },
          { label: '3 Jam', price: 'Rp 120.000' },
          { label: '6 Jam', price: 'Rp 170.000' },
          { label: '12 Jam', price: 'Rp 240.000' },
          { label: '24 Jam', price: 'Rp 330.000' }
        ],
        weekendExtra: '+Rp 35.000'
      }
    ]
  },
  {
    id: 4,
    code: 'GPS',
    name: 'Gunung Putri Square',
    location: 'Bogor',
    address: 'Jl. Raya Tlajung Udik No.90, Cicadas, Gunung Putri, Bogor, Jawa Barat 16964',
    about: 'Serene living in Bogor surrounded by lush green hills and cool fresh air.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    unitsList: [
      {
        id: 'gps-studio',
        name: 'Studio View Gunung',
        capacity: 'Maks. 2 tamu',
        available: 4,
        price: 'Rp 290.000',
        priceNumber: 290000,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
        about: 'Cozy studio apartment with balcony view of Mount Salak.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Water Heater', type: 'heater' },
          { name: 'Balcony', type: 'balcony' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 290.000' },
          { label: '3 Jam', price: 'Rp 130.000' },
          { label: '6 Jam', price: 'Rp 180.000' },
          { label: '12 Jam', price: 'Rp 250.000' },
          { label: '24 Jam', price: 'Rp 340.000' }
        ],
        weekendExtra: '+Rp 40.000'
      }
    ]
  },
  {
    id: 5,
    code: 'SS',
    name: 'Springlake Summarecon',
    location: 'Bekasi',
    address: 'Jl. Boulevard Ahmad Yani, Marga Mulya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17142',
    about: 'Premium lake-front residence integrated with Summarecon Mall Bekasi.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    unitsList: [
      {
        id: 'ss-studio',
        name: 'Studio Premium',
        capacity: 'Maks. 2 tamu',
        available: 5,
        price: 'Rp 360.000',
        priceNumber: 360000,
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        about: 'Luxury interior finish with direct bridge to Summarecon Mall.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Water Heater', type: 'heater' },
          { name: 'Kitchen', type: 'kitchen' },
          { name: 'Pool Access', type: 'pool' },
          { name: 'Gym Access', type: 'gym' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 360.000' },
          { label: '3 Jam', price: 'Rp 160.000' },
          { label: '6 Jam', price: 'Rp 220.000' },
          { label: '12 Jam', price: 'Rp 310.000' },
          { label: '24 Jam', price: 'Rp 420.000' }
        ],
        weekendExtra: '+Rp 50.000'
      }
    ]
  },
  {
    id: 6,
    code: 'VIC',
    name: 'Vasanta Inopark Cibitung',
    location: 'Bekasi',
    address: 'Jl. MM2100, Gandamekar, Cikarang Barat, Kabupaten Bekasi, Jawa Barat 17530',
    about: 'Japanese-style eco-township inside MM2100 industrial area.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    unitsList: [
      {
        id: 'vic-studio',
        name: 'Studio Japanese Style',
        capacity: 'Maks. 2 tamu',
        available: 3,
        price: 'Rp 310.000',
        priceNumber: 310000,
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
        about: 'Zen design studio with smart home lock and Japanese garden view.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Water Heater', type: 'heater' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 310.000' },
          { label: '3 Jam', price: 'Rp 135.000' },
          { label: '6 Jam', price: 'Rp 195.000' },
          { label: '12 Jam', price: 'Rp 275.000' },
          { label: '24 Jam', price: 'Rp 370.000' }
        ],
        weekendExtra: '+Rp 45.000'
      }
    ]
  },
  {
    id: 7,
    code: 'SB',
    name: 'Sentra Barat',
    location: 'Jakarta',
    address: 'Jl. Sentra Barat No.1, Puri Kembangan, Jakarta Barat 11610',
    about: 'Strategic West Jakarta location near Puri Indah Mall and airport toll road.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    unitsList: [
      {
        id: 'sb-studio',
        name: 'Studio Executive',
        capacity: 'Maks. 2 tamu',
        available: 7,
        price: 'Rp 400.000',
        priceNumber: 400000,
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
        about: 'Modern business studio with high-speed internet and city skyline view.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Water Heater', type: 'heater' },
          { name: 'Kitchen', type: 'kitchen' },
          { name: 'Pool Access', type: 'pool' },
          { name: 'Gym Access', type: 'gym' },
          { name: 'Parking', type: 'parking' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 400.000' },
          { label: '3 Jam', price: 'Rp 180.000' },
          { label: '6 Jam', price: 'Rp 250.000' },
          { label: '12 Jam', price: 'Rp 350.000' },
          { label: '24 Jam', price: 'Rp 480.000' }
        ],
        weekendExtra: '+Rp 60.000'
      }
    ]
  },
  {
    id: 8,
    code: 'PRB',
    name: 'Puncak Resort Bogor',
    location: 'Bogor',
    address: 'Jl. Raya Puncak Gadog Km.84, Cisarua, Bogor, Jawa Barat 16750',
    about: 'Villa-style resort apartment with cool mountain climate and private tea garden views.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    unitsList: [
      {
        id: 'prb-2br',
        name: '2 Bedroom Villa Suite',
        capacity: 'Maks. 5 tamu',
        available: 6,
        price: 'Rp 650.000',
        priceNumber: 650000,
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        about: 'Spacious resort suite with fireplace, mountain view terrace, and BBQ area.',
        facilities: [
          { name: 'WiFi', type: 'wifi' },
          { name: 'AC', type: 'ac' },
          { name: 'TV', type: 'tv' },
          { name: 'Refrigerator', type: 'fridge' },
          { name: 'Water Heater', type: 'heater' },
          { name: 'Kitchen', type: 'kitchen' },
          { name: 'Balcony', type: 'balcony' },
          { name: 'Pool Access', type: 'pool' },
          { name: 'Parking', type: 'parking' }
        ],
        pricingBreakdown: [
          { label: 'Per Malam', price: 'Rp 650.000' },
          { label: '3 Jam', price: 'Rp 300.000' },
          { label: '6 Jam', price: 'Rp 420.000' },
          { label: '12 Jam', price: 'Rp 550.000' },
          { label: '24 Jam', price: 'Rp 750.000' }
        ],
        weekendExtra: '+Rp 100.000'
      }
    ]
  }
];
