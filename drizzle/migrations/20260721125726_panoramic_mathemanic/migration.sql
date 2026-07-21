CREATE TABLE "anggota" (
	"id" serial PRIMARY KEY,
	"nama" varchar(100) NOT NULL,
	"nim" varchar(20) NOT NULL,
	"umur" integer NOT NULL,
	"email" varchar(100) NOT NULL,
	"jurusan" varchar(100) NOT NULL
);
