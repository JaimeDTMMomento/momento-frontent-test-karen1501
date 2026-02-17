import { forwardRef, SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  hasValue?: boolean;
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className = "", hasValue, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={`input select-custom ${
          hasValue ? "text-black" : "text-[#B0B7C3]"
        } ${className}`}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Selecciona";

export default Select;
