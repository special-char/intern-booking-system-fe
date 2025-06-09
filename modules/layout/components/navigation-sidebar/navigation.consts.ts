import {
  Grid2X2,
  Map,
  BadgeCheck,
  Calendar,
  ShoppingCart,
  CircleDollarSign,
  HelpCircle,
  Landmark,
  Factory,
  Asterisk,
} from "lucide-react";

export const menuItems = {
  navMain: [
    {
      title: "Homepage",
      url: "/",
      icon: Grid2X2,
      isActive: false,
      isExpandable: false,
      matchNested: true,
    },
    {
      title: "Manager",
      url: "/manager",
      icon: BadgeCheck,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Availability",
      url: "/availability",
      icon: Calendar,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Orders",
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
    {
      title: "Queries",
      url: "/queries",
      icon: HelpCircle,
      isActive: false,
      isExpandable: false,
    },
    // Optionally, keep these for future expansion:
    {
      title: "My brand",
      url: "/brand",
      icon: Asterisk,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "My warehouse",
      url: "/warehouse",
      icon: Factory,
      isActive: false,
      isExpandable: false,
    },
    {
      title: "Banking",
      url: "/banking",
      icon: Landmark,
      isActive: false,
      isExpandable: false,
    },
  ],
};