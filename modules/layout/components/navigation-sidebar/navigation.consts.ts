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
      url: "#",
      icon: ChartPie,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Tire Brands",
      url: "#",
      icon: BadgeCheck,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Tire pricing ",
      url: "#",
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
      url: "#",
      icon: Truck,
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
      ],
    },
    {
      title: "Service pricing",
      url: "#",
      icon: CircleDollarSign,
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
