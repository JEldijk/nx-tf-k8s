-- CreateTable
CREATE TABLE "Trail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Trail" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Session_Trail_fkey" FOREIGN KEY ("Trail") REFERENCES "Trail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SessionParticipant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idDev" INTEGER NOT NULL,
    "Session" INTEGER NOT NULL,
    CONSTRAINT "SessionParticipant_Session_fkey" FOREIGN KEY ("Session") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
