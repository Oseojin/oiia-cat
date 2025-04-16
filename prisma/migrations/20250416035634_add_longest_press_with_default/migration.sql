/*
  Warnings:

  - You are about to drop the column `total` on the `PressRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PressRecord` DROP COLUMN `total`,
    ADD COLUMN `longestPress` INTEGER NOT NULL DEFAULT 0;
