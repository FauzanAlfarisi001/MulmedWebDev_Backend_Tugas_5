const { pgTable, serial, varchar, integer } = require("drizzle-orm/pg-core");

const anggota = pgTable("anggota", {
    id: serial("id").primaryKey(),
    nama: varchar("nama", { length: 100 }).notNull(),
    nim: varchar("nim", { length: 20 }).notNull(),
    umur: integer("umur").notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    jurusan: varchar("jurusan", { length: 100 }).notNull()
});

module.exports = { anggota };