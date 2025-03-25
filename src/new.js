const tableConfig = {
  location: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'storeNumber', label: 'Store Number' },
      { id: 'Province', label: 'Province' },
      { id: 'WM Region', label: 'WM Region' },
      { id: 'Banner', label: 'Banner' },
      { id: 'Market', label: 'Market' },
      { id: 'City', label: 'City' },
      { id: 'Store Status', label: 'Store Status' },
      { id: 'Original GO FY', label: 'Original GO FY' },
      { id: 'SC GO FY', label: 'SC GO FY' },
      { id: 'SC TYPE', label: 'SC TYPE' },
      { id: 'Age of Box', label: 'Age of Box' },
      { id: 'Last Touch Project Year', label: 'Last Touch Project Year' },
      { id: 'Last Touch Type', label: 'Last Touch Type' },
      { id: 'Last Touch Status', label: 'Last Touch Status' },
      { id: 'Template', label: 'Template' },
      { id: 'Total Store SQFT', label: 'Total Store SQFT' },
      { id: 'Acquisition History', label: 'Acquisition History' },
      { id: 'Store Format BN', label: 'Store Format BN' },
      { id: 'Store Format BCN', label: 'Store Format BCN' },
      { id: 'Store Format Div 1', label: 'Store Format Div 1' },
      { id: 'Store Format SC', label: 'Store Format SC' },
      { id: 'Original GO Date', label: 'Original GO Date' },
      { id: 'SC GO Date', label: 'SC GO Date' },
      { id: 'Last Touch GO Date', label: 'Last Touch GO Date' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      storeNumber: store.storeNumber,
      Province: store.Province,
      'WM Region': store['WM Region'],
      Banner: store.Banner,
      Market: store.Market,
      City: store.City,
      'Store Status': store.location['Store Status'],
      'Original GO FY': store.location['Original GO FY'],
      'SC GO FY': store.location['SC GO FY'],
      'SC TYPE': store.location['SC TYPE'],
      'Age of Box': store.location['Age of Box'],
      'Last Touch Project Year': store.location['Last Touch Project Year'],
      'Last Touch Type': store.location['Last Touch Type'],
      'Last Touch Status': store.location['Last Touch Status'],
      'Template': store.location['Template'],
      'Total Store SQFT': store.location['Total Store SQFT'],
      'Acquisition History': store.location['Acquisition History'],
      'Store Format BN': store.location['Store Format BN'],
      'Store Format BCN': store.location['Store Format BCN'],
      'Store Format Div 1': store.location['Store Format Div 1'],
      'Store Format SC': store.location['Store Format SC'],
      'Original GO Date': store.location['Original GO Date'],
      'SC GO Date': store.location['SC GO Date'],
      'Last Touch GO Date': store.location['Last Touch GO Date']
    })
  },
  building: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'Owned VS Leased', label: 'Owned VS Leased' },
      { id: 'Mall Store', label: 'Mall Store' },
      { id: 'Mall Entrances', label: 'Mall Entrances' },
      { id: 'Security Entrance Gates', label: 'Security Entrance Gates' },
      { id: 'Shopping Centre Type', label: 'Shopping Centre Type' },
      { id: 'Asset Protection Security Room', label: 'Asset Protection Security Room' },
      { id: 'Number of Floors', label: 'Number of Floors' },
      { id: 'Basement', label: 'Basement' },
      { id: 'Receiving on Different Floor', label: 'Receiving on Different Floor' },
      { id: 'Mezzanine', label: 'Mezzanine' },
      { id: 'Freight Elevators', label: 'Freight Elevators' },
      { id: 'Customer Elevator Location', label: 'Customer Elevator Location' },
      { id: 'Vertical Transportation', label: 'Vertical Transportation' },
      { id: 'Shopping Cart Movator', label: 'Shopping Cart Movator' },
      { id: 'Cart Corral', label: 'Cart Corral' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      'Owned VS Leased': store.building['Owned VS Leased'],
      'Mall Store': store.building['Mall Store'],
      'Mall Entrances': store.building['Mall Entrances'],
      'Security Entrance Gates': store.building['Security Entrance Gates'],
      'Shopping Centre Type': store.building['Shopping Centre Type'],
      'Asset Protection Security Room': store.building['Asset Protection Security Room'],
      'Number of Floors': store.building['Number of Floors'],
      'Basement': store.building['Basement'],
      'Receiving on Different Floor': store.building['Receiving on Different Floor'],
      'Mezzanine': store.building['Mezzanine'],
      'Freight Elevators': store.building['Freight Elevators'],
      'Customer Elevator Location': store.building['Customer Elevator Location'],
      'Vertical Transportation': store.building['Vertical Transportation'],
      'Shopping Cart Movator': store.building['Shopping Cart Movator'],
      'Cart Corral': store.building['Cart Corral']
    })
  },
  site: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'Accessible', label: 'Accessible' },
      { id: 'Expecting Mother', label: 'Expecting Mother' },
      { id: 'Green Parking', label: 'Green Parking' },
      { id: 'Charging Stations', label: 'Charging Stations' },
      { id: 'Cart Corral Exterior', label: 'Cart Corral Exterior' },
      { id: 'Parking Location', label: 'Parking Location' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      'Accessible': store.site['Accessible'],
      'Expecting Mother': store.site['Expecting Mother'],
      'Green Parking': store.site['Green Parking'],
      'Charging Stations': store.site['Charging Stations'],
      'Cart Corral Exterior': store.site['Cart Corral Exterior'],
      'Parking Location': store.site['Parking Location']
    })
  },
  salesFloor: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'Food Location', label: 'Food Location' },
      { id: 'Flooring', label: 'Flooring' },
      { id: 'Woodgrain', label: 'Woodgrain' },
      { id: 'Garden Centre', label: 'Garden Centre' },
      { id: 'Hose Bib', label: 'Hose Bib' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      'Food Location': store.salesFloor['Food Location'],
      'Flooring': store.salesFloor['Flooring'],
      'Woodgrain': store.salesFloor['Woodgrain'],
      'Garden Centre': store.salesFloor['Garden Centre'],
      'Hose Bib': store.salesFloor['Hose Bib']
    })
  },
  food: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'Sushi', label: 'Sushi' },
      { id: 'Vendor', label: 'Vendor' },
      { id: 'Service Deli', label: 'Service Deli' },
      { id: 'Deli HMR Screens', label: 'Deli HMR Screens' },
      { id: 'Bakery Location', label: 'Bakery Location' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      'Sushi': store.food['Sushi'],
      'Vendor': store.food['Vendor'],
      'Service Deli': store.food['Service Deli'],
      'Deli HMR Screens': store.food['Deli HMR Screens'],
      'Bakery Location': store.food['Bakery Location']
    })
  },
  omni: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'Parking Spaces', label: 'Parking Spaces' },
      { id: 'Orange Branding', label: 'Orange Branding' },
      { id: 'Direct Access', label: 'Direct Access' },
      { id: 'Van Loading', label: 'Van Loading' },
      { id: 'Mobile Check In', label: 'Mobile Check In' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      'Parking Spaces': store.omni['Parking Spaces'],
      'Orange Branding': store.omni['Orange Branding'],
      'Direct Access': store.omni['Direct Access'],
      'Van Loading': store.omni['Van Loading'],
      'Mobile Check In': store.omni['Mobile Check In']
    })
  },
  pharmacy: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'Location', label: 'Location' },
      { id: '1 Tier or 2 Tier', label: '1 Tier or 2 Tier' },
      { id: 'Seating', label: 'Seating' },
      { id: 'Consultation Rooms', label: 'Consultation Rooms' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      'Location': store.pharmacy['Location'],
      '1 Tier or 2 Tier': store.pharmacy['1 Tier or 2 Tier'],
      'Seating': store.pharmacy['Seating'],
      'Consultation Rooms': store.pharmacy['Consultation Rooms']
    })
  },
  marketing: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'Minale', label: 'Minale' },
      { id: 'Enchilada', label: 'Enchilada' },
      { id: 'Swipe Up', label: 'Swipe Up' },
      { id: 'Pre Minale', label: 'Pre Minale' },
      { id: 'Lit Fitting Room', label: 'Lit Fitting Room' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      'Minale': store.marketing['Minale'],
      'Enchilada': store.marketing['Enchilada'],
      'Swipe Up': store.marketing['Swipe Up'],
      'Pre Minale': store.marketing['Pre Minale'],
      'Lit Fitting Room': store.marketing['Lit Fitting Room']
    })
  },
  backroomIsd: {
    columns: [
      { id: 'storeName', label: 'Store Name' },
      { id: 'Loading Docks', label: 'Loading Docks' },
      { id: 'Receiving Areas', label: 'Receiving Areas' },
      { id: 'Backroom Ceiling - Height', label: 'Backroom Ceiling - Height' },
      { id: 'Backroom Ceiling - Multi-Height', label: 'Backroom Ceiling - Multi-Height' },
      { id: 'High-Steel Pallet Spots', label: 'High-Steel Pallet Spots' },
      { id: 'Cages/Lock-ups', label: 'Cages/Lock-ups' },
      { id: 'CBL Terminals', label: 'CBL Terminals' }
    ],
    getData: (store) => ({
      storeName: store.storeName,
      'Loading Docks': store.backroomIsd['Loading Docks'],
      'Receiving Areas': store.backroomIsd['Receiving Areas'],
      'Backroom Ceiling - Height': store.backroomIsd['Backroom Ceiling - Height'],
      'Backroom Ceiling - Multi-Height': store.backroomIsd['Backroom Ceiling - Multi-Height'],
      'High-Steel Pallet Spots': store.backroomIsd['High-Steel Pallet Spots'],
      'Cages/Lock-ups': store.backroomIsd['Cages/Lock-ups'],
      'CBL Terminals': store.backroomIsd['CBL Terminals']
    })
  }
};

export { tableConfig };