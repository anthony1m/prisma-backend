-- Allow one strategic objectives section title to be shared by many image/description items.
SET @index_exists := (
  SELECT COUNT(1)
  FROM INFORMATION_SCHEMA.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'strategicobjectives'
    AND INDEX_NAME = 'strategicobjectives_pageId_title_key'
);

SET @drop_index_sql := IF(
  @index_exists > 0,
  'DROP INDEX `strategicobjectives_pageId_title_key` ON `strategicobjectives`',
  'SELECT 1'
);

PREPARE drop_index_statement FROM @drop_index_sql;
EXECUTE drop_index_statement;
DEALLOCATE PREPARE drop_index_statement;
