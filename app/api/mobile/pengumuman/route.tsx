import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const body: any = await request.json();
    const data = JSON.parse(body.data);
    await prisma.pengumumanTb.create({
        data: {
            judul: data.judul,
            isi: data.isi,
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const user = await prisma.pengumumanTb.findMany({
        orderBy: {
            judul: 'asc'
        }
    });
    return NextResponse.json(user, { status: 200 })
}