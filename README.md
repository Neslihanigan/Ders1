# 🎓 Kampüs Etkinlikleri Yönetim Sistemi

> **Sprint 7 — Backend Başlangıç: Express ile REST API**  
> **Geliştirici:** Neslihan İgan  
> **Öğrenci No:** 2416501027  

---

## 🔗 Proje Bağlantıları

| Platform / Servis | Bağlantı |
|---|---|
| 🌐 **Frontend Canlı Yayın (Vercel)** | [https://neslihanigan-frontend.vercel.app/](https://neslihanigan-frontend.vercel.app/) |
| 📦 **GitHub Deposu** | [https://github.com/Neslihanigan/Ders1](https://github.com/Neslihanigan/Ders1) |
| 🔌 **Backend REST API (Yerel)** | `http://localhost:3000` |

---

## 🏗️ Proje Mimarisi

Bu depoda aynı sistem için iki bağımsız uygulama yer almaktadır:

1. **`frontend/`**: React 19, TypeScript, Vite ve React Router v7 ile geliştirilmiş kullanıcı ve yönetim arayüzü (`http://localhost:5173`).
2. **`backend/`**: Node.js, Express, dotenv ve cors ile geliştirilmiş REST API servisi (`http://localhost:3000`).

---

## 🚀 Kurulum ve Çalıştırma

### 1. Backend Servisini Başlatma
```bash
cd backend
npm install
npm run dev
# Sunucu http://localhost:3000 adresinde dinlemeye başlar
```

### 2. Frontend Uygulamasını Başlatma
```bash
cd frontend
npm install
npm run dev
# Uygulama http://localhost:5173 adresinde açılır
```

---

## 📋 Backend REST API Sözleşmesi (Sprint 7)

| Metot | Uç Nokta | Açıklama | Durum Kodu |
|---|---|---|---|
| `GET` | `/health` | Sunucu sağlık kontrolü ve öğrenci no doğrulama | `200 OK` |
| `GET` | `/events` | Tüm etkinlik listesini getirir (`?category=` desteklenir) | `200 OK` |
| `GET` | `/events/:id` | Seçili etkinliğin detayını getirir | `200 OK` / `404 Not Found` |
| `POST` | `/events` | Yeni etkinlik oluşturur (`title`, `category`, `date` zorunlu) | `201 Created` / `400 Bad Request` |

> Tüm API test istekleri `backend/requests/kampus-api.json` içerisine Postman Collection (v2.1) olarak eklenmiştir.

---

## 🗺️ Frontend Rota Listesi (10 Sayfa)

| # | Rota (Path) | Sayfa Bileşeni | Açıklama |
|---|---|---|---|
| 1 | `/` | `HomePage` | Yaklaşan en yakın 2 etkinlik ve hızlı istatistikler |
| 2 | `/events` | `EventsPage` | Arama ve filtreli etkinlik listesi |
| 3 | `/events/:id` | `EventDetailPage` | Etkinlik künyesi, afiş ve detayları (`useParams`) |
| 4 | `/login` | `LoginPage` | E-posta ve şifreli giriş sayfası |
| 5 | `/register` | `RegisterPage` | Yeni kullanıcı kayıt sayfası |
| 6 | `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama bağlantısı talep sayfası |
| 7 | `/admin` | `AdminPage` | Etkinlik yönetim tablosu, onaylı silme ve güncelleme |
| 8 | `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu (`addEvent`) |
| 9 | `/admin/:id/edit` | `EditEventPage` | Etkinlik düzenleme formu (`updateEvent`) |
| 10 | `*` | `NotFoundPage` | 404 Hata sayfası |

---

## 📁 Genel Dosya Yapısı

```text
.
├── backend/
│   ├── requests/
│   │   └── kampus-api.json      # Postman collection (v2.1)
│   ├── src/
│   │   ├── controllers/
│   │   │   └── event-controller.js
│   │   ├── data/
│   │   │   └── events.js         # Bellek içi 6 özgün etkinlik verisi
│   │   ├── routes/
│   │   │   └── event-routes.js
│   │   ├── app.js               # Express middleware & route bağlama
│   │   └── server.js            # Port dinleyici ve dotenv
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
├── frontend/                    # React + Vite arayüzü
├── README.md
└── vercel.json
```
