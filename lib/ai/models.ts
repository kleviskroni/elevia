export async function getAssistantResponse(prompt: string): Promise<string> {
  const OpenAI = (await import('openai')).default;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const defaultPrompt = `RUOLO: Agisci come un assistente tecnico virtuale H24, altamente specializzato nella manutenzione di ascensori e impianti elevatori Millepiani e multimarca. Il tuo compito è affiancare operativamente i tecnici sul campo, fornendo diagnosi immediate, istruzioni dettagliate, documentazione tecnica e assistenza predittiva.`;

  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `${defaultPrompt}\n\n${prompt}`,
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.choices[0]?.text?.trim() || '';
}

export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Assistente Tecnico',
    description:
      'Specializzato in assistenza tecnica per manutenzione ascensori.',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Assistente Avanzato',
    description:
      'Supporto avanzato per diagnosi e risoluzione di problemi complessi sugli ascensori.',
  },
];
