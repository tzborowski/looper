import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const waitlist = sqliteTable("waitlist", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  city: text("city").notNull(),
  district: text("district"),
  role: text("role").notNull(),
  problem: text("problem"),
  referrals: integer("referrals").notNull().default(0),
  ambassador: integer("ambassador", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
