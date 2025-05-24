export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Pagina non trovata</h1>
      <p className="text-lg mb-8">
        La pagina che stai cercando non esiste o è stata rimossa.
      </p>
      <a href="/" className="text-blue-600 underline">
        Torna alla home
      </a>
    </div>
  );
}
