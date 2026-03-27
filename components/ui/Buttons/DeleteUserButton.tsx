"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUserById } from "@/lib/api/users";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import { Trash2 } from "lucide-react";

export default function DeleteUserButton({ userId }: { userId: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

        setIsDeleting(true);
        try {
            await deleteUserById(userId);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar el usuario");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={isDeleting ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}>
            <TertiaryButton Icon={<Trash2 strokeWidth={2.6} className="size-6"/>} theme="destructive" onClick={handleDelete} />
        </div>
    );
}