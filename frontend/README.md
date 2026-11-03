# 🎓 Kampüs Etkinlikleri Yönetim Sistemi (Frontend)

> **Sprint 6 + Vize Teslimi — Router, Context API, Controlled Forms ve Yönetim**  
> **Geliştirici:** Neslihan İgan  
> **Öğrenci No:** 2416501027  

---

## 🔗 Proje Bağlantıları

- 🌐 **Vercel Canlı Yayın:** [https://ders1-bnqv.vercel.app/](https://ders1-bnqv.vercel.app/)
- 📦 **GitHub Deposu:** [https://github.com/Neslihanigan/Ders1](https://github.com/Neslihanigan/Ders1)

---

## 💻 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu çalıştırın
npm run dev

# Kod denetimi yapın
npm run lint

# Üretim derlemesi oluşturun
npm run build
```

---

## 🗺️ Rota Listesi (10 Adres, 10 Sayfa)

| # | Rota | Sayfa Bileşeni | Açıklama |
|---|---|---|---|
| 1 | `/` | `HomePage` | En yakın 2 etkinlik ve hızlı istatistikler |
| 2 | `/events` | `EventsPage` | Arama ve filtreli etkinlik listesi |
| 3 | `/events/:id` | `EventDetailPage` | Etkinlik künyesi, afiş ve detayları (`useParams`) |
| 4 | `/login` | `LoginPage` | E-posta ve şifreli giriş sayfası |
| 5 | `/register` | `RegisterPage` | Yeni kullanıcı kayıt sayfası |
| 6 | `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama bağlantısı talep sayfası |
| 7 | `/admin` | `AdminPage` | Etkinlik yönetim tablosu, onaylı silme ve güncelleme |
| 8 | `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu (`addEvent`) |
| 9 | `/admin/:id/edit` | `EditEventPage` | Etkinlik düzenleme formu (`updateEvent`) |
| 10 | `*` | `NotFoundPage` | 404 Hata sayfası |
