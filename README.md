# Tasker

Task management web application built with **Next.js**, **Prisma**, and **PostgreSQL**. It lets students organize their daily tasks and allows administrators to manage user profiles, with JWT-based authentication and role-based access control.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Database](#database)
- [Available scripts](#available-scripts)
- [Application routes](#application-routes)
- [API](#api)
- [Authentication & security](#authentication--security)
- [Deployment](#deployment)

## Features

- **Landing page** with feature sections, usage steps, and a call to action.
- **Full authentication**:
  - User registration.
  - Login with `httpOnly` cookie-based sessions.
  - Password recovery via a temporary link sent by email (Resend).
  - Password reset with a single-purpose token (15 min validity).
- **Student dashboard**:
  - List of own tasks.
  - Create, complete, and delete tasks.
  - Log out.
- **Admin dashboard**:
  - List of all users.
  - Create, edit, and delete profiles.
  - Role assignment (`ADMIN` / `USER`).
- **Role-based access control** with protected routes and endpoints.
- **Design** built with Tailwind CSS v4, custom typography, and Framer Motion animations.

## Tech stack

| Layer        | Technology                                     |
|--------------|------------------------------------------------|
| Framework    | Next.js 16 (App Router), React 19              |
| Language     | TypeScript                                     |
| Styling      | Tailwind CSS v4                                |
| ORM          | Prisma 6                                       |
| Database     | PostgreSQL (Neon)                              |
| Auth         | JWT (`jsonwebtoken`) + cookies                 |
| Passwords    | `bcryptjs`                                     |
| Email        | Resend                                         |
| Animation    | Framer Motion, `lucide-react`                  |
| Notifications | `sileo`                                       |

## Project structure

```
.
├── app/
│   ├── (auth)/               # Auth pages (login, register, recover, reset)
│   ├── (dashboard)/
│   │   ├── admin/            # Admin dashboard
│   │   └── student/          # Student dashboard
│   ├── api/
│   │   ├── auth/             # Authentication endpoints
│   │   ├── tasks/            # Task endpoints
│   │   └── users/            # User endpoints
│   ├── actions/              # Server Actions (logout)
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── layout/               # Navbar, Footer, Hero, tables, forms
│   └── ui/                   # Reusable components (buttons, inputs, modals)
├── lib/
│   ├── api/                  # API client modules
│   ├── data/                 # Data access layer (Prisma)
│   ├── auth.ts               # Authorization middleware (JWT)
│   ├── db.ts                 # Prisma client singleton
│   └── landing.ts            # Landing page data
├── prisma/
│   ├── migrations/           # Database migrations
│   ├── schema.prisma         # Data schema
│   └── seed.ts               # Admin user seed
├── proxy.ts                  # Route protection middleware
├── next.config.ts
└── package.json
```

## Prerequisites

- Node.js 20 or higher.
- npm (bundled with Node.js).
- A PostgreSQL instance (local or cloud-hosted, e.g. Neon).
- A Resend account with an API key for sending recovery emails.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

   The `postinstall` step automatically runs `prisma generate`.

2. Create a `.env` file at the project root and define the variables listed in [Environment variables](#environment-variables).

3. Sync the database with the schema:

   ```bash
   npx prisma migrate dev
   ```

4. Seed the initial administrator user:

   ```bash
   npm run seed
   ```

   > Requires `ADMIN_EMAIL` and `ADMIN_PASSWORD` to be defined in `.env`.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable                | Description                                                          | Example                  |
|-------------------------|----------------------------------------------------------------------|--------------------------|
| `DATABASE_URL`          | PostgreSQL connection string (pooler).                               | `postgresql://...`       |
| `DIRECT_URL`            | Direct PostgreSQL connection (used for migrations).                  | `postgresql://...`       |
| `JWT_SECRET`            | Secret used to sign and verify JWT tokens.                           | `your-secure-secret`     |
| `RESEND_API_KEY`        | Resend API key for sending emails.                                   | `re_...`                 |
| `NEXT_PUBLIC_APP_URL`   | Public URL of the app (used in reset links).                         | `http://localhost:3000`  |
| `ADMIN_EMAIL`           | Email of the initial administrator (seed).                           | `admin@example.com`      |
| `ADMIN_PASSWORD`        | Password of the initial administrator (seed).                        | `secure-password`        |

## Database

### Data model (`prisma/schema.prisma`)

- **User**: `id` (UUID), `nombre`, `email` (unique), `password` (hash), `rol` (`ADMIN` | `USER`), timestamps.
- **Task**: `id` (CUID), `title`, `completed` (boolean), `userId` (FK → User), `createdAt`.
  - The relationship cascades on delete: deleting a user deletes their tasks.

### Migrations

Create a new migration after modifying the schema:

```bash
npx prisma migrate dev --name change_description
```

### Seed

The seed creates an admin user if one does not exist. Run it with:

```bash
npm run seed
```

## Available scripts

| Command               | Description                                        |
|-----------------------|----------------------------------------------------|
| `npm run dev`         | Starts the development server.                     |
| `npm run build`       | Builds the app for production.                     |
| `npm run start`       | Starts the production server.                      |
| `npm run lint`        | Runs ESLint over the codebase.                     |
| `npm run seed`        | Runs the database seed.                            |
| `npm run postinstall` | Generates the Prisma client after installing deps. |

## Application routes

| Route      | Access               | Description                                        |
|------------|----------------------|----------------------------------------------------|
| `/`        | Public               | Landing page.                                      |
| `/login`   | Public               | Login page.                                        |
| `/register`| Public               | Account registration.                              |
| `/recover` | Public               | Password recovery request.                         |
| `/reset`   | Public               | Password reset (token in query string).            |
| `/student` | Authenticated users  | Student dashboard (tasks).                         |
| `/admin`   | `ADMIN` only         | Admin dashboard (user management).                 |

Route protection is implemented in `proxy.ts` via Next.js middleware: visitors without a token are redirected to `/login`, and `/admin` is restricted to users with the `ADMIN` role.

## API

### Authentication

| Method | Route               | Description                                              |
|--------|---------------------|----------------------------------------------------------|
| POST   | `/api/auth/register`| Registers a new user (role forced to `USER`).            |
| POST   | `/api/auth/login`   | Logs in and sets the `tasker_token` cookie.              |
| POST   | `/api/auth/recover` | Sends an email with the reset link.                     |
| POST   | `/api/auth/reset`   | Updates the password using a recovery token.             |

### Users (requires `ADMIN` role)

| Method | Route            | Description                                        |
|--------|------------------|----------------------------------------------------|
| GET    | `/api/users`     | Lists all users.                                   |
| POST   | `/api/users`     | Creates a user.                                    |
| PATCH  | `/api/users/:id` | Updates name, email, role, and/or password.        |
| DELETE | `/api/users/:id` | Deletes a user (and their tasks).                  |

### Tasks (requires session)

| Method | Route            | Description                                        |
|--------|------------------|----------------------------------------------------|
| GET    | `/api/tasks`     | Lists the authenticated user's tasks.              |
| POST   | `/api/tasks`     | Creates a task (`title` required).                 |
| PATCH  | `/api/tasks/:id` | Marks a task as completed (`completed`).           |
| DELETE | `/api/tasks/:id` | Deletes a task owned by the authenticated user.    |

> Task endpoints verify that the resource belongs to the authenticated user (`403` otherwise).

## Authentication & security

- Passwords are stored as `bcryptjs` hashes (never in plain text).
- Sessions are maintained with a JWT signed using `JWT_SECRET` and stored in an `httpOnly`, `sameSite: strict` cookie that expires after 8 hours.
- `requireAdmin()` (`lib/auth.ts`) protects the user endpoints and returns `401`/`403` depending on session state and role.
- The password recovery token is single-purpose (`proposito: 'recuperacion'`) and expires after 15 minutes.

## Deployment

The application can be deployed on platforms that support Next.js, such as **Vercel**:

1. Connect the repository to your Vercel project.
2. Configure the environment variables listed in [Environment variables](#environment-variables).
3. Set `NEXT_PUBLIC_APP_URL` to the production URL so recovery links work correctly.
4. Run migrations (`npx prisma migrate deploy`) and the seed against the production database.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
