import { Toaster } from "sileo";
import Navbar from '@/components/layout/Navbar';
import "@/app/globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-right" theme="dark" options={{fill: "#171717"}}/>

      <Navbar />

      <main className="flex-1">
        {children}
      </main>
    </>
  );
}