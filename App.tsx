import React, { useEffect, useMemo } from "react";
import metadata from "./metadata.json";
import { NEWS } from "./constants";
import type { NewsItem } from "./types";
import { useFilters } from "./hooks/useFilters";
import { TrendCard } from "./components/TrendCard";
import { Toolbar } from "./components/Toolbar";

export default function App() {
  useEffect(() => {
    document.title = `Minisite semanal · ${metadata.period}`;
  }, []);

  const allSections = metadata.sections.map(s => s.title);
  const pills = useMemo(() => Array.from(new Set(NEWS.map(n => n.pill))).sort(), []);
  const { filtered, filters, setSearch, setPill, setSection } = useFilters(NEWS);

  const grouped = useMemo(() => {
    const map = new Map<string, NewsItem[]>();
    for (const s of allSections) map.set(s, []);
    for (const item of filtered) {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    }
    return map;
  }, [filtered, allSections]);

  return (
    <section className="max-w-[1060px] mx-auto p-4 md:p-6 text-slate-900 dark:text-slate-100">
      <div className="sticky top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 backdrop-blur bg-white/80 dark:bg-slate-950/70 shadow-soft">
        <header className="max-w-[1060px] mx-auto">
          <h1 className="text-[40px] md:text-[48px] font-extrabold leading-[1] tracking-tight">Radar Global de Tendencias</h1>
          <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-1">
            Minisite semanal · {metadata.period} · {metadata.subtitle}
          </div>
        </header>
      </div>

      <div className="mt-4">
        <Toolbar
          pills={pills}
          sections={allSections}
          filters={filters}
          setSearch={setSearch}
          setPill={setPill}
          setSection={setSection}
          total={filtered.length}
        />
      </div>

      {allSections.map((sectionTitle, idx) => {
        const items = grouped.get(sectionTitle) || [];
        if (!items.length) return null;
        return (
          <div key={sectionTitle} className={idx === 0 ? "" : "mt-10"}>
            <div className="flex items-end justify-between mb-3">
              <h2 className="text-2xl md:text-[26px] font-bold tracking-tight">{sectionTitle}</h2>
            </div>
            <div className="grid gap-4 md:gap-5" style={{gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))"}}>
              {items.map((item, i) => (
                <TrendCard key={`${item.url}-${i}`} item={item} />
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="mt-10 text-sm text-slate-600 dark:text-slate-300 text-center border rounded-2xl p-8 bg-white/60 dark:bg-slate-900/60">
          Sin resultados. Prueba otros filtros.
        </div>
      )}
    </section>
  );
}
