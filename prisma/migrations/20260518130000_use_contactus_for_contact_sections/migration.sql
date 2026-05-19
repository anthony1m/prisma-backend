-- DropForeignKey
ALTER TABLE `contactus` DROP FOREIGN KEY `contactus_pageId_fkey`;

-- DropIndex
DROP INDEX `contactus_pageId_key` ON `contactus`;

-- Copy existing contactsection rows into contactus before dropping the old table.
INSERT INTO `contactus` (`title`, `description`, `imageURL`, `pageId`)
SELECT `cs`.`title`, `cs`.`description`, `cs`.`imageURL`, `cs`.`pageId`
FROM `contactsection` AS `cs`
WHERE NOT EXISTS (
  SELECT 1
  FROM `contactus` AS `cu`
  WHERE `cu`.`pageId` = `cs`.`pageId`
    AND `cu`.`title` = `cs`.`title`
);

-- CreateIndex
CREATE UNIQUE INDEX `contactus_pageId_title_key` ON `contactus`(`pageId`, `title`);

-- AddForeignKey
ALTER TABLE `contactus` ADD CONSTRAINT `contactus_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `contactsection` DROP FOREIGN KEY `contactsection_pageId_fkey`;

-- DropTable
DROP TABLE `contactsection`;
