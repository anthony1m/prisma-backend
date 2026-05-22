-- Existing users predate email verification, so keep them able to log in.
-- New signups are still created with emailVerified = false by the application.
UPDATE `User` SET `emailVerified` = true;
