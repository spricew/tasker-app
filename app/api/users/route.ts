import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/data/users'; 

export async function GET() {
  try {
    const usuarios = await getAllUsers();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}