import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return users;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return []; // Return an empty array in case of error to prevent breaking the UI
    }
}

export async function createUser(data: {
    nombre: string;
    email: string;
    password: string;
    rol?: 'ADMIN' | 'USER';
}) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            throw new Error("El correo ya está registrado");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = await prisma.user.create({
            data: {
                nombre: data.nombre,
                email: data.email,
                password: hashedPassword,
                rol: data.rol || 'USER',
            },
            select: { id: true, nombre: true, email: true, rol: true }
        });

        return newUser;

    } catch (error: any) {
        console.error("Error creando usuario en la BD:", error.message);
        if (error.message === "El correo ya está registrado") {
            throw error;
        } else {
            throw new Error("No se pudo crear el usuario. Error interno.");
        }
    }
}

export async function deleteUser(id: string) {
    try {

        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        });
        return deletedUser;
    } catch (error) {
        console.error("Error eliminando usuario en la BD:", error);
        throw new Error("No se pudo eliminar el usuario");
    }
}