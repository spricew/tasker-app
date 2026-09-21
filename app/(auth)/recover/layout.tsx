import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
  description:
    "Recibe un enlace por correo para recuperar el acceso a tu cuenta de Tasker.",
};

export default function RecoverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}