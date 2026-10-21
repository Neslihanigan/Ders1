import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <div className="detay-layout">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}
        <div className="kunye">
          <h3>Etkinlik Künyesi</h3>
          <dl>
            <dt>Tarih</dt>
            <dd>
              {formatDate(event.date)}, {event.time}
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity ? `${event.capacity} kişi` : "Sınırsız"}</dd>
          </dl>
        </div>
      </div>

      <div className="detay-aciklama">
        <h2>Açıklama</h2>
        <p>{event.description}</p>
      </div>

      <div className="detay-butonlar">
        <button type="button" className="btn" onClick={onBack}>
          ← Listeye dön
        </button>
        <button type="button" className="btn" onClick={() => onEdit(event.id)}>
          Bu etkinliği güncelle
        </button>
      </div>
    </article>
  );
}

export default EventDetail;

