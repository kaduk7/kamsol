import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    const newfoto = formData.get('newfoto')
    await prisma.simpatisanTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
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
        }
    })
    if (newfoto === 'yes') {
        await prisma.simpatisanTb.update({
            where: {
                id: Number(params.id)
            },
            data: {
                foto: String(formData.get('namaunik')),
            }
        })
    }
    return NextResponse.json({ status: 200, pesan: "berhasil" })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    await prisma.simpatisanTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json({ status: 200 })
}