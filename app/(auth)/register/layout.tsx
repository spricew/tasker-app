import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description:
    "Crea tu cuenta gratis en Tasker y organiza tu día con elegancia y simplicidad.",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}