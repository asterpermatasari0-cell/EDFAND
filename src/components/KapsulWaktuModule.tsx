import React, { useState, useMemo } from 'react';
import {
  Lock,
  FileText,
  Search,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Compass,
  Check,
  Copy,
  Eye,
  Upload,
  KeyRound,
  UserPlus,
} from 'lucide-react';
import {
  CLASSIFICATION_CLASSES,
  CAPSULE_DOCUMENTS,
  ClassificationCode,
  CapsuleDocument,
  filterCapsuleDocuments,
  ModuleId,
  SECURITY_AND_USAGE_PROTOCOLS,
  generateForensicWatermark,
} from '../utils/archiveEngine';

interface KapsulWaktuModuleProps {
  initialCode?: ClassificationCode | 'ALL';
  initialDocId?: string;
  onNavigateModule: (moduleId: ModuleId, param?: string) => void;
}

export const KapsulWaktuModule: React.FC<KapsulWaktuModuleProps> = ({
  initialCode = 'ALL',
  initialDocId,
  onNavigateModule,
}) => {
  const [documents, setDocuments] = useState<CapsuleDocument[]>(CAPSULE_DOCUMENTS);
  const [selectedCode, setSelectedCode] = useState<ClassificationCode | 'ALL'>(initialCode);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDocId, setActiveDocId] = useState<string>(
    initialDocId || CAPSULE_DOCUMENTS[0].id
  );
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [showMarginalia, setShowMarginalia] = useState<boolean>(true);
  const [copiedUrn, setCopiedUrn] = useState<boolean>(false);

  // Founder Capabilities: upload_custom_pdf, set_encryption_password, grant_user_access
  const [showFounderPanel, setShowFounderPanel] = useState<boolean>(false);
  const [newPdfTitle, setNewPdfTitle] = useState<string>('');
  const [newPdfCode, setNewPdfCode] = useState<ClassificationCode>('KODE 1');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [memberEmailInput, setMemberEmailInput] = useState<string>('');
  const [founderNotice, setFounderNotice] = useState<string | null>(null);

  const filteredDocuments = useMemo(
    () => filterCapsuleDocuments(documents, selectedCode, searchQuery),
    [documents, selectedCode, searchQuery]
  );

  const activeDocument: CapsuleDocument = useMemo(() => {
    const found = filteredDocuments.find((d) => d.id === activeDocId);
    if (found) return found;
    return filteredDocuments[0] || documents[0];
  }, [filteredDocuments, activeDocId, documents]);

  const currentPage =
    activeDocument.pages[currentPageIndex] || activeDocument.pages[0];

  const handleSelectDoc = (doc: CapsuleDocument) => {
    setActiveDocId(doc.id);
    setCurrentPageIndex(0);
  };

  const handleCopyIdentifier = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activeDocument.dublinCore.identifier).catch(() => {});
    }
    setCopiedUrn(true);
    setTimeout(() => setCopiedUrn(false), 1800);
  };

  const handleUploadCustomPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPdfTitle.trim()) return;
    const badge = `TBI/${newPdfCode}`;
    const newDoc: CapsuleDocument = {
      id: `tbi-doc-${Date.now()}`,
      code: newPdfCode,
      badge,
      folioCount: 42,
      checksumSha256: '4a9f0b2c8e1d736549a0c8e2b4d6f1039582746150928374650192837465a1b2',
      encryptionPasswordProtected: true,
      encryptionKeyHint: 'TBI-CUSTOM-KEY',
      authorizedUsersCount: 5,
      shephirotNodeRef: 6,
      dublinCore: {
        title: newPdfTitle.trim(),
        creator: 'Founder Sovereign TBI',
        subject: ['Materi PDF Esoteris Kustom', newPdfCode],
        description: 'Materi PDF esoteris kustom yang diunggah langsung oleh Pendiri dengan proteksi enkripsi.',
        publisher: 'The Brothers Influence Archival Press',
        contributor: 'Founder Sovereign Console',
        date: '2026-11-03',
        type: 'Custom Encrypted PDF',
        format: 'PDF/A',
        identifier: `URN:TBI:ARCHIVE:${newPdfCode.replace(' ', '')}:2026-CUSTOM`,
        source: 'Founder Sovereign Direct Upload',
        language: 'id-ID',
        relation: 'Terkait Simpul Shephirot #6 (Tiphereth)',
        coverage: 'Edisi Kustom v4.0.0',
        rights: 'Terenkripsi Sandi Pendiri — Akses Eksklusif',
      },
      pages: [
        {
          pageNumber: 1,
          heading: 'Lembar Pertama: Transmisi Materi PDF Esoteris Kustom',
          content:
            'Dokumen ini diunggah melalui fitur upload_custom_pdf pada Modul Kapsul Ruang & Waktu v4.0.0 dan dilindungi lapisan enkripsi Custom Encrypted PDF Reader.',
          marginalNote: 'Otorisasi langsung oleh Pendiri Yayasan.',
        },
      ],
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
    setNewPdfTitle('');
    setFounderNotice(`[upload_custom_pdf] "${newDoc.dublinCore.title}" berhasil diunggah ke ${badge}.`);
    setTimeout(() => setFounderNotice(null), 3000);
  };

  const handleSetEncryptionPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === activeDocument.id
          ? {
              ...d,
              encryptionPasswordProtected: true,
              encryptionKeyHint: passwordInput.trim(),
            }
          : d
      )
    );
    setPasswordInput('');
    setFounderNotice(
      `[set_encryption_password] Kata sandi enkripsi untuk ${activeDocument.badge} telah diperbarui.`
    );
    setTimeout(() => setFounderNotice(null), 3000);
  };

  const handleGrantUserAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberEmailInput.trim()) return;
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === activeDocument.id
          ? {
              ...d,
              authorizedUsersCount: (d.authorizedUsersCount || 10) + 1,
            }
          : d
      )
    );
    setFounderNotice(
      `[grant_user_access] Hak akses eksklusif untuk ${memberEmailInput.trim()} telah diberikan pada ${activeDocument.badge}.`
    );
    setMemberEmailInput('');
    setTimeout(() => setFounderNotice(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      {/* Module Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-archival text-[#64748B]">
            <span>ORDER 04 · MOD-04-KAPSUL-WAKTU</span>
            <span aria-hidden="true">·</span>
            <span>UI MODE: CUSTOM ENCRYPTED PDF READER</span>
            <span aria-hidden="true">·</span>
            <span>MATERI PDF ESOTERIS (TBI / KODE 1 – 6)</span>
          </div>
          <h1 className="mt-2 font-['Times_New_Roman'] text-3xl font-semibold text-[#0A0A0A]">
            Modul Kapsul Ruang & Waktu (Akses Eksklusif)
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
            Pembaca PDF Terenkripsi Kustom untuk Materi PDF Esoteris (<strong>TBI / KODE 1 – 6</strong>) dengan kapabilitas pendiri: <em>upload_custom_pdf</em>, <em>set_encryption_password</em>, dan <em>grant_user_access</em>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFounderPanel((p) => !p)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs font-archival font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showFounderPanel
                ? 'border-[#151B8D] bg-[#151B8D] text-white'
                : 'border-[#E2E8F0] bg-[#F8F9FA] text-[#0A0A0A] hover:bg-white'
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span>Kapabilitas Pendiri (Enkripsi & PDF)</span>
          </button>
        </div>
      </div>

      {/* Founder Capabilities Panel: upload_custom_pdf, set_encryption_password, grant_user_access */}
      {showFounderPanel && (
        <div className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <span className="font-archival text-xs font-semibold text-[#151B8D]">
              FOUNDER CAPABILITIES · MOD-04-KAPSUL-WAKTU
            </span>
            {founderNotice && (
              <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                {founderNotice}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 1. upload_custom_pdf */}
            <form
              onSubmit={handleUploadCustomPdf}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Upload className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>1. UPLOAD_CUSTOM_PDF</span>
              </div>
              <input
                type="text"
                value={newPdfTitle}
                onChange={(e) => setNewPdfTitle(e.target.value)}
                placeholder="Judul Materi PDF Esoteris baru..."
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
              />
              <select
                value={newPdfCode}
                onChange={(e) => setNewPdfCode(e.target.value as ClassificationCode)}
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
              >
                {CLASSIFICATION_CLASSES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.badge} — {c.title}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full rounded bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Unggah Materi PDF Kustom
              </button>
            </form>

            {/* 2. set_encryption_password */}
            <form
              onSubmit={handleSetEncryptionPassword}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <KeyRound className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>2. SET_ENCRYPTION_PASSWORD</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Kunci berkas aktif ({activeDocument.badge}) dengan sandi AES-256.
              </p>
              <input
                type="text"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan kunci sandi baru..."
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
              />
              <button
                type="submit"
                className="w-full rounded bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Tetapkan Sandi Enkripsi
              </button>
            </form>

            {/* 3. grant_user_access */}
            <form
              onSubmit={handleGrantUserAccess}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <UserPlus className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>3. GRANT_USER_ACCESS</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Anggota terotorisasi saat ini: <strong>{activeDocument.authorizedUsersCount || 14} peneliti</strong>.
              </p>
              <input
                type="text"
                value={memberEmailInput}
                onChange={(e) => setMemberEmailInput(e.target.value)}
                placeholder="Email atau ID Anggota TBI..."
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
              />
              <button
                type="submit"
                className="w-full rounded bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Berikan Hak Akses Eksklusif
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6 Classification Classes Grid (KODE 1 - KODE 6) */}
      <section aria-label="Kelas Klasifikasi KODE 1 hingga KODE 6" className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="font-heading text-base font-semibold text-[#0A0A0A]">
            Matriks Klasifikasi Koleksi (TBI/KODE 1 – TBI/KODE 6)
          </h2>

          <div className="relative w-full sm:w-80">
            <label htmlFor="capsule-search" className="sr-only">
              Cari judul, pencipta, atau URN Dublin Core
            </label>
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#64748B]" />
            <input
              id="capsule-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, URN, atau subjek Dublin Core..."
              className="w-full rounded-md border border-[#E2E8F0] bg-[#F8F9FA] py-2 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#64748B] focus:border-[#151B8D] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Filter Kode Klasifikasi"
          className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-1.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCode === 'ALL'}
            onClick={() => setSelectedCode('ALL')}
            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCode === 'ALL'
                ? 'bg-[#151B8D] text-white'
                : 'text-[#64748B] hover:text-[#0A0A0A]'
            }`}
          >
            Semua Kelas ({documents.length})
          </button>
          {CLASSIFICATION_CLASSES.map((cls) => {
            const isSelected = selectedCode === cls.code;
            return (
              <button
                key={cls.code}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedCode(cls.code);
                  const matchingDoc = documents.find((d) => d.code === cls.code);
                  if (matchingDoc) {
                    setActiveDocId(matchingDoc.id);
                    setCurrentPageIndex(0);
                  }
                }}
                className={`rounded-md px-3 py-2 text-xs font-archival font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#151B8D] text-white'
                    : 'text-[#0A0A0A] hover:bg-white'
                }`}
              >
                {cls.badge} · {cls.format}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Split Workspace */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-lg border border-[#E2E8F0] bg-white">
            <div className="border-b border-[#E2E8F0] bg-[#F8F9FA] px-4 py-3 flex items-center justify-between">
              <span className="font-archival text-xs font-semibold text-[#0A0A0A]">
                DAFTAR BERKAS TERINDEKS ({filteredDocuments.length})
              </span>
            </div>

            <div className="divide-y divide-[#E2E8F0]">
              {filteredDocuments.map((doc) => {
                const isActive = doc.id === activeDocument.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSelectDoc(doc)}
                    className={`w-full p-4 text-left transition-colors cursor-pointer ${
                      isActive ? 'bg-[#F8F9FA]' : 'bg-white hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-archival text-[#64748B]">
                      <span className="font-semibold text-[#151B8D]">{doc.badge}</span>
                      <span>
                        {doc.dublinCore.format} · {doc.authorizedUsersCount || 14} Akses Anggota
                      </span>
                    </div>
                    <div className="mt-1 font-heading text-sm font-semibold text-[#0A0A0A]">
                      {doc.dublinCore.title}
                    </div>
                    <div className="mt-1 text-xs text-[#64748B]">
                      {doc.dublinCore.creator} · Kunci: {doc.encryptionKeyHint || 'TBI-AES'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dublin Core Metadata Record */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8F9FA] px-4 py-3">
              <div>
                <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                  REKAMAN METADATA DUBLIN CORE
                </div>
                <div className="text-[11px] text-[#64748B]">
                  Skema DCMI Metadata Terms · {activeDocument.badge}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyIdentifier}
                className="inline-flex items-center gap-1 rounded border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-archival text-[#0A0A0A] hover:bg-[#F8F9FA] whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedUrn ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-700" />
                    <span>URN Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#64748B]" />
                    <span>Salin URN</span>
                  </>
                )}
              </button>
            </div>

            <dl className="divide-y divide-[#E2E8F0] text-xs">
              <div className="grid grid-cols-3 gap-2 px-4 py-2.5">
                <dt className="font-archival text-[#64748B]">dc.identifier</dt>
                <dd className="col-span-2 font-archival font-medium text-[#0A0A0A] break-all">
                  {activeDocument.dublinCore.identifier}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 py-2.5">
                <dt className="font-archival text-[#64748B]">dc.title</dt>
                <dd className="col-span-2 font-medium text-[#0A0A0A]">
                  {activeDocument.dublinCore.title}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 py-2.5">
                <dt className="font-archival text-[#64748B]">dc.format</dt>
                <dd className="col-span-2 font-archival text-[#0A0A0A]">
                  {activeDocument.dublinCore.format} ({activeDocument.folioCount} Halaman)
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 py-2.5">
                <dt className="font-archival text-[#64748B]">Enkripsi</dt>
                <dd className="col-span-2 font-archival text-[#151B8D]">
                  Sandi: {activeDocument.encryptionKeyHint} · {activeDocument.authorizedUsersCount} Anggota
                </dd>
              </div>
            </dl>

            {activeDocument.shephirotNodeRef && (
              <div className="border-t border-[#E2E8F0] bg-[#F8F9FA] p-3 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">
                  Simpul Terkait: Shephirot #{activeDocument.shephirotNodeRef}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onNavigateModule('MOD-05-SHEPHIROT', String(activeDocument.shephirotNodeRef))
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#151B8D] hover:underline cursor-pointer"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Lihat pada Peta Shephirot</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Custom Encrypted PDF Reader */}
        <div className="lg:col-span-7">
          <div className="flex h-full flex-col justify-between rounded-lg border border-[#E2E8F0] bg-[#F8F9FA]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] bg-white px-4 py-3 rounded-t-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#151B8D]" />
                <span className="font-archival text-xs font-semibold text-[#0A0A0A]">
                  CUSTOM ENCRYPTED PDF READER: {activeDocument.badge}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center rounded border border-[#E2E8F0] bg-[#F8F9FA]">
                  <button
                    type="button"
                    aria-label="Perkecil tampilan PDF"
                    onClick={() => setZoomPercent((z) => Math.max(85, z - 15))}
                    className="p-1.5 text-[#0A0A0A] hover:bg-white cursor-pointer"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-2 font-archival text-xs tabular-nums text-[#0A0A0A]">
                    {zoomPercent}%
                  </span>
                  <button
                    type="button"
                    aria-label="Perbesar tampilan PDF"
                    onClick={() => setZoomPercent((z) => Math.min(145, z + 15))}
                    className="p-1.5 text-[#0A0A0A] hover:bg-white cursor-pointer"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowMarginalia((m) => !m)}
                  className={`inline-flex items-center gap-1 rounded border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    showMarginalia
                      ? 'border-[#151B8D] bg-[#151B8D] text-white'
                      : 'border-[#E2E8F0] bg-white text-[#64748B]'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Aparatus Marginal</span>
                </button>
              </div>
            </div>

            <div
              onContextMenu={(e) => e.preventDefault()}
              className="relative p-6 sm:p-10 flex-1 flex flex-col justify-between select-none"
            >
              {/* TBI-RULE-02 Forensic Watermark Header Strip */}
              <div
                aria-label="Watermark Forensik Dokumen TBI-RULE-02"
                className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded border border-[#151B8D]/25 bg-[#151B8D]/5 px-3 py-1.5 font-archival text-[10px] text-[#151B8D]"
              >
                <span>{SECURITY_AND_USAGE_PROTOCOLS.classification_banner}</span>
                <span>{generateForensicWatermark('TBI-INISIAT-001', '103.144.19.82')}</span>
              </div>

              <div
                className="relative mx-auto w-full max-w-2xl rounded border border-[#E2E8F0] bg-white p-8 sm:p-10 shadow-xs transition-all"
                style={{ fontSize: `${zoomPercent}%` }}
              >
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-[11px] font-archival text-[#64748B]">
                  <span>
                    {SECURITY_AND_USAGE_PROTOCOLS.document_marker} · {activeDocument.dublinCore.identifier}
                  </span>
                  <span>
                    LEMBAR {currentPage.pageNumber} / {activeDocument.pages.length}
                  </span>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="text-xs font-archival uppercase tracking-widest text-[#151B8D]">
                    {activeDocument.badge} · KUNCI ENKRIPSI: {activeDocument.encryptionKeyHint}
                  </div>
                  <h3 className="font-display-serif text-xl font-semibold text-[#0A0A0A]">
                    {activeDocument.dublinCore.title}
                  </h3>
                  <h4 className="font-codex text-lg italic text-[#64748B]">
                    {currentPage.heading}
                  </h4>
                </div>

                <div className="mt-6 space-y-4 font-codex text-lg leading-relaxed text-[#0A0A0A]">
                  <p>{currentPage.content}</p>
                  <p className="text-base text-[#64748B]">
                    [Abstrak Deskriptif Dublin Core]: {activeDocument.dublinCore.description}
                  </p>
                </div>

                {showMarginalia && (
                  <div className="mt-8 border-t border-[#E2E8F0] pt-4 text-xs">
                    <div className="font-archival font-semibold text-[#0A0A0A]">
                      APARATUS KRITIS & CATATAN MARGINAL:
                    </div>
                    <p className="mt-1 font-codex text-sm italic text-[#64748B]">
                      {currentPage.marginalNote}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-white px-4 py-3 rounded-b-lg">
              <button
                type="button"
                disabled={currentPageIndex === 0}
                onClick={() => setCurrentPageIndex((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-1 rounded border border-[#E2E8F0] bg-[#F8F9FA] px-3 py-1.5 text-xs font-medium text-[#0A0A0A] disabled:opacity-40 hover:bg-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Lembar Sebelumnya</span>
              </button>

              <div className="font-archival text-xs tabular-nums text-[#64748B]">
                Halaman Pratinjau {currentPageIndex + 1} dari {activeDocument.pages.length}
              </div>

              <button
                type="button"
                disabled={currentPageIndex >= activeDocument.pages.length - 1}
                onClick={() =>
                  setCurrentPageIndex((i) => Math.min(activeDocument.pages.length - 1, i + 1))
                }
                className="inline-flex items-center gap-1 rounded border border-[#E2E8F0] bg-[#F8F9FA] px-3 py-1.5 text-xs font-medium text-[#0A0A0A] disabled:opacity-40 hover:bg-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Lembar Berikutnya</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
