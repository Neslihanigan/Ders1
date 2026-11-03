import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-grup">
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Örn. Kariyer Günleri 2026"
          maxLength={80}
          aria-invalid={errors.title ? true : undefined}
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div className="form-grup">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="hata-metni">{errors.category}</span>
        )}
      </div>

      <div className="form-grup">
        <label htmlFor="date">Tarih</label>
        <input
          type="date"
          id="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        {errors.date && <span className="hata-metni">{errors.date}</span>}
      </div>

      <div className="form-grup">
        <label htmlFor="time">Saat</label>
        <input
          type="time"
          id="time"
          name="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        {errors.time && <span className="hata-metni">{errors.time}</span>}
      </div>

      <div className="form-grup">
        <label htmlFor="location">Yer</label>
        <input
          type="text"
          id="location"
          name="location"
          value={data.location}
          onChange={handleChange}
          placeholder="Örn. A Blok Konferans Salonu"
          aria-invalid={errors.location ? true : undefined}
        />
        {errors.location && (
          <span className="hata-metni">{errors.location}</span>
        )}
      </div>

      <div className="form-grup">
        <label htmlFor="capacity">Kontenjan</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        {errors.capacity && (
          <span className="hata-metni">{errors.capacity}</span>
        )}
      </div>

      <div className="form-grup">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        {errors.description && (
          <span className="hata-metni">{errors.description}</span>
        )}
      </div>

      <button type="submit" className="btn">
        {submitText}
      </button>
    </form>
  );
}

export default EventForm;
