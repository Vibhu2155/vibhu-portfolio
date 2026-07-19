import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  className?: string;
  target?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  icon,
  className,
  target,
  type = "button",
  onClick,
}: ButtonProps) {
  const styles = clsx(
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none",
    variant === "primary" && "bg-ink text-canvas hover:bg-graphite",
    variant === "secondary" &&
      "border border-line bg-transparent text-ink hover:border-ink",
    variant === "ghost" && "text-graphite hover:text-ink",
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={styles}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
      {icon}
    </button>
  );
}
