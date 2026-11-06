export type AccessTier =
  | 'PUBLIC'
  | 'REGISTERED'
  | 'EXCLUSIVE_TIER'
  | 'ACADEMIC_RESEARCHER'
  | 'PUBLIC_VIEW_AUTHENTICATED_RATE'
  | 'FOUNDER_ONLY (2FA Protected)';

export type ModuleId =
  | 'MOD-01-HOME'
  | 'MOD-02-ORBIT-CODEX'
  | 'MOD-03-ART-GALLERY'
  | 'MOD-04-KAPSUL-WAKTU'
  | 'MOD-05-SHEPHIROT'
  | 'MOD-06-VIDEO'
  | 'MOD-07-GOLDEN-ENERGY'
  | 'MOD-08-GOLDEN-DAWN'
  | 'MOD-09-DONATUR'
  | 'MOD-10-FOUNDER-CONSOLE';

export interface ModuleConfig {
  order: number;
  id: ModuleId;
  title: string;
  shortLabel: string;
  route: string;
  uiMode: string;
  access: AccessTier;
  quota?: number;
  isStandalone?: boolean;
  founderCapabilities: string[];
  description: string;
}

export const SYSTEM_MANIFEST = {
  system_name: 'The Brothers Influence (TBI) - Portal Kemuliaan Yayasan',
  codename: 'TBI-ARCHIVE-SYSTEM',
  version: '4.0.0',
  institution: 'The Brothers Influence',
  classification_header: 'PRIVATE TRANSMISSION SERIES / ESOTERIC-REALIST INTELLIGENCE',
  brand_acronym: 'TBI',
  customizable_by_founder: true,
  color_tokens: {
    primary_accent: '#151B8D',
    obsidian_dark: '#0A0A0A',
    canvas_light: '#FFFFFF',
    transmission_slate: '#64748B',
  },
} as const;

export const MODULES_CONFIG: ModuleConfig[] = [
  {
    order: 1,
    id: 'MOD-01-HOME',
    title: 'Portal Beranda Institusi (Home)',
    shortLabel: '01. Beranda',
    route: '/',
    uiMode: 'Dynamic Landing Page',
    access: 'PUBLIC',
    founderCapabilities: [
      'hero_banner_image',
      'pengantar_text',
      'visi_misi_list',
      'founder_biography_photos',
    ],
    description:
      'Beranda dinamis Yayasan The Brothers Influence: Hero Banner, Sekapur Sirih, Visi-Misi, dan Biografi Pendiri.',
  },
  {
    order: 2,
    id: 'MOD-02-ORBIT-CODEX',
    title: 'Modul Preservasi O R B I T - C O D E X',
    shortLabel: '02. Orbit Codex',
    route: '/orbit-codex',
    uiMode: 'IIIF Deep-Zoom Viewer',
    access: 'ACADEMIC_RESEARCHER',
    quota: 6,
    founderCapabilities: ['upload_codex_folio', 'edit_transcription', 'approve_annotations'],
    description:
      'Preservasi 6 Kuota Folio O R B I T - C O D E X dengan IIIF Deep-Zoom Viewer, suntingan transkripsi, dan persetujuan anotasi.',
  },
  {
    order: 3,
    id: 'MOD-03-ART-GALLERY',
    title: 'Galeri Seni Visual Terkurasi (Art Collection)',
    shortLabel: '03. Galeri Seni',
    route: '/galeri-seni',
    uiMode: 'Web Scroll (Infinite Smooth Scroll)',
    access: 'PUBLIC',
    founderCapabilities: ['upload_high_res_photos', 'edit_caption', 'reorder_gallery_scroll'],
    description:
      'Aliran visual terkurasi (Gambar Gratis, Energi Kemuliaan, Sumber Universal) dengan pengurutan dan unggahan resolusi tinggi.',
  },
  {
    order: 4,
    id: 'MOD-04-KAPSUL-WAKTU',
    title: 'Modul Kapsul Ruang & Waktu (Akses Eksklusif)',
    shortLabel: '04. Kapsul Waktu',
    route: '/kapsul-ruang-dan-waktu',
    uiMode: 'Custom Encrypted PDF Reader',
    access: 'EXCLUSIVE_TIER',
    founderCapabilities: ['upload_custom_pdf', 'set_encryption_password', 'grant_user_access'],
    description:
      'Pembaca PDF Terenkripsi Kustom untuk Materi PDF Esoteris (TBI / KODE 1 – 6) dengan manajemen sandi dan otorisasi akses.',
  },
  {
    order: 5,
    id: 'MOD-05-SHEPHIROT',
    title: 'Sistem Graf Interaktif Shephirot (Tree of Life)',
    shortLabel: '05. Peta Shephirot',
    route: '/shephirot',
    uiMode: 'Web Scroll (Interactive Scrollytelling SVG)',
    access: 'PUBLIC',
    founderCapabilities: ['edit_node_descriptions', 'link_new_pdfs_or_photos_to_nodes'],
    description:
      'Graf Scrollytelling SVG interaktif 10 Simpul & 22 Jalur dengan penyuntingan deskripsi simpul dan penautan PDF/foto baru.',
  },
  {
    order: 6,
    id: 'MOD-06-VIDEO',
    title: 'Modul Media Video',
    shortLabel: '06. Media Video',
    route: '/media-video',
    uiMode: 'Curated Cinema Grid',
    access: 'PUBLIC',
    quota: 30,
    founderCapabilities: ['replace_video_slot', 'upload_custom_thumbnail', 'edit_video_metadata'],
    description:
      'Curated Cinema Grid berkuota 30 slot transmisi video dengan penggantian slot, unggah thumbnail kustom, dan sunting metadata.',
  },
  {
    order: 7,
    id: 'MOD-07-GOLDEN-ENERGY',
    title: 'Golden Energy: 2 Tujuan Persimpangan',
    shortLabel: '07. Golden Energy',
    route: '/golden-energy',
    uiMode: 'Split-Screen Interactive Pathway',
    access: 'PUBLIC',
    founderCapabilities: ['customize_path_visuals', 'update_doctrine_materials'],
    description:
      'Persimpangan layar terbelah (Split-Screen Interactive Pathway) antara jalur Mandiri Kemuliaan dan Bertarung Matrix.',
  },
  {
    order: 8,
    id: 'MOD-08-GOLDEN-DAWN',
    title: 'Repositori Khusus: Golden Dawn (Modul Mandiri)',
    shortLabel: '08. Golden Dawn',
    route: '/koleksi-golden-dawn',
    uiMode: 'Web Scroll (Continuous Archival Scroll)',
    access: 'REGISTERED',
    isStandalone: true,
    founderCapabilities: ['upload_tarot_diagrams', 'add_historical_manuscripts'],
    description:
      'Aliran arsip berkesinambungan (Continuous Archival Scroll) untuk diagram Tarot Hermetis dan manuskrip historis Ordo.',
  },
  {
    order: 9,
    id: 'MOD-09-DONATUR',
    title: 'Registri Tokoh dan Sistem Apresiasi Donatur',
    shortLabel: '09. 12 Pilar Donatur',
    route: '/tokoh-pendukung',
    uiMode: '12 Pillars Grid + Community Rating',
    access: 'PUBLIC_VIEW_AUTHENTICATED_RATE',
    quota: 12,
    founderCapabilities: ['upload_donor_photo', 'edit_contribution_log', 'moderate_user_ratings'],
    description:
      'Sorotan Utama: Energy 12 Donatur Peradaban Mulia (12 Pillars Grid, kuota 12 tokoh) dengan moderasi rating komunitas.',
  },
  {
    order: 10,
    id: 'MOD-10-FOUNDER-CONSOLE',
    title: 'Founder Sovereign Console (CMS & Customizer)',
    shortLabel: '10. Founder Console',
    route: '/founder-console',
    uiMode: 'Sovereign CMS & Live Visual Builder',
    access: 'FOUNDER_ONLY (2FA Protected)',
    founderCapabilities: [
      'visual_web_builder',
      'media_library_uploader',
      'audit_and_security',
    ],
    description:
      'Konsol Kedaulatan Pendiri (Dilindungi 2FA): Visual Web Builder real-time, Multi-Format Media Uploader, dan Log Audit Keamanan.',
  },
];

// --- CLASSIFICATION & KAPSUL RUANG & WAKTU (MOD-04-KAPSUL-WAKTU) ---

export type ClassificationCode = 'KODE 1' | 'KODE 2' | 'KODE 3' | 'KODE 4' | 'KODE 5' | 'KODE 6';

export interface ClassificationClass {
  code: ClassificationCode;
  title: string;
  badge: string;
  format: 'PDF/A' | 'PDF';
  synopsis: string;
}

export const CLASSIFICATION_CLASSES: ClassificationClass[] = [
  {
    code: 'KODE 1',
    title: 'Manuskrip & Teks Primer Transmisi',
    badge: 'TBI/KODE 1',
    format: 'PDF/A',
    synopsis: 'Naskah induk transmisi esoteris-realis dan dokumen fondasional yang diawetkan dalam standar ISO 19005-1 (PDF/A-1b).',
  },
  {
    code: 'KODE 2',
    title: 'Studi Akademis & Jurnal Analisis',
    badge: 'TBI/KODE 2',
    format: 'PDF/A',
    synopsis: 'Jurnal telaah sejawat, studi komparatif lintas tradisi, dan analisis filologis terstruktur.',
  },
  {
    code: 'KODE 3',
    title: 'Monograf Riset Doktrinal',
    badge: 'TBI/KODE 3',
    format: 'PDF',
    synopsis: 'Risalah tematik tunggal yang membedah ontologi, kosmologi simbolik, dan sistem epistemologi.',
  },
  {
    code: 'KODE 4',
    title: 'Panduan & Metodologi Pengetahuan',
    badge: 'TBI/KODE 4',
    format: 'PDF',
    synopsis: 'Instrumen metodologis untuk pembacaan kodeks, hermeneutika arsip, dan verifikasi sumber primer.',
  },
  {
    code: 'KODE 5',
    title: 'Antologi Kompilasi Berkas Rahasia',
    badge: 'TBI/KODE 5',
    format: 'PDF',
    synopsis: 'Kompilasi korespondensi internal, risalah terbatas, dan berkas intelijen kultural lintas dekade.',
  },
  {
    code: 'KODE 6',
    title: 'Kritik Teks & Terjemahan Khusus',
    badge: 'TBI/KODE 6',
    format: 'PDF',
    synopsis: 'Aparatus kritis atas teks Ibrani, Ge’ez, Latin, dan Arab beserta anotasi linguistik ke Bahasa Indonesia.',
  },
];

export interface DublinCoreMetadata {
  title: string;
  creator: string;
  subject: string[];
  description: string;
  publisher: string;
  contributor: string;
  date: string;
  type: string;
  format: 'PDF/A' | 'PDF';
  identifier: string;
  source: string;
  language: string;
  relation: string;
  coverage: string;
  rights: string;
}

export interface CapsuleDocument {
  id: string;
  code: ClassificationCode;
  badge: string;
  folioCount: number;
  checksumSha256: string;
  encryptionPasswordProtected?: boolean;
  encryptionKeyHint?: string;
  authorizedUsersCount?: number;
  shephirotNodeRef?: number;
  dublinCore: DublinCoreMetadata;
  pages: {
    pageNumber: number;
    heading: string;
    content: string;
    marginalNote: string;
  }[];
}

export const CAPSULE_DOCUMENTS: CapsuleDocument[] = [
  {
    id: 'tbi-doc-101',
    code: 'KODE 1',
    badge: 'TBI/KODE 1',
    folioCount: 48,
    checksumSha256: '8f4b2e91c03d7a6451b89e12f0a5c8d3e41972a6b501c3d89f2e1047a6c9b201',
    encryptionPasswordProtected: true,
    encryptionKeyHint: 'TBI-KETHER-01',
    authorizedUsersCount: 14,
    shephirotNodeRef: 1,
    dublinCore: {
      title: 'Codex Principia Emanationis: Risalah Transmisi Mahkota Pertama',
      creator: 'Dewan Kurator Epistemik TBI',
      subject: ['Transmisi Primer', 'Kether', 'Ontologi Emanasi', 'Kosmologi Arsip'],
      description: 'Naskah primer mengenai prinsip titik mula kesadaran dan struktur penurunan realitas dari Kether menuju Malkuth.',
      publisher: 'The Brothers Influence Archival Press',
      contributor: 'Prof. Dr. H. Arman Wiryawan, Filolog Senior',
      date: '2021-04-14',
      type: 'Text / Primary Manuscript',
      format: 'PDF/A',
      identifier: 'URN:TBI:ARCHIVE:KODE1:2021-101',
      source: 'Folio Asli Koleksi Khusus Ruang Kubah Lapis IV',
      language: 'id-ID / la',
      relation: 'Terkait Simpul Shephirot #1 (Kether - Crown)',
      coverage: 'Abad ke-17 hingga Restorasi Digital 2026',
      rights: 'Akses Eksklusif Anggota Terverifikasi — Hanya Baca Terenkripsi',
    },
    pages: [
      {
        pageNumber: 1,
        heading: 'Prolegomena: Titik Tak Berdimensi (Nekudah Peshutah)',
        content:
          'Dalam tata arsip esoteris-realis, setiap pengetahuan berawal dari kesunyian pra-aksara yang disebut sebagai Mahkota Pertama (Kether). Sebelum diferensiasi bentuk dan nama muncul di dalam sejarah intelektual manusia, terdapat potensi murni yang tak terbagi. Naskah ini merekam sembilan belas fragmen transmisi lisan yang dikodifikasikan ulang untuk menjaga ketepatan istilah filologis.',
        marginalNote: 'Fol. 1r — Bandingkan dengan fragmen Sefer Yetzirah bab I ayat 1–4 pada koleksi perbandingan.',
      },
      {
        pageNumber: 2,
        heading: 'Artikulasi Cahaya Primer & Hukum Keseimbangan',
        content:
          'Ketika pancaran intelektual melintasi batas potensi menuju aktualitas, ia membentuk dua poros komplementer: kebijaksanaan dinamis (Chokmah) dan struktur kontemplatif (Binah). Tanpa disiplin arsip dan verifikasi rasional, intuisi metafisika mudah tergelincir menjadi spekulasi tanpa dasar. Oleh sebab itu, tradisi The Brothers Influence mewajibkan penyandingan antara simbol dan bukti tekstual.',
        marginalNote: 'Fol. 1v — Catatan kurator: tanda air kertas asli menunjukkan produksi Leiden tahun 1688.',
      },
      {
        pageNumber: 3,
        heading: 'Kanonisasi Teks Transmisi dalam Format Preservasi',
        content:
          'Seluruh salinan dalam klasifikasi TBI/KODE 1 dikunci menggunakan enkripsi berlapis dan direproduksi dalam profil warna terkalibrasi. Pembaca disarankan memperhatikan aparat kritis pada kolom bawah setiap lembaran guna melacak varian bacaan antar manuskrip.',
        marginalNote: 'Fol. 2r — Verifikasi integritas berkas menggunakan tanda tangan SHA-256.',
      },
    ],
  },
  {
    id: 'tbi-doc-204',
    code: 'KODE 2',
    badge: 'TBI/KODE 2',
    folioCount: 64,
    checksumSha256: '3c9a71d0e8f4b25690a12d4e8b7c65f301a9e8d2c4b670f1e3a5d9c8b20471e6',
    encryptionPasswordProtected: false,
    encryptionKeyHint: 'TBI-BINAH-02',
    authorizedUsersCount: 28,
    shephirotNodeRef: 3,
    dublinCore: {
      title: 'Jurnal Epistemologi Arsip Vol. IX: Geometri Sakral & Rasionalitas Historis',
      creator: 'Dr. Elena Rostova & Tim Riset Filologi TBI',
      subject: ['Jurnal Analisis', 'Binah', 'Geometri Sakral', 'Metodologi Sejarah'],
      description: 'Studi akademis mengenai transmisi proporsi harmonik dari perpustakaan Aleksandria ke tradisi hermetis Eropa dan Nusantara.',
      publisher: 'The Brothers Influence Institute',
      contributor: 'Dr. Lukas Santoso',
      date: '2024-09-22',
      type: 'Journal Article / Peer-Reviewed Analysis',
      format: 'PDF/A',
      identifier: 'URN:TBI:ARCHIVE:KODE2:2024-204',
      source: 'Seri Berkala Studi Akademis TBI ISSN-Internal 2981-04',
      language: 'id-ID',
      relation: 'Terkait Simpul Shephirot #3 (Binah - Understanding)',
      coverage: 'Lintas Peradaban Mediterania & Asia Tenggara',
      rights: 'Hak Cipta The Brothers Influence — Distribusi Internal Terbatas',
    },
    pages: [
      {
        pageNumber: 1,
        heading: 'Abstrak & Kerangka Analisis',
        content:
          'Studi ini menguji hipotesis bahwa diagram pohon simbolik dan proporsi arsitektural kuil kuno berfungsi sebagai sistem mnemonik (penyimpanan memori terstruktur) bagi komunitas ilmuwan pra-modern. Dengan memetakan 142 manuskrip dari abad ke-12 hingga ke-19, ditemukan konsistensi rasio matematis yang melampaui batas geografis.',
        marginalNote: 'Hal. 1 — Diterima setelah tinjauan sejawat buta ganda (double-blind peer review).',
      },
      {
        pageNumber: 2,
        heading: 'Tabel Konkordansi Istilah Kosmologis',
        content:
          'Pemetaan leksikal menunjukkan kesepadanan struktural antara konsep harmoni proporsional dalam naskah Latin pertengahan (proportio divina), skema emanasi Sephiroth Ibrani, serta tata mandala arsitektur klasik.',
        marginalNote: 'Hal. 2 — Lihat Lampiran III pada Peta Interaktif Shephirot untuk visualisasi graf.',
      },
    ],
  },
  {
    id: 'tbi-doc-309',
    code: 'KODE 3',
    badge: 'TBI/KODE 3',
    folioCount: 112,
    checksumSha256: '7a1e5b90c4d2f8316e0a9c5b4d3f218790e6c5a4b3d2f1e098a7b6c5d4e3f210',
    encryptionPasswordProtected: false,
    encryptionKeyHint: 'TBI-TIPHERETH-03',
    authorizedUsersCount: 22,
    shephirotNodeRef: 6,
    dublinCore: {
      title: 'Monograf Doktrinal: Harmoni Tiphereth dan Etika Keseimbangan Intelektual',
      creator: 'R. Suryaningrat',
      subject: ['Monograf Doktrinal', 'Tiphereth', 'Sintesis Etika', 'Filsafat Realis'],
      description: 'Monograf komprehensif yang menempatkan Tiphereth sebagai titik temu antara ketegasan hukum (Geburah) dan keluasan kasih (Chesed).',
      publisher: 'The Brothers Influence Archival Press',
      contributor: 'Komisi Doktrinal TBI',
      date: '2023-11-05',
      type: 'Monograph',
      format: 'PDF',
      identifier: 'URN:TBI:ARCHIVE:KODE3:2023-309',
      source: 'Koleksi Monograf Riset Doktrinal',
      language: 'id-ID',
      relation: 'Terkait Simpul Shephirot #6 (Tiphereth - Beauty)',
      coverage: 'Filsafat Sistematis',
      rights: 'Akses Eksklusif Tier Peneliti',
    },
    pages: [
      {
        pageNumber: 1,
        heading: 'Bab I: Poros Tengah sebagai Penyangga Kesadaran',
        content:
          'Di jantung struktur sepuluh emanasi berdiri Tiphereth, simpul keindahan dan integrasi. Dalam doktrin esoteris-realis, keindahan bukanlah sekadar ornamen estetis, melainkan ketepatan proporsi antara daya ekspansif dan daya pembatas.',
        marginalNote: 'Monograf Seri III — Disahkan dalam Sidang Tahunan Kurator.',
      },
      {
        pageNumber: 2,
        heading: 'Bab II: Implikasi Praktis bagi Peneliti Arsip',
        content:
          'Seorang pengkaji arsip wajib memelihara kejernihan penilaian: tidak terbuai oleh klaim mistis tanpa bukti, namun tidak pula mereduksi warisan simbolik menjadi sekadar artefak mati tanpa makna batiniah.',
        marginalNote: 'Kutipan kunci untuk pedoman kurasi koleksi TBI.',
      },
    ],
  },
  {
    id: 'tbi-doc-402',
    code: 'KODE 4',
    badge: 'TBI/KODE 4',
    folioCount: 36,
    checksumSha256: '9d2c4f6a8e0b13579a2c4e6f801b3d579e1a3c5f7b9d02468ace13579bdf0246',
    encryptionPasswordProtected: false,
    encryptionKeyHint: 'TBI-HOD-04',
    authorizedUsersCount: 35,
    shephirotNodeRef: 8,
    dublinCore: {
      title: 'Protokol Hermeneutika & Metodologi Verifikasi Naskah Kuno',
      creator: 'Divisi Metodologi & Preservasi TBI',
      subject: ['Metodologi', 'Hod', 'Paleografi', 'Standar Dublin Core', 'IIIF'],
      description: 'Panduan teknis dan epistemologis untuk menguji keaslian naskah, analisis pigmen multispektral, serta katalogisasi metadata Dublin Core.',
      publisher: 'The Brothers Influence Technical Standards',
      contributor: 'Ir. Bagaskara Putra, M.Sc.',
      date: '2025-02-18',
      type: 'Methodological Manual',
      format: 'PDF',
      identifier: 'URN:TBI:ARCHIVE:KODE4:2025-402',
      source: 'Laboratorium Konservasi Digital TBI',
      language: 'id-ID',
      relation: 'Terkait Simpul Shephirot #8 (Hod - Glory)',
      coverage: 'Standar Operasional Preservasi v4.0',
      rights: 'Akses Terbatas Anggota Eksklusif',
    },
    pages: [
      {
        pageNumber: 1,
        heading: 'Prosedur Lima Tahap Otentikasi Kodeks',
        content:
          'Setiap artefak tekstual yang masuk ke dalam repositori The Brothers Influence wajib melalui: (1) Pemeriksaan fisik perkamen atau kertas; (2) Pencitraan multispektral non-destruktif; (3) Analisis paleografi komparatif; (4) Penelusuran silsilah kepemilikan (provenance); dan (5) Penguncian metadata Dublin Core 15-elemen.',
        marginalNote: 'Standar Wajib Laboratorium Konservasi.',
      },
    ],
  },
  {
    id: 'tbi-doc-511',
    code: 'KODE 5',
    badge: 'TBI/KODE 5',
    folioCount: 88,
    checksumSha256: '5e8a1c3f7b9d02468ace13579bdf02469d2c4f6a8e0b13579a2c4e6f801b3d57',
    encryptionPasswordProtected: true,
    encryptionKeyHint: 'TBI-YESOD-05',
    authorizedUsersCount: 9,
    shephirotNodeRef: 9,
    dublinCore: {
      title: 'Antologi Berkas Transmisi Privat: Korespondensi Lingkar Dalam (1928–1984)',
      creator: 'Arsiparis Utama TBI (Kompilator)',
      subject: ['Berkas Rahasia', 'Yesod', 'Korespondensi Historis', 'Intelijen Kultural'],
      description: 'Kompilasi 47 surat, telegram terenkripsi, dan risalah diskusi tertutup antara para pendiri dan kolektor naskah lintas benua.',
      publisher: 'The Brothers Influence Private Vault',
      contributor: 'Kurator Arsip Rahasia',
      date: '2022-07-30',
      type: 'Archival Anthology / Classified Compilation',
      format: 'PDF',
      identifier: 'URN:TBI:ARCHIVE:KODE5:2022-511',
      source: 'Kotak Penyimpanan Besi #19 — Deklasifikasi Internal Terbatas',
      language: 'id-ID / en / nl',
      relation: 'Terkait Simpul Shephirot #9 (Yesod - Foundation)',
      coverage: 'Eropa Barat, Kairo, dan Hindia Belanda / Indonesia (1928–1984)',
      rights: 'Klasifikasi Privat — Dilarang Menyalin Tanpa Otorisasi Dewan',
    },
    pages: [
      {
        pageNumber: 1,
        heading: 'Berkas #07: Korespondensi Akuisisi Fragmen Aksum',
        content:
          'Catatan tertanggal 14 Oktober 1956 merinci penyelamatan tiga lembaran perkamen Ge’ez dari koleksi pribadi di Addis Ababa sebelum dipindahkan ke ruang penyimpanan berkelembaban terkendali milik kolega TBI di Jenewa.',
        marginalNote: 'Lihat modul O R B I T - C O D E X untuk hasil pencitraan resolusi ultra-tinggi atas fragmen ini.',
      },
    ],
  },
  {
    id: 'tbi-doc-603',
    code: 'KODE 6',
    badge: 'TBI/KODE 6',
    folioCount: 74,
    checksumSha256: '1b3d579e1a3c5f7b9d02468ace13579bdf02469d2c4f6a8e0b13579a2c4e6f80',
    encryptionPasswordProtected: false,
    encryptionKeyHint: 'TBI-MALKUTH-06',
    authorizedUsersCount: 19,
    shephirotNodeRef: 10,
    dublinCore: {
      title: 'Aparatus Kritis & Terjemahan Anotatif: Sefer Yetzirah & Fragmen Orbit Codex',
      creator: 'Tim Filologi Semitik & Nusantara TBI',
      subject: ['Kritik Teks', 'Malkuth', 'Terjemahan Khusus', 'Filologi Semitik'],
      description: 'Terjemahan kata-per-kata beserta aparat kritik teks atas naskah kosmologi huruf dan fragmen Octateuch Ethiopia ke dalam Bahasa Indonesia baku.',
      publisher: 'The Brothers Influence Philological Series',
      contributor: 'Dr. Yohanes Desta & Prof. Arman Wiryawan',
      date: '2026-01-12',
      type: 'Critical Edition & Translation',
      format: 'PDF',
      identifier: 'URN:TBI:ARCHIVE:KODE6:2026-603',
      source: 'Kolasi 6 Saksi Naskah (Codices A–F)',
      language: 'id-ID / gez / he',
      relation: 'Terkait Simpul Shephirot #10 (Malkuth - Kingdom) & Modul Orbit Codex',
      coverage: 'Abad ke-14 hingga Edisi Kritis 2026',
      rights: 'Akses Peneliti & Anggota Eksklusif TBI',
    },
    pages: [
      {
        pageNumber: 1,
        heading: 'Pengantar Edisi Kritis & Prinsip Transliterasi',
        content:
          'Dalam menerjemahkan istilah teknis dari rumpun bahasa Semitik (Ibrani Klasik dan Ge’ez Ethiopia) ke dalam Bahasa Indonesia akademis, tim penerjemah mempertahankan istilah asli di dalam tanda kurung siku setiap kali sebuah kata memiliki muatan semantik ganda (polivalensi simbolik).',
        marginalNote: 'Pedoman ini diterapkan secara langsung pada antarmuka pembaca O R B I T - C O D E X.',
      },
    ],
  },
];

export function filterCapsuleDocuments(
  docs: CapsuleDocument[],
  selectedCode: ClassificationCode | 'ALL',
  searchQuery: string
): CapsuleDocument[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return docs.filter((doc) => {
    const matchesCode = selectedCode === 'ALL' || doc.code === selectedCode;
    if (!matchesCode) return false;
    if (!normalizedQuery) return true;
    const inTitle = doc.dublinCore.title.toLowerCase().includes(normalizedQuery);
    const inCreator = doc.dublinCore.creator.toLowerCase().includes(normalizedQuery);
    const inIdentifier = doc.dublinCore.identifier.toLowerCase().includes(normalizedQuery);
    const inBadge = doc.badge.toLowerCase().includes(normalizedQuery);
    const inSubjects = doc.dublinCore.subject.some((s) => s.toLowerCase().includes(normalizedQuery));
    return inTitle || inCreator || inIdentifier || inBadge || inSubjects;
  });
}

// --- SHEPHIROT DIRECTED GRAPH (MOD-05-SHEPHIROT) ---

export type PillarType = 'Middle' | 'Right' | 'Left';

export interface ShephirotNode {
  id: number;
  key: string;
  name: string;
  title_en: string;
  title_id: string;
  pillar: PillarType;
  hebrewName: string;
  divineAttribute: string;
  archivalDomain: string;
  x: number;
  y: number;
  description: string;
  linkedCapsuleIds: string[];
  linkedPhotoUrls: string[];
  linkedGoldenDawnSubId: 'gd-history' | 'gd-tarot' | 'gd-rituals';
}

export interface ShephirotPath {
  pathNumber: number;
  id: string;
  fromNodeId: number;
  toNodeId: number;
  hebrewLetter: string;
  letterMeaning: string;
  tarotArcana: string;
  intelligenceTitle: string;
}

export const SHEPHIROT_NODES: ShephirotNode[] = [
  {
    id: 1,
    key: 'kether',
    name: 'Kether',
    title_en: 'Crown',
    title_id: 'Mahkota Pertama',
    pillar: 'Middle',
    hebrewName: 'כֶּתֶר',
    divineAttribute: 'Prinsip Pertama / Kehendak Murni (Prima Mobile)',
    archivalDomain: 'TBI/KODE 1 — Manuskrip Primer & Asal Transmisi',
    x: 300,
    y: 70,
    description:
      'Simpul puncak pada Pilar Tengah (Keseimbangan). Melambangkan sumber kesadaran tak terdiferensiasi sebelum terurai menjadi dualitas subjek dan objek.',
    linkedCapsuleIds: ['tbi-doc-101'],
    linkedPhotoUrls: ['/src/assets/images/art_energi_kemuliaan_1793727760980.jpg'],
    linkedGoldenDawnSubId: 'gd-rituals',
  },
  {
    id: 2,
    key: 'chokmah',
    name: 'Chokmah',
    title_en: 'Wisdom',
    title_id: 'Kebijaksanaan Dinamis',
    pillar: 'Right',
    hebrewName: 'חָכְמָה',
    divineAttribute: 'Pancaran Intelektual Murni / Zodiak Bintang Tetap',
    archivalDomain: 'TBI/KODE 1 & Koleksi Simbolik Tarot Hermetis',
    x: 470,
    y: 155,
    description:
      'Kepala dari Pilar Kanan (Pilar Rahmat / Daya Aktif). Merupakan kilatan intuisi pertama dan akselerasi ide sebelum dibentuk ke dalam struktur bahasa.',
    linkedCapsuleIds: ['tbi-doc-101'],
    linkedPhotoUrls: ['/src/assets/images/art_sumber_universal_1793727763347.jpg'],
    linkedGoldenDawnSubId: 'gd-tarot',
  },
  {
    id: 3,
    key: 'binah',
    name: 'Binah',
    title_en: 'Understanding',
    title_id: 'Pemahaman Struktural',
    pillar: 'Left',
    hebrewName: 'בִּינָה',
    divineAttribute: 'Arsitektur Bentuk / Saturnus / Ibu Agung',
    archivalDomain: 'TBI/KODE 2 — Studi Akademis & Sistem Klasifikasi',
    x: 130,
    y: 155,
    description:
      'Kepala dari Pilar Kiri (Pilar Ketegasan / Bentuk). Menerima pancaran Chokmah dan mengkristalkannya menjadi hukum logika, bahasa, waktu, dan arsitektur arsip.',
    linkedCapsuleIds: ['tbi-doc-204'],
    linkedPhotoUrls: ['/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg'],
    linkedGoldenDawnSubId: 'gd-history',
  },
  {
    id: 4,
    key: 'chesed',
    name: 'Chesed',
    title_en: 'Mercy',
    title_id: 'Kemurahan & Kedaulatan Konstruktif',
    pillar: 'Right',
    hebrewName: 'חֶסֶד',
    divineAttribute: 'Keluasan Kebaikan / Yupiter / Tatanan Sipil & Filantropi',
    archivalDomain: 'Modul 12 Pilar Donatur & Preservasi Koleksi Terbuka',
    x: 470,
    y: 310,
    description:
      'Simpul konstruktif pada Pilar Kanan yang mengatur organisasi pengetahuan, pelestarian warisan peradaban, dan kemurahan filantropis dalam membangun perpustakaan.',
    linkedCapsuleIds: ['tbi-doc-204'],
    linkedPhotoUrls: ['/src/assets/images/art_energi_kemuliaan_1793727760980.jpg'],
    linkedGoldenDawnSubId: 'gd-history',
  },
  {
    id: 5,
    key: 'geburah',
    name: 'Geburah',
    title_en: 'Severity',
    title_id: 'Ketegasan & Disiplin Kritis',
    pillar: 'Left',
    hebrewName: 'גְּבוּרָה',
    divineAttribute: 'Koreksi Presisi / Mars / Kritik Filologis',
    archivalDomain: 'TBI/KODE 6 — Kritik Teks & Verifikasi Keaslian',
    x: 130,
    y: 310,
    description:
      'Simpul analitis pada Pilar Kiri yang memangkas kesalahan salinan, membedakan naskah otentik dari pseudepigrafa, dan menegakkan disiplin metodologis.',
    linkedCapsuleIds: ['tbi-doc-603'],
    linkedPhotoUrls: ['/src/assets/images/orit_codex_folio_1793727759954.jpg'],
    linkedGoldenDawnSubId: 'gd-rituals',
  },
  {
    id: 6,
    key: 'tiphereth',
    name: 'Tiphereth',
    title_en: 'Beauty',
    title_id: 'Keindahan & Harmoni Sentral',
    pillar: 'Middle',
    hebrewName: 'תִּפְאֶרֶת',
    divineAttribute: 'Pusat Kosmis / Surya / Integrasi Etis & Estetis',
    archivalDomain: 'TBI/KODE 3 — Monograf Doktrinal & Golden Energy',
    x: 300,
    y: 390,
    description:
      'Jantung Pohon Kehidupan pada Pilar Tengah yang menyatukan seluruh simpul atas dan bawah dalam proporsi emas dan kejernihan kontemplatif.',
    linkedCapsuleIds: ['tbi-doc-309'],
    linkedPhotoUrls: ['/src/assets/images/art_energi_kemuliaan_1793727760980.jpg'],
    linkedGoldenDawnSubId: 'gd-rituals',
  },
  {
    id: 7,
    key: 'netzach',
    name: 'Netzach',
    title_en: 'Victory',
    title_id: 'Kemenangan & Daya Estetika',
    pillar: 'Right',
    hebrewName: 'נֵצַח',
    divineAttribute: 'Keabadian Seni / Venus / Simbolisme Visual',
    archivalDomain: 'Galeri Seni Visual Terkurasi (Energi Kemuliaan & Sumber Universal)',
    x: 470,
    y: 515,
    description:
      'Simpul inspirasi artistik, harmoni warna, dan transmisi non-verbal melalui lukisan sakral, simetri fraktal, dan ikonografi.',
    linkedCapsuleIds: ['tbi-doc-309'],
    linkedPhotoUrls: ['/src/assets/images/art_sumber_universal_1793727763347.jpg'],
    linkedGoldenDawnSubId: 'gd-tarot',
  },
  {
    id: 8,
    key: 'hod',
    name: 'Hod',
    title_en: 'Glory',
    title_id: 'Kemuliaan Intelektual & Bahasa',
    pillar: 'Left',
    hebrewName: 'הוֹד',
    divineAttribute: 'Kemegahan Bentuk / Merkurius / Hermeneutika & Kodeks',
    archivalDomain: 'TBI/KODE 4 — Metodologi Pengetahuan & Paleografi',
    x: 130,
    y: 515,
    description:
      'Simpul tata bahasa, kriptografi, kodifikasi naskah, dan presisi ilmu ukur yang menerjemahkan simbol ke dalam sistem pengetahuan terstruktur.',
    linkedCapsuleIds: ['tbi-doc-402'],
    linkedPhotoUrls: ['/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg'],
    linkedGoldenDawnSubId: 'gd-tarot',
  },
  {
    id: 9,
    key: 'yesod',
    name: 'Yesod',
    title_en: 'Foundation',
    title_id: 'Fondasi & Matriks Transmisi',
    pillar: 'Middle',
    hebrewName: 'יְסוֹד',
    divineAttribute: 'Bendahara Citra / Candra (Bulan) / Arsip Memori Kolektif',
    archivalDomain: 'TBI/KODE 5 — Antologi Kompilasi Berkas & Memori Historis',
    x: 300,
    y: 595,
    description:
      'Wadah penampung seluruh arus dari simpul-simpul di atasnya sebelum dimanifestasikan ke dalam realitas empiris.',
    linkedCapsuleIds: ['tbi-doc-511'],
    linkedPhotoUrls: ['/src/assets/images/art_sumber_universal_1793727763347.jpg'],
    linkedGoldenDawnSubId: 'gd-history',
  },
  {
    id: 10,
    key: 'malkuth',
    name: 'Malkuth',
    title_en: 'Kingdom',
    title_id: 'Kerajaan & Manifestasi Aktual',
    pillar: 'Middle',
    hebrewName: 'מַלְכוּת',
    divineAttribute: 'Dunia Empiris / Empat Unsur / Artefak Fisik & Kodeks Nyata',
    archivalDomain: 'TBI/KODE 6 & O R B I T - C O D E X (Artefak Fisik)',
    x: 300,
    y: 710,
    description:
      'Muara akhir emanasi pada Pilar Tengah: dunia konkret tempat naskah perkamen ditulis, disimpan, dipelajari, dan diwujudkan menjadi tindakan nyata.',
    linkedCapsuleIds: ['tbi-doc-603'],
    linkedPhotoUrls: ['/src/assets/images/orit_codex_folio_1793727759954.jpg'],
    linkedGoldenDawnSubId: 'gd-history',
  },
];

export const SHEPHIROT_PATHS: ShephirotPath[] = [
  { pathNumber: 11, id: 'path-11', fromNodeId: 1, toNodeId: 2, hebrewLetter: 'א (Aleph)', letterMeaning: 'Lembu / Nafas Udara', tarotArcana: '0 — The Fool', intelligenceTitle: 'Inteligensi Berkilau (Scintillating)' },
  { pathNumber: 12, id: 'path-12', fromNodeId: 1, toNodeId: 3, hebrewLetter: 'ב (Beth)', letterMeaning: 'Rumah / Wadah', tarotArcana: 'I — The Magician', intelligenceTitle: 'Inteligensi Transparan' },
  { pathNumber: 13, id: 'path-13', fromNodeId: 1, toNodeId: 6, hebrewLetter: 'ג (Gimel)', letterMeaning: 'Unta / Jembatan', tarotArcana: 'II — The High Priestess', intelligenceTitle: 'Inteligensi Pemersatu' },
  { pathNumber: 14, id: 'path-14', fromNodeId: 2, toNodeId: 3, hebrewLetter: 'ד (Daleth)', letterMeaning: 'Pintu Gerbang', tarotArcana: 'III — The Empress', intelligenceTitle: 'Inteligensi Iluminatif' },
  { pathNumber: 15, id: 'path-15', fromNodeId: 2, toNodeId: 6, hebrewLetter: 'ה (Heh)', letterMeaning: 'Jendela Penglihatan', tarotArcana: 'IV — The Emperor', intelligenceTitle: 'Inteligensi Konstitutif' },
  { pathNumber: 16, id: 'path-16', fromNodeId: 2, toNodeId: 4, hebrewLetter: 'ו (Vav)', letterMeaning: 'Paku Pengait', tarotArcana: 'V — The Hierophant', intelligenceTitle: 'Inteligensi Triumfal Abadi' },
  { pathNumber: 17, id: 'path-17', fromNodeId: 3, toNodeId: 6, hebrewLetter: 'ז (Zayin)', letterMeaning: 'Pedang Pemilah', tarotArcana: 'VI — The Lovers', intelligenceTitle: 'Inteligensi Disposisi' },
  { pathNumber: 18, id: 'path-18', fromNodeId: 3, toNodeId: 5, hebrewLetter: 'ח (Cheth)', letterMeaning: 'Pagar Pelindung', tarotArcana: 'VII — The Chariot', intelligenceTitle: 'Inteligensi Rumah Pengaruh' },
  { pathNumber: 19, id: 'path-19', fromNodeId: 4, toNodeId: 5, hebrewLetter: 'ט (Teth)', letterMeaning: 'Ular Kebijaksanaan', tarotArcana: 'VIII — Strength', intelligenceTitle: 'Inteligensi Rahasia Aktivitas Spiritual' },
  { pathNumber: 20, id: 'path-20', fromNodeId: 4, toNodeId: 6, hebrewLetter: 'י (Yod)', letterMeaning: 'Tangan Pencipta', tarotArcana: 'IX — The Hermit', intelligenceTitle: 'Inteligensi Kehendak' },
  { pathNumber: 21, id: 'path-21', fromNodeId: 4, toNodeId: 7, hebrewLetter: 'כ (Kaph)', letterMeaning: 'Telapak Tangan', tarotArcana: 'X — Wheel of Fortune', intelligenceTitle: 'Inteligensi Pemahaman Pencari' },
  { pathNumber: 22, id: 'path-22', fromNodeId: 5, toNodeId: 6, hebrewLetter: 'ל (Lamed)', letterMeaning: 'Tongkat Pengarah', tarotArcana: 'XI — Justice', intelligenceTitle: 'Inteligensi Setia' },
  { pathNumber: 23, id: 'path-23', fromNodeId: 5, toNodeId: 8, hebrewLetter: 'מ (Mem)', letterMeaning: 'Air Samudra', tarotArcana: 'XII — The Hanged Man', intelligenceTitle: 'Inteligensi Stabil' },
  { pathNumber: 24, id: 'path-24', fromNodeId: 6, toNodeId: 7, hebrewLetter: 'נ (Nun)', letterMeaning: 'Ikan / Gerak Batin', tarotArcana: 'XIII — Death', intelligenceTitle: 'Inteligensi Imajinatif' },
  { pathNumber: 25, id: 'path-25', fromNodeId: 6, toNodeId: 9, hebrewLetter: 'ס (Samekh)', letterMeaning: 'Penopang', tarotArcana: 'XIV — Temperance', intelligenceTitle: 'Inteligensi Pengujian' },
  { pathNumber: 26, id: 'path-26', fromNodeId: 6, toNodeId: 8, hebrewLetter: 'ע (Ayin)', letterMeaning: 'Mata Pengamat', tarotArcana: 'XV — The Devil', intelligenceTitle: 'Inteligensi Pembaru' },
  { pathNumber: 27, id: 'path-27', fromNodeId: 7, toNodeId: 8, hebrewLetter: 'פ (Peh)', letterMeaning: 'Mulut Sabda', tarotArcana: 'XVI — The Tower', intelligenceTitle: 'Inteligensi Aktif / Eksitasi' },
  { pathNumber: 28, id: 'path-28', fromNodeId: 7, toNodeId: 9, hebrewLetter: 'צ (Tzaddi)', letterMeaning: 'Kail Pancing', tarotArcana: 'XVII — The Star', intelligenceTitle: 'Inteligensi Natural' },
  { pathNumber: 29, id: 'path-29', fromNodeId: 7, toNodeId: 10, hebrewLetter: 'ק (Qoph)', letterMeaning: 'Belakang Kepala', tarotArcana: 'XVIII — The Moon', intelligenceTitle: 'Inteligensi Korporeal' },
  { pathNumber: 30, id: 'path-30', fromNodeId: 8, toNodeId: 9, hebrewLetter: 'ר (Resh)', letterMeaning: 'Kepala Kesadaran', tarotArcana: 'XIX — The Sun', intelligenceTitle: 'Inteligensi Kolektif' },
  { pathNumber: 31, id: 'path-31', fromNodeId: 8, toNodeId: 10, hebrewLetter: 'ש (Shin)', letterMeaning: 'Gigi / Api Rohani', tarotArcana: 'XX — Judgement', intelligenceTitle: 'Inteligensi Perpetual' },
  { pathNumber: 32, id: 'path-32', fromNodeId: 9, toNodeId: 10, hebrewLetter: 'ת (Tav)', letterMeaning: 'Tanda Salib Kosmis', tarotArcana: 'XXI — The World', intelligenceTitle: 'Inteligensi Administratif' },
];

export function getShephirotNodeById(nodeId: number): ShephirotNode | undefined {
  return SHEPHIROT_NODES.find((n) => n.id === nodeId);
}

export function getConnectedPathsForNode(nodeId: number): ShephirotPath[] {
  return SHEPHIROT_PATHS.filter((p) => p.fromNodeId === nodeId || p.toNodeId === nodeId);
}

export function getAdjacentNodes(nodeId: number): ShephirotNode[] {
  const connectedPaths = getConnectedPathsForNode(nodeId);
  const neighborIds = new Set<number>();
  for (const path of connectedPaths) {
    if (path.fromNodeId === nodeId) neighborIds.add(path.toNodeId);
    if (path.toNodeId === nodeId) neighborIds.add(path.fromNodeId);
  }
  return SHEPHIROT_NODES.filter((n) => neighborIds.has(n.id));
}

export function filterNodesByPillar(pillar: PillarType | 'ALL'): ShephirotNode[] {
  if (pillar === 'ALL') return SHEPHIROT_NODES;
  return SHEPHIROT_NODES.filter((n) => n.pillar === pillar);
}

// --- ORBIT CODEX (MOD-02-ORBIT-CODEX) — QUOTA: 6 FOLIO SLOTS ---

export const ORBIT_CODEX_QUOTA = 6;

export interface PaleographyAnnotation {
  id: string;
  folioSide: 'RECTO' | 'VERSO';
  xPercent: number;
  yPercent: number;
  category: 'PALEOGRAFI' | 'FILOLOGI' | 'ORNAMEN_HARAG';
  title: string;
  scholar: string;
  peerReviewStatus: string;
  approvedByFounder: boolean;
  note: string;
}

export interface ComparativeVerse {
  verseRef: string;
  folioSide: 'RECTO' | 'VERSO';
  geezScript: string;
  transliteration: string;
  indonesianTranslation: string;
  philologicalCommentary: string;
}

export interface OrbitFolioRecord {
  slotNumber: number; // 1 to 6 (Quota: 6)
  orbitCode: string; // ORBIT // 001 to ORBIT // 006
  masterCodexTitle: string; // Codex I: Kanon Kosmologi ... Codex VI: Epilog Kemuliaan
  id: string;
  folioLabel: string;
  side: 'RECTO' | 'VERSO';
  shelfmark: string;
  century: string;
  material: string;
  dimensionsMm: string;
  iiifManifestId: string;
  imageUrl: string;
  verses: ComparativeVerse[];
  annotations: PaleographyAnnotation[];
}

export const ORBIT_CODEX_FOLIOS: OrbitFolioRecord[] = [
  {
    slotNumber: 1,
    orbitCode: 'ORBIT // 001',
    masterCodexTitle: 'Codex I: Kanon Kosmologi',
    id: 'orbit-fol-14r',
    folioLabel: 'Slot 01 · Folio 14 Recto (14r)',
    side: 'RECTO',
    shelfmark: 'MS TBI-ORBIT-014R',
    century: 'Abad ke-15 M (Era Kekaisaran Solomonic Awal)',
    material: 'Perkamen Kulit Kambing (Vellum), Tinta Besi-Galus Hitam & Rubrikasi Vermilion',
    dimensionsMm: '345 × 260 mm (2 Kolom, 21 Baris per Kolom)',
    iiifManifestId: 'https://archive.tbi.org/iiif/v3/orbit-codex/manifest/folio-14r.json',
    imageUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    verses: [
      {
        verseRef: 'Orbit Codex (Kejadian / Tekwin) 1:1–2',
        folioSide: 'RECTO',
        geezScript: 'በቀዳሚ፡ ገብረ፡ እግዚአብሔር፡ ሰማየ፡ ወምድረ። ወምድርሰ፡ ኢትትረአይ፡ ወኢኮነት፡ ድሉተ፡ ወጽልመት፡ መልዕልተ፡ ቀላይ።',
        transliteration: 'Ba-qadāmi gabra ’Egzi’abḥēr samāya wa-medra. Wa-medr-ssa ’i-tetre’ay wa-’i-konat deluta, wa-ṣelmat mal‘elta qalāy.',
        indonesianTranslation: 'Pada permulaan, Tuhan menciptakan langit dan bumi. Adapun bumi itu belum tampak wujudnya dan belum teratur, serta kegelapan menyelimuti permukaan samudra raya.',
        philologicalCommentary:
          'Frasa Ge’ez "ኢትትረአይ" (’i-tetre’ay, "tidak tampak/tak kasatmata") mengikuti tradisi Septuaginta Aleksandria (aoratos) yang menekankan kondisi pra-manifestasi ontologis.',
      },
      {
        verseRef: 'Orbit Codex (Kejadian / Tekwin) 1:3–4',
        folioSide: 'RECTO',
        geezScript: 'ወመንፈሰ፡ እግዚአብሔር፡ ይጸልል፡ መልዕልተ፡ ማይ። ወይቤ፡ እግዚአብሔር፡ ለይኩን፡ ብርሃን፡ ወኮነ፡ ብርሃን። ወርእየ፡ እግዚአብሔር፡ ብርሃነ፡ ከመ፡ ሠናይ።',
        transliteration: 'Wa-manfasa ’Egzi’abḥēr yeṣallel mal‘elta māy. Wa-yebē ’Egzi’abḥēr: layekun berhān, wa-kona berhān. Wa-re’ya ’Egzi’abḥēr berhāna kama śannāy.',
        indonesianTranslation: 'Dan Roh Tuhan melayang-layang menaungi permukaan air. Lalu berfirmanlah Tuhan: "Jadilah terang," maka jadilah terang itu. Dan Tuhan melihat bahwa terang itu sungguh baik (harmonis).',
        philologicalCommentary:
          'Kata kerja "ይጸልል" (yeṣallel) bermakna memberikan naungan kanopi atau mengerami dengan perlindungan kosmis, sejajar dengan konsep Shekhinah pada simpul Kether–Binah.',
      },
    ],
    annotations: [
      {
        id: 'ann-1',
        folioSide: 'RECTO',
        xPercent: 48,
        yPercent: 20,
        category: 'ORNAMEN_HARAG',
        title: 'Header Iluminasi Harag Tiga Salib Anyaman',
        scholar: 'Dr. Yohanes Desta (Filologi Aksumit)',
        peerReviewStatus: 'Disetujui Pendiri & Peer-Review (2026)',
        approvedByFounder: true,
        note: 'Motif pita anyaman geometris (Harag) menggunakan pigmen orpiment kuning, azurit biru, dan cinnabar merah yang melambangkan kesatuan trinitaris kosmos.',
      },
      {
        id: 'ann-2',
        folioSide: 'RECTO',
        xPercent: 31,
        yPercent: 42,
        category: 'PALEOGRAFI',
        title: 'Rubrikasi Inisial Meruba (Gaya Aksara Gwelh)',
        scholar: 'Prof. Dr. H. Arman Wiryawan',
        peerReviewStatus: 'Menunggu Otorisasi Pendiri',
        approvedByFounder: false,
        note: 'Bentuk huruf በ (Ba) dan ዘ (Za) dengan serif tebal bersudut 45 derajat menunjukkan karakteristik skriptorium Biara Debre Hayq Istifanos.',
      },
    ],
  },
  {
    slotNumber: 2,
    orbitCode: 'ORBIT // 002',
    masterCodexTitle: 'Codex II: Transmisi Hermetis',
    id: 'orbit-fol-14v',
    folioLabel: 'Slot 02 · Folio 14 Verso (14v)',
    side: 'VERSO',
    shelfmark: 'MS TBI-ORBIT-014V',
    century: 'Abad ke-15 M (Era Kekaisaran Solomonic Awal)',
    material: 'Perkamen Kulit Kambing (Vellum), Sisi Daging (Flesh Side)',
    dimensionsMm: '345 × 260 mm (2 Kolom, 21 Baris per Kolom)',
    iiifManifestId: 'https://archive.tbi.org/iiif/v3/orbit-codex/manifest/folio-14v.json',
    imageUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    verses: [
      {
        verseRef: 'Orbit Codex (Kejadian / Tekwin) 1:14–16',
        folioSide: 'VERSO',
        geezScript: 'ወይቤ፡ እግዚአብሔር፡ ለይኩኑ፡ ብርሃናት፡ ውስተ፡ ጠፈረ፡ ሰማይ፡ ከመ፡ ያብርሁ፡ ዲበ፡ ምድር፡ ወይፍልጡ፡ ማእከለ፡ መዓልት፡ ወማእከለ፡ ሌሊት።',
        transliteration: 'Wa-yebē ’Egzi’abḥēr: layekunu berhānāt westa ṭafara samāy kama yābrehu diba medr wa-yefleṭu mā’kala ma‘ālt wa-mā’kala lēlit.',
        indonesianTranslation: 'Lalu berfirmanlah Tuhan: "Hendaklah ada benda-benda penerang pada cakrawala langit untuk menerangi permukaan bumi dan untuk memisahkan antara siang dan malam."',
        philologicalCommentary:
          'Istilah "ጠፈረ፡ ሰማይ" (ṭafara samāy, bentangan/cakrawala langit) memiliki korelasi langsung dengan perhitungan kalender astronomis Enochian.',
      },
    ],
    annotations: [
      {
        id: 'ann-3',
        folioSide: 'VERSO',
        xPercent: 34,
        yPercent: 45,
        category: 'PALEOGRAFI',
        title: 'Koreksi Marginal Juru Tulis Kedua (Manus Secunda)',
        scholar: 'Dr. Yohanes Desta',
        peerReviewStatus: 'Disetujui Pendiri & Peer-Review (2026)',
        approvedByFounder: true,
        note: 'Pada margin kiri tampak penyisipan kata yang sempat terlewat akibat homoioteleuton.',
      },
    ],
  },
  {
    slotNumber: 3,
    orbitCode: 'ORBIT // 003',
    masterCodexTitle: 'Codex III: Arsip Peradaban',
    id: 'orbit-fol-15r',
    folioLabel: 'Slot 03 · Folio 15 Recto (15r)',
    side: 'RECTO',
    shelfmark: 'MS TBI-ORBIT-015R',
    century: 'Abad ke-15 M (Fragmen Kosmologi Enochian)',
    material: 'Perkamen Vellum, Tinta Besi-Galus & Diagram Astronomi',
    dimensionsMm: '345 × 260 mm',
    iiifManifestId: 'https://archive.tbi.org/iiif/v3/orbit-codex/manifest/folio-15r.json',
    imageUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
    verses: [
      {
        verseRef: 'Orbit Codex (Hukum Orbit Surya / Henokh 72:1)',
        folioSide: 'RECTO',
        geezScript: 'መጽሐፈ፡ ምዑዛተ፡ ብርሃናት፡ ዘሰማይ፡ በከመ፡ አርአየኒ፡ ኡራኤል፡ መልአክ፡ ቅዱስ።',
        transliteration: 'Maṣḥafa me‘uzāta berhānāt za-samāy ba-kama ’ar’ayani ’Urā’ēl mal’ak qeddus.',
        indonesianTranslation: 'Kitab peredaran benda-benda penerang langit sebagaimana ditunjukkan kepadaku oleh malaikat suci Uriel menurut hukum orbitnya.',
        philologicalCommentary: 'Menjelaskan enam gerbang timur dan enam gerbang barat tempat terbit dan terbenamnya matahari sepanjang tahun tropis.',
      },
    ],
    annotations: [
      {
        id: 'ann-4',
        folioSide: 'RECTO',
        xPercent: 50,
        yPercent: 50,
        category: 'FILOLOGI',
        title: 'Skema Enam Gerbang Orbit Surya',
        scholar: 'Dr. Elena Rostova',
        peerReviewStatus: 'Disetujui Pendiri (2026)',
        approvedByFounder: true,
        note: 'Diagram konsentris memetakan 364 hari kalender matahari.',
      },
    ],
  },
  {
    slotNumber: 4,
    orbitCode: 'ORBIT // 004',
    masterCodexTitle: 'Codex IV: Geometri Sakral',
    id: 'orbit-fol-15v',
    folioLabel: 'Slot 04 · Folio 15 Verso (15v)',
    side: 'VERSO',
    shelfmark: 'MS TBI-ORBIT-015V',
    century: 'Abad ke-15 M',
    material: 'Perkamen Vellum',
    dimensionsMm: '345 × 260 mm',
    iiifManifestId: 'https://archive.tbi.org/iiif/v3/orbit-codex/manifest/folio-15v.json',
    imageUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    verses: [
      {
        verseRef: 'Orbit Codex (Perjanjian Kebijaksanaan / Tekwin 9:13)',
        folioSide: 'VERSO',
        geezScript: 'ቀስትየ፡ አነብር፡ ውስተ፡ ደመና፡ ወይኩን፡ ትእምርተ፡ ኪዳን፡ ማእከሌየ፡ ወማእከለ፡ ምድር።',
        transliteration: 'Qasteya ’anabber westa damanā wa-yekun te’merta kidān mā’kalēya wa-mā’kala medr.',
        indonesianTranslation: 'Busur-Ku Kutaruh di awan, supaya menjadi tanda perjanjian abadi antara Aku dan bumi.',
        philologicalCommentary: 'Simbolisme busur cahaya spektral sebagai jembatan antara tatanan transenden dan tatanan terestrial.',
      },
    ],
    annotations: [],
  },
  {
    slotNumber: 5,
    orbitCode: 'ORBIT // 005',
    masterCodexTitle: 'Codex V: Fragmen Kedaulatan',
    id: 'orbit-fol-16r',
    folioLabel: 'Slot 05 · Folio 16 Recto (16r)',
    side: 'RECTO',
    shelfmark: 'MS TBI-ORBIT-016R',
    century: 'Abad ke-16 M (Restorasi Gondar)',
    material: 'Perkamen Vellum Tebal',
    dimensionsMm: '340 × 255 mm',
    iiifManifestId: 'https://archive.tbi.org/iiif/v3/orbit-codex/manifest/folio-16r.json',
    imageUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    verses: [
      {
        verseRef: 'Orbit Codex (Kidung Kemuliaan / Zäwät’a 15:11)',
        folioSide: 'RECTO',
        geezScript: 'መኑ፡ ከማከ፡ እግዚኦ፡ እምአማልክት፡ መኑ፡ ከማከ፡ ስቡሕ፡ በቅዱሳን።',
        transliteration: 'Mannu kamāka ’Egzi’o ’em-’amālekt, mannu kamāka sebuḥ ba-qeddusān.',
        indonesianTranslation: 'Siapakah yang seperti Engkau, ya Tuhan, mulia di dalam kekudusan dan mengagumkan dalam kemuliaan.',
        philologicalCommentary: 'Teks himne tertua dalam korpus Orit/Orbit.',
      },
    ],
    annotations: [],
  },
  {
    slotNumber: 6,
    orbitCode: 'ORBIT // 006',
    masterCodexTitle: 'Codex VI: Epilog Kemuliaan',
    id: 'orbit-fol-16v',
    folioLabel: 'Slot 06 · Folio 16 Verso (16v — Slot Kuota Ke-6)',
    side: 'VERSO',
    shelfmark: 'MS TBI-ORBIT-016V',
    century: 'Abad ke-16 M (Kolofon Penutup)',
    material: 'Perkamen Vellum & Segel Lilin Kuratorial',
    dimensionsMm: '340 × 255 mm',
    iiifManifestId: 'https://archive.tbi.org/iiif/v3/orbit-codex/manifest/folio-16v.json',
    imageUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    verses: [
      {
        verseRef: 'Orbit Codex (Kolofon Juru Tulis / Fol. 16v)',
        folioSide: 'VERSO',
        geezScript: 'ተፈጸመ፡ ዝንቱ፡ መጽሐፈ፡ ኦሪት፡ በሰላመ፡ እግዚአብሔር፡ አሜን።',
        transliteration: 'Tafaṣṣama zentu maṣḥafa ’Orit ba-salāma ’Egzi’abḥēr ’Amēn.',
        indonesianTranslation: 'Telah diselesaikan penulisan kitab kodeks ini di dalam damai sejahtera Tuhan, Amin.',
        philologicalCommentary: 'Menutup kuota 6 folio utama preservasi digital Yayasan TBI.',
      },
    ],
    annotations: [],
  },
];

// Keep backward-compatible alias for any references
export const ORIT_CODEX_FOLIOS = ORBIT_CODEX_FOLIOS;

// --- GOLDEN ENERGY: 2 TUJUAN PERSIMPANGAN (MOD-07-GOLDEN-ENERGY) ---

export type GoldenEnergyPathKey = 'Mandiri Kemuliaan' | 'Bertarung Matrix';

export interface GoldenEnergyPathway {
  id: string;
  key: GoldenEnergyPathKey;
  subtitle: string;
  archetype: string;
  accentHex: string;
  bannerImage: string;
  corePhilosophy: string;
  strategicPillars: { code: string; title: string; detail: string }[];
  doctrineExcerpt: string;
  recommendedCapsuleCode: ClassificationCode;
  recommendedShephirotNodeId: number;
}

export const GOLDEN_ENERGY_PATHWAYS: GoldenEnergyPathway[] = [
  {
    id: 'path-mandiri-kemuliaan',
    key: 'Mandiri Kemuliaan',
    subtitle: 'Jalur Kedaulatan Batin, Penciptaan Nilai Abadi & Kemandirian Peradaban',
    archetype: 'Pilar Konstruktif · Surya Tiphereth & Kemurahan Chesed',
    accentHex: '#151B8D',
    bannerImage: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    corePhilosophy:
      'Memilih untuk membangun otonomi kesadaran, kemandirian ekonomi-intelektual, dan institusi filantropis yang memancarkan ketertiban tanpa bergantung pada validasi sistem eksternal yang rapuh.',
    strategicPillars: [
      {
        code: 'MK-01',
        title: 'Otonomi Epistemik & Arsip Mandiri',
        detail: 'Menguasai sumber pengetahuan primer dan membangun perpustakaan lintas generasi.',
      },
      {
        code: 'MK-02',
        title: 'Kemandirian Ekonomi Berbasis Karya & Wakaf Abadi',
        detail: 'Menopang riset dan pelestarian peradaban melalui dana abadi yang bebas dari intervensi spekulatif.',
      },
      {
        code: 'MK-03',
        title: 'Radiasi Etika Kemuliaan (Tiphereth)',
        detail: 'Menyelaraskan ketajaman akal budi dengan keheningan batin untuk memimpin melalui keteladanan.',
      },
    ],
    doctrineExcerpt:
      '“Barangsiapa telah mendirikan kubah kemuliaan di dalam batin dan komunitasnya, ia tidak lagi terombang-ambing oleh pasang surut ilusi zaman; ia menjadi poros tempat cahaya pengetahuan berlabuh.”',
    recommendedCapsuleCode: 'KODE 1',
    recommendedShephirotNodeId: 6,
  },
  {
    id: 'path-bertarung-matrix',
    key: 'Bertarung Matrix',
    subtitle: 'Jalur Dekonstruksi Ilusi Sistemik, Ketajaman Kritis & Pembebasan Kesadaran',
    archetype: 'Pilar Analitis · Pedang Geburah & Presisi Hod',
    accentHex: '#0A0A0A',
    bannerImage: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
    corePhilosophy:
      'Memilih untuk terjun langsung ke jantung struktur informasi modern guna membedah disinformasi, membongkar manipulasi kognitif, dan menebas belenggu determinisme mekanis menggunakan presisi filologi dan logika.',
    strategicPillars: [
      {
        code: 'BM-01',
        title: 'Dekodifikasi Narasi & Kritik Teks (Geburah)',
        detail: 'Menguji setiap klaim otoritas dan algoritma populer dengan pisau analisis sumber primer.',
      },
      {
        code: 'BM-02',
        title: 'Ketahanan Kognitif & Disiplin Mental',
        detail: 'Melatih fokus mendalam (deep work) di tengah banjir distraksi artifisial.',
      },
      {
        code: 'BM-03',
        title: 'Rekayasa Balik Struktur Simbolik (Hod)',
        detail: 'Menggunakan instrumen teknologi dan kriptografi untuk melindungi kedaulatan kebenaran.',
      },
    ],
    doctrineExcerpt:
      '“Menghadapi labirin ilusi menuntut ketegasan pedang pembeda: mengenali mana hukum kosmis yang sejati dan mana jerat rekayasa yang memenjarakan kehendak bebas manusia.”',
    recommendedCapsuleCode: 'KODE 6',
    recommendedShephirotNodeId: 5,
  },
];

// --- 12 PILLARS DONOR REGISTRY (MOD-09-DONATUR) — QUOTA: 12 PILLARS ---

export const DONOR_PILLARS_QUOTA = 12;

export interface DonationRecord {
  id: string;
  date: string;
  category: 'NASKAH' | 'ARTEFAK' | 'DANA_ABADI';
  itemTitle: string;
  accessionCode: string;
  valuationOrScope: string;
  endowmentIdrAmount?: number;
  unitQuantity?: number;
}

export interface UserRatingRecord {
  userId: string;
  userName: string;
  userRole: string;
  donorId: string;
  stars: number; // Likert 1-5
  reviewText: string;
  updatedAt: string;
  moderatedStatus?: 'APPROVED' | 'FLAGGED';
}

export interface DonorFigure {
  pillarNumber: number; // 1 to 12 ("Energy 12 Donatur Peradaban Mulia")
  id: string;
  name: string;
  honorificTitle: string;
  affiliation: string;
  patronTier: string;
  zodiacOrSephiirahCorrelation: string;
  photoUrl: string;
  biographySummary: string;
  donations: DonationRecord[];
  ratings: UserRatingRecord[];
}

export const INITIAL_DONORS: DonorFigure[] = [
  {
    pillarNumber: 1,
    id: 'donor-01',
    name: 'K.R.T. Hendrajaya Kusumaningrat, Ph.D.',
    honorificTitle: 'Pilar I · Pelindung Utama Konservasi Perkamen',
    affiliation: 'Yayasan Pustaka Nusantara & Dewan Wali Amanat TBI',
    patronTier: 'Pilar 01 · Founding Patron',
    zodiacOrSephiirahCorrelation: 'Kether · Mahkota Wakaf Abadi',
    photoUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    biographySummary:
      'Kolektor filologi Semitik-Nusantara yang menghibahkan manuskrip abad ke-15 hingga ke-18 beserta fasilitas kamera multispektral untuk digitalisasi Orbit Codex.',
    donations: [
      {
        id: 'don-log-101',
        date: '2023-05-18',
        category: 'NASKAH',
        itemTitle: 'Hibah Folio Perkamen Orbit Codex (MS TBI-ORBIT-014R/V)',
        accessionCode: 'ACC.TBI.2023.05.001',
        valuationOrScope: 'Koleksi Inti IIIF v3 Resolusi Ultra-Tinggi',
      },
      {
        id: 'don-log-102',
        date: '2024-01-10',
        category: 'DANA_ABADI',
        itemTitle: 'Dana Abadi Preservasi & Enkripsi Server Arsip (Endowment Series A)',
        accessionCode: 'END.TBI.2024.01.004',
        valuationOrScope: 'Pendanaan Operasional Laboratorium 10 Tahun',
      },
    ],
    ratings: [
      {
        userId: 'scholar-arman',
        userName: 'Prof. Dr. H. Arman Wiryawan',
        userRole: 'Filolog Senior TBI',
        donorId: 'donor-01',
        stars: 5,
        reviewText:
          'Kontribusi K.R.T. Hendrajaya memungkinkan peneliti Indonesia mengakses langsung naskah Ge’ez abad ke-15 dengan kualitas pencitraan setara perpustakaan nasional Eropa.',
        updatedAt: '2026-02-14',
        moderatedStatus: 'APPROVED',
      },
    ],
  },
  {
    pillarNumber: 2,
    id: 'donor-02',
    name: 'Madam Clara von Berg-Lindqvist',
    honorificTitle: 'Pilar II · Kurator Kehormatan Arsip Hermetis Eropa',
    affiliation: 'Bibliotheca Hermetica Nordica (Stockholm – Zurich)',
    patronTier: 'Pilar 02 · Penyumbang Koleksi Khusus',
    zodiacOrSephiirahCorrelation: 'Chokmah · Kebijaksanaan Simbolik',
    photoUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    biographySummary:
      'Sejarawan seni esoteris yang menyumbangkan arsip keluarga berupa pelat litografi warna Tarot Golden Dawn tahun 1898 dan buku catatan ritual Ordo asli.',
    donations: [
      {
        id: 'don-log-201',
        date: '2024-08-22',
        category: 'ARTEFAK',
        itemTitle: '22 Pelat Simbol Tarot Hermetis & Kompas Kuningan Ritual Ordo (1896)',
        accessionCode: 'ACC.TBI.2024.08.019',
        valuationOrScope: 'Koleksi Khusus Golden Dawn Sub-Koleksi Tarot & Ritual',
      },
    ],
    ratings: [
      {
        userId: 'scholar-lukas',
        userName: 'Dr. Lukas Santoso',
        userRole: 'Kurator Simbolisme Visual',
        donorId: 'donor-02',
        stars: 5,
        reviewText:
          'Pelat Tarot Hermetis yang dihibahkan memiliki kejelasan garis dan pigmen warna asli yang sangat membantu pemetaan 22 jalur Shephirot.',
        updatedAt: '2026-01-29',
        moderatedStatus: 'APPROVED',
      },
    ],
  },
  {
    pillarNumber: 3,
    id: 'donor-03',
    name: 'Prof. Emeritus Dr. Yohanes Desta & Keluarga',
    honorificTitle: 'Pilar III · Penyumbang Korpus Filologi Semitik',
    affiliation: 'Institut Studi Oriental & Klasik',
    patronTier: 'Pilar 03 · Mitra Filantropi Akademis',
    zodiacOrSephiirahCorrelation: 'Binah · Arsitektur Bahasa',
    photoUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
    biographySummary:
      'Pakar linguistik Semitik yang menghibahkan ribuan kartu leksikon Ge’ez–Ibrani–Arab serta mendanai program terjemahan kritis ke dalam Bahasa Indonesia.',
    donations: [
      {
        id: 'don-log-301',
        date: '2025-11-04',
        category: 'NASKAH',
        itemTitle: 'Korpus Konkordansi Leksikal Ge’ez–Ibrani (6 Jilid Kritis)',
        accessionCode: 'ACC.TBI.2025.11.012',
        valuationOrScope: 'Basis Data Terjemahan TBI/KODE 6',
      },
    ],
    ratings: [
      {
        userId: 'scholar-arman',
        userName: 'Prof. Dr. H. Arman Wiryawan',
        userRole: 'Filolog Senior TBI',
        donorId: 'donor-03',
        stars: 5,
        reviewText:
          'Ketelitian leksikon Prof. Desta menjadi tulang punggung edisi komparatif Ge’ez–Indonesia pada portal ini.',
        updatedAt: '2026-02-20',
        moderatedStatus: 'APPROVED',
      },
    ],
  },
  {
    pillarNumber: 4,
    id: 'donor-04',
    name: 'Ir. Bagaskara Putra, M.Sc.',
    honorificTitle: 'Pilar IV · Pelopor Infrastruktur Enkripsi & PDF/A',
    affiliation: 'Konsorsium Teknologi Arsip Kedaulatan',
    patronTier: 'Pilar 04 · Patron Teknologi Preservasi',
    zodiacOrSephiirahCorrelation: 'Chesed · Konstruksi Sistem',
    photoUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    biographySummary:
      'Arsitek sistem penyimpanan dingin (cold-storage) dan enkripsi dokumen PDF/A-1b untuk melindungi transmisi naskah KODE 1 hingga KODE 6.',
    donations: [
      {
        id: 'don-log-401',
        date: '2025-01-15',
        category: 'DANA_ABADI',
        itemTitle: 'Hibah Klaster Server Kriptografi & Penyimpanan Redundan 100TB',
        accessionCode: 'END.TBI.2025.01.008',
        valuationOrScope: 'Infrastruktur Inti TBI-ARCHIVE-SYSTEM v4.0',
      },
    ],
    ratings: [],
  },
  {
    pillarNumber: 5,
    id: 'donor-05',
    name: 'R.A. Kartika Wijayanti, S.Sn., M.A.',
    honorificTitle: 'Pilar V · Kurator Restorasi Kertas Nusantara',
    affiliation: 'Balai Konservasi Warisan Aksara',
    patronTier: 'Pilar 05 · Donatur Restorasi Fisik',
    zodiacOrSephiirahCorrelation: 'Geburah · Disiplin Konservasi',
    photoUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    biographySummary:
      'Menyumbangkan peralatan deasidifikasi kertas bebas asam dan memimpin penyelamatan 38 naskah lontar serta daluang.',
    donations: [
      {
        id: 'don-log-501',
        date: '2025-04-09',
        category: 'ARTEFAK',
        itemTitle: 'Unit Ruang Kelembaban Terkendali & Meja Restorasi Serat',
        accessionCode: 'ACC.TBI.2025.04.003',
        valuationOrScope: 'Laboratorium Preservasi Fisik Lapis II',
      },
    ],
    ratings: [],
  },
  {
    pillarNumber: 6,
    id: 'donor-06',
    name: 'Dr. Alexander V. Sterling',
    honorificTitle: 'Pilar VI · Kolektor Pelat Kosmologi Renaisans',
    affiliation: 'Societas Artis et Scientiae (London)',
    patronTier: 'Pilar 06 · Penyumbang Koleksi Seni Sakral',
    zodiacOrSephiirahCorrelation: 'Tiphereth · Harmoni Proporsi Emas',
    photoUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
    biographySummary:
      'Menghibahkan cetakan asli diagram kosmologi Robert Fludd dan Athanasius Kircher untuk Modul Galeri Seni Visual Terkurasi.',
    donations: [
      {
        id: 'don-log-601',
        date: '2025-06-20',
        category: 'ARTEFAK',
        itemTitle: '6 Pelat Tembaga Asli Harmonia Mundi & Utriusque Cosmi (1617)',
        accessionCode: 'ACC.TBI.2025.06.011',
        valuationOrScope: 'Koleksi Sumber Universal (MOD-03-ART-GALLERY)',
      },
    ],
    ratings: [],
  },
  {
    pillarNumber: 7,
    id: 'donor-07',
    name: 'H. Sulaiman Al-Farisi, Lc., M.Phil.',
    honorificTitle: 'Pilar VII · Pengampu Studi Hikmah & Falsafah Timur Tengah',
    affiliation: 'Majelis Kajian Manuskrip Klasik Kairo–Jakarta',
    patronTier: 'Pilar 07 · Donatur Manuskrip Timur Dekat',
    zodiacOrSephiirahCorrelation: 'Netzach · Keabadian Hikmah',
    photoUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    biographySummary:
      'Menghibahkan salinan risalah optik dan kosmologi cahaya Suhrawardi (Hikmat al-Ishraq) abad ke-17.',
    donations: [
      {
        id: 'don-log-701',
        date: '2025-07-12',
        category: 'NASKAH',
        itemTitle: 'Manuskrip Syarah Hikmat al-Ishraq (Folio Kaligrafi Naskhi 1674)',
        accessionCode: 'ACC.TBI.2025.07.014',
        valuationOrScope: 'Koleksi Primer TBI/KODE 1 & KODE 2',
      },
    ],
    ratings: [],
  },
  {
    pillarNumber: 8,
    id: 'donor-08',
    name: 'Prof. Dr. Ing. Bernardus Gunawan',
    honorificTitle: 'Pilar VIII · Donatur Sinematografi Dokumenter 4K',
    affiliation: 'Lembaga Dokumentasi Sains & Budaya',
    patronTier: 'Pilar 08 · Pelindung Media Edukasi',
    zodiacOrSephiirahCorrelation: 'Hod · Transmisi Audio-Visual',
    photoUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    biographySummary:
      'Mendanai produksi 30 slot film dokumenter bedah naskah kuno dan kuliah sejarah esoteris pada Modul Media Video.',
    donations: [
      {
        id: 'don-log-801',
        date: '2025-08-30',
        category: 'DANA_ABADI',
        itemTitle: 'Dana Produksi 30 Slot Curated Cinema Grid (HLS 4K Stream)',
        accessionCode: 'END.TBI.2025.08.009',
        valuationOrScope: 'Pendanaan Penuh Modul Media Video (MOD-06-VIDEO)',
      },
    ],
    ratings: [],
  },
  {
    pillarNumber: 9,
    id: 'donor-09',
    name: 'Dewan Keluarga Besar Wiryawan-Suryaningrat',
    honorificTitle: 'Pilar IX · Penjaga Amanat Arsip Lingkar Dalam',
    affiliation: 'Wali Amanat Pendiri TBI',
    patronTier: 'Pilar 09 · Penyangga Fondasi Yayasan',
    zodiacOrSephiirahCorrelation: 'Yesod · Fondasi Transmisi',
    photoUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    biographySummary:
      'Menyerahkan kotak arsip besi berisi korespondensi pendiri tahun 1928–1984 untuk dikodifikasikan dalam TBI/KODE 5.',
    donations: [
      {
        id: 'don-log-901',
        date: '2025-09-17',
        category: 'NASKAH',
        itemTitle: '47 Berkas Korespondensi Historis & Telegram Sandi Pendiri',
        accessionCode: 'ACC.TBI.2025.09.021',
        valuationOrScope: 'Koleksi Rahasia TBI/KODE 5',
      },
    ],
    ratings: [],
  },
  {
    pillarNumber: 10,
    id: 'donor-10',
    name: 'Dr. Med. Nadia Pramesti, Sp.S.',
    honorificTitle: 'Pilar X · Pelindung Riset Neuro-Kognitif & Kontemplasi',
    affiliation: 'Pusat Studi Kesadaran & Epistemologi',
    patronTier: 'Pilar 10 · Mitra Riset Interdisipliner',
    zodiacOrSephiirahCorrelation: 'Malkuth · Manifestasi Empiris',
    photoUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    biographySummary:
      'Mendukung penelitian ilmiah mengenai dampak latihan geometri sakral dan pembacaan naskah kontemplatif terhadap ketahanan kognitif.',
    donations: [
      {
        id: 'don-log-1001',
        date: '2025-10-25',
        category: 'DANA_ABADI',
        itemTitle: 'Hibah Riset Laboratorium Kognitif Jalur Mandiri Kemuliaan',
        accessionCode: 'END.TBI.2025.10.012',
        valuationOrScope: 'Program Riset MOD-07-GOLDEN-ENERGY',
      },
    ],
    ratings: [],
  },
  {
    pillarNumber: 11,
    id: 'donor-11',
    name: 'Arsitek Utama T.M. Dananjaya, IAI',
    honorificTitle: 'Pilar XI · Perancang Ruang Baca & Kubah Arsip Fisik',
    affiliation: 'Studio Arsitektur Sakral Nusantara',
    patronTier: 'Pilar 11 · Donatur Infrastruktur Ruang',
    zodiacOrSephiirahCorrelation: 'Da’ath · Sintesis Ruang Pengetahuan',
    photoUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
    biographySummary:
      'Merancang secara pro-bono tata akustik, pencahayaan museum, dan proporsi geometri ruang baca utama Yayasan TBI.',
    donations: [
      {
        id: 'don-log-1101',
        date: '2026-01-05',
        category: 'ARTEFAK',
        itemTitle: 'Cetak Biru Arsitektur Kubah Perpustakaan & Panel Akustik',
        accessionCode: 'ACC.TBI.2026.01.002',
        valuationOrScope: 'Gedung Utama The Brothers Influence',
      },
    ],
    ratings: [],
  },
  {
    pillarNumber: 12,
    id: 'donor-12',
    name: 'Kolektif Peneliti & Filantropis Muda TBI',
    honorificTitle: 'Pilar XII · Penjaga Keberlanjutan Generasi Baru',
    affiliation: 'Jaringan Alumni & Peneliti Muda TBI Lintas Benua',
    patronTier: 'Pilar 12 · Wakaf Kolektif Peradaban Mulia',
    zodiacOrSephiirahCorrelation: 'Horizon Kosmis · Keberlanjutan Abad ke-21',
    photoUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    biographySummary:
      'Menghimpun kontribusi kolektif dari 240 peneliti muda untuk memastikan akses terbuka atas modul edukasi publik TBI.',
    donations: [
      {
        id: 'don-log-1201',
        date: '2026-02-28',
        category: 'DANA_ABADI',
        itemTitle: 'Dana Abadi Akses Terbuka & Beasiswa Transliterasi Naskah',
        accessionCode: 'END.TBI.2026.02.015',
        valuationOrScope: 'Beasiswa Tahunan Peneliti Filologi',
      },
    ],
    ratings: [],
  },
];

export interface RatingMetrics {
  averageStars: number;
  totalCount: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function calculateDonorRatingMetrics(ratings: UserRatingRecord[]): RatingMetrics {
  const activeRatings = ratings.filter((r) => r.moderatedStatus !== 'FLAGGED');
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (activeRatings.length === 0) {
    return { averageStars: 0, totalCount: 0, distribution };
  }
  let sum = 0;
  for (const r of activeRatings) {
    const clamped = Math.min(5, Math.max(1, Math.round(r.stars))) as 1 | 2 | 3 | 4 | 5;
    distribution[clamped] += 1;
    sum += clamped;
  }
  const averageStars = Number((sum / activeRatings.length).toFixed(2));
  return {
    averageStars,
    totalCount: activeRatings.length,
    distribution,
  };
}

export function upsertDonorRating(
  donors: DonorFigure[],
  payload: {
    userId: string;
    userName: string;
    userRole: string;
    donorId: string;
    stars: number;
    reviewText: string;
    timestampIso: string;
  }
): { donors: DonorFigure[]; wasUpdated: boolean; error?: string } {
  if (!payload.userId || !payload.userId.trim()) {
    return { donors, wasUpdated: false, error: 'Autentikasi diperlukan untuk memberikan rating.' };
  }
  if (!Number.isInteger(payload.stars) || payload.stars < 1 || payload.stars > 5) {
    return { donors, wasUpdated: false, error: 'Skala rating wajib berupa bilangan bulat Likert 1 hingga 5 bintang.' };
  }
  const trimmedReview = payload.reviewText.trim();
  if (trimmedReview.length < 10) {
    return { donors, wasUpdated: false, error: 'Ulasan lapangan (field review) minimal terdiri dari 10 karakter.' };
  }

  let wasUpdated = false;
  const updatedDonors = donors.map((donor) => {
    if (donor.id !== payload.donorId) return donor;

    const existingIndex = donor.ratings.findIndex((r) => r.userId === payload.userId);
    const newRecord: UserRatingRecord = {
      userId: payload.userId,
      userName: payload.userName.trim() || 'Peneliti Terautentikasi',
      userRole: payload.userRole.trim() || 'Anggota Terverifikasi TBI',
      donorId: payload.donorId,
      stars: payload.stars,
      reviewText: trimmedReview,
      updatedAt: payload.timestampIso,
      moderatedStatus: 'APPROVED',
    };

    let nextRatings: UserRatingRecord[];
    if (existingIndex >= 0) {
      wasUpdated = true;
      nextRatings = donor.ratings.map((item, idx) => (idx === existingIndex ? newRecord : item));
    } else {
      nextRatings = [newRecord, ...donor.ratings];
    }

    return {
      ...donor,
      ratings: nextRatings,
    };
  });

  return { donors: updatedDonors, wasUpdated };
}

export interface SupportLedgerMetrics {
  totalDanaAbadiIdr: number;
  formattedDanaAbadiIdr: string;
  danaAbadiLogCount: number;
  totalNaskahVolume: number;
  naskahLogCount: number;
  totalArtefakUnits: number;
  artefakLogCount: number;
  totalContributionsCount: number;
}

const DEFAULT_ENDOWMENT_BY_LOG_ID: Record<string, number> = {
  'don-log-102': 4500000000,
  'don-log-401': 3200000000,
  'don-log-801': 2850000000,
  'don-log-1001': 1900000000,
  'don-log-1201': 2400000000,
};

const DEFAULT_NASKAH_UNITS_BY_LOG_ID: Record<string, number> = {
  'don-log-101': 6,
  'don-log-301': 18,
  'don-log-701': 12,
  'don-log-901': 47,
};

const DEFAULT_ARTEFAK_UNITS_BY_LOG_ID: Record<string, number> = {
  'don-log-201': 23,
  'don-log-501': 4,
  'don-log-601': 6,
  'don-log-1101': 3,
};

export function formatIdrCurrency(amount: number): string {
  const safe = Math.max(0, Math.round(amount));
  return 'Rp ' + safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function calculateSupportLedgerMetrics(donors: DonorFigure[]): SupportLedgerMetrics {
  let totalDanaAbadiIdr = 0;
  let danaAbadiLogCount = 0;
  let totalNaskahVolume = 0;
  let naskahLogCount = 0;
  let totalArtefakUnits = 0;
  let artefakLogCount = 0;

  for (const donor of donors) {
    for (const rec of donor.donations) {
      if (rec.category === 'DANA_ABADI') {
        danaAbadiLogCount += 1;
        const amt =
          typeof rec.endowmentIdrAmount === 'number'
            ? rec.endowmentIdrAmount
            : DEFAULT_ENDOWMENT_BY_LOG_ID[rec.id] ?? 250000000;
        totalDanaAbadiIdr += amt;
      } else if (rec.category === 'NASKAH') {
        naskahLogCount += 1;
        const qty =
          typeof rec.unitQuantity === 'number'
            ? rec.unitQuantity
            : DEFAULT_NASKAH_UNITS_BY_LOG_ID[rec.id] ?? 1;
        totalNaskahVolume += qty;
      } else if (rec.category === 'ARTEFAK') {
        artefakLogCount += 1;
        const qty =
          typeof rec.unitQuantity === 'number'
            ? rec.unitQuantity
            : DEFAULT_ARTEFAK_UNITS_BY_LOG_ID[rec.id] ?? 1;
        totalArtefakUnits += qty;
      }
    }
  }

  return {
    totalDanaAbadiIdr,
    formattedDanaAbadiIdr: formatIdrCurrency(totalDanaAbadiIdr),
    danaAbadiLogCount,
    totalNaskahVolume,
    naskahLogCount,
    totalArtefakUnits,
    artefakLogCount,
    totalContributionsCount: danaAbadiLogCount + naskahLogCount + artefakLogCount,
  };
}

export function submitSupportContribution(
  donors: DonorFigure[],
  payload: {
    donorId: string;
    category: 'DANA_ABADI' | 'NASKAH' | 'ARTEFAK';
    itemTitle: string;
    valuationOrScope: string;
    endowmentIdrAmount?: number;
    unitQuantity?: number;
    dateIso?: string;
  }
): { donors: DonorFigure[]; addedRecord?: DonationRecord; error?: string } {
  const cleanTitle = payload.itemTitle.trim();
  const cleanScope = payload.valuationOrScope.trim();
  if (!cleanTitle || cleanTitle.length < 5) {
    return {
      donors,
      error: 'Judul atau deskripsi hibah/donasi wajib diisi (minimal 5 karakter).',
    };
  }
  if (!cleanScope) {
    return {
      donors,
      error: 'Cakupan peruntukan atau keterangan provenance wajib diisi.',
    };
  }
  if (payload.category === 'DANA_ABADI') {
    const amt = Number(payload.endowmentIdrAmount);
    if (!Number.isFinite(amt) || amt <= 0) {
      return {
        donors,
        error: 'Nominal Dana Abadi wajib lebih besar dari Rp 0.',
      };
    }
  } else {
    const qty = Number(payload.unitQuantity);
    if (!Number.isFinite(qty) || qty < 1) {
      return {
        donors,
        error: 'Jumlah unit Naskah atau Artefak minimal 1 unit.',
      };
    }
  }

  const targetDonor = donors.find((d) => d.id === payload.donorId) || donors[0];
  const prefix = payload.category === 'DANA_ABADI' ? 'END' : 'ACC';
  const seq = String(targetDonor.donations.length + 1).padStart(3, '0');
  const addedRecord: DonationRecord = {
    id: `don-log-${Date.now()}`,
    date: payload.dateIso || '2026-11-04',
    category: payload.category,
    itemTitle: cleanTitle,
    accessionCode: `${prefix}.TBI.2026.P${String(targetDonor.pillarNumber).padStart(2, '0')}.${seq}`,
    valuationOrScope: cleanScope,
    endowmentIdrAmount:
      payload.category === 'DANA_ABADI' ? Math.round(Number(payload.endowmentIdrAmount)) : undefined,
    unitQuantity:
      payload.category !== 'DANA_ABADI' ? Math.round(Number(payload.unitQuantity)) : undefined,
  };

  const updatedDonors = donors.map((d) =>
    d.id === targetDonor.id
      ? {
          ...d,
          donations: [addedRecord, ...d.donations],
        }
      : d
  );

  return { donors: updatedDonors, addedRecord };
}

// --- ART GALLERY (MOD-03-ART-GALLERY) ---

export type ArtCategoryId = 'ART-FREE' | 'ART-GLORY' | 'ART-UNIVERSAL';

export interface ArtGalleryItem {
  id: string;
  scrollOrder: number;
  categoryId: ArtCategoryId;
  categoryName: 'Gambar Gratis' | 'Energi Kemuliaan' | 'Sumber Universal';
  title: string;
  artistOrSource: string;
  year: string;
  licenseOrTheme: string;
  fileType: 'JPG' | 'PNG' | 'SVG' | 'WEBP' | 'TIFF';
  resolution: string;
  accessionNumber: string;
  imageUrl: string;
  description: string;
}

export const ART_GALLERY_ITEMS: ArtGalleryItem[] = [
  {
    id: 'art-101',
    scrollOrder: 1,
    categoryId: 'ART-GLORY',
    categoryName: 'Energi Kemuliaan',
    title: 'Atrium Lux Divina: Pancaran Geometri Sakral di Bawah Kubah',
    artistOrSource: 'Koleksi Kuratorial Metafisika TBI',
    year: '2025',
    licenseOrTheme: 'Metafisika, Simbolisme Keagungan, Cahaya Ilahi',
    fileType: 'WEBP',
    resolution: '4096 × 3072 px',
    accessionNumber: 'ACC.ART.GLORY.01',
    imageUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    description:
      'Representasi visual turunnya berkas cahaya lapis lazuli (#151B8D) dan struktur kisi emas melalui okulus arsitektur klasik, melambangkan iluminasi intelektual.',
  },
  {
    id: 'art-102',
    scrollOrder: 2,
    categoryId: 'ART-UNIVERSAL',
    categoryName: 'Sumber Universal',
    title: 'Harmonia Mundi & Cosmologica Divina (Pelat Kubus Metatron)',
    artistOrSource: 'Studio Kartografi Kosmologis TBI',
    year: '2024',
    licenseOrTheme: 'Kosmologi, Fraktal Alam Semesta, Geometri Sakral',
    fileType: 'TIFF',
    resolution: '6400 × 4800 px (16-bit Archival Master)',
    accessionNumber: 'ACC.ART.UNIV.01',
    imageUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
    description:
      'Ukiran pelat tembaga yang memadukan lima bangun ruang Platonik, spiral proporsi emas (Ratio Aurea), dan koordinat astrolab bintang tetap.',
  },
  {
    id: 'art-103',
    scrollOrder: 3,
    categoryId: 'ART-FREE',
    categoryName: 'Gambar Gratis',
    title: 'Diagram Vektor Pohon Kehidupan Kircher & 22 Jalur Huruf',
    artistOrSource: 'Unit Dokumentasi Terbuka TBI',
    year: '2026',
    licenseOrTheme: 'Creative Commons CC0 / Public Domain',
    fileType: 'SVG',
    resolution: 'Vektor Tak Terbatas (Scalable Vector)',
    accessionNumber: 'ACC.ART.FREE.01',
    imageUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    description:
      'Rekonstruksi bersih skema Athanasius Kircher (Oedipus Aegyptiacus, 1652) yang dibebaskan ke domain publik untuk keperluan pengajaran akademis.',
  },
  {
    id: 'art-104',
    scrollOrder: 4,
    categoryId: 'ART-FREE',
    categoryName: 'Gambar Gratis',
    title: 'Faksimili Ornamen Harag Ge’ez (Studi Pigmen Terbuka)',
    artistOrSource: 'Arsip Digital Aksumit Terbuka',
    year: '2025',
    licenseOrTheme: 'Creative Commons Attribution 4.0 (CC-BY)',
    fileType: 'PNG',
    resolution: '3200 × 4200 px',
    accessionNumber: 'ACC.ART.FREE.02',
    imageUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    description:
      'Potongan resolusi tinggi ornamen kepala naskah Orbit Codex untuk studi tipografi dan seni iluminasi manuskrip Afrika Timur.',
  },
];

// --- GOLDEN DAWN SPECIAL COLLECTION (MOD-08-GOLDEN-DAWN) ---

export type GoldenDawnSubId = 'gd-history' | 'gd-tarot' | 'gd-rituals';

export interface GoldenDawnRecord {
  id: string;
  subCollectionId: GoldenDawnSubId;
  subCollectionName: string;
  cipherCode: string;
  title: string;
  yearOriginated: string;
  gradeCorrelation: string;
  summary: string;
  archivalExcerpt: string;
  shephirotRefNodeId: number;
  diagramUrl: string;
}

export const GOLDEN_DAWN_RECORDS: GoldenDawnRecord[] = [
  {
    id: 'gd-doc-01',
    subCollectionId: 'gd-history',
    subCollectionName: 'Arsip Historis & Dokumen Ordo',
    cipherCode: 'GD-HIST-1888-A',
    title: 'The Cipher Manuscript (Folios 1–59): Analisis Kriptografi Trithemius',
    yearOriginated: '1887–1888 (Kuil Isis-Urania No. 3, London)',
    gradeCorrelation: '0°=0° Neophyte hingga 4°=7° Philosophus',
    summary:
      'Dokumentasi historis mengenai dekodifikasi naskah sandi Kenneth Mackenzie oleh Dr. William Wynn Westcott dan S.L. MacGregor Mathers menggunakan polialfabet Johannes Trithemius.',
    archivalExcerpt:
      '“Setiap huruf sandi diambil dari tabel pergantian dua puluh empat alfabet dalam Polygraphiae Libri Sex (1518), membentuk kerangka ritus inisiasi lima derajat pertama...”',
    shephirotRefNodeId: 3,
    diagramUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
  },
  {
    id: 'gd-doc-02',
    subCollectionId: 'gd-history',
    subCollectionName: 'Arsip Historis & Dokumen Ordo',
    cipherCode: 'GD-HIST-1892-B',
    title: 'Piagam Konstitusi Ordo Kedua (Rosae Rubeae et Aureae Crucis)',
    yearOriginated: '1892 (Vault of the Adepts)',
    gradeCorrelation: '5°=6° Adeptus Minor (Tiphereth)',
    summary:
      'Catatan administratif dan kurikulum pengajaran internal setelah pembentukan Ordo Kedua yang berpusat pada simpul Tiphereth.',
    archivalExcerpt:
      '“Seorang Adeptus Minor diwajibkan menguasai korelasi lengkap antara huruf Ibrani, jalur pohon kehidupan, dan geometri ruang poligram...”',
    shephirotRefNodeId: 6,
    diagramUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
  },
  {
    id: 'gd-doc-03',
    subCollectionId: 'gd-tarot',
    subCollectionName: 'Sistem Simbol Tarot Hermetis',
    cipherCode: 'GD-TAROT-BOOK-T',
    title: 'Liber T: Deskripsi Esoteris 78 Lembar Tarot & Atribusi 22 Jalur',
    yearOriginated: '1891 (Katalog Kurikulum Internal)',
    gradeCorrelation: 'Ordo Kedua — Studi Simbolisme & Skala Warna Empat Dunia',
    summary:
      'Menggeser atribusi kontinental Prancis (Eliphas Lévi) dengan menempatkan Kartu 0 (The Fool / Aleph) pada Jalur ke-11 antara Kether dan Chokmah.',
    archivalExcerpt:
      '“Kunci ke-11 (Aleph): Pangeran Kereta Angin. Tangan kanannya memegang tongkat cahaya vertikal, sedangkan tangan kirinya menunjuk ke arah manifestasi di bawah...”',
    shephirotRefNodeId: 2,
    diagramUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
  },
  {
    id: 'gd-doc-04',
    subCollectionId: 'gd-tarot',
    subCollectionName: 'Sistem Simbol Tarot Hermetis',
    cipherCode: 'GD-TAROT-COLOR-SCALE',
    title: 'Empat Skala Warna (Raja, Ratu, Pangeran, Putri) pada Pohon Kehidupan',
    yearOriginated: '1895',
    gradeCorrelation: 'Theoricus Adeptus Minor',
    summary:
      'Kanonisasi palet warna Atziluth, Briah, Yetzirah, dan Assiah yang digunakan dalam pembuatan kartu Tarot secara manual oleh anggota Ordo.',
    archivalExcerpt:
      '“Setiap kartu dilukis di atas latar warna komplementer agar mata batin menangkap getaran kromatik jalur yang bersangkutan...”',
    shephirotRefNodeId: 7,
    diagramUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
  },
  {
    id: 'gd-doc-05',
    subCollectionId: 'gd-rituals',
    subCollectionName: 'Naskah Ritual & Transkripsi Asli',
    cipherCode: 'GD-RIT-Z1-NEOPHYTE',
    title: 'Dokumen Z-1 & Z-3: Simbolisme Kuil Neophyte & Pilar Kembar',
    yearOriginated: '1893',
    gradeCorrelation: '5°=6° Komentar Ritual Tingkat Tinggi',
    summary:
      'Transkripsi lengkap tata letak ruang antara Pilar Hitam (Boaz / Ketegasan) dan Pilar Putih (Jachin / Kemurahan) beserta pergerakan hierofant.',
    archivalExcerpt:
      '“Di antara kedua pilar berdiri keseimbangan jalan tengah; tidak seorang pun dapat melangkah menuju altar Timur tanpa menyelaraskan oposisi biner...”',
    shephirotRefNodeId: 1,
    diagramUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
  },
  {
    id: 'gd-doc-06',
    subCollectionId: 'gd-rituals',
    subCollectionName: 'Naskah Ritual & Transkripsi Asli',
    cipherCode: 'GD-RIT-ROSE-CROSS',
    title: 'Transkripsi Ritual Rose Cross & Geometri Heksagram Harmonik',
    yearOriginated: '1894',
    gradeCorrelation: '5°=6° Adeptus Minor',
    summary:
      'Analisis geometris atas penarikan garis salib dan lingkaran mawar sebagai instrumen penyegelan ruang kontemplatif.',
    archivalExcerpt:
      '“Pusat salib berimpit dengan Tiphereth, memancarkan keseimbangan harmonis ke enam arah ruang...”',
    shephirotRefNodeId: 8,
    diagramUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
  },
];

// --- EDUCATIONAL VIDEO MEDIA (MOD-06-VIDEO) — QUOTA: 30 SLOTS ---

export const VIDEO_SLOTS_QUOTA = 30;

export type VideoCategory =
  | 'Bedah Naskah Kuno'
  | 'Kuliah Sejarah Esoteris'
  | 'Dokumenter Preservasi Pustaka';

export interface EducationalVideoItem {
  slotNumber: number; // 1 to 30
  id: string;
  category: VideoCategory;
  code: string;
  title: string;
  speaker: string;
  duration: string;
  streamProtocol: string;
  resolution: string;
  recordedDate: string;
  thumbnailUrl: string;
  synopsis: string;
  chapters: { time: string; label: string; summary: string }[];
  transcriptPreview: string;
}

export const EDUCATIONAL_VIDEOS: EducationalVideoItem[] = [
  {
    slotNumber: 1,
    id: 'vid-01',
    category: 'Bedah Naskah Kuno',
    code: 'TBI-HLS-SLOT-01',
    title: 'Bedah Kodeks Orbit Folio 14r: Paleografi Ge’ez & Pigmen Iluminasi Harag',
    speaker: 'Dr. Yohanes Desta & Prof. Dr. H. Arman Wiryawan',
    duration: '42:18',
    streamProtocol: 'HLS Adaptive Bitrate (m3u8 / 4K Archival Stream)',
    resolution: '2160p UHD 60fps',
    recordedDate: '12 Februari 2026',
    thumbnailUrl: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    synopsis:
      'Pemeriksaan mikroskopis langsung atas lembaran perkamen abad ke-15 dari dataran tinggi Ethiopia, membedah teknik penulisan pena buluh dan struktur tata bahasa Ge’ez klasik.',
    chapters: [
      { time: '00:00', label: 'Pembukaan & Silsilah Akuisisi Kodeks', summary: 'Menelusuri perjalanan naskah dari Biara Debre Hayq hingga repositori TBI.' },
      { time: '11:24', label: 'Analisis Kimiawi Tinta Besi-Galus & Cinnabar', summary: 'Demonstrasi pencitraan spektrum ultraviolet pada rubrikasi merah.' },
      { time: '26:40', label: 'Pembacaan Komparatif Kejadian 1:1–4', summary: 'Perbandingan tekstual antara Ge’ez, Ibrani Masoretik, dan Septuaginta.' },
    ],
    transcriptPreview:
      '“Perhatikan bagaimana juru tulis abad ke-15 ini menjaga proporsi tinggi huruf በ (Ba) tepat tiga kali lebar mata pena buluh, menciptakan ritme visual yang memudahkan pembacaan liturgis dalam pencahayaan lilin...”',
  },
  {
    slotNumber: 2,
    id: 'vid-02',
    category: 'Kuliah Sejarah Esoteris',
    code: 'TBI-HLS-SLOT-02',
    title: 'Arsitektur Pohon Kehidupan: Dari Sefer Yetzirah hingga Diagram Kircher 1652',
    speaker: 'Dr. Elena Rostova',
    duration: '56:05',
    streamProtocol: 'HLS Adaptive Bitrate (m3u8 / 1080p)',
    resolution: '1080p FHD',
    recordedDate: '28 Januari 2026',
    thumbnailUrl: '/src/assets/images/art_sumber_universal_1793727763347.jpg',
    synopsis:
      'Kuliah komprehensif mengenai evolusi topologi 10 Sephiroth dan 22 jalur penghubung dari naskah Safed abad ke-16 hingga sintesis hermetis modern.',
    chapters: [
      { time: '00:00', label: 'Konsep Sepuluh Angka Ideal (Sefirot Belimah)', summary: 'Memahami perbedaan antara angka kuantitatif dan prinsip ontologis.' },
      { time: '19:15', label: 'Tiga Pilar: Rahmat, Ketegasan, dan Keseimbangan', summary: 'Mengapa struktur simetri bilateral menjadi kunci filsafat esoteris-realis.' },
      { time: '38:50', label: 'Integrasi 22 Huruf dan Simbolisme Tarot', summary: 'Bedah naskah Liber T dalam Koleksi Khusus Golden Dawn.' },
    ],
    transcriptPreview:
      '“Diagram yang kita lihat pada modul Peta Interaktif Shephirot bukanlah sekadar grafik statis, melainkan peta relasional yang menghubungkan etika, kosmologi, dan metodologi berpikir...”',
  },
  {
    slotNumber: 3,
    id: 'vid-03',
    category: 'Dokumenter Preservasi Pustaka',
    code: 'TBI-HLS-SLOT-03',
    title: 'Di Balik Kubah Arsip TBI: Standar PDF/A, IIIF v3, dan Restorasi Kertas Abad ke-17',
    speaker: 'Ir. Bagaskara Putra, M.Sc. & Tim Konservasi TBI',
    duration: '34:50',
    streamProtocol: 'HLS Adaptive Bitrate (m3u8 / 4K)',
    resolution: '2160p UHD',
    recordedDate: '04 Maret 2026',
    thumbnailUrl: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    synopsis:
      'Dokumenter laboratorium konservasi The Brothers Influence yang memperlihatkan proses deasidifikasi kertas, pemindaian nirsentuh, dan penguncian kriptografi SHA-256.',
    chapters: [
      { time: '00:00', label: 'Pengendalian Suhu 18°C & Kelembaban Relatif 45%', summary: 'Infrastruktur fisik ruang penyimpanan naskah primer KODE 1.' },
      { time: '14:10', label: 'Pemindaian DeepZoom & Pembuatan Manifest IIIF v3', summary: 'Proses mengubah satu lembaran perkamen menjadi ribuan ubin piksel mikro.' },
      { time: '25:30', label: 'Arsitektur Streaming Terenkripsi Tanpa Unduhan Mentah', summary: 'Menjaga kedaulatan hak cipta dan keamanan transmisi arsip.' },
    ],
    transcriptPreview:
      '“Setiap naskah yang dipindai pada resolusi 1200 DPI menghasilkan berkas master TIFF tak terkompresi yang kemudian disajikan melalui protokol IIIF Presentation API versi 3...”',
  },
  {
    slotNumber: 4,
    id: 'vid-04',
    category: 'Kuliah Sejarah Esoteris',
    code: 'TBI-HLS-SLOT-04',
    title: 'Persimpangan Golden Energy: Etika Mandiri Kemuliaan vs Dekonstruksi Matrix',
    speaker: 'R.M. Suryaningrat Widyapradana',
    duration: '48:12',
    streamProtocol: 'HLS Adaptive Bitrate (m3u8 / 4K)',
    resolution: '2160p UHD',
    recordedDate: '19 Maret 2026',
    thumbnailUrl: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    synopsis:
      'Pidato kuratorial mengenai dua orientasi strategis anggota Yayasan TBI dalam menghadapi disrupsi informasi abad ke-21.',
    chapters: [
      { time: '00:00', label: 'Anatomi Sistem Matrix Modern', summary: 'Mengenali determinisme algoritma dan pendangkalan perhatian.' },
      { time: '24:00', label: 'Membangun Kedaulatan Mandiri Kemuliaan', summary: 'Strategi wakaf intelektual dan kemandirian komunitas riset.' },
    ],
    transcriptPreview:
      '“Kita menyediakan dua ruang latihan sekaligus: pedang analisis untuk membedah ilusi zaman, dan kubah keheningan untuk membangun peradaban yang mandiri...”',
  },
];

// --- FOUNDER SOVEREIGN CONSOLE (MOD-10-FOUNDER-CONSOLE) ---

export type SupportedUploadFormat =
  | 'JPG'
  | 'PNG'
  | 'WEBP'
  | 'SVG'
  | 'PDF/A'
  | 'MP4'
  | 'TIFF';

export const SUPPORTED_UPLOAD_FORMATS: SupportedUploadFormat[] = [
  'JPG',
  'PNG',
  'WEBP',
  'SVG',
  'PDF/A',
  'MP4',
  'TIFF',
];

export interface MediaAssetRecord {
  id: string;
  fileName: string;
  format: SupportedUploadFormat;
  targetModule: ModuleId;
  sizeLabel: string;
  uploadedBy: string;
  timestamp: string;
  url: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  moduleId: ModuleId;
  actionType: string;
  detail: string;
}

export type SystemActorRole = 'PUBLIK' | 'ANGGOTA' | 'INISIAT' | 'FOUNDER';

export type UseCaseCode =
  | 'UC01'
  | 'UC02'
  | 'UC03'
  | 'UC04'
  | 'UC05'
  | 'UC06'
  | 'UC07'
  | 'UC08'
  | 'UC09'
  | 'UC10'
  | 'UC11'
  | 'UC12'
  | 'UC13'
  | 'UC14'
  | 'UC15'
  | 'UC16';

export interface UseCaseSpecification {
  code: UseCaseCode;
  realm: 'FRONTEND_EXPLORATION' | 'BACKEND_SOVEREIGN_CMS';
  realmTitle: string;
  actorGroupLabel: string;
  minimumActor: SystemActorRole;
  title: string;
  targetModuleId: ModuleId;
  summary: string;
}

export const USE_CASE_REGISTRY: UseCaseSpecification[] = [
  {
    code: 'UC01',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Publik / Anggota / Inisiat',
    minimumActor: 'PUBLIK',
    title: 'Melihat Beranda, Visi Misi & Biografi',
    targetModuleId: 'MOD-01-HOME',
    summary: 'Eksplorasi beranda institusi, Sekapur Sirih, Piagam Visi-Misi, dan prosopografi tokoh inti Yayasan TBI.',
  },
  {
    code: 'UC02',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Publik / Anggota / Inisiat',
    minimumActor: 'PUBLIK',
    title: 'Membaca & Telaah 6 Naskah ORBIT-CODEX',
    targetModuleId: 'MOD-02-ORBIT-CODEX',
    summary: 'Telaah filologis 6 folio kodeks Ge’ez dengan IIIF Deep-Zoom Viewer dan matriks konkordansi tiga bahasa.',
  },
  {
    code: 'UC03',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Publik / Anggota / Inisiat',
    minimumActor: 'PUBLIK',
    title: 'Menjelajahi Galeri Seni (Web Scroll)',
    targetModuleId: 'MOD-03-ART-GALLERY',
    summary: 'Penjelajahan aliran visual terkurasi (Gambar Gratis, Energi Kemuliaan, Sumber Universal) dengan inspeksi palet.',
  },
  {
    code: 'UC04',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Inisiat (Terotorisasi)',
    minimumActor: 'INISIAT',
    title: 'Mengakses Custom PDF Kapsul Ruang & Waktu [Inisiat]',
    targetModuleId: 'MOD-04-KAPSUL-WAKTU',
    summary: 'Dekripsi dan pembacaan naskah esoteris TBI/KODE 1–6 dalam pembaca PDF terenkripsi khusus Inisiat.',
  },
  {
    code: 'UC05',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Publik / Anggota / Inisiat',
    minimumActor: 'PUBLIK',
    title: 'Eksplorasi Graf Interaktif Shephirot (Web Scroll)',
    targetModuleId: 'MOD-05-SHEPHIROT',
    summary: 'Pemetaan topologi 10 Simpul Sephiroth dan 22 Jalur Ibrani dengan panel konkordansi arsip lintas modul.',
  },
  {
    code: 'UC06',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Publik / Anggota / Inisiat',
    minimumActor: 'PUBLIK',
    title: 'Menonton 30 Video Transmisi',
    targetModuleId: 'MOD-06-VIDEO',
    summary: 'Menyimak 30 slot transmisi sinema terkurasi, kuliah filologi, dan dokumenter konservasi arsip TBI.',
  },
  {
    code: 'UC07',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Publik / Anggota / Inisiat',
    minimumActor: 'PUBLIK',
    title: 'Memilih Persimpangan Golden Energy (Kemuliaan / Matrix)',
    targetModuleId: 'MOD-07-GOLDEN-ENERGY',
    summary: 'Interaksi layar terbelah untuk menempuh jalur Mandiri Kemuliaan atau dekodifikasi Bertarung Matrix.',
  },
  {
    code: 'UC08',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Publik / Anggota / Inisiat',
    minimumActor: 'PUBLIK',
    title: 'Membaca Arsip Mandiri Golden Dawn (Web Scroll)',
    targetModuleId: 'MOD-08-GOLDEN-DAWN',
    summary: 'Pembacaan gulir arsip berkesinambungan untuk diagram Tarot Hermetis, struktur ritual, dan manuskrip Ordo.',
  },
  {
    code: 'UC09',
    realm: 'FRONTEND_EXPLORATION',
    realmTitle: 'Akses Baca & Eksplorasi (Frontend)',
    actorGroupLabel: 'Anggota (Rating Terverifikasi)',
    minimumActor: 'ANGGOTA',
    title: 'Melihat & Memberi Rating 12 Donatur Peradaban [Anggota]',
    targetModuleId: 'MOD-09-DONATUR',
    summary: 'Apresiasi dan pemberian 1 rating aktif per anggota untuk Energy 12 Donatur Peradaban Mulia.',
  },
  {
    code: 'UC10',
    realm: 'BACKEND_SOVEREIGN_CMS',
    realmTitle: 'Kendali Mutlak (Backend/CMS)',
    actorGroupLabel: 'FOUNDER (2FA Sovereign)',
    minimumActor: 'FOUNDER',
    title: 'Kustomisasi Tema, Warna & Layout Web',
    targetModuleId: 'MOD-10-FOUNDER-CONSOLE',
    summary: 'Mengubah token warna utama (#151B8D, dll.), tipografi tajuk utama, dan kerapatan tata letak portal secara langsung.',
  },
  {
    code: 'UC11',
    realm: 'BACKEND_SOVEREIGN_CMS',
    realmTitle: 'Kendali Mutlak (Backend/CMS)',
    actorGroupLabel: 'FOUNDER (2FA Sovereign)',
    minimumActor: 'FOUNDER',
    title: 'Upload & Kelola Foto (Galeri, Bio, Donatur)',
    targetModuleId: 'MOD-10-FOUNDER-CONSOLE',
    summary: 'Mengunggah dan memperbarui aset foto resolusi tinggi untuk Galeri Seni, Biografi Tokoh, dan 12 Pilar Donatur.',
  },
  {
    code: 'UC12',
    realm: 'BACKEND_SOVEREIGN_CMS',
    realmTitle: 'Kendali Mutlak (Backend/CMS)',
    actorGroupLabel: 'FOUNDER (2FA Sovereign)',
    minimumActor: 'FOUNDER',
    title: 'Upload & Enkripsi Custom PDF Esoteris',
    targetModuleId: 'MOD-10-FOUNDER-CONSOLE',
    summary: 'Mengunggah naskah PDF/A baru ke Kapsul Ruang & Waktu (TBI/KODE 1–6) beserta kunci sandi AES-256 dan otorisasi Inisiat.',
  },
  {
    code: 'UC13',
    realm: 'BACKEND_SOVEREIGN_CMS',
    realmTitle: 'Kendali Mutlak (Backend/CMS)',
    actorGroupLabel: 'FOUNDER (2FA Sovereign)',
    minimumActor: 'FOUNDER',
    title: 'Manajemen 6 Orbit-Codex & 30 Video',
    targetModuleId: 'MOD-10-FOUNDER-CONSOLE',
    summary: 'Mengelola kuota 6 folio Orbit-Codex (transkripsi & anotasi Harag) serta mengganti/menyunting 30 slot Video Transmisi.',
  },
  {
    code: 'UC14',
    realm: 'BACKEND_SOVEREIGN_CMS',
    realmTitle: 'Kendali Mutlak (Backend/CMS)',
    actorGroupLabel: 'FOUNDER (2FA Sovereign)',
    minimumActor: 'FOUNDER',
    title: 'Update Konten Golden Energy & Golden Dawn',
    targetModuleId: 'MOD-10-FOUNDER-CONSOLE',
    summary: 'Memperbarui materi doktrin dua persimpangan Golden Energy serta menambahkan diagram Tarot & manuskrip Golden Dawn.',
  },
  {
    code: 'UC15',
    realm: 'BACKEND_SOVEREIGN_CMS',
    realmTitle: 'Kendali Mutlak (Backend/CMS)',
    actorGroupLabel: 'FOUNDER (2FA Sovereign)',
    minimumActor: 'FOUNDER',
    title: 'Kelola Data 12 Donatur & Moderasi Rating',
    targetModuleId: 'MOD-10-FOUNDER-CONSOLE',
    summary: 'Menyunting log kontribusi filantropi 12 Pilar Donatur Peradaban Mulia dan memoderasi rating komunitas.',
  },
  {
    code: 'UC16',
    realm: 'BACKEND_SOVEREIGN_CMS',
    realmTitle: 'Kendali Mutlak (Backend/CMS)',
    actorGroupLabel: 'FOUNDER (2FA Sovereign)',
    minimumActor: 'FOUNDER',
    title: 'Mengatur Urutan & Visibilitas Modul',
    targetModuleId: 'MOD-10-FOUNDER-CONSOLE',
    summary: 'Mengubah urutan sekuens modul (1–10) dan mengaktifkan/menyembunyikan visibilitas modul secara real-time.',
  },
];

const ACTOR_RANK: Record<SystemActorRole, number> = {
  PUBLIK: 1,
  ANGGOTA: 2,
  INISIAT: 3,
  FOUNDER: 4,
};

export function canActorExecuteUseCase(
  actor: SystemActorRole,
  useCaseCode: UseCaseCode
): boolean {
  const spec = USE_CASE_REGISTRY.find((u) => u.code === useCaseCode);
  if (!spec) return false;
  return ACTOR_RANK[actor] >= ACTOR_RANK[spec.minimumActor];
}

export function reorderModuleSequence(
  sequence: ModuleId[],
  fromIndex: number,
  toIndex: number
): ModuleId[] {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= sequence.length ||
    toIndex >= sequence.length ||
    fromIndex === toIndex
  ) {
    return sequence;
  }
  const copy = [...sequence];
  const [moved] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, moved);
  return copy;
}

export function getOrderedModules(state: FounderCustomizationState): ModuleConfig[] {
  const orderList = state.moduleSequenceOrder || MODULES_CONFIG.map((m) => m.id);
  const map = new Map<ModuleId, ModuleConfig>();
  for (const mod of MODULES_CONFIG) {
    map.set(mod.id, mod);
  }
  const ordered: ModuleConfig[] = [];
  orderList.forEach((id, idx) => {
    const found = map.get(id);
    if (found) {
      ordered.push({ ...found, order: idx + 1 });
      map.delete(id);
    }
  });
  for (const remaining of map.values()) {
    ordered.push({ ...remaining, order: ordered.length + 1 });
  }
  return ordered;
}

export type SecurityRuleCode =
  | 'TBI-RULE-01'
  | 'TBI-RULE-02'
  | 'TBI-RULE-03'
  | 'TBI-RULE-04';

export interface CoreSecurityRule {
  rule_code: SecurityRuleCode;
  name: string;
  trigger: string;
  action: string;
}

export interface SecurityAndUsageProtocols {
  classification_banner: string;
  transmission_type: string;
  document_marker: string;
  enforcement_mode: 'STRICT_ZERO_TOLERANCE';
  four_core_rules: CoreSecurityRule[];
  founder_override: {
    can_edit_protocol_text: boolean;
    can_ban_or_whitelist_ip: boolean;
    can_view_telemetry_logs: boolean;
  };
}

export const SECURITY_AND_USAGE_PROTOCOLS: SecurityAndUsageProtocols = {
  classification_banner: 'NOTICE: FOR INITIATE EYES ONLY. DO NOT DISTRIBUTE.',
  transmission_type: 'AN ESOTERIC-REALIST INTELLIGENCE TRANSMISSION',
  document_marker: 'TBI INTERNAL DOCUMENT',
  enforcement_mode: 'STRICT_ZERO_TOLERANCE',
  four_core_rules: [
    {
      rule_code: 'TBI-RULE-01',
      name: 'The Initiate Covenant Gate',
      trigger: 'On_First_Visit_And_Login',
      action: 'Mandatory digital signature / checkbox acceptance before rendering DOM',
    },
    {
      rule_code: 'TBI-RULE-02',
      name: 'Anti-Redistribution & Forensic Watermarking',
      trigger: 'On_Document_And_Codex_View',
      action:
        'Disable context menu, disable print-screen API, inject dynamic User-ID + IP watermark overlay',
    },
    {
      rule_code: 'TBI-RULE-03',
      name: 'Silent Sentinel Telemetry & Session Lock',
      trigger: 'Continuous_Background_Monitor',
      action:
        'Enforce 1-device session limit; auto-revoke token on anomalous scraping or unauthorized API requests',
    },
    {
      rule_code: 'TBI-RULE-04',
      name: 'Archival Purity & Conduct Filter',
      trigger: 'On_Donor_Rating_And_Codex_Annotation',
      action:
        'Hold all user submissions in PENDING state until explicitly approved via Founder Sovereign Console',
    },
  ],
  founder_override: {
    can_edit_protocol_text: true,
    can_ban_or_whitelist_ip: true,
    can_view_telemetry_logs: true,
  },
};

export interface CovenantProtocolStatement {
  code: string;
  title: string;
  ruleCode: 'TBI-RULE-01' | 'TBI-RULE-02' | 'TBI-RULE-03' | 'TBI-RULE-04';
  statement: string;
}

export const COVENANT_PROTOCOLS_I_TO_IV: CovenantProtocolStatement[] = [
  {
    code: 'PROTOKOL I',
    title: 'Kedaulatan Akses',
    ruleCode: 'TBI-RULE-01',
    statement:
      'Anda memasuki arsip tertutup The Brothers Influence. Dilarang melanjutkan tanpa kesiapan kognitif penuh.',
  },
  {
    code: 'PROTOKOL II',
    title: 'Hukum Non-Distribusi',
    ruleCode: 'TBI-RULE-02',
    statement:
      'Seluruh naskah Orbit-Codex dan PDF Kapsul Waktu dilindungi tanda air forensik. Dilarang menyebarkan ulang (Do Not Distribute).',
  },
  {
    code: 'PROTOKOL III',
    title: 'Pengawasan Telemetri',
    ruleCode: 'TBI-RULE-03',
    statement:
      'Jejak IP dan aktivitas sesi Anda diawasi secara hening. Upaya penyalinan paksa akan memicu pemblokiran permanen.',
  },
  {
    code: 'PROTOKOL IV',
    title: 'Kemurnian Kognitif',
    ruleCode: 'TBI-RULE-04',
    statement:
      'Interaksi pada Rating Donatur dan Anotasi Kodeks wajib bersifat objektif dan tunduk pada otoritas mutlak Founder.',
  },
];

export interface IpAccessRecord {
  id: string;
  ipAddress: string;
  label: string;
  status: 'WHITELISTED' | 'BANNED';
  updatedAt: string;
}

export interface SentinelTelemetryEntry {
  id: string;
  timestamp: string;
  sessionId: string;
  userId: string;
  ipAddress: string;
  deviceCount: number;
  event: string;
  severity: 'NOMINAL' | 'WARNING' | 'TOKEN_REVOKED';
}

export interface PendingConductSubmission {
  id: string;
  ruleCode: 'TBI-RULE-04';
  submissionType: 'DONOR_RATING' | 'CODEX_ANNOTATION';
  targetLabel: string;
  authorName: string;
  contentSummary: string;
  submittedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export function generateForensicWatermark(
  userId: string,
  ipAddress: string,
  documentMarker: string = SECURITY_AND_USAGE_PROTOCOLS.document_marker
): string {
  return `${documentMarker} · UID:${userId} · IP:${ipAddress} · FOR INITIATE EYES ONLY · DO NOT DISTRIBUTE`;
}

export function evaluateSentinelSession(params: {
  deviceCount: number;
  requestsPerMinute: number;
  ipAddress: string;
  ipRegistry: IpAccessRecord[];
}): {
  tokenRevoked: boolean;
  reason: string;
  severity: 'NOMINAL' | 'WARNING' | 'TOKEN_REVOKED';
} {
  const ipEntry = params.ipRegistry.find((r) => r.ipAddress === params.ipAddress);
  if (ipEntry?.status === 'BANNED') {
    return {
      tokenRevoked: true,
      reason: `TBI-RULE-03: Token dicabut otomatis karena IP ${params.ipAddress} berada dalam daftar BANNED.`,
      severity: 'TOKEN_REVOKED',
    };
  }
  if (params.deviceCount > 1) {
    return {
      tokenRevoked: true,
      reason: `TBI-RULE-03: Pelanggaran batas 1 perangkat (${params.deviceCount} perangkat terdeteksi). Token dicabut otomatis.`,
      severity: 'TOKEN_REVOKED',
    };
  }
  if (params.requestsPerMinute > 90) {
    return {
      tokenRevoked: true,
      reason: `TBI-RULE-03: Anomali scraping terdeteksi (${params.requestsPerMinute} req/menit). Token sesi dicabut otomatis.`,
      severity: 'TOKEN_REVOKED',
    };
  }
  return {
    tokenRevoked: false,
    reason: 'TBI-RULE-03: Sesi tunggal (1-device limit) terverifikasi & telemetri normal.',
    severity: 'NOMINAL',
  };
}

export type HierarchySacredLevel = 'SAKRAL' | 'KANONIK' | 'TEKNIS';

export interface PillarSubFeature {
  id: string;
  title: string;
  description: string;
  hierarchyLevel: HierarchySacredLevel;
  illuminated: boolean;
  isCustomAdded?: boolean;
}

export interface PillarArchitectureItem {
  pillarOrder: number; // 1 to 9
  id: string;
  menuTitle: string; // e.g. "Beranda", "Codex Esoteris", "Kapsul R&W", ...
  canonicalSubtitle: string;
  targetModuleId: ModuleId;
  neoplatonicCorrelation: string;
  hierarchyLevel: HierarchySacredLevel;
  subFeatures: PillarSubFeature[];
}

export const NEOPLATONIC_PHILOSOPHY_FRAMEWORK = {
  website_name: 'THE BROTHERS INFLUENCE (TBI)',
  concept: 'Digital Esoteric Library & Archive',
  name: '7 Prinsip Neoplatonisme',
  ui_ux_mapping: {
    '1_the_one': 'Bilah pencarian tunggal & Portal Mulia',
    '2_emanasi': 'Aliran konten dari 9 pilar utama',
    '3_epistrophe': 'Sistem navigasi pulang intuitif',
    '4_hierarki': 'Struktur tegas dari informasi sakral hingga teknis',
    '5_kosmos': 'Grid simetris penataan kartu',
    '6_keindahan': 'Estetika minimalis gelap-emas',
    '7_iluminasi': 'Efek pendaran emas pada hover & CMS console',
  },
  principles_list: [
    {
      key: '1_the_one',
      number: 'I',
      greekTerm: 'To Hen (The One)',
      title: '1. The One — Sumber Tunggal',
      mapping: 'Bilah pencarian tunggal & Portal Mulia',
      architecturalRole:
        'Pusat pencarian universal lintas 9 pilar, naskah kodeks, kapsul waktu, dan sub-fitur dari satu titik kesadaran tunggal.',
    },
    {
      key: '2_emanasi',
      number: 'II',
      greekTerm: 'Proodos (Emanasi)',
      title: '2. Emanasi — Pancaran 9 Pilar',
      mapping: 'Aliran konten dari 9 pilar utama',
      architecturalRole:
        'Pancaran terstruktur dari Beranda menuju Codex Esoteris, Kapsul R&W, Galeri Seni, Fajar Emas, Media Video, Tujuan Energi Emas, Sumber Universal, hingga Donatur Mulia.',
    },
    {
      key: '3_epistrophe',
      number: 'III',
      greekTerm: 'Epistrophe (Kepulangan)',
      title: '3. Epistrophe — Navigasi Pulang',
      mapping: 'Sistem navigasi pulang intuitif',
      architecturalRole:
        'Jalur kembali instan dari setiap modul dan sub-fitur menuju pusat Portal Mulia (The One) tanpa kehilangan orientasi.',
    },
    {
      key: '4_hierarki',
      number: 'IV',
      greekTerm: 'Taxis (Hierarki Ontologis)',
      title: '4. Hierarki — Strata Sakral ke Teknis',
      mapping: 'Struktur tegas dari informasi sakral hingga teknis',
      architecturalRole:
        'Stratifikasi tegas mulai dari tataran SAKRAL (Kodeks & Kapsul), KANONIK (Kosmologi & Seni), hingga TEKNIS (Telemetri & CMS).',
    },
    {
      key: '5_kosmos',
      number: 'V',
      greekTerm: 'Kosmos Noetos (Ordo Simetris)',
      title: '5. Kosmos — Grid Simetris',
      mapping: 'Grid simetris penataan kartu',
      architecturalRole:
        'Geometri kartu 3x3 proporsional untuk 9 Menu Utama dan kisi arsip terukur tanpa kebisingan tata letak.',
    },
    {
      key: '6_keindahan',
      number: 'VI',
      greekTerm: 'To Kalon (Keindahan)',
      title: '6. Keindahan — Minimalis Gelap-Emas',
      mapping: 'Estetika minimalis gelap-emas',
      architecturalRole:
        'Harmoni kontras Obsidian-Lapis dengan aksen emas murni (#D4AF37) dan ruang baca berdisiplin tinggi.',
    },
    {
      key: '7_iluminasi',
      number: 'VII',
      greekTerm: 'Ellampsis (Iluminasi)',
      title: '7. Iluminasi — Pendaran Emas & CMS',
      mapping: 'Efek pendaran emas pada hover & CMS console',
      architecturalRole:
        'Pendaran cahaya keemasan saat interaksi kursor (hover) dan otoritas penuh pada FOUNDERS SOVEREIGN Console.',
    },
  ],
} as const;

export const CMS_CORE_SPEC = {
  console_name: 'FOUNDERS SOVEREIGN Console',
  global_permissions: ['Custom Feature', 'Delete Feature', 'Tambah Fitur'] as const,
  pillars_summary:
    'Berisi 9 menu utama (Beranda, Codex Esoteris, Kapsul R&W, Galeri Seni, Fajar Emas, Media Video, Tujuan Energi Emas, Sumber Universal, Donatur Mulia) dengan sub-fitur terstruktur.',
} as const;

export const INITIAL_NINE_MAIN_PILLARS: PillarArchitectureItem[] = [
  {
    pillarOrder: 1,
    id: 'pillar-01-beranda',
    menuTitle: 'Beranda',
    canonicalSubtitle: 'Portal Mulia, Sekapur Sirih, Visi-Misi & Prosopografi',
    targetModuleId: 'MOD-01-HOME',
    neoplatonicCorrelation: '1_the_one · Pusat Portal Mulia',
    hierarchyLevel: 'SAKRAL',
    subFeatures: [
      {
        id: 'sf-101',
        title: 'Bilah Pencarian Tunggal (The One)',
        description: 'Pencarian universal lintas 9 pilar utama, naskah, dan sub-fitur.',
        hierarchyLevel: 'SAKRAL',
        illuminated: true,
      },
      {
        id: 'sf-102',
        title: 'Sekapur Sirih & Piagam Visi-Misi',
        description: 'Deklarasi filosofis Yayasan THE BROTHERS INFLUENCE.',
        hierarchyLevel: 'KANONIK',
        illuminated: false,
      },
      {
        id: 'sf-103',
        title: 'Prosopografi Pendiri & Dewan Kurator',
        description: 'Biografi intelektual R.M. Suryaningrat Widyapradana & tim filolog.',
        hierarchyLevel: 'KANONIK',
        illuminated: false,
      },
    ],
  },
  {
    pillarOrder: 2,
    id: 'pillar-02-codex-esoteris',
    menuTitle: 'Codex Esoteris',
    canonicalSubtitle: 'Preservasi 6 Master Orbit-Codex & IIIF Deep-Zoom',
    targetModuleId: 'MOD-02-ORBIT-CODEX',
    neoplatonicCorrelation: '2_emanasi · Transmisi Aksara Primer',
    hierarchyLevel: 'SAKRAL',
    subFeatures: [
      {
        id: 'sf-201',
        title: 'IIIF Deep-Zoom 6 Folio Utama',
        description: 'Inspeksi resolusi tinggi ORBIT // 001 hingga ORBIT // 006.',
        hierarchyLevel: 'SAKRAL',
        illuminated: true,
      },
      {
        id: 'sf-202',
        title: 'Konkordansi Tiga Bahasa (Ge’ez–Transliterasi–Indonesia)',
        description: 'Aparatus filologis ayat demi ayat beserta catatan kritis.',
        hierarchyLevel: 'SAKRAL',
        illuminated: false,
      },
      {
        id: 'sf-203',
        title: 'Inspektor Ornamen Harag & Kolofon',
        description: 'Pemetaan iluminasi pigmen dan segel skriptorium abad ke-15.',
        hierarchyLevel: 'TEKNIS',
        illuminated: false,
      },
    ],
  },
  {
    pillarOrder: 3,
    id: 'pillar-03-kapsul-rw',
    menuTitle: 'Kapsul R&W',
    canonicalSubtitle: 'Kapsul Ruang & Waktu (Enkripsi PDF/A TBI KODE 1–6)',
    targetModuleId: 'MOD-04-KAPSUL-WAKTU',
    neoplatonicCorrelation: '4_hierarki · Strata Klasifikasi KODE 1–6',
    hierarchyLevel: 'SAKRAL',
    subFeatures: [
      {
        id: 'sf-301',
        title: 'Pembaca PDF/A Terenkripsi Kustom',
        description: 'Dekripsi dokumen esoteris khusus Inisiat & Peneliti.',
        hierarchyLevel: 'SAKRAL',
        illuminated: true,
      },
      {
        id: 'sf-302',
        title: 'Matriks 6 Kelas Klasifikasi (TBI/KODE 1–6)',
        description: 'Pemilahan tegas dari Manuskrip Primer hingga Kritik Teks.',
        hierarchyLevel: 'KANONIK',
        illuminated: false,
      },
      {
        id: 'sf-303',
        title: 'Registri Metadata Dublin Core & SHA-256',
        description: 'Verifikasi keaslian berkas dan sidik jari kriptografi.',
        hierarchyLevel: 'TEKNIS',
        illuminated: false,
      },
    ],
  },
  {
    pillarOrder: 4,
    id: 'pillar-04-galeri-seni',
    menuTitle: 'Galeri Seni',
    canonicalSubtitle: 'Koleksi Visual Terkurasi & Harmoni Estetika Kosmos',
    targetModuleId: 'MOD-03-ART-GALLERY',
    neoplatonicCorrelation: '6_keindahan · Estetika Minimalis Gelap-Emas',
    hierarchyLevel: 'KANONIK',
    subFeatures: [
      {
        id: 'sf-401',
        title: 'Aliran Visual Energi Kemuliaan & Gambar Gratis',
        description: 'Pameran lukisan simbolik, arsitektur sakral, dan geometri.',
        hierarchyLevel: 'KANONIK',
        illuminated: true,
      },
      {
        id: 'sf-402',
        title: 'Inspektor Palet Pigmen & Resolusi',
        description: 'Analisis spektrum warna emas, lapis lazuli, dan obsidian.',
        hierarchyLevel: 'TEKNIS',
        illuminated: false,
      },
    ],
  },
  {
    pillarOrder: 5,
    id: 'pillar-05-fajar-emas',
    menuTitle: 'Fajar Emas',
    canonicalSubtitle: 'Repositori Mandiri Golden Dawn: Tarot, Ritual & Dokumen',
    targetModuleId: 'MOD-08-GOLDEN-DAWN',
    neoplatonicCorrelation: '7_iluminasi · Iluminasi Hermetis Ordo',
    hierarchyLevel: 'KANONIK',
    subFeatures: [
      {
        id: 'sf-501',
        title: 'Sub-Koleksi 22 Atu Tarot Hermetis',
        description: 'Korespondensi jalur Ibrani, astrologi, dan simbolisme esoteris.',
        hierarchyLevel: 'SAKRAL',
        illuminated: true,
      },
      {
        id: 'sf-502',
        title: 'Struktur Derajat & Diagram Ritual Neophyte–Adeptus',
        description: 'Arsitektur tiga ordo dan tata letak altar kuil hermetis.',
        hierarchyLevel: 'KANONIK',
        illuminated: false,
      },
      {
        id: 'sf-503',
        title: 'Naskah Cipher & Flying Rolls (1888–1903)',
        description: 'Transkripsi dokumen historis koleksi mandiri Fajar Emas.',
        hierarchyLevel: 'TEKNIS',
        illuminated: false,
      },
    ],
  },
  {
    pillarOrder: 6,
    id: 'pillar-06-media-video',
    menuTitle: 'Media Video',
    canonicalSubtitle: 'Curated Cinema Grid (Kuota 30 Slot Transmisi)',
    targetModuleId: 'MOD-06-VIDEO',
    neoplatonicCorrelation: '5_kosmos · Grid Sinema Terukur',
    hierarchyLevel: 'KANONIK',
    subFeatures: [
      {
        id: 'sf-601',
        title: '30 Slot Sinema Transmisi & Kuliah Filologi',
        description: 'Rekaman simposium kodeks, bedah kosmologi, dan konservasi.',
        hierarchyLevel: 'KANONIK',
        illuminated: true,
      },
      {
        id: 'sf-602',
        title: 'Transkrip Waktu & Navigasi Bab Video',
        description: 'Penanda waktu presisi untuk rujukan akademis.',
        hierarchyLevel: 'TEKNIS',
        illuminated: false,
      },
    ],
  },
  {
    pillarOrder: 7,
    id: 'pillar-07-tujuan-energi-emas',
    menuTitle: 'Tujuan Energi Emas',
    canonicalSubtitle: 'Persimpangan Kesadaran: Mandiri Kemuliaan & Bertarung Matrix',
    targetModuleId: 'MOD-07-GOLDEN-ENERGY',
    neoplatonicCorrelation: '3_epistrophe · Orientasi Kepulangan Rohani',
    hierarchyLevel: 'SAKRAL',
    subFeatures: [
      {
        id: 'sf-701',
        title: 'Jalur I: Mandiri Kemuliaan (Ascension)',
        description: 'Kedaulatan internal, etika kebijaksanaan, dan karya peradaban.',
        hierarchyLevel: 'SAKRAL',
        illuminated: true,
      },
      {
        id: 'sf-702',
        title: 'Jalur II: Bertarung Matrix (Deconstruction)',
        description: 'Dekodifikasi ilusi sistemik dan ketajaman intelijen realis.',
        hierarchyLevel: 'KANONIK',
        illuminated: true,
      },
    ],
  },
  {
    pillarOrder: 8,
    id: 'pillar-08-sumber-universal',
    menuTitle: 'Sumber Universal',
    canonicalSubtitle: 'Topologi Pohon Kehidupan (10 Simpul Shephirot & 22 Jalur)',
    targetModuleId: 'MOD-05-SHEPHIROT',
    neoplatonicCorrelation: '2_emanasi · 10 Emanasi Kosmologis',
    hierarchyLevel: 'SAKRAL',
    subFeatures: [
      {
        id: 'sf-801',
        title: 'Graf Interaktif SVG 10 Sephiroth (Kether–Malkuth)',
        description: 'Pemetaan Tiga Pilar: Mercy, Severity, dan Mildness.',
        hierarchyLevel: 'SAKRAL',
        illuminated: true,
      },
      {
        id: 'sf-802',
        title: 'Konkordansi 22 Jalur Huruf Ibrani & Tautan Lintas Modul',
        description: 'Hubungan langsung setiap simpul dengan PDF Kapsul & Kodeks.',
        hierarchyLevel: 'KANONIK',
        illuminated: false,
      },
    ],
  },
  {
    pillarOrder: 9,
    id: 'pillar-09-donatur-mulia',
    menuTitle: 'Donatur Mulia',
    canonicalSubtitle: '12 Pilar Donatur Peradaban & Donasi Sistem Pendukung',
    targetModuleId: 'MOD-09-DONATUR',
    neoplatonicCorrelation: '5_kosmos · 12 Pilar Penyangga Peradaban',
    hierarchyLevel: 'KANONIK',
    subFeatures: [
      {
        id: 'sf-901',
        title: 'Buku Besar Dana Abadi, Naskah & Artefak',
        description: 'Kalkulasi real-time Rp 14,85 Miliar Dana Abadi, 83 Naskah & 36 Artefak.',
        hierarchyLevel: 'SAKRAL',
        illuminated: true,
      },
      {
        id: 'sf-902',
        title: 'Registri 12 Pilar Donatur & Rating Likert 1–5',
        description: 'Apresiasi terverifikasi dengan aturan 1 rating aktif per anggota.',
        hierarchyLevel: 'KANONIK',
        illuminated: false,
      },
    ],
  },
];

export function addFounderPillarFeature(
  pillars: PillarArchitectureItem[],
  payload: {
    pillarId: string;
    title: string;
    description: string;
    hierarchyLevel: HierarchySacredLevel;
    illuminated?: boolean;
  }
): { pillars: PillarArchitectureItem[]; addedFeature: PillarSubFeature } {
  const newFeature: PillarSubFeature = {
    id: `sf-custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: payload.title.trim(),
    description: payload.description.trim(),
    hierarchyLevel: payload.hierarchyLevel,
    illuminated: payload.illuminated ?? true,
    isCustomAdded: true,
  };

  const updated = pillars.map((p) => {
    if (p.id !== payload.pillarId) return p;
    return {
      ...p,
      subFeatures: [...p.subFeatures, newFeature],
    };
  });

  return { pillars: updated, addedFeature: newFeature };
}

export function customizeFounderPillarFeature(
  pillars: PillarArchitectureItem[],
  payload: {
    pillarId: string;
    subFeatureId: string;
    title?: string;
    description?: string;
    hierarchyLevel?: HierarchySacredLevel;
    illuminated?: boolean;
  }
): PillarArchitectureItem[] {
  return pillars.map((p) => {
    if (p.id !== payload.pillarId) return p;
    return {
      ...p,
      subFeatures: p.subFeatures.map((sf) => {
        if (sf.id !== payload.subFeatureId) return sf;
        return {
          ...sf,
          title: payload.title !== undefined ? payload.title.trim() : sf.title,
          description:
            payload.description !== undefined ? payload.description.trim() : sf.description,
          hierarchyLevel: payload.hierarchyLevel ?? sf.hierarchyLevel,
          illuminated: payload.illuminated !== undefined ? payload.illuminated : sf.illuminated,
        };
      }),
    };
  });
}

export function deleteFounderPillarFeature(
  pillars: PillarArchitectureItem[],
  pillarId: string,
  subFeatureId: string
): PillarArchitectureItem[] {
  return pillars.map((p) => {
    if (p.id !== pillarId) return p;
    return {
      ...p,
      subFeatures: p.subFeatures.filter((sf) => sf.id !== subFeatureId),
    };
  });
}

export interface UniversalSearchResultItem {
  id: string;
  category: 'PILAR_UTAMA' | 'SUB_FITUR' | 'CODEX_ESOTERIS' | 'KAPSUL_RW' | 'SUMBER_UNIVERSAL';
  title: string;
  subtitle: string;
  hierarchyLevel: HierarchySacredLevel;
  targetModuleId: ModuleId;
  targetParam?: string;
}

export function searchUniversalPortalTheOne(
  query: string,
  pillars: PillarArchitectureItem[] = INITIAL_NINE_MAIN_PILLARS
): UniversalSearchResultItem[] {
  const q = query.trim().toLowerCase();
  const results: UniversalSearchResultItem[] = [];

  for (const pillar of pillars) {
    if (
      !q ||
      pillar.menuTitle.toLowerCase().includes(q) ||
      pillar.canonicalSubtitle.toLowerCase().includes(q) ||
      pillar.neoplatonicCorrelation.toLowerCase().includes(q)
    ) {
      results.push({
        id: `res-${pillar.id}`,
        category: 'PILAR_UTAMA',
        title: `Pilar 0${pillar.pillarOrder}: ${pillar.menuTitle}`,
        subtitle: pillar.canonicalSubtitle,
        hierarchyLevel: pillar.hierarchyLevel,
        targetModuleId: pillar.targetModuleId,
      });
    }

    for (const sf of pillar.subFeatures) {
      if (
        q &&
        (sf.title.toLowerCase().includes(q) || sf.description.toLowerCase().includes(q))
      ) {
        results.push({
          id: `res-${sf.id}`,
          category: 'SUB_FITUR',
          title: `${sf.title} (${pillar.menuTitle})`,
          subtitle: sf.description,
          hierarchyLevel: sf.hierarchyLevel,
          targetModuleId: pillar.targetModuleId,
        });
      }
    }
  }

  if (q) {
    for (const folio of ORBIT_CODEX_FOLIOS) {
      if (
        folio.masterCodexTitle.toLowerCase().includes(q) ||
        folio.folioLabel.toLowerCase().includes(q) ||
        folio.shelfmark.toLowerCase().includes(q)
      ) {
        results.push({
          id: `res-folio-${folio.id}`,
          category: 'CODEX_ESOTERIS',
          title: `${folio.masterCodexTitle} (${folio.shelfmark})`,
          subtitle: `${folio.folioLabel} · ${folio.century}`,
          hierarchyLevel: 'SAKRAL',
          targetModuleId: 'MOD-02-ORBIT-CODEX',
          targetParam: String(folio.slotNumber),
        });
      }
    }

    for (const doc of CAPSULE_DOCUMENTS) {
      if (
        doc.dublinCore.title.toLowerCase().includes(q) ||
        doc.code.toLowerCase().includes(q) ||
        doc.dublinCore.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: `res-doc-${doc.id}`,
          category: 'KAPSUL_RW',
          title: `[${doc.code}] ${doc.dublinCore.title}`,
          subtitle: doc.dublinCore.description,
          hierarchyLevel: 'SAKRAL',
          targetModuleId: 'MOD-04-KAPSUL-WAKTU',
          targetParam: doc.id,
        });
      }
    }
  }

  return results.slice(0, 12);
}

export interface FounderCustomizationState {
  activeActorRole: SystemActorRole;
  primaryAccentHex: string;
  obsidianDarkHex: string;
  canvasLightHex: string;
  transmissionSlateHex: string;
  headingFontChoice: 'EB Garamond' | 'Montserrat' | 'Cinzel';
  layoutDensity: 'ARCHIVAL_COMFORT' | 'COMPACT_RESEARCH';
  moduleSequenceOrder: ModuleId[];
  hiddenModules: ModuleId[];
  pillarFeatures: PillarArchitectureItem[];
  homeContent: {
    heroBannerImage: string;
    heroHeadline: string;
    pengantarText: string;
    visiMisiList: { key: string; label: string; value: string }[];
  };
  mediaLibrary: MediaAssetRecord[];
  auditLogs: AuditLogEntry[];
  securityState: {
    protocols: SecurityAndUsageProtocols;
    covenantGateModalOpen: boolean;
    covenantSignedBy: string;
    covenantSignedTimestamp: string;
    activeSessionUserId: string;
    activeSessionIp: string;
    activeDeviceCount: number;
    sessionTokenRevoked: boolean;
    sessionLockReason: null | string;
    ipRegistry: IpAccessRecord[];
    telemetryLogs: SentinelTelemetryEntry[];
    pendingSubmissions: PendingConductSubmission[];
  };
}

export type FounderConsoleState = FounderCustomizationState;

export const INITIAL_FOUNDER_STATE: FounderCustomizationState = {
  activeActorRole: 'FOUNDER',
  primaryAccentHex: '#151B8D',
  obsidianDarkHex: '#0A0A0A',
  canvasLightHex: '#FFFFFF',
  transmissionSlateHex: '#64748B',
  headingFontChoice: 'EB Garamond',
  layoutDensity: 'ARCHIVAL_COMFORT',
  moduleSequenceOrder: MODULES_CONFIG.map((m) => m.id),
  hiddenModules: [],
  pillarFeatures: INITIAL_NINE_MAIN_PILLARS,
  homeContent: {
    heroBannerImage: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    heroHeadline: 'Portal Kemuliaan Yayasan & Intelijen Arsip Esoteris-Realis',
    pengantarText:
      'The Brothers Influence (TBI) - Portal Kemuliaan Yayasan (Versi 4.0.0) menyatukan preservasi kodeks kuno, pemetaan graf interaktif 10 Sephiroth, persimpangan doktrinal Golden Energy, dan tata kelola 12 Pilar Donatur Peradaban Mulia di bawah kendali langsung Founder Sovereign Console.',
    visiMisiList: [
      {
        key: '01. VISI KEDAULATAN YAYASAN',
        label: 'Kemuliaan Peradaban & Otonomi Epistemik',
        value:
          'Mewujudkan pusat arsip esoteris-realis berdaulat yang memadukan kemurnian transmisi naskah primer dengan ketajaman metodologi filologis modern.',
      },
      {
        key: '02. MISI PRESERVASI ORBIT CODEX & KAPSUL WAKTU',
        label: 'Konservasi IIIF Deep-Zoom & Enkripsi PDF/A',
        value:
          'Mengamankan 6 folio utama Orbit Codex dan seluruh materi TBI/KODE 1–6 dalam arsitektur pembaca terenkripsi berstandar internasional.',
      },
      {
        key: '03. MISI TRANSFORMASI KESADARAN (GOLDEN ENERGY)',
        label: 'Sintesis Mandiri Kemuliaan & Ketahanan Matrix',
        value:
          'Membekali peneliti dan anggota yayasan dengan dua orientasi strategis: kemandirian nilai peradaban (Mandiri Kemuliaan) dan ketajaman dekonstruksi ilusi sistemik (Bertarung Matrix).',
      },
      {
        key: '04. MISI FILANTROPI 12 PILAR',
        label: 'Energy 12 Donatur Peradaban Mulia',
        value:
          'Mengabadikan kontribusi naskah, artefak, dan dana abadi dari 12 Pilar Donatur melalui sistem registri transparan dan apresiasi komunitas terverifikasi.',
      },
    ],
  },
  mediaLibrary: [
    {
      id: 'media-01',
      fileName: 'orbit_codex_folio_14r_master.tiff',
      format: 'TIFF',
      targetModule: 'MOD-02-ORBIT-CODEX',
      sizeLabel: '148.4 MB',
      uploadedBy: 'Founder Sovereign (2FA)',
      timestamp: '2026-11-01 09:15',
      url: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    },
    {
      id: 'media-02',
      fileName: 'atrium_lux_divina_glory.webp',
      format: 'WEBP',
      targetModule: 'MOD-03-ART-GALLERY',
      sizeLabel: '18.2 MB',
      uploadedBy: 'Founder Sovereign (2FA)',
      timestamp: '2026-11-02 14:30',
      url: '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg',
    },
    {
      id: 'media-03',
      fileName: 'codex_principia_kode1_encrypted.pdf',
      format: 'PDF/A',
      targetModule: 'MOD-04-KAPSUL-WAKTU',
      sizeLabel: '42.0 MB',
      uploadedBy: 'Founder Sovereign (2FA)',
      timestamp: '2026-11-02 18:10',
      url: '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg',
    },
  ],
  auditLogs: [
    {
      id: 'audit-101',
      timestamp: '2026-11-03 08:00',
      actor: 'Founder Sovereign (2FA Verified)',
      moduleId: 'MOD-10-FOUNDER-CONSOLE',
      actionType: 'SYSTEM_UPGRADE_V4',
      detail: 'Inisialisasi arsitektur 10 modul berurutan TBI Portal Kemuliaan Yayasan v4.0.0.',
    },
    {
      id: 'audit-102',
      timestamp: '2026-11-03 08:30',
      actor: 'Founder Sovereign (2FA Verified)',
      moduleId: 'MOD-02-ORBIT-CODEX',
      actionType: 'QUOTA_LOCK_6_FOLIOS',
      detail: 'Mengunci kuota preservasi 6 Folio Orbit Codex dan mengesahkan anotasi Harag Folio 14r.',
    },
  ],
  securityState: {
    protocols: SECURITY_AND_USAGE_PROTOCOLS,
    covenantGateModalOpen: true,
    covenantSignedBy: 'R.M. Suryaningrat Widyapradana (Founder Sovereign)',
    covenantSignedTimestamp: '2026-11-03 08:00 UTC',
    activeSessionUserId: 'TBI-INISIAT-001',
    activeSessionIp: '103.144.19.82',
    activeDeviceCount: 1,
    sessionTokenRevoked: false,
    sessionLockReason: null,
    ipRegistry: [
      {
        id: 'ip-01',
        ipAddress: '103.144.19.82',
        label: 'Simpul Utama Yayasan TBI (Jakarta Sovereign Node)',
        status: 'WHITELISTED',
        updatedAt: '2026-11-03 08:00',
      },
      {
        id: 'ip-02',
        ipAddress: '185.220.101.44',
        label: 'Bot Scraper Anomalik (Auto-Blocked by Sentinel)',
        status: 'BANNED',
        updatedAt: '2026-11-03 09:42',
      },
    ],
    telemetryLogs: [
      {
        id: 'tel-01',
        timestamp: '2026-11-03 11:50:12',
        sessionId: 'SES-9941-A',
        userId: 'TBI-INISIAT-001',
        ipAddress: '103.144.19.82',
        deviceCount: 1,
        event: 'TBI-RULE-03: 1-Device Session Verified · Watermark Injected (TBI-RULE-02)',
        severity: 'NOMINAL',
      },
      {
        id: 'tel-02',
        timestamp: '2026-11-03 09:42:05',
        sessionId: 'SES-0018-X',
        userId: 'ANON-SCRAPER',
        ipAddress: '185.220.101.44',
        deviceCount: 4,
        event: 'TBI-RULE-03: Multi-device & anomalous API scraping (142 req/min) — Token Auto-Revoked',
        severity: 'TOKEN_REVOKED',
      },
    ],
    pendingSubmissions: [
      {
        id: 'pend-01',
        ruleCode: 'TBI-RULE-04',
        submissionType: 'CODEX_ANNOTATION',
        targetLabel: 'MOD-02-ORBIT-CODEX · Folio 14v (Ayat 1:9)',
        authorName: 'Dr. Yohanes Tekle (Fellow Tamu)',
        contentSummary: 'Anotasi filologis tentang vokal Ge’ez órdenes ke-4 pada kata Yäbsen.',
        submittedAt: '2026-11-03 10:15',
        status: 'PENDING',
      },
      {
        id: 'pend-02',
        ruleCode: 'TBI-RULE-04',
        submissionType: 'DONOR_RATING',
        targetLabel: 'MOD-09-DONATUR · Pilar #01 K.P.H. Hadiningrat Surya-Kusuma',
        authorName: 'Dr. Rendra Prakoso (Anggota)',
        contentSummary: 'Rating 5 Bintang: Hibah mikrofilm naskah Aksumit sangat krusial bagi riset.',
        submittedAt: '2026-11-03 11:05',
        status: 'PENDING',
      },
    ],
  },
};

export function appendFounderAuditLog(
  state: FounderCustomizationState,
  entryOrAction:
    | (Omit<AuditLogEntry, 'id' | 'timestamp'> & { timestamp?: string })
    | string,
  moduleId: ModuleId = 'MOD-10-FOUNDER-CONSOLE'
): FounderCustomizationState {
  const newEntry: AuditLogEntry =
    typeof entryOrAction === 'string'
      ? {
          id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          timestamp: '2026-11-03 11:52',
          actor: 'Founder Sovereign (2FA Verified)',
          moduleId,
          actionType: 'FOUNDER_ACTION',
          detail: entryOrAction,
        }
      : {
          id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          timestamp: entryOrAction.timestamp || '2026-11-03 11:52',
          actor: entryOrAction.actor,
          moduleId: entryOrAction.moduleId,
          actionType: entryOrAction.actionType,
          detail: entryOrAction.detail,
        };
  return {
    ...state,
    auditLogs: [newEntry, ...state.auditLogs],
  };
}

