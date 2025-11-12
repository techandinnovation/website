-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "adminName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);
