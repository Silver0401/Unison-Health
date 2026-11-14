import type { Metadata } from "next";
import HeaderCC from "@/components/Header-CC";
import Booking from "@/library/Booking/Booking";

export const metadata: Metadata = {
  title: "Agenda tu consulta | Unison Health",
  description: "Agenda tu consulta inicial o continúa tu seguimiento con el Dr. Ismael Muñoz y la nutrióloga Diana Vázquez.",
};

export default function BookingPage() {
  return (
    <div className="booking-page" data-scene="blanco">
      <HeaderCC homeLinks />
      <Booking />
    </div>
  );
}
