-- CreateEnum
CREATE TYPE "VenueStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'UNDER_MAINTENANCE');

-- CreateTable
CREATE TABLE "Venue" (
    "venue_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "sport_type" TEXT NOT NULL,
    "description" TEXT,
    "price_per_slot" DOUBLE PRECISION NOT NULL,
    "amenities" TEXT[],
    "images" TEXT[],
    "status" "VenueStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partner_id" TEXT NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("venue_id")
);

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Vendor"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;
