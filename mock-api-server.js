const http = require('http');
const url = require('url');

const PORT = 8080;

const items = [
  // Paper (5 items)
  { id: 1, name: 'Cardboard Boxes', category: 'Paper', image: '📦', description: 'Used cardboard boxes', price: 2.50, unit: 'kg', badge: 'Recyclable', recyclable: true, environmentalWarning: 'Contains adhesive and ink', active: true },
  { id: 2, name: 'Office Paper', category: 'Paper', image: '📃', description: 'Clean white office paper', price: 3.75, unit: 'kg', badge: 'Premium', recyclable: true, environmentalWarning: 'May contain staples', active: true },
  { id: 3, name: 'Newspaper', category: 'Paper', image: '📰', description: 'Old newspapers and magazines', price: 1.50, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'Ink may stain', active: true },
  { id: 4, name: 'Paper Bags', category: 'Paper', image: '🛍️', description: 'Used paper shopping bags', price: 2.00, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'May have handles', active: true },
  { id: 5, name: 'Cardboard Tubes', category: 'Paper', image: '🔄', description: 'Paper towel and toilet paper tubes', price: 1.25, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'No hazard', active: true },

  // Plastic (5 items)
  { id: 6, name: 'PET Bottles', category: 'Plastic', image: '🍾', description: 'Clear plastic beverage bottles', price: 2.00, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'Rinse before recycling', active: true },
  { id: 7, name: 'HDPE Containers', category: 'Plastic', image: '📦', description: 'High-density polyethylene containers', price: 2.50, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'Clean containers only', active: true },
  { id: 8, name: 'PVC Pipes', category: 'Plastic', image: '🔧', description: 'Polyvinyl chloride pipe scraps', price: 3.00, unit: 'kg', badge: 'Caution', recyclable: false, environmentalWarning: 'May contain lead paint', active: true },
  { id: 9, name: 'Plastic Films', category: 'Plastic', image: '📋', description: 'Plastic wrap and film', price: 1.75, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'Difficult to recycle', active: true },
  { id: 10, name: 'Plastic Bags', category: 'Plastic', image: '🛍️', description: 'Used plastic shopping bags', price: 1.50, unit: 'kg', badge: 'Caution', recyclable: false, environmentalWarning: 'Causes tangles in machinery', active: true },

  // Metals (5 items)
  { id: 11, name: 'Aluminum Cans', category: 'Metals', image: '🥫', description: 'Used aluminum beverage cans', price: 12.00, unit: 'kg', badge: 'Premium', recyclable: true, environmentalWarning: 'No hazard', active: true },
  { id: 12, name: 'Steel Scraps', category: 'Metals', image: '⚙️', description: 'General steel and iron scraps', price: 5.50, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'Sharp edges present', active: true },
  { id: 13, name: 'Copper Wire', category: 'Metals', image: '🔌', description: 'Copper electrical wires', price: 18.00, unit: 'kg', badge: 'Premium', recyclable: true, environmentalWarning: 'May have insulation', active: true },
  { id: 14, name: 'Brass Fittings', category: 'Metals', image: '🔩', description: 'Used brass plumbing fittings', price: 15.00, unit: 'kg', badge: 'Premium', recyclable: true, environmentalWarning: 'No hazard', active: true },
  { id: 15, name: 'Stainless Steel', category: 'Metals', image: '🍴', description: 'Stainless steel scrap items', price: 14.00, unit: 'kg', badge: 'Premium', recyclable: true, environmentalWarning: 'No hazard', active: true },

  // E-Waste (10 items)
  { id: 16, name: 'Old Smartphones', category: 'E-Waste', image: '📱', description: 'Non-functional or damaged smartphones', price: 25.00, unit: 'unit', badge: 'Hazard', recyclable: false, environmentalWarning: 'Contains lithium batteries', active: true },
  { id: 17, name: 'Computer Monitors', category: 'E-Waste', image: '🖥️', description: 'Old CRT and LED monitors', price: 8.00, unit: 'unit', badge: 'Hazard', recyclable: false, environmentalWarning: 'Contains mercury and lead', active: true },
  { id: 18, name: 'Keyboards', category: 'E-Waste', image: '⌨️', description: 'Used computer keyboards', price: 3.00, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'May contain heavy metals', active: true },
  { id: 19, name: 'Computer Fans', category: 'E-Waste', image: '🌀', description: 'Used cooling fans and heatsinks', price: 2.50, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'Check for hazardous liquids', active: true },
  { id: 20, name: 'Motherboards', category: 'E-Waste', image: '🖲️', description: 'Used computer motherboards', price: 12.00, unit: 'unit', badge: 'Hazard', recyclable: false, environmentalWarning: 'Contains toxic materials', active: true },
  { id: 21, name: 'Power Supplies', category: 'E-Waste', image: '⚡', description: 'Old computer power supplies', price: 7.50, unit: 'unit', badge: 'Caution', recyclable: false, environmentalWarning: 'May contain residual charge', active: true },
  { id: 22, name: 'RAM Memory', category: 'E-Waste', image: '💾', description: 'Used RAM modules', price: 5.00, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'Safe to handle', active: true },
  { id: 23, name: 'Hard Drives', category: 'E-Waste', image: '💿', description: 'Used HDD/SSD drives', price: 6.00, unit: 'unit', badge: 'Caution', recyclable: false, environmentalWarning: 'Data security concern', active: true },
  { id: 24, name: 'Cables and Connectors', category: 'E-Waste', image: '🔌', description: 'Mixed electronic cables', price: 2.00, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'May have insulation', active: true },
  { id: 25, name: 'Circuit Boards', category: 'E-Waste', image: '🔳', description: 'Used circuit boards and PCBs', price: 9.00, unit: 'kg', badge: 'Hazard', recyclable: false, environmentalWarning: 'Contains heavy metals', active: true },

  // Appliances (8 items)
  { id: 26, name: 'Old Refrigerators', category: 'Appliances', image: '🧊', description: 'Non-functional refrigerators', price: 35.00, unit: 'unit', badge: 'Hazard', recyclable: false, environmentalWarning: 'Contains CFC gases', active: true },
  { id: 27, name: 'Washing Machines', category: 'Appliances', image: '🌊', description: 'Used washing machines', price: 40.00, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'Heavy and bulky', active: true },
  { id: 28, name: 'Microwave Ovens', category: 'Appliances', image: '🍳', description: 'Old microwave ovens', price: 8.00, unit: 'unit', badge: 'Caution', recyclable: false, environmentalWarning: 'Contains magnetron', active: true },
  { id: 29, name: 'Air Conditioners', category: 'Appliances', image: '❄️', description: 'Used AC units', price: 50.00, unit: 'unit', badge: 'Hazard', recyclable: false, environmentalWarning: 'Contains refrigerant', active: true },
  { id: 30, name: 'Electric Heaters', category: 'Appliances', image: '🔥', description: 'Used electric heating elements', price: 12.00, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'Check for damage', active: true },
  { id: 31, name: 'Vacuum Cleaners', category: 'Appliances', image: '🌪️', description: 'Old vacuum cleaners', price: 5.00, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'Motor damage possible', active: true },
  { id: 32, name: 'Toasters and Kettles', category: 'Appliances', image: '⚙️', description: 'Small kitchen appliances', price: 3.00, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'Check for damage', active: true },
  { id: 33, name: 'Television Sets', category: 'Appliances', image: '📺', description: 'Old TV units (CRT/LED)', price: 15.00, unit: 'unit', badge: 'Hazard', recyclable: false, environmentalWarning: 'Contains lead glass', active: true },

  // Glass (3 items)
  { id: 34, name: 'Clear Glass Bottles', category: 'Glass', image: '🍾', description: 'Used clear glass bottles', price: 1.50, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'Breakage risk', active: true },
  { id: 35, name: 'Colored Glass', category: 'Glass', image: '🔷', description: 'Mixed color glass bottles', price: 1.25, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'Breakage risk', active: true },
  { id: 36, name: 'Glass Jars', category: 'Glass', image: '🏺', description: 'Glass storage jars', price: 2.00, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'Breakage risk', active: true },

  // Batteries (3 items)
  { id: 37, name: 'Alkaline Batteries', category: 'Batteries', image: '🔋', description: 'Used AA, AAA batteries', price: 8.00, unit: 'kg', badge: 'Hazard', recyclable: false, environmentalWarning: 'Contains toxic metals', active: true },
  { id: 38, name: 'Lithium Batteries', category: 'Batteries', image: '🔌', description: 'Used lithium ion batteries', price: 25.00, unit: 'kg', badge: 'Hazard', recyclable: false, environmentalWarning: 'Fire hazard', active: true },
  { id: 39, name: 'Lead Acid Batteries', category: 'Batteries', image: '🚗', description: 'Used car batteries', price: 30.00, unit: 'unit', badge: 'Hazard', recyclable: false, environmentalWarning: 'Highly toxic', active: true },

  // Vehicles (4 items)
  { id: 40, name: 'Car Parts', category: 'Vehicles', image: '🔧', description: 'Various used car parts', price: 15.00, unit: 'kg', badge: 'Caution', recyclable: false, environmentalWarning: 'May have oil residue', active: true },
  { id: 41, name: 'Scrap Metal from Vehicles', category: 'Vehicles', image: '🚗', description: 'Metal scraps from old cars', price: 8.00, unit: 'kg', badge: 'Standard', recyclable: true, environmentalWarning: 'May be contaminated', active: true },
  { id: 42, name: 'Tires', category: 'Vehicles', image: '🛞', description: 'Old vehicle tires', price: 5.00, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'Bulky disposal needed', active: true },
  { id: 43, name: 'Engine Blocks', category: 'Vehicles', image: '⚙️', description: 'Used engine blocks', price: 45.00, unit: 'unit', badge: 'Standard', recyclable: true, environmentalWarning: 'Very heavy', active: true },
];

// Create server
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const pathname = url.parse(req.url).pathname;
  const query = url.parse(req.url, true).query;

  // Routes
  if (pathname === '/scrap-items-service/api/scrap-items' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(items));
  } else if (pathname === '/scrap-items-service/api/categories' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify([...new Set(items.map(i => i.category))].sort()));
  } else if (pathname === '/scrap-items-service/api/scrap-items/search' && req.method === 'GET') {
    const q = (query.q || '').toLowerCase();
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
    res.writeHead(200);
    res.end(JSON.stringify(filtered));
  } else if (pathname.match(/^\/scrap-items-service\/api\/scrap-items\/category\/(.+)$/)) {
    const category = decodeURIComponent(pathname.split('/').pop());
    const filtered = items.filter(item => item.category === category);
    res.writeHead(200);
    res.end(JSON.stringify(filtered));
  } else if (pathname.match(/^\/scrap-items-service\/api\/scrap-items\/\d+$/)) {
    const id = parseInt(pathname.split('/').pop());
    const item = items.find(i => i.id === id);
    if (item) {
      res.writeHead(200);
      res.end(JSON.stringify(item));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Item not found' }));
    }
  } else if (pathname === '/scrap-items-service/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', service: 'mock-scrap-items-api', itemsCount: items.length }));
  } else if (pathname === '/auth/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const token = 'mock-token-' + Math.random().toString(36).substr(2, 9);
        const user = {
          id: Math.floor(Math.random() * 10000),
          email: data.email,
          firstName: data.firstName || 'User',
          lastName: data.lastName || '',
          userType: data.userType || 'Household',
          paymentStatus: 'PENDING',
          accountStatus: 'ACTIVE'
        };
        res.writeHead(201);
        res.end(JSON.stringify({ 
          message: 'User registered successfully',
          token,
          user,
          refreshToken: 'mock-refresh-token-' + Math.random().toString(36).substr(2, 9)
        }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
    });
  } else if (pathname === '/auth/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const token = 'mock-token-' + Math.random().toString(36).substr(2, 9);
        const user = {
          id: 12345,
          email: data.email,
          firstName: 'Test',
          lastName: 'User',
          userType: 'Household',
          paymentStatus: 'APPROVED',
          accountStatus: 'ACTIVE'
        };
        res.writeHead(200);
        res.end(JSON.stringify({ 
          token,
          user,
          refreshToken: 'mock-refresh-token-' + Math.random().toString(36).substr(2, 9)
        }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
    });
  } else if (pathname === '/auth/refresh' && req.method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      token: 'mock-token-' + Math.random().toString(36).substr(2, 9),
      refreshToken: 'mock-refresh-token-' + Math.random().toString(36).substr(2, 9)
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`\n✅ Mock Scrap Items API Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📊 Items Available: ${items.length}`);
  console.log(`📂 Categories: ${[...new Set(items.map(i => i.category))].join(', ')}`);
  console.log(`\n🚀 API Endpoints:`);
  console.log(`   - GET  http://localhost:${PORT}/scrap-items-service/api/scrap-items`);
  console.log(`   - GET  http://localhost:${PORT}/scrap-items-service/api/categories`);
  console.log(`   - GET  http://localhost:${PORT}/scrap-items-service/health`);
  console.log(`\n🌐 Frontend: http://localhost:3001/scrap-items\n`);
});
