import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  background?:
    | "white"
    | "surface"
    | "accent"
    | "primary"
    | "secondary"
    | "mesh";
}

export const Section = ({
  children,
  className = "",
  containerClassName = "",
  id,
  background = "white",
}: SectionProps) => {
  const backgrounds = {
    white: "bg-white",
    surface: "bg-surface",
    accent: "bg-accent",
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    mesh: "bg-[image:var(--background-image-mesh)]",
  };

  return (
    <section
      id={id}
      className={`py-20 lg:py-32 ${backgrounds[background]} ${className}`}
    >
      <div className={`mx-auto max-w-7xl px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};
