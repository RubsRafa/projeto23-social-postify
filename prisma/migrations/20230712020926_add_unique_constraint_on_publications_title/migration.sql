/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Publications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Publications" ALTER COLUMN "published" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Publications_title_key" ON "Publications"("title");
