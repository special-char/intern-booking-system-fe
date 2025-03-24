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
        },
        {
          title: "Technicians",
          url: "/vans-techs/technicians",
        },
      ],
    },
    {
      title: "Territories & hours",
      url: "#",
      icon: Map,
      isActive: false,
      isExpandable: true,
      items: [
        {
          title: "Sub-menu 1",
          url: "#",
        },
        {
          title: "Sub-menu 2",
          url: "#",
        },
        {
          title: "Sub-menu 3",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      isActive: false,
      isExpandable: true,
      items: [
        {
          title: "List view",
          url: "/orders/list-view",
        },
        {
          title: "Calendar view",
          url: "#",
        },
        {
          title: "Map view",
          url: "#",
        },
        {
          title: "Route view",
          url: "/orders/route-view",
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
          url: "#",
        },
        {
          title: "Install",
          url: "#",
        },
        {
          title: "Patch repair",
          url: "/service-pricing/patch-repair",
        },
        {
          title: "Balance & rotation",
          url: "#",
        },
        {
          title: "Fees",
          url: "#",
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
