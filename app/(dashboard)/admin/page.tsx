import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";

import { Plus, Pencil, Trash2 } from "lucide-react";

export default function Admin() {
    return (
        <div className="flex flex-col flex-1 gap-y-8 px-18 py-12">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl tracking-tighter font-semibold">Admin Dashboard</h1>
                    <p>Officia proident ut dolore magna qui consectetur mollit et id enim fugiat sint nisi labore.</p>
                </div>

                <PrimaryButton
                    text="Crear usuario"
                    Icon={<Plus strokeWidth={3} className="size-[1.02em]"/>}
                    glow
                />
            </header>


            <div className="squircle rounded-2xl bg-surface-container-lowest shadow-xs">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm border-b border-outline-variant">
                        <tr>
                            <th scope="col" className="tracking-tight text-base px-6 py-5 font-medium">
                                Nombre completo
                            </th>
                            <th scope="col" className="tracking-tight text-base px-6 py-5 font-medium">
                                Email
                            </th>
                            <th scope="col" className="tracking-tight text-base px-6 py-5 font-medium">
                                Rol
                            </th>
                            <th scope="col" className="tracking-tight text-base px-6 py-5 font-medium text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-outline-variant nth-last-[1]:border-0">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                John Doe
                            </th>
                            <td className="px-6 py-4">
                                john@example.com
                            </td>
                            <td className="px-6 py-4">
                                Admin
                            </td>
                            <td className="flex justify-center items-center px-6 py-4 gap-2">
                                <TertiaryButton Icon={<Pencil strokeWidth={2.6} className="size-6"/>} theme="secondary" />
                                <TertiaryButton Icon={<Trash2 strokeWidth={2.6} className="size-6"/>} theme="destructive" />
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>

        </div>
    );
}