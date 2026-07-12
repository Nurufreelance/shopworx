import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const Header = () => {
  return (
    <header className="h-[72px] bg-white px-8 flex items-center justify-end">

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative w-[420px]">

          <MagnifyingGlassIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]"
          />

          <input
            placeholder="Search reports and insights..."
            className="
              w-full
              h-11
              rounded-full
              bg-[#F8FAFC]
              border
              border-[#E2E8F0]
              pl-12
              pr-4
              text-sm
              outline-none
              focus:border-[#2563EB]
            "
          />

        </div>

        {/* Sync */}

        <button
          className="
            relative
            w-11
            h-11
            rounded-full
            border
            border-[#E2E8F0]
            bg-white
            flex
            items-center
            justify-center
            hover:bg-[#F8FAFC]
          "
        >
          <ArrowPathIcon className="w-5 h-5 text-[#64748B]" />

          <span
            className="
              absolute
              top-2
              right-2
              w-2
              h-2
              rounded-full
              bg-[#2563EB]
            "
          />
        </button>

        {/* Help */}

        <button
          className="
            w-11
            h-11
            rounded-full
            border
            border-[#E2E8F0]
            bg-white
            flex
            items-center
            justify-center
            hover:bg-[#F8FAFC]
          "
        >
          <QuestionMarkCircleIcon className="w-6 h-6 text-[#64748B]" />
        </button>

        {/* User */}

        <div
          className="
            w-12
            h-12
            rounded-full
            bg-[#34469C]
            flex
            items-center
            justify-center
            text-white
            font-bold
          "
        >
          JD
        </div>

      </div>

    </header>
  );
}