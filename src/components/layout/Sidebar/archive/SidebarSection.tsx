interface Props {
    title?: string;
    children: React.ReactNode;
}

export default function SidebarSection({
    title,
    children,
}: Props) {
    return (
        <div className="mb-5">

            {title && (

                <p className="px-5 mb-2 text-[11px] uppercase tracking-wider text-gray-500">

                    {title}

                </p>

            )}

            <div className="space-y-1">

                {children}

            </div>

        </div>
    );
}