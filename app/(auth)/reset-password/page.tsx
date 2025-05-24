'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password || password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri.');
      return;
    }
    if (password !== confirm) {
      setError('Le password non coincidono.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) throw new Error('Token non valido o scaduto.');
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Errore.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex h-dvh w-screen items-center justify-center bg-background">
        <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-8 items-center p-8 bg-white dark:bg-zinc-900 shadow-lg">
          <h3 className="text-xl font-semibold dark:text-zinc-50">
            Reset password
          </h3>
          <p className="text-red-500">Token mancante.</p>
          <Link href="/login" className="text-blue-600 hover:underline">
            Torna al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-8 items-center p-8 bg-white dark:bg-zinc-900 shadow-lg">
        <h3 className="text-xl font-semibold dark:text-zinc-50">
          Reset password
        </h3>
        {success ? (
          <>
            <p className="text-green-600 text-center">
              Password aggiornata con successo!
            </p>
            <Link href="/login" className="text-blue-600 hover:underline">
              Accedi
            </Link>
          </>
        ) : (
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <Label htmlFor="password">Nuova password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nuova password"
            />
            <Label htmlFor="confirm">Conferma password</Label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Conferma password"
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Aggiornamento...' : 'Aggiorna password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
