import { Technician } from "@/modules/vans-techs/technicians/components/technicians-table/columns";
import { Event } from "@/types/orders/event";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { getLocaleDateString } from "@/utils/date";
import moment from "moment";

const MOCK_ORDERS_CALENDAR: OrdersCalendar = {
  date: getLocaleDateString(),
  data: [
    {
      technician: {
        id: "1",
        name: "Johnathan D'Souza",
      },
      events: [
        {
          createdAt: getLocaleDateString(),
          id: "1",
          start: `${getLocaleDateString()}T07:30:00`,
          end: `${getLocaleDateString()}T08:30:00`,
          title: "Load Van (10 tires)",
          type: "load",
          customer: {
            id: "1",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "1",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T08:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "2",
          start: `${getLocaleDateString()}T09:00:00`,
          end: `${getLocaleDateString()}T11:00:00`,
          title: "2 tires installation",
          type: "installation",
          customer: {
            id: "2",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "2",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T11:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "3",
          start: `${getLocaleDateString()}T10:30:00`,
          end: `${getLocaleDateString()}T11:00:00`,
          title: "Idle Time",
          type: "idle",
          customer: {
            id: "3",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "3",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T11:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "4",
          start: `${getLocaleDateString()}T11:00:00`,
          end: `${getLocaleDateString()}T13:00:00`,
          title: "4 tires installation",
          type: "installation",
          customer: {
            id: "4",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "4",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T13:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "5",
          start: `${getLocaleDateString()}T13:00:00`,
          end: `${getLocaleDateString()}T14:00:00`,
          title: "Lunch Time",
          type: "lunch",
          customer: {
            id: "5",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "5",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T14:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "6",
          start: `${getLocaleDateString()}T15:00:00`,
          end: `${getLocaleDateString()}T15:30:00`,
          title: "Tire inspection",
          type: "inspection",
          customer: {
            id: "6",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "6",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T15:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "7",
          start: `${getLocaleDateString()}T16:30:00`,
          end: `${getLocaleDateString()}T17:00:00`,
          title: "Idle Time",
          type: "idle",
          customer: {
            id: "7",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "7",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T17:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "8",
          start: `${getLocaleDateString()}T17:00:00`,
          end: `${getLocaleDateString()}T18:00:00`,
          title: "4 tires installation",
          type: "installation",
          customer: {
            id: "8",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "8",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T18:00:00`)
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
          createdAt: getLocaleDateString(),
          id: "9",
          start: `${getLocaleDateString()}T07:30:00`,
          end: `${getLocaleDateString()}T08:30:00`,
          title: "Load Van (10 tires)",
          type: "load",
          customer: {
            id: "9",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "9",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T08:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "10",
          start: `${getLocaleDateString()}T09:00:00`,
          end: `${getLocaleDateString()}T10:30:00`,
          title: "Tire inspection",
          type: "inspection",
          customer: {
            id: "10",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "10",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T10:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "11",
          start: `${getLocaleDateString()}T12:00:00`,
          end: `${getLocaleDateString()}T12:30:00`,
          title: "Idle Time",
          type: "idle",
          customer: {
            id: "11",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "11",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T12:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "12",
          start: `${getLocaleDateString()}T12:30:00`,
          end: `${getLocaleDateString()}T13:00:00`,
          title: "2 tires installation",
          type: "installation",
          customer: {
            id: "12",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "12",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T13:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "13",
          start: `${getLocaleDateString()}T13:00:00`,
          end: `${getLocaleDateString()}T14:00:00`,
          title: "Lunch Time",
          type: "lunch",
          customer: {
            id: "13",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "13",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T14:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "14",
          start: `${getLocaleDateString()}T14:30:00`,
          end: `${getLocaleDateString()}T17:00:00`,
          title: "4 tires installation",
          type: "installation",
          customer: {
            id: "14",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "14",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T17:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "15",
          start: `${getLocaleDateString()}T18:00:00`,
          end: `${getLocaleDateString()}T18:30:00`,
          title: "Idle Time",
          type: "idle",
          customer: {
            id: "15",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "15",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T18:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "16",
          start: `${getLocaleDateString()}T18:30:00`,
          end: `${getLocaleDateString()}T19:00:00`,
          title: "Tire inspection",
          type: "inspection",
          customer: {
            id: "16",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "16",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T19:00:00`)
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
          createdAt: getLocaleDateString(),
          id: "17",
          start: `${getLocaleDateString()}T07:30:00`,
          end: `${getLocaleDateString()}T08:30:00`,
          title: "Load Van (10 tires)",
          type: "load",
          customer: {
            id: "17",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "17",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T08:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "18",
          start: `${getLocaleDateString()}T09:30:00`,
          end: `${getLocaleDateString()}T11:00:00`,
          title: "3 tires installation",
          type: "installation",
          customer: {
            id: "18",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "18",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T11:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "19",
          start: `${getLocaleDateString()}T11:30:00`,
          end: `${getLocaleDateString()}T12:30:00`,
          title: "Tire inspection",
          type: "inspection",
          customer: {
            id: "19",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "19",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T12:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "20",
          start: `${getLocaleDateString()}T12:30:00`,
          end: `${getLocaleDateString()}T13:30:00`,
          title: "Lunch time",
          type: "lunch",
          customer: {
            id: "20",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "20",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T13:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "21",
          start: `${getLocaleDateString()}T14:00:00`,
          end: `${getLocaleDateString()}T15:30:00`,
          title: "3 tires installation",
          type: "installation",
          customer: {
            id: "21",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "21",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T15:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "22",
          start: `${getLocaleDateString()}T17:00:00`,
          end: `${getLocaleDateString()}T17:30:00`,
          title: "Idle time",
          type: "idle",
          customer: {
            id: "22",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "22",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T17:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "23",
          start: `${getLocaleDateString()}T17:30:00`,
          end: `${getLocaleDateString()}T18:30:00`,
          title: "3 tires installation",
          type: "installation",
          customer: {
            id: "23",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "23",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T18:30:00`)
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
          createdAt: getLocaleDateString(),
          id: "24",
          start: `${getLocaleDateString()}T07:30:00`,
          end: `${getLocaleDateString()}T08:30:00`,
          title: "Load Van (10 tires)",
          type: "load",
          customer: {
            id: "24",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "24",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T08:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "25",
          start: `${getLocaleDateString()}T09:00:00`,
          end: `${getLocaleDateString()}T11:00:00`,
          title: "4 tires installation",
          type: "installation",
          customer: {
            id: "25",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "25",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T11:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "26",
          start: `${getLocaleDateString()}T11:30:00`,
          end: `${getLocaleDateString()}T12:30:00`,
          title: "Tire inspection",
          type: "inspection",
          customer: {
            id: "26",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "26",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T12:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "27",
          start: `${getLocaleDateString()}T13:00:00`,
          end: `${getLocaleDateString()}T14:00:00`,
          title: "Tire inspection",
          type: "inspection",
          customer: {
            id: "27",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "27",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T14:00:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "28",
          start: `${getLocaleDateString()}T14:30:00`,
          end: `${getLocaleDateString()}T15:30:00`,
          title: "Lunch time",
          type: "lunch",
          customer: {
            id: "28",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "28",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T15:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "29",
          start: `${getLocaleDateString()}T16:00:00`,
          end: `${getLocaleDateString()}T16:30:00`,
          title: "Idle time",
          type: "idle",
          customer: {
            id: "29",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "29",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T16:30:00`)
        },
        {
          createdAt: getLocaleDateString(),
          id: "30",
          start: `${getLocaleDateString()}T16:30:00`,
          end: `${getLocaleDateString()}T17:30:00`,
          title: "3 tires installation",
          type: "installation",
          customer: {
            id: "30",
            name: "Jeff Goldblum",
            phone: "555-555-5555",
          },
          location: {
            street: "1356 West Elm St",
            city: "Orlando",
            state: "FL",
            zipCode: "32771"
          },
          invoice: {
            sum: 235
          },
          notes: "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
          vehicleDetail: {
            id: "30",
            name: "Land Rover Velor Super Sport",
            numberPlate: "23GH5R",
            tireDetails: {
              brand: "Continental",
              model: "CrossContact LX Sport",
              size: "275/45R21 XL 110W",
              inVan: true,
            },
            wheels: {
              frontLeft: true,
              frontRight: true,
              rearLeft: false,
              rearRight: false
            },
            year: 2020
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocaleDateString()}T17:30:00`)
        },
      ],
    }
  ],
  isRouted: true
}

function generateEventStatus(eventTime: string): Event["status"] {
  const now = moment();
  const eventMoment = moment(eventTime);

  if (eventMoment.isAfter(now)) {
    return 'pending';
  }

  return Math.random() < 0.7 ? 'success' : 'failure';
}

async function mockFetchOrdersCalendar(): Promise<OrdersCalendar> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(MOCK_ORDERS_CALENDAR);
    }, 100)
  ) as Promise<OrdersCalendar>;
}

export async function getOrdersCalendar({ date }: { date: string }): Promise<OrdersCalendar | null> {
  try {
    const mockOrdersCalendar: OrdersCalendar = await mockFetchOrdersCalendar();
    const isToday: boolean = moment(date).isSame(moment(), "day");
    return { ...mockOrdersCalendar, isRouted: isToday };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function mockFetchOrdersTechnicians(): Promise<Partial<Technician>[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(MOCK_ORDERS_CALENDAR.data.map(({ technician }) => technician));
    }, 100)
  ) as Promise<Partial<Technician>[]>;
}

export async function getOrdersTechnicians(): Promise<Partial<Technician>[] | null> {
  try {
    const technicians: Partial<Technician>[] = await mockFetchOrdersTechnicians();
    return technicians;
  } catch (error) {
    console.error(error);
    return null
  }
}