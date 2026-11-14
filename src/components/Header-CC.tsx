"use client";
import { useState } from "react";
import BrandCC from "@/components/Brand-CC";
import ButtonCC from "@/components/Button-CC";
import { AGENDA_URL, navLinks } from "@/library/Landing/landingContent";
export default function HeaderCC({ homeLinks = false }: { homeLinks?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="top"><div className="wrap"><a className="brand" href={homeLinks ? "/#inicio" : "#inicio"} aria-label="Unison Health, inicio"><BrandCC /></a><nav className="nav" aria-label="Principal">{navLinks.map(([label, href]) => <a href={homeLinks ? `/${href}` : href} key={href}>{label}</a>)}</nav><div className="header-actions"><ButtonCC small href={AGENDA_URL}>Agendar</ButtonCC><button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menuPanel" aria-label={open ? "Cerrar menú" : "Abrir menú"}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg></button></div></div><div className="menu-panel" id="menuPanel" hidden={!open}><div className="wrap">{navLinks.map(([label, href]) => <a href={homeLinks ? `/${href}` : href} key={href} onClick={close}>{label}</a>)}<a href={AGENDA_URL} onClick={close}>Agendar consulta</a></div></div></header>;
}
