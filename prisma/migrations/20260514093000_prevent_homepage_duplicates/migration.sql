-- DropForeignKey
ALTER TABLE `groupmission` DROP FOREIGN KEY `groupmission_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `homefooter` DROP FOREIGN KEY `homefooter_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `mainbanner` DROP FOREIGN KEY `mainbanner_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `navigationbar` DROP FOREIGN KEY `navigationbar_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `ourmission` DROP FOREIGN KEY `ourmission_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `ourservices` DROP FOREIGN KEY `ourservices_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `whoweare` DROP FOREIGN KEY `whoweare_pageId_fkey`;

-- DropIndex
DROP INDEX `groupmission_pageId_fkey` ON `groupmission`;

-- DropIndex
DROP INDEX `homefooter_pageId_fkey` ON `homefooter`;

-- DropIndex
DROP INDEX `mainbanner_pageId_fkey` ON `mainbanner`;

-- DropIndex
DROP INDEX `navigationbar_pageId_fkey` ON `navigationbar`;

-- DropIndex
DROP INDEX `ourmission_pageId_fkey` ON `ourmission`;

-- DropIndex
DROP INDEX `ourservices_pageId_fkey` ON `ourservices`;

-- DropIndex
DROP INDEX `whoweare_pageId_fkey` ON `whoweare`;

-- CreateIndex
CREATE UNIQUE INDEX `groupmission_pageId_key` ON `groupmission`(`pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `homefooter_pageId_key` ON `homefooter`(`pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `mainbanner_pageId_key` ON `mainbanner`(`pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `navigationbar_pageId_key` ON `navigationbar`(`pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `ourmission_pageId_key` ON `ourmission`(`pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `ourservices_pageId_title_key` ON `ourservices`(`pageId`, `title`);

-- CreateIndex
CREATE UNIQUE INDEX `Page_title_key` ON `Page`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `whoweare_pageId_key` ON `whoweare`(`pageId`);

-- AddForeignKey
ALTER TABLE `mainbanner` ADD CONSTRAINT `mainbanner_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `whoweare` ADD CONSTRAINT `whoweare_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourservices` ADD CONSTRAINT `ourservices_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ourmission` ADD CONSTRAINT `ourmission_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `navigationbar` ADD CONSTRAINT `navigationbar_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupmission` ADD CONSTRAINT `groupmission_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homefooter` ADD CONSTRAINT `homefooter_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
