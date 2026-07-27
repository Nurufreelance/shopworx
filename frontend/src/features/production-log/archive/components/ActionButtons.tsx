import {
  EyeIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-1">

      <button
        title="View"
        onClick={onView}
        className="
          rounded-md
          p-2
          text-[#3559B7]
          transition-all
          duration-200
          hover:bg-blue-50
          hover:scale-105
        "
      >
        <EyeIcon className="h-4 w-4" />
      </button>

      <button
        title="Edit"
        onClick={onEdit}
        className="
          rounded-md
          p-2
          text-[#F59E0B]
          transition-all
          duration-200
          hover:bg-amber-50
          hover:scale-105
        "
      >
        <PencilSquareIcon className="h-4 w-4" />
      </button>

      <button
        title="Duplicate"
        onClick={onDuplicate}
        className="
          rounded-md
          p-2
          text-[#10B981]
          transition-all
          duration-200
          hover:bg-green-50
          hover:scale-105
        "
      >
        <DocumentDuplicateIcon className="h-4 w-4" />
      </button>

      <button
        title="Delete"
        onClick={onDelete}
        className="
          rounded-md
          p-2
          text-[#EF4444]
          transition-all
          duration-200
          hover:bg-red-50
          hover:scale-105
        "
      >
        <TrashIcon className="h-4 w-4" />
      </button>

    </div>
  );
}