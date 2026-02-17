import { ReactNode } from "react";

interface Props {
  label?: string;
  children: ReactNode;
  error?: string;
  className?: string;
}

export default function FormField({
  label,
  children,
  error,
  className = "",
}: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-[12px] text-[#818181] font-medium mb-1 px-4">
          {label}
        </label>
      )}

      {children}

      {error && (
        <p className="text-[12px] text-[#e11d48] mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
