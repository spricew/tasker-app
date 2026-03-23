import Navbar from '@/components/layout/Navbar';
import "@/app/globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
    </>
  );
}