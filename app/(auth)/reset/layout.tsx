import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
  description:
    "Establece una nueva contraseña para tu cuenta de Tasker.",
};

export default function ResetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}