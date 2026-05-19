/*
  Warnings:

  - You are about to drop the `ourpartnersectionone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ourpartnersectiononeimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ourpartnersectiontwo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ourpartnersectiontwoimage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ourpartnersectionone` DROP FOREIGN KEY `ourpartnersectionone_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `ourpartnersectiononeimage` DROP FOREIGN KEY `ourpartnersectiononeimage_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `ourpartnersectiontwo` DROP FOREIGN KEY `ourpartnersectiontwo_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `ourpartnersectiontwoimage` DROP FOREIGN KEY `ourpartnersectiontwoimage_sectionId_fkey`;

-- DropTable
DROP TABLE `ourpartnersectionone`;

-- DropTable
DROP TABLE `ourpartnersectiononeimage`;

-- DropTable
DROP TABLE `ourpartnersectiontwo`;

-- DropTable
DROP TABLE `ourpartnersectiontwoimage`;

-- CreateTable
CREATE TABLE `ourpartnerbankpartners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `pageId` INTEGER NOT NULL,

    UNIQUE INDEX `ourpartnerbankpartners_pageId_key`(`pageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ourpartnerbankpartnerimage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageURL` VARCHAR(191) NOT NULL,
    `sectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ourpartnerotherpartners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `pageId` INTEGER NOT NULL,

    UNIQUE INDEX `ourpartnerotherpartners_pageId_key`(`pageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ourpartnerotherpartnerimage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageURL` VARCHAR(191) NOT NULL,
    `sectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ourpartnerbankpartners` ADD CONSTRAINT `ourpartnerbankpartners_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourpartnerbankpartnerimage` ADD CONSTRAINT `ourpartnerbankpartnerimage_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ourpartnerbankpartners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourpartnerotherpartners` ADD CONSTRAINT `ourpartnerotherpartners_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourpartnerotherpartnerimage` ADD CONSTRAINT `ourpartnerotherpartnerimage_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ourpartnerotherpartners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
