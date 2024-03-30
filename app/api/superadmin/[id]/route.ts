import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    const newpass = formData.get('newpass')
    const newfoto = formData.get('newfoto')
    const cekhp = await prisma.adminTb.findMany({
        where: {
            hp: String(formData.get('hp')),
            NOT: {
                id: Number(params.id)
            }
        }
    })
    const cekwa = await prisma.adminTb.findMany({
        where: {
            wa: String(formData.get('wa')),
            NOT: {
                id: Number(params.id)
            }
        }
    })
    if (cekhp.length > 0) {
        return NextResponse.json({ status: 555, pesan: "sudah ada hp" })
    }
    if (cekwa.length > 0) {
        return NextResponse.json({ status: 555, pesan: "sudah ada wa" })
    }
    await prisma.adminTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            nama: String(formData.get('nama')),
            hp: String(formData.get('hp')),
            wa: String(formData.get('wa')),
        }
    })
    if (newpass === 'yes') {
        await prisma.adminTb.update({
            where: {
                id: Number(params.id)
            },
            data: {
                password: await bcrypt.hash(String(formData.get('password')), 10),
            }
        })
    }
    if (newfoto === 'yes') {
        await prisma.adminTb.update({
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

    await prisma.adminTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json({ status: 200 })
}