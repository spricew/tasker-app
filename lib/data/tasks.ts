import prisma from "@/lib/db";

export async function getTasksByUserId(userId: string) {
  return await prisma.task.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' }
  });
}