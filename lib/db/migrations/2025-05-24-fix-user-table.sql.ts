import { sql } from 'drizzle-orm';

export async function up(db: any) {
  // Rendi la colonna password nullable (se non lo è già)
  await db.run(sql`ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;`);
  // Rimuovi il vincolo UNIQUE da email (se esiste)
  try {
    await db.run(sql`ALTER TABLE "User" DROP CONSTRAINT "User_email_key";`);
  } catch (e) {
    // Il vincolo potrebbe non esistere, ignora l'errore
  }
}

export async function down(db: any) {
  // Ripristina il vincolo NOT NULL su password
  await db.run(sql`ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;`);
  // Ripristina il vincolo UNIQUE su email
  await db.run(sql`ALTER TABLE "User" ADD CONSTRAINT "User_email_key" UNIQUE ("email");`);
}
