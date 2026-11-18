# 🎓 Kampüs Etkinlikleri Yönetim Sistemi

> **Sprint 8 — Kalıcı Veri: MongoDB ve Mongoose**  
> **Geliştirici:** Neslihan İgan  
> **Öğrenci No:** 2416501027  

---

## 🔗 Proje Bağlantıları

| Platform / Servis | Bağlantı |
|---|---|
| 🌐 **Frontend Canlı Yayın (Vercel)** | [https://neslihanigan-frontend.vercel.app/](https://neslihanigan-frontend.vercel.app/) |
| 📦 **GitHub Deposu** | [https://github.com/Neslihanigan/Ders1](https://github.com/Neslihanigan/Ders1) |
| 🔌 **Backend REST API (MongoDB Destekli)** | `http://localhost:3000` |

---

## 🏗️ Proje Mimarisi

1. **`frontend/`**: React 19, TypeScript, Vite ve React Router v7 ile geliştirilmiş kullanıcı ve yönetim arayüzü (`http://localhost:5173`).
2. **`backend/`**: Node.js, Express, MongoDB (Atlas) ve Mongoose ile geliştirilmiş kalıcı REST API servisi (`http://localhost:3000`).

---

## 🚀 Kurulum ve Çalıştırma

### 1. Backend Servisini Başlatma (MongoDB Kalıcı Veri)
```bash
cd backend
npm install
cp .env.example .env
# .env dosyasında MONGODB_URI tanımlayın

# Veritabanını 6 örnek kayıt ile doldurun
npm run seed

# Geliştirme sunucusunu başlatın
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

## 📋 Backend REST API Sözleşmesi (Sprint 8)

| Metot | Uç Nokta | Açıklama | Başarılı Kodu | Hata Kodu |
|---|---|---|---|---|
| `GET` | `/health` | Sunucu sağlık kontrolü ve öğrenci no doğrulama | `200 OK` | — |
| `GET` | `/events` | Tüm etkinlik listesi (MongoDB `_id` ve timestamps ile) | `200 OK` | — |
| `GET` | `/events/:id` | `_id` ile tekil etkinlik detayı | `200 OK` | `404 Not Found` |
| `POST` | `/events` | Yeni etkinlik ekler (Schema doğrulaması) | `201 Created` | `400 Bad Request` |

> Tüm API test istekleri `backend/requests/kampus-api.json` içerisine Postman Collection (v2.1) olarak eklenmiştir.

---

## 📁 Genel Dosya Yapısı

```text
.
├── backend/
│   ├── requests/
│   │   └── kampus-api.json      # Postman collection (v2.1)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js      # Mongoose bağlantı modülü
│   │   ├── controllers/
│   │   │   └── event-controller.js # Mongoose find, findById, create
│   │   ├── data/
│   │   │   └── seed-events.js   # 6 adet başlangıç etkinliği
│   │   ├── models/
│   │   │   └── event-model.js   # Mongoose Event şeması ve modeli
│   │   ├── routes/
│   │   │   └── event-routes.js
│   │   ├── app.js               # Express, CORS, 404 ve merkezi hata middleware
│   │   ├── seed.js              # deleteMany + insertMany seed scripti
│   │   └── server.js            # Port dinleyici ve veritabanı başlatıcı
│   ├── .env.example             # Yer tutucu örnek ortam değişkenleri
│   ├── .gitignore               # .env ve node_modules koruması
│   ├── package.json             # express, mongoose, dotenv, cors
│   └── README.md
├── frontend/                    # React + Vite arayüzü
├── README.md
└── vercel.json
```
