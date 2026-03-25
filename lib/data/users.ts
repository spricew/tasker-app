import prisma from "@/lib/db";

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