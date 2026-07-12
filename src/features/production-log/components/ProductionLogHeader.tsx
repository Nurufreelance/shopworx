import {
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface Props {
  total: number;
}

export default function ProductionLogHeader({
  total,
}: Props) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-6">

      {/* Left */}

      <div>

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-[#3559B7]
            "
          >
            <ClipboardDocumentListIcon className="h-6 w-6 text-white" />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-[#2F3640]">
              Production Log
            </h1>

            <p className="mt-1 text-sm text-[#6B7280]">
              Monitor production history, machine output and shift activities.
            </p>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-wrap gap-4">

        <div
          className="
            min-w-[180px]
            rounded-xl
            border
            border-[#D9DEE7]
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >

          <div className="mb-2 flex items-center gap-2">

            <ClipboardDocumentListIcon className="h-5 w-5 text-[#3559B7]" />

            <span className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
              Total Logs
            </span>

          </div>

          <h2 className="text-3xl font-bold text-[#3559B7]">
            {total}
          </h2>

        </div>

        <div
          className="
            min-w-[180px]
            rounded-xl
            border
            border-[#D9DEE7]
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >

          <div className="mb-2 flex items-center gap-2">

            <CheckCircleIcon className="h-5 w-5 text-green-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
              Running
            </span>

          </div>

          <h2 className="text-3xl font-bold text-green-600">
            Live
          </h2>

        </div>

        <div
          className="
            min-w-[180px]
            rounded-xl
            border
            border-[#D9DEE7]
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >

          <div className="mb-2 flex items-center gap-2">

            <ClockIcon className="h-5 w-5 text-orange-500" />

            <span className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
              Shift
            </span>

          </div>

          <h2 className="text-3xl font-bold text-orange-500">
            Shift 1
          </h2>

        </div>

      </div>

    </header>
  );
}