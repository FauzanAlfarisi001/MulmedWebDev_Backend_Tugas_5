CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"nim" varchar(20) NOT NULL,
	"umur" integer NOT NULL,
	"jurusan" varchar(100) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
