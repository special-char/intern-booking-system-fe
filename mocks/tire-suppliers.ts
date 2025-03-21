import { TireSupplier } from "@/types/tire-supplier";


export const MOCK_TIRE_SUPPLIERS: TireSupplier[] = [
  {
    autoPay: false,
    connectionKey: 'secret-key',
    functionalities: [
      {
        id: "1",
        name: "Inventory",
        lastChecked: "2024-02-25T23:25:00",
        status: "connected"
      },
      {
        id: "2",
        name: "Fullfilment",
        lastChecked: "2024-02-25T23:25:00",
        status: "connected"
      },
      {
        id: "3",
        name: "Auto Payment",
        lastChecked: "2024-02-25T23:25:00",
        status: "disconnected"
      }
    ],
    id: "1",
    name: "ATD",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, vitae facilisis nunc nisl eget nunc. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, vitae facilisis nunc nisl eget nunc.",
    orderCutoff: 21600, // 6:00 AM
    orderCutoffMin: 0, // 0:00
    orderCutoffMax: 86360, // 11:59 PM,
    receiving: "routeDelivery",
    receivingMin: 0, // 0:00
    receivingMax: 86360, // 11:59 PM,
    receivingFrom: 43200, // 12:00 PM
    receivingTo: 64800, // 6:00 PM
    slug: "atd",
  },
  {
    autoPay: true,
    connectionKey: 'secret-key',
    functionalities: [
      {
        id: "1",
        name: "Inventory",
        lastChecked: "2024-02-25T23:25:00",
        status: "connected"
      },
      {
        id: "2",
        name: "Fullfilment",
        lastChecked: "2024-02-25T23:25:00",
        status: "connected"
      },
      {
        id: "3",
        name: "Auto Payment",
        lastChecked: "2024-02-25T23:25:00",
        status: "disconnected"
      }
    ],
    id: "2",
    name: "Tire Rack Wholesale",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, vitae facilisis nunc nisl eget nunc. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, vitae facilisis nunc nisl eget nunc.",
    orderCutoff: 18000, // 5:00 AM,
    orderCutoffMin: 0, // 0:00
    orderCutoffMax: 54000, // 03:00PM,
    receiving: "routeDelivery",
    receivingMin: 0, // 0:00
    receivingMax: 54000, // 03:00PM, 
    receivingFrom: 43200, // 12:00 PM
    receivingTo: 54000, // 03:00PM, 
    slug: "tire-rack-wholesale",
  },
  {
    autoPay: false,
    connectionKey: 'secret-key',
    functionalities: [
      {
        id: "1",
        name: "Inventory",
        lastChecked: "2024-02-25T23:25:00",
        status: "connected"
      },
      {
        id: "2",
        name: "Fullfilment",
        lastChecked: "2024-02-25T23:25:00",
        status: "connected"
      },
      {
        id: "3",
        name: "Auto Payment",
        lastChecked: "2024-02-25T23:25:00",
        status: "disconnected"
      }
    ],
    id: "3",
    name: "NTW",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, vitae facilisis nunc nisl eget nunc. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, vitae facilisis nunc nisl eget nunc.",
    orderCutoff: 14400, // 4:00 AM
    orderCutoffMin: 0, // 0:00
    orderCutoffMax: 86360, // 11:59 PM,
    receiving: "routeDelivery",
    receivingMin: 0, // 0:00
    receivingMax: 86360, // 11:59 PM,
    receivingFrom: 43200, // 12:00 PM
    receivingTo: 64800, // 6:00 PM
    slug: "ntw",
  },
  {
    autoPay: false,
    connectionKey: 'secret-key',
    functionalities: [
      {
        id: "1",
        name: "Inventory",
        lastChecked: "2024-02-25T23:25:00",
        status: "connected"
      },
      {
        id: "2",
        name: "Fullfilment",
        lastChecked: "2024-02-25T23:25:00",
        status: "connected"
      },
      {
        id: "3",
        name: "Auto Payment",
        lastChecked: "2024-02-25T23:25:00",
        status: "disconnected"
      }
    ],
    id: "4",
    name: "Usa Auto Force",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, vitae facilisis nunc nisl eget nunc. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, vitae facilisis nunc nisl eget nunc.",
    orderCutoff: 10800, // 3:00 AM
    orderCutoffMin: 0, // 0:00
    orderCutoffMax: 86360, // 11:59 PM
    receiving: "routeDelivery",
    receivingMin: 0, // 0:00
    receivingMax: 86360, // 11:59 PM,
    receivingFrom: 43200, // 12:00 PM
    receivingTo: 64800, // 6:00 PM
    slug: "usa-auto-force",
  }
]

export async function mockFetchTireSuppliers(): Promise<TireSupplier[]> {
  return new Promise((resolve) => setTimeout(() => {
    resolve(MOCK_TIRE_SUPPLIERS);
  }, 100)) as Promise<TireSupplier[]>;
}

export async function mockFetchTireSupplierBySlug(slug: string): Promise<TireSupplier | null> {
  return new Promise(resolve => setTimeout(() => {
    resolve(MOCK_TIRE_SUPPLIERS.find(supplier => supplier.slug === slug) ?? null);
  }, 100)) as Promise<TireSupplier | null>;
}

export async function getTireSuppliers(): Promise<TireSupplier[] | null> {
  try {
    return await mockFetchTireSuppliers();
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function getTireSupplierBySlug(slug: string): Promise<TireSupplier | null> {
  try {
    return await mockFetchTireSupplierBySlug(slug);
  } catch (error) {
    console.error(error);
    return null
  }
}