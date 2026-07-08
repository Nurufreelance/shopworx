interface Props {
  title: string;
  value: string | number;
  color: string;
}

export default function StatCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-200 p-5">

      <div
        className="w-3 h-3 rounded-full mb-4"
        style={{ background: color }}
      />

      <p className="text-gray-500 text-sm">

        {title}

      </p>

      <h1 className="text-3xl font-bold mt-2">

        {value}

      </h1>

    </div>
  );
}