import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Accede a tu cuenta de Tasker y retoma el control de tu día.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}