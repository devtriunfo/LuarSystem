import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Erro de Autenticação</h1>
        <p className="auth-subtitle">
          Ocorreu um erro durante a autenticação. Por favor, tente novamente.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "30px" }}>
          <Link href="/auth/login" className="btn">
            <span>Tentar novamente</span>
          </Link>
        </div>
        <p className="auth-link" style={{ marginTop: "20px" }}>
          <Link href="/">Voltar ao site</Link>
        </p>
      </div>
    </div>
  );
}
