import type { AnchorHTMLAttributes, ReactNode } from "react";
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; variant?: "primary" | "ghost" | "light" | "site"; small?: boolean; wide?: boolean };
export default function ButtonCC({ children, variant = "primary", small, wide, className = "", ...props }: Props) {
  return <a className={["btn", `btn-${variant}`, small && "btn-sm", wide && "btn-wide", className].filter(Boolean).join(" ")} {...props}>{children}</a>;
}
