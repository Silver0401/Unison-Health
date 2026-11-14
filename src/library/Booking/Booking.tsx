"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { bookingUrls } from "./bookingContent";

function Arrow({ back = false }: { back?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={back ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} /></svg>;
}

export default function Booking() {
  const [followUp, setFollowUp] = useState(false);
  const [selection, setSelection] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousStep = useRef(false);

  useEffect(() => {
    const sync = () => setFollowUp(window.location.hash === "#seguimiento");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (previousStep.current !== followUp) heading.current?.focus({ preventScroll: true });
    previousStep.current = followUp;
  }, [followUp]);

  const unavailable = (name: string) => {
    setSelection(name);
    dialog.current?.showModal();
  };

  const professionalPanels = [
    { id: "diana", theme: "light", eyebrow: "Seguimiento nutricional", title: <>Lic. Diana<br />Vázquez<span className="booking-dot">.</span></>, description: "Nutrióloga y educadora en diabetes", action: "Agendar con la Lic. Diana", image: "/img/diana.jpg", imageAlt: "Lic. Diana Vázquez, nutrióloga de Unison Health", url: bookingUrls.diana },
    { id: "ismael", theme: "blue", eyebrow: "Seguimiento médico", title: <>Dr. Ismael<br />Muñoz<span className="booking-dot">.</span></>, description: "Médico cirujano y partero", action: "Agendar con el Dr. Ismael", image: "/img/ismael-agenda.png", imageAlt: "Dr. Ismael Muñoz, médico de Unison Health", url: bookingUrls.ismael },
  ];
  const consultationPanels = [
    { id: "initial", theme: "blue", eyebrow: "Tu primer paso, juntos", title: <>Consulta<br />inicial<span className="booking-dot">.</span></>, description: "Medicina y nutrición coordinadas. Conozcamos tu historia y tracemos un solo plan para ti.", action: "Agendar consulta inicial", image: "", imageAlt: "", url: bookingUrls.initial },
    { id: "followup", theme: "light", eyebrow: "Sigamos avanzando", title: <>Consulta de<br />seguimiento<span className="booking-dot">.</span></>, description: "Ya nos conocemos. Revisemos tus avances y demos el siguiente paso en tu salud.", action: "Agendar consulta de seguimiento", image: "", imageAlt: "", url: "#seguimiento" },
  ];

  return (
    <main className="booking" aria-labelledby="booking-heading">
      <div className={`booking-toolbar${followUp ? " is-followup" : ""}`}>
        {followUp && <a className="booking-back" href="#consulta" aria-label="Volver a elegir consulta"><Arrow back /><span>Volver</span></a>}
        <h1 id="booking-heading" ref={heading} tabIndex={-1}>{followUp ? "¿Con quién continuamos?" : "¿Cómo podemos acompañarte?"}</h1>
        <span className="booking-step" aria-label={`Paso ${followUp ? "2" : "1"} de 2`}>{followUp ? "02" : "01"}<span> / 02</span></span>
      </div>

      <div className="booking-stage">
        {[consultationPanels, professionalPanels].map((panels, step) => {
          const active = followUp === (step === 1);
          return <div
            className={`booking-panels${step === 1 ? " is-followup" : ""}`}
            data-active={active}
            aria-hidden={!active}
            ref={(node) => { node?.toggleAttribute("inert", !active); }}
            key={step}
          >
        {panels.map((panel) => (
          <section className={`booking-panel booking-panel--${panel.theme} booking-panel--${panel.id}`} key={panel.id} aria-labelledby={`title-${panel.id}`}>
            {panel.image ? <div className="booking-portrait"><Image src={panel.image} alt={panel.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" priority /></div> : <div className="booking-silk" aria-hidden="true"><i /><i /><i /></div>}
            <div className="booking-light" aria-hidden="true" />
            <div className="booking-content">
              <p className="booking-eyebrow">{panel.eyebrow}</p>
              <h2 id={`title-${panel.id}`}>{panel.title}</h2>
              <p className="booking-description">{panel.description}</p>
              <span className="booking-cta" aria-hidden="true"><span>{panel.action}</span><span className="booking-arrow"><Arrow /></span></span>
            </div>
            <p className="booking-footnote">{step === 1 ? "Tu equipo. Un mismo plan." : panel.id === "initial" ? "Primera vez en Unison Health" : "Para pacientes de Unison Health"}<span>En línea</span></p>
            {panel.url ? <a className="booking-hit" href={panel.url} aria-label={panel.action} /> : <button type="button" className="booking-hit" onClick={() => unavailable(panel.action)} aria-label={panel.action} aria-haspopup="dialog" />}
          </section>
        ))}
          </div>;
        })}
      </div>

      <dialog className="booking-dialog" ref={dialog} aria-labelledby="booking-dialog-title" aria-describedby="booking-dialog-description" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <p className="booking-eyebrow">{selection}</p>
        <h2 id="booking-dialog-title">La agenda estará disponible pronto<span className="booking-dot">.</span></h2>
        <p id="booking-dialog-description">Estamos preparando el calendario de esta consulta. Vuelve pronto para elegir tu día y horario.</p>
        <form method="dialog"><button className="btn btn-primary" autoFocus>Entendido <Arrow /></button></form>
      </dialog>
    </main>
  );
}
