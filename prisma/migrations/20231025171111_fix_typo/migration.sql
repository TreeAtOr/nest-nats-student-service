/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `persanal_code` on the `Student` table. All the data in the column will be lost.
  - Added the required column `personal_code` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "student_code" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Grade_student_code_fkey" FOREIGN KEY ("student_code") REFERENCES "Student" ("personal_code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Grade" ("date", "grade", "id", "student_code", "subject") SELECT "date", "grade", "id", "student_code", "subject" FROM "Grade";
DROP TABLE "Grade";
ALTER TABLE "new_Grade" RENAME TO "Grade";
CREATE TABLE "new_Student" (
    "personal_code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL
);
INSERT INTO "new_Student" ("first_name", "last_name") SELECT "first_name", "last_name" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
