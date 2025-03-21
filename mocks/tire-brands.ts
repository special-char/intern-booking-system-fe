import { TireBrand } from "@/types/tire-brand";
import { MOCKED_TIRE_SUPPLIERS } from "./tire-suppliers";

const MOCKED_TIRE_BRANDS: TireBrand[] = [
  {
    id: "1",
    logoUrl: "/images/tire-brands/michelin.svg",
    name: "Michelin",
    status: true,
    preferredSuplierId: MOCKED_TIRE_SUPPLIERS[0].id,
    suppliers: [MOCKED_TIRE_SUPPLIERS[0]]
  },
  {
    id: "2",
    logoUrl: "/images/tire-brands/generaltire.svg",
    name: "Generaltire",
    status: false,
    preferredSuplierId: MOCKED_TIRE_SUPPLIERS[3].id,
    suppliers: [MOCKED_TIRE_SUPPLIERS[1], MOCKED_TIRE_SUPPLIERS[3]]
  },
  {
    id: "3",
    logoUrl: "/images/tire-brands/coopertires.svg",
    name: "Coopertires",
    status: false,
    preferredSuplierId: MOCKED_TIRE_SUPPLIERS[3].id,
    suppliers: [MOCKED_TIRE_SUPPLIERS[0], MOCKED_TIRE_SUPPLIERS[2], MOCKED_TIRE_SUPPLIERS[3]]
  },
  {
    id: "4",
    logoUrl: "/images/tire-brands/bridgestone.svg",
    name: "Bridgestone",
    status: true,
    preferredSuplierId: MOCKED_TIRE_SUPPLIERS[1].id,
    suppliers: [MOCKED_TIRE_SUPPLIERS[1]]
  },
  {
    id: "5",
    logoUrl: "/images/tire-brands/pirelli.svg",
    name: "Pirelli",
    status: false,
    preferredSuplierId: MOCKED_TIRE_SUPPLIERS[3].id,
    suppliers: [MOCKED_TIRE_SUPPLIERS[3]]
  },
  {
    id: "6",
    logoUrl: "/images/tire-brands/falken.svg",
    name: "Falken",
    status: true,
    preferredSuplierId: null,
    suppliers: [MOCKED_TIRE_SUPPLIERS[0], MOCKED_TIRE_SUPPLIERS[2], MOCKED_TIRE_SUPPLIERS[3]]
  },
  {
    id: "7",
    logoUrl: "/images/tire-brands/dunlop.svg",
    name: "Falken",
    status: true,
    preferredSuplierId: MOCKED_TIRE_SUPPLIERS[3].id,
    suppliers: [MOCKED_TIRE_SUPPLIERS[3]]
  }
]


async function mockFetchTireBrands(): Promise<TireBrand[]> {
  return new Promise(resolve => setTimeout(() => {
    resolve(MOCKED_TIRE_BRANDS);
  }, 100)) as Promise<TireBrand[]>;
}

export async function getTireBrands(): Promise<TireBrand[] | null> {
  try {
    return await mockFetchTireBrands();
  } catch (error) {
    console.error(error);
    return null
  }
}

