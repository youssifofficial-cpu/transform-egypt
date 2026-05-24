import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  branch: text("branch").notNull(),
  service: text("service"),
  preferredDate: text("preferred_date"),
  createdAt: timestamp("created_at").defaultNow(),
});
