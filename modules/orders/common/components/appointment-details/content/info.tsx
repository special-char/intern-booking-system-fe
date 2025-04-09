import moment from "moment";
import { AppointmentDetailsInfoWrapper } from "./common/info-wrapper";

interface AppointmentDetailsInfoProps {
  id: string
  createdAt: string
}

export function AppointmentDetailsInfo({ id, createdAt }: AppointmentDetailsInfoProps) {
  return (
    <AppointmentDetailsInfoWrapper >
      <div className="w-full">
        <p className="text-sm text-secondary">ORDER ID</p>
        <p>#{id}</p>
      </div>
      <div className="w-full">
        <p className="text-sm text-secondary">DATE CREATED</p>
        <p>{new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }).format(moment(createdAt).toDate())}</p>
      </div>
    </AppointmentDetailsInfoWrapper>
  );
}