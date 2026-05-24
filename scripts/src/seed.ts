/**
 * Seed sample products and services only into EMPTY tables.
 * Safe to run on a production DB — does nothing if data exists.
 */
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is required");

const sql = postgres(DATABASE_URL);

async function seedProductsIfEmpty() {
  const [{ count }] = await sql`SELECT count(*)::int FROM products`;
  if (count > 0) {
    console.log("Products table already has data — skipping seed.");
    return;
  }
  await sql`
    INSERT INTO products (name, name_ar, description, price, category, in_stock) VALUES
    ('Argan Oil Hair Serum', 'سيروم الشعر بزيت الأرجان', 'Nourishes and strengthens hair', 450, 'Hair Care', true),
    ('Lash Growth Serum', 'سيروم نمو الرموش', 'Promotes lash growth', 350, 'Lash', true),
    ('Keratin Treatment', 'علاج الكيراتين', 'Smooths and strengthens hair', 650, 'Hair Care', true)
  `;
  console.log("✅ Seeded products");
}

await seedProductsIfEmpty();
await sql.end();
