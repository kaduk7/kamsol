import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { json } from "stream/consumers";

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const body: any = await request.json();
    await prisma.pengumumanTb.create({
        data: {
            judul: body.judul,
            isi: body.isi,
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