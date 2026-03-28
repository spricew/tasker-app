"use client";

import { sileo } from "sileo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUserById } from "@/lib/api/users";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import { Trash2 } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

export default function DeleteUserButton({ userId }: { userId: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const DeleteNotification = () => {
        const id = sileo.warning({
            title: "Eliminar usuario",
            icon: <Trash2 className="size-3.5 text-inherit" />,
            description: "¿Estás seguro de que deseas eliminar este usuario?",
            button: {
                title: "Eliminar",
                onClick: () => {handleDelete(id)},
            },
    
            styles: {
                title: "text-[#FB2C36]!",
                description: "text-white/75!",
                badge: "bg-[#441B1D]! text-[#FB2C36]!",
                button: "bg-[#441B1D]! text-[#FB2C36]!",
            },
        });
    }

    const handleDelete = async (id:string) => {

        setIsDeleting(true);
        try {
            await deleteUserById(userId);
            router.refresh();
        } catch (error:any) {
            console.error(error);
            sileo.error({
                title: "Error al eliminar usuario",
                position: "top-center",
                duration: 4500,
                autopilot: {
                    expand: 0,
                    collapse: 3500,
                },
                description: (
                    <span className="text-white font-medium">
                        {error.message}
                    </span>
                ),
            });
        } finally {
            setIsDeleting(false);
            sileo.dismiss(id);
        }
    };

    return (
        <div className={isDeleting ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}>
            <TertiaryButton Icon={<Trash2 strokeWidth={2.6} className="size-6" />} theme="destructive" onClick={DeleteNotification} />
        </div>
    );
}