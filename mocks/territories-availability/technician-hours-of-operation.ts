import { DateRange } from "@/types/date";
import { TechnicianHoursOfOperation } from "@/types/territories/technician-hours-of-operation";
import { getLocalDateString, getLocalEndWeekDateString, getLocalStartWeekDateString } from "@/utils/date";
import moment from "moment";

export const MOCK_TECHNICIAN_HOURS_OF_OPERATION: TechnicianHoursOfOperation = {
  dateRange: {
    from: getLocalStartWeekDateString(),
    to: getLocalEndWeekDateString()
  },
  data: [
    {
      technician: {
        id: "1",
        name: "Johnathan D'Souza",
      },
      territories: [
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'd').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'd').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'd').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'd').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'd').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'd').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(3, 'd').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(3, 'd').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(4, 'd').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(4, 'd').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'd').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'd').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
      ]
    },
    {
      technician: {
        id: "2",
        name: "Martin Brown",
      },
      territories: [
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'days').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'days').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "2",
          name: "South",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'days').toDate())}T19:00:00`,
          color: "rgba(236, 72, 153, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'days').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(3, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(3, 'days').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(4, 'days').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(4, 'days').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "2",
          name: "South",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'days').toDate())}T19:00:00`,
          color: "rgba(236, 72, 153, 1)"
        },
      ]
    },
    {
      technician: {
        id: "3",
        name: "Anthony Hawkins",
      },
      territories: [
        {
          id: "2",
          name: "South",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T19:00:00`,
          color: "rgba(236, 72, 153, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'days').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'days').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'days').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "2",
          name: "South",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(3, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(3, 'days').toDate())}T19:00:00`,
          color: "rgba(236, 72, 153, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(4, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(4, 'days').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'days').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'days').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
      ]
    },
    {
      technician: {
        id: "4",
        name: "Christopher Green",
      },
      territories: [
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'days').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'days').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(1, 'days').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "1",
          name: "West",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'days').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(2, 'days').toDate())}T14:00:00`,
          color: "rgba(8, 145, 178, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(3, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(3, 'days').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "3",
          name: "East",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(4, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(4, 'days').toDate())}T19:00:00`,
          color: "rgba(168, 85, 247, 1)"
        },
        {
          id: "2",
          name: "South",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'days').toDate())}T09:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'days').toDate())}T14:00:00`,
          color: "rgba(236, 72, 153, 1)"
        },
        {
          id: "4",
          name: "North",
          from: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'days').toDate())}T14:00:00`,
          to: `${getLocalDateString(moment().clone().startOf('isoWeek').add(5, 'days').toDate())}T19:00:00`,
          color: "rgba(249, 115, 22, 1)"
        },
      ]
    },
  ]
}

async function mockFetchTechnicianHoursOfOperation(): Promise<TechnicianHoursOfOperation> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TECHNICIAN_HOURS_OF_OPERATION);
    }, 100);
  });
}

export async function getTechnicianHoursOfOperation(dateRange: DateRange): Promise<TechnicianHoursOfOperation | null> {
  try {
    const technicianHoursOfOperation: TechnicianHoursOfOperation = await mockFetchTechnicianHoursOfOperation()
    const isThisWeek: boolean = moment(dateRange.from).isSame(moment(), 'isoWeek');

    if (isThisWeek) {
      return technicianHoursOfOperation;
    }
    return {
      ...technicianHoursOfOperation,
      data: technicianHoursOfOperation.data.map((technician) => ({
        ...technician,
        territories: []
      }))
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}