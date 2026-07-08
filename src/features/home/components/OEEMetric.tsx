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
    <div className="flex items-center justify-between border rounded-lg p-4">

      <div>

        <p className="text-sm text-gray-500">

          {title}

        </p>

        <h2 className="text-2xl font-bold">

          {value}

        </h2>

      </div>

      <div
        className="w-4 h-14 rounded-full"
        style={{ background: color }}
      />

    </div>
  );
}