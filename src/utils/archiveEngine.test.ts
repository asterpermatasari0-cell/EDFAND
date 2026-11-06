import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SYSTEM_MANIFEST,
  MODULES_CONFIG,
  CLASSIFICATION_CLASSES,
  CAPSULE_DOCUMENTS,
  filterCapsuleDocuments,
  SHEPHIROT_NODES,
  SHEPHIROT_PATHS,
  getShephirotNodeById,
  getConnectedPathsForNode,
  getAdjacentNodes,
  filterNodesByPillar,
  ORBIT_CODEX_FOLIOS,
  ORBIT_CODEX_QUOTA,
  GOLDEN_ENERGY_PATHWAYS,
  INITIAL_DONORS,
  DONOR_PILLARS_QUOTA,
  VIDEO_SLOTS_QUOTA,
  SUPPORTED_UPLOAD_FORMATS,
  INITIAL_FOUNDER_STATE,
  appendFounderAuditLog,
  calculateDonorRatingMetrics,
  upsertDonorRating,
  calculateSupportLedgerMetrics,
  submitSupportContribution,
  USE_CASE_REGISTRY,
  canActorExecuteUseCase,
  reorderModuleSequence,
  getOrderedModules,
  SECURITY_AND_USAGE_PROTOCOLS,
  COVENANT_PROTOCOLS_I_TO_IV,
  generateForensicWatermark,
  evaluateSentinelSession,
  NEOPLATONIC_PHILOSOPHY_FRAMEWORK,
  CMS_CORE_SPEC,
  INITIAL_NINE_MAIN_PILLARS,
  addFounderPillarFeature,
  customizeFounderPillarFeature,
  deleteFounderPillarFeature,
  searchUniversalPortalTheOne,
} from './archiveEngine';

test('System manifest and 10 ordered modules match TBI v4.0.0 specification', () => {
  assert.equal(SYSTEM_MANIFEST.system_name, 'The Brothers Influence (TBI) - Portal Kemuliaan Yayasan');
  assert.equal(SYSTEM_MANIFEST.version, '4.0.0');
  assert.equal(SYSTEM_MANIFEST.brand_acronym, 'TBI');
  assert.equal(SYSTEM_MANIFEST.customizable_by_founder, true);
  assert.equal(MODULES_CONFIG.length, 10);

  for (let i = 0; i < 10; i++) {
    assert.equal(MODULES_CONFIG[i].order, i + 1);
  }

  assert.equal(MODULES_CONFIG[0].id, 'MOD-01-HOME');
  assert.equal(MODULES_CONFIG[1].id, 'MOD-02-ORBIT-CODEX');
  assert.equal(MODULES_CONFIG[1].quota, 6);
  assert.equal(MODULES_CONFIG[5].id, 'MOD-06-VIDEO');
  assert.equal(MODULES_CONFIG[5].quota, 30);
  assert.equal(MODULES_CONFIG[6].id, 'MOD-07-GOLDEN-ENERGY');
  assert.equal(MODULES_CONFIG[7].id, 'MOD-08-GOLDEN-DAWN');
  assert.equal(MODULES_CONFIG[7].isStandalone, true);
  assert.equal(MODULES_CONFIG[8].id, 'MOD-09-DONATUR');
  assert.equal(MODULES_CONFIG[8].quota, 12);
  assert.equal(MODULES_CONFIG[9].id, 'MOD-10-FOUNDER-CONSOLE');
  assert.equal(MODULES_CONFIG[9].access, 'FOUNDER_ONLY (2FA Protected)');
});

test('MOD-02-ORBIT-CODEX enforces 6 folio slots quota with canonical ORBIT // 001-006 Codex I-VI titles and Ge’ez-Transliteration-Indonesian', () => {
  assert.equal(ORBIT_CODEX_QUOTA, 6);
  assert.equal(ORBIT_CODEX_FOLIOS.length, 6);
  assert.equal(ORBIT_CODEX_FOLIOS[0].slotNumber, 1);
  assert.equal(ORBIT_CODEX_FOLIOS[0].orbitCode, 'ORBIT // 001');
  assert.equal(ORBIT_CODEX_FOLIOS[0].masterCodexTitle, 'Codex I: Kanon Kosmologi');
  assert.equal(ORBIT_CODEX_FOLIOS[5].slotNumber, 6);
  assert.equal(ORBIT_CODEX_FOLIOS[5].orbitCode, 'ORBIT // 006');
  assert.equal(ORBIT_CODEX_FOLIOS[5].masterCodexTitle, 'Codex VI: Epilog Kemuliaan');
  assert.ok(ORBIT_CODEX_FOLIOS[0].verses[0].geezScript.length > 0);
  assert.equal(COVENANT_PROTOCOLS_I_TO_IV.length, 4);
  assert.equal(COVENANT_PROTOCOLS_I_TO_IV[0].code, 'PROTOKOL I');
  assert.equal(COVENANT_PROTOCOLS_I_TO_IV[3].code, 'PROTOKOL IV');
});

test('MOD-04-KAPSUL-WAKTU has 6 classification classes (KODE 1 to KODE 6) and filters accurately', () => {
  assert.equal(CLASSIFICATION_CLASSES.length, 6);
  const kode1Docs = filterCapsuleDocuments(CAPSULE_DOCUMENTS, 'KODE 1', '');
  assert.equal(kode1Docs.length, 1);
  assert.equal(kode1Docs[0].badge, 'TBI/KODE 1');

  const searchByQuery = filterCapsuleDocuments(CAPSULE_DOCUMENTS, 'ALL', 'Yetzirah');
  assert.equal(searchByQuery.length, 1);
  assert.equal(searchByQuery[0].code, 'KODE 6');
});

test('MOD-05-SHEPHIROT directed graph has 10 nodes and 22 paths with valid topology', () => {
  assert.equal(SHEPHIROT_NODES.length, 10);
  assert.equal(SHEPHIROT_PATHS.length, 22);

  const kether = getShephirotNodeById(1);
  assert.equal(kether?.name, 'Kether');
  assert.equal(getConnectedPathsForNode(1).length, 3);
  assert.deepEqual(
    getAdjacentNodes(1).map((n) => n.id).sort((a, b) => a - b),
    [2, 3, 6]
  );
  assert.deepEqual(
    filterNodesByPillar('Middle').map((n) => n.key),
    ['kether', 'tiphereth', 'yesod', 'malkuth']
  );
});

test('MOD-07-GOLDEN-ENERGY provides the 2 pathways: Mandiri Kemuliaan and Bertarung Matrix', () => {
  assert.equal(GOLDEN_ENERGY_PATHWAYS.length, 2);
  assert.equal(GOLDEN_ENERGY_PATHWAYS[0].key, 'Mandiri Kemuliaan');
  assert.equal(GOLDEN_ENERGY_PATHWAYS[1].key, 'Bertarung Matrix');
  assert.equal(VIDEO_SLOTS_QUOTA, 30);
});

test('MOD-09-DONATUR has 12 Pillars Grid (Energy 12 Donatur Peradaban Mulia) and enforces 1 active rating per user', () => {
  assert.equal(DONOR_PILLARS_QUOTA, 12);
  assert.equal(INITIAL_DONORS.length, 12);
  assert.equal(INITIAL_DONORS[0].pillarNumber, 1);
  assert.equal(INITIAL_DONORS[11].pillarNumber, 12);

  const initialCount = INITIAL_DONORS[0].ratings.length;
  const step1 = upsertDonorRating(INITIAL_DONORS, {
    userId: 'researcher-baru-99',
    userName: 'Dr. Rendra Prakoso',
    userRole: 'Peneliti Terautentikasi',
    donorId: 'donor-01',
    stars: 4,
    reviewText: 'Koleksi perkamen yang dihibahkan sangat terawat dan dilengkapi dokumen provenance lengkap.',
    timestampIso: '2026-11-03',
  });
  assert.equal(step1.wasUpdated, false);
  assert.equal(step1.donors[0].ratings.length, initialCount + 1);

  const step2 = upsertDonorRating(step1.donors, {
    userId: 'researcher-baru-99',
    userName: 'Dr. Rendra Prakoso',
    userRole: 'Peneliti Terautentikasi',
    donorId: 'donor-01',
    stars: 5,
    reviewText: 'Pembaruan evaluasi setelah memeriksa resolusi IIIF v3: kualitas sangat sempurna.',
    timestampIso: '2026-11-03',
  });
  assert.equal(step2.wasUpdated, true);
  assert.equal(step2.donors[0].ratings.length, initialCount + 1);
  assert.equal(calculateDonorRatingMetrics(step2.donors[0].ratings).averageStars, 5);

  const initialLedger = calculateSupportLedgerMetrics(INITIAL_DONORS);
  assert.equal(initialLedger.totalDanaAbadiIdr, 14850000000);
  assert.equal(initialLedger.totalNaskahVolume, 83);
  assert.equal(initialLedger.totalArtefakUnits, 36);

  const afterDanaAbadi = submitSupportContribution(INITIAL_DONORS, {
    donorId: 'donor-01',
    category: 'DANA_ABADI',
    itemTitle: 'Wakaf Dana Abadi Digitalisasi Spektral Lanjutan',
    valuationOrScope: 'Pengembangan Server Konservasi 2027',
    endowmentIdrAmount: 150000000,
  });
  assert.equal(afterDanaAbadi.error, undefined);
  const updatedLedger = calculateSupportLedgerMetrics(afterDanaAbadi.donors);
  assert.equal(updatedLedger.totalDanaAbadiIdr, 15000000000);
});

test('MOD-10-FOUNDER-CONSOLE supports all 7 required media formats and appends audit logs cleanly', () => {
  assert.deepEqual(SUPPORTED_UPLOAD_FORMATS, [
    'JPG',
    'PNG',
    'WEBP',
    'SVG',
    'PDF/A',
    'MP4',
    'TIFF',
  ]);
  const updatedState = appendFounderAuditLog(INITIAL_FOUNDER_STATE, {
    actor: 'Founder Sovereign (2FA)',
    moduleId: 'MOD-01-HOME',
    actionType: 'UPDATE_HERO',
    detail: 'Memperbarui teks pengantar beranda.',
  });
  assert.equal(updatedState.auditLogs.length, INITIAL_FOUNDER_STATE.auditLogs.length + 1);
  assert.equal(updatedState.auditLogs[0].actionType, 'UPDATE_HERO');
});

test('16 Use Case Architecture (UC01-UC16), Actor Hierarchy, and UC16 Module Reordering work accurately', () => {
  assert.equal(USE_CASE_REGISTRY.length, 16);
  const frontendUCs = USE_CASE_REGISTRY.filter((u) => u.realm === 'FRONTEND_EXPLORATION');
  const backendUCs = USE_CASE_REGISTRY.filter((u) => u.realm === 'BACKEND_SOVEREIGN_CMS');
  assert.equal(frontendUCs.length, 9); // UC01 to UC09
  assert.equal(backendUCs.length, 7); // UC10 to UC16

  // Publik can run UC01, cannot run UC04 [Inisiat], UC09 [Anggota], or UC10 [Founder]
  assert.equal(canActorExecuteUseCase('PUBLIK', 'UC01'), true);
  assert.equal(canActorExecuteUseCase('PUBLIK', 'UC04'), false);
  assert.equal(canActorExecuteUseCase('PUBLIK', 'UC09'), false);
  assert.equal(canActorExecuteUseCase('PUBLIK', 'UC10'), false);

  // Anggota can run UC09, cannot run UC04 [Inisiat] or UC10 [Founder]
  assert.equal(canActorExecuteUseCase('ANGGOTA', 'UC09'), true);
  assert.equal(canActorExecuteUseCase('ANGGOTA', 'UC04'), false);

  // Inisiat can run UC04 and UC09, cannot run UC16 [Founder]
  assert.equal(canActorExecuteUseCase('INISIAT', 'UC04'), true);
  assert.equal(canActorExecuteUseCase('INISIAT', 'UC09'), true);
  assert.equal(canActorExecuteUseCase('INISIAT', 'UC16'), false);

  // FOUNDER can run all UC01 through UC16
  for (const uc of USE_CASE_REGISTRY) {
    assert.equal(canActorExecuteUseCase('FOUNDER', uc.code), true);
  }

  // UC16: Reorder module sequence (move index 1 MOD-02-ORBIT-CODEX to index 2)
  const reorderedIds = reorderModuleSequence(INITIAL_FOUNDER_STATE.moduleSequenceOrder, 1, 2);
  assert.equal(reorderedIds[1], 'MOD-03-ART-GALLERY');
  assert.equal(reorderedIds[2], 'MOD-02-ORBIT-CODEX');

  const orderedConfigs = getOrderedModules({
    ...INITIAL_FOUNDER_STATE,
    moduleSequenceOrder: reorderedIds,
  });
  assert.equal(orderedConfigs[1].id, 'MOD-03-ART-GALLERY');
  assert.equal(orderedConfigs[1].order, 2);
  assert.equal(orderedConfigs[2].id, 'MOD-02-ORBIT-CODEX');
  assert.equal(orderedConfigs[2].order, 3);
});

test('Security & Usage Protocols (STRICT_ZERO_TOLERANCE, TBI-RULE-01 to TBI-RULE-04, Watermark & Sentinel) work accurately', () => {
  assert.equal(
    SECURITY_AND_USAGE_PROTOCOLS.classification_banner,
    'NOTICE: FOR INITIATE EYES ONLY. DO NOT DISTRIBUTE.'
  );
  assert.equal(
    SECURITY_AND_USAGE_PROTOCOLS.transmission_type,
    'AN ESOTERIC-REALIST INTELLIGENCE TRANSMISSION'
  );
  assert.equal(SECURITY_AND_USAGE_PROTOCOLS.document_marker, 'TBI INTERNAL DOCUMENT');
  assert.equal(SECURITY_AND_USAGE_PROTOCOLS.enforcement_mode, 'STRICT_ZERO_TOLERANCE');
  assert.equal(SECURITY_AND_USAGE_PROTOCOLS.four_core_rules.length, 4);
  assert.deepEqual(
    SECURITY_AND_USAGE_PROTOCOLS.four_core_rules.map((r) => r.rule_code),
    ['TBI-RULE-01', 'TBI-RULE-02', 'TBI-RULE-03', 'TBI-RULE-04']
  );
  assert.equal(SECURITY_AND_USAGE_PROTOCOLS.founder_override.can_edit_protocol_text, true);
  assert.equal(SECURITY_AND_USAGE_PROTOCOLS.founder_override.can_ban_or_whitelist_ip, true);
  assert.equal(SECURITY_AND_USAGE_PROTOCOLS.founder_override.can_view_telemetry_logs, true);

  // TBI-RULE-02: Forensic Watermark
  const wm = generateForensicWatermark('TBI-INISIAT-001', '103.144.19.82');
  assert.ok(wm.includes('TBI INTERNAL DOCUMENT'));
  assert.ok(wm.includes('UID:TBI-INISIAT-001'));
  assert.ok(wm.includes('IP:103.144.19.82'));

  // TBI-RULE-03: Silent Sentinel Telemetry & Session Lock
  const nominalCheck = evaluateSentinelSession({
    deviceCount: 1,
    requestsPerMinute: 18,
    ipAddress: '103.144.19.82',
    ipRegistry: INITIAL_FOUNDER_STATE.securityState.ipRegistry,
  });
  assert.equal(nominalCheck.tokenRevoked, false);
  assert.equal(nominalCheck.severity, 'NOMINAL');

  const multiDeviceViolation = evaluateSentinelSession({
    deviceCount: 2,
    requestsPerMinute: 12,
    ipAddress: '103.144.19.82',
    ipRegistry: INITIAL_FOUNDER_STATE.securityState.ipRegistry,
  });
  assert.equal(multiDeviceViolation.tokenRevoked, true);
  assert.equal(multiDeviceViolation.severity, 'TOKEN_REVOKED');

  const bannedIpViolation = evaluateSentinelSession({
    deviceCount: 1,
    requestsPerMinute: 5,
    ipAddress: '185.220.101.44',
    ipRegistry: INITIAL_FOUNDER_STATE.securityState.ipRegistry,
  });
  assert.equal(bannedIpViolation.tokenRevoked, true);
});

test('7 Prinsip Neoplatonisme, 9 Menu Utama, and FOUNDERS SOVEREIGN Console CRUD permissions work accurately', () => {
  assert.equal(NEOPLATONIC_PHILOSOPHY_FRAMEWORK.website_name, 'THE BROTHERS INFLUENCE (TBI)');
  assert.equal(NEOPLATONIC_PHILOSOPHY_FRAMEWORK.concept, 'Digital Esoteric Library & Archive');
  assert.equal(NEOPLATONIC_PHILOSOPHY_FRAMEWORK.name, '7 Prinsip Neoplatonisme');
  assert.equal(NEOPLATONIC_PHILOSOPHY_FRAMEWORK.principles_list.length, 7);
  assert.equal(
    NEOPLATONIC_PHILOSOPHY_FRAMEWORK.ui_ux_mapping['1_the_one'],
    'Bilah pencarian tunggal & Portal Mulia'
  );
  assert.equal(
    NEOPLATONIC_PHILOSOPHY_FRAMEWORK.ui_ux_mapping['7_iluminasi'],
    'Efek pendaran emas pada hover & CMS console'
  );

  assert.equal(CMS_CORE_SPEC.console_name, 'FOUNDERS SOVEREIGN Console');
  assert.deepEqual(CMS_CORE_SPEC.global_permissions, [
    'Custom Feature',
    'Delete Feature',
    'Tambah Fitur',
  ]);

  assert.equal(INITIAL_NINE_MAIN_PILLARS.length, 9);
  const menuNames = INITIAL_NINE_MAIN_PILLARS.map((p) => p.menuTitle);
  assert.deepEqual(menuNames, [
    'Beranda',
    'Codex Esoteris',
    'Kapsul R&W',
    'Galeri Seni',
    'Fajar Emas',
    'Media Video',
    'Tujuan Energi Emas',
    'Sumber Universal',
    'Donatur Mulia',
  ]);

  // Tambah Fitur
  const added = addFounderPillarFeature(INITIAL_NINE_MAIN_PILLARS, {
    pillarId: 'pillar-02-codex-esoteris',
    title: 'Indeks Paleografi Aksumit',
    description: 'Pencarian glif dan ligatur Ge’ez kuno.',
    hierarchyLevel: 'SAKRAL',
    illuminated: true,
  });
  const codexPillar = added.pillars.find((p) => p.id === 'pillar-02-codex-esoteris')!;
  assert.equal(codexPillar.subFeatures.length, 4);

  // Custom Feature
  const customized = customizeFounderPillarFeature(added.pillars, {
    pillarId: 'pillar-02-codex-esoteris',
    subFeatureId: added.addedFeature.id,
    title: 'Indeks Paleografi Aksumit v2',
    hierarchyLevel: 'TEKNIS',
  });
  const updatedSub = customized
    .find((p) => p.id === 'pillar-02-codex-esoteris')!
    .subFeatures.find((sf) => sf.id === added.addedFeature.id)!;
  assert.equal(updatedSub.title, 'Indeks Paleografi Aksumit v2');
  assert.equal(updatedSub.hierarchyLevel, 'TEKNIS');

  // Delete Feature
  const afterDelete = deleteFounderPillarFeature(
    customized,
    'pillar-02-codex-esoteris',
    added.addedFeature.id
  );
  assert.equal(
    afterDelete.find((p) => p.id === 'pillar-02-codex-esoteris')!.subFeatures.length,
    3
  );

  // Universal Search (1_the_one)
  const searchResults = searchUniversalPortalTheOne('Fajar Emas', afterDelete);
  assert.ok(searchResults.length >= 1);
  assert.ok(searchResults.some((r) => r.targetModuleId === 'MOD-08-GOLDEN-DAWN'));
});



