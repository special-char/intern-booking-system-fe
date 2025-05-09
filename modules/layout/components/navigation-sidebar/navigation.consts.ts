import {
  Grid2X2,
  ChartPie,
  BadgeCheck,
  Tag,
  ThumbsUp,
  Truck,
  Map,
  ShoppingCart,
  CircleDollarSign,
  Asterisk,
  Factory,
  Landmark,
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
      title: "Tire suppliers",
      url: "/tire-suppliers",
      icon: ChartPie,
      isActive: false,
      isExpandable: false,
      matchNested: true,
    },
    {
      title: "Tire Brands",
      url: "/tire-brands",
      icon: BadgeCheck,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Tire pricing ",
      url: "/tire-pricing",
      icon: Tag,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Tire recommendations ",
      url: "#",
      icon: ThumbsUp,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Vans/Techs",
      icon: Truck,
      isActive: false,
      isExpandable: true,
      items: [
        {
          title: "Vans",
          url: "/vans-techs/vans",
          payloadCollection: "vans",
        },
        {
          title: "Technicians",
          url: "/vans-techs/technicians",
          payloadCollection: "technicians",
        },
      ],
    },
    {
      title: "Territories & availability",
      url: "#",
      icon: Map,
      isActive: false,
      isExpandable: true,
      permissionSkip: true,
      items: [
        {
          title: "Hours of operation",
          url: "/territories-availability/hours-of-operation",
          permissionSkip: true,
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      isActive: false,
      isExpandable: true,
      permissionSkip: true,
      items: [
        {
          title: "List view",
          url: "/orders/list-view",
          permissionSkip: true,
        },
        {
          title: "Calendar view",
          url: "/orders/calendar-view",
          permissionSkip: true,
        },
        {
          title: "Map view",
          url: "/orders/map-view",
          permissionSkip: true,
        },
        {
          title: "Route view",
          url: "/orders/route-view",
          permissionSkip: true,
        },
      ],
    },
    {
      title: "Service pricing",
      icon: CircleDollarSign,
      isActive: false,
      isExpandable: true,
      items: [
        {
          title: "Trip charge",
          url: "/service-pricing/trip-charge",
        },
        {
          title: "Install",
          url: "/service-pricing/install",
        },
        {
          title: "Patch repair",
          url: "/service-pricing/patch-repair",
        },
        {
          title: "Balance & rotation",
          url: "/service-pricing/balance-rotation",
        },
        {
          title: "Fees",
          url: "/service-pricing/fees",
        },
      ],
    },
    {
      title: "My brand",
      url: "/dashboard",
      icon: Asterisk,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "My warehouse",
      url: "/dashboard",
      icon: Factory,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Banking",
      url: "/dashboard",
      icon: Landmark,
      isActive: false,
      isExpandable: false,
    },
  ],
};
