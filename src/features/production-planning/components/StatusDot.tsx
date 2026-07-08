interface Props {
    status: "running" | "stopped";
}

export default function StatusDot({ status }: Props) {

    return (
        <div
            className={`w-4 h-4 rounded-full ${
                status === "running"
                    ? "bg-green-500"
                    : "bg-red-500"
            }`}
        />
    );

}