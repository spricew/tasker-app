# Tasker

Aplicación web de gestión de tareas construida con **Next.js**, **Prisma** y **PostgreSQL**. Permite a estudiantes organizar sus tareas diarias y a administradores gestionar los perfiles de los usuarios, con autenticación basada en JWT y control de acceso por roles.

## Tabla de contenidos

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Puesta en marcha](#puesta-en-marcha)
- [Variables de entorno](#variables-de-entorno)
- [Base de datos](#base-de-datos)
- [Scripts disponibles](#scripts-disponibles)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [API](#api)
- [Autenticación y seguridad](#autenticación-y-seguridad)
- [Despliegue](#despliegue)

## Características

- **Página de aterrizaje** con secciones de características, pasos de uso y llamada a la acción.
- **Autenticación completa**:
  - Registro de usuarios.
  - Inicio de sesión con sesión basada en cookies `httpOnly`.
  - Recuperación de contraseña mediante enlace temporal enviado por correo (Resend).
  - Restablecimiento de contraseña con token de un solo propósito (15 min de vigencia).
- **Panel de estudiante**:
  - Listado de tareas propias.
  - Creación, completado y eliminación de tareas.
  - Cierre de sesión.
- **Panel de administración**:
  - Listado de todos los usuarios.
  - Creación, edición y eliminación de perfiles.
  - Asignación de roles (`ADMIN` / `USER`).
- **Control de acceso por roles** con protección de rutas y endpoints.
- **Diseño** con Tailwind CSS v4, tipografía personalizada y animaciones con Framer Motion.

## Stack tecnológico

| Capa       | Tecnología                                    |
|------------|-----------------------------------------------|
| Framework  | Next.js 16 (App Router), React 19             |
| Lenguaje   | TypeScript                                    |
| Estilos    | Tailwind CSS v4                               |
| ORM        | Prisma 6                                      |
| Base datos | PostgreSQL (Neon)                             |
| Auth       | JWT (`jsonwebtoken`) + cookies                |
| Passwords  | `bcryptjs`                                    |
| Correo     | Resend                                        |
| Animación  | Framer Motion, `lucide-react`                 |
| Notificaciones | `sileo`                                   |

## Estructura del proyecto

```
.
├── app/
│   ├── (auth)/               # Páginas de autenticación (login, register, recover, reset)
│   ├── (dashboard)/
│   │   ├── admin/            # Panel de administración
│   │   └── student/          # Panel de estudiante
│   ├── api/
│   │   ├── auth/             # Endpoints de autenticación
│   │   ├── tasks/            # Endpoints de tareas
│   │   └── users/            # Endpoints de usuarios
│   ├── actions/              # Server Actions (logout)
│   ├── layout.tsx            # Layout raíz
│   └── page.tsx              # Landing page
├── components/
│   ├── layout/               # Navbar, Footer, Hero, tablas, formularios
│   └── ui/                   # Componentes reutilizables (botones, inputs, modales)
├── lib/
│   ├── api/                  # Clientes de consumo de la API
│   ├── data/                 # Acceso a datos (Prisma)
│   ├── auth.ts               # Middleware de autorización (JWT)
│   ├── db.ts                 # Cliente singleton de Prisma
│   └── landing.ts            # Datos de la landing page
├── prisma/
│   ├── migrations/           # Migraciones de base de datos
│   ├── schema.prisma         # Esquema de datos
│   └── seed.ts               # Seed del usuario administrador
├── proxy.ts                  # Middleware de protección de rutas
├── next.config.ts
└── package.json
```

## Requisitos previos

- Node.js 20 o superior.
- npm (incluido con Node.js).
- Una instancia de PostgreSQL (local o en la nube, p. ej. Neon).
- Una cuenta de Resend con una API Key para el envío de correos de recuperación.

## Puesta en marcha

1. Instala las dependencias:

   ```bash
   npm install
   ```

   El paso `postinstall` ejecuta automáticamente `prisma generate`.

2. Crea el archivo `.env` en la raíz del proyecto y define las variables indicadas en [Variables de entorno](#variables-de-entorno).

3. Sincroniza la base de datos con el esquema:

   ```bash
   npx prisma migrate dev
   ```

4. Siembra el usuario administrador inicial:

   ```bash
   npm run seed
   ```

   > Requiere `ADMIN_EMAIL` y `ADMIN_PASSWORD` definidos en `.env`.

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable                  | Descripción                                                              | Ejemplo |
|---------------------------|--------------------------------------------------------------------------|---------|
| `DATABASE_URL`            | Cadena de conexión a PostgreSQL (pooler).                                | `postgresql://...` |
| `DIRECT_URL`              | Conexión directa a PostgreSQL (para migraciones).                        | `postgresql://...` |
| `JWT_SECRET`              | Secreto para firmar y verificar tokens JWT.                              | `tu-secreto-seguro` |
| `RESEND_API_KEY`          | API Key de Resend para el envío de correos.                              | `re_...` |
| `NEXT_PUBLIC_APP_URL`     | URL pública de la aplicación (usada en el enlace de restablecimiento).   | `http://localhost:3000` |
| `ADMIN_EMAIL`             | Correo del administrador inicial (seed).                                 | `admin@example.com` |
| `ADMIN_PASSWORD`          | Contraseña del administrador inicial (seed).                             | `clave-segura` |


## Base de datos

### Modelo de datos (`prisma/schema.prisma`)

- **User**: `id` (UUID), `nombre`, `email` (único), `password` (hash), `rol` (`ADMIN` | `USER`), timestamps.
- **Task**: `id` (CUID), `title`, `completed` (booleano), `userId` (FK → User), `createdAt`.
  - La relación elimina en cascada: al borrar un usuario se borran sus tareas.

### Migraciones

Crea una nueva migración tras modificar el esquema:

```bash
npx prisma migrate dev --name descripcion_del_cambio
```

### Seed

El seed crea un usuario administrador si no existe. Se ejecuta con:

```bash
npm run seed
```

## Scripts disponibles

| Comando           | Descripción                                        |
|-------------------|----------------------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo.                  |
| `npm run build`   | Compila la aplicación para producción.             |
| `npm run start`   | Inicia el servidor de producción.                  |
| `npm run lint`    | Ejecuta ESLint sobre el código.                    |
| `npm run seed`    | Ejecuta el seed de la base de datos.               |
| `npm run postinstall` | Genera el cliente de Prisma tras instalar.     |

## Rutas de la aplicación

| Ruta            | Acceso            | Descripción                                        |
|-----------------|-------------------|----------------------------------------------------|
| `/`             | Público           | Landing page.                                      |
| `/login`        | Público           | Inicio de sesión.                                  |
| `/register`     | Público           | Registro de cuenta.                                |
| `/recover`      | Público           | Solicitud de recuperación de contraseña.           |
| `/reset`        | Público           | Restablecimiento de contraseña (token en query).   |
| `/student`      | Usuario autenticado | Panel del estudiante (tareas).                   |
| `/admin`        | Solo `ADMIN`      | Panel de administración (gestión de usuarios).     |

La protección de rutas se implementa en `proxy.ts` mediante el middleware de Next.js: redirige a `/login` a los visitantes sin token y limita `/admin` a usuarios con rol `ADMIN`.

## API

### Autenticación

| Método | Ruta                | Descripción                                          |
|--------|---------------------|------------------------------------------------------|
| POST   | `/api/auth/register`| Registra un nuevo usuario (rol forzado a `USER`).    |
| POST   | `/api/auth/login`   | Inicia sesión y establece la cookie `tasker_token`.  |
| POST   | `/api/auth/recover` | Envía un correo con el enlace de restablecimiento.   |
| POST   | `/api/auth/reset`   | Actualiza la contraseña usando el token de recuperación. |

### Usuarios (requiere rol `ADMIN`)

| Método  | Ruta            | Descripción                                  |
|---------|-----------------|----------------------------------------------|
| GET     | `/api/users`    | Lista todos los usuarios.                    |
| POST    | `/api/users`    | Crea un usuario.                             |
| PATCH   | `/api/users/:id`| Actualiza nombre, correo, rol y/o contraseña.|
| DELETE  | `/api/users/:id`| Elimina un usuario (y sus tareas).           |

### Tareas (requiere sesión)

| Método  | Ruta            | Descripción                                      |
|---------|-----------------|--------------------------------------------------|
| GET     | `/api/tasks`    | Lista las tareas del usuario autenticado.        |
| POST    | `/api/tasks`    | Crea una tarea (`title` obligatorio).            |
| PATCH   | `/api/tasks/:id`| Marca una tarea como completada (`completed`).   |
| DELETE  | `/api/tasks/:id`| Elimina una tarea del usuario autenticado.       |

> Los endpoints de tareas validan que el recurso pertenezca al usuario autenticado (`403` en caso contrario).

## Autenticación y seguridad

- Las contraseñas se almacenan como hash de `bcryptjs` (nunca en texto plano).
- La sesión se mantiene con un JWT firmado con `JWT_SECRET` y guardado en una cookie `httpOnly`, `sameSite: strict`, con vencimiento de 8 horas.
- `requireAdmin()` (`lib/auth.ts`) protege los endpoints de usuarios y devuelve `401`/`403` según el estado de la sesión y el rol.
- El token de recuperación de contraseña es de un solo propósito (`proposito: 'recuperacion'`) y expira a los 15 minutos.

## Despliegue

La aplicación puede desplegarse en plataformas compatibles con Next.js, como **Vercel**:

1. Conecta el repositorio al proyecto en Vercel.
2. Configura las variables de entorno indicadas en [Variables de entorno](#variables-de-entorno).
3. Define `NEXT_PUBLIC_APP_URL` con la URL de producción para que los enlaces de recuperación funcionen correctamente.
4. Ejecuta las migraciones (`npx prisma migrate deploy`) y el seed contra la base de datos de producción.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
