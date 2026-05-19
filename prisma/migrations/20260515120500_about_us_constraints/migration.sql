-- DropForeignKey
ALTER TABLE `aboutusbanner` DROP FOREIGN KEY `aboutusbanner_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `theexpansion` DROP FOREIGN KEY `theexpansion_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `ourvalues` DROP FOREIGN KEY `ourvalues_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `grouphistory` DROP FOREIGN KEY `grouphistory_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `strategicpresence` DROP FOREIGN KEY `strategicpresence_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `singaporeleadership` DROP FOREIGN KEY `singaporeleadership_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `strategicobjectives` DROP FOREIGN KEY `strategicobjectives_pageId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `theexpansion_pageId_title_key` ON `theexpansion`(`pageId`, `title`);

-- CreateIndex
CREATE UNIQUE INDEX `ourvalues_pageId_title_key` ON `ourvalues`(`pageId`, `title`);

-- CreateIndex
CREATE UNIQUE INDEX `singaporeleadership_pageId_title_key` ON `singaporeleadership`(`pageId`, `title`);

-- CreateIndex
CREATE UNIQUE INDEX `strategicobjectives_pageId_title_key` ON `strategicobjectives`(`pageId`, `title`);

-- AddForeignKey
ALTER TABLE `aboutusbanner` ADD CONSTRAINT `aboutusbanner_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `theexpansion` ADD CONSTRAINT `theexpansion_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourvalues` ADD CONSTRAINT `ourvalues_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grouphistory` ADD CONSTRAINT `grouphistory_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `strategicpresence` ADD CONSTRAINT `strategicpresence_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `singaporeleadership` ADD CONSTRAINT `singaporeleadership_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `strategicobjectives` ADD CONSTRAINT `strategicobjectives_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
