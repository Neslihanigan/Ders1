import "./App.css";
import { useState, useEffect } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  let y: number;
  let m: number;
  let d: number;
  if (parts[0].length === 4) {
    [y, m, d] = parts.map(Number);
  } else {
    [d, m, y] = parts.map(Number);
  }
  return new Date(y, m - 1, d).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let pageTitle = "Ana Sayfa";
  let headerMainTitle = "Kampüs Etkinlikleri";
  let headerDesc: string | null =
    "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  if (page === "events") {
    pageTitle = "Tüm Etkinlikler";
    headerMainTitle = "Tüm Etkinlikler";
    headerDesc = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (page === "detail") {
    pageTitle = selected ? selected.title : "Etkinlik bulunamadı";
    headerMainTitle = selected ? selected.title : "Etkinlik Detayı";
    headerDesc = null;
  } else if (page === "add") {
    pageTitle = "Etkinlik Ekle";
    headerMainTitle = "Etkinlik Ekle";
    headerDesc = null;
  } else if (page === "update") {
    pageTitle = "Etkinlik Güncelle";
    headerMainTitle = "Etkinlik Güncelle";
    headerDesc = null;
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${pageTitle}`;
  }, [pageTitle]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <span className="etiket">{event.category}</span>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href={`#${event.id}`}
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  const navItems: { name: PageName; label: string }[] = [
    { name: "home", label: "Ana Sayfa" },
    { name: "events", label: "Etkinlikler" },
    { name: "add", label: "Ekle" },
  ];

  return (
    <>
      <header className="site-baslik">
        <h1>{headerMainTitle}</h1>
        {headerDesc && <p>{headerDesc}</p>}
        <nav className="menu">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.name}`}
              className={page === item.name ? "aktif" : ""}
              aria-current={page === item.name ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.name);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2 className="sayfa-basligi">Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <div style={{ marginTop: "1.5rem" }}>
              <button
                type="button"
                className="btn"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör
              </button>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <div className="filtre-kutusu">
              <div className="filtre-grup">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  id="arama"
                  type="search"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="filtre-grup">
                <label htmlFor="kategori-secimi">Kategori</label>
                <select
                  id="kategori-secimi"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="sonuc-bilgisi">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && (
          <>
            {!selected ? (
              <div className="hata-kutusu">
                <p>Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
                <button
                  type="button"
                  className="btn"
                  onClick={() => go("events")}
                >
                  ← Listeye dön
                </button>
              </div>
            ) : (
              <article className="detay">
                <div className="detay-layout">
                  {selected.image && (
                    <figure>
                      <img
                        src={selected.image}
                        alt={`${selected.title} afişi`}
                      />
                      <figcaption>{selected.title} afişi</figcaption>
                    </figure>
                  )}
                  <div className="kunye">
                    <h3>Etkinlik Künyesi</h3>
                    <dl>
                      <dt>Tarih</dt>
                      <dd>
                        {formatDate(selected.date)}, {selected.time}
                      </dd>
                      <dt>Yer</dt>
                      <dd>{selected.location}</dd>
                      <dt>Kategori</dt>
                      <dd>{selected.category}</dd>
                      <dt>Kontenjan</dt>
                      <dd>
                        {selected.capacity
                          ? `${selected.capacity} kişi`
                          : "Sınırsız"}
                      </dd>
                    </dl>
                  </div>
                </div>

                <div className="detay-aciklama">
                  <h2>Açıklama</h2>
                  <p>{selected.description}</p>
                </div>

                <div className="detay-butonlar">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => go("events")}
                  >
                    ← Listeye dön
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => go("update", selected.id)}
                  >
                    Bu etkinliği güncelle
                  </button>
                </div>
              </article>
            )}
          </>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="form-bilgi">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>
            <form
              className="form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  placeholder="Örn. Kariyer Günleri 2026"
                  maxLength={80}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div className="form-grup">
                <label htmlFor="date">Tarih</label>
                <input type="date" id="date" />
              </div>

              <div className="form-grup">
                <label htmlFor="time">Saat</label>
                <input type="time" id="time" />
              </div>

              <div className="form-grup">
                <label htmlFor="location">Yer</label>
                <input
                  type="text"
                  id="location"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input type="number" id="capacity" />
              </div>

              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>

              <button type="submit" className="btn">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>

      <footer className="site-footer">
        <p>Neslihan İgan · 2416501027 · 2026</p>
      </footer>
    </>
  );
}

export default App;
