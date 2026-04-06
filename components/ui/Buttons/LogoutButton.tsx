'use client'

import { sileo } from 'sileo';
import { logoutAction } from '@/app/actions/auth';
import TertiaryButton from "./TertiaryButton";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const handleClick = () => {
        sileo.warning({
            title: "Cerrar sesión",
            icon: <LogOut className="size-3.5 text-inherit" />,
            description: "¿Estás seguro de que deseas salir de tu cuenta?",
            button: {
                title: "Cerrar sesión",
                onClick: () => {logoutAction()},
            },
    
            styles: {
                title: "text-[#FB2C36]!",
                description: "text-white/75!",
                badge: "bg-[#441B1D]! text-[#FB2C36]!",
                button: "bg-[#441B1D]! text-[#FB2C36]!",
            },
        });
    }
    return (
        <TertiaryButton
            text="Cerrar sesión"
            theme="destructive"
            Icon={<LogOut className="size-[1em] stroke-2" />}
            iconPosition="left"
            onClick={() => handleClick()}
        />
    );
}