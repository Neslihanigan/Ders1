# Kampüs Etkinlikleri — Backend REST API (Sprint 9: Tam CRUD & Sorgular)

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

| Metot | Uç Nokta (Endpoint) | Amaç | Başarılı Kodu | Hata Kodu | Açıklama / Kurallar |
|---|---|---|---|---|---|
| `GET` | `/health` | Sunucu sağlık kontrolü ve öğrenci no doğrulama | `200 OK` | — | `status: "ok"`, `student: "2416501027"` |
| `GET` | `/events` | Tüm etkinlik listesini getirir (`?search=` ve `?category=` filtreleri) | `200 OK` | — | Tarihe göre sıralı; `search` başlıkta büyük/küçük harf duyarsız regex arar |
| `GET` | `/events/upcoming` | Bugünden sonraki yaklaşan etkinlikleri getirir | `200 OK` | — | `date >= bugünün başı`, `{ date: 1, time: 1 }` artan sıralı |
| `GET` | `/events/:id` | ID'si verilen etkinliğin detayını getirir | `200 OK` | `404 Not Found` | Geçersiz veya bulunamayan id için 404 döner |
| `POST` | `/events` | Yeni etkinlik ekler | `201 Created` | `400 Bad Request` | Schema doğrulaması (GG-AA-YYYY formatı, enum, minlength vb.) |
| `PATCH` | `/events/:id` | Etkinliği kısmi günceller | `200 OK` | `400`, `404` | Çalışıyor (`returnDocument: "after"`, `runValidators: true`, korunan alan kontrolü) |
| `DELETE` | `/events/:id` | Etkinliği veritabanından siler | `204 No Content` | `404 Not Found` | Çalışıyor (Yanıt gövdesi boştur) |

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
- `200 OK`: Başarılı GET ve PATCH isteği.
- `201 Created`: Kayıt başarıyla MongoDB'ye eklendi ve `_id` atandı.
- `204 No Content`: Kayıt başarıyla silindi (yanıt gövdesi yok).
- `400 Bad Request`: Schema doğrulaması (geçersiz tarih formatı, eksik alan, geçersiz enum, boş body veya `_id` korumalı alan değiştirme girişimi).
- `404 Not Found`: İstenen kayıt bulunamadı veya geçersiz `_id` formatı.
- `500 Internal Server Error`: Beklenmeyen sunucu hatası (merkezi hata middleware'i tarafından yakalanır).

---

## 🧪 Postman & Newman Testleri (Sprint 9)

Koleksiyon: `backend/requests/kampus-api.json`  
Runner Sonuçları: `backend/requests/run-results.json`

### Newman ile Testleri Çalıştırma:
```bash
# Backend sunucusu çalışırken:
newman run requests/kampus-api.json -r cli,json --reporter-json-export requests/run-results.json

# Veya hocanın canlı test adresinden doğrudan:
newman run https://webdersi.vercel.app/test.json
```

### Test Özeti:
- **Toplam İstek Sayısı:** 18
- **Toplam Doğrulama (Assertion):** 45
- **Hata (Failed):** 0 (%100 Başarı)
