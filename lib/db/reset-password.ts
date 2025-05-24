import { getUser } from '@/lib/db/queries';
import { user } from '@/lib/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { generateHashedPassword } from './utils';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function resetPassword(token: string, newPassword: string) {
  // Find user by resetToken and check expiry
  const users = await db.select().from(user).where(eq(user.resetToken, token));
  if (!users.length) throw new Error('Token non valido');
  const u = users[0];
  if (!u.resetTokenExpires || new Date(u.resetTokenExpires) < new Date()) {
    throw new Error('Token scaduto');
  }
  // Update password and clear token
  await db
    .update(user)
    .set({
      password: generateHashedPassword(newPassword),
      resetToken: null,
      resetTokenExpires: null,
    })
    .where(eq(user.id, u.id));
  return true;
}
