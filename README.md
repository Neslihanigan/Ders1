https://ders1-bnqv.vercel.app/

# Sprint 4 — Kampüs Etkinlikleri (Vite + React + TypeScript)

Bu sprintte Kampüs Etkinlikleri uygulaması React ve TypeScript teknolojileriyle yeniden geliştirilmiştir.

## Proje Dosya Yapısı ve Görevleri

- **package.json**: Proje adı, komutlar (dev, build) ve kullanılan paketlerin listesini tanımlar.
- **package-lock.json**: Projeye yüklenen npm paketlerinin kilitli tam sürümlerini belirtir.
- **node_modules/**: Projenin çalışması için indirilen npm paketlerini barındırır; Git'e dahil edilmez.
- **tsconfig*.json**: TypeScript derleme kurallarını ve tip denetim ayarlarını içerir.
- **vite.config.ts**: Vite yapılandırma ayarlarını ve React eklentisini barındırır.
- **index.html**: React uygulamasının render edildiği tek HTML dosyasıdır; içinde `#root` elemanı bulunur.
- **src/main.tsx**: React uygulamasını başlatan ve `App` bileşenini DOM'daki `#root` elemanına bağlayan giriş noktasıdır.
- **src/App.tsx**: Uygulamanın 5 sayfasını (Ana Sayfa, Etkinlikler, Detay, Ekle, Güncelle) ve state yönetimini içeren ana bileşendir.
- **src/App.css**: Uygulamanın stillerini barındırır; Sprint 3'teki CSS kurallarını içerir.
- **src/index.css**: Tüm sayfaya genel stiller için ayrılmıştır; bu sprintte boş bırakılmıştır.
- **public/**: Derleme işlemine girmeden doğrudan kök dizinden sunulan statik dosyaları (afis.svg, favicon.svg vb.) barındırır.
