interface Props {
  title: string;
  value: string;
  color: string;
}

export default function OEEMetric({
  title,
  value,
  color,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      rounded-lg
      border
      border-[#E7EBF0]
      bg-white
      px-4
      py-3
      shadow-sm
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="h-10 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />

        <div>

          <p className="text-xs uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <h2 className="text-xl font-semibold text-slate-800">
            {value}
          </h2>

        </div>

      </div>

      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />

    </div>
  );
}