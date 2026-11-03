type Props = { inverse?: boolean };
export default function BrandCC({ inverse = false }: Props) {
  return <span className="brand-mark"><svg viewBox="4 4 92 88" aria-hidden="true"><path d="M18 12 V52 A32 32 0 0 0 50 84" fill="none" stroke={inverse ? "#FFFFFF" : "currentColor"} strokeWidth="10" strokeLinecap="round"/><path d="M82 12 V52 A32 32 0 0 1 50 84" fill="none" stroke={inverse ? "#A9C4FF" : "#5B8DEF"} strokeWidth="10" strokeLinecap="round"/><circle cx="50" cy="40" r="11" fill="#FF7A59"/></svg><span>unison<i> health</i></span></span>;
}
