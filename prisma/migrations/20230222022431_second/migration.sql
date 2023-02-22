/*
  Warnings:

  - Added the required column `readTimes` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `readTimes` INTEGER NOT NULL;
