import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  description: text("description"),
  icon: text("icon"),
  priceFrom: integer("price_from"),
});
