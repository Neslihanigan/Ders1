# Kampüs Etkinlikleri — Backend REST API (Sprint 7)

Bu servis, Kampüs Etkinlikleri uygulamasının backend katmanıdır. **Node.js**, **Express**, **dotenv** ve **cors** kullanılarak geliştirilmiş bir REST API sunucusudur.

- **Geliştirici:** Neslihan İgan  
- **Öğrenci Numarası:** `2416501027`

---

## 🚀 Kurulum ve Çalıştırma

Geliştirme ortamında çalıştırmak için aşağıdaki adımları takip edin:

```bash
# 1. Backend klasörüne geçin
cd backend

# 2. Gerekli bağımlılıkları yükleyin
npm install

# 3. Ortam değişkenlerini hazırlayın (.env oluşturun)
cp .env.example .env

# 4. Geliştirme modunda başlatın (node --watch ile otomatik yeniden başlatma)
npm run dev

# veya normal başlatmak için:
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde dinlemeye başlar.

---

## ⚙️ Ortam Değişkenleri (.env)

Projede ayarlar koda sabit yazılmayıp `.env` dosyası üzerinden okunur:

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| `PORT` | API sunucusunun çalışacağı port numarası | `3000` |

> **Önemli Not:** `.env` dosyası hassas veriler içerebileceğinden `.gitignore` ile korunur ve GitHub'a yüklenmez. Örnek yapılandırma için `.env.example` dosyası kullanılabilir.

---

## 📋 REST API Sözleşmesi

Tüm istekler `http://localhost:3000` temel adresine yapılır. Yanıtlar her zaman JSON formatındadır.

| Metot | Uç Nokta (Endpoint) | Amaç | Başarılı Durum Kodu | Hata Durum Kodu | Durum |
|---|---|---|---|---|---|
| `GET` | `/health` | Sunucu sağlık kontrolü ve öğrenci no doğrulama | `200 OK` | — | Bu sprint |
| `GET` | `/events` | Tüm etkinlik listesini getirir (`?category=` ile filtreleme desteklenir) | `200 OK` | — | Bu sprint |
| `GET` | `/events/:id` | ID'si verilen etkinliğin detayını getirir | `200 OK` | `404 Not Found` | Bu sprint |
| `POST` | `/events` | Yeni etkinlik ekler (`title`, `category`, `date` zorunludur) | `201 Created` | `400 Bad Request` | Bu sprint |
| `PATCH` | `/events/:id` | Mevcut etkinliği günceller | `200 OK` | `400`, `404` | Sprint 9 |
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

### Durum Kodları (Status Codes):
- `200 OK`: İstek başarılı bir şekilde tamamlandı.
- `201 Created`: Yeni kayıt başarıyla oluşturuldu.
- `204 No Content`: İşlem başarılı, dönecek içerik yok (Silme işlemlerinde).
- `400 Bad Request`: Eksik veya geçersiz gövde (body) verisi (örn: `title`, `category` veya `date` eksik).
- `404 Not Found`: İstenen kaynak veya rota bulunamadı.

---

## 🧪 Postman İstek Koleksiyonu

Tüm uç noktalar test edilmiş ve `backend/requests/kampus-api.json` dosyası içerisine Postman Collection (v2.1) formatında kaydedilmiştir:

1. `GET /health` $\rightarrow$ `200 OK` (`status`, `time`, `student: "2416501027"`)
2. `GET /events` $\rightarrow$ `200 OK` (6 adet başlangıç etkinliği)
3. `GET /events/event-2` $\rightarrow$ `200 OK` (Seçili etkinlik detayı)
4. `GET /events/yok` $\rightarrow$ `404 Not Found` (`error.message`)
5. `POST /events` (Tam gövde) $\rightarrow$ `201 Created` (Oluşturulan yeni etkinlik nesnesi)
6. `POST /events` (Eksik gövde) $\rightarrow$ `400 Bad Request` (`title, category and date are required`)
