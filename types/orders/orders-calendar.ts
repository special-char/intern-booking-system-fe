import { Technician } from "../technicians";
import { Event } from "./event";

export interface OrdersCalendar {
  date: string,
  data: {
    technician: Partial<Technician>,
    events: Event[]
  }[]
}