import ButtonCC from "@/components/Button-CC";
import { AGENDA_URL, services } from "@/library/Landing/landingContent";
export default function ServiceCardCC({ service }: { service: (typeof services)[number] }) {
  return <article className={`service rv${service.featured ? " main" : ""}`}>{service.featured ? <span className="service-tag">Empieza aquí</span> : null}<h3>{service.name}</h3><p>{service.description}</p><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul><p className="price">{service.price}<small>{service.terms}</small></p>{service.featured ? <ButtonCC variant="light" wide href={AGENDA_URL}>Agendar paquete integral</ButtonCC> : null}</article>;
}
