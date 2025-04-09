import { getLocalDateString } from "@/utils/date";
import moment from "moment";
import { z } from "zod";

export const appointmentFormSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  event: z
    .object({
      start: z.string().min(1, { message: "Start is required" }),
      end: z.string().min(1, { message: "End is required" })
    })
    .refine(
      (data) => {
        const startDate = moment(data.start).toDate();
        const endDate = moment(data.end).toDate();
        return startDate < endDate;
      },
      {
        message: "Please set correct start and end time",
        path: ["timeRange"]
      }
    ),
  technician: z.object({
    name: z.string().min(1, { message: "Full name is required" }),
    id: z.string().min(1, { message: "Technician id is required" }),
  }),
})

export const appointmentFormDefaultValues = {
  date: getLocalDateString(),
  event: {
    start: `${getLocalDateString()}T07:30:00`,
    end: `${getLocalDateString()}T08:30:00`,
  },
  technician: {
    id: "",
    name: ""
  }
};
