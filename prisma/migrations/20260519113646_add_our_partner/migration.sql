-- CreateTable
CREATE TABLE `ourpartnermainbanner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `pageId` INTEGER NOT NULL,

    UNIQUE INDEX `ourpartnermainbanner_pageId_key`(`pageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ourpartnersectionone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `pageId` INTEGER NOT NULL,

    UNIQUE INDEX `ourpartnersectionone_pageId_key`(`pageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ourpartnersectiononeimage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageURL` VARCHAR(191) NOT NULL,
    `sectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ourpartnersectiontwo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `pageId` INTEGER NOT NULL,

    UNIQUE INDEX `ourpartnersectiontwo_pageId_key`(`pageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ourpartnersectiontwoimage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageURL` VARCHAR(191) NOT NULL,
    `sectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ourpartnermainbanner` ADD CONSTRAINT `ourpartnermainbanner_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourpartnersectionone` ADD CONSTRAINT `ourpartnersectionone_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourpartnersectiononeimage` ADD CONSTRAINT `ourpartnersectiononeimage_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ourpartnersectionone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourpartnersectiontwo` ADD CONSTRAINT `ourpartnersectiontwo_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourpartnersectiontwoimage` ADD CONSTRAINT `ourpartnersectiontwoimage_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ourpartnersectiontwo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
