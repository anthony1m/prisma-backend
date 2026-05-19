/*
  Warnings:

  - You are about to drop the column `pageId` on the `homefooter` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `navigationbar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `homefooter` DROP FOREIGN KEY `homefooter_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `navigationbar` DROP FOREIGN KEY `navigationbar_pageId_fkey`;

-- DropIndex
DROP INDEX `homefooter_pageId_key` ON `homefooter`;

-- DropIndex
DROP INDEX `navigationbar_pageId_key` ON `navigationbar`;

-- AlterTable
ALTER TABLE `homefooter` DROP COLUMN `pageId`,
    MODIFY `id` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `navigationbar` DROP COLUMN `pageId`,
    MODIFY `id` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `aboutusbanner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `pageId` INTEGER NOT NULL,

    UNIQUE INDEX `aboutusbanner_pageId_key`(`pageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aboutusbanner` ADD CONSTRAINT `aboutusbanner_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
