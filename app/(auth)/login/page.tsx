'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from '@/components/toast';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { login, type LoginActionState } from '../actions';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [state, setState] = useState<LoginActionState>({ status: 'idle' });

  useEffect(() => {
    if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Dati non validi. Controlla le credenziali.',
      });
    } else if (state.status === 'failed') {
      toast({
        type: 'error',
        description: "Errore durante l'accesso. Riprova.",
      });
    } else if (state.status === 'success') {
      toast({
        type: 'success',
        description: 'Accesso effettuato con successo!',
      });
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = async (formData: FormData) => {
    setEmail(formData.get('email') as string);
    const result = await login(state, formData);
    setState(result);
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Accedi</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Accedi con la tua email e password
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Accedi</SubmitButton>
          <div className="flex flex-col items-center mt-2">
            <Link
              href="/forgot-password"
              className="text-xs text-blue-600 hover:underline mb-2"
            >
              Password dimenticata?
            </Link>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Non hai un'account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Registrati
            </Link>
            {' gratuitamente.'}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
