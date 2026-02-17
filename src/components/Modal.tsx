"use client";

import { useEffect } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

export default function Modal({ message, onClose }: Props) {

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="
        bg-white 
        rounded-2xl 
        p-8 
        w-full 
        max-w-md 
        shadow-2xl 
        text-center
        animate-fadeIn
      ">

        <p className="text-lg font-medium text-gray-800 mb-6">
          {message}
        </p>

        <button
          onClick={onClose}
          className="
            w-full
            h-12
            bg-gradient-to-r 
            from-[#17BEBB] 
            to-[#4FD1C5] 
            text-white 
            rounded-full 
            font-semibold 
            shadow-md
            transition
            hover:opacity-90
            cursor-pointer
          "
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
