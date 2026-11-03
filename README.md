# 🎓 Kampüs Etkinlikleri Yönetim Sistemi

> **Sprint 6 + Vize Teslimi — Router, Context API, Controlled Forms ve Yönetim**  
> **Geliştirici:** Neslihan İgan  
> **Öğrenci No:** 2416501027  

---

## 🔗 Proje Bağlantıları

| Platform | Bağlantı |
|---|---|
| 🌐 **Vercel Canlı Yayın (Deploy)** | [https://ders1-bnqv.vercel.app/](https://ders1-bnqv.vercel.app/) |
| 📦 **GitHub Deposu** | [https://github.com/Neslihanigan/Ders1](https://github.com/Neslihanigan/Ders1) |

---

## 📖 Proje Hakkında

Bu proje, üniversite kampüsündeki etkinliklerin listelenmesi, filtrelenmesi, detaylarının incelenmesi ve bir yönetim paneli üzerinden tam kontrolle (ekleme, güncelleme, silme) yönetilmesini sağlayan modern bir **React 19 + TypeScript + Vite** web uygulamasıdır.

Uygulama, **React Router v7** ile istemci taraflı çok sayfalı yönlendirmeye, **React Context API** ile tek kaynaklı merkezi durum yönetimine ve **Controlled Form** mimarisine sahiptir.

---

## 🗺️ Rota Listesi (10 Adres, 10 Sayfa)

Uygulamada tanımlı olan tüm rotalar ve üstlendikleri görevler:

| # | Rota (Path) | Sayfa Bileşeni | Açıklama |
|---|---|---|---|
| 1 | `/` | `HomePage` | Yaklaşan en yakın 2 etkinliği, istatistikleri ve genel tanıtımı sunan ana sayfa. |
| 2 | `/events` | `EventsPage` | Arama ve kategori filtreli tüm etkinliklerin kartlar halinde listelendiği sayfa. |
| 3 | `/events/:id` | `EventDetailPage` | `useParams` ile seçilen etkinliğin künyesini, afişini ve detaylı açıklamasını gösteren sayfa. |
| 4 | `/login` | `LoginPage` | E-posta ve şifre kontrollü kullanıcı giriş sayfası (kayıt ve şifremi unuttum bağlantılı). |
| 5 | `/register` | `RegisterPage` | Ad soyad, e-posta ve şifre alanlarıyla yeni hesap oluşturma sayfası. |
| 6 | `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama bağlantısı talep etme sayfası. |
| 7 | `/admin` | `AdminPage` | Tüm etkinliklerin listelendiği, onaylı silme ve güncelleme bağlantılarını barındıran yönetim tablosu. |
| 8 | `/admin/new` | `AddEventPage` | Doğrulamalı form ile yeni etkinlik ekleme sayfası (`addEvent`). |
| 9 | `/admin/:id/edit` | `EditEventPage` | Seçili etkinliğin verilerini formda düzenleme ve kaydetme sayfası (`updateEvent`). |
| 10 | `*` | `NotFoundPage` | Tanımsız URL'ler veya bulunamayan etkinlik ID'leri için 404 hata sayfası. |

---

## ✨ Vize ve Sprint 6 Kapsamında Yapılan Geliştirmeler

- 🔀 **React Router Geçişi:** Sekme/state bazlı navigasyon yerine gerçek URL rotaları (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useNavigate`, `useParams`) entegre edildi. Aktif sayfa takibi `aria-current="page"` ve `.active` sınıfı ile sağlanır.
- 🌐 **Merkezi Durum Yönetimi (EventsContext):** Etkinlik verileri, ekleme (`addEvent`), güncelleme (`updateEvent`) ve silme (`deleteEvent`) işlemleri React Context API üzerinden yönetilmektedir. Bir sayfada yapılan değişiklik tüm uygulamaya anında yansır.
- 🛡️ **Silme Onayı (Delete Confirmation):** Yönetim tablosundan etkinlik silinirken `window.confirm` ile kullanıcıdan onay istenir; kazara silinmeler engellenir.
- 📋 **Form Doğrulama (Controlled Forms & Validation):** `validateEvent` yardımcı fonksiyonu ile form gönderilmeden önce kurallar denetlenir (başlık $\ge 3$ kr, kategori zorunlu, tarih/saat/konum zorunlu, kapasite 1-1000 arası tam sayı, açıklama $\ge 10$ kr). Hatalı alanlara `aria-invalid="true"` ve `.hata-metni` eklenir.
- 📱 **Duyarlı (Responsive) Tasarım:** Yönetim tablosu masaüstünde standart tablo görünümünde (`table`), 699px ve altındaki mobil cihazlarda ise her satır bağımsız bir bilgi kartına (`card layout`) dönüşür.
- 🎨 **Öğrenci Numarasına Özel Renk Teması:** CSS değişkenleri (`--renk-tema`) öğrenci numarası (2416501027) baz alınarak yapılandırılmış, Vite yapılandırmasında yuvarlama önleyici ayarlar korunmuştur.
- 🚀 **Vercel SPA Desteği:** `vercel.json` rewrite kuralı (`/(.*) -> /index.html`) sayesinde doğrudan URL girişlerinde (ör. `/events`, `/admin`) 404 hatası alınmaz.

---

## 💻 Kurulum ve Çalıştırma Talimatları

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

```bash
# 1. Proje dizinine gidin
cd frontend

# 2. Gerekli bağımlılıkları yükleyin
npm install

# 3. Geliştirme (development) sunucusunu başlatın
npm run dev

# 4. Kod denetimi (linter) çalıştırmak için
npm run lint

# 5. Üretim (production build) derlemesi almak için
npm run build
```

---

## 📁 Proje Dosya Yapısı

```text
frontend/
├── src/
│   ├── components/
│   │   ├── events/       # EventCard, EventList, EventDetail, EventFilter
│   │   ├── forms/        # EventForm (Doğrulamalı controlled form)
│   │   └── layout/       # Header, Navigation, Footer
│   ├── context/
│   │   └── EventsContext.tsx # EventsProvider ve useEvents hook'u
│   ├── pages/            # 10 adet sayfa bileşeni (HomePage, AdminPage, ...)
│   ├── types/            # TypeScript arayüz ve tipleri (CampusEvent, Form types)
│   ├── utils/            # validateEvent, formatDate, filterEvents
│   ├── App.tsx           # Rota tanımları (<Routes>)
│   ├── App.css           # Tasarım, tema değişkenleri, responsive kurallar
│   └── main.tsx          # Router ve Provider sarmalayıcısı
├── public/               # afis.svg, favicon.svg
├── vercel.json           # Vercel SPA rewrite yapılandırması
└── package.json          # Proje bağımlılıkları ve betikleri
```
