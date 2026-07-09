interface Props {
  status: "running" | "stopped";
}

export default function StatusDot({ status }: Props) {
  if (status === "running") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        Running
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
      <span className="h-2 w-2 rounded-full bg-red-500"></span>
      Stopped
    </span>
  );
}