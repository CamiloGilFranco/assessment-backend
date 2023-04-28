-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_lists" (
    "id" TEXT NOT NULL,
    "usersId" TEXT,

    CONSTRAINT "favorite_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "favorite_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_items_per_list" (
    "id" TEXT NOT NULL,
    "favorite_listsId" TEXT,
    "favorite_itemsId" TEXT,

    CONSTRAINT "favorite_items_per_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "favorite_lists" ADD CONSTRAINT "favorite_lists_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_items_per_list" ADD CONSTRAINT "favorite_items_per_list_favorite_listsId_fkey" FOREIGN KEY ("favorite_listsId") REFERENCES "favorite_lists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_items_per_list" ADD CONSTRAINT "favorite_items_per_list_favorite_itemsId_fkey" FOREIGN KEY ("favorite_itemsId") REFERENCES "favorite_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
