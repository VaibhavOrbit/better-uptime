/*
  Warnings:

  - You are about to drop the `WebsiteTick` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."WebsiteTick" DROP CONSTRAINT "WebsiteTick_region_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."WebsiteTick" DROP CONSTRAINT "WebsiteTick_website_id_fkey";

-- DropTable
DROP TABLE "public"."WebsiteTick";

-- CreateTable
CREATE TABLE "public"."website_tick" (
    "id" TEXT NOT NULL,
    "response_time_ms" INTEGER NOT NULL,
    "status" "public"."WebsiteStatus" NOT NULL,
    "region_id" TEXT NOT NULL,
    "website_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "website_tick_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."website_tick" ADD CONSTRAINT "website_tick_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "public"."Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."website_tick" ADD CONSTRAINT "website_tick_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "public"."website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
