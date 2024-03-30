-- CreateTable
CREATE TABLE "AdminTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "wa" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PengumumanTb" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PengumumanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeritaTb" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "tanggalBerita" TIMESTAMP(3) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeritaTb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminTb_hp_key" ON "AdminTb"("hp");

-- CreateIndex
CREATE UNIQUE INDEX "AdminTb_wa_key" ON "AdminTb"("wa");
