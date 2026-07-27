interface ShiftGroupProps {
  shift: string;
  children: React.ReactNode;
}

export const ShiftGroup = ({ shift, children }: ShiftGroupProps) => {
  return (
    <div className=""mb-6"">
      <h3 className=""text-[18px] font-medium text-[#3048A8] mb-3"">
        {shift}
      </h3>
      <div className=""space-y-0.5"">
        {children}
      </div>
    </div>
  );
};
