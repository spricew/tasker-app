import TableRow from "@/components/ui/TableRow";
import prisma from "@/lib/db";

export default async function UsersTable() {

    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' } // Los ordenamos por fecha de creación
    });
    return (
        <div className="squircle rounded-2xl bg-surface-container-lowest shadow-xs">
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm border-b border-outline-variant">
                    <tr>
                        <th scope="col" className="tracking-tight text-base px-6 py-5 font-medium">Nombre completo</th>
                        <th scope="col" className="tracking-tight text-base px-6 py-5 font-medium">Email</th>
                        <th scope="col" className="tracking-tight text-base px-6 py-5 font-medium">Rol</th>
                        <th scope="col" className="tracking-tight text-base px-6 py-5 font-medium text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 4. Mapeamos los usuarios reales de la base de datos */}
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            name={user.nombre} // Cambiado a 'nombre' (como en el schema)
                            email={user.email}
                            role={user.rol}    // Cambiado a 'rol' (como en el schema)
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}