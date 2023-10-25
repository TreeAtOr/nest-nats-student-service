-- CreateTable
CREATE TABLE "Student" (
    "persanal_code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "student_code" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Grades_student_code_fkey" FOREIGN KEY ("student_code") REFERENCES "Student" ("persanal_code") ON DELETE RESTRICT ON UPDATE CASCADE
);