export const categories = [
  {
    id: "services",
    name: "Services",
    icon: "Wrench",
    subcategories: [
      {
        id: "electrician",
        name: "Electrician",
        services: ["Home wiring", "Switch/light repair", "Fan/AC installation"],
      },
      {
        id: "plumber",
        name: "Plumber",
        services: ["Pipe leakage fix", "Tap/sink fittings", "Bathroom setup"],
      },
      {
        id: "cctv-services",
        name: "CCTV Services",
        services: ["CCTV installation", "Repair/maintenance", "Network setup"],
      },
      {
        id: "carpenter",
        name: "Carpenter",
        services: ["Furniture making", "Door/window repair", "Woodwork"],
      },
      {
        id: "painter",
        name: "Painter",
        services: ["House painting", "Wall texture", "Polish/finishing"],
      },
      {
        id: "sofa-designer",
        name: "Sofa Designer",
        services: ["Custom sofa making", "Repair/upholstery", "Cushion design"],
      },
      {
        id: "raj-mistiri",
        name: "Raj Mistiri",
        services: ["Mason work", "Construction", "Site supervision"],
      },
      {
        id: "electronic-repair",
        name: "Electronic Gadget Repair",
        services: ["Mobile repair", "Laptop/PC repair", "TV/AC/Fridge service"],
      },
      {
        id: "sweepers",
        name: "Sweepers",
        services: ["Home cleaning", "Office cleaning", "Deep cleaning"],
      },
      {
        id: "babysitter",
        name: "Babysitter",
        services: ["Infant care", "Daycare services", "Full-time/part-time"],
      },
      {
        id: "barber",
        name: "Barber",
        services: ["Haircut", "Beard trim", "Home visit grooming"],
      },
      {
        id: "masseur",
        name: "Masseur",
        services: ["Body massage", "Head massage", "Home service"],
      },
      {
        id: "nurse",
        name: "Nurse",
        services: ["Home nurse", "Elderly care", "Post-surgery care"],
      },
      {
        id: "two-wheeler-taxi",
        name: "Two-Wheeler Taxi",
        services: ["Local rides", "Delivery support", "On-demand rides"],
      },
      {
        id: "car-taxi-booking",
        name: "Car/Taxi Booking",
        services: [
          "Local taxi",
          "Airport transfer",
          "Outstation booking",
          "Hourly rental",
        ],
      },
      {
        id: "bike-rental",
        name: "Bike/Two-Wheeler Rental",
        services: [
          "Daily rental",
          "Weekly rental",
          "Monthly rental",
          "Tourist packages",
        ],
      },
      {
        id: "food-delivery",
        name: "Food Delivery",
        services: ["Restaurant delivery", "Tiffin service", "Local kitchens"],
      },
      {
        id: "product-delivery",
        name: "Product Delivery",
        services: [
          "Document delivery",
          "Parcel pickup/drop",
          "Business courier",
        ],
      },
      {
        id: "mochi",
        name: "Mochi (Shoe Repair)",
        services: ["Sole stitching", "Heel/zip fix", "Bag/sandal repair"],
      },
      {
        id: "loan-finance-consultant",
        name: "Loan And Finance Consultant",
        services: [
          "Personal loans",
          "Business loans",
          "Investment advice",
          "Financial planning",
          "Insurance policies",
          "Tax consultation",
        ],
      },
    ],
  },
  {
    id: "advertisements",
    name: "Advertisements",
    icon: "Megaphone",
    subcategories: [
      {
        id: "jobs",
        name: "Jobs",
        services: ["Local hiring", "Part-time/full-time"],
      },
      {
        id: "room-rent",
        name: "Room Rent",
        services: ["Single/shared rooms", "Flats for rent"],
      },
      {
        id: "hotels",
        name: "Hotels",
        services: ["Budget/premium hotels", "Homestays"],
      },
      {
        id: "restaurants",
        name: "Restaurants",
        services: ["Dine-in", "Takeaway", "Local cuisines"],
      },
      {
        id: "land",
        name: "Land",
        services: ["Residential/commercial", "For sale/lease"],
      },
      { id: "cars", name: "Cars", services: ["Used/new cars", "Dealerships"] },
      {
        id: "gadgets",
        name: "Gadgets",
        services: ["Mobile phones", "Laptops", "Accessories"],
      },
      {
        id: "lease-flats",
        name: "Lease Flats",
        services: ["Furnished/unfurnished", "1BHK/2BHK/studio"],
      },
      {
        id: "shoes",
        name: "Shoes",
        services: ["Casual/formal", "Men/women/kids"],
      },
      {
        id: "clothes",
        name: "Clothes",
        services: ["Ethnic wear", "Western wear", "Seasonal fashion"],
      },
      {
        id: "pharmacy",
        name: "Pharmacy",
        services: ["Medicines", "Baby care/health essentials"],
      },
      {
        id: "meat",
        name: "Meat",
        services: ["Chicken/mutton/pork", "Fresh/local cuts"],
      },
      {
        id: "groceries",
        name: "Groceries",
        services: ["Daily needs", "Organic items", "Home delivery"],
      },
      {
        id: "books",
        name: "Books",
        services: ["Academic", "Novels/stationery"],
      },
      {
        id: "local-food",
        name: "Local Food",
        services: ["Homemade snacks", "Pickles/traditional food"],
      },
      {
        id: "flowers",
        name: "Flowers",
        services: ["Bouquets", "Puja flowers", "Event decor"],
      },
    ],
  },
];

export const locations = [
  "MG Marg",
  "Tadong",
  "Deorali",
  "Sichey",
  "Ranipool",
  "Development Area",
  "Tibet Road",
  "Ridge Park",
  "Arithang",
  "Bojoghari",
];

export const topCategories = [
  // PRODUCTS (8) - Things you buy, rent, or acquire
  {
    id: "electronic-repair",
    name: "Gadget Repair",
    icon: "Smartphone",
    count: "25+ shops",
  },
  {
    id: "groceries",
    name: "Groceries",
    icon: "ShoppingCart",
    count: "60+ stores",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    icon: "Pill",
    count: "25+ pharmacies",
  },
  {
    id: "hotels",
    name: "Hotels",
    icon: "Hotel",
    count: "45+ hotels",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    icon: "UtensilsCrossed",
    count: "80+ restaurants",
  },
  {
    id: "room-rent",
    name: "Room Rent",
    icon: "Home",
    count: "150+ listings",
  },
  {
    id: "jobs",
    name: "Jobs",
    icon: "Briefcase",
    count: "200+ openings",
  },
  {
    id: "bike-rental",
    name: "Bike Rental",
    icon: "Bike",
    count: "25+ providers",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "Shirt",
    count: "35+ stores",
  },

  // SERVICES (8) - Professional work someone does for you
  {
    id: "electrician",
    name: "Electrician",
    icon: "Zap",
    count: "150+ providers",
  },
  {
    id: "plumber",
    name: "Plumber",
    icon: "Droplets",
    count: "120+ providers",
  },
  {
    id: "cctv-services",
    name: "CCTV Services",
    icon: "Camera",
    count: "35+ providers",
  },
  {
    id: "carpenter",
    name: "Carpenter",
    icon: "Hammer",
    count: "90+ providers",
  },
  {
    id: "car-taxi-booking",
    name: "Car/Taxi Booking",
    icon: "Car",
    count: "40+ services",
  },
  {
    id: "barber",
    name: "Barber",
    icon: "Scissors",
    count: "30+ salons",
  },
  {
    id: "sweepers",
    name: "Cleaning",
    icon: "Trash2",
    count: "40+ services",
  },
  {
    id: "painter",
    name: "Painter",
    icon: "Paintbrush",
    count: "45+ painters",
  },
  {
    id: "job-providers",
    name: "Job Providers",
    icon: "Briefcase",
    count: "50+ companies",
  },
  {
    id: "job-training",
    name: "On Job Training",
    icon: "GraduationCap",
    count: "30+ programs",
  },
  {
    id: "loan-finance-consultant",
    name: "Loan & Finance",
    icon: "CreditCard",
    count: "15+ consultants",
  },
];
