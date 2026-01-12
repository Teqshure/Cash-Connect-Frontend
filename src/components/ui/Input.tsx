import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "underline";
}

export const Input = ({
  label,
  error,
  className = "",
  variant = "default",
  ...props
}: InputProps) => {
  const baseStyles =
    "w-full outline-none transition-all duration-200 placeholder:text-zinc-400";

  const variants = {
    default:
      "rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20",
    underline:
      "border-b border-primary/30 bg-transparent px-0 py-2 text-base text-zinc-900 focus:border-primary rounded-none shadow-none placeholder:text-zinc-400/0",
  };

  return (
    <div className="w-full space-y-1.5 relative">
      {label && (
        <label
          className={`text-sm font-medium ${
            variant === "underline" ? "text-primary" : "text-zinc-700"
          }`}
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
