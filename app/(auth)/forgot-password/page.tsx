'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSent(false);
    setLoading(true);
    if (!email || !email.includes('@')) {
      setError('Inserisci una email valida.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Errore invio email.');
      setSent(true);
    } catch {
      setError('Errore invio email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-dvh w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-8 items-center p-8 bg-white dark:bg-zinc-900 shadow-lg">
        <h3 className="text-xl font-semibold dark:text-zinc-50">
          Password dimenticata?
        </h3>
        {sent ? (
          <p className="text-green-600 text-center">
            Se l&apos;email esiste, riceverai un link per reimpostare la
            password.
          </p>
        ) : (
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@email.com"
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Invio...' : 'Invia link di reset'}
            </Button>
          </form>
        )}
        <Link href="/login" className="text-blue-600 hover:underline">
          Torna al login
        </Link>
      </div>
    </div>
  );
}
