-- Drop reset token storage. Password reset now depends on a verified OTP row.
ALTER TABLE `passwordresetotp` DROP COLUMN `resetTokenHash`;
