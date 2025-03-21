import { Tire } from "@/types/tire";

const MOCK_TIRES = [
  {
    title: "TIRE MFG#: 635442384-Continental",
    brand: "Continental",
    model: "4x4Contac",
    size: "215/65R16",
    sku: "123456789",
    cost: 196.59,
    profit: 19.59,
  },
  {
    title: "TIRE MFG#: 845732891-Goodyear",
    brand: "Goodyear",
    model: "Eagle Sport",
    size: "225/50R17",
    sku: "987654321",
    cost: 205.99,
    profit: 22.99,
  },
  {
    title: "TIRE MFG#: 927364528-Michelin",
    brand: "Michelin",
    model: "Primacy MXM4",
    size: "235/55R18",
    sku: "456789123",
    cost: 215.49,
    profit: 24.49,
  },
  {
    title: "TIRE MFG#: 764583920-Bridgestone",
    brand: "Bridgestone",
    model: "Dueler H/L",
    size: "245/60R18",
    sku: "321654987",
    cost: 223.75,
    profit: 25.75,
  },
  {
    title: "TIRE MFG#: 152738495-Pirelli",
    brand: "Pirelli",
    model: "Scorpion Verde",
    size: "255/50R19",
    sku: "852741963",
    cost: 239.99,
    profit: 29.99,
  },
  {
    title: "TIRE MFG#: 987652341-Yokohama",
    brand: "Yokohama",
    model: "Geolandar A/T",
    size: "265/70R17",
    sku: "654987321",
    cost: 189.95,
    profit: 18.95,
  },
  {
    title: "TIRE MFG#: 654372819-Falken",
    brand: "Falken",
    model: "Wildpeak A/T3W",
    size: "275/65R18",
    sku: "147852369",
    cost: 199.5,
    profit: 21.5,
  },
  {
    title: "TIRE MFG#: 548372910-Hankook",
    brand: "Hankook",
    model: "Dynapro AT2",
    size: "285/75R16",
    sku: "369258147",
    cost: 175.85,
    profit: 17.85,
  },
  {
    title: "TIRE MFG#: 219876453-Cooper",
    brand: "Cooper",
    model: "Discoverer AT3",
    size: "295/70R17",
    sku: "258147369",
    cost: 210.25,
    profit: 23.25,
  },
  {
    title: "TIRE MFG#: 875412396-Toyo",
    brand: "Toyo",
    model: "Open Country A/T III",
    size: "305/55R20",
    sku: "753951852",
    cost: 250.75,
    profit: 30.75,
  },
];

export async function mockFetchTires(): Promise<Tire[]> {
  return new Promise((resolve) => setTimeout(() => {
    resolve(MOCK_TIRES);
  }, 100)) as Promise<Tire[]>;
}

export async function getTires(recommended: boolean): Promise<Tire[] | null> {
  try {
    return (await mockFetchTires()).slice(0, recommended ? 5 : undefined);
  } catch (error) {
    console.error(error);
    return null
  }
}