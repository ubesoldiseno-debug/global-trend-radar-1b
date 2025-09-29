import React from "react";
import type { NewsItem } from "../types";
import { formatDateEs } from "../utils";

export function TrendCard({ item }: { item: NewsItem }) {
  return (
    <article className="relative border border-slate-200 dark:border-slate-800 rounded-[18px] p-4 bg-white dark:bg-slate-900 shadow-soft hover:shadow-md transition">
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center text-[11px] px-2.5 py-1 rounded-full bg-slate-900/90 text-white dark:bg-white/10 dark:text-slate-100 uppercase tracking-wide">
          {item.pill}
        </span>
        <span className="text-[12px] text-slate-500 dark:text-slate-400">{formatDateEs(item.dateISO)}</span>
      </div>
      <h3 className="text-[16px] leading-snug font-semibold mb-2">{item.title}</h3>
      <div className="text-[13px] text-slate-600 dark:text-slate-400 mb-3">{item.source}</div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener"
        className="text-[13px] text-brand-600 hover:text-brand-700 hover:underline font-medium"
      >
        Abrir enlace ↗
      </a>
    </article>
  );
}
