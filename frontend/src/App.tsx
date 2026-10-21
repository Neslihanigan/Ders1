import "./App.css";
import { useState, useEffect } from "react";
import type { PageName } from "./types/page";
import type { Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

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
  let headerDesc: string | undefined =
    "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  if (page === "events") {
    pageTitle = "Tüm Etkinlikler";
    headerMainTitle = "Tüm Etkinlikler";
    headerDesc = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (page === "detail") {
    pageTitle = selected ? selected.title : "Etkinlik bulunamadı";
    headerMainTitle = selected ? selected.title : "Etkinlik Detayı";
    headerDesc = undefined;
  } else if (page === "add") {
    pageTitle = "Etkinlik Ekle";
    headerMainTitle = "Etkinlik Ekle";
    headerDesc = undefined;
  } else if (page === "update") {
    pageTitle = "Etkinlik Güncelle";
    headerMainTitle = "Etkinlik Güncelle";
    headerDesc = undefined;
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

  return (
    <>
      <Header title={headerMainTitle} text={headerDesc} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <h2 className="sayfa-basligi">Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
            />
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
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p className="sonuc-bilgisi">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
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
              <EventDetail
                event={selected}
                onBack={() => go("events")}
                onEdit={(id) => go("update", id)}
              />
            )}
          </>
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
