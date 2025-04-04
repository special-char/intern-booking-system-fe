import { Technician } from "@/modules/vans-techs/technicians/components/technicians-table/columns";
import { Event } from "@/types/orders/event";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { getLocalTodayDateString } from "@/utils/date";
import moment from "moment";

const MOCK_ORDERS_CALENDAR: OrdersCalendar = {
  date: getLocalTodayDateString(),
  data: [
    {
      technician: {
        id: "1",
        name: "Johnathan D'Souza",
      },
      events: [
        {
          createdAt: getLocalTodayDateString(),
          id: "1",
          start: `${getLocalTodayDateString()}T07:30:00`,
          end: `${getLocalTodayDateString()}T08:30:00`,
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
          preInspection: {
            id: "1",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T08:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "2",
          start: `${getLocalTodayDateString()}T09:00:00`,
          end: `${getLocalTodayDateString()}T11:00:00`,
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
          preInspection: {
            id: "2",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T11:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "3",
          start: `${getLocalTodayDateString()}T10:30:00`,
          end: `${getLocalTodayDateString()}T11:00:00`,
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
          preInspection: {
            id: "3",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T11:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "4",
          start: `${getLocalTodayDateString()}T11:00:00`,
          end: `${getLocalTodayDateString()}T13:00:00`,
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
          preInspection: {
            id: "4",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T13:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "5",
          start: `${getLocalTodayDateString()}T13:00:00`,
          end: `${getLocalTodayDateString()}T14:00:00`,
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
          preInspection: {
            id: "5",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T14:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "6",
          start: `${getLocalTodayDateString()}T15:00:00`,
          end: `${getLocalTodayDateString()}T15:30:00`,
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
          preInspection: {
            id: "6",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T15:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "7",
          start: `${getLocalTodayDateString()}T16:30:00`,
          end: `${getLocalTodayDateString()}T17:00:00`,
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
          preInspection: {
            id: "7",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T17:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "8",
          start: `${getLocalTodayDateString()}T17:00:00`,
          end: `${getLocalTodayDateString()}T18:00:00`,
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
          preInspection: {
            id: "8",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T18:00:00`)
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
          createdAt: getLocalTodayDateString(),
          id: "9",
          start: `${getLocalTodayDateString()}T07:30:00`,
          end: `${getLocalTodayDateString()}T08:30:00`,
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
          preInspection: {
            id: "9",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T08:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "10",
          start: `${getLocalTodayDateString()}T09:00:00`,
          end: `${getLocalTodayDateString()}T10:30:00`,
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
          preInspection: {
            id: "10",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T10:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "11",
          start: `${getLocalTodayDateString()}T12:00:00`,
          end: `${getLocalTodayDateString()}T12:30:00`,
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
          preInspection: {
            id: "11",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T12:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "12",
          start: `${getLocalTodayDateString()}T12:30:00`,
          end: `${getLocalTodayDateString()}T13:00:00`,
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
          preInspection: {
            id: "12",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T13:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "13",
          start: `${getLocalTodayDateString()}T13:00:00`,
          end: `${getLocalTodayDateString()}T14:00:00`,
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
          preInspection: {
            id: "13",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T14:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "14",
          start: `${getLocalTodayDateString()}T14:30:00`,
          end: `${getLocalTodayDateString()}T17:00:00`,
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
          preInspection: {
            id: "14",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T17:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "15",
          start: `${getLocalTodayDateString()}T18:00:00`,
          end: `${getLocalTodayDateString()}T18:30:00`,
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
          preInspection: {
            id: "15",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T18:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "16",
          start: `${getLocalTodayDateString()}T18:30:00`,
          end: `${getLocalTodayDateString()}T19:00:00`,
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
          preInspection: {
            id: "16",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T19:00:00`)
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
          createdAt: getLocalTodayDateString(),
          id: "17",
          start: `${getLocalTodayDateString()}T07:30:00`,
          end: `${getLocalTodayDateString()}T08:30:00`,
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
          preInspection: {
            id: "17",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T08:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "18",
          start: `${getLocalTodayDateString()}T09:30:00`,
          end: `${getLocalTodayDateString()}T11:00:00`,
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
          preInspection: {
            id: "18",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T11:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "19",
          start: `${getLocalTodayDateString()}T11:30:00`,
          end: `${getLocalTodayDateString()}T12:30:00`,
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
          preInspection: {
            id: "19",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T12:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "20",
          start: `${getLocalTodayDateString()}T12:30:00`,
          end: `${getLocalTodayDateString()}T13:30:00`,
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
          preInspection: {
            id: "20",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T13:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "21",
          start: `${getLocalTodayDateString()}T14:00:00`,
          end: `${getLocalTodayDateString()}T15:30:00`,
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
          preInspection: {
            id: "21",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T15:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "22",
          start: `${getLocalTodayDateString()}T17:00:00`,
          end: `${getLocalTodayDateString()}T17:30:00`,
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
          preInspection: {
            id: "22",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T17:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "23",
          start: `${getLocalTodayDateString()}T17:30:00`,
          end: `${getLocalTodayDateString()}T18:30:00`,
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
          preInspection: {
            id: "23",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending"
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T18:30:00`)
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
          createdAt: getLocalTodayDateString(),
          id: "24",
          start: `${getLocalTodayDateString()}T07:30:00`,
          end: `${getLocalTodayDateString()}T08:30:00`,
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
          preInspection: {
            id: "23",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending"
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T08:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "25",
          start: `${getLocalTodayDateString()}T09:00:00`,
          end: `${getLocalTodayDateString()}T11:00:00`,
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
          preInspection: {
            id: "25",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T11:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "26",
          start: `${getLocalTodayDateString()}T11:30:00`,
          end: `${getLocalTodayDateString()}T12:30:00`,
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
          preInspection: {
            id: "26",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T12:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "27",
          start: `${getLocalTodayDateString()}T13:00:00`,
          end: `${getLocalTodayDateString()}T14:00:00`,
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
          preInspection: {
            id: "27",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T14:00:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "28",
          start: `${getLocalTodayDateString()}T14:30:00`,
          end: `${getLocalTodayDateString()}T15:30:00`,
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
          preInspection: {
            id: "28",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T15:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "29",
          start: `${getLocalTodayDateString()}T16:00:00`,
          end: `${getLocalTodayDateString()}T16:30:00`,
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
          preInspection: {
            id: "29",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T16:30:00`)
        },
        {
          createdAt: getLocalTodayDateString(),
          id: "30",
          start: `${getLocalTodayDateString()}T16:30:00`,
          end: `${getLocalTodayDateString()}T17:30:00`,
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
          preInspection: {
            id: "30",
            damage: {
              remarks: [],
              status: "pending"
            },
            tireSizing: {
              remarks: [],
              status: "pending"
            },
            wheelLocks: {
              remarks: [],
              status: "pending"
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate())
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalTodayDateString(moment().subtract(1, "day").toDate()),
            }
          },
          subTitle: "Mounting & balancing",
          status: generateEventStatus(`${getLocalTodayDateString()}T17:30:00`)
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