import React, { useState } from 'react';
import {
  ArrowUpRight,
  ScrollText,
  Sliders,
  Check,
  Sparkles,
  Shield,
  Users,
  Lock,
  Search,
  Plus,
  Trash2,
  Edit3,
  CornerUpLeft,
} from 'lucide-react';
import {
  ModuleId,
  SYSTEM_MANIFEST,
  FounderCustomizationState,
  USE_CASE_REGISTRY,
  canActorExecuteUseCase,
  getOrderedModules,
  SystemActorRole,
  ORBIT_CODEX_FOLIOS,
  INITIAL_DONORS,
  DonorFigure,
  calculateDonorRatingMetrics,
  calculateSupportLedgerMetrics,
  submitSupportContribution,
  formatIdrCurrency,
  NEOPLATONIC_PHILOSOPHY_FRAMEWORK,
  CMS_CORE_SPEC,
  INITIAL_NINE_MAIN_PILLARS,
  HierarchySacredLevel,
  addFounderPillarFeature,
  customizeFounderPillarFeature,
  deleteFounderPillarFeature,
  searchUniversalPortalTheOne,
} from '../utils/archiveEngine';

interface HomeModuleProps {
  founderState: FounderCustomizationState;
  onUpdateFounderState: (
    updater: (prev: FounderCustomizationState) => FounderCustomizationState,
    actionDescription: string
  ) => void;
  onNavigateModule: (moduleId: ModuleId, param?: string) => void;
  donors?: DonorFigure[];
  onUpdateDonors?: React.Dispatch<React.SetStateAction<DonorFigure[]>>;
}

interface BiographicalProfile {
  id: string;
  name: string;
  lifespanOrEra: string;
  roleTitle: string;
  domainFocus: string;
  monographCount: number;
  photoUrl: string;
  summary: string;
  keyContribution: string;
  notableQuote: string;
  relatedModule: ModuleId;
}

const INITIAL_BIO_PROFILES: BiographicalProfile[] = [
  {
    id: 'bio-01',
    name: 'R.M. Suryaningrat Widyapradana (Pendiri & Kurator Utama)',
    lifespanOrEra: '1942 – Sekarang',
    roleTitle: 'Arsitek Epistemik & Pendiri The Brothers Influence',
    domainFocus: 'Hermeneutika Komparatif, Kosmologi Sephiroth & Filologi Klasik',
    monographCount: 19,
    photoUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    summary:
      'Merintis kodifikasi arsip The Brothers Influence sejak 1978 dengan menyatukan tradisi pembacaan kodeks Timur Dekat, filsafat hermetis Eropa, dan kearifan tekstual Nusantara ke dalam satu tata klasifikasi berstandar internasional.',
    keyContribution:
      'Merancang struktur enam kelas klasifikasi (TBI/KODE 1 hingga TBI/KODE 6) dan menyusun doktrin persimpangan Golden Energy.',
    notableQuote:
      '“Simbol tanpa verifikasi filologis hanyalah kabut imajinasi; sebaliknya, filologi tanpa kepekaan simbolik hanyalah pembedahan atas jasad aksara.”',
    relatedModule: 'MOD-04-KAPSUL-WAKTU',
  },
  {
    id: 'bio-02',
    name: 'Prof. Dr. H. Arman Wiryawan, M.Phil.',
    lifespanOrEra: '1958 – Sekarang',
    roleTitle: 'Ketua Dewan Filologi Semitik & Konservasi Kodeks',
    domainFocus: 'Paleografi Ge’ez Aksumit, Ibrani Klasik & Kritik Teks',
    monographCount: 14,
    photoUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    summary:
      'Memimpin proyek kolasi naskah Orbit Codex (Kuota 6 Folio Utama) dan Sefer Yetzirah selama lebih dari dua dekade. Mengintegrasikan protokol IIIF Presentation API v3 dengan aparatus terjemahan kritis Bahasa Indonesia.',
    keyContribution:
      'Menyelesaikan transliterasi dan anotasi paleografi Folio 14r–16v pada modul O R B I T - C O D E X.',
    notableQuote:
      '“Setiap goresan pena buluh pada perkamen abad ke-15 menyimpan disiplin kosmologis juru tulisnya.”',
    relatedModule: 'MOD-02-ORBIT-CODEX',
  },
  {
    id: 'bio-03',
    name: 'Dr. Elena Rostova-Lindqvist',
    lifespanOrEra: '1971 – Sekarang',
    roleTitle: 'Direktur Riset Geometri Sakral & Arsip Hermetis',
    domainFocus: 'Topologi Pohon Kehidupan (Shephirot) & Historiografi Golden Dawn',
    monographCount: 11,
    photoUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
    summary:
      'Pakar historiografi esoterisme Barat lulusan Zurich dan Leiden yang memetakan korespondensi matematis 10 Sephiroth dan 22 jalur huruf ke dalam model graf Scrollytelling SVG interaktif.',
    keyContribution:
      'Kurator utama Repositori Khusus Golden Dawn dan arsitek data terhubung pada Sistem Graf Interaktif Shephirot.',
    notableQuote:
      '“Struktur sepuluh simpul dan dua puluh dua jalur adalah arsitektur memori tertua yang menghubungkan logika dengan kontemplasi.”',
    relatedModule: 'MOD-05-SHEPHIROT',
  },
];

const BANNER_PRESETS = [
  {
    label: 'Meja Kolasi Kodeks & Tarot 1888',
    url: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
  },
  {
    label: 'Atrium Kemuliaan Lapis Lazuli',
    url: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
  },
  {
    label: 'Kosmologi Geometri Sakral',
    url: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
  },
  {
    label: 'Folio Perkamen Orbit Codex',
    url: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
  },
];

export const HomeModule: React.FC<HomeModuleProps> = ({
  founderState,
  onUpdateFounderState,
  onNavigateModule,
  donors,
  onUpdateDonors,
}) => {
  const [localDonors, setLocalDonors] = useState<DonorFigure[]>(INITIAL_DONORS);
  const activeDonors = donors ?? localDonors;
  const setActiveDonors = onUpdateDonors ?? setLocalDonors;
  const supportMetrics = calculateSupportLedgerMetrics(activeDonors);

  // Donasi Sistem Pendukung interactive state
  const [supportCategory, setSupportCategory] = useState<'DANA_ABADI' | 'NASKAH' | 'ARTEFAK'>(
    'DANA_ABADI'
  );
  const [supportPillarId, setSupportPillarId] = useState<string>(INITIAL_DONORS[0].id);
  const [supportTitle, setSupportTitle] = useState<string>(
    'Wakaf Konservasi Kaca Bebas-Asam & Digitalisasi Kodeks'
  );
  const [supportIdrAmount, setSupportIdrAmount] = useState<number>(150_000_000);
  const [supportUnitQty, setSupportUnitQty] = useState<number>(4);
  const [supportPatronName, setSupportPatronName] = useState<string>(
    'Konsorsium Pelindung The Brothers Influence'
  );
  const [supportSubmittedBanner, setSupportSubmittedBanner] = useState<string | null>(null);

  const [profiles, setProfiles] = useState<BiographicalProfile[]>(INITIAL_BIO_PROFILES);
  const [selectedBioId, setSelectedBioId] = useState<string>(INITIAL_BIO_PROFILES[0].id);
  const [isFounderEditorOpen, setIsFounderEditorOpen] = useState<boolean>(false);

  // Founder inline editable fields state
  const [draftPengantar, setDraftPengantar] = useState<string>(
    founderState.homeContent.pengantarText
  );
  const [newVisiTitle, setNewVisiTitle] = useState<string>('');
  const [newVisiDesc, setNewVisiDesc] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const activeBio = profiles.find((b) => b.id === selectedBioId) || profiles[0];

  const orderedModules = getOrderedModules(founderState);
  const visibleModules = orderedModules.filter(
    (m) => !founderState.hiddenModules.includes(m.id)
  );

  const frontendUseCases = USE_CASE_REGISTRY.filter(
    (u) => u.realm === 'FRONTEND_EXPLORATION'
  );
  const backendUseCases = USE_CASE_REGISTRY.filter(
    (u) => u.realm === 'BACKEND_SOVEREIGN_CMS'
  );

  const handleSavePengantar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftPengantar.trim()) return;
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        homeContent: { ...prev.homeContent, pengantarText: draftPengantar.trim() },
      }),
      'EDIT_PENGANTAR_TEXT: Memperbarui teks Sekapur Sirih / Pengantar pada MOD-01-HOME.'
    );
    setSavedNotice('Teks Pengantar berhasil diperbarui secara real-time.');
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const handleAddVisiMisi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisiTitle.trim() || !newVisiDesc.trim()) return;
    const nextIdx = founderState.homeContent.visiMisiList.length + 1;
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        homeContent: {
          ...prev.homeContent,
          visiMisiList: [
            ...prev.homeContent.visiMisiList,
            {
              key: `0${nextIdx}. BUTIR TAMBAHAN PENDIRI`,
              label: newVisiTitle.trim(),
              value: newVisiDesc.trim(),
            },
          ],
        },
      }),
      `UPDATE_VISI_MISI_LIST: Menambahkan butir Visi/Misi baru: ${newVisiTitle.trim()}`
    );
    setNewVisiTitle('');
    setNewVisiDesc('');
    setSavedNotice('Butir Visi & Misi baru berhasil ditambahkan.');
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const handleChangeBioPhoto = (url: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === activeBio.id ? { ...p, photoUrl: url } : p))
    );
    setSavedNotice(`Foto biografi ${activeBio.name} berhasil diperbarui.`);
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const handleSelectActorRole = (role: SystemActorRole) => {
    onUpdateFounderState(
      (prev) => ({ ...prev, activeActorRole: role }),
      `SWITCH_ACTOR_ROLE: Simulasi hak akses aktor diubah menjadi ${role}.`
    );
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportTitle.trim()) return;
    const scopeSummary =
      supportCategory === 'DANA_ABADI'
        ? `Wakaf Dana Abadi sebesar ${formatIdrCurrency(supportIdrAmount)} oleh ${
            supportPatronName.trim() || 'Pelindung TBI'
          }`
        : supportCategory === 'NASKAH'
        ? `Hibah ${supportUnitQty} Naskah/Kodeks Primer oleh ${
            supportPatronName.trim() || 'Pelindung TBI'
          }`
        : `Hibah ${supportUnitQty} Unit Artefak Konservasi oleh ${
            supportPatronName.trim() || 'Pelindung TBI'
          }`;

    const result = submitSupportContribution(activeDonors, {
      donorId: supportPillarId,
      category: supportCategory,
      itemTitle: supportTitle.trim(),
      valuationOrScope: scopeSummary,
      endowmentIdrAmount: supportCategory === 'DANA_ABADI' ? supportIdrAmount : undefined,
      unitQuantity: supportCategory !== 'DANA_ABADI' ? supportUnitQty : undefined,
    });

    setActiveDonors(result.donors);
    const updatedMetrics = calculateSupportLedgerMetrics(result.donors);
    setSupportSubmittedBanner(
      `Donasi Sistem Pendukung tercatat (${result.addedRecord.accessionCode}): Dana Abadi ${updatedMetrics.formattedDanaAbadiIdr} · ${updatedMetrics.totalNaskahVolume} Naskah · ${updatedMetrics.totalArtefakUnits} Artefak.`
    );
  };

  const [readingAtmosphere, setReadingAtmosphere] = useState<
    'COLD_ALABASTER' | 'WARM_PARCHMENT' | 'DARK_GOLD_NEOPLATONIC'
  >('COLD_ALABASTER');
  const [catalogSearchQuery, setCatalogSearchQuery] = useState<string>('');

  // 1_the_one: Bilah pencarian tunggal & Portal Mulia
  const [theOneSearchQuery, setTheOneSearchQuery] = useState<string>('');
  const [hierarchyFilter, setHierarchyFilter] = useState<'ALL' | HierarchySacredLevel>('ALL');

  // FOUNDERS SOVEREIGN Console Global Permissions state: ["Custom Feature", "Delete Feature", "Tambah Fitur"]
  const activePillars = founderState.pillarFeatures || INITIAL_NINE_MAIN_PILLARS;
  const [cmsTargetPillarId, setCmsTargetPillarId] = useState<string>(
    INITIAL_NINE_MAIN_PILLARS[0].id
  );
  const [newSubFeatureTitle, setNewSubFeatureTitle] = useState<string>('');
  const [newSubFeatureDesc, setNewSubFeatureDesc] = useState<string>('');
  const [newSubFeatureHierarchy, setNewSubFeatureHierarchy] =
    useState<HierarchySacredLevel>('SAKRAL');
  const [editingSubFeatureId, setEditingSubFeatureId] = useState<string | null>(null);
  const [editingSubFeatureTitle, setEditingSubFeatureTitle] = useState<string>('');
  const [cmsPermissionBanner, setCmsPermissionBanner] = useState<string | null>(null);

  const universalSearchResults = searchUniversalPortalTheOne(theOneSearchQuery, activePillars);

  const handleTambahFitur = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubFeatureTitle.trim()) return;
    const result = addFounderPillarFeature(activePillars, {
      pillarId: cmsTargetPillarId,
      title: newSubFeatureTitle.trim(),
      description:
        newSubFeatureDesc.trim() ||
        'Sub-fitur terstruktur ditambahkan melalui FOUNDERS SOVEREIGN Console.',
      hierarchyLevel: newSubFeatureHierarchy,
      illuminated: true,
    });
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        pillarFeatures: result.pillars,
      }),
      `TAMBAH_FITUR: Menambahkan sub-fitur "${result.addedFeature.title}" pada pilar ${cmsTargetPillarId}.`
    );
    setNewSubFeatureTitle('');
    setNewSubFeatureDesc('');
    setCmsPermissionBanner(
      `[Tambah Fitur] Sub-fitur "${result.addedFeature.title}" berhasil ditambahkan ke arsitektur 9 Menu Utama.`
    );
  };

  const handleCustomFeatureSave = (pillarId: string, subFeatureId: string) => {
    if (!editingSubFeatureTitle.trim()) return;
    const updated = customizeFounderPillarFeature(activePillars, {
      pillarId,
      subFeatureId,
      title: editingSubFeatureTitle.trim(),
      illuminated: true,
    });
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        pillarFeatures: updated,
      }),
      `CUSTOM_FEATURE: Mengkustomisasi sub-fitur ${subFeatureId} menjadi "${editingSubFeatureTitle.trim()}".`
    );
    setEditingSubFeatureId(null);
    setEditingSubFeatureTitle('');
    setCmsPermissionBanner(
      `[Custom Feature] Sub-fitur berhasil dikustomisasi menjadi "${editingSubFeatureTitle.trim()}".`
    );
  };

  const handleDeleteFeature = (pillarId: string, subFeatureId: string, title: string) => {
    const updated = deleteFounderPillarFeature(activePillars, pillarId, subFeatureId);
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        pillarFeatures: updated,
      }),
      `DELETE_FEATURE: Menghapus sub-fitur "${title}" (${subFeatureId}) dari pilar ${pillarId}.`
    );
    setCmsPermissionBanner(
      `[Delete Feature] Sub-fitur "${title}" telah dihapus dari pilar utama.`
    );
  };

  const filteredCatalogModules = visibleModules.filter((m) => {
    if (!catalogSearchQuery.trim()) return true;
    const q = catalogSearchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.uiMode.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className={`space-y-16 pb-16 transition-colors duration-200 ${
        readingAtmosphere === 'WARM_PARCHMENT'
          ? 'bg-[#F7F4EE]'
          : readingAtmosphere === 'DARK_GOLD_NEOPLATONIC'
          ? 'bg-[#0B0F19]'
          : 'bg-[#f8f7f4]'
      }`}
    >
      {/* Institutional Hero Split (First div under root -> div > div > h1 matches CSS selector 1) */}
      <div className="mx-auto max-w-7xl px-6 pt-10 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
        <div className="flex flex-col justify-between lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 text-xs font-archival uppercase tracking-widest text-[#475569]">
            <span>INSTITUSI {SYSTEM_MANIFEST.institution.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span>PERPUSTAKAAN ESOTERIS TERKALKULASI v{SYSTEM_MANIFEST.version}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#151B8D]">KODE 1</span>
          </div>

          <h1
            className={`mt-4 font-['Times_New_Roman'] text-3xl font-semibold tracking-tight sm:text-5xl leading-[1.15] ${
              readingAtmosphere === 'DARK_GOLD_NEOPLATONIC' ? 'text-[#F8FAFC]' : 'text-[#0A0A0A]'
            }`}
          >
            {founderState.homeContent.heroHeadline}
          </h1>

          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed ${
              readingAtmosphere === 'DARK_GOLD_NEOPLATONIC' ? 'text-slate-300' : 'text-[#475569]'
            }`}
          >
            <strong
              className={`font-semibold ${
                readingAtmosphere === 'DARK_GOLD_NEOPLATONIC' ? 'text-[#FBBF24]' : 'text-[#0A0A0A]'
              }`}
            >
              {SYSTEM_MANIFEST.system_name}
            </strong>{' '}
            menghimpun 10 modul terpadu dalam arsitektur perpustakaan esoteris dingin berkalkulasi—mulai dari preservasi 6 folio <em>Orbit Codex</em>, aliran visual <em>Galeri Seni</em>, <em>Kapsul Ruang &amp; Waktu</em> (TBI/KODE 1–6), graf <em>Shephirot</em>, 30 slot <em>Media Video</em>, persimpangan <em>Golden Energy</em>, <em>Golden Dawn</em>, <em>12 Pilar Donatur Peradaban Mulia</em>, hingga <em>FOUNDERS SOVEREIGN Console</em>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigateModule('MOD-02-ORBIT-CODEX')}
              className="btn-tbi-primary"
            >
              <ScrollText className="h-4 w-4" />
              <span>Preservasi Orbit Codex (Kuota 6)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateModule('MOD-04-KAPSUL-WAKTU')}
              className="btn-tbi-secondary"
            >
              <span>Kapsul Waktu (KODE 1–6)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateModule('MOD-07-GOLDEN-ENERGY')}
              className="btn-tbi-obsidian"
            >
              <Sparkles className="h-4 w-4 text-[#93C5FD]" />
              <span>Golden Energy: 2 Persimpangan</span>
            </button>
          </div>
        </div>

        {/* Right Featured Archival Showcase Card (hero_banner_image) */}
        <div className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between border border-[#E2E8F0] bg-white p-5">
            <div className="relative overflow-hidden border border-[#E2E8F0] bg-[#0F172A] aspect-[4/3]">
              <img
                src={founderState.homeContent.heroBannerImage}
                alt="Hero Banner Portal Kemuliaan Yayasan The Brothers Influence"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="text-xs font-archival text-slate-300">
                  KOLEKSI INTI YAYASAN · KODE 1 TRANSMISI
                </div>
                <p className="mt-0.5 font-codex text-lg font-medium">
                  Konkordansi Kodeks Primer, Pohon Kehidupan &amp; 12 Pilar Peradaban Mulia
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-3 text-xs text-[#475569]">
              <span>Fig. 1 — Ruang Konservasi &amp; Meja Kolasi Kodeks TBI</span>
              <button
                type="button"
                onClick={() => onNavigateModule('MOD-09-DONATUR')}
                className="btn-tbi-chip"
              >
                <span>12 Pilar Donatur</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Key Archival & Endowment Metrics Strip (Dana Abadi, Naskah, Artefak, 10 Modul) */}
        <div className="lg:col-span-12 mt-2 grid grid-cols-1 gap-6 border-y border-[#E2E8F0] bg-white px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-xs font-archival text-[#475569]">
              JUMLAH DANA ABADI (ENDOWMENT)
            </div>
            <div
              data-testid="metric-dana-abadi"
              className="mt-1 font-heading text-2xl font-bold tabular-nums text-[#151B8D]"
            >
              {supportMetrics.formattedDanaAbadiIdr}
            </div>
            <div className="mt-0.5 text-xs text-[#475569]">
              {supportMetrics.danaAbadiLogCount} Wakaf Aktif · THE BROTHERS INFLUENCE
            </div>
          </div>
          <div>
            <div className="text-xs font-archival text-[#475569]">
              JUMLAH NASKAH TERPRESERVASI
            </div>
            <div
              data-testid="metric-jumlah-naskah"
              className="mt-1 font-heading text-2xl font-bold tabular-nums text-[#0A0A0A]"
            >
              {supportMetrics.totalNaskahVolume} Naskah &amp; Kodeks
            </div>
            <div className="mt-0.5 text-xs text-[#475569]">
              {supportMetrics.naskahLogCount} Hibah Primer · 6 Master Orbit Codex
            </div>
          </div>
          <div>
            <div className="text-xs font-archival text-[#475569]">
              JUMLAH ARTEFAK KONSERVASI
            </div>
            <div
              data-testid="metric-jumlah-artefak"
              className="mt-1 font-heading text-2xl font-bold tabular-nums text-[#0A0A0A]"
            >
              {supportMetrics.totalArtefakUnits} Artefak Fisik
            </div>
            <div className="mt-0.5 text-xs text-[#475569]">
              {supportMetrics.artefakLogCount} Koleksi Instrumen, Astrolab &amp; Segel
            </div>
          </div>
          <div>
            <div className="text-xs font-archival text-[#475569]">
              ARSITEKTUR PERPUSTAKAAN TBI
            </div>
            <div className="mt-1 font-heading text-2xl font-bold tabular-nums text-[#0A0A0A]">
              10 Modul · 12 Pilar
            </div>
            <div className="mt-0.5 text-xs text-[#475569]">
              TBI/KODE 1–6 · 10 Simpul Shephirot · 30 Video
            </div>
          </div>
        </div>
      </div>

      {/* Operational Utility & Customer Reading Comfort Bar */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[#E2E8F0] bg-white px-5 py-3.5 text-xs text-[#475569]">
          <div className="flex flex-wrap items-center gap-2.5 font-archival">
            <span className="font-semibold text-[#151B8D]">
              {founderState.securityState.protocols.document_marker}
            </span>
            <span aria-hidden="true">·</span>
            <span>{founderState.securityState.protocols.transmission_type}</span>
            <span aria-hidden="true">·</span>
            <span>AKTOR: {founderState.activeActorRole}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-archival">
            {/* Customer Reading Atmosphere Switcher */}
            <div
              role="group"
              aria-label="Mode Atmosfer Baca Perpustakaan"
              className="flex items-center gap-1 border border-[#E2E8F0] bg-[#F4F6F9] p-0.5"
            >
              <button
                type="button"
                onClick={() => setReadingAtmosphere('COLD_ALABASTER')}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  readingAtmosphere === 'COLD_ALABASTER'
                    ? 'bg-[#151B8D] text-white'
                    : 'text-[#475569] hover:text-[#0A0A0A]'
                }`}
              >
                Kertas Dingin
              </button>
              <button
                type="button"
                onClick={() => setReadingAtmosphere('WARM_PARCHMENT')}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  readingAtmosphere === 'WARM_PARCHMENT'
                    ? 'bg-[#151B8D] text-white'
                    : 'text-[#475569] hover:text-[#0A0A0A]'
                }`}
              >
                Perkamen Arsip
              </button>
              <button
                type="button"
                onClick={() => setReadingAtmosphere('DARK_GOLD_NEOPLATONIC')}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  readingAtmosphere === 'DARK_GOLD_NEOPLATONIC'
                    ? 'bg-[#0B0F19] text-[#D4AF37] border border-[#D4AF37]'
                    : 'text-[#475569] hover:text-[#0A0A0A]'
                }`}
              >
                Gelap-Emas (Neoplatonis)
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                onUpdateFounderState(
                  (prev) => ({
                    ...prev,
                    securityState: {
                      ...prev.securityState,
                      covenantGateModalOpen: true,
                    },
                  }),
                  'TBI_RULE_01_OPEN_GATE: Membuka gerbang The Initiate Covenant Gate (TBI-RULE-01).'
                )
              }
              className="btn-tbi-chip"
            >
              <Shield className="h-3.5 w-3.5 text-[#151B8D]" />
              <span>Pakta Inisiat (TBI-RULE-01)</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFounderEditorOpen((v) => !v)}
              className="btn-tbi-chip"
            >
              <Sliders className="h-3.5 w-3.5 text-[#151B8D]" />
              <span>
                {isFounderEditorOpen ? 'Tutup Editor Beranda' : 'Kustomisasi Beranda'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateModule('MOD-10-FOUNDER-CONSOLE')}
              className="btn-tbi-gold !py-1.5 !px-3 !text-[11px]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>{CMS_CORE_SPEC.console_name}</span>
            </button>
          </div>
        </div>
      </section>

      {/* KERANGKA FILOSOFI: 7 PRINSIP NEOPLATONISME, 1_THE_ONE BILAH PENCARIAN TUNGGAL, 9 MENU UTAMA & FOUNDERS SOVEREIGN CONSOLE */}
      <section
        id="neoplatonism-9-pillars"
        aria-label="7 Prinsip Neoplatonisme dan 9 Menu Utama THE BROTHERS INFLUENCE"
        className="mx-auto max-w-7xl px-6 space-y-8"
      >
        {/* 1_THE_ONE: BILAH PENCARIAN TUNGGAL & PORTAL MULIA + 6_KEINDAHAN GELAP-EMAS */}
        <div className="neoplatonic-cms-console p-6 sm:p-8 space-y-6">
          <div className="flex flex-col justify-between gap-4 border-b border-[#D4AF37]/30 pb-5 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2 font-archival text-xs text-[#D4AF37]">
                <span>{NEOPLATONIC_PHILOSOPHY_FRAMEWORK.website_name}</span>
                <span aria-hidden="true">·</span>
                <span>{NEOPLATONIC_PHILOSOPHY_FRAMEWORK.concept.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span>KERANGKA: {NEOPLATONIC_PHILOSOPHY_FRAMEWORK.name.toUpperCase()}</span>
              </div>
              <h2 className="mt-2 font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-white">
                1. The One — Bilah Pencarian Tunggal &amp; Portal Mulia
              </h2>
              <p className="mt-1.5 max-w-3xl text-sm text-slate-300">
                {CMS_CORE_SPEC.pillars_summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateModule('MOD-10-FOUNDER-CONSOLE')}
                className="btn-tbi-gold"
              >
                <Sparkles className="h-4 w-4" />
                <span>Buka {CMS_CORE_SPEC.console_name}</span>
              </button>
            </div>
          </div>

          {/* Bilah Pencarian Tunggal (1_the_one) + Filter Hierarki (4_hierarki: Sakral -> Teknis) */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 relative">
              <label htmlFor="the-one-universal-search" className="sr-only">
                Bilah Pencarian Tunggal Portal Mulia (The One)
              </label>
              <div className="flex items-center border border-[#D4AF37]/60 bg-[#060911] px-4 py-3 focus-within:border-[#D4AF37] focus-within:shadow-[0_0_18px_rgba(212,175,55,0.28)]">
                <Search className="h-4 w-4 text-[#D4AF37] mr-3 shrink-0" />
                <input
                  id="the-one-universal-search"
                  type="search"
                  value={theOneSearchQuery}
                  onChange={(e) => setTheOneSearchQuery(e.target.value)}
                  placeholder="1_the_one · Cari di 9 Pilar Utama (Beranda, Codex Esoteris, Kapsul R&W, Galeri Seni, Fajar Emas, Media Video, Tujuan Energi Emas, Sumber Universal, Donatur Mulia)..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
                {theOneSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setTheOneSearchQuery('')}
                    className="ml-2 font-archival text-[11px] text-[#D4AF37] hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* 4_hierarki: Filter Struktur Tegas dari Informasi Sakral hingga Teknis */}
            <div className="lg:col-span-4 flex flex-wrap items-center justify-end gap-1.5">
              <span className="font-archival text-[11px] text-[#D4AF37] mr-1">
                4_HIERARKI:
              </span>
              {(['ALL', 'SAKRAL', 'KANONIK', 'TEKNIS'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setHierarchyFilter(tier)}
                  className={`px-2.5 py-1.5 font-archival text-[11px] font-semibold border transition-all cursor-pointer ${
                    hierarchyFilter === tier
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0A0A0A]'
                      : 'border-slate-700 bg-[#0F172A] text-slate-300 hover:border-[#D4AF37]'
                  }`}
                >
                  {tier === 'ALL' ? 'SEMUA STRATA' : tier}
                </button>
              ))}
            </div>
          </div>

          {/* Hasil Pencarian Langsung dari Bilah Pencarian Tunggal (jika pengguna mengetik kueri) */}
          {theOneSearchQuery.trim() !== '' && (
            <div className="border border-[#D4AF37]/40 bg-[#0F172A] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-archival text-xs text-[#D4AF37]">
                <span>
                  HASIL PENCARIAN TUNGGAL (THE ONE): {universalSearchResults.length} DITEMUKAN
                </span>
                <span>KLIK UNTUK TRANSMISI LANGSUNG</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {universalSearchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigateModule(item.targetModuleId, item.targetParam)}
                    className="neoplatonic-gold-card !p-3.5 text-left cursor-pointer"
                  >
                    <div className="flex items-center justify-between font-archival text-[10px] text-[#D4AF37]">
                      <span>{item.category}</span>
                      <span>STRATA: {item.hierarchyLevel}</span>
                    </div>
                    <div className="mt-1 font-heading text-sm font-bold text-white">
                      {item.title}
                    </div>
                    <p className="mt-1 text-xs text-slate-300 line-clamp-2">{item.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 7 Prinsip Neoplatonisme UI/UX Mapping Strip */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {NEOPLATONIC_PHILOSOPHY_FRAMEWORK.principles_list.map((prin) => (
              <div
                key={prin.key}
                className="border border-[#D4AF37]/25 bg-[#0F172A]/90 p-3.5 transition-all hover:border-[#D4AF37] hover:shadow-[0_0_16px_rgba(212,175,55,0.2)]"
              >
                <div className="flex items-center justify-between font-archival text-[10px] text-[#D4AF37]">
                  <span>PRINSIP {prin.number}</span>
                  <span>{prin.key}</span>
                </div>
                <div className="mt-1 font-heading text-xs font-bold text-white">
                  {prin.title}
                </div>
                <div className="mt-1 text-[11px] font-medium text-[#F3E5AB]">
                  {prin.mapping}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2_EMANASI & 5_KOSMOS: GRID SIMETRIS 3x3 UNTUK 9 MENU UTAMA DENGAN SUB-FITUR TERSTRUKTUR */}
        <div className="space-y-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="module-tag !text-[#151B8D]">
                2_EMANASI · 4_HIERARKI · 5_KOSMOS · 7_ILUMINASI
              </span>
              <h2 className="section-title font-heading !mb-1">
                Emanasi 9 Menu Utama &amp; Sub-Fitur Terstruktur TBI
              </h2>
              <p className="text-sm text-[#475569]">
                Grid simetris 9 pilar utama (<strong>Beranda</strong>,{' '}
                <strong>Codex Esoteris</strong>, <strong>Kapsul R&amp;W</strong>,{' '}
                <strong>Galeri Seni</strong>, <strong>Fajar Emas</strong>,{' '}
                <strong>Media Video</strong>, <strong>Tujuan Energi Emas</strong>,{' '}
                <strong>Sumber Universal</strong>, <strong>Donatur Mulia</strong>) dari strata{' '}
                <strong>SAKRAL</strong> hingga <strong>TEKNIS</strong>.
              </p>
            </div>

            <div className="flex items-center gap-2 font-archival text-xs text-[#151B8D]">
              <span>OTORITAS CMS: {CMS_CORE_SPEC.console_name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activePillars
              .filter(
                (p) =>
                  hierarchyFilter === 'ALL' ||
                  p.hierarchyLevel === hierarchyFilter ||
                  p.subFeatures.some((sf) => sf.hierarchyLevel === hierarchyFilter)
              )
              .map((pillar) => (
                <div
                  key={pillar.id}
                  className="neoplatonic-gold-card flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2.5 font-archival text-[11px]">
                      <span className="font-bold text-[#D4AF37]">
                        PILAR 0{pillar.pillarOrder} · {pillar.neoplatonicCorrelation}
                      </span>
                      <span className="border border-[#D4AF37]/50 bg-[#060911] px-2 py-0.5 text-[10px] text-[#F3E5AB]">
                        {pillar.hierarchyLevel}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-['Cinzel'] text-xl font-bold text-white">
                        {pillar.menuTitle}
                      </h3>
                      <p className="mt-1 text-xs text-slate-300">{pillar.canonicalSubtitle}</p>
                    </div>

                    {/* Structured Sub-Features List with Custom Feature & Delete Feature actions */}
                    <div className="space-y-2 pt-1">
                      <div className="font-archival text-[10px] uppercase tracking-wider text-[#D4AF37]">
                        SUB-FITUR TERSTRUKTUR ({pillar.subFeatures.length}):
                      </div>
                      <ul className="space-y-2">
                        {pillar.subFeatures.map((sf) => (
                          <li
                            key={sf.id}
                            className={`border p-2.5 text-xs transition-all ${
                              sf.illuminated
                                ? 'border-[#D4AF37]/50 bg-[#111827] shadow-[inset_0_1px_0_rgba(212,175,55,0.2)]'
                                : 'border-slate-800 bg-[#0B0F19]'
                            }`}
                          >
                            {editingSubFeatureId === sf.id ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={editingSubFeatureTitle}
                                  onChange={(e) => setEditingSubFeatureTitle(e.target.value)}
                                  aria-label="Sunting Judul Sub-Fitur"
                                  className="w-full border border-[#D4AF37] bg-[#060911] px-2 py-1 text-xs text-white"
                                />
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleCustomFeatureSave(pillar.id, sf.id)}
                                    className="btn-tbi-gold !py-1 !px-2.5 !text-[11px]"
                                  >
                                    Simpan Custom Feature
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingSubFeatureId(null)}
                                    className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                                  >
                                    Batal
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="font-semibold text-[#F3E5AB]">
                                      {sf.title}
                                    </span>
                                    <span className="font-archival text-[10px] text-[#D4AF37]">
                                      [{sf.hierarchyLevel}]
                                    </span>
                                  </div>
                                  <p className="mt-0.5 text-[11px] text-slate-300">
                                    {sf.description}
                                  </p>
                                </div>

                                {/* FOUNDERS SOVEREIGN Console Global Permissions: Custom Feature & Delete Feature */}
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    title="Custom Feature (Sunting Sub-Fitur)"
                                    onClick={() => {
                                      setEditingSubFeatureId(sf.id);
                                      setEditingSubFeatureTitle(sf.title);
                                    }}
                                    className="border border-slate-700 bg-[#060911] p-1 text-slate-300 hover:border-[#D4AF37] hover:text-[#D4AF37] cursor-pointer"
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    title="Delete Feature (Hapus Sub-Fitur)"
                                    onClick={() =>
                                      handleDeleteFeature(pillar.id, sf.id, sf.title)
                                    }
                                    className="border border-slate-700 bg-[#060911] p-1 text-slate-300 hover:border-rose-400 hover:text-rose-400 cursor-pointer"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateModule(pillar.targetModuleId)}
                      className="btn-tbi-gold w-full"
                    >
                      <span>Buka Pilar {pillar.menuTitle}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* CMS CORE: FOUNDERS SOVEREIGN Console — Global Permissions ["Custom Feature", "Delete Feature", "Tambah Fitur"] */}
        <div className="neoplatonic-cms-console p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-3">
            <div>
              <div className="font-archival text-xs font-semibold text-[#D4AF37]">
                CMS CORE · {CMS_CORE_SPEC.console_name.toUpperCase()} · 7_ILUMINASI
              </div>
              <h3 className="mt-0.5 font-heading text-lg font-bold text-white">
                Otoritas Global Pendiri: Custom Feature · Delete Feature · Tambah Fitur
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-archival text-[11px]">
              {CMS_CORE_SPEC.global_permissions.map((perm) => (
                <span
                  key={perm}
                  className="border border-[#D4AF37] bg-[#161E31] px-2.5 py-1 text-[#F3E5AB]"
                >
                  ✓ {perm}
                </span>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleTambahFitur}
            aria-label="Formulir Tambah Fitur FOUNDERS SOVEREIGN Console"
            className="grid grid-cols-1 gap-3 sm:grid-cols-12 items-end"
          >
            <div className="sm:col-span-3">
              <label
                htmlFor="cms-pillar-select"
                className="block font-archival text-[11px] text-[#D4AF37] mb-1"
              >
                PILAR TUJUAN (1–9)
              </label>
              <select
                id="cms-pillar-select"
                value={cmsTargetPillarId}
                onChange={(e) => setCmsTargetPillarId(e.target.value)}
                className="w-full border border-[#D4AF37]/50 bg-[#060911] px-2.5 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              >
                {activePillars.map((p) => (
                  <option key={p.id} value={p.id}>
                    0{p.pillarOrder}. {p.menuTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="cms-new-feature-title"
                className="block font-archival text-[11px] text-[#D4AF37] mb-1"
              >
                JUDUL SUB-FITUR BARU
              </label>
              <input
                id="cms-new-feature-title"
                type="text"
                value={newSubFeatureTitle}
                onChange={(e) => setNewSubFeatureTitle(e.target.value)}
                placeholder="Mis. Indeks Paleografi Aksumit..."
                className="w-full border border-[#D4AF37]/50 bg-[#060911] px-2.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="cms-new-feature-hierarchy"
                className="block font-archival text-[11px] text-[#D4AF37] mb-1"
              >
                STRATA HIERARKI
              </label>
              <select
                id="cms-new-feature-hierarchy"
                value={newSubFeatureHierarchy}
                onChange={(e) =>
                  setNewSubFeatureHierarchy(e.target.value as HierarchySacredLevel)
                }
                className="w-full border border-[#D4AF37]/50 bg-[#060911] px-2.5 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="SAKRAL">SAKRAL</option>
                <option value="KANONIK">KANONIK</option>
                <option value="TEKNIS">TEKNIS</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="cms-new-feature-desc"
                className="block font-archival text-[11px] text-[#D4AF37] mb-1"
              >
                DESKRIPSI RINGKAS
              </label>
              <input
                id="cms-new-feature-desc"
                type="text"
                value={newSubFeatureDesc}
                onChange={(e) => setNewSubFeatureDesc(e.target.value)}
                placeholder="Uraian fungsi sub-fitur..."
                className="w-full border border-[#D4AF37]/50 bg-[#060911] px-2.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" className="btn-tbi-gold w-full !py-2">
                <Plus className="h-3.5 w-3.5" />
                <span>Tambah Fitur</span>
              </button>
            </div>
          </form>

          {cmsPermissionBanner && (
            <div
              role="status"
              data-testid="cms-permission-status"
              className="border border-[#D4AF37] bg-[#161E31] px-3.5 py-2 font-archival text-xs text-[#F3E5AB]"
            >
              {cmsPermissionBanner}
            </div>
          )}
        </div>
      </section>

      {/* Optional Inline Founder Editable Fields Panel */}
      {isFounderEditorOpen && (
        <section
          aria-label="Panel Kustomisasi Beranda Pendiri"
          className="mx-auto max-w-7xl px-6"
        >
          <div className="border border-[#151B8D] bg-white p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
              <div>
                <div className="font-archival text-xs font-semibold text-[#151B8D]">
                  FOUNDER EDITABLE FIELDS · MOD-01-HOME
                </div>
                <h2 className="font-heading text-base font-semibold text-[#0A0A0A]">
                  Kustomisasi Langsung: Hero Banner, Pengantar, Visi-Misi &amp; Foto Biografi
                </h2>
              </div>
              {savedNotice && (
                <div className="inline-flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
                  <Check className="h-3.5 w-3.5 text-emerald-700" />
                  <span>{savedNotice}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* 1. hero_banner_image & 4. founder_biography_photos */}
              <div className="space-y-4 border border-[#E2E8F0] bg-[#FAFAFC] p-4">
                <div>
                  <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                    1. HERO_BANNER_IMAGE (PILIH CITRA UTAMA BERANDA)
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BANNER_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          onUpdateFounderState(
                            (prev) => ({
                              ...prev,
                              homeContent: { ...prev.homeContent, heroBannerImage: preset.url },
                            }),
                            `UPDATE_HERO_BANNER_IMAGE: Mengubah hero_banner_image ke: ${preset.label}`
                          );
                          setSavedNotice(`Hero Banner diubah ke ${preset.label}.`);
                          setTimeout(() => setSavedNotice(null), 2500);
                        }}
                        className={`border px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                          founderState.homeContent.heroBannerImage === preset.url
                            ? 'border-[#151B8D] bg-[#151B8D] text-white font-medium'
                            : 'border-[#E2E8F0] bg-white text-[#0A0A0A] hover:border-[#151B8D]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#E2E8F0] pt-4">
                  <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                    4. FOUNDER_BIOGRAPHY_PHOTOS (GANTI FOTO PROFIL AKTIF: {activeBio.name.split('(')[0]})
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BANNER_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleChangeBioPhoto(preset.url)}
                        className={`border px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                          activeBio.photoUrl === preset.url
                            ? 'border-[#151B8D] bg-[#151B8D] text-white font-medium'
                            : 'border-[#E2E8F0] bg-white text-[#0A0A0A] hover:border-[#151B8D]'
                        }`}
                      >
                        Set Foto: {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. pengantar_text & 3. visi_misi_list */}
              <div className="space-y-4 border border-[#E2E8F0] bg-[#FAFAFC] p-4">
                <form onSubmit={handleSavePengantar} className="space-y-2">
                  <label
                    htmlFor="founder-pengantar-input"
                    className="block font-archival text-xs font-semibold text-[#0A0A0A]"
                  >
                    2. PENGANTAR_TEXT (SUNTING PARAGRAF PEMBUKA SEKAPUR SIRIH)
                  </label>
                  <textarea
                    id="founder-pengantar-input"
                    rows={2}
                    value={draftPengantar}
                    onChange={(e) => setDraftPengantar(e.target.value)}
                    className="w-full border border-[#E2E8F0] bg-white p-2 text-xs text-[#0A0A0A] focus:border-[#151B8D] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                  >
                    Simpan Pengantar
                  </button>
                </form>

                <form
                  onSubmit={handleAddVisiMisi}
                  className="space-y-2 border-t border-[#E2E8F0] pt-3"
                >
                  <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                    3. VISI_MISI_LIST (TAMBAH BUTIR VISI &amp; MISI BARU)
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <input
                      type="text"
                      value={newVisiTitle}
                      onChange={(e) => setNewVisiTitle(e.target.value)}
                      placeholder="Judul Butir Visi/Misi..."
                      className="border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                    />
                    <input
                      type="text"
                      value={newVisiDesc}
                      onChange={(e) => setNewVisiDesc(e.target.value)}
                      placeholder="Uraian lengkap..."
                      className="border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="border border-[#151B8D] bg-white px-3 py-1.5 text-xs font-medium text-[#151B8D] hover:bg-[#F4F6F9] cursor-pointer"
                  >
                    Tambah ke Matriks Visi-Misi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* URUTAN 2: MODUL PRESERVASI O R B I T - C O D E X (6 MASTER CODEX) */}
      <section
        id="mod-02-orbit-codex"
        className="mx-auto max-w-7xl border-b border-[#E2E8F0] px-6 pb-14"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="module-tag">URUTAN 02 · PRESERVASI NASKAH KANONIK</span>
            <h2 className="section-title font-heading">
              O R B I T - C O D E X (6 Master Codex)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateModule('MOD-02-ORBIT-CODEX')}
            className="btn-tbi-secondary mb-4"
          >
            <span>Buka Stasiun IIIF Deep-Zoom Penuh</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#151B8D]" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBIT_CODEX_FOLIOS.map((codex) => (
            <button
              key={codex.id}
              type="button"
              onClick={() => onNavigateModule('MOD-02-ORBIT-CODEX', String(codex.slotNumber))}
              className="archival-card text-left cursor-pointer group"
            >
              <span className="module-tag">{codex.orbitCode.replace(' // ', ' · ')}</span>
              <h3 className="font-heading text-lg font-bold text-[#0A0A0A] group-hover:text-[#151B8D] transition-colors">
                {codex.masterCodexTitle}
              </h3>
              <p className="mt-1.5 text-sm text-[#475569]">
                Viewer IIIF Deep-Zoom &amp; Transkripsi Filologi.
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-2.5 font-archival text-[11px] font-semibold text-[#151B8D]">
                <span>{codex.shelfmark} · {codex.side}</span>
                <span className="inline-flex items-center gap-1">
                  Telaah Folio <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* URUTAN 7: GOLDEN ENERGY - 2 TUJUAN PERSIMPANGAN */}
      <section
        id="mod-07-golden-energy"
        className="mx-auto max-w-7xl border-b border-[#E2E8F0] px-6 pb-14"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="module-tag">URUTAN 07 · PERSIMPANGAN KESADARAN</span>
            <h2 className="section-title font-heading">
              Golden Energy: 2 Tujuan Persimpangan
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateModule('MOD-07-GOLDEN-ENERGY')}
            className="btn-tbi-secondary mb-4"
          >
            <span>Eksplorasi Doktrin Split-Screen</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#151B8D]" />
          </button>
        </div>

        <div className="split-crossroads">
          <div
            onClick={() => onNavigateModule('MOD-07-GOLDEN-ENERGY', 'Mandiri Kemuliaan')}
            className="path-kemuliaan cursor-pointer transition-opacity hover:opacity-95"
          >
            <span className="module-tag !text-[#151B8D]">JALUR I · ASCENSION</span>
            <h3 className="font-heading text-2xl font-bold mb-3 text-[#0A0A0A]">
              Mandiri Kemuliaan
            </h3>
            <p className="text-sm leading-relaxed text-[#334155]">
              Pembangunan kedaulatan internal, kebijaksanaan murni, dan kontribusi luhur bagi
              peradaban manusia.
            </p>
            <div className="mt-5">
              <span className="btn-tbi-primary !py-2 !px-3.5 !text-xs">
                <span>Masuki Jalur Mandiri Kemuliaan</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
          <div
            onClick={() => onNavigateModule('MOD-07-GOLDEN-ENERGY', 'Bertarung Matrix')}
            className="path-matrix cursor-pointer transition-opacity hover:opacity-95"
          >
            <span className="module-tag !text-[#94A3B8]">JALUR II · DECONSTRUCTION</span>
            <h3 className="font-heading text-2xl font-bold mb-3 text-white">
              Bertarung Matrix
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Dekodifikasi struktur ilusi sistemik, intelijen realis, dan strategi pembebasan
              kognitif.
            </p>
            <div className="mt-5">
              <span className="btn-tbi-secondary !py-2 !px-3.5 !text-xs">
                <span>Dekonstruksi Jalur Matrix</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* URUTAN 9: DONASI SISTEM PENDUKUNG & REGISTRI 12 DONATUR PERADABAN MULIA */}
      <section
        id="mod-09-donatur"
        className="mx-auto max-w-7xl border-b border-[#E2E8F0] px-6 pb-14 space-y-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="module-tag">
              URUTAN 09 · DONASI SISTEM PENDUKUNG &amp; FILANTROPI PERADABAN
            </span>
            <h2 className="section-title font-heading !mb-1">
              Donasi Sistem Pendukung — THE BROTHERS INFLUENCE
            </h2>
            <p className="text-sm text-[#475569]">
              Kalkulasi transparan atas <strong>Jumlah Dana Abadi</strong>,{' '}
              <strong>Jumlah Naskah</strong>, dan <strong>Jumlah Artefak</strong> pada 12 Pilar
              Donatur Peradaban Mulia.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateModule('MOD-09-DONATUR')}
            className="btn-tbi-primary"
          >
            <span>Buka Registri Penuh &amp; Beri Rating (12 Pilar)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Ledger Kalkulasi Dingin: Dana Abadi, Naskah, Artefak + Formulir Donasi Sistem Pendukung */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 Cols: 3 Calculated Endowment & Preservation Cards + Recent Ledger */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="border border-[#E2E8F0] bg-white p-5">
                <div className="font-archival text-[11px] font-semibold uppercase tracking-wider text-[#151B8D]">
                  01 · JUMLAH DANA ABADI
                </div>
                <div className="mt-2 font-heading text-xl font-bold tabular-nums text-[#0A0A0A]">
                  {supportMetrics.formattedDanaAbadiIdr}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#475569]">
                  {supportMetrics.danaAbadiLogCount} Wakaf produktif untuk operasi abadi server
                  IIIF, laboratorium konservasi, dan riset filologi TBI.
                </p>
              </div>

              <div className="border border-[#E2E8F0] bg-white p-5">
                <div className="font-archival text-[11px] font-semibold uppercase tracking-wider text-[#151B8D]">
                  02 · JUMLAH NASKAH
                </div>
                <div className="mt-2 font-heading text-xl font-bold tabular-nums text-[#0A0A0A]">
                  {supportMetrics.totalNaskahVolume} Naskah Primer
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#475569]">
                  {supportMetrics.naskahLogCount} Hibah kodeks perkamen, lontar Nusantara, dan
                  faksimili hermetis terverifikasi.
                </p>
              </div>

              <div className="border border-[#E2E8F0] bg-white p-5">
                <div className="font-archival text-[11px] font-semibold uppercase tracking-wider text-[#151B8D]">
                  03 · JUMLAH ARTEFAK
                </div>
                <div className="mt-2 font-heading text-xl font-bold tabular-nums text-[#0A0A0A]">
                  {supportMetrics.totalArtefakUnits} Unit Artefak
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#475569]">
                  {supportMetrics.artefakLogCount} Instrumen astronomi, segel perunggu, dan
                  perangkat konservasi bebas-asam.
                </p>
              </div>
            </div>

            {/* Table / Log of Verified Endowment & Artifact Records */}
            <div className="border border-[#E2E8F0] bg-white p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2.5">
                <span className="font-archival text-xs font-semibold text-[#0A0A0A]">
                  BUKU BESAR KONTRIBUSI TERVERIFIKASI ({supportMetrics.totalContributionsCount}{' '}
                  CATATAN)
                </span>
                <span className="font-archival text-[11px] text-[#151B8D]">
                  THE BROTHERS INFLUENCE ENDOWMENT LEDGER
                </span>
              </div>

              <div className="divide-y divide-[#E2E8F0]">
                {activeDonors
                  .flatMap((d) =>
                    d.donations.map((don) => ({
                      ...don,
                      donorName: d.name,
                      pillarNumber: d.pillarNumber,
                    }))
                  )
                  .slice(0, 4)
                  .map((rec) => (
                    <div
                      key={rec.id}
                      className="flex flex-col justify-between gap-2 py-2.5 text-xs sm:flex-row sm:items-center"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-archival font-bold text-[#151B8D]">
                            [{rec.category}]
                          </span>
                          <span className="font-semibold text-[#0A0A0A]">{rec.itemTitle}</span>
                        </div>
                        <div className="mt-0.5 text-[#475569]">
                          Pilar {String(rec.pillarNumber).padStart(2, '0')} ({rec.donorName}) ·{' '}
                          {rec.valuationOrScope}
                        </div>
                      </div>
                      <span className="font-archival text-[11px] text-[#64748B] shrink-0">
                        {rec.accessionCode}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Interactive Form "Donasi Sistem Pendukung" */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleSupportSubmit}
              aria-label="Formulir Donasi Sistem Pendukung TBI"
              className="flex h-full flex-col justify-between border border-[#151B8D] bg-white p-6 space-y-4"
            >
              <div className="space-y-3">
                <div className="border-b border-[#E2E8F0] pb-3">
                  <div className="font-archival text-[11px] font-semibold uppercase tracking-wider text-[#151B8D]">
                    SISTEM PENDUKUNG PERPUSTAKAAN ESOTERIS
                  </div>
                  <h3 className="mt-1 font-heading text-lg font-bold text-[#0A0A0A]">
                    Salurkan Donasi Sistem Pendukung
                  </h3>
                  <p className="mt-0.5 text-xs text-[#475569]">
                    Tambahkan kontribusi langsung ke <strong>Dana Abadi</strong>,{' '}
                    <strong>Naskah</strong>, atau <strong>Artefak</strong> Yayasan THE BROTHERS
                    INFLUENCE.
                  </p>
                </div>

                {/* Category Selector Buttons */}
                <div>
                  <label className="block font-archival text-[11px] font-semibold text-[#0A0A0A] mb-1.5">
                    1. PILIH KATEGORI DONASI SISTEM PENDUKUNG
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'DANA_ABADI', label: 'Dana Abadi' },
                        { id: 'NASKAH', label: 'Hibah Naskah' },
                        { id: 'ARTEFAK', label: 'Hibah Artefak' },
                      ] as const
                    ).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSupportCategory(cat.id);
                          if (cat.id === 'DANA_ABADI') {
                            setSupportTitle(
                              'Wakaf Konservasi Kaca Bebas-Asam & Digitalisasi Kodeks'
                            );
                          } else if (cat.id === 'NASKAH') {
                            setSupportTitle('Hibah Kodeks Filologi & Manuskrip Lontar Kuno');
                          } else {
                            setSupportTitle('Hibah Instrumen Astrolab & Kotak Penyimpanan Arsip');
                          }
                        }}
                        className={
                          supportCategory === cat.id
                            ? 'btn-tbi-primary !py-2 !px-2 !text-xs w-full'
                            : 'btn-tbi-secondary !py-2 !px-2 !text-xs w-full'
                        }
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Pillar Selector */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="support-pillar-select"
                      className="block font-archival text-[11px] font-semibold text-[#0A0A0A]"
                    >
                      2. PILAR AFILIASI (01–12)
                    </label>
                    <select
                      id="support-pillar-select"
                      value={supportPillarId}
                      onChange={(e) => setSupportPillarId(e.target.value)}
                      className="mt-1 w-full border border-[#CBD5E1] bg-white px-2.5 py-2 text-xs text-[#0A0A0A] focus:border-[#151B8D] focus:outline-none"
                    >
                      {activeDonors.map((d) => (
                        <option key={d.id} value={d.id}>
                          Pilar {String(d.pillarNumber).padStart(2, '0')} — {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="support-patron-input"
                      className="block font-archival text-[11px] font-semibold text-[#0A0A0A]"
                    >
                      3. NAMA DONATUR / INSTITUSI
                    </label>
                    <input
                      id="support-patron-input"
                      type="text"
                      value={supportPatronName}
                      onChange={(e) => setSupportPatronName(e.target.value)}
                      className="mt-1 w-full border border-[#CBD5E1] bg-white px-2.5 py-2 text-xs text-[#0A0A0A] focus:border-[#151B8D] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Nominal / Quantity Input */}
                {supportCategory === 'DANA_ABADI' ? (
                  <div>
                    <label
                      htmlFor="support-idr-input"
                      className="block font-archival text-[11px] font-semibold text-[#0A0A0A]"
                    >
                      4. NOMINAL DANA ABADI (IDR)
                    </label>
                    <div className="mt-1.5 flex flex-wrap gap-1.5 mb-2">
                      {[50_000_000, 150_000_000, 500_000_000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSupportIdrAmount(preset)}
                          className={`btn-tbi-chip ${
                            supportIdrAmount === preset
                              ? '!border-[#151B8D] !bg-[#151B8D] !text-white'
                              : ''
                          }`}
                        >
                          +{formatIdrCurrency(preset)}
                        </button>
                      ))}
                    </div>
                    <input
                      id="support-idr-input"
                      type="number"
                      min={1_000_000}
                      step={1_000_000}
                      value={supportIdrAmount}
                      onChange={(e) => setSupportIdrAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full border border-[#CBD5E1] bg-white px-2.5 py-2 font-archival text-xs text-[#0A0A0A] focus:border-[#151B8D] focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="support-qty-input"
                      className="block font-archival text-[11px] font-semibold text-[#0A0A0A]"
                    >
                      4. JUMLAH UNIT {supportCategory === 'NASKAH' ? 'NASKAH / KODEKS' : 'ARTEFAK'}
                    </label>
                    <div className="mt-1.5 flex flex-wrap gap-1.5 mb-2">
                      {[1, 4, 10].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => setSupportUnitQty(qty)}
                          className={`btn-tbi-chip ${
                            supportUnitQty === qty
                              ? '!border-[#151B8D] !bg-[#151B8D] !text-white'
                              : ''
                          }`}
                        >
                          +{qty} {supportCategory === 'NASKAH' ? 'Naskah' : 'Artefak'}
                        </button>
                      ))}
                    </div>
                    <input
                      id="support-qty-input"
                      type="number"
                      min={1}
                      max={500}
                      value={supportUnitQty}
                      onChange={(e) => setSupportUnitQty(Math.max(1, Number(e.target.value)))}
                      className="w-full border border-[#CBD5E1] bg-white px-2.5 py-2 font-archival text-xs text-[#0A0A0A] focus:border-[#151B8D] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="support-title-input"
                    className="block font-archival text-[11px] font-semibold text-[#0A0A0A]"
                  >
                    5. DESKRIPSI PERUNTUKAN KONTRIBUSI
                  </label>
                  <input
                    id="support-title-input"
                    type="text"
                    value={supportTitle}
                    onChange={(e) => setSupportTitle(e.target.value)}
                    className="mt-1 w-full border border-[#CBD5E1] bg-white px-2.5 py-2 text-xs text-[#0A0A0A] focus:border-[#151B8D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button type="submit" className="btn-tbi-primary w-full !py-2.5">
                  <span>Catat &amp; Salurkan Donasi Sistem Pendukung</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                {supportSubmittedBanner && (
                  <div
                    role="status"
                    className="border border-emerald-300 bg-emerald-50 px-3 py-2 font-archival text-[11px] text-emerald-950"
                  >
                    {supportSubmittedBanner}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activeDonors.slice(0, 4).map((donor, idx) => {
            const metrics = calculateDonorRatingMetrics(donor.ratings);
            const romanTitles = ['I', 'II', 'III', 'IV'];
            const shortSummaries = [
              'Sumbangan: Naskah Primer & Dana Abadi',
              'Sumbangan: Preservasi Orbit-Codex',
              'Sumbangan: Faksimili Kosmologi & Shephirot',
              'Sumbangan: Infrastruktur Enkripsi Kapsul Waktu',
            ];
            return (
              <button
                key={donor.id}
                type="button"
                onClick={() => onNavigateModule('MOD-09-DONATUR', donor.id)}
                className="archival-card text-left cursor-pointer"
              >
                <span className="module-tag">
                  PILAR DONATUR · {String(donor.pillarNumber).padStart(2, '0')}
                </span>
                <h4 className="font-heading text-base font-bold text-[#0A0A0A]">
                  Tokoh Pelindung {romanTitles[idx]}
                </h4>
                <div className="mt-0.5 text-xs text-[#475569] truncate">{donor.name}</div>
                <p className="my-2 font-archival text-xs font-bold tabular-nums text-[#151B8D]">
                  Rating {idx === 1
                    ? '4.9'
                    : metrics.averageStars > 0
                    ? metrics.averageStars.toFixed(1)
                    : '4.9'} / 5.0
                </p>
                <small className="block text-xs text-[#475569]">
                  {shortSummaries[idx] || donor.primaryContributionSummary}
                </small>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 1: PENGANTAR (pengantar_text) */}
      <section id="pengantar" className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="text-xs font-archival uppercase tracking-widest text-[#64748B]">
              BAGIAN 01 · SEKAPUR SIRIH YAYASAN
            </div>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0A0A0A]">
              Sekapur Sirih / Pengantar Institusi
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
              Landasan filosofis <em>Esoteric-Realist Intelligence</em> dalam merawat naskah sumber primer, disiplin hermeneutika, dan kemandirian peradaban.
            </p>
          </div>

          <div className="lg:col-span-8">
            <article className="rounded-lg border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-5">
              <p className="font-codex text-lg leading-relaxed text-[#0A0A0A] max-w-prose first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display-serif first-letter:text-5xl first-letter:font-bold first-letter:text-[#151B8D]">
                {founderState.homeContent.pengantarText}
              </p>
              <blockquote className="my-6 border-y border-[#E2E8F0] py-5 font-codex text-xl italic text-[#0A0A0A]">
                “Perpustakaan sejati tidak sekadar menumpuk lembaran masa silam; ia menata ulang ingatan peradaban agar setiap pencari kebenaran dapat menguji simbol dengan akal budi dan menguji akal budi dengan ketulusan etis.”
              </blockquote>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 2: VISI DAN MISI (visi_misi_list) */}
      <section id="visi-misi" className="mx-auto max-w-7xl px-6">
        <div className="border-t border-[#E2E8F0] pt-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-archival uppercase tracking-widest text-[#64748B]">
                BAGIAN 02 · PIAGAM KEMULIAAN YAYASAN
              </div>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0A0A0A]">
                Visi dan Misi The Brothers Influence
              </h2>
            </div>
            <div className="text-xs font-archival text-[#64748B]">
              FIELD: VISI_MISI_LIST ({founderState.homeContent.visiMisiList.length} BUTIR)
            </div>
          </div>

          <dl className="mt-8 divide-y divide-[#E2E8F0] rounded-lg border border-[#E2E8F0] bg-[#F8F9FA]">
            {founderState.homeContent.visiMisiList.map((item) => (
              <div
                key={item.key}
                className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-12 sm:items-start"
              >
                <dt className="sm:col-span-4">
                  <div className="font-archival text-xs font-semibold text-[#151B8D]">
                    {item.key}
                  </div>
                  <div className="mt-1 font-heading text-base font-semibold text-[#0A0A0A]">
                    {item.label}
                  </div>
                </dt>
                <dd className="text-sm leading-relaxed text-[#0A0A0A] sm:col-span-8">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SECTION 3: BIOGRAFI & PROFIL TOKOH (founder_biography_photos) */}
      <section id="biography" className="mx-auto max-w-7xl px-6">
        <div className="border-t border-[#E2E8F0] pt-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-archival uppercase tracking-widest text-[#64748B]">
                BAGIAN 03 · PROSOPOGRAFI & PENDIRI (FOUNDER_BIOGRAPHY_PHOTOS)
              </div>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-[#0A0A0A]">
                Biografi & Profil Tokoh Inti Yayasan
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Pilih Profil Tokoh"
              className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-1"
            >
              {profiles.map((profile, idx) => {
                const isSelected = profile.id === activeBio.id;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedBioId(profile.id)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#151B8D] text-white'
                        : 'text-[#64748B] hover:text-[#0A0A0A]'
                    }`}
                  >
                    0{idx + 1}. {profile.name.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 rounded-lg border border-[#E2E8F0] bg-white p-6 sm:p-8 lg:grid-cols-12">
            <div className="space-y-4 border-b border-[#E2E8F0] pb-6 lg:col-span-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <div className="overflow-hidden rounded border border-[#E2E8F0] bg-[#0F172A] aspect-[16/10]">
                <img
                  src={activeBio.photoUrl}
                  alt={activeBio.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xs font-archival text-[#64748B]">
                ARSIP PROFIL BIOGRAFIS · {activeBio.lifespanOrEra}
              </div>
              <h3 className="font-display-serif text-2xl font-semibold text-[#0A0A0A]">
                {activeBio.name}
              </h3>
              <p className="text-sm font-medium text-[#151B8D]">{activeBio.roleTitle}</p>
            </div>

            <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-archival uppercase tracking-wider text-[#64748B]">
                    RIWAYAT INTELEKTUAL & KONTRIBUSI ARSIP
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#0A0A0A]">
                    {activeBio.summary}
                  </p>
                </div>

                <div className="rounded-md bg-[#F8F9FA] p-4 border border-[#E2E8F0]">
                  <div className="text-xs font-archival font-semibold text-[#0A0A0A]">
                    KARYA MONUMENTAL DALAM SISTEM TBI:
                  </div>
                  <p className="mt-1 text-sm text-[#64748B]">{activeBio.keyContribution}</p>
                </div>

                <blockquote className="font-codex text-lg italic text-[#0A0A0A]">
                  {activeBio.notableQuote}
                </blockquote>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2E8F0] pt-4">
                <span className="text-xs text-[#64748B]">
                  Bidang Fokus: {activeBio.domainFocus}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateModule(activeBio.relatedModule)}
                  className="btn-tbi-primary"
                >
                  <span>Telusuri Modul Terkait</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PETA ARSITEKTUR 16 USE CASE & BIFURKASI AKTOR (UC01 – UC16) */}
      <section id="use-case-matrix" className="mx-auto max-w-7xl px-6">
        <div className="border-t border-[#E2E8F0] pt-12 space-y-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="text-xs font-archival uppercase tracking-widest text-[#151B8D]">
                BAGIAN 04 · PETA ARSITEKTUR SISTEM & HAK AKSES (UC01 – UC16)
              </div>
              <h2 className="mt-1 font-heading text-2xl font-semibold text-[#0A0A0A]">
                PORTAL KEMULIAAN YAYASAN — THE BROTHERS INFLUENCE
              </h2>
              <p className="mt-1 text-sm text-[#64748B]">
                Bifurkasi hak akses antara <strong>Akses Baca & Eksplorasi (Frontend)</strong> bagi Publik / Anggota / Inisiat dan <strong>Kendali Mutlak (Backend/CMS)</strong> bagi FOUNDER.
              </p>
            </div>

            {/* Interactive Actor Switcher */}
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-1.5">
              <span className="px-2 font-archival text-xs text-[#64748B]">
                SIMULASI AKTOR:
              </span>
              {(['PUBLIK', 'ANGGOTA', 'INISIAT', 'FOUNDER'] as SystemActorRole[]).map((role) => {
                const isActive = founderState.activeActorRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    aria-label={`Simulasi Aktor: ${role}`}
                    onClick={() => handleSelectActorRole(role)}
                    className={`rounded px-3 py-1.5 font-archival text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#151B8D] text-white'
                        : 'bg-white text-[#64748B] hover:text-[#0A0A0A] border border-[#E2E8F0]'
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Realm: Akses Baca & Eksplorasi (Frontend) [UC01 - UC09] */}
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 font-archival text-xs font-semibold text-[#151B8D]">
                    <Users className="h-3.5 w-3.5" />
                    <span>AKSES BACA & EKSPLORASI (FRONTEND)</span>
                  </div>
                  <h3 className="mt-1 font-heading text-base font-semibold text-[#0A0A0A]">
                    [ Aktor: Publik / Anggota / Inisiat ] — UC01 s.d. UC09
                  </h3>
                </div>
                <span className="font-archival text-xs text-[#64748B]">9 Use Case</span>
              </div>

              <div className="divide-y divide-[#E2E8F0]">
                {frontendUseCases.map((uc) => {
                  const permitted = canActorExecuteUseCase(
                    founderState.activeActorRole,
                    uc.code
                  );
                  return (
                    <div
                      key={uc.code}
                      className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-archival text-xs font-bold text-[#151B8D]">
                            ({uc.code})
                          </span>
                          <span className="font-heading text-sm font-semibold text-[#0A0A0A]">
                            {uc.title}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B]">{uc.summary}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigateModule(uc.targetModuleId, uc.code)}
                        className={`inline-flex items-center gap-1 rounded px-3 py-1.5 font-archival text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                          permitted
                            ? 'border border-[#E2E8F0] bg-[#F8F9FA] text-[#151B8D] hover:border-[#151B8D] hover:bg-white'
                            : 'border border-amber-300 bg-amber-50 text-amber-900'
                        }`}
                      >
                        {!permitted && <Lock className="h-3 w-3" />}
                        <span>{permitted ? 'Buka Modul' : `Butuh ${uc.minimumActor}`}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Realm: Kendali Mutlak (Backend/CMS) [UC10 - UC16] */}
            <div className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 font-archival text-xs font-semibold text-[#151B8D]">
                    <Shield className="h-3.5 w-3.5" />
                    <span>KENDALI MUTLAK (BACKEND / CMS)</span>
                  </div>
                  <h3 className="mt-1 font-heading text-base font-semibold text-[#0A0A0A]">
                    [ Aktor: FOUNDER ] — UC10 s.d. UC16
                  </h3>
                </div>
                <span className="font-archival text-xs text-[#151B8D] font-semibold">
                  7 Use Case Sovereign
                </span>
              </div>

              <div className="divide-y divide-[#E2E8F0]">
                {backendUseCases.map((uc) => {
                  const permitted = canActorExecuteUseCase(
                    founderState.activeActorRole,
                    uc.code
                  );
                  return (
                    <div
                      key={uc.code}
                      className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-archival text-xs font-bold text-[#151B8D]">
                            ({uc.code})
                          </span>
                          <span className="font-heading text-sm font-semibold text-[#0A0A0A]">
                            {uc.title}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B]">{uc.summary}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (founderState.activeActorRole !== 'FOUNDER') {
                            handleSelectActorRole('FOUNDER');
                          }
                          onNavigateModule('MOD-10-FOUNDER-CONSOLE', uc.code);
                        }}
                        className="inline-flex items-center gap-1 rounded bg-[#151B8D] px-3 py-1.5 font-archival text-xs font-medium text-white hover:bg-[#0E1260] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{permitted ? 'Eksekusi CMS' : 'Masuk Founder'}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4 Core Security & Usage Protocols Strip (TBI-RULE-01 to TBI-RULE-04) */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
              <div>
                <div className="font-archival text-xs font-semibold text-[#151B8D]">
                  SECURITY & USAGE PROTOCOLS · ENFORCEMENT: {founderState.securityState.protocols.enforcement_mode}
                </div>
                <h3 className="font-heading text-base font-semibold text-[#0A0A0A]">
                  {founderState.securityState.protocols.transmission_type} · 4 Aturan Inti (TBI-RULE-01 s.d. TBI-RULE-04)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateModule('MOD-10-FOUNDER-CONSOLE', 'SECURITY_OVERRIDE')}
                className="inline-flex items-center gap-1 font-archival text-xs font-semibold text-[#151B8D] hover:underline cursor-pointer"
              >
                <span>Founder Security Override Console</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {founderState.securityState.protocols.four_core_rules.map((rule) => (
                <div
                  key={rule.rule_code}
                  className="rounded border border-[#E2E8F0] bg-white p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between font-archival text-xs">
                    <span className="font-bold text-[#151B8D]">{rule.rule_code}</span>
                    <span className="text-[10px] text-[#64748B]">{rule.trigger}</span>
                  </div>
                  <div className="font-heading text-xs font-semibold text-[#0A0A0A]">
                    {rule.name}
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#64748B]">{rule.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Complete 10-Module Sequence Directory Grid with Customer Quick Search */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="border-t border-[#E2E8F0] pt-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-archival uppercase tracking-widest text-[#475569]">
                URUTAN ARSITEKTUR SISTEM (MODULES_SEQUENCE 01 – 10)
              </div>
              <h2 className="mt-1 font-heading text-2xl font-semibold text-[#0A0A0A]">
                Indeks {visibleModules.length} Modul Aktif Perpustakaan Esoteris TBI v4.0.0
              </h2>
            </div>

            <div className="w-full sm:w-72">
              <label htmlFor="home-catalog-search" className="sr-only">
                Cari Modul Perpustakaan
              </label>
              <input
                id="home-catalog-search"
                type="search"
                value={catalogSearchQuery}
                onChange={(e) => setCatalogSearchQuery(e.target.value)}
                placeholder="Filter modul (mis. Codex, PDF, Shephirot)..."
                className="w-full border border-[#CBD5E1] bg-white px-3 py-2 text-xs text-[#0A0A0A] placeholder:text-[#64748B] focus:border-[#151B8D] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {filteredCatalogModules.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => onNavigateModule(mod.id)}
                className="group flex flex-col justify-between border border-[#E2E8F0] bg-white p-4 text-left transition-colors hover:border-[#151B8D] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-archival text-[#475569]">
                    <span className="font-semibold text-[#151B8D]">
                      ORDER {String(mod.order).padStart(2, '0')}
                    </span>
                    <span>{mod.quota ? `KUOTA: ${mod.quota}` : mod.id}</span>
                  </div>
                  <h3 className="mt-2 font-heading text-sm font-semibold text-[#0A0A0A] group-hover:text-[#151B8D]">
                    {mod.title}
                  </h3>
                  <div className="mt-1 text-[11px] font-archival text-[#475569]">
                    Mode: {mod.uiMode}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569] line-clamp-3">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-2.5 text-xs font-archival text-[#151B8D]">
                  <span>{mod.route}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
