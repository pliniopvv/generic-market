export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error">404</h1>
        <p className="text-xl mt-4 text-base-content">
          Oops! Página não encontrada.
        </p>
        <p className="mt-2 text-base-content">
          Parece que você se perdeu no caminho.
        </p>
        <a href="/" className="btn btn-primary mt-6">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}
