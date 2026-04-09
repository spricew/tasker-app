'use client'

import { useRouter } from "next/navigation";
import { deleteTask } from "@/lib/api/tasks";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import { Trash2 } from "lucide-react";

export default function DeleteTaskButton({
    id,
    isLoading,
    onDeleteStart
}: {
    id: string;
    isLoading: boolean;
    onDeleteStart: () => void;
}) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            onDeleteStart();
            await deleteTask(id);
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TertiaryButton
            Icon={<Trash2 className="size-5" />}
            onClick={handleDelete}
            disabled={isLoading}
            theme="destructive"
            title="Eliminar tarea"
            extraclass="opacity-0 group-hover:opacity-100"
        />
    );
}