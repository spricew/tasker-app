interface RegisterData {
  nombre: string;
  email: string;
  password?: string;
}

export async function registerUser(data: RegisterData) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Ocurrió un error inesperado");
  }

  return res.json();
}

export interface LoginData {
  email: string;
  password?: string;
}

export async function loginUser(data: LoginData) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Ocurrió un error al iniciar sesión");
  }

  return res.json();
}

export async function requestPasswordReset(email: string) {
  const res = await fetch("/api/auth/recover", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error al solicitar recuperación");
  }

  return res.json();
}