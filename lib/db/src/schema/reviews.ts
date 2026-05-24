import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  service: text("service"),
  createdAt: timestamp("created_at").defaultNow(),
});
