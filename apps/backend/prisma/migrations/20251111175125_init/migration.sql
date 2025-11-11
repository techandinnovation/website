-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('CSE', 'IOT', 'AIML', 'AIDS', 'CSDS', 'CSBS', 'ME', 'CE', 'EX', 'EE', 'ECE', 'OTHER');

-- CreateEnum
CREATE TYPE "Year" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('CORE_TEAM', 'VOLUNTEER');

-- CreateTable
CREATE TABLE "RecruitmentApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "branch" "Branch" NOT NULL,
    "year" "Year" NOT NULL,
    "domains" TEXT[],
    "skills" TEXT NOT NULL,
    "roleType" "RoleType" NOT NULL,
    "experience" TEXT,
    "portfolioLink" TEXT,
    "resumeUrl" TEXT,
    "hoursPerWeek" TEXT NOT NULL,
    "reasonToJoin" TEXT NOT NULL,
    "takeResponsibility" BOOLEAN NOT NULL,
    "confirmedInfo" BOOLEAN NOT NULL,
    "dataConsent" BOOLEAN NOT NULL,

    CONSTRAINT "RecruitmentApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecruitmentApplication_email_key" ON "RecruitmentApplication"("email");
