-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "newsletter" BOOLEAN DEFAULT true,
    "newsletterFrequence" TEXT NOT NULL DEFAULT 'ON_UPLOAD'
);
INSERT INTO "new_User" ("bio", "email", "id", "name", "password") SELECT "bio", "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
