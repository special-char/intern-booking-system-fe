import { OrdersCalendar } from "@/types/orders/orders-calendar";

const MOCK_ORDERS_CALENDAR: OrdersCalendar = {
  date: new Date().toISOString().split('T')[0],
  data: [
    {
      technician: {
        id: "1",
        name: "Johnathan D'Souza",
      },
      events: [
        {
          id: "1",
          start: `${new Date().toISOString().split('T')[0]}T07:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T08:30:00`,
          title: "Load Van (10 tires)",
          type: "load",
        },
        {
          id: "2",
          start: `${new Date().toISOString().split('T')[0]}T09:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T11:00:00`,
          title: "2 tires installation",
          type: "installation",
        },
        {
          id: "3",
          start: `${new Date().toISOString().split('T')[0]}T10:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T11:00:00`,
          title: "Idle Time",
          type: "idle",
        },
        {
          id: "4",
          start: `${new Date().toISOString().split('T')[0]}T11:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T13:00:00`,
          title: "4 tires installation",
          type: "installation",
        },
        {
          id: "5",
          start: `${new Date().toISOString().split('T')[0]}T13:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T14:00:00`,
          title: "Lunch Time",
          type: "lunch",
        },
        {
          id: "6",
          start: `${new Date().toISOString().split('T')[0]}T15:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T15:30:00`,
          title: "Tire inspection",
          type: "inspection",
        },
        {
          id: "7",
          start: `${new Date().toISOString().split('T')[0]}T16:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T17:00:00`,
          title: "Idle Time",
          type: "idle",
        },
        {
          id: "8",
          start: `${new Date().toISOString().split('T')[0]}T17:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T18:00:00`,
          title: "4 tires installation",
          type: "installation",
        },
      ],
    },
    {
      technician: {
        id: "2",
        name: "Martin Brown",
      },
      events: [
        {
          id: "9",
          start: `${new Date().toISOString().split('T')[0]}T07:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T08:30:00`,
          title: "Load Van (10 tires)",
          type: "load",
        },
        {
          id: "10",
          start: `${new Date().toISOString().split('T')[0]}T09:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T10:30:00`,
          title: "Tire inspection",
          type: "inspection",
        },
        {
          id: "11",
          start: `${new Date().toISOString().split('T')[0]}T12:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T12:30:00`,
          title: "Idle Time",
          type: "idle",
        },
        {
          id: "12",
          start: `${new Date().toISOString().split('T')[0]}T12:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T13:00:00`,
          title: "2 tires installation",
          type: "installation",
        },
        {
          id: "13",
          start: `${new Date().toISOString().split('T')[0]}T13:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T14:00:00`,
          title: "Lunch Time",
          type: "lunch",
        },
        {
          id: "14",
          start: `${new Date().toISOString().split('T')[0]}T14:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T17:00:00`,
          title: "4 tires installation",
          type: "installation",
        },
        {
          id: "15",
          start: `${new Date().toISOString().split('T')[0]}T18:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T18:30:00`,
          title: "Idle Time",
          type: "idle",
        },
        {
          id: "16",
          start: `${new Date().toISOString().split('T')[0]}T18:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T19:00:00`,
          title: "Tire inspection",
          type: "inspection",
        },
      ],
    },
    {
      technician: {
        id: "3",
        name: "Anthony Hawkins",
      },
      events: [
        {
          id: "17",
          start: `${new Date().toISOString().split('T')[0]}T07:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T08:30:00`,
          title: "Load Van (10 tires)",
          type: "load",
        },
        {
          id: "18",
          start: `${new Date().toISOString().split('T')[0]}T09:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T11:00:00`,
          title: "3 tires installation",
          type: "installation",
        },
        {
          id: "19",
          start: `${new Date().toISOString().split('T')[0]}T11:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T12:30:00`,
          title: "Tire inspection",
          type: "inspection",
        },
        {
          id: "20",
          start: `${new Date().toISOString().split('T')[0]}T12:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T13:30:00`,
          title: "Lunch time",
          type: "lunch",
        },
        {
          id: "21",
          start: `${new Date().toISOString().split('T')[0]}T14:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T15:30:00`,
          title: "3 tires installation",
          type: "installation",
        },
        {
          id: "22",
          start: `${new Date().toISOString().split('T')[0]}T17:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T17:30:00`,
          title: "Idle time",
          type: "idle",
        },
        {
          id: "23",
          start: `${new Date().toISOString().split('T')[0]}T17:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T18:30:00`,
          title: "3 tires installation",
          type: "installation",
        },
      ],
    },
    {
      technician: {
        id: "4",
        name: "Christopher Green",
      },
      events: [
        {
          id: "24",
          start: `${new Date().toISOString().split('T')[0]}T07:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T08:30:00`,
          title: "Load Van (10 tires)",
          type: "load",
        },
        {
          id: "25",
          start: `${new Date().toISOString().split('T')[0]}T09:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T11:00:00`,
          title: "4 tires installation",
          type: "installation",
        },
        {
          id: "26",
          start: `${new Date().toISOString().split('T')[0]}T11:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T12:30:00`,
          title: "Tire inspection",
          type: "inspection",
        },
        {
          id: "27",
          start: `${new Date().toISOString().split('T')[0]}T13:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T14:00:00`,
          title: "Tire inspection",
          type: "inspection",
        },
        {
          id: "28",
          start: `${new Date().toISOString().split('T')[0]}T14:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T15:30:00`,
          title: "Lunch time",
          type: "lunch",
        },
        {
          id: "29",
          start: `${new Date().toISOString().split('T')[0]}T16:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T16:30:00`,
          title: "Idle time",
          type: "idle",
        },
        {
          id: "30",
          start: `${new Date().toISOString().split('T')[0]}T16:30:00`,
          end: `${new Date().toISOString().split('T')[0]}T17:30:00`,
          title: "3 tires installation",
          type: "installation",
        },
      ],
    }
  ]
}

async function mockFetchOrdersCalendar(): Promise<OrdersCalendar> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(MOCK_ORDERS_CALENDAR);
    }, 100)
  ) as Promise<OrdersCalendar>;
}

export async function getOrdersCalendar({ date: _date }: { date: string }): Promise<OrdersCalendar | null> {
  try {
    return await mockFetchOrdersCalendar();
  } catch (error) {
    console.error(error);
    return null;
  }
}