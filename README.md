<a href="https://chat.vercel.ai/">
  <img alt="Chatbot AI pronto per Next.js 14 e App Router." src="app/(chat)/opengraph-image.png">
  <h1 align="center">SDK Chat</h1>
</a>

<p align="center">
    SDK Chat è un template gratuito e open-source costruito con Next.js e l'SDK AI che ti aiuta a creare rapidamente potenti applicazioni chatbot.
</p>

<p align="center">
  <a href="https://chat-sdk.dev"><strong>Leggi la documentazione</strong></a> ·
  <a href="#features"><strong>Caratteristiche</strong></a> ·
  <a href="#model-providers"><strong>Provider Modelli</strong></a> ·
  <a href="#deploy-your-own"><strong>Distribuisci il tuo</strong></a> ·
  <a href="#running-locally"><strong>Esegui in locale</strong></a>
</p>
<br/>

## Caratteristiche

- [Next.js](https://nextjs.org) App Router
  - Routing avanzato per una navigazione fluida e prestazioni elevate
  - Componenti Server React (RSCs) e Azioni Server per rendering lato server e prestazioni migliorate
- [AI SDK](https://sdk.vercel.ai/docs)
  - API unificata per generare testo, oggetti strutturati e chiamate a strumenti con LLM
  - Hook per costruire interfacce utente dinamiche e generative
  - Supporta xAI (predefinito), OpenAI, Fireworks e altri provider di modelli
- [shadcn/ui](https://ui.shadcn.com)
  - Stile con [Tailwind CSS](https://tailwindcss.com)
  - Componenti primitivi da [Radix UI](https://radix-ui.com) per accessibilità e flessibilità
- Persistenza Dati
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) per salvare la cronologia delle chat e i dati utente
  - [Vercel Blob](https://vercel.com/storage/blob) per un efficiente storage di file
- [Auth.js](https://authjs.dev)
  - Autenticazione semplice e sicura

## Provider Modelli

Questo template include [xAI](https://x.ai) `grok-2-1212` come modello di chat predefinito. Tuttavia, con l'[AI SDK](https://sdk.vercel.ai/docs), puoi cambiare provider LLM con [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/) e molti altri con poche righe di codice.

## Distribuisci il tuo

Puoi distribuire la tua versione del chatbot AI Next.js su Vercel con un clic:

[![Distribuisci con Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot&env=AUTH_SECRET&envDescription=Genera%20un%20segreto%20casuale%20da%20usare%20per%20l'autenticazione&envLink=https%3A%2F%2Fgenerate-secret.vercel.app%2F32&project-name=my-awesome-chatbot&repository-name=my-awesome-chatbot&demo-title=AI%20Chatbot&demo-description=Un%20template%20open-source%20per%20chatbot%20AI%20costruito%20con%20Next.js%20e%20l'SDK%20AI%20di%20Vercel&demo-url=https%3A%2F%2Fchat.vercel.ai&products=%5B%7B%22type%22%3A%22integration%22%2C%22protocol%22%3A%22ai%22%2C%22productSlug%22%3A%22grok%22%2C%22integrationSlug%22%3A%22xai%22%7D%2C%7B%22type%22%3A%22integration%22%2C%22protocol%22%3A%22storage%22%2C%22productSlug%22%3A%22neon%22%2C%22integrationSlug%22%3A%22neon%22%7D%2C%7B%22type%22%3A%22blob%22%7D%5D)

## Esegui in locale

Dovrai utilizzare le variabili d'ambiente [definite in `.env.example`](.env.example) per eseguire il chatbot AI Next.js. Si consiglia di utilizzare le [Variabili d'Ambiente di Vercel](https://vercel.com/docs/projects/environment-variables) per questo, ma un file `.env` è tutto ciò che serve.

> Nota: Non dovresti commettere il tuo file `.env` o esporrai segreti che permetteranno ad altri di controllare l'accesso ai tuoi vari provider di AI e autenticazione.

1. Installa Vercel CLI: `npm i -g vercel`
2. Collega l'istanza locale con gli account Vercel e GitHub (crea la directory `.vercel`): `vercel link`
3. Scarica le tue variabili d'ambiente: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Il tuo template di app dovrebbe ora essere in esecuzione su [localhost:3000](http://localhost:3000).
