/*
  Warnings:

  - A unique constraint covering the columns `[name,location]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Venue_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Venue_name_location_key" ON "Venue"("name", "location");
