import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    const cekhp = await prisma.adminTb.findUnique({
        where: {
            hp: String(formData.get('hp')),
        }
    })
    const cekwa = await prisma.adminTb.findUnique({
        where: {
            wa: String(formData.get('wa')),
        }
    })
    if (cekhp) {
        return NextResponse.json({ pesan: "Nohp sudah ada" })
    }
    if (cekwa) {
        return NextResponse.json({ pesan: "Nowa sudah ada" })
    }
    await prisma.adminTb.create({
        data: {
            nama: String(formData.get('nama')),
            role: 'Admin',
            hp: String(formData.get('hp')),
            wa: String(formData.get('wa')),
            foto: String(formData.get('namaunik')),
            password: await bcrypt.hash(String(formData.get('password')), 10),
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const admin = await prisma.adminTb.findMany({
        where: {
            NOT: {
                role: 'Superadmin'
            }
        },
        orderBy: {
            nama: 'asc'
        }
    });
    return NextResponse.json(admin, { status: 200 })
}