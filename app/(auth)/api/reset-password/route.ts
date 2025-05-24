import { NextRequest, NextResponse } from 'next/server';
import { resetPassword } from '@/lib/db/reset-password';

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json(
      { error: 'Token o password mancanti.' },
      { status: 400 },
    );
  }
  try {
    await resetPassword(token, password);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
