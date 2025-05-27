import { getPayload } from "payload";
import { getUser } from "./admin";
import config from "@payload-config";
import { Configuration, Technician, Tenant, Territory } from "@/payload-types";
import { nylasRequest } from "../utils/endpoints/nylas";
import { getNylasConfigurations } from "./nyals-configuration";
import { getTenantById } from "./payload";

export interface TimeSlot {
  days: number;
  start: number;
  end: number;
}

export interface TerritorySchedule {
  territory: string;
  territoryId: number;
  timeSlots: TimeSlot[];
  isDefault: boolean;
  weekStartDate: string | null;
  weekEndDate: string | null;
  technician: Technician;
}

const DEFAULT_CONFIG = {
  availability: {
    duration_minutes: 60,
    interval_minutes: 60,
    availability_rules: {
      availability_method: "max-availability",
      buffer: { before: 0, after: 0 },
    },
  },
  event_booking: {
    title: "Service Appointment",
    description: "Scheduled with technician",
    location: "Customer's Address",
    timezone: "Asia/Kolkata",
    booking_type: "booking",
  },
  requires_session_auth: false,
  scheduler: {
    available_days_in_future: 30,
    min_booking_notice: 60,
    min_cancellation_notice: 0,
    cancellation_policy: "Please cancel 1 hour in advance.",
    hide_rescheduling_options: false,
    hide_cancellation_options: false,
    hide_additional_guests: true,
    email_template: {
      logo: "https://example.com/logo.png",
      booking_confirmed: {
        title: "Your Appointment is Confirmed!",
        body: "Thank you for scheduling with us. See you soon!",
      },
    },
  },
};

export const getConfiguration = async (
  ids?: number[]
): Promise<Configuration[]> => {
  const { user } = await getUser();
  const tenant_id = (user?.tenants?.[0]?.tenant as Tenant)?.id;

  try {
    const payload = await getPayload({ config });
    const data = await payload.find({
      collection: "configurations",
      where: {
        tenant: { equals: tenant_id },
        ...(ids?.length ? { territory: { in: ids } } : {}),
      },
    });
    return data.docs;
  } catch (error) {
    throw new Error("Failed to get configuration", { cause: error });
  }
};

export const getTerritories = async (): Promise<Territory[]> => {
  const payload = await getPayload({ config });
  const { user } = await getUser();
  const tenant_id = (user?.tenants?.[0]?.tenant as Tenant)?.id;

  const result = await payload.find({
    collection: "territory",
    where: { tenant: { equals: tenant_id } },
  });
  return result.docs;
};

const createNylasConfiguration = async (
  grant_id: string,
  technicianHoursOfOperation: TerritorySchedule
) => {
  const participantConfig = {
    email: technicianHoursOfOperation.technician.email,
    name: technicianHoursOfOperation.technician.name,
    availability: {
      calendar_ids: ["primary"],
      open_hours: technicianHoursOfOperation.timeSlots?.map((slot) => ({
        days: [slot.days],
        start: `${slot.start}:00`,
        end: `${slot.end}:00`,
        exdates: [],
        timezone: "Asia/Kolkata",
      })),
    },
    booking: { calendar_id: "primary" },
    timezone: "Asia/Kolkata",
  };

  return nylasRequest({
    url: `/grants/${grant_id}/scheduling/configurations`,
    method: "POST",
    data: {
      name: technicianHoursOfOperation.territory,
      participants: [participantConfig],
      ...DEFAULT_CONFIG,
    },
  });
};

const updateNylasConfiguration = async (
  grant_id: string,
  configuration_id: string,
  technicianHoursOfOperation: TerritorySchedule
) => {
  const existingConfiguration = await getNylasConfigurations(
    grant_id,
    configuration_id
  );
  const existingParticipant = existingConfiguration.data.participants;
  //remove current technician from participants
  let newParticipants = existingParticipant.filter(
    (participant) =>
      participant.email !== technicianHoursOfOperation.technician.email
  );

  const participantConfig = {
    email: technicianHoursOfOperation.technician.email,
    name: technicianHoursOfOperation.technician.name,
    availability: {
      calendar_ids: ["primary"],
      ...(technicianHoursOfOperation.timeSlots &&
        technicianHoursOfOperation.timeSlots.length > 0 && {
        open_hours: technicianHoursOfOperation.timeSlots?.map((slot) => ({
          days: [slot.days],
          start: `${slot.start}:00`,
          end: `${slot.end}:00`,
          exdates: [],
          timezone: "Asia/Kolkata",
        })),
      }),
    },
    booking: { calendar_id: "primary" },
    timezone: "Asia/Kolkata",
  };

  return nylasRequest({
    url: `/grants/${grant_id}/scheduling/configurations/${configuration_id}`,
    method: "PUT",
    data: { participants: [...newParticipants, participantConfig] },
  });
};

export const storeTechnicianHoursOfOperation = async (
  technicianHoursOfOperation: TerritorySchedule[]
) => {
  const payload = await getPayload({ config });
  let tenant_id;
  let grant_id;


  if (typeof technicianHoursOfOperation[0]?.technician?.tenant === 'number') {
    const tenant = await getTenantById(technicianHoursOfOperation[0]?.technician?.tenant);
    tenant_id = tenant?.docs[0]?.id;
    grant_id = (tenant?.docs[0] as Tenant)?.grant_id || "";
  }
  else {
    tenant_id = (
      technicianHoursOfOperation[0]?.technician?.tenant as Tenant
    )?.id;
    grant_id = (
      technicianHoursOfOperation[0]?.technician?.tenant as Tenant
    )?.grant_id || "";
  }

  await Promise.all(
    technicianHoursOfOperation.map(async (schedule) => {
      const configurations = await getConfiguration([schedule.territoryId]);

      if (
        configurations.length === 0 &&
        schedule.timeSlots &&
        schedule.timeSlots.length > 0
      ) {
        const res = await createNylasConfiguration(grant_id, schedule);
        await payload.create({
          collection: "configurations",
          data: {
            tenant: tenant_id,
            territory: schedule.territoryId,
            configuration_id: res.data.id,
          },
        });
      } else {
        await updateNylasConfiguration(
          grant_id,
          configurations[0].configuration_id,
          schedule
        );
      }
    })
  );
};
