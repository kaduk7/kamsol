import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    const ceknik = await prisma.simpatisanTb.findUnique({
        where: {
            NIK: String(formData.get('NIK')),
        }
    })
    if (ceknik) {
        return NextResponse.json({ pesan: "NIK sudah ada" })
    }
    await prisma.simpatisanTb.create({
        data: {
            NIK: String(formData.get('NIK')),
            nama: String(formData.get('nama')),
            tempatLahir:  String(formData.get('tempatLahir')),
            tanggalLahir: String(formData.get('tanggalLahir')),
            jekel: String(formData.get('jekel')),
            golDarah: String(formData.get('golDarah')),
            alamat: String(formData.get('alamat')),
            agama: String(formData.get('agama')),
            statusPerkawinan: String(formData.get('status')),
            pekerjaan: String(formData.get('pekerjaan')),
            kewarganegaraan: String(formData.get('kewarganegaraan')),
            berlakuHingga: String(formData.get('berlaku')),
            foto: String(formData.get('namaunik')),
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const user = await prisma.simpatisanTb.findMany({
        orderBy: {
            nama: 'asc'
        }
    });
    return NextResponse.json(user, { status: 200 })
}