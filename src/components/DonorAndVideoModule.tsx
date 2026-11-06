import React, { useState, useMemo } from 'react';
import {
  INITIAL_DONORS,
  DONOR_PILLARS_QUOTA,
  DonorFigure,
  calculateDonorRatingMetrics,
  calculateSupportLedgerMetrics,
  submitSupportContribution,
  formatIdrCurrency,
  upsertDonorRating,
  EDUCATIONAL_VIDEOS,
  VIDEO_SLOTS_QUOTA,
  VideoCategory,
  EducationalVideoItem,
} from '../utils/archiveEngine';
import {
  Star,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Edit3,
  Upload,
  ShieldAlert,
} from 'lucide-react';

interface AuthenticatedUserSession {
  userId: string;
  userName: string;
  userRole: string;
}

const DEMO_AUTHENTICATED_USERS: AuthenticatedUserSession[] = [
  {
    userId: 'scholar-aster',
    userName: 'Dr. Aster Permatasari, M.Hum.',
    userRole: 'Peneliti Terautentikasi (ID: TBI-RES-01)',
  },
  {
    userId: 'scholar-arman',
    userName: 'Prof. Dr. H. Arman Wiryawan',
    userRole: 'Filolog Senior TBI (ID: TBI-RES-02)',
  },
];

interface DonorRateModuleProps {
  initialDonorId?: string;
  donors?: DonorFigure[];
  onUpdateDonors?: React.Dispatch<React.SetStateAction<DonorFigure[]>>;
}

export const DonorRateModule: React.FC<DonorRateModuleProps> = ({
  initialDonorId,
  donors: externalDonors,
  onUpdateDonors,
}) => {
  const [internalDonors, setInternalDonors] = useState<DonorFigure[]>(INITIAL_DONORS);
  const donors = externalDonors ?? internalDonors;
  const setDonors = onUpdateDonors ?? setInternalDonors;

  const [selectedDonorId, setSelectedDonorId] = useState<string>(
    initialDonorId && INITIAL_DONORS.some((d) => d.id === initialDonorId)
      ? initialDonorId
      : INITIAL_DONORS[0].id
  );
  const [currentUser, setCurrentUser] = useState<AuthenticatedUserSession>(
    DEMO_AUTHENTICATED_USERS[0]
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [starsInput, setStarsInput] = useState<number>(5);
  const [reviewInput, setReviewInput] = useState<string>('');
  const [feedbackBanner, setFeedbackBanner] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Founder & Support Contribution Capabilities
  const [showFounderPanel, setShowFounderPanel] = useState<boolean>(false);
  const [newDonationTitle, setNewDonationTitle] = useState<string>('');
  const [newDonationCat, setNewDonationCat] = useState<'NASKAH' | 'ARTEFAK' | 'DANA_ABADI'>('DANA_ABADI');
  const [newDonationAmount, setNewDonationAmount] = useState<number>(150_000_000);
  const [newDonationUnits, setNewDonationUnits] = useState<number>(3);
  const [founderNotice, setFounderNotice] = useState<string | null>(null);

  const supportMetrics = useMemo(() => calculateSupportLedgerMetrics(donors), [donors]);

  const activeDonor: DonorFigure = useMemo(
    () => donors.find((d) => d.id === selectedDonorId) || donors[0],
    [donors, selectedDonorId]
  );

  const activeMetrics = useMemo(
    () => calculateDonorRatingMetrics(activeDonor.ratings),
    [activeDonor.ratings]
  );

  const existingUserRating = useMemo(
    () =>
      isAuthenticated
        ? activeDonor.ratings.find((r) => r.userId === currentUser.userId)
        : undefined,
    [activeDonor.ratings, currentUser.userId, isAuthenticated]
  );

  const handleSelectDonor = (donorId: string) => {
    setSelectedDonorId(donorId);
    setFeedbackBanner(null);
    const target = donors.find((d) => d.id === donorId);
    const existing = target?.ratings.find((r) => r.userId === currentUser.userId);
    if (existing) {
      setStarsInput(existing.stars);
      setReviewInput(existing.reviewText);
    } else {
      setStarsInput(5);
      setReviewInput('');
    }
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setFeedbackBanner({
        type: 'error',
        message: 'Mode saat ini adalah PUBLIC_VIEW. Aktifkan sesi terautentikasi untuk mengirim rating.',
      });
      return;
    }

    const result = upsertDonorRating(donors, {
      userId: currentUser.userId,
      userName: currentUser.userName,
      userRole: currentUser.userRole,
      donorId: activeDonor.id,
      stars: starsInput,
      reviewText: reviewInput,
      timestampIso: '2026-11-03',
    });

    if (result.error) {
      setFeedbackBanner({ type: 'error', message: result.error });
      return;
    }

    setDonors(result.donors);
    setFeedbackBanner({
      type: 'success',
      message: result.wasUpdated
        ? `Catatan rating aktif Anda (${currentUser.userName}) untuk ${activeDonor.name} telah diperbarui sesuai aturan 1 rating aktif per pengguna.`
        : `Catatan rating Likert ${starsInput}/5 baru dari ${currentUser.userName} berhasil disimpan untuk ${activeDonor.name}.`,
    });
  };

  const handleEditContributionLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonationTitle.trim()) return;
    const scope =
      newDonationCat === 'DANA_ABADI'
        ? `Wakaf Dana Abadi sebesar ${formatIdrCurrency(newDonationAmount)} (Terverifikasi Pendiri)`
        : `Hibah ${newDonationUnits} Unit ${
            newDonationCat === 'NASKAH' ? 'Naskah & Kodeks' : 'Artefak Konservasi'
          } (Terverifikasi Pendiri)`;

    const result = submitSupportContribution(donors, {
      donorId: activeDonor.id,
      category: newDonationCat,
      itemTitle: newDonationTitle.trim(),
      valuationOrScope: scope,
      endowmentIdrAmount: newDonationCat === 'DANA_ABADI' ? newDonationAmount : undefined,
      unitQuantity: newDonationCat !== 'DANA_ABADI' ? newDonationUnits : undefined,
    });
    setDonors(result.donors);
    setNewDonationTitle('');
    setFounderNotice(
      `[edit_contribution_log] Donasi Sistem Pendukung Pilar #${activeDonor.pillarNumber} tercatat (${result.addedRecord.accessionCode}).`
    );
    setTimeout(() => setFounderNotice(null), 3500);
  };

  const handleModerateRating = (userId: string) => {
    setDonors((prev) =>
      prev.map((d) => {
        if (d.id !== activeDonor.id) return d;
        return {
          ...d,
          ratings: d.ratings.map((r) =>
            r.userId === userId
              ? {
                  ...r,
                  moderatedStatus: r.moderatedStatus === 'FLAGGED' ? 'APPROVED' : 'FLAGGED',
                }
              : r
          ),
        };
      })
    );
    setFounderNotice(`[moderate_user_ratings] Status moderasi rating oleh ${userId} diperbarui.`);
    setTimeout(() => setFounderNotice(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-archival text-[#64748B]">
            <span>ORDER 09 · MOD-09-DONATUR</span>
            <span aria-hidden="true">·</span>
            <span>UI MODE: 12 PILLARS GRID + COMMUNITY RATING</span>
            <span aria-hidden="true">·</span>
            <span>KUOTA: {DONOR_PILLARS_QUOTA} PILAR</span>
          </div>
          <h1 className="mt-2 font-['Times_New_Roman'] text-3xl font-semibold text-[#0A0A0A]">
            Registri Tokoh & Energy 12 Donatur Peradaban Mulia
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
            Sorotan Utama: <strong className="font-medium text-[#151B8D]">Energy 12 Donatur Peradaban Mulia</strong> (12 Pillars Grid, kuota 12 tokoh) beserta rating komunitas Likert 1–5 dan kapabilitas pendiri (<em>upload_donor_photo</em>, <em>edit_contribution_log</em>, <em>moderate_user_ratings</em>).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFounderPanel((p) => !p)}
            className={showFounderPanel ? 'btn-tbi-primary' : 'btn-tbi-secondary'}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Donasi Sistem Pendukung &amp; CMS</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 border border-[#E2E8F0] bg-[#F8F9FA] p-1.5">
            <button
              type="button"
              onClick={() => {
                setIsAuthenticated((a) => !a);
                setFeedbackBanner(null);
              }}
              className={
                isAuthenticated
                  ? 'btn-tbi-primary !py-1.5 !px-3'
                  : 'btn-tbi-secondary !py-1.5 !px-3'
              }
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>{isAuthenticated ? 'Sesi: Terautentikasi' : 'Sesi: Publik'}</span>
            </button>

            {isAuthenticated && (
              <select
                aria-label="Pilih Profil Peneliti Terautentikasi"
                value={currentUser.userId}
                onChange={(e) => {
                  const found =
                    DEMO_AUTHENTICATED_USERS.find((u) => u.userId === e.target.value) ||
                    DEMO_AUTHENTICATED_USERS[0];
                  setCurrentUser(found);
                  setFeedbackBanner(null);
                }}
                className="border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#0A0A0A]"
              >
                {DEMO_AUTHENTICATED_USERS.map((u) => (
                  <option key={u.userId} value={u.userId}>
                    {u.userName}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Donasi Sistem Pendukung TBI: Live Calculated Summary Strip (Dana Abadi, Naskah, Artefak) */}
      <div className="grid grid-cols-1 gap-4 border border-[#E2E8F0] bg-white p-6 sm:grid-cols-3">
        <div className="border-b border-[#E2E8F0] pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
          <div className="font-archival text-xs font-semibold uppercase tracking-wider text-[#151B8D]">
            DONASI SISTEM PENDUKUNG · DANA ABADI
          </div>
          <div className="mt-1.5 font-heading text-2xl font-bold tabular-nums text-[#0A0A0A]">
            {supportMetrics.formattedDanaAbadiIdr}
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            Total {supportMetrics.danaAbadiLogCount} Wakaf Dana Abadi aktif untuk THE BROTHERS
            INFLUENCE.
          </p>
        </div>

        <div className="border-b border-[#E2E8F0] pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:px-6">
          <div className="font-archival text-xs font-semibold uppercase tracking-wider text-[#151B8D]">
            DONASI SISTEM PENDUKUNG · JUMLAH NASKAH
          </div>
          <div className="mt-1.5 font-heading text-2xl font-bold tabular-nums text-[#0A0A0A]">
            {supportMetrics.totalNaskahVolume} Naskah &amp; Kodeks
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            Total {supportMetrics.naskahLogCount} hibah manuskrip primer, lontar, dan faksimili.
          </p>
        </div>

        <div className="sm:pl-6">
          <div className="font-archival text-xs font-semibold uppercase tracking-wider text-[#151B8D]">
            DONASI SISTEM PENDUKUNG · JUMLAH ARTEFAK
          </div>
          <div className="mt-1.5 font-heading text-2xl font-bold tabular-nums text-[#0A0A0A]">
            {supportMetrics.totalArtefakUnits} Unit Artefak
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            Total {supportMetrics.artefakLogCount} hibah instrumen konservasi &amp; artefak sejarah.
          </p>
        </div>
      </div>

      {/* Founder Capabilities Panel */}
      {showFounderPanel && (
        <div className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <span className="font-archival text-xs font-semibold text-[#151B8D]">
              FOUNDER CAPABILITIES · MOD-09-DONATUR (PILAR #{activeDonor.pillarNumber}:{' '}
              {activeDonor.name})
            </span>
            {founderNotice && (
              <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                {founderNotice}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <form
              onSubmit={handleEditContributionLog}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Edit3 className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>EDIT_CONTRIBUTION_LOG & UPLOAD_DONOR_PHOTO</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <input
                  type="text"
                  value={newDonationTitle}
                  onChange={(e) => setNewDonationTitle(e.target.value)}
                  placeholder="Deskripsi kontribusi baru..."
                  className="sm:col-span-2 rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                />
                <select
                  value={newDonationCat}
                  onChange={(e) => setNewDonationCat(e.target.value as any)}
                  className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
                >
                  <option value="DANA_ABADI">DANA_ABADI</option>
                  <option value="NASKAH">NASKAH</option>
                  <option value="ARTEFAK">ARTEFAK</option>
                </select>
              </div>
              <button
                type="submit"
                className="rounded bg-[#151B8D] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Tambahkan ke Log Kontribusi Pilar #{activeDonor.pillarNumber}
              </button>
            </form>

            <div className="space-y-2 rounded border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <ShieldAlert className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>MODERATE_USER_RATINGS (MODERASI ULASAN KOMUNITAS)</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Klik tombol moderasi pada daftar ulasan di bawah untuk menyetujui atau menyembunyikan rating.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 12 Pillars Grid ("Energy 12 Donatur Peradaban Mulia", Quota: 12) */}
      <section aria-label="Energy 12 Donatur Peradaban Mulia" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold text-[#0A0A0A]">
            12 Pillars Grid: Energy 12 Donatur Peradaban Mulia ({donors.length} / {DONOR_PILLARS_QUOTA} Kuota Pilar)
          </h2>
          <span className="font-archival text-xs text-[#151B8D]">
            HIGHLIGHT: ENERGY 12 DONATUR PERADABAN MULIA
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {donors.map((donor) => {
            const metrics = calculateDonorRatingMetrics(donor.ratings);
            const isSelected = donor.id === activeDonor.id;
            return (
              <button
                key={donor.id}
                type="button"
                onClick={() => handleSelectDonor(donor.id)}
                className={`flex flex-col justify-between rounded-lg border p-4 text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#151B8D] bg-white'
                    : 'border-[#E2E8F0] bg-[#F8F9FA] hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-archival text-[#64748B]">
                    <span className="font-semibold text-[#151B8D]">
                      PILAR {String(donor.pillarNumber).padStart(2, '0')} / 12
                    </span>
                    <span className="tabular-nums">
                      ★ {metrics.averageStars > 0 ? metrics.averageStars.toFixed(2) : '5.00'} ({metrics.totalCount})
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display-serif text-base font-semibold text-[#0A0A0A] line-clamp-1">
                    {donor.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#64748B] line-clamp-1">
                    {donor.zodiacOrSephiirahCorrelation}
                  </p>
                </div>

                <div className="mt-3 border-t border-[#E2E8F0] pt-2 text-[11px] font-archival text-[#0A0A0A]">
                  {donor.donations.length} Kontribusi Terindeks
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Split: Selected Pillar Detail & Donation Log + Likert 1-5 Rating Form */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-archival text-[#151B8D]">
                  PILAR #{activeDonor.pillarNumber} · {activeDonor.zodiacOrSephiirahCorrelation}
                </div>
                <h2 className="mt-1 font-display-serif text-2xl font-semibold text-[#0A0A0A]">
                  {activeDonor.name}
                </h2>
                <p className="mt-0.5 text-xs text-[#64748B]">{activeDonor.honorificTitle}</p>
              </div>

              <div className="text-right font-archival">
                <div className="text-2xl font-bold tabular-nums text-[#151B8D]">
                  {activeMetrics.averageStars.toFixed(2)} / 5.00
                </div>
                <div className="text-xs text-[#64748B]">
                  {activeMetrics.totalCount} Catatan Rating Aktif
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#0A0A0A]">
              {activeDonor.biographySummary}
            </p>

            {/* Donation Log Table */}
            <div className="space-y-3">
              <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
                LOG KONTRIBUSI NASKAH, ARTEFAK & DANA ABADI ({activeDonor.donations.length})
              </div>
              <div className="overflow-x-auto rounded border border-[#E2E8F0]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#E2E8F0] bg-[#F8F9FA] font-archival text-[#64748B]">
                    <tr>
                      <th className="px-3.5 py-2.5">KODE AKSESI</th>
                      <th className="px-3.5 py-2.5">KATEGORI</th>
                      <th className="px-3.5 py-2.5">DESKRIPSI HIBAH</th>
                      <th className="px-3.5 py-2.5">CAKUPAN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {activeDonor.donations.map((don) => (
                      <tr key={don.id}>
                        <td className="px-3.5 py-3 font-archival font-medium text-[#151B8D] whitespace-nowrap">
                          {don.accessionCode}
                        </td>
                        <td className="px-3.5 py-3 font-archival text-[#0A0A0A] whitespace-nowrap">
                          {don.category}
                        </td>
                        <td className="px-3.5 py-3 font-medium text-[#0A0A0A]">
                          {don.itemTitle}
                          <div className="text-[11px] font-archival text-[#64748B]">
                            Tanggal: {don.date}
                          </div>
                        </td>
                        <td className="px-3.5 py-3 text-[#64748B]">{don.valuationOrScope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Field Reviews List */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="font-heading text-base font-semibold text-[#0A0A0A]">
                Catatan Ulasan Lapangan (Field Reviews) — {activeDonor.ratings.length} Peneliti
              </h3>
              <span className="font-archival text-xs text-[#64748B]">
                1 RECORD AKTIF / PENELITI
              </span>
            </div>

            {activeDonor.ratings.length === 0 ? (
              <p className="text-xs text-[#64748B]">
                Belum ada ulasan komunitas untuk Pilar #{activeDonor.pillarNumber}. Jadilah peneliti pertama yang memberikan apresiasi di panel kanan.
              </p>
            ) : (
              <div className="divide-y divide-[#E2E8F0]">
                {activeDonor.ratings.map((rating) => {
                  const isCurrentUsersRecord =
                    isAuthenticated && rating.userId === currentUser.userId;
                  return (
                    <div key={rating.userId} className="py-4 first:pt-1 last:pb-1 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-heading text-sm font-semibold text-[#0A0A0A]">
                            {rating.userName}
                          </span>
                          {isCurrentUsersRecord && (
                            <span className="ml-2 font-archival text-xs font-semibold text-[#151B8D]">
                              · [Catatan Aktif Anda]
                            </span>
                          )}
                          <div className="text-xs text-[#64748B]">{rating.userRole}</div>
                        </div>

                        <div className="flex items-center gap-2 font-archival text-xs">
                          <span className="font-semibold text-[#151B8D]">
                            Likert {rating.stars} / 5 Bintang
                          </span>
                          <span aria-hidden="true">·</span>
                          <button
                            type="button"
                            onClick={() => handleModerateRating(rating.userId)}
                            className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2 py-0.5 text-[11px] text-[#0A0A0A] hover:bg-white cursor-pointer"
                          >
                            {rating.moderatedStatus === 'FLAGGED' ? 'Disembunyikan (Pulihkan)' : 'Moderasi ✓'}
                          </button>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-[#0A0A0A]">
                        {rating.reviewText}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Likert 1-5 Star Submission & Update Form */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmitRating}
            className="rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-6 space-y-5"
          >
            <div className="border-b border-[#E2E8F0] pb-3">
              <div className="text-xs font-archival text-[#151B8D]">
                COMMUNITY RATING (LIKERT 1–5 BINTANG)
              </div>
              <h3 className="mt-1 font-heading text-lg font-semibold text-[#0A0A0A]">
                {existingUserRating
                  ? 'Perbarui Catatan Rating Aktif Anda'
                  : 'Kirim Apresiasi & Ulasan Lapangan'}
              </h3>
              <p className="mt-1 text-xs text-[#64748B]">
                Target Pilar #{activeDonor.pillarNumber}:{' '}
                <strong className="text-[#0A0A0A]">{activeDonor.name}</strong>
              </p>
            </div>

            {existingUserRating && (
              <div className="rounded border border-[#E2E8F0] bg-white p-3 text-xs text-[#64748B]">
                <strong className="font-archival text-[#151B8D]">STATUS REKAMAN TUNGGAL: </strong>
                Anda ({currentUser.userName}) telah memiliki 1 catatan rating aktif (
                <strong>{existingUserRating.stars}/5 Bintang</strong>) untuk tokoh ini. Mengirim ulang formulir akan memperbarui catatan aktif tersebut tanpa menduplikasi data.
              </div>
            )}

            <div className="space-y-2">
              <label className="block font-archival text-xs font-semibold text-[#0A0A0A]">
                SKALA LIKERT (1–5 BINTANG)
              </label>
              <div
                role="radiogroup"
                aria-label="Pilih Skala Likert 1 hingga 5 Bintang"
                className="grid grid-cols-5 gap-2"
              >
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isSelected = starsInput === starVal;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setStarsInput(starVal)}
                      className={`flex flex-col items-center justify-center rounded border py-2.5 text-xs font-archival transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#151B8D] bg-[#151B8D] text-white font-semibold'
                          : 'border-[#E2E8F0] bg-white text-[#0A0A0A] hover:border-[#151B8D]'
                      }`}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          isSelected ? 'fill-white text-white' : 'text-[#151B8D]'
                        }`}
                      />
                      <span className="mt-1">{starVal} Bintang</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="donor-field-review"
                className="block font-archival text-xs font-semibold text-[#0A0A0A]"
              >
                ULASAN LAPANGAN / FIELD REVIEW (WAJIB, MIN. 10 KARAKTER)
              </label>
              <textarea
                id="donor-field-review"
                rows={4}
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                placeholder="Tuliskan tinjauan akademis mengenai dampak hibah naskah, artefak, atau dana abadi tokoh ini..."
                className="w-full rounded-md border border-[#E2E8F0] bg-white p-3 text-xs text-[#0A0A0A] placeholder:text-[#64748B] focus:border-[#151B8D] focus:outline-none"
              />
            </div>

            {feedbackBanner && (
              <div
                role="status"
                className={`flex items-start gap-2 rounded border p-3 text-xs ${
                  feedbackBanner.type === 'success'
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    : 'border-rose-300 bg-rose-50 text-rose-950'
                }`}
              >
                {feedbackBanner.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-rose-700 shrink-0 mt-0.5" />
                )}
                <span>{feedbackBanner.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-[#151B8D] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#0E1260] cursor-pointer"
            >
              {existingUserRating
                ? 'Simpan Pembaruan Rating Aktif'
                : 'Simpan Rating & Ulasan Lapangan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 06: MODUL MEDIA VIDEO (MOD-06-VIDEO) — CURATED CINEMA GRID (QUOTA: 30) ---

const VIDEO_CATEGORIES: VideoCategory[] = [
  'Bedah Naskah Kuno',
  'Kuliah Sejarah Esoteris',
  'Dokumenter Preservasi Pustaka',
];

export const VideoMediaModule: React.FC = () => {
  const [videos, setVideos] = useState<EducationalVideoItem[]>(EDUCATIONAL_VIDEOS);
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | 'ALL'>('ALL');
  const [activeVideoId, setActiveVideoId] = useState<string>(EDUCATIONAL_VIDEOS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [hlsQuality, setHlsQuality] = useState<'2160p 4K' | '1080p FHD' | '720p HD'>('2160p 4K');

  // Founder Capabilities: replace_video_slot, upload_custom_thumbnail, edit_video_metadata
  const [showFounderPanel, setShowFounderPanel] = useState<boolean>(false);
  const [slotTitleDraft, setSlotTitleDraft] = useState<string>(EDUCATIONAL_VIDEOS[0].title);
  const [slotSpeakerDraft, setSlotSpeakerDraft] = useState<string>(
    EDUCATIONAL_VIDEOS[0].speaker
  );
  const [videoNotice, setVideoNotice] = useState<string | null>(null);

  const filteredVideos =
    selectedCategory === 'ALL'
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  const activeVideo: EducationalVideoItem =
    filteredVideos.find((v) => v.id === activeVideoId) ||
    filteredVideos[0] ||
    videos[0];

  const activeChapter =
    activeVideo.chapters[activeChapterIdx] || activeVideo.chapters[0];

  const handleUpdateVideoSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotTitleDraft.trim()) return;
    setVideos((prev) =>
      prev.map((v) =>
        v.id === activeVideo.id
          ? {
              ...v,
              title: slotTitleDraft.trim(),
              speaker: slotSpeakerDraft.trim() || v.speaker,
            }
          : v
      )
    );
    setVideoNotice(
      `[replace_video_slot / edit_video_metadata] Slot #0${activeVideo.slotNumber} berhasil diperbarui.`
    );
    setTimeout(() => setVideoNotice(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-archival text-[#64748B]">
            <span>ORDER 06 · MOD-06-VIDEO</span>
            <span aria-hidden="true">·</span>
            <span>UI MODE: CURATED CINEMA GRID</span>
            <span aria-hidden="true">·</span>
            <span>KUOTA TRANSMISI: {VIDEO_SLOTS_QUOTA} SLOT VIDEO</span>
          </div>
          <h1 className="mt-2 font-['Times_New_Roman'] text-3xl font-semibold text-[#0A0A0A]">
            Modul Media Video (Curated Cinema Grid — Kuota 30)
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
            Kisi sinema terkurasi berkuota <strong>{VIDEO_SLOTS_QUOTA} slot video</strong> dengan kapabilitas pendiri (<em>replace_video_slot</em>, <em>upload_custom_thumbnail</em>, <em>edit_video_metadata</em>).
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
            <span>Kapabilitas Pendiri (Video CMS)</span>
          </button>

          <div
            role="tablist"
            aria-label="Filter Kategori Video Edukasi"
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
              Semua ({videos.length} / {VIDEO_SLOTS_QUOTA} Slot)
            </button>
            {VIDEO_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#151B8D] text-white'
                      : 'text-[#0A0A0A] hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Founder Capabilities Drawer */}
      {showFounderPanel && (
        <form
          onSubmit={handleUpdateVideoSlot}
          className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2">
            <span className="font-archival text-xs font-semibold text-[#151B8D]">
              FOUNDER CAPABILITIES · REPLACE_VIDEO_SLOT, UPLOAD_CUSTOM_THUMBNAIL & EDIT_VIDEO_METADATA
            </span>
            {videoNotice && (
              <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                {videoNotice}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={slotTitleDraft}
              onChange={(e) => setSlotTitleDraft(e.target.value)}
              placeholder="Judul Slot Video..."
              className="rounded border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0A0A0A]"
            />
            <input
              type="text"
              value={slotSpeakerDraft}
              onChange={(e) => setSlotSpeakerDraft(e.target.value)}
              placeholder="Nama Pembicara / Kurator..."
              className="rounded border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0A0A0A]"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-[#151B8D] px-4 py-2 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
          >
            Simpan Perubahan Slot #0{activeVideo.slotNumber}
          </button>
        </form>
      )}

      {/* Main Split: HLS Embedded Player Stage + Curated Cinema Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#0F172A] text-white">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-archival">
              <span>
                SLOT 0{activeVideo.slotNumber}/{VIDEO_SLOTS_QUOTA} · {activeVideo.code}
              </span>
              <div className="flex items-center gap-2">
                <label htmlFor="hls-bitrate-select" className="text-slate-400">
                  Bitrate:
                </label>
                <select
                  id="hls-bitrate-select"
                  value={hlsQuality}
                  onChange={(e) => setHlsQuality(e.target.value as any)}
                  className="rounded border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-white"
                >
                  <option value="2160p 4K">2160p 4K</option>
                  <option value="1080p FHD">1080p FHD</option>
                  <option value="720p HD">720p HD</option>
                </select>
              </div>
            </div>

            <div className="relative aspect-[16/9] bg-slate-950 flex flex-col justify-between p-6">
              <img
                src={activeVideo.thumbnailUrl}
                alt={activeVideo.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              <div className="relative z-10 flex items-center justify-between text-xs font-archival text-slate-300">
                <span>KATEGORI: {activeVideo.category.toUpperCase()}</span>
                <span>DURASI: {activeVideo.duration} · {hlsQuality}</span>
              </div>

              <div className="relative z-10 my-auto mx-auto max-w-xl text-center space-y-3">
                <div className="font-archival text-xs text-indigo-300">
                  BAB AKTIF [{activeChapter.time}] — {activeChapter.label}
                </div>
                <h2 className="font-display-serif text-xl sm:text-2xl font-semibold text-white">
                  {activeVideo.title}
                </h2>
                <p className="text-xs text-slate-300">{activeChapter.summary}</p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="inline-flex items-center gap-2 rounded bg-[#151B8D] px-4 py-2 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span>{isPlaying ? 'Jeda Transmisi HLS' : 'Putar Transmisi HLS'}</span>
                </button>

                <div className="font-archival text-xs text-slate-300">
                  Pembicara: {activeVideo.speaker}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-archival text-[#64748B]">
              <span className="font-semibold text-[#0A0A0A]">
                TRANSKRIP AKADEMIS TERSINKRONISASI
              </span>
              <span>DIREKAM: {activeVideo.recordedDate}</span>
            </div>
            <blockquote className="font-codex text-lg italic leading-relaxed text-[#0A0A0A]">
              {activeVideo.transcriptPreview}
            </blockquote>
            <p className="text-xs text-[#64748B]">{activeVideo.synopsis}</p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 space-y-3">
            <div className="font-archival text-xs font-semibold text-[#0A0A0A]">
              CURATED CINEMA GRID ({filteredVideos.length} AKTIF DARI KUOTA {VIDEO_SLOTS_QUOTA} SLOT)
            </div>
            <div className="space-y-2.5">
              {filteredVideos.map((vid) => {
                const isSelected = vid.id === activeVideo.id;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => {
                      setActiveVideoId(vid.id);
                      setActiveChapterIdx(0);
                      setSlotTitleDraft(vid.title);
                      setSlotSpeakerDraft(vid.speaker);
                    }}
                    className={`w-full rounded border p-3.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#151B8D] bg-[#F8F9FA]'
                        : 'border-[#E2E8F0] bg-white hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-archival text-[#64748B]">
                      <span className="font-semibold text-[#151B8D]">
                        SLOT 0{vid.slotNumber} / {VIDEO_SLOTS_QUOTA} · {vid.category}
                      </span>
                      <span>{vid.duration}</span>
                    </div>
                    <div className="mt-1 font-heading text-sm font-semibold text-[#0A0A0A]">
                      {vid.title}
                    </div>
                    <div className="mt-1 text-xs text-[#64748B]">{vid.speaker}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
