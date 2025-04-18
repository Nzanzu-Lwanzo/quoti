/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "bio" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "newsletter" BOOLEAN DEFAULT true,
    "newsletterFrequence" TEXT NOT NULL DEFAULT 'ON_UPLOAD'
);
INSERT INTO "new_User" ("bio", "email", "id", "name", "newsletter", "newsletterFrequence", "password") SELECT "bio", "email", "id", "name", "newsletter", "newsletterFrequence", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
