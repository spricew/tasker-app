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