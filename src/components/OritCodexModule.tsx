import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Code2,
  CheckCircle2,
  Upload,
  Edit3,
  ShieldCheck,
} from 'lucide-react';
import {
  ORBIT_CODEX_FOLIOS,
  ORBIT_CODEX_QUOTA,
  OrbitFolioRecord,
  PaleographyAnnotation,
  SECURITY_AND_USAGE_PROTOCOLS,
  generateForensicWatermark,
} from '../utils/archiveEngine';

interface OritCodexModuleProps {
  initialSlotNumber?: number;
}

export const OritCodexModule: React.FC<OritCodexModuleProps> = ({
  initialSlotNumber,
}) => {
  const [folios, setFolios] = useState<OrbitFolioRecord[]>(ORBIT_CODEX_FOLIOS);
  const [selectedSlotNumber, setSelectedSlotNumber] = useState<number>(
    initialSlotNumber && initialSlotNumber >= 1 && initialSlotNumber <= 6
      ? initialSlotNumber
      : 1
  );
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [showAnnotationPins, setShowAnnotationPins] = useState<boolean>(true);
  const [activeAnnotationId, setActiveAnnotationId] = useState<string>('ann-1');
  const [showIiifManifest, setShowIiifManifest] = useState<boolean>(false);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number>(0);

  // Founder Capabilities State (upload_codex_folio, edit_transcription, approve_annotations)
  const [showFounderPanel, setShowFounderPanel] = useState<boolean>(false);
  const [editIndoText, setEditIndoText] = useState<string>(
    ORBIT_CODEX_FOLIOS[0].verses[0].indonesianTranslation
  );
  const [newShelfmark, setNewShelfmark] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const currentFolio: OrbitFolioRecord =
    folios.find((f) => f.slotNumber === selectedSlotNumber) || folios[0];

  const activeAnnotation: PaleographyAnnotation | undefined =
    currentFolio.annotations.find((a) => a.id === activeAnnotationId) ||
    currentFolio.annotations[0];

  const handleSelectSlot = (slotNum: number) => {
    setSelectedSlotNumber(slotNum);
    setSelectedVerseIndex(0);
    const targetFolio = folios.find((f) => f.slotNumber === slotNum) || folios[0];
    if (targetFolio.annotations[0]) {
      setActiveAnnotationId(targetFolio.annotations[0].id);
    }
    if (targetFolio.verses[0]) {
      setEditIndoText(targetFolio.verses[0].indonesianTranslation);
    }
  };

  const handleFounderUploadFolio = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedShelf =
      newShelfmark.trim() || `MS TBI-ORBIT-SLOT0${selectedSlotNumber}-REV`;
    setFolios((prev) =>
      prev.map((f) =>
        f.slotNumber === selectedSlotNumber
          ? {
              ...f,
              shelfmark: updatedShelf,
              century: `${f.century} · Diperbarui Founder`,
            }
          : f
      )
    );
    setNewShelfmark('');
    setStatusMessage(
      `[upload_codex_folio] Slot 0${selectedSlotNumber} berhasil diperbarui (${updatedShelf}).`
    );
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleFounderEditTranscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editIndoText.trim()) return;
    setFolios((prev) =>
      prev.map((f) => {
        if (f.slotNumber !== selectedSlotNumber) return f;
        const nextVerses = f.verses.map((v, idx) =>
          idx === selectedVerseIndex
            ? { ...v, indonesianTranslation: editIndoText.trim() }
            : v
        );
        return { ...f, verses: nextVerses };
      })
    );
    setStatusMessage(
      `[edit_transcription] Transkripsi Slot 0${selectedSlotNumber} Perikop 0${
        selectedVerseIndex + 1
      } telah disimpan.`
    );
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleFounderApproveAnnotation = (annotationId: string) => {
    setFolios((prev) =>
      prev.map((f) => {
        if (f.slotNumber !== selectedSlotNumber) return f;
        return {
          ...f,
          annotations: f.annotations.map((ann) =>
            ann.id === annotationId
              ? {
                  ...ann,
                  approvedByFounder: !ann.approvedByFounder,
                  peerReviewStatus: !ann.approvedByFounder
                    ? 'Disetujui Pendiri & Peer-Review (2026)'
                    : 'Menunggu Otorisasi Pendiri',
                }
              : ann
          ),
        };
      })
    );
    setStatusMessage(
      `[approve_annotations] Status otorisasi anotasi ${annotationId} berhasil diperbarui.`
    );
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      {/* Module Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 lg:flex-row lg:items-end">
        <div>
          <span className="module-tag">URUTAN 02 · PRESERVASI NASKAH KANONIK · MOD-02-ORBIT-CODEX</span>
          <h1 className="section-title font-['Times_New_Roman']">
            O R B I T - C O D E X (6 Master Codex)
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
            Stasiun kolasi faksimili perkamen resolusi ultra-tinggi berbasis{' '}
            <strong className="font-medium text-[#0A0A0A]">IIIF Deep-Zoom Viewer</strong> (kuota{' '}
            {ORBIT_CODEX_QUOTA} Master Codex: <em>Codex I: Kanon Kosmologi</em> s.d. <em>Codex VI: Epilog Kemuliaan</em>) dengan latar konservasi <code>#0F172A</code>, komparasi Ge’ez–Transliterasi–Indonesia, dan kapabilitas pendiri (<em>upload_codex_folio</em>, <em>edit_transcription</em>, <em>approve_annotations</em>).
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
            <span>Kapabilitas Pendiri (Codex CMS)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowIiifManifest((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-archival font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showIiifManifest
                ? 'border-[#151B8D] bg-[#151B8D] text-white'
                : 'border-[#E2E8F0] bg-white text-[#0A0A0A] hover:bg-[#F8F9FA]'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Manifest IIIF v3</span>
          </button>
        </div>
      </div>

      {/* 6 Master Codex Selector Grid (ORBIT // 001 to ORBIT // 006) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-archival text-[#64748B]">
          <span>PILIH MASTER CODEX (6 / {ORBIT_CODEX_QUOTA} SLOT KANONIK)</span>
          <span>AKTIF: {currentFolio.orbitCode.replace(' // ', ' · ')} · {currentFolio.masterCodexTitle} ({currentFolio.side})</span>
        </div>
        <div
          role="tablist"
          aria-label="Pilih Slot Kuota 1 hingga 6 Orbit Codex"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {folios.map((folio) => {
            const isSelected = folio.slotNumber === selectedSlotNumber;
            return (
              <button
                key={folio.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectSlot(folio.slotNumber)}
                className={`archival-card text-left cursor-pointer ${
                  isSelected
                    ? '!border-[#151B8D] !bg-[#151B8D] text-white'
                    : 'bg-white text-[#0A0A0A]'
                }`}
              >
                <span
                  className={`module-tag ${
                    isSelected ? '!text-slate-200' : '!text-[#64748B]'
                  }`}
                >
                  {folio.orbitCode.replace(' // ', ' · ')} · SLOT 0{folio.slotNumber}
                </span>
                <h3
                  className={`font-heading text-base font-bold ${
                    isSelected ? 'text-white' : 'text-[#0A0A0A]'
                  }`}
                >
                  {folio.masterCodexTitle}
                </h3>
                <p
                  className={`mt-1 text-xs ${
                    isSelected ? 'text-slate-200' : 'text-[#64748B]'
                  }`}
                >
                  Viewer IIIF Deep-Zoom & Transkripsi Filologi ({folio.shelfmark})
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Founder Capabilities Drawer: upload_codex_folio, edit_transcription, approve_annotations */}
      {showFounderPanel && (
        <div className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <div className="font-archival text-xs font-semibold text-[#151B8D]">
              FOUNDER CAPABILITIES · MOD-02-ORBIT-CODEX (SLOT 0{selectedSlotNumber})
            </div>
            {statusMessage && (
              <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                {statusMessage}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 1. upload_codex_folio */}
            <form
              onSubmit={handleFounderUploadFolio}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Upload className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>1. UPLOAD_CODEX_FOLIO</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Perbarui berkas master TIFF/IIIF pada Slot 0{selectedSlotNumber} dari kuota 6 folio.
              </p>
              <input
                type="text"
                value={newShelfmark}
                onChange={(e) => setNewShelfmark(e.target.value)}
                placeholder="Nomor simpan baru (mis. MS TBI-ORBIT-014R-V2)..."
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
              />
              <button
                type="submit"
                className="w-full rounded bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Unggah & Perbarui Slot 0{selectedSlotNumber}
              </button>
            </form>

            {/* 2. edit_transcription */}
            <form
              onSubmit={handleFounderEditTranscription}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Edit3 className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>2. EDIT_TRANSCRIPTION</span>
              </div>
              <textarea
                rows={3}
                value={editIndoText}
                onChange={(e) => setEditIndoText(e.target.value)}
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] p-2 text-xs text-[#0A0A0A]"
              />
              <button
                type="submit"
                className="w-full rounded bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Simpan Suntingan Transkripsi
              </button>
            </form>

            {/* 3. approve_annotations */}
            <div className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>3. APPROVE_ANNOTATIONS</span>
              </div>
              {currentFolio.annotations.length === 0 ? (
                <p className="text-xs text-[#64748B]">
                  Belum ada antrean anotasi paleografi pada slot folio ini.
                </p>
              ) : (
                <div className="space-y-2">
                  {currentFolio.annotations.map((ann) => (
                    <div
                      key={ann.id}
                      className="flex items-center justify-between gap-2 rounded border border-[#E2E8F0] bg-[#F8F9FA] p-2 text-xs"
                    >
                      <span className="truncate font-medium text-[#0A0A0A]">
                        {ann.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleFounderApproveAnnotation(ann.id)}
                        className={`rounded px-2.5 py-1 font-archival text-[11px] font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                          ann.approvedByFounder
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#151B8D] text-white'
                        }`}
                      >
                        {ann.approvedByFounder ? 'Approved ✓' : 'Setujui'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Optional IIIF Presentation API v3 JSON Drawer */}
      {showIiifManifest && (
        <div className="rounded-lg border border-[#E2E8F0] bg-[#0F172A] p-5 text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-archival">
            <span>IIIF PRESENTATION API 3.0 MANIFEST · {currentFolio.shelfmark}</span>
            <span className="text-slate-400">{currentFolio.iiifManifestId}</span>
          </div>
          <pre className="mt-3 overflow-x-auto font-archival text-xs leading-relaxed text-slate-300">
            {JSON.stringify(
              {
                '@context': 'http://iiif.io/api/presentation/3/context.json',
                id: currentFolio.iiifManifestId,
                type: 'Manifest',
                quotaSlot: `${currentFolio.slotNumber} of ${ORBIT_CODEX_QUOTA}`,
                label: { id: [currentFolio.folioLabel] },
                Metadata: [
                  { label: 'Shelfmark', value: currentFolio.shelfmark },
                  { label: 'Century', value: currentFolio.century },
                  { label: 'Material', value: currentFolio.material },
                ],
              },
              null,
              2
            )}
          </pre>
        </div>
      )}

      {/* Top Split: DeepZoom Facsimile Viewer (#0F172A) + Peer-Reviewed Paleography Layer */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col justify-between rounded-lg border border-[#E2E8F0] bg-[#0F172A] text-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/70 px-4 py-3">
            <div className="text-xs font-archival">
              <span className="font-semibold text-white">{currentFolio.folioLabel}</span>
              <span className="mx-2 text-slate-500">·</span>
              <span className="text-slate-300">{currentFolio.shelfmark}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded border border-slate-700 bg-slate-900">
                <button
                  type="button"
                  aria-label="Perkecil Faksimili DeepZoom"
                  onClick={() => setZoomScale((s) => Math.max(1, Number((s - 0.25).toFixed(2))))}
                  className="p-1.5 text-slate-200 hover:bg-slate-800 cursor-pointer"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="px-2.5 font-archival text-xs tabular-nums text-white">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  aria-label="Perbesar Faksimili DeepZoom"
                  onClick={() => setZoomScale((s) => Math.min(2.5, Number((s + 0.25).toFixed(2))))}
                  className="p-1.5 text-slate-200 hover:bg-slate-800 cursor-pointer"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Reset Zoom Faksimili"
                  onClick={() => setZoomScale(1)}
                  className="border-l border-slate-700 p-1.5 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowAnnotationPins((p) => !p)}
                className={`inline-flex items-center gap-1 rounded border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  showAnnotationPins
                    ? 'border-[#151B8D] bg-[#151B8D] text-white'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Pin Paleografi ({currentFolio.annotations.length})</span>
              </button>
            </div>
          </div>

          <div
            onContextMenu={(e) => e.preventDefault()}
            className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-[#0F172A] p-6 select-none"
          >
            {/* TBI-RULE-02 Dynamic Forensic Watermark Overlay */}
            <div
              aria-label="Watermark Forensik TBI-RULE-02"
              className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-between p-4 text-[10px] font-archival tracking-widest text-white/25"
            >
              <span>{SECURITY_AND_USAGE_PROTOCOLS.classification_banner}</span>
              <span className="-rotate-12 border border-white/15 bg-black/30 px-3 py-1 text-center">
                {generateForensicWatermark('TBI-INISIAT-001', '103.144.19.82')}
              </span>
              <span>TBI-RULE-02 · CONTEXT MENU & PRINT-SCREEN API DISABLED</span>
            </div>

            <div
              className="relative transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomScale})` }}
            >
              <img
                src={currentFolio.imageUrl}
                alt={`Faksimili Orbit Codex ${currentFolio.folioLabel}`}
                referrerPolicy="no-referrer"
                className="max-h-[420px] w-auto rounded shadow-2xl"
              />

              {showAnnotationPins &&
                currentFolio.annotations.map((ann, idx) => {
                  const isPinActive = activeAnnotation?.id === ann.id;
                  return (
                    <button
                      key={ann.id}
                      type="button"
                      aria-label={`Anotasi Paleografi ${idx + 1}: ${ann.title}`}
                      onClick={() => setActiveAnnotationId(ann.id)}
                      style={{ left: `${ann.xPercent}%`, top: `${ann.yPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border-2 font-archival text-xs font-bold shadow-md transition-transform cursor-pointer ${
                        isPinActive
                          ? 'scale-110 border-white bg-[#151B8D] text-white'
                          : 'border-white/90 bg-slate-900/90 text-white hover:scale-105'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 bg-slate-950/70 px-4 py-2.5 text-[11px] font-archival text-slate-400">
            <span>IIIF DEEP-ZOOM VIEWER · SLOT 0{currentFolio.slotNumber}/0{ORBIT_CODEX_QUOTA}</span>
            <span>TBI-RULE-02 FORENSIC WATERMARK ACTIVE · {currentFolio.dimensionsMm}</span>
          </div>
        </div>

        {/* Right 5 Cols: Codicological Data & Annotations */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 space-y-3">
            <div className="text-xs font-archival font-semibold text-[#151B8D]">
              DATA KODIKOLOGI · {currentFolio.folioLabel.toUpperCase()}
            </div>
            <dl className="divide-y divide-[#E2E8F0] text-xs">
              <div className="py-2 flex justify-between gap-4">
                <dt className="font-archival text-[#64748B]">Nomor Simpan</dt>
                <dd className="font-archival font-medium text-[#0A0A0A]">{currentFolio.shelfmark}</dd>
              </div>
              <div className="py-2 flex justify-between gap-4">
                <dt className="font-archival text-[#64748B]">Penanggalan</dt>
                <dd className="text-right text-[#0A0A0A]">{currentFolio.century}</dd>
              </div>
              <div className="py-2 flex justify-between gap-4">
                <dt className="font-archival text-[#64748B]">Material & Tinta</dt>
                <dd className="text-right text-[#0A0A0A]">{currentFolio.material}</dd>
              </div>
              <div className="py-2 flex justify-between gap-4">
                <dt className="font-archival text-[#64748B]">Kuota Preservasi</dt>
                <dd className="text-right font-archival text-[#151B8D] font-semibold">
                  Slot 0{currentFolio.slotNumber} dari {ORBIT_CODEX_QUOTA} Folio
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 space-y-4 flex-1">
            <div className="border-b border-[#E2E8F0] pb-3">
              <h2 className="font-heading text-base font-semibold text-[#0A0A0A]">
                Lapisan Anotasi Paleografi & Otorisasi Pendiri
              </h2>
              <p className="text-xs text-[#64748B]">
                Pendiri dapat menyetujui (*approve_annotations*) setiap catatan filologi secara langsung.
              </p>
            </div>

            {currentFolio.annotations.length === 0 ? (
              <div className="rounded border border-[#E2E8F0] bg-[#F8F9FA] p-4 text-xs text-[#64748B]">
                Folio pada slot ini telah diverifikasi bersih tanpa catatan koreksi paleografi tambahan.
              </div>
            ) : (
              <div className="space-y-2.5">
                {currentFolio.annotations.map((ann, index) => {
                  const isSelected = activeAnnotation?.id === ann.id;
                  return (
                    <div
                      key={ann.id}
                      onClick={() => setActiveAnnotationId(ann.id)}
                      className={`rounded-md border p-3.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#151B8D] bg-[#F8F9FA]'
                          : 'border-[#E2E8F0] bg-white hover:bg-[#F8F9FA]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-archival">
                        <span className="font-semibold text-[#151B8D]">
                          PIN #{index + 1} · {ann.category}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFounderApproveAnnotation(ann.id);
                          }}
                          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium cursor-pointer ${
                            ann.approvedByFounder
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-900 border border-amber-200'
                          }`}
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{ann.peerReviewStatus}</span>
                        </button>
                      </div>
                      <h3 className="mt-1.5 font-heading text-sm font-semibold text-[#0A0A0A]">
                        {ann.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#0A0A0A]">{ann.note}</p>
                      <div className="mt-2 text-[11px] font-archival text-[#64748B]">
                        Penelaah: {ann.scholar}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comparative Transcription Section */}
      <section className="rounded-lg border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-archival uppercase tracking-widest text-[#151B8D]">
              TRANSKRIPSI KOMPARATIF TRILINGUAL · {currentFolio.folioLabel.toUpperCase()}
            </div>
            <h2 className="mt-1 font-heading text-xl font-semibold text-[#0A0A0A]">
              Tampilan Teks Komparatif: Ge’ez – Transliterasi – Terjemahan Indonesia
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {currentFolio.verses.map((verse, idx) => (
            <div
              key={verse.verseRef}
              onClick={() => {
                setSelectedVerseIndex(idx);
                setEditIndoText(verse.indonesianTranslation);
              }}
              className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-5 cursor-pointer"
            >
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5 text-xs font-archival">
                <span className="font-semibold text-[#151B8D]">
                  0{idx + 1} · {verse.verseRef}
                </span>
                <span className="text-[#64748B]">SISI: {verse.folioSide}</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-archival uppercase tracking-wider text-[#64748B]">
                    1. AKSARA GE’EZ ASLI (ግዕዝ)
                  </div>
                  <p lang="gez" className="font-codex text-xl leading-relaxed text-[#0A0A0A]">
                    {verse.geezScript}
                  </p>
                </div>

                <div className="space-y-1.5 lg:border-x lg:border-[#E2E8F0] lg:px-6">
                  <div className="text-[11px] font-archival uppercase tracking-wider text-[#64748B]">
                    2. TRANSLITERASI AKADEMIS
                  </div>
                  <p className="font-codex text-lg italic leading-relaxed text-[#0A0A0A]">
                    {verse.transliteration}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-archival uppercase tracking-wider text-[#64748B]">
                    3. TERJEMAHAN FILOLOGIS INDONESIA
                  </div>
                  <p className="text-sm leading-relaxed text-[#0A0A0A] font-medium">
                    {verse.indonesianTranslation}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-[#E2E8F0] pt-3 text-xs text-[#64748B]">
                <strong className="font-archival text-[#0A0A0A]">CATATAN FILOLOGI: </strong>
                {verse.philologicalCommentary}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
