import { nylasRequest } from "../utils/endpoints/nylas";
interface OpenHours {
    days: number[];
    exdates: string[];
    timezone: string;
    start: string;
    end: string;
}

interface Availability {
    calendar_ids: string[];
    open_hours: OpenHours[];
}

interface Booking {
    calendar_id: string;
}

interface Participant {
    email: string;
    name: string;
    availability: Availability;
    booking: Booking;
    timezone: string;
}

interface AvailabilityRules {
    availability_method: string;
    buffer: {
        before: number;
        after: number;
    };
}

interface AvailabilityConfig {
    duration_minutes: number;
    interval_minutes: number;
    availability_rules: AvailabilityRules;
}

interface EmailTemplate {
    logo: string;
    booking_confirmed: {
        title: string;
        body: string;
    };
}

interface Scheduler {
    available_days_in_future: number;
    min_cancellation_notice: number;
    min_booking_notice: number;
    hide_rescheduling_options: boolean;
    hide_cancellation_options: boolean;
    hide_additional_guests: boolean;
    cancellation_policy: string;
    email_template: EmailTemplate;
}

interface EventBooking {
    title: string;
    timezone: string;
    description: string;
    location: string;
    booking_type: string;
    hide_participants: boolean | null;
    disable_emails: boolean | null;
}

export interface NylasConfiguration {
    request_id: string;
    data: {
        id: string;
        slug: string;
        name: string;
        participants: Participant[];
        requires_session_auth: boolean;
        availability: AvailabilityConfig;
        event_booking: EventBooking;
        scheduler: Scheduler;
        appearance: any | null;
    };
}
export const getNylasConfigurations = async (grant_id: string, configuration_id: string) => {

    const configuration = await nylasRequest<NylasConfiguration>({
        url: `/grants/${grant_id}/scheduling/configurations/${configuration_id}`,
        method: "GET",
    });

    return configuration;

};
  
  