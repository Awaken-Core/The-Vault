/*
  Warnings:

  - You are about to drop the column `serviceId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseId` on the `quotation` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `quotation` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `service` table. All the data in the column will be lost.
  - You are about to drop the `purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_installment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productPurchaseId]` on the table `quotation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[servicePurchaseId]` on the table `quotation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `price` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_userId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_installment" DROP CONSTRAINT "purchase_installment_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_item" DROP CONSTRAINT "purchase_item_productId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_item" DROP CONSTRAINT "purchase_item_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "quotation" DROP CONSTRAINT "quotation_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "quotation" DROP CONSTRAINT "quotation_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_userId_fkey";

-- DropIndex
DROP INDEX "quotation_purchaseId_key";

-- DropIndex
DROP INDEX "quotation_subscriptionId_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "serviceId",
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "quotation" DROP COLUMN "purchaseId",
DROP COLUMN "subscriptionId",
ADD COLUMN     "productPurchaseId" TEXT,
ADD COLUMN     "servicePurchaseId" TEXT;

-- AlterTable
ALTER TABLE "service" DROP COLUMN "price";

-- DropTable
DROP TABLE "purchase";

-- DropTable
DROP TABLE "purchase_installment";

-- DropTable
DROP TABLE "purchase_item";

-- DropTable
DROP TABLE "subscription";

-- DropEnum
DROP TYPE "SubscriptionStatus";

-- DropEnum
DROP TYPE "SubscriptionTier";

-- CreateTable
CREATE TABLE "product_purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "polarOrderId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "polarOrderId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "installmentCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_purchase_installment" (
    "id" TEXT NOT NULL,
    "servicePurchaseId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "status" "InstallmentStatus" NOT NULL DEFAULT 'PENDING',
    "polarOrderId" TEXT,

    CONSTRAINT "service_purchase_installment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToProductPurchase" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductToProductPurchase_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ServiceToServicePurchase" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ServiceToServicePurchase_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_purchase_polarOrderId_key" ON "product_purchase"("polarOrderId");

-- CreateIndex
CREATE INDEX "product_purchase_userId_idx" ON "product_purchase"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "service_purchase_polarOrderId_key" ON "service_purchase"("polarOrderId");

-- CreateIndex
CREATE INDEX "service_purchase_userId_idx" ON "service_purchase"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "service_purchase_installment_polarOrderId_key" ON "service_purchase_installment"("polarOrderId");

-- CreateIndex
CREATE INDEX "service_purchase_installment_servicePurchaseId_idx" ON "service_purchase_installment"("servicePurchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "service_purchase_installment_servicePurchaseId_number_key" ON "service_purchase_installment"("servicePurchaseId", "number");

-- CreateIndex
CREATE INDEX "_ProductToProductPurchase_B_index" ON "_ProductToProductPurchase"("B");

-- CreateIndex
CREATE INDEX "_ServiceToServicePurchase_B_index" ON "_ServiceToServicePurchase"("B");

-- CreateIndex
CREATE UNIQUE INDEX "quotation_productPurchaseId_key" ON "quotation"("productPurchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "quotation_servicePurchaseId_key" ON "quotation"("servicePurchaseId");

-- AddForeignKey
ALTER TABLE "product_purchase" ADD CONSTRAINT "product_purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_purchase" ADD CONSTRAINT "service_purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_purchase_installment" ADD CONSTRAINT "service_purchase_installment_servicePurchaseId_fkey" FOREIGN KEY ("servicePurchaseId") REFERENCES "service_purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation" ADD CONSTRAINT "quotation_productPurchaseId_fkey" FOREIGN KEY ("productPurchaseId") REFERENCES "product_purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation" ADD CONSTRAINT "quotation_servicePurchaseId_fkey" FOREIGN KEY ("servicePurchaseId") REFERENCES "service_purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductPurchase" ADD CONSTRAINT "_ProductToProductPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductPurchase" ADD CONSTRAINT "_ProductToProductPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "product_purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToServicePurchase" ADD CONSTRAINT "_ServiceToServicePurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToServicePurchase" ADD CONSTRAINT "_ServiceToServicePurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "service_purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
