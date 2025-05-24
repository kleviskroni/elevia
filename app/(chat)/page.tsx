'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null; // or a loading spinner
  }

  if (!session || session.user?.type === 'guest') {
    router.push('/login');
    return null;
  }

  const id = generateUUID();

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={DEFAULT_CHAT_MODEL}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
