import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import { Pencil, Trash2 } from "lucide-react";

interface TableRowProps { 
    name: string;
    email: string;
    role: "ADMIN" | "USER";
}

export default function TableRow({ name, email, role }: TableRowProps) {
    return (
        <tr className="border-b border-outline-variant nth-last-[1]:border-0">
            <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {name}
            </td>
            <td className="px-6 py-4">
                {email}
            </td>
            <td className="px-6 py-4">
                {role}
            </td>
            <td className="flex justify-center items-center px-6 py-4 gap-2">
                <TertiaryButton Icon={<Pencil strokeWidth={2.6} className="size-6" />} theme="secondary" />
                <TertiaryButton Icon={<Trash2 strokeWidth={2.6} className="size-6" />} theme="destructive" />
            </td>
        </tr>
    );
}