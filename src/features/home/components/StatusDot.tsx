interface Props {
  color: "green" | "orange" | "red" | "yellow" | "blue";
}

export default function StatusDot({ color }: Props) {
  const colors = {
    green: "bg-green-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
  };

  return (
    <span
      className={`w-3 h-3 rounded-full inline-block ${colors[color]}`}
    />
  );
}