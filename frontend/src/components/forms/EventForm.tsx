interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="form-bilgi">
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
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
          Kaydet
        </button>
      </form>
    </>
  );
}

export default EventForm;

