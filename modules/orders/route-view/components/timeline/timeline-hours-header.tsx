interface TimelineHoursHeaderProps {
  hourWidth: number;
  hoursRange: number[];
  START_BLOCK_WIDTH: number;
  FINISH_BLOCK_WIDTH: number;
}

export function TimelineHoursHeader({
  hourWidth,
  hoursRange,
  START_BLOCK_WIDTH,
  FINISH_BLOCK_WIDTH,
}: TimelineHoursHeaderProps) {
  return (
    <div className="flex border-b border-gray-200 pt-3 pb-2">
      <div style={{ width: START_BLOCK_WIDTH }} />
      {hoursRange.map((hour) => {
        const displayHour = hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? "PM" : "AM";
        return (
          <div
            key={hour}
            className="text-left text-xs flex items-center text-text-secondary"
            style={{ width: hourWidth }}
          >
            {`${displayHour} ${period}`}
          </div>
        );
      })}
      <div style={{ width: FINISH_BLOCK_WIDTH }} />
    </div>
  );
}
