import { Fraunces, Inter } from "next/font/google";
import { CircleCheck, CalendarCheck, Trophy } from "lucide-react";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const family = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const NAV_LINKS = [
  { label: "Características", href: "#features" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#contacto" },
];

export const FEATURES = [
  {
    icon: CircleCheck,
    badge: "bg-blue-500",
    title: "Tareas imposibles de perder",
    body: "Crea, edita y organiza todo en un solo lugar, con una interfaz pensada para la concentración y no para la decoración.",
  },
  {
    icon: CalendarCheck,
    badge: "bg-blue-500",
    title: "Plazos que se respetan",
    body: "Vence hoy, mañana o la próxima semana: Tasker te lo recuerda con el tono justo, antes de que sea tarde.",
  },
  {
    icon: Trophy,
    badge: "bg-blue-500",
    title: "Cada logro se celebra",
    body: "Marca completado y mira tu racha crecer. El progreso visible es el mejor motivador que existe.",
  },
];

export const STEPS = [
  {
    number: "01",
    badge: "bg-tertiary",
    title: "Crea tu cuenta",
    body: "Regístrate en menos de un minuto con tu correo y empieza a organizar tu día.",
  },
  {
    number: "02",
    badge: "bg-yellow-500",
    title: "Organiza tus tareas",
    body: "Añade tareas, plazos y prioridades desde un solo panel, sin distracciones.",
  },
  {
    number: "03",
    badge: "bg-green-500",
    title: "Completa y celebra",
    body: "Marca cada tarea como completada y observa tu racha de productividad crecer.",
  },
];
