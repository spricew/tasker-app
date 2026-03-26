export interface CreateUserData {
    nombre: string;
    email: string;
    password?: string;
    rol: 'ADMIN' | 'USER'; 
  }
  
  export async function createUserByAdmin(data: CreateUserData) {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al crear usuario desde el panel");
    }
  
    return res.json();
  }