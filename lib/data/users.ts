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

export async function updateUser(id: string, data: {
    nombre: string;
    email: string;
    rol: 'ADMIN' | 'USER';
    password?: string;
}) {
    try {
        const dataToUpdate: any = {
            nombre: data.nombre,
            email: data.email,
            rol: data.rol,
        };

        if (data.password && data.password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            dataToUpdate.password = await bcrypt.hash(data.password, salt);
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: dataToUpdate,
            select: { id: true, nombre: true, email: true, rol: true }
        });

        return updatedUser;

    } catch (error: any) {
        console.error("Error actualizando usuario en la BD:", error);

        // Si Prisma falla porque el email ya lo tiene otra persona (Error P2002)
        if (error.code === 'P2002') {
            throw new Error("El correo ya está en uso por otro usuario");
        }
        throw new Error("No se pudo actualizar el usuario");
    }
}