import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { json } from "stream/consumers";

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const body = await request.json();
    const pengumuman = await prisma.pengumumanTb.create({
        data: {
            judul: body.judul,
            isi: body.isi,
        }
    })
    return NextResponse.json({ pesan: 'berhasil',data: pengumuman })
}

export const GET = async () => {
    const pengumuman = await prisma.pengumumanTb.findMany({
        orderBy: {
            judul: 'asc'
        }
    });
    return NextResponse.json({ pesan: 'berhasil',data: pengumuman })
}