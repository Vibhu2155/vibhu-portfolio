import { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-line bg-white/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-ink/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}
