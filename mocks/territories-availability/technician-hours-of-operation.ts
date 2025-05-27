import { getUser } from "@/lib/data/admin";
import { getConfiguration } from "@/lib/data/configuration";
import { getNylasConfigurations } from "@/lib/data/nyals-configuration";
import { getTechnicianByUserId } from "@/lib/data/payload";
import { getTechnicians } from "@/lib/data/technicians";
import { Configuration, Technician } from "@/payload-types";
import { DateRange } from "@/types/date";
import { TechnicianHoursOfOperation } from "@/types/territories/technician-hours-of-operation";
import { getLocalDateString } from "@/utils/date";
import { territoryColors } from "@/utils/get-random-color";
import moment from "moment";
import { PaginatedDocs } from "payload";

interface NylasParticipant {
  email: string;
  name: string;
  availability: {
    calendar_ids: string[];
    open_hours: Array<{
      days: number[];
      exdates: any[];
      timezone: string;
      start: string;
      end: string;
    }>;
  };
  booking: {
    calendar_id: string;
  };
  timezone: string;
}

interface NylasConfiguration {
  territory: {
    id: number;
    name: string;
  };
  nylasConfiguration: {
    data: {
      participants: NylasParticipant[];
    };
  };
}

function generateTechnicianHoursFromNylasConfig(
  technicians: PaginatedDocs<Technician>,
  nylasConfigurations: NylasConfiguration[],
  dateRange: DateRange
): TechnicianHoursOfOperation {
  const data: Array<{
    technician: Technician;
    territories: Array<{
      id: string;
      name: string;
      from: string;
      to: string;
      color: string;
    }>;
  }> = [];

  // Process each territory configuration
  nylasConfigurations.forEach((config) => {
    if (!config?.nylasConfiguration?.data?.participants) return;

    const territory = config.territory;
    const participants = config.nylasConfiguration.data.participants;

    // Process each participant (technician)
    participants.forEach((participant: NylasParticipant, index: number) => {
      // Find existing technician by email instead of index
      const existingTechnician = data.find(
        (t) => t.technician.email === participant.email
      );

      if (existingTechnician) {
        // Add territories to existing technician
        if (participant.availability?.open_hours) {
          participant.availability?.open_hours?.forEach((hours) => {
            hours.days.forEach((day: number) => {
              const date = moment(dateRange.from)
                .clone()
                .startOf("isoWeek")
                .add(day - 1, "days");
              existingTechnician.territories.push({
                id: territory.id.toString(),
                name: territory.name,
                from: `${getLocalDateString(date.toDate())}T${hours.start}:00`,
                to: `${getLocalDateString(date.toDate())}T${hours.end}:00`,
                color:
                  territoryColors[territory.name.toLowerCase()] ||
                  "rgba(8, 145, 178, 1)",
              });
            });
          });
        }
      } else {
        // Create new technician entry
        const territories: Array<{
          id: string;
          name: string;
          from: string;
          to: string;
          color: string;
        }> = [];
        if (participant.availability?.open_hours) {
          participant.availability.open_hours.forEach((hours) => {
            hours.days.forEach((day: number) => {
              const date = moment(dateRange.from)
                .clone()
                .startOf("isoWeek")
                .add(day - 1, "days");
              territories.push({
                id: territory.id.toString(),
                name: territory.name,
                from: `${getLocalDateString(date.toDate())}T${hours.start}:00`,
                to: `${getLocalDateString(date.toDate())}T${hours.end}:00`,
                color:
                  territoryColors[territory.name.toLowerCase()] ||
                  "rgba(8, 145, 178, 1)",
              });
            });
          });
        }

        if (technicians.docs.find((t) => t.email === participant.email)) {
          data.push({
            technician: technicians.docs.find(
              (t) => t.email === participant.email
            ) as Technician,
            territories,
          });
        }
      }
    });
  });
  //if technician not found in technicians.docs, add it to the data
  technicians.docs.forEach((technician) => {
    if (!data.find((t) => t.technician.email === technician.email)) {
      data.push({
        technician,
        territories: [],
      });
    }
  });

  return {
    dateRange,
    data,
  };
}

export async function getTechnicianHoursOfOperation(
  dateRange: DateRange,
  filters: Record<string, boolean>,
  search: string
): Promise<TechnicianHoursOfOperation | null> {
  try {
    const { user } = await getUser()

    let technicians
    if (user?.roles?.includes("technician")) {
      technicians = await getTechnicianByUserId(user.id)
    }
    else {
      technicians = await getTechnicians({
        ...(search && search.length > 0 && { where: search }),
      });
    }
    const isThisWeek: boolean = moment(dateRange.from).isSame(
      moment(),
      "isoWeek"
    );
    const territoryIds = Object.keys(filters);
    const configuration = await getConfiguration(territoryIds.map(Number));

    const nylasConfigurations = await Promise.all(
      configuration.map(async (configuration: Configuration) => {
        const tenant = configuration.tenant;
        if (
          tenant &&
          typeof tenant === "object" &&
          "grant_id" in tenant &&
          tenant.grant_id
        ) {
          const nylasConfiguration = await getNylasConfigurations(
            tenant.grant_id,
            configuration.configuration_id
          );
          return { territory: configuration.territory, nylasConfiguration };
        }
        return null;
      })
    );

    return generateTechnicianHoursFromNylasConfig(
      technicians as PaginatedDocs<Technician>,
      nylasConfigurations.filter(Boolean) as NylasConfiguration[],
      dateRange
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
