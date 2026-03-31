import { getAllUsers } from "@/lib/data/users";
import TableRow from "@/components/ui/TableRow";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function UsersTable() {

    const cookieStore = await cookies();
    const token = cookieStore.get('tasker_token')?.value;
    let loggedInUserId = null;
    if (token) {
        try {
            const JWT_SECRET = process.env.JWT_SECRET as string;
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
            loggedInUserId = decoded.id;
        } catch (error) {
            console.error("Error leyendo el token en la tabla");
        }
    }

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
                            isCurrentUser={user.id === loggedInUserId}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}