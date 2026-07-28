const { pgTable, serial, varchar, integer } = require("drizzle-orm/pg-core");

const users = pgTable("users", {
    id: serial("id").primaryKey(),
    nama: varchar("nama", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    nim: varchar("nim", { length: 20 }).notNull(),
    umur: integer("umur").notNull(),
    jurusan: varchar("jurusan", { length: 100 }).notNull()
});

module.exports = {
    users
};