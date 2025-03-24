export const mockStores = [
  {
    id: "9",
    name: "1113-ABBOTSFORD W, BC",
    status: "Active",
    province: "Ontario",
    region: "2",
    location: {
      address: "2000 Finch Ave",
      city: "Toronto",
      postalCode: "M2N 5V7",
      coordinates: { lat: 43.7749, lng: -79.331 },
      market: "1",
      banner: "Supercenter",
      originalGoDate: "March 15, 2005",
      originalGoFY: "2005",
      scGoDate: "February 10, 2017",
      scGoFY: "2017",
      scType: "SC-IB",
      ageOfBox: 17.5,
      lastTouchProjectYear: "FY22",
      lastTouchType: "RM-Light",
      lastTouchStatus: "Last Touch",
      lastTouchGoDate: "September 15, 2021",
      template: "60k",
      totalStoreSqft: 92000,
      acquisitionHistory: "N/A",
      storeFormatBN: false,
      storeFormatBCN: true,
      storeFormatDiv1: false,
      storeFormatSC: true,
    },
    building: {
      size: 92000,
      floors: 2,
      yearBuilt: 2005,
      lastRenovated: 2021,
      ownedVsLeased: "Owned",
      mallStore: false,
      mallEntrances: 0,
      securityEntranceGates: 1,
      shoppingCentreType: "Regional",
      assetProtectionSecurityRoom: "Present",
      hasBasement: true,
      receivingOnDifferentFloor: false,
      hasMezzanine: true,
      freightElevators: 1,
      customerElevatorLocation: "Centre",
      verticalTransportation: "Elevators",
      hasShoppingCartMovator: true,
      cartCorral: "Interior",
    },
    site: {
      parkingSpaces: 200,
      accessibility: ["Accessible", "Expecting Mother", "Green Parking"],
      accessibleSpaces: 8,
      expectingMotherSpaces: 4,
      greenParkingSpaces: 10,
      chargingStations: 2,
      cartCorralExterior: "Covered",
      parkingLocation: "Underground",
      hoursOfOperation: "Mon-Sun: 7AM-11PM",
    },
    salesFloor: {
      size: 50000,
      departments: [
        "Grocery",
        "Produce",
        "Bakery",
        "Meat",
        "Seafood",
        "Dairy",
        "Apparel",
        "Shoes",
        "Pharmacy",
        "Electronics",
      ],
      checkoutCounters: 20,
      foodLocation: "A",
      flooring: "Concrete (gray)",
      woodgrainType: "Apparel/Shoes/Pharmacy",
      hasGardenCenter: false,
      gardenCenterType: "N/A",
      hasHoseBib: true,
    },
    food: {
      hasRestaurant: true,
      hasBakery: true,
      bakeryLocation: "Front",
      hasDelicatessen: true,
      hasSushi: true,
      sushiVendor: "SushiCo",
      hasServiceDeli: true,
      hasDeliHMRScreens: true,
      specialtyFoods: ["Organic", "Local", "Vegan"],
    },
    pharmacy: {
      isPresent: true,
      hasClinic: true,
      location: "Front",
      tier: "2",
      hasSeating: true,
      consultationRooms: 2,
      services: [
        "Vaccinations",
        "Medication Reviews",
        "Health Consultations",
        "Prescription Refills",
        "Flu Shots",
      ],
    },
    marketing: {
      promotions: ["Digital App", "Loyalty Program", "Digital Coupons"],
      specialEvents: ["Seasonal Sales", "Community Events"],
      demographics: "Urban Professionals",
      hasMinale: true,
      hasEnchilada: true,
      hasSwipeUp: true,
      hasPreMinale: false,
      hasLitFittingRoom: true,
    },
    backroom: {
      size: 15000,
      hasLoadingDock: true,
      loadingDocks: 3,
      receivingAreas: 2,
      ceilingHeight: "18'-0\"",
      hasMultiHeightCeiling: true,
      highSteelPalletSpots: 100,
      cagesLockups: 2,
      cblTerminals: 3,
      storageCapacity: "High",
      securityFeatures: ["CCTV", "Alarm System", "Security Personnel"],
    },
    omni: {
      parkingSpaces: 15,
      orangeBranding: "GM",
      directAccess: 2,
      vanLoading: 2,
      hasMobileCheckIn: true,
      mobileCheckInType: "Bollards",
    },
  },
  {
    id: "11",
    name: "1000-MILTON, ON",
    status: "Inactive",
    province: "Alberta",
    region: "3",
    location: {
      address: "3000 4th St SW",
      city: "Calgary",
      postalCode: "T2P 0J7",
      coordinates: { lat: 51.0447, lng: -114.0719 },
      market: "2",
      banner: "Supercenter",
      originalGoDate: "June 10, 2006",
      originalGoFY: "2006",
      scGoDate: "March 5, 2018",
      scGoFY: "2018",
      scType: "SC-IB",
      ageOfBox: 16.2,
      lastTouchProjectYear: "FY21",
      lastTouchType: "RM-Ultra Light",
      lastTouchStatus: "Last Touch",
      lastTouchGoDate: "August 20, 2020",
      template: "55k",
      totalStoreSqft: 78000,
      acquisitionHistory: "N/A",
      storeFormatBN: true,
      storeFormatBCN: false,
      storeFormatDiv1: true,
      storeFormatSC: false,
    },
    building: {
      size: 78000,
      floors: 1,
      yearBuilt: 2006,
      lastRenovated: 2020,
      ownedVsLeased: "Leased",
      mallStore: true,
      mallEntrances: 2,
      securityEntranceGates: 1,
      shoppingCentreType: "Mall",
      assetProtectionSecurityRoom: "Present",
      hasBasement: false,
      receivingOnDifferentFloor: false,
      hasMezzanine: false,
      freightElevators: 0,
      customerElevatorLocation: "N/A",
      verticalTransportation: "Escalators",
      hasShoppingCartMovator: false,
      cartCorral: "Exterior",
    },
    site: {
      parkingSpaces: 100,
      accessibility: ["Accessible", "Expecting Mother"],
      accessibleSpaces: 4,
      expectingMotherSpaces: 2,
      greenParkingSpaces: 0,
      chargingStations: 1,
      cartCorralExterior: "Uncovered",
      parkingLocation: "Grade",
      hoursOfOperation: "Mon-Sun: 9AM-9PM",
    },
    salesFloor: {
      size: 40000,
      departments: [
        "Grocery",
        "Produce",
        "Bakery",
        "Meat",
        "Seafood",
        "Dairy",
        "Apparel",
        "Shoes",
        "Pharmacy",
      ],
      checkoutCounters: 12,
      foodLocation: "B",
      flooring: "Concrete (gray)",
      woodgrainType: "Apparel/Shoes/Pharmacy",
      hasGardenCenter: false,
      gardenCenterType: "N/A",
      hasHoseBib: false,
    },
    food: {
      hasRestaurant: false,
      hasBakery: true,
      bakeryLocation: "Backroom",
      hasDelicatessen: false,
      hasSushi: false,
      sushiVendor: "-",
      hasServiceDeli: false,
      hasDeliHMRScreens: false,
      specialtyFoods: ["Organic", "Gluten-Free"],
    },
    pharmacy: {
      isPresent: true,
      hasClinic: false,
      location: "Rear",
      tier: "1",
      hasSeating: false,
      consultationRooms: 1,
      services: ["Vaccinations", "Medication Reviews", "Prescription Refills"],
    },
    marketing: {
      promotions: ["Digital App", "Loyalty Program"],
      specialEvents: ["Seasonal Sales"],
      demographics: "Suburban Families",
      hasMinale: false,
      hasEnchilada: false,
      hasSwipeUp: true,
      hasPreMinale: false,
      hasLitFittingRoom: false,
    },
    backroom: {
      size: 10000,
      hasLoadingDock: true,
      loadingDocks: 1,
      receivingAreas: 1,
      ceilingHeight: "14'-0\"",
      hasMultiHeightCeiling: false,
      highSteelPalletSpots: 50,
      cagesLockups: 1,
      cblTerminals: 1,
      storageCapacity: "Medium",
      securityFeatures: ["CCTV", "Alarm System"],
    },
    omni: {
      parkingSpaces: 5,
      orangeBranding: "GM",
      directAccess: 1,
      vanLoading: 1,
      hasMobileCheckIn: false,
      mobileCheckInType: "N/A",
    },
  },
  {
    id: "3",
    name: "1000-MILTON, ON",
    status: "Active",
    province: "British Columbia",
    region: "1",
    location: {
      address: "1599 Bay Ave",
      city: "Trail",
      postalCode: "V1R 4B2",
      coordinates: { lat: 49.0966, lng: -117.7117 },
      market: "3",
      banner: "Supercenter",
      originalGoDate: "November 24, 2004",
      originalGoFY: "2005",
      scGoDate: "January 27, 2016",
      scGoFY: "2016",
      scType: "SC-IB",
      ageOfBox: 18.3,
      lastTouchProjectYear: "FY23",
      lastTouchType: "RM-Ultra Light",
      lastTouchStatus: "Last Touch",
      lastTouchGoDate: "October 26, 2022",
      template: "57k",
      totalStoreSqft: 84805,
      acquisitionHistory: "N/A",
      storeFormatBN: true,
      storeFormatBCN: false,
      storeFormatDiv1: false,
      storeFormatSC: false,
    },
    building: {
      size: 84805,
      floors: 1,
      yearBuilt: 2004,
      lastRenovated: 2022,
      ownedVsLeased: "Owned",
      mallStore: false,
      mallEntrances: 0,
      securityEntranceGates: 0,
      shoppingCentreType: "Community",
      assetProtectionSecurityRoom: "None",
      hasBasement: false,
      receivingOnDifferentFloor: true,
      hasMezzanine: false,
      freightElevators: 0,
      customerElevatorLocation: "N/A",
      verticalTransportation: "None",
      hasShoppingCartMovator: false,
      cartCorral: "Exterior",
    },
    site: {
      parkingSpaces: 150,
      accessibility: ["Accessible", "Expecting Mother", "Green Parking"],
      accessibleSpaces: 6,
      expectingMotherSpaces: 3,
      greenParkingSpaces: 0,
      chargingStations: 0,
      cartCorralExterior: "Covered",
      parkingLocation: "Grade",
      hoursOfOperation: "Mon-Sun: 8AM-10PM",
    },
    salesFloor: {
      size: 42000,
      departments: [
        "Grocery",
        "Produce",
        "Bakery",
        "Meat",
        "Seafood",
        "Dairy",
        "Apparel",
        "Shoes",
        "Pharmacy",
      ],
      checkoutCounters: 15,
      foodLocation: "C",
      flooring: "Concrete (brown)",
      woodgrainType: "Apparel/Shoes/Pharmacy",
      hasGardenCenter: true,
      gardenCenterType: "Standard",
      hasHoseBib: true,
    },
    food: {
      hasRestaurant: false,
      hasBakery: true,
      bakeryLocation: "Backroom",
      hasDelicatessen: false,
      hasSushi: false,
      sushiVendor: "-",
      hasServiceDeli: false,
      hasDeliHMRScreens: false,
      specialtyFoods: ["Organic", "Local", "Gluten-Free"],
    },
    pharmacy: {
      isPresent: true,
      hasClinic: true,
      location: "Centre",
      tier: "1",
      hasSeating: true,
      consultationRooms: 1,
      services: [
        "Vaccinations",
        "Medication Reviews",
        "Health Consultations",
        "Prescription Refills",
      ],
    },
    marketing: {
      promotions: ["Digital App", "Loyalty Program", "Digital Coupons"],
      specialEvents: ["Eco-Friendly Initiatives", "Community Events"],
      demographics: "Health-Conscious Consumers",
      hasMinale: true,
      hasEnchilada: false,
      hasSwipeUp: true,
      hasPreMinale: true,
      hasLitFittingRoom: false,
    },
    backroom: {
      size: 12000,
      hasLoadingDock: true,
      loadingDocks: 2,
      receivingAreas: 1,
      ceilingHeight: "16'-11\"",
      hasMultiHeightCeiling: false,
      highSteelPalletSpots: 73,
      cagesLockups: 0,
      cblTerminals: 2,
      storageCapacity: "High",
      securityFeatures: ["CCTV", "Alarm System", "Security Personnel"],
    },
    omni: {
      parkingSpaces: 10,
      orangeBranding: "GM",
      directAccess: 1,
      vanLoading: 1,
      hasMobileCheckIn: true,
      mobileCheckInType: "Bollards",
    },
  },
  {
    id: "1",
    name: "1000-MILTON, ON",
    status: "Active",
    province: "Ontario",
    region: "Eastern",
    location: {
      address: "123 Main St",
      city: "Toronto",
      postalCode: "M5V 2N4",
      coordinates: { lat: 43.6532, lng: -79.3832 },
    },
    building: {
      size: 45000,
      floors: 2,
      yearBuilt: 2010,
      lastRenovated: 2020,
    },
    site: {
      parkingSpaces: 120,
      accessibility: ["Ramps", "Elevator", "Accessible Washrooms"],
      hoursOfOperation: "Mon-Sun: 8AM-10PM",
    },
    salesFloor: {
      size: 35000,
      departments: ["Grocery", "Produce", "Bakery", "Meat", "Dairy"],
      checkoutCounters: 12,
      foodLocation: "A",
      flooring: "Concrete",
      woodgrainType: "Oak",
      hasGardenCenter: true,
      hasHoseBib: true,
    },
    food: {
      hasRestaurant: true,
      hasBakery: true,
      hasDelicatessen: true,
      specialtyFoods: ["Organic", "Local", "Gluten-Free"],
    },
    pharmacy: {
      isPresent: true,
      hasClinic: true,
      services: ["Vaccinations", "Medication Reviews", "Prescription Refills"],
    },
    marketing: {
      promotions: ["Weekly Flyer", "Loyalty Program", "Digital Coupons"],
      specialEvents: ["Seasonal Sales", "Community Events"],
      demographics: "Urban Families",
    },
    backroom: {
      size: 10000,
      hasLoadingDock: true,
      storageCapacity: "High",
      securityFeatures: ["CCTV", "Alarm System", "Security Personnel"],
    },
  },
  {
    id: "2",
    name: "1000-MILTON, ON",
    status: "Active",
    province: "Quebec",
    region: "Western",
    location: {
      address: "456 Rue Saint-Laurent",
      city: "Montreal",
      postalCode: "H2Y 1Y7",
      coordinates: { lat: 45.5017, lng: -73.5673 },
    },
    building: {
      size: 38000,
      floors: 1,
      yearBuilt: 2015,
      lastRenovated: 2022,
    },
    site: {
      parkingSpaces: 90,
      accessibility: ["Ramps", "Accessible Washrooms"],
      hoursOfOperation: "Mon-Sun: 7AM-11PM",
    },
    salesFloor: {
      size: 30000,
      departments: ["Grocery", "Produce", "Bakery", "Seafood", "Dairy"],
      checkoutCounters: 10,
      foodLocation: "B",
      flooring: "Marble",
      woodgrainType: "N/A",
      hasGardenCenter: false,
      hasHoseBib: true,
    },
    food: {
      hasRestaurant: true,
      hasBakery: true,
      hasDelicatessen: false,
      specialtyFoods: ["Local", "Organic", "French Specialties"],
    },
    pharmacy: {
      isPresent: true,
      hasClinic: false,
      services: ["Prescription Refills", "Medication Reviews"],
    },
    marketing: {
      promotions: ["Weekly Flyer", "Loyalty Program"],
      specialEvents: ["Cultural Events", "Food Tastings"],
      demographics: "Urban Professionals",
    },
    backroom: {
      size: 8000,
      hasLoadingDock: true,
      storageCapacity: "Medium",
      securityFeatures: ["CCTV", "Alarm System"],
    },
  },
  {
    id: "4",
    name: "1000-MILTON, ON",
    status: "Active",
    province: "Alberta",
    region: "Southern",
    location: {
      address: "101 Calgary Trail",
      city: "Calgary",
      postalCode: "T2P 2M5",
      coordinates: { lat: 51.0447, lng: -114.0719 },
    },
    building: {
      size: 48000,
      floors: 1,
      yearBuilt: 2012,
      lastRenovated: 2021,
    },
    site: {
      parkingSpaces: 200,
      accessibility: ["Ramps", "Accessible Washrooms", "Reserved Parking"],
      hoursOfOperation: "Mon-Sun: 6AM-12AM",
    },
    salesFloor: {
      size: 40000,
      departments: [
        "Grocery",
        "Produce",
        "Bakery",
        "Meat",
        "Dairy",
        "Frozen Foods",
      ],
      checkoutCounters: 14,
      foodLocation: "A",
      flooring: "Concrete",
      woodgrainType: "Walnut",
      hasGardenCenter: true,
      hasHoseBib: true,
    },
    food: {
      hasRestaurant: false,
      hasBakery: true,
      hasDelicatessen: true,
      specialtyFoods: ["Local", "Organic", "Gluten-Free"],
    },
    pharmacy: {
      isPresent: true,
      hasClinic: true,
      services: [
        "Vaccinations",
        "Medication Reviews",
        "Prescription Refills",
        "Health Screenings",
      ],
    },
    marketing: {
      promotions: ["Weekly Flyer", "Loyalty Program", "Digital Coupons"],
      specialEvents: ["Family Events", "Seasonal Promotions"],
      demographics: "Families and Professionals",
    },
    backroom: {
      size: 9500,
      hasLoadingDock: true,
      storageCapacity: "High",
      securityFeatures: ["CCTV", "Alarm System", "Security Personnel"],
    },
  },
  {
    id: "5",
    name: "1000-MILTON, ON",
    status: "Inactive",
    province: "Manitoba",
    region: "Central",
    location: {
      address: "202 Portage Ave",
      city: "Winnipeg",
      postalCode: "R3B 3K6",
      coordinates: { lat: 49.8951, lng: -97.1384 },
    },
    building: {
      size: 32000,
      floors: 1,
      yearBuilt: 2005,
      lastRenovated: 2018,
    },
    site: {
      parkingSpaces: 80,
      accessibility: ["Ramps", "Accessible Washrooms"],
      hoursOfOperation: "Closed",
    },
    salesFloor: {
      size: 25000,
      departments: ["Grocery", "Produce", "Bakery", "Meat", "Dairy"],
      checkoutCounters: 8,
      foodLocation: "B",
      flooring: "Tile",
      woodgrainType: "N/A",
      hasGardenCenter: false,
      hasHoseBib: false,
    },
    food: {
      hasRestaurant: false,
      hasBakery: true,
      hasDelicatessen: false,
      specialtyFoods: ["Local", "Organic"],
    },
    pharmacy: {
      isPresent: false,
      hasClinic: false,
      services: [],
    },
    marketing: {
      promotions: ["Weekly Flyer"],
      specialEvents: ["Community Events"],
      demographics: "Mixed Demographics",
    },
    backroom: {
      size: 7000,
      hasLoadingDock: false,
      storageCapacity: "Low",
      securityFeatures: ["CCTV", "Alarm System"],
    },
  },
];
