import React from "react";
import type { Filters } from "../types";

type Props = {
  pills: string[];
  sections: string[];
  filters: Filters;
  setSearch: (v: string) => void;
  setPill: (v: string | null) => void;
  setSection: (v: string | null) => void;
  total: number;
};

export function Toolbar({
  pills, sections, filters, setSearch, setPill, setSection, total
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-3 md:p-4 shadow-soft">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2 flex-wrap">
          <input
            value={filters.search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar título o fuente…"
            className="flex-1 min-w-[220px] md:w-72 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
          />
          <select
            value={filters.section ?? ""}
            onChange={e => setSection(e.target.value || null)}
            className="px-3 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
          >
            <option value="">Todas las secciones</option>
            {sections.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={filters.pill ?? ""}
            onChange={e => setPill(e.target.value || null)}
            className="px-3 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
          >
            <option value="">Todas las pills</option>
            {pills.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {(filters.search || filters.section || filters.pill) && (
            <button
              onClick={() => { setSearch(""); setSection(null); setPill(null); }}
              className="px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm"
            >
              Limpiar
            </button>
          )}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300">{total} noticias</div>
      </div>
    </div>
  );
}
