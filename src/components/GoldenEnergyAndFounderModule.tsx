import React, { useState } from 'react';
import {
  GOLDEN_ENERGY_PATHWAYS,
  GoldenEnergyPathKey,
  GoldenEnergyPathway,
  ModuleId,
  MODULES_CONFIG,
  SUPPORTED_UPLOAD_FORMATS,
  SupportedUploadFormat,
  FounderCustomizationState,
  MediaAssetRecord,
  USE_CASE_REGISTRY,
  getOrderedModules,
  reorderModuleSequence,
  evaluateSentinelSession,
  NEOPLATONIC_PHILOSOPHY_FRAMEWORK,
  CMS_CORE_SPEC,
} from '../utils/archiveEngine';
import {
  Compass,
  BookOpen,
  Edit3,
  ShieldCheck,
  Lock,
  Unlock,
  Palette,
  Upload,
  Activity,
  Eye,
  EyeOff,
  Check,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  ArrowUpRight,
} from 'lucide-react';

// --- MODULE 07: GOLDEN ENERGY: 2 TUJUAN PERSIMPANGAN (MOD-07-GOLDEN-ENERGY) ---

interface GoldenEnergyModuleProps {
  onNavigateModule: (moduleId: ModuleId, param?: string) => void;
}

export const GoldenEnergyModule: React.FC<GoldenEnergyModuleProps> = ({
  onNavigateModule,
}) => {
  const [pathways, setPathways] = useState<GoldenEnergyPathway[]>(GOLDEN_ENERGY_PATHWAYS);
  const [activePathKey, setActivePathKey] = useState<GoldenEnergyPathKey>('Mandiri Kemuliaan');

  // Founder Capabilities: customize_path_visuals, update_doctrine_materials
  const [showFounderPanel, setShowFounderPanel] = useState<boolean>(false);
  const [doctrineDraft, setDoctrineDraft] = useState<string>(
    GOLDEN_ENERGY_PATHWAYS[0].doctrineExcerpt
  );
  const [notice, setNotice] = useState<string | null>(null);

  const activePathway =
    pathways.find((p) => p.key === activePathKey) || pathways[0];

  const handleSelectPathway = (key: GoldenEnergyPathKey) => {
    setActivePathKey(key);
    const found = pathways.find((p) => p.key === key);
    if (found) {
      setDoctrineDraft(found.doctrineExcerpt);
    }
  };

  const handleUpdateDoctrine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctrineDraft.trim()) return;
    setPathways((prev) =>
      prev.map((p) =>
        p.key === activePathKey
          ? { ...p, doctrineExcerpt: doctrineDraft.trim() }
          : p
      )
    );
    setNotice(
      `[update_doctrine_materials] Materi doktrin jalur "${activePathKey}" berhasil diperbarui.`
    );
    setTimeout(() => setNotice(null), 3000);
  };

  const handleSwapPathVisual = (imageUrl: string) => {
    setPathways((prev) =>
      prev.map((p) =>
        p.key === activePathKey ? { ...p, bannerImage: imageUrl } : p
      )
    );
    setNotice(
      `[customize_path_visuals] Citra visual jalur "${activePathKey}" berhasil diganti.`
    );
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-archival text-[#64748B]">
            <span>ORDER 07 · MOD-07-GOLDEN-ENERGY</span>
            <span aria-hidden="true">·</span>
            <span>UI MODE: SPLIT-SCREEN INTERACTIVE PATHWAY</span>
            <span aria-hidden="true">·</span>
            <span>2 TUJUAN PERSIMPANGAN</span>
          </div>
          <h1 className="mt-2 font-['Times_New_Roman'] text-3xl font-semibold text-[#0A0A0A]">
            Golden Energy: 2 Tujuan Persimpangan
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
            Eksplorasi interaktif layar terbelah (<em>Split-Screen Interactive Pathway</em>) yang mempertemukan dua orientasi doktrinal Yayasan TBI: <strong>Mandiri Kemuliaan</strong> dan <strong>Bertarung Matrix</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowFounderPanel((p) => !p)}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs font-archival font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            showFounderPanel
              ? 'border-[#151B8D] bg-[#151B8D] text-white'
              : 'border-[#E2E8F0] bg-[#F8F9FA] text-[#0A0A0A] hover:bg-white'
          }`}
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Kapabilitas Pendiri (Golden Energy CMS)</span>
        </button>
      </div>

      {/* Founder Capabilities Drawer: customize_path_visuals & update_doctrine_materials */}
      {showFounderPanel && (
        <div className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <span className="font-archival text-xs font-semibold text-[#151B8D]">
              FOUNDER CAPABILITIES · MOD-07-GOLDEN-ENERGY (JALUR AKTIF: {activePathKey.toUpperCase()})
            </span>
            {notice && (
              <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                {notice}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* customize_path_visuals */}
            <div className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4">
              <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                1. CUSTOMIZE_PATH_VISUALS ({activePathKey})
              </div>
              <p className="text-xs text-[#64748B]">
                Pilih citra latar belakang untuk jalur persimpangan yang sedang aktif:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleSwapPathVisual(
                      '/src/assets/images/art_energi_kemuliaan_1793727760980.jpg'
                    )
                  }
                  className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-3 py-1.5 text-xs text-[#0A0A0A] hover:border-[#151B8D] cursor-pointer"
                >
                  Atrium Kemuliaan
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSwapPathVisual(
                      '/src/assets/images/art_sumber_universal_1793727763347.jpg'
                    )
                  }
                  className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-3 py-1.5 text-xs text-[#0A0A0A] hover:border-[#151B8D] cursor-pointer"
                >
                  Kosmologi Geometri
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSwapPathVisual(
                      '/src/assets/images/golden_dawn_tarot_vault_1793727764058.jpg'
                    )
                  }
                  className="rounded border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs text-[#0A0A0A] hover:border-[#151B8D] cursor-pointer"
                >
                  Meja Arsip Hermetis
                </button>
              </div>
            </div>

            {/* update_doctrine_materials */}
            <form
              onSubmit={handleUpdateDoctrine}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                2. UPDATE_DOCTRINE_MATERIALS ({activePathKey})
              </div>
              <textarea
                rows={2}
                value={doctrineDraft}
                onChange={(e) => setDoctrineDraft(e.target.value)}
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] p-2 text-xs text-[#0A0A0A]"
              />
              <button
                type="submit"
                className="rounded bg-[#151B8D] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Simpan Pembaruan Doktrin
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Canonical Split-Crossroads Banner (JALUR I · ASCENSION vs JALUR II · DECONSTRUCTION) */}
      <div className="split-crossroads">
        <div
          onClick={() => handleSelectPathway('Mandiri Kemuliaan')}
          className="path-kemuliaan cursor-pointer transition-opacity hover:opacity-95"
        >
          <span className="module-tag !text-[#151B8D]">JALUR I · ASCENSION</span>
          <h2 className="font-heading text-2xl font-bold mb-3 text-[#0A0A0A]">
            Mandiri Kemuliaan
          </h2>
          <p className="text-sm leading-relaxed text-[#334155]">
            Pembangunan kedaulatan internal, kebijaksanaan murni, dan kontribusi luhur bagi peradaban manusia.
          </p>
        </div>
        <div
          onClick={() => handleSelectPathway('Bertarung Matrix')}
          className="path-matrix cursor-pointer transition-opacity hover:opacity-95"
        >
          <span className="module-tag !text-[#94A3B8]">JALUR II · DECONSTRUCTION</span>
          <h2 className="font-heading text-2xl font-bold mb-3 text-white">
            Bertarung Matrix
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Dekodifikasi struktur ilusi sistemik, intelijen realis, dan strategi pembebasan kognitif.
          </p>
        </div>
      </div>

      {/* Split-Screen Interactive Pathway Stage (Mandiri Kemuliaan vs Bertarung Matrix) */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {pathways.map((pathway, idx) => {
          const isSelected = pathway.key === activePathKey;
          return (
            <div
              key={pathway.id}
              onClick={() => handleSelectPathway(pathway.key)}
              className={`flex flex-col justify-between rounded-lg border p-6 transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#151B8D] bg-white shadow-sm'
                  : 'border-[#E2E8F0] bg-[#F8F9FA] hover:bg-white'
              }`}
            >
              <div className="space-y-5">
                <div className="relative overflow-hidden rounded border border-[#E2E8F0] bg-[#0F172A] aspect-[16/9]">
                  <img
                    src={pathway.bannerImage}
                    alt={pathway.key}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="font-archival text-xs text-slate-300">
                      TUJUAN PERSIMPANGAN 0{idx + 1} · {pathway.archetype}
                    </div>
                    <h2 className="mt-0.5 font-display-serif text-2xl font-semibold">
                      {pathway.key}
                    </h2>
                  </div>
                </div>

                <div>
                  <div className="font-heading text-sm font-semibold text-[#151B8D]">
                    {pathway.subtitle}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#0A0A0A]">
                    {pathway.corePhilosophy}
                  </p>
                </div>

                {/* Strategic Pillars */}
                <div className="space-y-2.5 border-t border-[#E2E8F0] pt-4">
                  <div className="font-archival text-xs font-semibold text-[#64748B]">
                    3 PILAR STRATEGIS JALUR {pathway.key.toUpperCase()}
                  </div>
                  {pathway.strategicPillars.map((pillar) => (
                    <div
                      key={pillar.code}
                      className="rounded border border-[#E2E8F0] bg-[#F8F9FA] p-3"
                    >
                      <div className="font-archival text-xs font-semibold text-[#151B8D]">
                        {pillar.code} · {pillar.title}
                      </div>
                      <p className="mt-1 text-xs text-[#0A0A0A]">{pillar.detail}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="border-t border-[#E2E8F0] pt-4 font-codex text-base italic text-[#0A0A0A]">
                  {pathway.doctrineExcerpt}
                </blockquote>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateModule('MOD-04-KAPSUL-WAKTU');
                  }}
                  className="inline-flex items-center gap-1.5 rounded bg-[#151B8D] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Materi {pathway.recommendedCapsuleCode}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateModule(
                      'MOD-05-SHEPHIROT',
                      String(pathway.recommendedShephirotNodeId)
                    );
                  }}
                  className="inline-flex items-center gap-1.5 rounded border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-medium text-[#0A0A0A] hover:bg-[#F8F9FA] cursor-pointer"
                >
                  <Compass className="h-3.5 w-3.5 text-[#151B8D]" />
                  <span>Simpul Shephirot #{pathway.recommendedShephirotNodeId}</span>
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

// --- MODULE 10: FOUNDER SOVEREIGN CONSOLE (MOD-10-FOUNDER-CONSOLE) ---

interface FounderConsoleModuleProps {
  founderState: FounderCustomizationState;
  initialUseCaseCode?: string;
  onUpdateFounderState: (
    updater: (prev: FounderCustomizationState) => FounderCustomizationState,
    actionType: string,
    detail: string,
    moduleId?: ModuleId
  ) => void;
  onNavigateModule: (moduleId: ModuleId, param?: string) => void;
}

const ACCENT_COLOR_PRESETS = [
  { name: 'TBI Royal Indigo (Default)', hex: '#151B8D' },
  { name: 'Deep Lapis Sovereign', hex: '#0E1260' },
  { name: 'Obsidian Archival Ink', hex: '#0A0A0A' },
  { name: 'Hermetic Emerald', hex: '#14532D' },
  { name: 'Imperial Burgundy', hex: '#7F1D1D' },
];

export const FounderConsoleModule: React.FC<FounderConsoleModuleProps> = ({
  founderState,
  initialUseCaseCode,
  onUpdateFounderState,
  onNavigateModule,
}) => {
  const [is2faVerified, setIs2faVerified] = useState<boolean>(true);
  const [totpCodeInput, setTotpCodeInput] = useState<string>('884-219');
  const [selectedBackendUC, setSelectedBackendUC] = useState<string>(
    initialUseCaseCode && initialUseCaseCode.startsWith('UC1')
      ? initialUseCaseCode
      : 'UC10'
  );
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [uploadFormat, setUploadFormat] = useState<SupportedUploadFormat>('PDF/A');
  const [uploadTargetMod, setUploadTargetMod] = useState<ModuleId>('MOD-04-KAPSUL-WAKTU');
  const [consoleFeedback, setConsoleFeedback] = useState<string | null>(null);

  // Founder Override states (can_edit_protocol_text, can_ban_or_whitelist_ip, can_view_telemetry_logs)
  const [bannerDraft, setBannerDraft] = useState<string>(
    founderState.securityState.protocols.classification_banner
  );
  const [markerDraft, setMarkerDraft] = useState<string>(
    founderState.securityState.protocols.document_marker
  );
  const [newIpAddress, setNewIpAddress] = useState<string>('');
  const [newIpLabel, setNewIpLabel] = useState<string>('');
  const [newIpStatus, setNewIpStatus] = useState<'WHITELISTED' | 'BANNED'>('BANNED');

  const orderedModules = getOrderedModules(founderState);
  const backendUseCases = USE_CASE_REGISTRY.filter(
    (u) => u.realm === 'BACKEND_SOVEREIGN_CMS'
  );

  const handleToggleModuleVisibility = (modId: ModuleId) => {
    if (modId === 'MOD-01-HOME' || modId === 'MOD-10-FOUNDER-CONSOLE') return;
    const isHidden = founderState.hiddenModules.includes(modId);
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        hiddenModules: isHidden
          ? prev.hiddenModules.filter((id) => id !== modId)
          : [...prev.hiddenModules, modId],
      }),
      'UC16_VISIBILITY_TOGGLE',
      `${isHidden ? 'Menampilkan kembali' : 'Menyembunyikan'} modul ${modId} pada direktori publik.`,
      modId
    );
    setConsoleFeedback(`(UC16) Visibilitas modul ${modId} berhasil diperbarui secara real-time.`);
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  const handleMoveModuleOrder = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    const currentOrder = founderState.moduleSequenceOrder || MODULES_CONFIG.map((m) => m.id);
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;
    const movedModId = currentOrder[index];
    const reordered = reorderModuleSequence(currentOrder, index, targetIndex);
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        moduleSequenceOrder: reordered,
      }),
      'UC16_REORDER_MODULE_SEQUENCE',
      `Memindahkan posisi urutan modul ${movedModId} dari urutan #${index + 1} ke #${targetIndex + 1}.`,
      movedModId
    );
    setConsoleFeedback(
      `(UC16) Urutan modul ${movedModId} dipindahkan ke posisi #${targetIndex + 1}.`
    );
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  const handleResetModuleSequence = () => {
    const defaultIds = MODULES_CONFIG.map((m) => m.id);
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        moduleSequenceOrder: defaultIds,
        hiddenModules: [],
      }),
      'UC16_RESET_SEQUENCE',
      'Mengembalikan urutan 10 modul (01–10) dan mengaktifkan seluruh visibilitas modul.'
    );
    setConsoleFeedback('(UC16) Urutan 10 modul dikembalikan ke konfigurasi standar (01–10).');
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  const handleUploadMediaAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;
    const newMedia: MediaAssetRecord = {
      id: `media-${Date.now()}`,
      fileName: uploadFileName.trim(),
      format: uploadFormat,
      targetModule: uploadTargetMod,
      sizeLabel: '24.6 MB',
      uploadedBy: 'Founder Sovereign (2FA Verified)',
      timestamp: '2026-11-03 11:45',
      url: '/src/assets/images/orit_codex_folio_1793727759954.jpg',
    };
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        mediaLibrary: [newMedia, ...prev.mediaLibrary],
      }),
      'UC11_UC12_MEDIA_UPLOAD',
      `Mengunggah berkas ${newMedia.fileName} (${newMedia.format}) ke modul ${uploadTargetMod}.`,
      uploadTargetMod
    );
    setUploadFileName('');
    setConsoleFeedback(
      `Berkas "${newMedia.fileName}" (${newMedia.format}) berhasil diunggah ke Media Library.`
    );
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  const handleSaveProtocolOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerDraft.trim() || !markerDraft.trim()) return;
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        securityState: {
          ...prev.securityState,
          protocols: {
            ...prev.securityState.protocols,
            classification_banner: bannerDraft.trim(),
            document_marker: markerDraft.trim(),
          },
        },
      }),
      'FOUNDER_OVERRIDE_PROTOCOL_TEXT',
      `Memperbarui teks protokol keamanan: "${bannerDraft.trim()}" (${markerDraft.trim()}).`
    );
    setConsoleFeedback('Founder Override: Teks Classification Banner & Document Marker diperbarui.');
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  const handleAddIpRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIpAddress.trim()) return;
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        securityState: {
          ...prev.securityState,
          ipRegistry: [
            {
              id: `ip-${Date.now()}`,
              ipAddress: newIpAddress.trim(),
              label: newIpLabel.trim() || 'Entri Manual Founder Override',
              status: newIpStatus,
              updatedAt: '2026-11-03 11:55',
            },
            ...prev.securityState.ipRegistry,
          ],
        },
      }),
      'FOUNDER_OVERRIDE_IP_REGISTRY',
      `Menambahkan alamat IP ${newIpAddress.trim()} dengan status ${newIpStatus}.`
    );
    setNewIpAddress('');
    setNewIpLabel('');
    setConsoleFeedback(`Alamat IP ditambahkan ke registri sebagai ${newIpStatus}.`);
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  const handleToggleIpStatus = (ipId: string) => {
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        securityState: {
          ...prev.securityState,
          ipRegistry: prev.securityState.ipRegistry.map((item) =>
            item.id === ipId
              ? {
                  ...item,
                  status: item.status === 'WHITELISTED' ? 'BANNED' : 'WHITELISTED',
                  updatedAt: '2026-11-03 11:55',
                }
              : item
          ),
        },
      }),
      'FOUNDER_OVERRIDE_IP_TOGGLE',
      `Mengubah status otorisasi IP (${ipId}) melalui Founder Override.`
    );
    setConsoleFeedback('Status Whitelist / Ban IP berhasil diperbarui.');
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  const handleSimulateSentinelAnomaly = () => {
    const check = evaluateSentinelSession({
      deviceCount: 3,
      requestsPerMinute: 135,
      ipAddress: '185.220.101.44',
      ipRegistry: founderState.securityState.ipRegistry,
    });
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        securityState: {
          ...prev.securityState,
          activeDeviceCount: 3,
          sessionTokenRevoked: check.tokenRevoked,
          sessionLockReason: check.reason,
          telemetryLogs: [
            {
              id: `tel-${Date.now()}`,
              timestamp: '2026-11-03 11:56:00',
              sessionId: 'SES-ANOMALY-99',
              userId: prev.securityState.activeSessionUserId,
              ipAddress: '185.220.101.44',
              deviceCount: 3,
              event: check.reason,
              severity: check.severity,
            },
            ...prev.securityState.telemetryLogs,
          ],
        },
      }),
      'TBI_RULE_03_AUTO_REVOKE',
      check.reason
    );
    setConsoleFeedback(check.reason);
    setTimeout(() => setConsoleFeedback(null), 3500);
  };

  const handleRestoreSessionOverride = () => {
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        securityState: {
          ...prev.securityState,
          activeDeviceCount: 1,
          sessionTokenRevoked: false,
          sessionLockReason: null,
          telemetryLogs: [
            {
              id: `tel-${Date.now()}`,
              timestamp: '2026-11-03 11:56:30',
              sessionId: 'SES-RESTORED-01',
              userId: prev.securityState.activeSessionUserId,
              ipAddress: prev.securityState.activeSessionIp,
              deviceCount: 1,
              event: 'FOUNDER OVERRIDE: Token sesi dipulihkan ke 1-Device Nominal State.',
              severity: 'NOMINAL',
            },
            ...prev.securityState.telemetryLogs,
          ],
        },
      }),
      'FOUNDER_OVERRIDE_RESTORE_SESSION',
      'Memulihkan token sesi tunggal (1-device limit) melalui Founder Override.'
    );
    setConsoleFeedback('Token sesi berhasil dipulihkan ke status 1-Device Nominal.');
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  const handleModerateSubmission = (
    submissionId: string,
    decision: 'APPROVED' | 'REJECTED'
  ) => {
    onUpdateFounderState(
      (prev) => ({
        ...prev,
        securityState: {
          ...prev.securityState,
          pendingSubmissions: prev.securityState.pendingSubmissions.map((s) =>
            s.id === submissionId ? { ...s, status: decision } : s
          ),
        },
      }),
      `TBI_RULE_04_${decision}`,
      `TBI-RULE-04 Archival Purity Filter: Submisi ${submissionId} diubah menjadi ${decision}.`
    );
    setConsoleFeedback(
      `(TBI-RULE-04) Submisi berhasil ditetapkan menjadi ${decision}.`
    );
    setTimeout(() => setConsoleFeedback(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-14 space-y-12 bg-[#f8f7f4] text-[#111113]">
      {/* VARIATION 3 EDITORIAL 2-COLUMN CONTAINER (1fr + 380px Control Pane) */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] items-start">
        {/* LEFT COLUMN: Editorial Heading + 4 Case Studies + Interactive Console */}
        <div className="space-y-8 min-w-0">
          <section className="border-b border-[#111113] pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="meta">Order 10 · System V4.0</span>
              <span aria-hidden="true" className="text-xs text-[#111113]/40">·</span>
              <span className="meta">{NEOPLATONIC_PHILOSOPHY_FRAMEWORK.name} (7_iluminasi)</span>
              <span aria-hidden="true" className="text-xs text-[#111113]/40">·</span>
              <span className="meta">{CMS_CORE_SPEC.global_permissions.join(' · ')}</span>
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-[4.5rem] font-semibold leading-[0.95] tracking-[-0.03em] my-4 text-[#111113]">
              Founders Sovereign Console
            </h1>
            <p className="text-[1.08rem] text-[#111113]/65 leading-[1.55] max-w-[650px]">
              Pusat kendali mutlak (Backend/CMS) bagi aktor Pendiri dengan otorisasi 7_iluminasi. Mengelola 10 modul kedaulatan dari arsitektur visual hingga enkripsi esoteris ({CMS_CORE_SPEC.console_name}).
            </p>
          </section>

          {/* 4 Editorial Case Studies Grid (UC10, UC12, UC15, UC16) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div
              onClick={() => {
                setSelectedBackendUC('UC10');
                document.getElementById('visual-web-builder-panel')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="case-card-editorial cursor-pointer group"
            >
              <span className="meta">UC10 · Interface</span>
              <h3 className="group-hover:text-[#151B8D] transition-colors">Visual Web Builder</h3>
              <p>
                Mengkustomisasi tema, token warna utama, dan tata letak portal secara real-time.
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedBackendUC('UC12');
                onNavigateModule('MOD-04-KAPSUL-WAKTU');
              }}
              className="case-card-editorial cursor-pointer group"
            >
              <span className="meta">UC12 · Security</span>
              <h3 className="group-hover:text-[#151B8D] transition-colors">Custom PDF Enkripsi</h3>
              <p>
                Transmisi naskah PDF/A ke Kapsul Ruang &amp; Waktu dengan protokol AES-256.
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedBackendUC('UC15');
                onNavigateModule('MOD-09-DONATUR');
              }}
              className="case-card-editorial cursor-pointer group"
            >
              <span className="meta">UC15 · Database</span>
              <h3 className="group-hover:text-[#151B8D] transition-colors">Pilar Donatur</h3>
              <p>
                Manajemen data filantropi 12 Pilar Peradaban dan moderasi rating komunitas.
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedBackendUC('UC16');
                document.getElementById('visual-web-builder-panel')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="case-card-editorial cursor-pointer group"
            >
              <span className="meta">UC16 · Logic</span>
              <h3 className="group-hover:text-[#151B8D] transition-colors">Module Sequencing</h3>
              <p>
                Mengatur urutan sekuensial dan visibilitas dari 10 modul sistem transmisi.
              </p>
            </div>
          </div>

          {consoleFeedback && (
            <div
              role="status"
              className="flex items-center gap-2 border-l-4 border-[#151B8D] bg-white px-4 py-3 text-xs font-medium text-[#111113] shadow-sm"
            >
              <Check className="h-4 w-4 text-[#151B8D]" />
              <span>{consoleFeedback}</span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Variation 3 Control Pane (Media Library + Security Registry + Auth Status) */}
        <aside className="bg-white p-8 sm:p-10 border border-[#111113]/10 flex flex-col gap-8">
          {/* Media Library Uploader */}
          <div>
            <span className="meta">Media Library</span>
            <form onSubmit={handleUploadMediaAsset} className="mt-4 flex flex-col gap-2.5">
              <label
                htmlFor="variation3-media-filename"
                className="meta !text-[#111113]"
              >
                Filename
              </label>
              <input
                id="variation3-media-filename"
                type="text"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                placeholder="Contoh: folio_14r_master.tiff"
                className="w-full border border-[#111113]/15 bg-white px-3 py-2.5 text-sm text-[#111113]"
              />
              <div className="flex gap-2">
                <select
                  aria-label="Format Berkas Unggahan"
                  value={uploadFormat}
                  onChange={(e) => setUploadFormat(e.target.value as SupportedUploadFormat)}
                  className="flex-1 border border-[#111113]/15 bg-white px-2.5 py-2 text-xs font-['Space_Mono'] text-[#111113]"
                >
                  {SUPPORTED_UPLOAD_FORMATS.map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Modul Tujuan Unggahan"
                  value={uploadTargetMod}
                  onChange={(e) => setUploadTargetMod(e.target.value as ModuleId)}
                  className="flex-1 border border-[#111113]/15 bg-white px-2.5 py-2 text-xs font-['Space_Mono'] text-[#111113]"
                >
                  {orderedModules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.id.slice(0, 6)}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-editorial w-full mt-1">
                Unggah Berkas
              </button>
            </form>
          </div>

          {/* Security Registry Log Strips */}
          <div className="border-t border-[#111113]/10 pt-6">
            <span className="meta">Security Registry</span>
            <div className="mt-4 space-y-2">
              <div className="log-strip">
                <span>11:52</span> CHANGE_LAYOUT →{' '}
                {founderState.layoutDensity === 'ARCHIVAL_COMFORT' ? 'COMFORT' : 'COMPACT'}
              </div>
              <div className="log-strip">
                <span>11:45</span> 2FA_AUTH → {is2faVerified ? 'VERIFIED' : 'LOCKED'}
              </div>
              <div className="log-strip">
                <span>11:30</span> TOKEN_SYNC → {founderState.securityState.activeDeviceCount}-DEVICE
              </div>
              <div className="log-strip">
                <span>11:15</span> RULE-01 → GATE_OPEN
              </div>
              {founderState.auditLogs.slice(0, 2).map((log) => (
                <div key={log.id} className="log-strip truncate" title={log.detail}>
                  <span>{log.timestamp.split(' ')[1] || '12:00'}</span> {log.actionType}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('security-override-console')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-editorial-outline w-full mt-4"
            >
              Audit Full Logs
            </button>
          </div>

          {/* Auth Status Sovereign Card */}
          <div className="mt-auto bg-[#111113] p-6 text-white space-y-2">
            <span className="meta !text-[#888888]">Auth Status</span>
            <div className="font-['Space_Mono'] text-xs text-white pt-1">
              Sovereign: R.M. Suryaningrat
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <span className="inline-block bg-[#27ae60] px-2 py-1 font-['Space_Mono'] text-[10px] text-white">
                {is2faVerified ? '2FA_SECURE' : '2FA_LOCKED'}
              </span>
              <button
                type="button"
                onClick={() => setIs2faVerified((v) => !v)}
                className="font-['Space_Mono'] text-[10px] uppercase tracking-wider text-slate-300 hover:text-white underline cursor-pointer"
              >
                {is2faVerified ? 'Kunci Sesi 2FA' : `Verifikasi 2FA (${totpCodeInput})`}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {!is2faVerified ? (
        <div className="mx-auto max-w-md border border-[#111113]/15 bg-white p-8 text-center space-y-4">
          <Lock className="mx-auto h-8 w-8 text-[#151B8D]" />
          <h2 className="font-heading text-xl font-semibold text-[#111113]">
            Otorisasi Founder Sovereign (2FA Required)
          </h2>
          <p className="text-xs text-[#111113]/65">
            Masukkan kode token perangkat keras 6 digit Pendiri untuk membuka Visual Web Builder dan Media Uploader.
          </p>
          <input
            type="text"
            aria-label="Kode Token 2FA Pendiri"
            value={totpCodeInput}
            onChange={(e) => setTotpCodeInput(e.target.value)}
            className="w-full border border-[#111113]/20 bg-[#f8f7f4] px-3 py-2 text-center font-archival text-base font-bold tracking-widest text-[#111113]"
          />
          <button
            type="button"
            onClick={() => setIs2faVerified(true)}
            className="btn-editorial w-full"
          >
            Buka Kunci Konsol Kedaulatan Pendiri
          </button>
        </div>
      ) : (
        <div id="visual-web-builder-panel" className="space-y-10">
          {/* KENDALI MUTLAK (BACKEND/CMS) USE CASE COMMAND HUB (UC10 - UC16) */}
          <section className="border border-[#111113]/15 bg-white p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
              <div>
                <div className="font-archival text-xs font-semibold text-[#151B8D]">
                  [ AKTOR: FOUNDER ] · KENDALI MUTLAK (BACKEND / CMS)
                </div>
                <h2 className="font-heading text-lg font-semibold text-[#0A0A0A]">
                  Matriks Eksekusi 7 Use Case Kedaulatan Pendiri (UC10 s.d. UC16)
                </h2>
              </div>
              <span className="font-archival text-xs text-[#64748B]">
                FOKUS AKTIF: {selectedBackendUC}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {backendUseCases.map((uc) => {
                const isSelected = selectedBackendUC === uc.code;
                return (
                  <div
                    key={uc.code}
                    onClick={() => setSelectedBackendUC(uc.code)}
                    className={`flex flex-col justify-between rounded-md border p-3.5 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#151B8D] bg-white shadow-sm'
                        : 'border-[#E2E8F0] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-archival text-xs">
                        <span className="font-bold text-[#151B8D]">({uc.code})</span>
                        <span className="text-[11px] text-[#64748B]">FOUNDER_ONLY</span>
                      </div>
                      <h3 className="mt-1 font-heading text-xs font-semibold text-[#0A0A0A]">
                        {uc.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                        {uc.summary}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#E2E8F0] pt-2.5">
                      {uc.code === 'UC11' && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateModule('MOD-03-ART-GALLERY');
                            }}
                            className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2 py-1 font-archival text-[10px] font-medium text-[#151B8D] hover:bg-white cursor-pointer"
                          >
                            Foto Galeri
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateModule('MOD-01-HOME');
                            }}
                            className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2 py-1 font-archival text-[10px] font-medium text-[#151B8D] hover:bg-white cursor-pointer"
                          >
                            Foto Bio
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateModule('MOD-09-DONATUR');
                            }}
                            className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2 py-1 font-archival text-[10px] font-medium text-[#151B8D] hover:bg-white cursor-pointer"
                          >
                            Foto Donatur
                          </button>
                        </>
                      )}
                      {uc.code === 'UC12' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateModule('MOD-04-KAPSUL-WAKTU');
                          }}
                          className="inline-flex items-center gap-1 rounded bg-[#151B8D] px-2.5 py-1 font-archival text-[10px] font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                        >
                          <span>Buka Enkripsi PDF Kapsul Waktu</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      )}
                      {uc.code === 'UC13' && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateModule('MOD-02-ORBIT-CODEX');
                            }}
                            className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2 py-1 font-archival text-[10px] font-medium text-[#151B8D] hover:bg-white cursor-pointer"
                          >
                            6 Orbit-Codex
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateModule('MOD-06-VIDEO');
                            }}
                            className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2 py-1 font-archival text-[10px] font-medium text-[#151B8D] hover:bg-white cursor-pointer"
                          >
                            30 Video
                          </button>
                        </>
                      )}
                      {uc.code === 'UC14' && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateModule('MOD-07-GOLDEN-ENERGY');
                            }}
                            className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2 py-1 font-archival text-[10px] font-medium text-[#151B8D] hover:bg-white cursor-pointer"
                          >
                            Golden Energy
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateModule('MOD-08-GOLDEN-DAWN');
                            }}
                            className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2 py-1 font-archival text-[10px] font-medium text-[#151B8D] hover:bg-white cursor-pointer"
                          >
                            Golden Dawn
                          </button>
                        </>
                      )}
                      {uc.code === 'UC15' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateModule('MOD-09-DONATUR');
                          }}
                          className="inline-flex items-center gap-1 rounded bg-[#151B8D] px-2.5 py-1 font-archival text-[10px] font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                        >
                          <span>Kelola 12 Donatur & Moderasi Rating</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      )}
                      {(uc.code === 'UC10' || uc.code === 'UC16') && (
                        <span className="font-archival text-[10px] font-semibold text-emerald-800">
                          Aktif di Panel Visual Builder di Bawah ↓
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FEATURE 1: VISUAL_WEB_BUILDER (UC10 & UC16) */}
          <section className="rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#151B8D]" />
                <div>
                  <div className="font-archival text-xs font-semibold text-[#151B8D]">
                    FEATURE 01 · VISUAL_WEB_BUILDER (UC10 & UC16)
                  </div>
                  <h2 className="font-heading text-lg font-semibold text-[#0A0A0A]">
                    (UC10) Kustomisasi Tema, Warna & Layout · (UC16) Urutan & Visibilitas Modul
                  </h2>
                </div>
              </div>
              <span className="font-archival text-xs text-[#64748B]">
                TOKEN AKTIF: {founderState.primaryAccentHex} · FONT: {founderState.headingFontChoice} · LAYOUT: {founderState.layoutDensity}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* UC10: Theme Color, Typography & Density */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <label className="block font-archival text-xs font-semibold text-[#0A0A0A]">
                    (UC10) WARNA AKSEN UTAMA (PRIMARY_ACCENT TOKEN)
                  </label>
                  <div className="mt-2 space-y-2">
                    {ACCENT_COLOR_PRESETS.map((preset) => {
                      const isCurrent = founderState.primaryAccentHex === preset.hex;
                      return (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => {
                            onUpdateFounderState(
                              (prev) => ({ ...prev, primaryAccentHex: preset.hex }),
                              'UC10_CHANGE_THEME_COLOR',
                              `Mengubah token warna aksen utama ke ${preset.name} (${preset.hex}).`
                            );
                            setConsoleFeedback(`(UC10) Warna tema diubah ke ${preset.name}.`);
                            setTimeout(() => setConsoleFeedback(null), 2500);
                          }}
                          className={`w-full flex items-center justify-between rounded border px-3 py-2 text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'border-[#151B8D] bg-[#F8F9FA] font-semibold text-[#0A0A0A]'
                              : 'border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0A0A0A]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="inline-block h-3.5 w-3.5 rounded-sm border border-black/10"
                              style={{ backgroundColor: preset.hex }}
                            />
                            <span>{preset.name}</span>
                          </span>
                          <span className="font-archival">{preset.hex}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-archival text-xs font-semibold text-[#0A0A0A]">
                    (UC10) TIPOGRAFI TAJUK UTAMA (HEADING TYPOGRAPHY)
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(['EB Garamond', 'Montserrat', 'Cinzel'] as const).map((font) => (
                      <button
                        key={font}
                        type="button"
                        onClick={() => {
                          onUpdateFounderState(
                            (prev) => ({ ...prev, headingFontChoice: font }),
                            'UC10_CHANGE_TYPOGRAPHY',
                            `Mengubah tipografi tajuk menjadi ${font}.`
                          );
                        }}
                        className={`rounded border px-3 py-2 text-xs font-medium cursor-pointer ${
                          founderState.headingFontChoice === font
                            ? 'border-[#151B8D] bg-[#151B8D] text-white'
                            : 'border-[#E2E8F0] bg-[#F8F9FA] text-[#0A0A0A]'
                        }`}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-archival text-xs font-semibold text-[#0A0A0A]">
                    (UC10) TATA LETAK & KERAPATAN HALAMAN (LAYOUT DENSITY)
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(['ARCHIVAL_COMFORT', 'COMPACT_RESEARCH'] as const).map((density) => (
                      <button
                        key={density}
                        type="button"
                        onClick={() => {
                          onUpdateFounderState(
                            (prev) => ({ ...prev, layoutDensity: density }),
                            'UC10_CHANGE_LAYOUT_DENSITY',
                            `Mengubah mode tata letak web ke ${density}.`
                          );
                          setConsoleFeedback(`(UC10) Mode layout diubah ke ${density}.`);
                          setTimeout(() => setConsoleFeedback(null), 2500);
                        }}
                        className={`rounded border px-3 py-2 text-xs font-archival font-medium cursor-pointer ${
                          founderState.layoutDensity === density
                            ? 'border-[#151B8D] bg-[#151B8D] text-white'
                            : 'border-[#E2E8F0] bg-[#F8F9FA] text-[#0A0A0A]'
                        }`}
                      >
                        {density === 'ARCHIVAL_COMFORT' ? 'Archival Comfort' : 'Compact Research'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* UC16: Module Sequence Reordering & Visibility Matrix */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                    (UC16) MENGATUR URUTAN SEKUENS (↑/↓) & VISIBILITAS 10 MODUL
                  </div>
                  <button
                    type="button"
                    onClick={handleResetModuleSequence}
                    className="inline-flex items-center gap-1 rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1 font-archival text-[11px] font-medium text-[#64748B] hover:text-[#0A0A0A] cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset Urutan (01–10)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {orderedModules.map((mod, idx) => {
                    const isHidden = founderState.hiddenModules.includes(mod.id);
                    const isLockedCore =
                      mod.id === 'MOD-01-HOME' || mod.id === 'MOD-10-FOUNDER-CONSOLE';
                    return (
                      <div
                        key={mod.id}
                        className="flex items-center justify-between gap-2 rounded border border-[#E2E8F0] bg-[#F8F9FA] p-2.5 text-xs"
                      >
                        <div className="min-w-0">
                          <div className="font-archival text-[11px] font-semibold text-[#151B8D]">
                            {mod.order < 10 ? `0${mod.order}` : mod.order} · {mod.id}
                          </div>
                          <button
                            type="button"
                            onClick={() => onNavigateModule(mod.id)}
                            className="truncate font-medium text-[#0A0A0A] hover:underline cursor-pointer"
                          >
                            {mod.shortLabel.replace(/^\d+\.\s*/, '')}
                          </button>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            aria-label={`Geser Naik ${mod.id}`}
                            onClick={() => handleMoveModuleOrder(idx, -1)}
                            className="rounded border border-[#E2E8F0] bg-white p-1 text-[#0A0A0A] hover:bg-[#F8F9FA] disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === orderedModules.length - 1}
                            aria-label={`Geser Turun ${mod.id}`}
                            onClick={() => handleMoveModuleOrder(idx, 1)}
                            className="rounded border border-[#E2E8F0] bg-white p-1 text-[#0A0A0A] hover:bg-[#F8F9FA] disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={isLockedCore}
                            onClick={() => handleToggleModuleVisibility(mod.id)}
                            className={`inline-flex items-center gap-1 rounded px-2 py-1 font-archival text-[11px] font-medium whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 ${
                              isHidden
                                ? 'bg-rose-100 text-rose-900'
                                : 'bg-white border border-[#E2E8F0] text-[#0A0A0A]'
                            }`}
                          >
                            {isHidden ? (
                              <>
                                <EyeOff className="h-3 w-3" />
                                <span>Sembunyi</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-3 w-3 text-[#151B8D]" />
                                <span>Aktif</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE 2: MEDIA_LIBRARY_UPLOADER (UC11 & UC12) & FEATURE 3: AUDIT_AND_SECURITY */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Multi-format Media Library Uploader (JPG, PNG, WEBP, SVG, PDF/A, MP4, TIFF) */}
            <section className="lg:col-span-6 rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <Upload className="h-5 w-5 text-[#151B8D]" />
                <div>
                  <div className="font-archival text-xs font-semibold text-[#151B8D]">
                    FEATURE 02 · MEDIA_LIBRARY_UPLOADER (UC11 & UC12)
                  </div>
                  <h2 className="font-heading text-base font-semibold text-[#0A0A0A]">
                    Upload Multi-Format ({SUPPORTED_UPLOAD_FORMATS.join(', ')})
                  </h2>
                </div>
              </div>

              <form onSubmit={handleUploadMediaAsset} className="space-y-3">
                <div>
                  <label
                    htmlFor="media-upload-filename"
                    className="block font-archival text-xs font-semibold text-[#0A0A0A]"
                  >
                    NAMA BERKAS ARSIP / MEDIA BARU
                  </label>
                  <input
                    id="media-upload-filename"
                    type="text"
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                    placeholder="Contoh: kodeks_hermetis_folio_17r.tiff atau kuliah_matrix.mp4"
                    className="mt-1 w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-3 py-2 text-xs text-[#0A0A0A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="media-upload-format"
                      className="block font-archival text-xs font-semibold text-[#0A0A0A]"
                    >
                      FORMAT BERKAS
                    </label>
                    <select
                      id="media-upload-format"
                      value={uploadFormat}
                      onChange={(e) => setUploadFormat(e.target.value as SupportedUploadFormat)}
                      className="mt-1 w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-2 text-xs font-archival text-[#0A0A0A]"
                    >
                      {SUPPORTED_UPLOAD_FORMATS.map((fmt) => (
                        <option key={fmt} value={fmt}>
                          {fmt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="media-upload-target"
                      className="block font-archival text-xs font-semibold text-[#0A0A0A]"
                    >
                      MODUL TUJUAN
                    </label>
                    <select
                      id="media-upload-target"
                      value={uploadTargetMod}
                      onChange={(e) => setUploadTargetMod(e.target.value as ModuleId)}
                      className="mt-1 w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-2 text-xs text-[#0A0A0A]"
                    >
                      {orderedModules.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.id} — {m.shortLabel}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#151B8D] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                >
                  Unggah Berkas ke Pustaka Media Yayasan
                </button>
              </form>

              <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
                <div className="font-archival text-xs font-semibold text-[#64748B]">
                  INDEKS PUSTAKA MEDIA ({founderState.mediaLibrary.length} BERKAS)
                </div>
                <div className="divide-y divide-[#E2E8F0] rounded border border-[#E2E8F0]">
                  {founderState.mediaLibrary.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between gap-2 p-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-archival font-semibold text-[#0A0A0A]">
                          {asset.fileName}
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          Target: {asset.targetModule} · {asset.timestamp}
                        </div>
                      </div>
                      <span className="font-archival font-semibold text-[#151B8D] shrink-0">
                        {asset.format} · {asset.sizeLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Audit and Security Log */}
            <section className="lg:col-span-6 rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <Activity className="h-5 w-5 text-[#151B8D]" />
                <div>
                  <div className="font-archival text-xs font-semibold text-[#151B8D]">
                    FEATURE 03 · AUDIT_AND_SECURITY
                  </div>
                  <h2 className="font-heading text-base font-semibold text-[#0A0A0A]">
                    Log Aktivitas Perubahan Web & Manajemen Hak Akses Anggota
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-[#E2E8F0] rounded border border-[#E2E8F0] bg-[#F8F9FA]">
                {founderState.auditLogs.map((log) => (
                  <div key={log.id} className="p-3.5 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-archival text-[11px]">
                      <span className="font-semibold text-[#151B8D]">
                        {log.actionType} · {log.moduleId}
                      </span>
                      <span className="text-[#64748B]">{log.timestamp}</span>
                    </div>
                    <p className="font-medium text-[#0A0A0A]">{log.detail}</p>
                    <div className="text-[11px] text-[#64748B]">Otoritas: {log.actor}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* FEATURE 04: SECURITY & USAGE PROTOCOLS (STRICT_ZERO_TOLERANCE + FOUNDER_OVERRIDE) */}
          <section
            id="security-override-console"
            className="rounded-lg border border-[#151B8D] bg-white p-6 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
              <div>
                <div className="font-archival text-xs font-semibold text-[#151B8D]">
                  FEATURE 04 · SECURITY_AND_USAGE_PROTOCOLS · ENFORCEMENT: {founderState.securityState.protocols.enforcement_mode}
                </div>
                <h2 className="mt-1 font-heading text-lg font-semibold text-[#0A0A0A]">
                  4 Core Security Rules (TBI-RULE-01 s.d. TBI-RULE-04) & Founder Sovereign Override
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
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
                      'TBI_RULE_01_TEST_GATE',
                      'Menguji tampilan penuh The Initiate Covenant Gate (TBI-RULE-01).'
                    )
                  }
                  className="rounded border border-[#151B8D] bg-[#F8F9FA] px-3 py-1.5 font-archival text-xs font-semibold text-[#151B8D] hover:bg-white cursor-pointer"
                >
                  Uji Gerbang TBI-RULE-01 (Covenant Gate)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* 1. founder_override.can_edit_protocol_text & TBI-RULE-04 Pending Queue */}
              <div className="space-y-4 rounded border border-[#E2E8F0] bg-[#F8F9FA] p-4">
                <form onSubmit={handleSaveProtocolOverride} className="space-y-2.5">
                  <div className="font-archival text-xs font-semibold text-[#151B8D]">
                    1. CAN_EDIT_PROTOCOL_TEXT (TRUE)
                  </div>
                  <label className="block font-archival text-[11px] font-semibold text-[#0A0A0A]">
                    CLASSIFICATION BANNER
                    <input
                      type="text"
                      value={bannerDraft}
                      onChange={(e) => setBannerDraft(e.target.value)}
                      className="mt-1 w-full rounded border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                    />
                  </label>
                  <label className="block font-archival text-[11px] font-semibold text-[#0A0A0A]">
                    DOCUMENT MARKER
                    <input
                      type="text"
                      value={markerDraft}
                      onChange={(e) => setMarkerDraft(e.target.value)}
                      className="mt-1 w-full rounded border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full rounded bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                  >
                    Simpan Teks Protokol & Watermark
                  </button>
                </form>

                {/* TBI-RULE-04: Archival Purity & Conduct Filter */}
                <div className="border-t border-[#E2E8F0] pt-4 space-y-2.5">
                  <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                    TBI-RULE-04 · ARCHIVAL PURITY & CONDUCT FILTER (PENDING QUEUE)
                  </div>
                  <div className="space-y-2">
                    {founderState.securityState.pendingSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="rounded border border-[#E2E8F0] bg-white p-2.5 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-archival text-[10px]">
                          <span className="font-semibold text-[#151B8D]">
                            {sub.submissionType}
                          </span>
                          <span
                            className={`font-bold ${
                              sub.status === 'APPROVED'
                                ? 'text-emerald-700'
                                : sub.status === 'REJECTED'
                                ? 'text-rose-700'
                                : 'text-amber-700'
                            }`}
                          >
                            STATUS: {sub.status}
                          </span>
                        </div>
                        <div className="font-medium text-[#0A0A0A]">{sub.targetLabel}</div>
                        <p className="text-[11px] text-[#64748B]">
                          {sub.authorName}: “{sub.contentSummary}”
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleModerateSubmission(sub.id, 'APPROVED')}
                            className="rounded bg-emerald-700 px-2.5 py-1 font-archival text-[10px] font-medium text-white hover:bg-emerald-800 cursor-pointer"
                          >
                            Setujui (Approve)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleModerateSubmission(sub.id, 'REJECTED')}
                            className="rounded border border-rose-300 bg-rose-50 px-2.5 py-1 font-archival text-[10px] font-medium text-rose-900 hover:bg-rose-100 cursor-pointer"
                          >
                            Tolak (Reject)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. founder_override.can_ban_or_whitelist_ip */}
              <div className="space-y-4 rounded border border-[#E2E8F0] bg-[#F8F9FA] p-4">
                <div className="font-archival text-xs font-semibold text-[#151B8D]">
                  2. CAN_BAN_OR_WHITELIST_IP (TRUE)
                </div>
                <form onSubmit={handleAddIpRecord} className="space-y-2.5">
                  <input
                    type="text"
                    value={newIpAddress}
                    onChange={(e) => setNewIpAddress(e.target.value)}
                    placeholder="Alamat IPv4/IPv6 (mis. 203.0.113.55)..."
                    className="w-full rounded border border-[#E2E8F0] bg-white px-2.5 py-1.5 font-archival text-xs text-[#0A0A0A]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newIpLabel}
                      onChange={(e) => setNewIpLabel(e.target.value)}
                      placeholder="Label node / alasan..."
                      className="rounded border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                    />
                    <select
                      aria-label="Status Otorisasi IP"
                      value={newIpStatus}
                      onChange={(e) =>
                        setNewIpStatus(e.target.value as 'WHITELISTED' | 'BANNED')
                      }
                      className="rounded border border-[#E2E8F0] bg-white px-2 py-1.5 font-archival text-xs text-[#0A0A0A]"
                    >
                      <option value="BANNED">BANNED</option>
                      <option value="WHITELISTED">WHITELISTED</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                  >
                    Tambahkan ke Registri IP
                  </button>
                </form>

                <div className="divide-y divide-[#E2E8F0] rounded border border-[#E2E8F0] bg-white">
                  {founderState.securityState.ipRegistry.map((ip) => (
                    <div
                      key={ip.id}
                      className="flex items-center justify-between gap-2 p-2.5 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-archival font-semibold text-[#0A0A0A]">
                          {ip.ipAddress}
                        </div>
                        <div className="truncate text-[11px] text-[#64748B]">{ip.label}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleIpStatus(ip.id)}
                        className={`rounded px-2 py-1 font-archival text-[10px] font-bold shrink-0 cursor-pointer ${
                          ip.status === 'WHITELISTED'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {ip.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. founder_override.can_view_telemetry_logs & TBI-RULE-03 Silent Sentinel */}
              <div className="space-y-4 rounded border border-[#E2E8F0] bg-[#F8F9FA] p-4">
                <div className="flex items-center justify-between">
                  <div className="font-archival text-xs font-semibold text-[#151B8D]">
                    3. CAN_VIEW_TELEMETRY_LOGS (TBI-RULE-03)
                  </div>
                  <span className="font-archival text-[10px] font-semibold text-[#0A0A0A]">
                    DEVICES: {founderState.securityState.activeDeviceCount}/1
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateSentinelAnomaly}
                    className="flex-1 rounded border border-rose-300 bg-rose-50 px-2.5 py-1.5 font-archival text-[11px] font-semibold text-rose-900 hover:bg-rose-100 cursor-pointer"
                  >
                    Simulasi Anomali (Auto-Revoke)
                  </button>
                  <button
                    type="button"
                    onClick={handleRestoreSessionOverride}
                    className="flex-1 rounded bg-[#151B8D] px-2.5 py-1.5 font-archival text-[11px] font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                  >
                    Pulihkan Token Sesi
                  </button>
                </div>

                <div className="divide-y divide-[#E2E8F0] rounded border border-[#E2E8F0] bg-white max-h-64 overflow-y-auto">
                  {founderState.securityState.telemetryLogs.map((tlog) => (
                    <div key={tlog.id} className="p-2.5 space-y-1 text-xs">
                      <div className="flex items-center justify-between font-archival text-[10px]">
                        <span
                          className={`font-bold ${
                            tlog.severity === 'TOKEN_REVOKED'
                              ? 'text-rose-700'
                              : 'text-emerald-700'
                          }`}
                        >
                          {tlog.severity} · {tlog.ipAddress}
                        </span>
                        <span className="text-[#64748B]">{tlog.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[#0A0A0A]">{tlog.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
