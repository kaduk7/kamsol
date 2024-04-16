import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { json } from "stream/consumers";

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const { judul, isi } = await request.json(); // Mengurai dan mengambil judul dan isi dari request
        
    const pengumuman = await prisma.pengumumanTb.create({
        data: {
            judul: judul, // Menyimpan judul
            isi: isi      // Menyimpan isi
        }
    });
    return NextResponse.json({ pesan: 'berhasil',data: pengumuman })
}

export const GET = async () => {
    const user = await prisma.pengumumanTb.findMany({
        orderBy: {
            judul: 'asc'
        }
    });
    return NextResponse.json(user, { status: 200 })
}