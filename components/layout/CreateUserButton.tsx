"use client";

import { useState } from "react";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import { Plus } from "lucide-react";
import AnimatedModal from "@/components/ui/AnimatedModal";
import CreateUserForm from "@/components/layout/forms/CreateUserForm";

export default function CreateUserButton() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <PrimaryButton
                text="Crear usuario"
                Icon={<Plus strokeWidth={3} className="size-[1.02em]" />}
                glow
                onClick={() => setShowModal(true)}
            />

            <AnimatedModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Crear usuario"
                description="Ingresa los datos para crear un nuevo usuario"
            >
                <CreateUserForm onSuccess={() => setShowModal(false)} />
            </AnimatedModal>
        </>
    );
}