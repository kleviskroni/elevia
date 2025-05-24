import { NextRequest, NextResponse } from 'next/server';
import { getUser, saveResetToken } from '@/lib/db/queries';
import { randomBytes } from 'crypto';
import { sendPasswordResetEmail } from '../../../../lib/utils/sendPasswordResetEmail';

const RESET_TOKEN_EXPIRY_MINUTES = 30;

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email non valida.' }, { status: 400 });
  }
  const users = await getUser(email);
  if (!users.length) {
    // Always return success to avoid user enumeration
    return NextResponse.json({ success: true });
  }
  const user = users[0];
  // Generate a secure token
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);
  await saveResetToken(user.id, token, expires); // You must implement this in your DB
  await sendPasswordResetEmail(email, token); // You must implement this in your utils
  return NextResponse.json({ success: true });
}
