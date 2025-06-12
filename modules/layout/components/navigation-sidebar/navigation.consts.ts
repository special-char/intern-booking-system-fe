import {
  Grid2X2,
  Truck,
  MapPin,
  ShoppingCart,
  Asterisk,
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
      title: "Managers",
      url: "/managers",
      icon: Truck,
      isActive: false,
      isExpandable: false,
      matchNested: true,
    },
    {
      title: "Courts",
      url: "/courts",
      icon: MapPin,
      isActive: false,
      isExpandable: false,
      matchNested: true,
    },
    {
      title: "Orders",
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
      isActive: false,
      isExpandable: false,
    },
  ],
};
