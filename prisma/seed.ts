import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@tasker.com';
    const plainPassword = 'password123';

    console.log('Iniciando la siembra de datos...');

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (existingAdmin) {
        console.log('⚠️ El administrador ya existe en la base de datos.');
        return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await prisma.user.create({
        data: {
            nombre: 'Admin Principal',
            email: adminEmail,
            password: hashedPassword,
            rol: 'ADMIN',
        },
    });

    console.log(`✅ ¡Administrador creado con éxito!`);
    console.log(`📧 Correo: ${admin.email}`);
    console.log(`🔑 Contraseña: ${plainPassword}`);
}

main()
    .catch((e) => {
        console.error('Error al sembrar la base de datos:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });