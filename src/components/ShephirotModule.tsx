import React, { useState, useMemo } from 'react';
import {
  SHEPHIROT_NODES,
  SHEPHIROT_PATHS,
  PillarType,
  ShephirotNode,
  ShephirotPath,
  getConnectedPathsForNode,
  getAdjacentNodes,
  CAPSULE_DOCUMENTS,
  ModuleId,
} from '../utils/archiveEngine';
import {
  BookOpen,
  ArrowUpRight,
  GitBranch,
  Layers,
  Edit3,
  Link2,
} from 'lucide-react';

interface ShephirotModuleProps {
  initialNodeId?: number;
  onNavigateModule: (moduleId: ModuleId, param?: string) => void;
}

export const ShephirotModule: React.FC<ShephirotModuleProps> = ({
  initialNodeId = 6,
  onNavigateModule,
}) => {
  const [nodes, setNodes] = useState<ShephirotNode[]>(SHEPHIROT_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<number>(initialNodeId);
  const [selectedPathNumber, setSelectedPathNumber] = useState<number | null>(null);
  const [pillarFilter, setPillarFilter] = useState<PillarType | 'ALL'>('ALL');
  const [showPathHebrewLabels, setShowPathHebrewLabels] = useState<boolean>(true);

  // Founder Capabilities: edit_node_descriptions, link_new_pdfs_or_photos_to_nodes
  const [showFounderPanel, setShowFounderPanel] = useState<boolean>(false);
  const [nodeDescriptionDraft, setNodeDescriptionDraft] = useState<string>(
    SHEPHIROT_NODES.find((n) => n.id === initialNodeId)?.description ||
      SHEPHIROT_NODES[5].description
  );
  const [selectedDocToLink, setSelectedDocToLink] = useState<string>(CAPSULE_DOCUMENTS[0].id);
  const [founderFeedback, setFounderFeedback] = useState<string | null>(null);

  const activeNode: ShephirotNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) || nodes[5],
    [nodes, selectedNodeId]
  );

  const connectedPaths = useMemo(
    () => getConnectedPathsForNode(activeNode.id),
    [activeNode.id]
  );

  const adjacentNodes = useMemo(
    () => getAdjacentNodes(activeNode.id),
    [activeNode.id]
  );

  const activePath: ShephirotPath | undefined = useMemo(() => {
    if (selectedPathNumber !== null) {
      return SHEPHIROT_PATHS.find((p) => p.pathNumber === selectedPathNumber);
    }
    return connectedPaths[0];
  }, [selectedPathNumber, connectedPaths]);

  const linkedManuscripts = useMemo(
    () => CAPSULE_DOCUMENTS.filter((doc) => activeNode.linkedCapsuleIds.includes(doc.id)),
    [activeNode]
  );

  const handleSelectNode = (nodeId: number) => {
    setSelectedNodeId(nodeId);
    const targetNode = nodes.find((n) => n.id === nodeId);
    if (targetNode) {
      setNodeDescriptionDraft(targetNode.description);
    }
    const paths = getConnectedPathsForNode(nodeId);
    if (paths.length > 0) {
      setSelectedPathNumber(paths[0].pathNumber);
    }
  };

  const handleEditNodeDescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nodeDescriptionDraft.trim()) return;
    setNodes((prev) =>
      prev.map((n) =>
        n.id === activeNode.id ? { ...n, description: nodeDescriptionDraft.trim() } : n
      )
    );
    setFounderFeedback(
      `[edit_node_descriptions] Deskripsi Simpul #${activeNode.id} (${activeNode.name}) diperbarui.`
    );
    setTimeout(() => setFounderFeedback(null), 3000);
  };

  const handleLinkPdfToNode = (e: React.FormEvent) => {
    e.preventDefault();
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id !== activeNode.id) return n;
        if (n.linkedCapsuleIds.includes(selectedDocToLink)) return n;
        return {
          ...n,
          linkedCapsuleIds: [...n.linkedCapsuleIds, selectedDocToLink],
        };
      })
    );
    setFounderFeedback(
      `[link_new_pdfs_or_photos_to_nodes] Berkas ${selectedDocToLink} berhasil ditautkan ke Simpul #${activeNode.id}.`
    );
    setTimeout(() => setFounderFeedback(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-archival text-[#64748B]">
            <span>ORDER 05 · MOD-05-SHEPHIROT</span>
            <span aria-hidden="true">·</span>
            <span>UI MODE: WEB SCROLL (INTERACTIVE SCROLLYTELLING SVG)</span>
          </div>
          <h1 className="mt-2 font-['Times_New_Roman'] text-3xl font-semibold text-[#0A0A0A]">
            Sistem Graf Interaktif Shephirot (Tree of Life)
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
            Graf Scrollytelling SVG interaktif 10 Simpul Sephiroth dan 22 Jalur Kebijaksanaan dengan kapabilitas pendiri (<em>edit_node_descriptions</em>, <em>link_new_pdfs_or_photos_to_nodes</em>).
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
            <span>Kapabilitas Pendiri (Graf CMS)</span>
          </button>

          <div
            role="tablist"
            aria-label="Filter Pilar Shephirot"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-1"
          >
            {(
              [
                { key: 'ALL', label: 'Semua Pilar (10)' },
                { key: 'Middle', label: 'Pilar Tengah (4)' },
                { key: 'Right', label: 'Pilar Kanan (3)' },
                { key: 'Left', label: 'Pilar Kiri (3)' },
              ] as const
            ).map((tab) => {
              const isActive = pillarFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setPillarFilter(tab.key)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#151B8D] text-white'
                      : 'text-[#64748B] hover:text-[#0A0A0A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Founder Panel: edit_node_descriptions & link_new_pdfs_or_photos_to_nodes */}
      {showFounderPanel && (
        <div className="rounded-lg border border-[#151B8D] bg-[#F8F9FA] p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <span className="font-archival text-xs font-semibold text-[#151B8D]">
              FOUNDER CAPABILITIES · MOD-05-SHEPHIROT (SIMPUL AKTIF: #{activeNode.id}{' '}
              {activeNode.name})
            </span>
            {founderFeedback && (
              <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-900">
                {founderFeedback}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 1. edit_node_descriptions */}
            <form
              onSubmit={handleEditNodeDescription}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Edit3 className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>1. EDIT_NODE_DESCRIPTIONS (#{activeNode.id} {activeNode.name})</span>
              </div>
              <textarea
                rows={2}
                value={nodeDescriptionDraft}
                onChange={(e) => setNodeDescriptionDraft(e.target.value)}
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] p-2 text-xs text-[#0A0A0A]"
              />
              <button
                type="submit"
                className="rounded bg-[#151B8D] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Simpan Deskripsi Simpul
              </button>
            </form>

            {/* 2. link_new_pdfs_or_photos_to_nodes */}
            <form
              onSubmit={handleLinkPdfToNode}
              className="space-y-3 rounded border border-[#E2E8F0] bg-white p-4"
            >
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Link2 className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>2. LINK_NEW_PDFS_OR_PHOTOS_TO_NODES</span>
              </div>
              <select
                value={selectedDocToLink}
                onChange={(e) => setSelectedDocToLink(e.target.value)}
                className="w-full rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1.5 text-xs text-[#0A0A0A]"
              >
                {CAPSULE_DOCUMENTS.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.badge} — {doc.dublinCore.title}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded bg-[#151B8D] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] cursor-pointer"
              >
                Tautkan PDF ke Simpul #{activeNode.id}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Quick Accessible Node Bar (1..10) */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] p-2">
        <span className="px-2 font-archival text-xs font-semibold text-[#64748B]">
          SIMPUL CEPAT:
        </span>
        {nodes.map((node) => {
          const isSelected = node.id === activeNode.id;
          const isDimmed = pillarFilter !== 'ALL' && node.pillar !== pillarFilter;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => handleSelectNode(node.id)}
              className={`rounded px-2.5 py-1.5 text-xs font-archival transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#151B8D] font-semibold text-white'
                  : isDimmed
                  ? 'bg-white/60 text-[#64748B] opacity-50 hover:opacity-100'
                  : 'bg-white text-[#0A0A0A] border border-[#E2E8F0] hover:border-[#151B8D]'
              }`}
            >
              {node.id}. {node.name} ({node.title_en})
            </button>
          );
        })}
      </div>

      {/* Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col justify-between rounded-lg border border-[#E2E8F0] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2 text-xs font-archival text-[#64748B]">
              <span>SCROLLYTELLING SVG ENGINE</span>
              <span aria-hidden="true">·</span>
              <span>NODE BORDER: #151B8D</span>
            </div>

            <button
              type="button"
              onClick={() => setShowPathHebrewLabels((v) => !v)}
              className="rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1 text-xs font-medium text-[#0A0A0A] hover:bg-white cursor-pointer"
            >
              {showPathHebrewLabels ? 'Sembunyikan Nomor Jalur' : 'Tampilkan Nomor Jalur (11–32)'}
            </button>
          </div>

          <div
            data-testid="shephirot-directed-graph"
            className="relative my-4 flex items-center justify-center rounded-md border border-[#E2E8F0] bg-[#F8F9FA] p-4"
          >
            <svg
              viewBox="0 0 600 780"
              role="img"
              aria-label="Graf Berarah 10 Simpul Shephirot dan 22 Jalur Kebijaksanaan"
              className="h-auto w-full max-w-[540px] select-none"
            >
              <defs>
                <filter id="tbi-node-glow" x="-35%" y="-35%" width="170%" height="170%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="26"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#151B8D" />
                </marker>
              </defs>

              <g className="text-[#64748B]" opacity={0.45}>
                <line x1={130} y1={30} x2={130} y2={745} stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth={1.5} />
                <line x1={300} y1={30} x2={300} y2={745} stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth={1.5} />
                <line x1={470} y1={30} x2={470} y2={745} stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth={1.5} />
                <text x={130} y={24} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#64748B">
                  PILAR KIRI (LEFT / SEVERITY)
                </text>
                <text x={300} y={24} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#151B8D">
                  PILAR TENGAH (MIDDLE / BALANCE)
                </text>
                <text x={470} y={24} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#64748B">
                  PILAR KANAN (RIGHT / MERCY)
                </text>
              </g>

              {SHEPHIROT_PATHS.map((path) => {
                const fromNode = nodes.find((n) => n.id === path.fromNodeId)!;
                const toNode = nodes.find((n) => n.id === path.toNodeId)!;
                const isConnectedToActive =
                  path.fromNodeId === activeNode.id || path.toNodeId === activeNode.id;
                const isSelectedPath = activePath?.pathNumber === path.pathNumber;

                const midX = (fromNode.x + toNode.x) / 2;
                const midY = (fromNode.y + toNode.y) / 2;

                return (
                  <g
                    key={path.id}
                    onClick={() => setSelectedPathNumber(path.pathNumber)}
                    className="cursor-pointer"
                  >
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isSelectedPath || isConnectedToActive ? '#151B8D' : '#CBD5E1'}
                      strokeWidth={isSelectedPath ? 3.5 : isConnectedToActive ? 2.5 : 1.5}
                      markerEnd={isConnectedToActive ? 'url(#arrow-active)' : undefined}
                      filter={isSelectedPath ? 'url(#tbi-node-glow)' : undefined}
                    />
                    {showPathHebrewLabels && (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x={-15}
                          y={-9}
                          width={30}
                          height={18}
                          rx={3}
                          fill={isSelectedPath ? '#151B8D' : '#FFFFFF'}
                          stroke={isConnectedToActive ? '#151B8D' : '#CBD5E1'}
                          strokeWidth={1}
                        />
                        <text
                          x={0}
                          y={3.5}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontFamily="JetBrains Mono, monospace"
                          fontWeight="600"
                          fill={isSelectedPath ? '#FFFFFF' : '#0A0A0A'}
                        >
                          P{path.pathNumber}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {nodes.map((node) => {
                const isSelected = node.id === activeNode.id;
                const isAdjacent = adjacentNodes.some((n) => n.id === node.id);
                const isFilteredOut =
                  pillarFilter !== 'ALL' && node.pillar !== pillarFilter;

                return (
                  <g
                    key={node.key}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => handleSelectNode(node.id)}
                    className="cursor-pointer"
                    opacity={isFilteredOut ? 0.35 : 1}
                  >
                    {isSelected && (
                      <circle
                        r={39}
                        fill="none"
                        stroke="#151B8D"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        filter="url(#tbi-node-glow)"
                      />
                    )}
                    <circle
                      r={31}
                      fill={isSelected ? '#151B8D' : isAdjacent ? '#EEF2FF' : '#FFFFFF'}
                      stroke="#151B8D"
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <text
                      y={-10}
                      textAnchor="middle"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                      fill={isSelected ? '#E2E8F0' : '#64748B'}
                    >
                      0{node.id} · {node.hebrewName}
                    </text>
                    <text
                      y={4}
                      textAnchor="middle"
                      fontSize="12"
                      fontFamily="Montserrat, sans-serif"
                      fontWeight="700"
                      fill={isSelected ? '#FFFFFF' : '#0A0A0A'}
                    >
                      {node.name}
                    </text>
                    <text
                      y={17}
                      textAnchor="middle"
                      fontSize="9.5"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fill={isSelected ? '#CBD5E1' : '#64748B'}
                    >
                      {node.title_en}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Zone: Node & Path Inspector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <div className="text-xs font-archival text-[#151B8D]">
                  SIMPUL EMANASI #{activeNode.id} · PILAR: {activeNode.pillar.toUpperCase()}
                </div>
                <h2 className="mt-1 font-display-serif text-2xl font-semibold text-[#0A0A0A]">
                  {activeNode.name} — {activeNode.title_en}
                </h2>
                <div className="mt-0.5 text-xs text-[#64748B]">
                  {activeNode.title_id} · Aksara Ibrani:{' '}
                  <span className="font-semibold text-[#0A0A0A]">{activeNode.hebrewName}</span>
                </div>
              </div>
              <span className="font-archival text-2xl font-bold text-[#151B8D]">
                0{activeNode.id}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#0A0A0A]">
              {activeNode.description}
            </p>

            <div className="border-t border-[#E2E8F0] pt-4 space-y-3">
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <Layers className="h-3.5 w-3.5 text-[#151B8D]" />
                <span>REFERENSI SILANG PDF & FOTO TERHUBUNG ({linkedManuscripts.length})</span>
              </div>

              {linkedManuscripts.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-md border border-[#E2E8F0] bg-[#F8F9FA] p-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-archival text-[11px] font-semibold text-[#151B8D]">
                      {doc.badge} · {doc.dublinCore.identifier}
                    </div>
                    <div className="truncate text-xs font-medium text-[#0A0A0A]">
                      {doc.dublinCore.title}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateModule('MOD-04-KAPSUL-WAKTU', doc.id)}
                    className="inline-flex items-center gap-1 rounded bg-[#151B8D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0E1260] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Buka PDF</span>
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  onNavigateModule('MOD-08-GOLDEN-DAWN', activeNode.linkedGoldenDawnSubId)
                }
                className="w-full flex items-center justify-between rounded-md border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs font-medium text-[#0A0A0A] hover:bg-[#F8F9FA] cursor-pointer"
              >
                <span>Buka Sub-Koleksi Golden Dawn ({activeNode.linkedGoldenDawnSubId})</span>
                <ArrowUpRight className="h-4 w-4 text-[#151B8D]" />
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-1.5 font-archival text-xs font-semibold text-[#0A0A0A]">
                <GitBranch className="h-4 w-4 text-[#151B8D]" />
                <span>JALUR PENGHUBUNG SIMPUL #{activeNode.id} ({connectedPaths.length} JALUR)</span>
              </div>
            </div>

            <div className="space-y-2">
              {connectedPaths.map((path) => {
                const isSelected = activePath?.pathNumber === path.pathNumber;
                const fromNode = nodes.find((n) => n.id === path.fromNodeId)!;
                const toNode = nodes.find((n) => n.id === path.toNodeId)!;
                return (
                  <button
                    key={path.id}
                    type="button"
                    onClick={() => setSelectedPathNumber(path.pathNumber)}
                    className={`w-full rounded-md border p-3 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#151B8D] bg-[#F8F9FA]'
                        : 'border-[#E2E8F0] bg-white hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-archival">
                      <span className="font-semibold text-[#151B8D]">
                        JALUR #{path.pathNumber} · {path.hebrewLetter}
                      </span>
                      <span className="text-[#64748B]">
                        {fromNode.name} → {toNode.name}
                      </span>
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[#0A0A0A]">
                      {path.intelligenceTitle} · Arkana Tarot: {path.tarotArcana}
                    </div>
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
