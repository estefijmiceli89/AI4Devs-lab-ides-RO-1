-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('PRIMARY', 'SECONDARY', 'TERTIARY', 'UNIVERSITY', 'POSTGRADUATE', 'DOCTORATE');

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL,
    "institution" VARCHAR(200) NOT NULL,
    "degree" VARCHAR(150) NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "currentPosition" VARCHAR(100) NOT NULL,
    "currentCompany" VARCHAR(150) NOT NULL,
    "totalExperience" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "isCurrentlyWorking" BOOLEAN NOT NULL DEFAULT true,
    "endDate" TIMESTAMP(3),
    "experienceDescription" TEXT NOT NULL,
    "cvPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE INDEX "Candidate_email_idx" ON "Candidate"("email");

-- CreateIndex
CREATE INDEX "Candidate_firstName_lastName_idx" ON "Candidate"("firstName", "lastName");
