import { sql } from 'drizzle-orm';

export async function up(db: any) {
  await db.run(sql`ALTER TABLE "User" ALTER COLUMN "password" TYPE varchar(128);`);
}

export async function down(db: any) {
  await db.run(sql`ALTER TABLE "User" ALTER COLUMN "password" TYPE varchar(64);`);
}
