interface Props {
  scrap: number;
}

export default function ScrapBadge({
  scrap,
}: Props) {
  const isGood = scrap === 0;

  return (
    <span
      className={`
        inline-flex
        min-w-[42px]
        justify-center
        rounded-md
        px-2
        py-1
        text-xs
        font-semibold

        ${
          isGood
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-600"
        }
      `}
    >
      {scrap}
    </span>
  );
}