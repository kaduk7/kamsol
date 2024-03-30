import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    await prisma.beritaTb.create({
        data: {
            judul: String(formData.get('judul')),
            tanggalBerita: String(formData.get('tanggalBerita')),
            deskripsi: String(formData.get('deskripsi')),
            foto: String(formData.get('namaunik')),
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const user = await prisma.beritaTb.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    });
    return NextResponse.json(user, { status: 200 })
}