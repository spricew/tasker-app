import prisma from "@/lib/db";

export async function getTasksByUserId(userId: string) {
  return await prisma.task.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function deleteTask(id: string) {
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: id
      }
    });
    return deletedTask;
  } catch (error) {
    console.error("Error eliminando usuario en la BD:", error);
    throw new Error("No se pudo eliminar el usuario");
  }
}