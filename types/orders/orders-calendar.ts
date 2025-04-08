import { Technician } from "../technicians";
import { Event } from "./event";

export interface OrdersCalendar {
  date: string;
  isRouted: boolean;
  data: {
    technician: Partial<Technician>;
    events: Event[];
  }[];
}
