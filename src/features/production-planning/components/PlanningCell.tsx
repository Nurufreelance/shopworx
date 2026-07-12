interface Props {
  hour: number;
}

export default function PlanningCell({
  hour,
}: Props) {
  return (
    <div
      className={`
        h-[58px]
        border-r
        border-[#EEF2F7]
        transition-colors
        ${
          hour % 2 === 0
            ? "bg-white"
            : "bg-[#FBFCFE]"
        }
        hover:bg-[#EEF6FF]
      `}
    />
  );
}