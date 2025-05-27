/*
  Warnings:

  - The values [PRIMARY,SECONDARY,TERTIARY,UNIVERSITY,POSTGRADUATE,DOCTORATE] on the enum `EducationLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EducationLevel_new" AS ENUM ('Primaria', 'Secundaria', 'Terciaria', 'Universitaria', 'Posgrado', 'Doctorado');
ALTER TABLE "Candidate" ALTER COLUMN "educationLevel" TYPE "EducationLevel_new" USING ("educationLevel"::text::"EducationLevel_new");
ALTER TYPE "EducationLevel" RENAME TO "EducationLevel_old";
ALTER TYPE "EducationLevel_new" RENAME TO "EducationLevel";
DROP TYPE "EducationLevel_old";
COMMIT;
