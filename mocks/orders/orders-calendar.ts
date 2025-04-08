import { Technician } from "@/modules/vans-techs/technicians/components/technicians-table/columns";
import { OrderStatusEnum } from "@/types/orders/order";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { getLocalDateString } from "@/utils/date";
import moment from "moment";

const MOCK_ORDERS_APPOINTMENTS: OrdersCalendar = {
  date: getLocalDateString(),
  data: [
    {
      technician: {
        id: "1",
        name: "Johnathan D'Souza",
      },
      events: [
        {
          createdAt: getLocalDateString(),
          id: "1",
          start: `${getLocalDateString()}T07:30:00`,
          end: `${getLocalDateString()}T08:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "1",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.OnHold,
          position: [28.543131142604665, -81.35506218024291],
        },
        {
          createdAt: getLocalDateString(),
          id: "2",
          start: `${getLocalDateString()}T09:00:00`,
          end: `${getLocalDateString()}T11:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "2",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.OnHold,
          position: [28.54625689943762, -81.3491358394245],
        },
        {
          createdAt: getLocalDateString(),
          id: "3",
          start: `${getLocalDateString()}T10:30:00`,
          end: `${getLocalDateString()}T11:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "3",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Cancelled,
          position: [28.536291440483005, -81.34698202558555],
        },
        {
          createdAt: getLocalDateString(),
          id: "4",
          start: `${getLocalDateString()}T11:00:00`,
          end: `${getLocalDateString()}T13:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "4",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Failed,
          position: [28.526222232936792, -81.373876870654],
        },
        {
          createdAt: getLocalDateString(),
          id: "5",
          start: `${getLocalDateString()}T13:00:00`,
          end: `${getLocalDateString()}T14:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "5",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Completed,
          position: [28.52592648107951, -81.3592071989993],
        },
        {
          createdAt: getLocalDateString(),
          id: "6",
          start: `${getLocalDateString()}T15:00:00`,
          end: `${getLocalDateString()}T15:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "6",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Refunded,
          position: [28.54050128815461, -81.36825093724526],
        },
        {
          createdAt: getLocalDateString(),
          id: "7",
          start: `${getLocalDateString()}T16:30:00`,
          end: `${getLocalDateString()}T17:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "7",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Completed,
          position: [28.531560352380644, -81.3545190329174],
        },
        {
          createdAt: getLocalDateString(),
          id: "8",
          start: `${getLocalDateString()}T17:00:00`,
          end: `${getLocalDateString()}T18:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "8",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Completed,
          position: [28.541906496858147, -81.39527989276446],
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
          createdAt: getLocalDateString(),
          id: "9",
          start: `${getLocalDateString()}T07:30:00`,
          end: `${getLocalDateString()}T08:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "9",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.OnHold,
          position: [28.541248074531083, -81.39825781532325],
        },
        {
          createdAt: getLocalDateString(),
          id: "10",
          start: `${getLocalDateString()}T09:00:00`,
          end: `${getLocalDateString()}T10:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "10",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.OnHold,
          position: [28.549570312447383, -81.40612842240132],
        },
        {
          createdAt: getLocalDateString(),
          id: "11",
          start: `${getLocalDateString()}T12:00:00`,
          end: `${getLocalDateString()}T12:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "11",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Cancelled,
          position: [28.541675585627125, -81.408609214283],
        },
        {
          createdAt: getLocalDateString(),
          id: "12",
          start: `${getLocalDateString()}T12:30:00`,
          end: `${getLocalDateString()}T13:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "12",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Refunded,
          position: [28.53667729373507, -81.40693090581097],
        },
        {
          createdAt: getLocalDateString(),
          id: "13",
          start: `${getLocalDateString()}T13:00:00`,
          end: `${getLocalDateString()}T14:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "13",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Refunded,
          position: [28.533554860927925, -81.40770556130208],
        },
        {
          createdAt: getLocalDateString(),
          id: "14",
          start: `${getLocalDateString()}T14:30:00`,
          end: `${getLocalDateString()}T17:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "14",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Failed,
          position: [28.53103957214154, -81.40382784143783],
        },
        {
          createdAt: getLocalDateString(),
          id: "15",
          start: `${getLocalDateString()}T18:00:00`,
          end: `${getLocalDateString()}T18:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "15",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Failed,
          position: [28.52915304774471, -81.3977077110181],
        },
        {
          createdAt: getLocalDateString(),
          id: "16",
          start: `${getLocalDateString()}T18:30:00`,
          end: `${getLocalDateString()}T19:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "16",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Failed,
          position: [28.548946981710895, -81.37292839622623],
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
          createdAt: getLocalDateString(),
          id: "17",
          start: `${getLocalDateString()}T07:30:00`,
          end: `${getLocalDateString()}T08:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "17",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Cancelled,
          position: [28.548459650346263, -81.36168190609173],
        },
        {
          createdAt: getLocalDateString(),
          id: "18",
          start: `${getLocalDateString()}T09:30:00`,
          end: `${getLocalDateString()}T11:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "18",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Completed,
          position: [28.54715853234449, -81.3575277754931],
        },
        {
          createdAt: getLocalDateString(),
          id: "19",
          start: `${getLocalDateString()}T11:30:00`,
          end: `${getLocalDateString()}T12:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "19",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Completed,
          position: [28.55511593481614, -81.35277203938978],
        },
        {
          createdAt: getLocalDateString(),
          id: "20",
          start: `${getLocalDateString()}T12:30:00`,
          end: `${getLocalDateString()}T13:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "20",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Completed,
          position: [28.518273046403348, -81.33048599100266],
        },
        {
          createdAt: getLocalDateString(),
          id: "21",
          start: `${getLocalDateString()}T14:00:00`,
          end: `${getLocalDateString()}T15:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "21",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Failed,
          position: [28.518273046403348, -81.33048599100266],
        },
        {
          createdAt: getLocalDateString(),
          id: "22",
          start: `${getLocalDateString()}T17:00:00`,
          end: `${getLocalDateString()}T17:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "22",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Failed,
          position: [28.514129527491367, -81.3433476770632],
        },
        {
          createdAt: getLocalDateString(),
          id: "23",
          start: `${getLocalDateString()}T17:30:00`,
          end: `${getLocalDateString()}T18:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "23",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Failed,
          position: [28.505073215853578, -81.36554668993338],
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
          createdAt: getLocalDateString(),
          id: "24",
          start: `${getLocalDateString()}T07:30:00`,
          end: `${getLocalDateString()}T08:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "23",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.OnHold,
          position: [28.496121676733072, -81.35614596001666],
        },
        {
          createdAt: getLocalDateString(),
          id: "25",
          start: `${getLocalDateString()}T09:00:00`,
          end: `${getLocalDateString()}T11:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "25",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Refunded,
          position: [28.485210359033367, -81.42430978694665],
        },
        {
          createdAt: getLocalDateString(),
          id: "26",
          start: `${getLocalDateString()}T11:30:00`,
          end: `${getLocalDateString()}T12:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "26",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Refunded,
          position: [28.473029323412185, -81.42725412277413],
        },
        {
          createdAt: getLocalDateString(),
          id: "27",
          start: `${getLocalDateString()}T13:00:00`,
          end: `${getLocalDateString()}T14:00:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "27",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Failed,
          position: [28.471684794588832, -81.44827627120448],
        },
        {
          createdAt: getLocalDateString(),
          id: "28",
          start: `${getLocalDateString()}T14:30:00`,
          end: `${getLocalDateString()}T15:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "28",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Refunded,
          position: [28.47711998101673, -81.42332099852992],
        },
        {
          createdAt: getLocalDateString(),
          id: "29",
          start: `${getLocalDateString()}T16:00:00`,
          end: `${getLocalDateString()}T16:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "29",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Refunded,
          position: [28.552247353268708, -81.29478167689348],
        },
        {
          createdAt: getLocalDateString(),
          id: "30",
          start: `${getLocalDateString()}T16:30:00`,
          end: `${getLocalDateString()}T17:30:00`,
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
            zipCode: "32771",
          },
          invoice: {
            sum: 235,
          },
          notes:
            "Gate code 8344, enter from Turtle Creek Lane. Sometimes the gate won't open but stay there and someone will come out to open it.",
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
              rearRight: false,
            },
            year: 2020,
          },
          preInspection: {
            id: "30",
            damage: {
              remarks: [],
              status: "pending",
            },
            tireSizing: {
              remarks: [],
              status: "pending",
            },
            wheelLocks: {
              remarks: [],
              status: "pending",
            },
            odometer: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
            treadDepths: {
              remarks: [],
              status: "pending",
              lastScan: getLocalDateString(
                moment().subtract(1, "day").toDate()
              ),
            },
          },
          subTitle: "Mounting & balancing",
          status: OrderStatusEnum.Cancelled,
          position: [28.543740071345198, -81.30769919550922],
        },
      ],
    },
  ],
  isRouted: true,
};

async function mockFetchOrdersAppointments(): Promise<OrdersCalendar> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(MOCK_ORDERS_APPOINTMENTS);
    }, 100)
  ) as Promise<OrdersCalendar>;
}

export async function getOrdersCalendar({
  date,
}: {
  date: string;
}): Promise<OrdersCalendar | null> {
  try {
    const mockOrdersCalendar: OrdersCalendar =
      await mockFetchOrdersAppointments();
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
      resolve(
        MOCK_ORDERS_APPOINTMENTS.data.map(({ technician }) => technician)
      );
    }, 100)
  ) as Promise<Partial<Technician>[]>;
}

export async function getOrdersTechnicians(): Promise<
  Partial<Technician>[] | null
> {
  try {
    const technicians: Partial<Technician>[] =
      await mockFetchOrdersTechnicians();
    return technicians;
  } catch (error) {
    console.error(error);
    return null;
  }
}
