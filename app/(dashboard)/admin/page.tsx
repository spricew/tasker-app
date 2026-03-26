import UsersTable from "@/components/layout/UsersTable";
import CreateUserModal from "@/components/layout/CreateUserModal";

export default function Admin() {
    return (
        <div className="flex flex-col flex-1 gap-y-8 px-18 py-12">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl tracking-tighter font-semibold">Admin Dashboard</h1>
                    <p>Gestión completa de estudiantes y administradores del sistema.</p>
                </div>
                
                <CreateUserModal />
            </header>
            
            <UsersTable />
        </div>
    );
}