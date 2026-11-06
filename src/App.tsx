/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ModuleId,
  MODULES_CONFIG,
  SYSTEM_MANIFEST,
  GoldenDawnSubId,
  FounderConsoleState,
  INITIAL_FOUNDER_STATE,
  COVENANT_PROTOCOLS_I_TO_IV,
  appendFounderAuditLog,
  getOrderedModules,
  generateForensicWatermark,
  INITIAL_DONORS,
  DonorFigure,
  NEOPLATONIC_PHILOSOPHY_FRAMEWORK,
  CMS_CORE_SPEC,
} from './utils/archiveEngine';
import { HomeModule } from './components/HomeModule';
import { KapsulWaktuModule } from './components/KapsulWaktuModule';
import { ShephirotModule } from './components/ShephirotModule';
import { OritCodexModule } from './components/OritCodexModule';
import { ArtGalleryModule, GoldenDawnModule } from './components/GalleryAndGoldenDawnModule';
import { DonorRateModule, VideoMediaModule } from './components/DonorAndVideoModule';
import { GoldenEnergyModule, FounderConsoleModule } from './components/GoldenEnergyAndFounderModule';
import { X, ShieldAlert, CornerUpLeft, Sparkles } from 'lucide-react';

function resolveModuleFromPathname(pathname: string): ModuleId {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/orit-codex' || clean === '/orbit-codex') {
    return 'MOD-02-ORBIT-CODEX';
  }
  const found = MODULES_CONFIG.find((m) => m.route === clean);
  return found ? found.id : 'MOD-01-HOME';
}

function shouldOpenCovenantGateOnInit(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('gate') === '1';
}

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>(() =>
    typeof window !== 'undefined'
      ? resolveModuleFromPathname(window.location.pathname)
      : 'MOD-01-HOME'
  );
  const [moduleParam, setModuleParam] = useState<string | undefined>(undefined);
  const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState<boolean>(false);
  const [founderState, setFounderState] = useState<FounderConsoleState>(() => ({
    ...INITIAL_FOUNDER_STATE,
    securityState: {
      ...INITIAL_FOUNDER_STATE.securityState,
      covenantGateModalOpen: shouldOpenCovenantGateOnInit(),
    },
  }));
  const [covenantCheckboxAccepted, setCovenantCheckboxAccepted] = useState<boolean>(true);
  const [covenantSignatureInput, setCovenantSignatureInput] = useState<string>(
    INITIAL_FOUNDER_STATE.securityState.covenantSignedBy
  );
  const [donors, setDonors] = useState<DonorFigure[]>(INITIAL_DONORS);

  useEffect(() => {
    const handlePopState = () => {
      setActiveModule(resolveModuleFromPathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateModule = (moduleId: ModuleId, param?: string) => {
    setActiveModule(moduleId);
    setModuleParam(param);
    setIsDirectoryModalOpen(false);
    const modConfig = MODULES_CONFIG.find((m) => m.id === moduleId);
    if (modConfig && typeof window !== 'undefined') {
      try {
        window.history.pushState({}, '', modConfig.route);
      } catch {
        // Ignore history pushState restriction in sandboxed environments
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateFounderState = (
    updater: (prev: FounderConsoleState) => FounderConsoleState,
    actionDescription?: string,
    moduleId: ModuleId = 'MOD-10-FOUNDER-CONSOLE'
  ) => {
    setFounderState((prev) => {
      const updated = updater(prev);
      if (actionDescription) {
        return appendFounderAuditLog(updated, actionDescription, moduleId);
      }
      return updated;
    });
  };

  const acceptProtocol = () => {
    if (!covenantCheckboxAccepted || !covenantSignatureInput.trim()) return;
    handleUpdateFounderState(
      (prev) => ({
        ...prev,
        securityState: {
          ...prev.securityState,
          covenantGateModalOpen: false,
          covenantSignedBy: covenantSignatureInput.trim(),
          covenantSignedTimestamp: '2026-11-03 12:05 UTC',
        },
      }),
      `TBI_RULE_01_SIGNED: Pakta Kedaulatan Inisiat (PROTOKOL I-IV) disetujui oleh ${covenantSignatureInput.trim()}.`
    );
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="min-h-screen flex flex-col bg-[#f8f7f4] text-[#111113] select-none"
    >
      {/* PROTOKOL I: GERBANG PAKTA KEDAULATAN INISIAT (TBI-RULE-01) */}
      {founderState.securityState.covenantGateModalOpen && (
        <div
          id="covenant-gate"
          role="dialog"
          aria-modal="true"
          aria-label="TBI-RULE-01 The Initiate Covenant Gate"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0A]/96 p-4 sm:p-8 text-white overflow-y-auto"
        >
          <div className="gate-box my-auto">
            <div className="gate-code">
              TBI · KLASIFIKASI 01 · PROTOKOL ESOTERIS ({founderState.securityState.protocols.enforcement_mode})
            </div>
            <h1 className="gate-title">
              {founderState.securityState.protocols.classification_banner.replace(
                ' DO NOT DISTRIBUTE.',
                ''
              )}
            </h1>

            <ul className="protocol-list">
              {COVENANT_PROTOCOLS_I_TO_IV.map((proto, idx) => {
                const rule = founderState.securityState.protocols.four_core_rules[idx];
                return (
                  <li key={proto.code}>
                    <strong className="text-white">
                      {proto.code} ({proto.title} · {rule?.rule_code || proto.ruleCode}):
                    </strong>{' '}
                    {proto.statement}
                  </li>
                );
              })}
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                acceptProtocol();
              }}
              className="space-y-4 border-t border-slate-800 pt-4"
            >
              <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={covenantCheckboxAccepted}
                  onChange={(e) => setCovenantCheckboxAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-600"
                />
                <span>
                  Saya menerima <strong>PROTOKOL I s.d. PROTOKOL IV</strong> (
                  <code>TBI-RULE-01</code> s.d. <code>TBI-RULE-04</code>) dan memahami seluruh
                  dokumen dilindungi watermark forensik dinamis.
                </span>
              </label>

              <div>
                <label
                  htmlFor="covenant-digital-signature"
                  className="block font-archival text-[11px] font-semibold text-slate-300"
                >
                  TANDA TANGAN DIGITAL INISIAT / PENDIRI
                </label>
                <input
                  id="covenant-digital-signature"
                  type="text"
                  value={covenantSignatureInput}
                  onChange={(e) => setCovenantSignatureInput(e.target.value)}
                  placeholder="Ketik nama lengkap & kredensial Inisiat..."
                  className="mt-1.5 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 font-archival text-xs text-white"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="submit"
                  disabled={!covenantCheckboxAccepted || !covenantSignatureInput.trim()}
                  className="btn-covenant w-full sm:w-auto disabled:opacity-40"
                >
                  Setujui Pakta &amp; Masuk Perpustakaan
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateFounderState((prev) => ({
                      ...prev,
                      securityState: {
                        ...prev.securityState,
                        covenantGateModalOpen: false,
                      },
                    }))
                  }
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Tutup Jendela
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER UTAMA: VARIATION 3 EDITORIAL REFINED TOP NAV */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-8 border-b border-[#111113]/10 bg-[#f8f7f4]/95 backdrop-blur-md px-6 py-5 lg:px-14">
        {/* Zone 1: Editorial Cormorant Garamond Italic Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavigateModule('MOD-01-HOME');
          }}
          className="logo-editorial whitespace-nowrap shrink-0"
        >
          The Brothers Influence
        </a>

        {/* Zone 2: Space Mono Editorial Navigation Links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden lg:flex items-center gap-8 font-['Space_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#111113]"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateModule('MOD-01-HOME');
            }}
            className={`transition-colors hover:text-[#151B8D] whitespace-nowrap shrink-0 ${
              activeModule === 'MOD-01-HOME'
                ? 'text-[#151B8D] font-bold underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            Beranda
          </a>
          <a
            href="/orbit-codex"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateModule('MOD-02-ORBIT-CODEX');
            }}
            className={`transition-colors hover:text-[#151B8D] whitespace-nowrap shrink-0 ${
              activeModule === 'MOD-02-ORBIT-CODEX'
                ? 'text-[#151B8D] font-bold underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            Orbit Codex
          </a>
          <a
            href="/kapsul-ruang-dan-waktu"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateModule('MOD-04-KAPSUL-WAKTU');
            }}
            className={`transition-colors hover:text-[#151B8D] whitespace-nowrap shrink-0 ${
              activeModule === 'MOD-04-KAPSUL-WAKTU'
                ? 'text-[#151B8D] font-bold underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            Kapsul Waktu
          </a>
          <a
            href="/shephirot"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateModule('MOD-05-SHEPHIROT');
            }}
            className={`transition-colors hover:text-[#151B8D] whitespace-nowrap shrink-0 ${
              activeModule === 'MOD-05-SHEPHIROT'
                ? 'text-[#151B8D] font-bold underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            Peta Shephirot
          </a>
          <a
            href="/tokoh-pendukung"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateModule('MOD-09-DONATUR');
            }}
            className={`transition-colors hover:text-[#151B8D] whitespace-nowrap shrink-0 ${
              activeModule === 'MOD-09-DONATUR'
                ? 'text-[#151B8D] font-bold underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            12 Pilar Donatur
          </a>
        </nav>

        {/* Zone 3: Admin Console & Katalog 10 Modul Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleNavigateModule('MOD-10-FOUNDER-CONSOLE')}
            className="btn-editorial !py-2 !px-4 !text-[11px]"
          >
            Admin Console
          </button>
          <button
            type="button"
            onClick={() => setIsDirectoryModalOpen(true)}
            className="btn-editorial-outline !py-2 !px-4 !text-[11px]"
          >
            Katalog 10 Modul
          </button>
        </div>
      </header>

      {/* TBI-RULE-03: Silent Sentinel Session Lock Banner */}
      {founderState.securityState.sessionTokenRevoked && (
        <div
          role="alert"
          className="border-b border-rose-300 bg-rose-950 px-6 py-3 text-xs text-white"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-archival">
              <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0" />
              <span>
                <strong>STRICT_ZERO_TOLERANCE · SESSION LOCKED:</strong>{' '}
                {founderState.securityState.sessionLockReason}
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                handleUpdateFounderState(
                  (prev) => ({
                    ...prev,
                    securityState: {
                      ...prev.securityState,
                      activeDeviceCount: 1,
                      sessionTokenRevoked: false,
                      sessionLockReason: null,
                    },
                  }),
                  'FOUNDER_OVERRIDE_UNLOCK: Memulihkan sesi yang terkunci oleh TBI-RULE-03.'
                )
              }
              className="rounded bg-white px-3 py-1 font-archival text-xs font-semibold text-rose-950 hover:bg-rose-100 cursor-pointer"
            >
              Founder Override: Pulihkan Sesi
            </button>
          </div>
        </div>
      )}

      {/* PRINSIP 3 NEOPLATONISME (3_epistrophe): Sistem Navigasi Pulang Intuitif ke Portal Mulia (The One) */}
      {activeModule !== 'MOD-01-HOME' && (
        <nav
          aria-label="Epistrophe Sistem Navigasi Pulang Intuitif"
          className="border-b border-[#D4AF37]/40 bg-[#0B0F19] px-6 py-2.5 text-xs text-slate-200 lg:px-12"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 font-archival">
              <span className="text-[#D4AF37] font-semibold">
                3_EPISTROPHE · NAVIGASI PULANG INTUITIF
              </span>
              <span aria-hidden="true" className="text-slate-500">
                ·
              </span>
              <span className="text-slate-300">
                Emanasi Aktif:{' '}
                <strong className="text-white">
                  {MODULES_CONFIG.find((m) => m.id === activeModule)?.title}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavigateModule('MOD-01-HOME')}
                className="btn-tbi-gold !py-1.5 !px-3 !text-xs"
              >
                <CornerUpLeft className="h-3.5 w-3.5" />
                <span>Pulang ke Portal Mulia (The One / Beranda)</span>
              </button>
              {activeModule !== 'MOD-10-FOUNDER-CONSOLE' && (
                <button
                  type="button"
                  onClick={() => handleNavigateModule('MOD-10-FOUNDER-CONSOLE')}
                  className="btn-tbi-obsidian !py-1.5 !px-3 !text-xs"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>{CMS_CORE_SPEC.console_name}</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Stage */}
      <main className="flex-1">
        {activeModule === 'MOD-01-HOME' && (
          <HomeModule
            onNavigateModule={handleNavigateModule}
            founderState={founderState}
            onUpdateFounderState={(updater, desc) =>
              handleUpdateFounderState(updater, desc, 'MOD-01-HOME')
            }
            donors={donors}
            onUpdateDonors={setDonors}
          />
        )}
        {activeModule === 'MOD-02-ORBIT-CODEX' && (
          <OritCodexModule
            initialSlotNumber={moduleParam ? Number(moduleParam) : undefined}
          />
        )}
        {activeModule === 'MOD-03-ART-GALLERY' && (
          <ArtGalleryModule onNavigateModule={handleNavigateModule} />
        )}
        {activeModule === 'MOD-04-KAPSUL-WAKTU' && (
          <KapsulWaktuModule
            initialDocId={moduleParam}
            onNavigateModule={handleNavigateModule}
          />
        )}
        {activeModule === 'MOD-05-SHEPHIROT' && (
          <ShephirotModule
            initialNodeId={moduleParam ? Number(moduleParam) : 6}
            onNavigateModule={handleNavigateModule}
          />
        )}
        {activeModule === 'MOD-06-VIDEO' && <VideoMediaModule />}
        {activeModule === 'MOD-07-GOLDEN-ENERGY' && (
          <GoldenEnergyModule onNavigateModule={handleNavigateModule} />
        )}
        {activeModule === 'MOD-08-GOLDEN-DAWN' && (
          <GoldenDawnModule
            initialSubId={moduleParam as GoldenDawnSubId | undefined}
            onNavigateModule={handleNavigateModule}
          />
        )}
        {activeModule === 'MOD-09-DONATUR' && (
          <DonorRateModule
            initialDonorId={moduleParam}
            donors={donors}
            onUpdateDonors={setDonors}
          />
        )}
        {activeModule === 'MOD-10-FOUNDER-CONSOLE' && (
          <FounderConsoleModule
            founderState={founderState}
            initialUseCaseCode={moduleParam}
            onUpdateFounderState={(updater, actionType, detail, modId) =>
              handleUpdateFounderState(updater, `${actionType}: ${detail}`, modId)
            }
            onNavigateModule={handleNavigateModule}
          />
        )}
      </main>

      {/* FOOTER PERPUSTAKAAN ESOTERIS DINGIN BERKALKULASI (VARIATION 3 EDITORIAL) */}
      <footer className="border-t border-[#111113]/10 bg-[#f8f7f4]">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-14 space-y-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="meta !text-[#111113]/60">
              TBI Internal Archive · ID: {founderState.securityState.activeSessionIp} ·{' '}
              {generateForensicWatermark(
                founderState.securityState.activeSessionUserId,
                founderState.securityState.activeSessionIp,
                founderState.securityState.protocols.document_marker
              )}
            </div>
            <div className="meta !text-[#111113]/60">
              © 2026 The Brothers Influence · Private Series · v{SYSTEM_MANIFEST.version}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#111113]/10 pt-4 text-xs text-[#111113]/70">
            <div className="logo-editorial !text-base">
              {SYSTEM_MANIFEST.system_name} ({SYSTEM_MANIFEST.brand_acronym})
            </div>
            <div className="flex flex-wrap items-center gap-4 font-['Space_Mono'] text-[11px]">
              {getOrderedModules(founderState)
                .filter((mod) => !founderState.hiddenModules.includes(mod.id))
                .map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    aria-label={`Pintasan Kaki: ${mod.title}`}
                    onClick={() => handleNavigateModule(mod.id)}
                    className="hover:text-[#151B8D] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {mod.shortLabel}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Directory for 10 Ordered Modules */}
      {isDirectoryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Direktori 10 Modul The Brothers Influence"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <div className="font-archival text-xs text-[#151B8D]">
                  {SYSTEM_MANIFEST.codename} v{SYSTEM_MANIFEST.version} · 10 MODULES SEQUENCE (UC01 – UC16)
                </div>
                <h2 className="font-heading text-lg font-semibold text-[#0A0A0A]">
                  Direktori Navigasi 10 Modul Portal Kemuliaan Yayasan TBI
                </h2>
              </div>
              <button
                type="button"
                aria-label="Tutup Direktori Modul"
                onClick={() => setIsDirectoryModalOpen(false)}
                className="rounded p-1.5 text-[#64748B] hover:bg-[#F8F9FA] hover:text-[#0A0A0A] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {getOrderedModules(founderState)
                .filter((mod) => !founderState.hiddenModules.includes(mod.id))
                .map((mod) => {
                  const isCurrent = activeModule === mod.id;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => handleNavigateModule(mod.id)}
                      className={`rounded-md border p-3.5 text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'border-[#151B8D] bg-[#F8F9FA]'
                          : 'border-[#E2E8F0] bg-white hover:bg-[#F8F9FA]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-archival text-[#64748B]">
                        <span className="font-semibold text-[#151B8D]">
                          ORDER {mod.order < 10 ? `0${mod.order}` : mod.order} · {mod.id}
                        </span>
                        <span>{mod.uiMode}</span>
                      </div>
                      <div className="mt-1 font-heading text-sm font-semibold text-[#0A0A0A]">
                        {mod.title}
                      </div>
                      <p className="mt-1 text-xs text-[#64748B] line-clamp-2">
                        {mod.description}
                      </p>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
