'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { register, type RegisterActionState } from '../actions';
import { toast } from '@/components/toast';
import { useSession } from 'next-auth/react';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [state, setState] = useState<RegisterActionState>({ status: 'idle' });

  useEffect(() => {
    if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Dati non validi. Controlla i dettagli forniti.',
      });
    } else if (state.status === 'failed') {
      toast({
        type: 'error',
        description: 'Errore durante la registrazione. Riprova.',
      });
    } else if (state.status === 'success') {
      toast({
        type: 'success',
        description: 'Registrazione completata con successo!',
      });
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = async (formData: FormData) => {
    setEmail(formData.get('email') as string);
    const result = await register(state, formData);
    setState(result);
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">
            Registrati
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Crea un account con la tua email e password
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Registrati</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {'Hai già un account? '}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Accedi
            </Link>
            {' ora.'}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
