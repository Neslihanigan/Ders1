# Kampüs Etkinlikleri — Backend REST API (Sprint 8: Kalıcı Veri & MongoDB)

Bu servis, Kampüs Etkinlikleri uygulamasının veritabanı destekli backend katmanıdır. **Node.js**, **Express**, **MongoDB**, **Mongoose**, **dotenv** ve **cors** kullanılarak geliştirilmiştir.

- **Geliştirici:** Neslihan İgan  
- **Öğrenci Numarası:** `2416501027`

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel geliştirme ortamında çalıştırmak için:

```bash
# 1. Backend klasörüne geçin
cd backend

# 2. Bağımlılıkları yükleyin (Mongoose dahil)
npm install

# 3. Ortam değişkenlerini ayarlayın (.env oluşturun)
cp .env.example .env
# .env dosyasındaki MONGODB_URI adresini kendi MongoDB Atlas veya yerel bağlantınızla doldurun

# 4. Veritabanını 6 örnek etkinlik ile doldurun (Seed)
npm run seed

# 5. Geliştirme sunucusunu başlatın
npm run dev

# veya üretim modunda başlatmak için:
npm start
```

Sunucu `http://localhost:3000` adresinde çalışmaya başlar.

---

## ⚙️ Ortam Değişkenleri (.env)

| Değişken | Açıklama | Örnek (.env.example) |
|---|---|---|
| `PORT` | API sunucusunun çalışacağı port | `3000` |
| `MONGODB_URI` | MongoDB veritabanı bağlantı URI'si | `mongodb://127.0.0.1:27017/kampus` |

> ⚠️ **Güvenlik Uyarısı:** Gerçek veritabanı şifresi içeren `.env` dosyası asla GitHub'a gönderilmez (`.gitignore` ile korunmaktadır).

---

## 📋 REST API Sözleşmesi

Tüm istekler `http://localhost:3000` adresine yapılır. Yanıtlar standart JSON formatındadır.

| Metot | Uç Nokta (Endpoint) | Amaç | Başarılı Kodu | Hata Kodu | Açıklama |
|---|---|---|---|---|---|
| `GET` | `/health` | Sunucu sağlık kontrolü ve öğrenci no doğrulama | `200 OK` | — | `status: "ok"`, `student: "2416501027"` |
| `GET` | `/events` | Tüm etkinlik listesini getirir (`?category=` desteklenir) | `200 OK` | — | Tarihe göre sıralı, `_id` ve timestamps içerir |
| `GET` | `/events/:id` | ID'si verilen etkinliğin detayını getirir | `200 OK` | `404 Not Found` | Geçersiz veya bulunamayan id için 404 döner |
| `POST` | `/events` | Yeni etkinlik ekler | `201 Created` | `400 Bad Request` | Schema doğrulaması (title, category, date zorunlu) |
| `PATCH` | `/events/:id` | Etkinliği günceller | `200 OK` | `400`, `404` | Sprint 9 |
| `DELETE` | `/events/:id` | Etkinliği siler | `204 No Content` | `404 Not Found` | Sprint 9 |

---

## ⚠️ Hata Yanıt Formatı

Tüm hata yanıtları standart bir yapı içinde döner:

```json
{
  "error": {
    "message": "Event not found"
  }
}
```

### Durum Kodları:
- `200 OK`: Başarılı GET isteği.
- `201 Created`: Kayıt başarıyla MongoDB'ye eklendi ve `_id` atandı.
- `400 Bad Request`: Mongoose Schema doğrulama hatası (eksik alan veya geçersiz kategori vb.).
- `404 Not Found`: İstenen kayıt bulunamadı veya geçersiz `_id` formatı.
- `500 Internal Server Error`: Beklenmeyen sunucu hatası (merkezi hata middleware'i tarafından yakalanır).

---

## 🧪 Postman İstek Koleksiyonu

Test istekleri `backend/requests/kampus-api.json` dosyasına Postman Collection (v2.1) formatında kaydedilmiştir:

1. `GET /health` $\rightarrow$ `200 OK`
2. `GET /events` $\rightarrow$ `200 OK` (6 seed etkinliği)
3. `GET /events/:id` $\rightarrow$ `200 OK` (Geçerli MongoDB `_id` ile)
4. `GET /events/yok` $\rightarrow$ `404 Not Found` (`error.message`)
5. `POST /events` (Tam gövde) $\rightarrow$ `201 Created` (Yeni `_id` ve timestamps ile)
6. `POST /events` (Eksik gövde) $\rightarrow$ `400 Bad Request` (Schema validation hatası)
