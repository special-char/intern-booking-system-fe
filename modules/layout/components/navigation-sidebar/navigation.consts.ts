// import {
//   Grid2X2,
//   ChartPie,
//   BadgeCheck,
//   Tag,
//   ThumbsUp,
//   Truck,
//   Map,
//   ShoppingCart,
//   CircleDollarSign,
//   Asterisk,
//   Factory,
//   Landmark,
// } from "lucide-react";

// export const menuItems = {
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/",
//       icon: Grid2X2,
//       isActive: false,
//       isExpandable: false,
//       matchNested: true,
//     },
//     {
//       title: "Tire suppliers",
//       url: "/tire-suppliers",
//       icon: ChartPie,
//       isActive: false,
//       isExpandable: false,
//       matchNested: true,
//     },
//     {
//       title: "Tire Brands",
//       url: "/tire-brands",
//       icon: BadgeCheck,
//       isActive: false,
//       isExpandable: false,
//     },
//     {
//       title: "Tire pricing ",
//       url: "/tire-pricing",
//       icon: Tag,
//       isActive: false,
//       isExpandable: false,
//     },
//     {
//       title: "Tire recommendations ",
//       url: "#",
//       icon: ThumbsUp,
//       isActive: false,
//       isExpandable: false,
//     },
//     {
//       title: "Vans/Techs",
//       icon: Truck,
//       isActive: false,
//       isExpandable: true,
//       items: [
//         {
//           title: "Vans",
//           url: "/vans-techs/vans",
//           payloadCollection: "vans",
//         },
//         {
//           title: "Technicians",
//           url: "/vans-techs/technicians",
//           payloadCollection: "technicians",
//         },
//       ],
//     },
//     {
//       title: "Territories & availability",
//       url: "#",
//       icon: Map,
//       isActive: false,
//       isExpandable: true,
//       permissionSkip: true,
//       items: [
//         {
//           title: "Hours of operation",
//           url: "/territories-availability/hours-of-operation",
//           permissionSkip: true,
//         },
//       ],
//     },
//     {
//       title: "Orders",
//       url: "#",
//       icon: ShoppingCart,
//       isActive: false,
//       isExpandable: true,
//       permissionSkip: true,
//       items: [
//         {
//           title: "List view",
//           url: "/orders/list-view",
//           permissionSkip: true,
//         },
//         {
//           title: "Calendar view",
//           url: "/orders/calendar-view",
//           permissionSkip: true,
//         },
//         {
//           title: "Map view",
//           url: "/orders/map-view",
//           permissionSkip: true,
//         },
//         {
//           title: "Route view",
//           url: "/orders/route-view",
//           permissionSkip: true,
//         },
//       ],
//     },
//     {
//       title: "Service pricing",
//       icon: CircleDollarSign,
//       isActive: false,
//       isExpandable: true,
//       permissionSkip: true,
//       items: [
//         {
//           title: "Trip charge",
//           url: "/service-pricing/trip-charge",
//           permissionSkip: true,
//         },
//         {
//           title: "Install",
//           url: "/service-pricing/install",
//           permissionSkip: true,
//         },
//         {
//           title: "Patch repair",
//           url: "/service-pricing/patch-repair",
//           permissionSkip: true,
//         },
//         {
//           title: "Balance & rotation",
//           url: "/service-pricing/balance-rotation",
//           permissionSkip: true,
//         },
//         {
//           title: "Fees",
//           url: "/service-pricing/fees",
//           permissionSkip: true,
//         },
//       ],
//     },
//     {
//       title: "My brand",
//       url: "/dashboard",
//       icon: Asterisk,
//       isActive: false,
//       isExpandable: false,
//     },
//     {
//       title: "My warehouse",
//       url: "/dashboard",
//       icon: Factory,
//       isActive: false,
//       isExpandable: false,
//     },
//     {
//       title: "Banking",
//       url: "/dashboard",
//       icon: Landmark,
//       isActive: false,
//       isExpandable: false,
//     },
//   ],
// };
import {
  Grid2X2,
<<<<<<< HEAD
  Map,
  Building2,
  ShoppingCart,
  CircleDollarSign,
  Layers3,
  DollarSign,
  Users,
  Percent,
  Tags,
  List,
=======
  Truck,
  MapPin,
  ShoppingCart,
  Asterisk,
  Landmark,
>>>>>>> a87cc7e33bc06a118baa987098199c063b4d0650
} from "lucide-react";

export const menuItems = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Grid2X2,
      isActive: false,
      isExpandable: false,
      matchNested: true,
    },
    {
<<<<<<< HEAD
      title: "Organisation",
      url: "/organisation",
      icon: Building2,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Venues",
      url: "/venues",
      icon: Map,
=======
      title: "Managers",
      url: "/managers",
      icon: Truck,
>>>>>>> a87cc7e33bc06a118baa987098199c063b4d0650
      isActive: false,
      isExpandable: false,
      matchNested: true,
    },
    {
<<<<<<< HEAD
      title: "Court",
      icon: Layers3,
      isExpandable: true,
      items: [
        {
          title: "Court",
          url: "/court",
          icon: Layers3,
          payloadCollection: "court",
          permissionSkip: true,
        },
        {
          title: "Court Availability",
          url: "/availability",
          payloadCollection: "courtAvailability",
          permissionSkip: true,
        },
        {
          title: "Court Price",
          url: "/court-price",
          icon: DollarSign,
          payloadCollection: "courtPrice",
          permissionSkip: true,
        },
      ],
=======
      title: "Courts",
      url: "/courts",
      icon: MapPin,
      isActive: false,
      isExpandable: false,
      matchNested: true,
>>>>>>> a87cc7e33bc06a118baa987098199c063b4d0650
    },
    //come in setting page
    // {
    //   title: "My brand",
    //   url: "/brand",
    //   icon: Palette,
    //   isActive: false,
    //   isExpandable: false,
    // },
    // {
    //   title: "Manager",
    //   url: "/manager",
    //   icon: BadgeCheck,
    //   isActive: false,
    //   isExpandable: false,
    // },
    {
      title: "Orders",
<<<<<<< HEAD
      url: "/orders",
      icon: ShoppingCart,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Payment History",
      url: "/payments",
      icon: CircleDollarSign,
      isActive: false,
      isExpandable: false,
    },
    // come in setting page
    // {
    //   title: "Banking",
    //   url: "/banking",
    //   icon: Landmark,
    //   isActive: false,
    //   isExpandable: false,
    // },
    {
      title: "Customers",
      icon: Users,
      isExpandable: true,
      items: [
        {
          title: "List",
          url: "/customers/customers",
          icon: List,
          payloadCollection: "customers",
          permissionSkip: true,
        },
        {
          title: "Groups",
          url: "/customers/groups",
          icon: Users,
          payloadCollection: "customerGroups",
          permissionSkip: true,
        },
      ],
    },
    {
      title: "Promotion",
      url: "/promotion",
      icon: Percent,
=======
      url: "/orders/list-view",
      icon: ShoppingCart,
      isActive: false,
      isExpandable: false,
      matchNested: true,
    },
    {
      title: "My brand",
      url: "/mybrand",
      icon: Asterisk,
>>>>>>> a87cc7e33bc06a118baa987098199c063b4d0650
      isActive: false,
      isExpandable: false,
    },
    {
<<<<<<< HEAD
      title: "Price List",
      url: "/price-list",
      icon: Tags,
=======
      title: "Banking",
      url: "/banking",
      icon: Landmark,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Offer",
      url: "/offer",
      icon: Landmark,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Payment History",
      url: "/payment",
      icon: Landmark,
>>>>>>> a87cc7e33bc06a118baa987098199c063b4d0650
      isActive: false,
      isExpandable: false,
    },
  ],
};