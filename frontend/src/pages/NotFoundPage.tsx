import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="hata-kutusu-sayfa">
      <h2 className="sayfa-basligi">Sayfa bulunamadı</h2>
      <p style={{ margin: "1rem 0" }}>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link to="/" className="btn">
        Ana sayfaya dön
      </Link>
    </div>
  );
}

export default NotFoundPage;

