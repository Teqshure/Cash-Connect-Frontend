import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "underline";
  inline?: boolean;
}

export const Input = ({
  label,
  error,
  className = "",
  variant = "default",
  inline = false,
  ...props
}: InputProps) => {
  const baseStyles =
    "w-full outline-none transition-all duration-200 placeholder:text-zinc-400";

  const variants = {
    default:
      "rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20",
    underline:
      "border-none bg-transparent px-0 py-2 text-base text-zinc-900 rounded-none shadow-none placeholder:text-zinc-400/0",
  };

  return (
    <div
      className={`w-full relative transition-colors duration-200 ${
        inline
          ? "flex items-center gap-4"
          : variant === "underline"
          ? "space-y-0"
          : "space-y-1.5"
      } ${
        variant === "underline"
          ? "border-b border-primary/30 focus-within:border-primary"
          : ""
      }`}
    >
      {label && (
        <label
          className={`text-sm font-medium ${
            inline ? "whitespace-nowrap mb-0" : "block"
          } ${variant === "underline" ? "text-primary mb-0" : "text-zinc-700"}`}
        >
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${variants[variant]} ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
