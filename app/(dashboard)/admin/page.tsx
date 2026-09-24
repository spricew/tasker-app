import Image from "next/image";
import { redirect } from "next/navigation";
import UsersTable from "@/components/layout/UsersTable";
import CreateUserModal from "@/components/layout/CreateUserButton";
import { getSessionUser } from "@/lib/auth";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Panel de administración",
    description:
        "Gestión completa de estudiantes y administradores del sistema Tasker.",
};

export default async function Admin() {
    const user = await getSessionUser();

    if (!user || user.rol !== 'ADMIN') {
        redirect('/student');
    }

    return (
        <div className="flex flex-col flex-1 gap-y-8 px-18 py-12 zoom-in">
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-x-5">
                    <Image src={"/images/dashboard-icon.png"} alt="" width={65} height={65} className="drop-shadow-xl" />
                    <div>
                        <h1 className="text-4xl tracking-tighter font-semibold">Admin Dashboard</h1>
                        <p>Gestión completa de estudiantes y administradores del sistema.</p>
                    </div>
                </div>

                <CreateUserModal />
            </header>

            <UsersTable />
        </div>
    );
}