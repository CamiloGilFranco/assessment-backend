/*
  Warnings:

  - Added the required column `list_name` to the `favorite_lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favorite_lists" ADD COLUMN     "list_name" TEXT NOT NULL;
