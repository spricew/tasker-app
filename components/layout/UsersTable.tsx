import { getAllUsers } from "@/lib/data/users";
import TableRow from "@/components/ui/TableRow";

export default async function UsersTable() {

    const users = await getAllUsers();
    return (
        <div className="squircle rounded-2xl bg-surface-container-lowest shadow-xs overflow-hidden">
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm border-b border-outline-variant">
                    <tr className="text-ref-palette-neutral-60">
                        <th scope="col" className="tracking-tight text-base px-6 py-4 font-medium">Nombre completo</th>
                        <th scope="col" className="tracking-tight text-base px-6 py-4 font-medium">Email</th>
                        <th scope="col" className="tracking-tight text-base px-6 py-4 font-medium">Rol</th>
                        <th scope="col" className="tracking-tight text-base px-6 py-4 font-medium text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            id={user.id}
                            name={user.nombre}
                            email={user.email}
                            role={user.rol}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}