-- AlterTable
ALTER TABLE "Publications" ALTER COLUMN "dateToPublish" DROP DEFAULT,
ALTER COLUMN "dateToPublish" SET DATA TYPE TEXT;
