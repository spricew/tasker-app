'use client';
import DeleteUserButton from "@/components/ui/Buttons/DeleteUserButton";
import EditUserButton from "@/components/ui/Buttons/EditUserButton";
import Pill from "./Pill";

interface TableRowProps {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    isCurrentUser?: boolean;
}

export default function TableRow({ id, name, email, role, isCurrentUser }: TableRowProps) {
    return (
        <tr className={`border-b border-outline-variant nth-last-[1]:border-0 ${isCurrentUser ? "bg-ref-palette-primary-90/30" : "bg-surface-container-lowest"}`}>
            <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap capitalize">
                {/* {name} {isCurrentUser && <span className="text-primary font-semibold ml-1">(Tú)</span>} */}
                {name} {isCurrentUser && <Pill text="You" />}
            </td>
            <td className="px-6 py-4">
                {email}
            </td>
            <td className={`px-6 py-4 ${role === "ADMIN" ? "text-primary" : "text-on-surface"}`}>
                {role === "ADMIN" ? "Administrador" : "Usuario"}
            </td>
            <td className="flex justify-center items-center px-6 py-4 gap-2">
                {!isCurrentUser && <EditUserButton
                    id={id}
                    currentName={name}
                    currentEmail={email}
                    currentRole={role}
                />}
                {!isCurrentUser && <DeleteUserButton userId={id} />}
            </td>
        </tr>
    );
}