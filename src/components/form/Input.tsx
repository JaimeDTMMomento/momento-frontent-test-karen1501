import React, { forwardRef, InputHTMLAttributes } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={`input text-black placeholder-[#9CA3AF] ${className}`}
      {...rest}
    />
  );
});

Input.displayName = "Input";

export default Input;
