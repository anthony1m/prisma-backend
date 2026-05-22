-- AlterTable
ALTER TABLE `passwordresetotp` ADD COLUMN `resetTokenHash` VARCHAR(191) NULL,
    ADD COLUMN `verifiedAt` DATETIME(3) NULL;
