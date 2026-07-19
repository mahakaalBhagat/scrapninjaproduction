export const recyclingMessages: Record<string, string> = {
  // Appliances
  ac: "If not recycled properly, refrigerant gases can damage the ozone layer.",
  fridge: "If not recycled, refrigerant gases can contribute to global warming.",
  washing_machine: "If not recycled, toxic detergent residues can contaminate water supplies.",
  microwave: "If not recycled, radiation and electronic components can harm ecosystems.",
  dishwasher: "If not recycled, harmful chemicals can leach into groundwater.",
  
  // Electronics
  tv: "If not recycled, toxic metals and plastics can contaminate soil and water.",
  mobile: "If not recycled, valuable metals like gold, silver and copper are lost.",
  laptop: "If not recycled, hazardous chemicals may leak into the environment.",
  computer: "If not recycled, heavy metals like lead and mercury poison the soil.",
  printer: "If not recycled, ink cartridges release toxic substances into landfills.",
  monitor: "If not recycled, phosphors and lead can damage ground and water systems.",
  tablet: "If not recycled, lithium batteries can cause fires in landfills.",
  camera: "If not recycled, precious metals and rare earth elements are wasted.",
  
  // Metals
  aluminum: "If not recycled, mining new aluminum requires 14 times more energy.",
  copper: "If not recycled, valuable copper deposits become depleted.",
  steel: "If not recycled, new steel production creates massive carbon emissions.",
  brass: "If not recycled, zinc and copper resources are unnecessarily extracted.",
  iron: "If not recycled, important metal reserves are lost forever.",
  
  // Paper
  paper: "If not recycled, trees continue to be cut down unnecessarily.",
  cardboard: "If not recycled, landfills accumulate bulky organic waste.",
  newspaper: "If not recycled, ink chemicals can pollute groundwater.",
  books: "If not recycled, cultural and educational materials waste precious resources.",
  magazines: "If not recycled, glossy coatings release harmful chemicals.",
  
  // Plastic
  plastic_bottles: "If not recycled, ocean plastics harm marine life for centuries.",
  plastic_bags: "If not recycled, animals mistake plastic for food and die.",
  plastic_containers: "If not recycled, microplastics contaminate drinking water.",
  plastic_films: "If not recycled, plastic pollution takes 400+ years to decompose.",
  styrofoam: "If not recycled, styrofoam breaks into micro-particles that poison ecosystems.",
  
  // E-Waste
  ewaste_general: "If not recycled, rare earth elements and precious metals are lost forever.",
  circuit_boards: "If not recycled, toxic solder and lead contaminate soil.",
  cables: "If not recycled, copper insulation material is wasted.",
  batteries: "If not recycled, battery acid leaks into soil and water.",
  chargers: "If not recycled, electronic waste accumulates in landfills.",
  
  // Vehicles
  car: "If not recycled, 75% of vehicle materials could be recovered and reused.",
  motorcycle: "If not recycled, engine oil and fluids contaminate groundwater.",
  scooter: "If not recycled, lithium batteries pose fire and chemical hazards.",
  bicycle: "If not recycled, metal frames rust and require mining to replace.",
  spare_parts: "If not recycled, reusable components are unnecessarily discarded.",

  // Default
  default: "If not recycled, this item may end up in landfills and increase pollution."
};

export const getRecyclingMessage = (itemName: string): string => {
  const key = itemName.toLowerCase().replace(/\s+/g, '_');
  return recyclingMessages[key] || recyclingMessages.default;
};
