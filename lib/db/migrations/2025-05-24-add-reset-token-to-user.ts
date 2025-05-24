import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { user } from '../schema';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function up() {
  await db.execute(`ALTER TABLE "User" ADD COLUMN "resetToken" varchar(128);`);
  await db.execute(`ALTER TABLE "User" ADD COLUMN "resetTokenExpires" timestamp;`);
}

export async function down() {
  await db.execute(`ALTER TABLE "User" DROP COLUMN "resetToken";`);
  await db.execute(`ALTER TABLE "User" DROP COLUMN "resetTokenExpires";`);
}
