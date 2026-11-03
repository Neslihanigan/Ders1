import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <>
      <h2 className="sayfa-basligi">Giriş Yap</h2>
      {sent && (
        <p className="mesaj mesaj-basari">Gerçek giriş Sprint 10'da</p>
      )}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && (
            <span className="hata-metni">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="btn">
          Giriş yap
        </button>
      </form>

      <div style={{ marginTop: "1.2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </div>
    </>
  );
}

export default LoginPage;

