/*
  Warnings:

  - A unique constraint covering the columns `[adminName]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "admin_adminName_key" ON "admin"("adminName");
