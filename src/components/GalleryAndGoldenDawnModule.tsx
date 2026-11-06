import React, { useState } from 'react';
import {
  ART_GALLERY_ITEMS,
  ArtCategoryId,
  ArtGalleryItem,
  GOLDEN_DAWN_RECORDS,
  GoldenDawnRecord,
  GoldenDawnSubId,
  ModuleId,
  SHEPHIROT_NODES,
} from '../utils/archiveEngine';
import {
  Compass,
  Upload,
  Edit3,
  ArrowUp,
  ArrowDown,
  Plus,
} from 'lucide-react';

interface ArtGalleryViewProps {
  onNavigateModule: (moduleId: ModuleId, param?: string) => void;
}

const ART_CATEGORY_SPECS: {
  category_id: ArtCategoryId;
  name: 'Gambar Gratis' | 'Energi Kemuliaan' | 'Sumber Universal';
  metaLabel: string;
  file_types: string[];
}[] = [
  {
    category_id: 'ART-FREE',
    name: 'Gambar Gratis',
    metaLabel: 'Lisensi: Creative Commons / Public Domain',
    file_types: ['JPG', 'PNG', 'SVG'],
  },
  {
    category_id: 'ART-GLORY',
    name: 'Energi Kemuliaan',
    metaLabel: 'Tema: Metafisika, Simbolisme Keagungan, Cahaya Ilahi',
    file_types: ['WEBP', 'JPG', 'PNG'],
  },
  {
    category_id: 'ART-UNIVERSAL',
    name: 'Sumber Universal',
    metaLabel: 'Tema: Kosmologi, Fraktal Alam Semesta, Geometri Sakral',
    file_types: ['TIFF', 'JPG', 'PNG'],
  },
];

export const ArtGalleryModule: React.FC<ArtGalleryViewProps> = () => {
  const [items, setItems] = useState<ArtGalleryItem[]>(ART_GALLERY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<ArtCategoryId | 'ALL'>('ALL');
  const [selectedArtworkId, setSelectedArtworkId] = useState<string>(ART_GALLERY_ITEMS[0].id);

  // Founder Capabilities: upload_high_res_photos, edit_caption, reorder_gallery_scroll
  const [showFounderPanel, setShowFounderPanel] = useState<boolean>(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState<string>('');
  const [newPhotoCat, setNewPhotoCat] = useState<ArtCategoryId>('ART-GLORY');
  const [editCaptionText, setEditCaptionText] = useState<string>(
    ART_GALLERY_ITEMS[0].description
  );
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const filteredItems = (
    selectedCategory === 'ALL'
      ? items
      : items.filter((item) => item.categoryId === selectedCategory)
  ).sort((a, b) => a.scrollOrder - b.scrollOrder);

  const activeArtwork: ArtGalleryItem =
    filteredItems.find((i) => i.id === selectedArtworkId) ||
    filteredItems[0] ||
    items[0];

  const handleUploadPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim()) return;
    const catSpec = ART_CATEGORY_SPECS.find((c) => c.category_id === newPhotoCat)!;
    const newItem: ArtGalleryItem = {
      id: `art-${Date.now()}`,
      scrollOrder: items.length + 1,
      categoryId: newPhotoCat,
      categoryName: catSpec.name,
      title: newPhotoTitle.trim(),
      artistOrSource: 'Unggahan Founder Sovereign (Resolusi Tinggi)',
      year: '2026',
      licenseOrTheme: catSpec.metaLabel,
      fileType: 'WEBP',
      resolution: '6000 × 4500 px',
      accessionNumber: `ACC.${newPhotoCat}.${items.length + 1}`,
      imageUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
      description: 'Karya visual resolusi tinggi yang diunggah langsung melalui Founder Gallery Uploader.',
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedArtworkId(newItem.id);
    setNewPhotoTitle('');
    setFeedbackMsg(`[upload_high_res_photos] "${newItem.title}" berhasil ditambahkan ke aliran gulir.`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleEditCaption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCaptionText.trim()) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === activeArtwork.id
          ? { ...item, description: editCaptionText.trim() }
          : item
      )
    );
    setFeedbackMsg(`[edit_caption] Takarir karya "${activeArtwork.title}" diperbarui.`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleReorderScroll = (itemId: string, direction: 'UP' | 'DOWN') => {
    const sorted = [...items].sort((a, b) => a.scrollOrder - b.scrollOrder);
    const idx = sorted.findIndex((i) => i.id === itemId);
    if (idx < 0) return;
    const swapIdx = direction === 'UP' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const tempOrder = sorted[idx].scrollOrder;
    sorted[idx] = { ...sorted[idx], scrollOrder: sorted[swapIdx].scrollOrder };
    sorted[swapIdx] = { ...sorted[swapIdx], scrollOrder: tempOrder };
    setItems(sorted);
    setFeedbackMsg(`[reorder_gallery_scroll] Urutan aliran gulir galeri diperbarui.`);
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-archival text-[#64748B]">
            <span>ORDER 03 · MOD-03-ART-GALLERY</span>
            <span aria-hidden="true">·</span>
            <span>UI MODE: WEB SCROLL (INFINITE SMOOTH SCROLL)</span>
          </div>
          <h1 className="mt-2 font-['Times_New_Roman'] text-3xl font-semibold text-[#0A0A0A]">
            Galeri Seni Visual Terkurasi (Art Collection)
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
            Aliran karya visual berkesinambungan melintasi kategori <strong>Gambar Gratis</strong>, <strong>Energi Kemuliaan</strong>, dan <strong>Sumber Universal</strong> dengan kapabilitas pendiri (<em>upload_high_res_photos</em>, <em>edit_caption</em>, <em>reorder_gallery_scroll</em>).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFounderPanel((p) => !p)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-archival font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showFounderPanel
                ? 'border-[#151B8D] bg-[#151B8D] text-white'
                : 'border-[#E2E8F0] bg-[#F8F9FA] text-[#0A0A0A] hover:bg-white'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Kapabilitas Pendiri (Galeri CMS)</span>
          </button>

          <div
            role="tablist"
            aria-label="Filter Kategori Galeri Seni"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'ALL'}
              onClick={() => setSelectedCategory('ALL')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-[#151B8D] text-white'
                  : 'text-[#64748B] hover:text-[#0A0A0A]'
              }`}
            >
              Semua ({items.length})
            </button>
            {ART_CATEGORY_SPECS.map((cat) => {
              const isSelected = selectedCategory === cat.category_id;
              return (
                <button
                  key={cat.category_id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.category_id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#151B8D] text-white'
                      : 'text-[#0A0A0A] hover:bg-white'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Founder Capabilities Panel */}
      {showFounderPanel && (
        <div className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <span className="font-archival text-xs font-semibold text-[#151B8D]">
              FOUNDER CAPABILITIES · MOD-03-ART-GALLERY
            </span>
            {feedbackMsg && (
              <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                {feedbackMsg}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* upload_high_res_photos */}
            <form
              onSubmit={handleUploadPhoto}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Upload className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>1. UPLOAD_HIGH_RES_PHOTOS</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <input
                  type="text"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="Judul karya visual baru..."
                  className="sm:col-span-2 rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                />
                <select
                  value={newPhotoCat}
                  onChange={(e) => setNewPhotoCat(e.target.value as ArtCategoryId)}
                  className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                >
                  {ART_CATEGORY_SPECS.map((c) => (
                    <option key={c.category_id} value={c.category_id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="rounded bg-[#151B8D] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Unggah Foto Resolusi Tinggi
              </button>
            </form>

            {/* edit_caption */}
            <form
              onSubmit={handleEditCaption}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Edit3 className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>2. EDIT_CAPTION (KARYA AKTIF: {activeArtwork.title})</span>
              </div>
              <textarea
                rows={2}
                value={editCaptionText}
                onChange={(e) => setEditCaptionText(e.target.value)}
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] p-2 text-xs text-[#0A0A0A]"
              />
              <button
                type="submit"
                className="rounded bg-[#151B8D] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Simpan Takarir (Caption)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Infinite Smooth Scroll Stream */}
      <div className="space-y-8">
        {filteredItems.map((item, idx) => (
          <article
            key={item.id}
            onClick={() => {
              setSelectedArtworkId(item.id);
              setEditCaptionText(item.description);
            }}
            className={`grid grid-cols-1 gap-8 rounded-lg border p-6 transition-colors lg:grid-cols-12 items-center cursor-pointer ${
              item.id === activeArtwork.id
                ? 'border-[#151B8D] bg-white'
                : 'border-[#E2E8F0] bg-[#F8F9FA] hover:bg-white'
            }`}
          >
            <div className="lg:col-span-7 overflow-hidden rounded border border-[#E2E8F0] bg-[#0F172A] aspect-[16/10]">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-archival text-[#64748B]">
                <span className="font-semibold text-[#151B8D]">
                  URUTAN GULIR #0{idx + 1} · {item.categoryName.toUpperCase()}
                </span>
                <span>
                  {item.fileType} · {item.resolution}
                </span>
              </div>

              <h2 className="font-display-serif text-2xl font-semibold text-[#0A0A0A]">
                {item.title}
              </h2>

              <p className="text-sm leading-relaxed text-[#0A0A0A]">
                {item.description}
              </p>

              <div className="border-t border-[#E2E8F0] pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
                <span>
                  {item.accessionNumber} · {item.artistOrSource}
                </span>

                {/* 3. reorder_gallery_scroll buttons */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Geser naik urutan ${item.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReorderScroll(item.id, 'UP');
                    }}
                    className="inline-flex items-center gap-1 rounded border border-[#E2E8F0] bg-white px-2 py-1 text-xs font-archival text-[#0A0A0A] hover:border-[#151B8D] cursor-pointer"
                  >
                    <ArrowUp className="h-3 w-3" />
                    <span>Naik</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Geser turun urutan ${item.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReorderScroll(item.id, 'DOWN');
                    }}
                    className="inline-flex items-center gap-1 rounded border border-[#E2E8F0] bg-white px-2 py-1 text-xs font-archival text-[#0A0A0A] hover:border-[#151B8D] cursor-pointer"
                  >
                    <ArrowDown className="h-3 w-3" />
                    <span>Turun</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// --- STANDALONE MODULE: REPOSITORI KHUSUS GOLDEN DAWN (MOD-08-GOLDEN-DAWN) ---

interface GoldenDawnModuleProps {
  initialSubId?: GoldenDawnSubId;
  onNavigateModule: (moduleId: ModuleId, param?: string) => void;
}

const GOLDEN_DAWN_SUB_COLLECTIONS: {
  id: GoldenDawnSubId;
  name: string;
  synopsis: string;
}[] = [
  {
    id: 'gd-history',
    name: 'Arsip Historis & Dokumen Ordo',
    synopsis: 'Naskah sandi (Cipher Manuscript 1888), silsilah kuil Isis-Urania, dan konstitusi Ordo Kedua.',
  },
  {
    id: 'gd-tarot',
    name: 'Sistem Simbol Tarot Hermetis',
    synopsis: 'Risalah Liber T, atribusi 22 jalur Pohon Kehidupan, dan empat skala warna kromatik.',
  },
  {
    id: 'gd-rituals',
    name: 'Naskah Ritual & Transkripsi Asli',
    synopsis: 'Transkripsi dokumen Z-1/Z-3, tata ruang Pilar Kembar, dan geometri ritual Rose Cross.',
  },
];

export const GoldenDawnModule: React.FC<GoldenDawnModuleProps> = ({
  initialSubId,
  onNavigateModule,
}) => {
  const [records, setRecords] = useState<GoldenDawnRecord[]>(GOLDEN_DAWN_RECORDS);
  const [selectedSubId, setSelectedSubId] = useState<GoldenDawnSubId | 'ALL'>(
    initialSubId || 'ALL'
  );
  const [showFounderTools, setShowFounderTools] = useState<boolean>(false);
  const [newManuscriptTitle, setNewManuscriptTitle] = useState<string>('');
  const [newManuscriptSub, setNewManuscriptSub] = useState<GoldenDawnSubId>('gd-tarot');
  const [newManuscriptExcerpt, setNewManuscriptExcerpt] = useState<string>('');
  const [gdNotice, setGdNotice] = useState<string | null>(null);

  const filteredRecords =
    selectedSubId === 'ALL'
      ? records
      : records.filter((r) => r.subCollectionId === selectedSubId);

  const handleAddGoldenDawnRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManuscriptTitle.trim()) return;
    const subSpec = GOLDEN_DAWN_SUB_COLLECTIONS.find((s) => s.id === newManuscriptSub)!;
    const newRec: GoldenDawnRecord = {
      id: `gd-doc-${Date.now()}`,
      subCollectionId: newManuscriptSub,
      subCollectionName: subSpec.name,
      cipherCode: `GD-FOUNDER-${records.length + 1}`,
      title: newManuscriptTitle.trim(),
      yearOriginated: 'Arsip Tambahan Founder (2026)',
      gradeCorrelation: '5°=6° Adeptus Minor',
      summary: 'Manuskrip atau diagram Tarot Hermetis yang ditambahkan melalui kapabilitas Founder.',
      archivalExcerpt:
        newManuscriptExcerpt.trim() ||
        '“Transkripsi simbolik yang menyelaraskan jalur Pohon Kehidupan dengan geometri ruang Ordo...”',
      shephirotRefNodeId: 6,
      diagramUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    };
    setRecords((prev) => [newRec, ...prev]);
    setNewManuscriptTitle('');
    setNewManuscriptExcerpt('');
    setGdNotice(
      `[upload_tarot_diagrams / add_historical_manuscripts] "${newRec.title}" ditambahkan ke Continuous Archival Scroll.`
    );
    setTimeout(() => setGdNotice(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      {/* Standalone Collection Header */}
      <div className="rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-archival text-[#151B8D]">
              <span>ORDER 08 · MOD-08-GOLDEN-DAWN</span>
              <span aria-hidden="true">·</span>
              <span>UI MODE: WEB SCROLL (CONTINUOUS ARCHIVAL SCROLL)</span>
            </div>

            <h1 className="font-display-serif text-3xl font-semibold text-[#0A0A0A]">
              Repositori Khusus: Golden Dawn (Modul Mandiri)
            </h1>

            <p className="text-sm leading-relaxed text-[#64748B]">
              Aliran arsip berkesinambungan (<em>Continuous Archival Scroll</em>) untuk korpus <strong>Hermetic Order of the Golden Dawn</strong> dengan kapabilitas pendiri: <em>upload_tarot_diagrams</em> dan <em>add_historical_manuscripts</em>.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFounderTools((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#151B8D] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Unggah Diagram Tarot / Manuskrip Historis</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSubId('ALL')}
                className={`rounded-md px-3 py-2 text-xs font-medium cursor-pointer ${
                  selectedSubId === 'ALL'
                    ? 'border border-[#151B8D] bg-white text-[#151B8D]'
                    : 'border border-[#E2E8F0] bg-white text-[#64748B]'
                }`}
              >
                Semua ({records.length})
              </button>
              {GOLDEN_DAWN_SUB_COLLECTIONS.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`rounded-md px-3 py-2 text-xs font-medium cursor-pointer ${
                    selectedSubId === sub.id
                      ? 'border border-[#151B8D] bg-white text-[#151B8D]'
                      : 'border border-[#E2E8F0] bg-white text-[#64748B]'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-md border border-[#E2E8F0] bg-[#0F172A] aspect-[16/9]">
              <img
                src="/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg"
                alt="Arsip Cipher Manuscript dan Pelat Tarot Hermetis Golden Dawn"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Founder Upload Tarot Diagrams / Add Historical Manuscripts Form */}
      {showFounderTools && (
        <form
          onSubmit={handleAddGoldenDawnRecord}
          className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <span className="font-archival text-xs font-semibold text-[#151B8D]">
              FOUNDER CAPABILITIES · UPLOAD_TAROT_DIAGRAMS & ADD_HISTORICAL_MANUSCRIPTS
            </span>
            {gdNotice && (
              <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                {gdNotice}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              type="text"
              value={newManuscriptTitle}
              onChange={(e) => setNewManuscriptTitle(e.target.value)}
              placeholder="Judul diagram Tarot atau naskah historis..."
              className="sm:col-span-2 rounded border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0A0A0A]"
            />
            <select
              value={newManuscriptSub}
              onChange={(e) => setNewManuscriptSub(e.target.value as GoldenDawnSubId)}
              className="rounded border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0A0A0A]"
            >
              {GOLDEN_DAWN_SUB_COLLECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            rows={2}
            value={newManuscriptExcerpt}
            onChange={(e) => setNewManuscriptExcerpt(e.target.value)}
            placeholder="Petikan transkripsi atau deskripsi simbolik..."
            className="w-full rounded border border-[#E2E8F0] bg-white p-2.5 text-xs text-[#0A0A0A]"
          />
          <button
            type="submit"
            className="rounded bg-[#151B8D] px-4 py-2 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
          >
            Tambahkan ke Repositori Golden Dawn
          </button>
        </form>
      )}

      {/* Continuous Archival Scroll Stream */}
      <div className="space-y-6">
        {filteredRecords.map((rec, index) => {
          const linkedNode = SHEPHIROT_NODES.find((n) => n.id === rec.shephirotRefNodeId);
          return (
            <article
              key={rec.id}
              className="grid grid-cols-1 gap-6 rounded-lg border border-[#E2E8F0] bg-white p-6 lg:grid-cols-12 items-center"
            >
              <div className="lg:col-span-4 overflow-hidden rounded border border-[#E2E8F0] bg-[#0F172A] aspect-[4/3]">
                <img
                  src={rec.diagramUrl}
                  alt={rec.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-archival text-[#64748B]">
                  <span className="font-semibold text-[#151B8D]">
                    ARSIP #0{index + 1} · {rec.cipherCode}
                  </span>
                  <span>{rec.subCollectionName}</span>
                </div>

                <h2 className="font-display-serif text-2xl font-semibold text-[#0A0A0A]">
                  {rec.title}
                </h2>

                <p className="text-sm leading-relaxed text-[#0A0A0A]">{rec.summary}</p>

                <blockquote className="rounded border border-[#E2E8F0] bg-[#F8F9FA] p-4 font-codex text-base italic text-[#0A0A0A]">
                  {rec.archivalExcerpt}
                </blockquote>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2E8F0] pt-3 text-xs">
                  <span className="text-[#64748B]">
                    Penanggalan: {rec.yearOriginated} · Derajat: {rec.gradeCorrelation}
                  </span>
                  {linkedNode && (
                    <button
                      type="button"
                      onClick={() => onNavigateModule('MOD-05-SHEPHIROT', String(linkedNode.id))}
                      className="inline-flex items-center gap-1.5 font-medium text-[#151B8D] hover:underline cursor-pointer"
                    >
                      <Compass className="h-3.5 w-3.5" />
                      <span>
                        Tautan Simpul #{linkedNode.id} {linkedNode.name}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
