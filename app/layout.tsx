import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sileo";

export const metadata: Metadata = {
  title: "Tasker — Tu día, una aventura",
  description: "Organiza tus tareas con una elegancia y simplicidad inigualables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Toaster position="top-center" theme="light" options={{fill: "#171717"}}/>
        {children}
      </body>
    </html>
  );
}
