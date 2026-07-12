import {
  EyeIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function ActionButtons() {
  return (
    <div className="flex items-center justify-center gap-2">

      <button
        title="View"
        className="rounded-md p-2 text-[#3559B7] transition hover:bg-blue-50"
      >
        <EyeIcon className="h-4 w-4" />
      </button>

      <button
        title="Edit"
        className="rounded-md p-2 text-[#F59E0B] transition hover:bg-amber-50"
      >
        <PencilSquareIcon className="h-4 w-4" />
      </button>

      <button
        title="Duplicate"
        className="rounded-md p-2 text-[#10B981] transition hover:bg-green-50"
      >
        <DocumentDuplicateIcon className="h-4 w-4" />
      </button>

      <button
        title="Delete"
        className="rounded-md p-2 text-[#EF4444] transition hover:bg-red-50"
      >
        <TrashIcon className="h-4 w-4" />
      </button>

    </div>
  );
}