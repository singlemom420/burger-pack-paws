"use client";

import { useEffect, useRef, useState } from "react";

export default function Tabs({ tabs, activeId, onChange }) {
  const safeTabs = tabs || [];
  const activeTab = safeTabs.find((t) => t.id === activeId) || safeTabs[0];

  const tabsBarRef = useRef(null);
  const tabBtnRefs = useRef({});

  // Keep the ACTIVE TAB visible horizontally (no vertical scrolling)
  useEffect(() => {
    const bar = tabsBarRef.current;
    const btn = tabBtnRefs.current?.[activeId];
    if (!bar || !btn) return;

    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const btnLeft = btnRect.left - barRect.left + bar.scrollLeft;
    const btnRight = btnLeft + btnRect.width;

    const visibleLeft = bar.scrollLeft;
    const visibleRight = visibleLeft + bar.clientWidth;

    // if already fully visible, do nothing
    if (btnLeft >= visibleLeft && btnRight <= visibleRight) return;

    // center active tab in the scroll area
    const target = btnLeft - bar.clientWidth / 2 + btnRect.width / 2;

    bar.scrollTo({
      left: Math.max(0, target),
      behavior: "smooth",
    });
  }, [activeId]);

  // One-time "scroll hint" on mobile: nudge right then back (no vertical scroll)
  useEffect(() => {
    const bar = tabsBarRef.current;
    if (!bar) return;

    // only on mobile
    if (window.matchMedia("(min-width: 901px)").matches) return;

    const key = "tabsScrollHintShown_v1";
    if (localStorage.getItem(key) === "1") return;

    const maxScroll = bar.scrollWidth - bar.clientWidth;
    if (maxScroll <= 8) {
      localStorage.setItem(key, "1");
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      localStorage.setItem(key, "1");
      return;
    }

    localStorage.setItem(key, "1");

    const nudge = Math.min(90, Math.max(40, Math.floor(maxScroll * 0.18)));

    const t1 = setTimeout(() => {
      bar.scrollTo({ left: nudge, behavior: "smooth" });

      const t2 = setTimeout(() => {
        bar.scrollTo({ left: 0, behavior: "smooth" });
      }, 900);

      bar.__tabsHintT2 = t2;
    }, 650);

    return () => {
      clearTimeout(t1);
      if (bar.__tabsHintT2) clearTimeout(bar.__tabsHintT2);
    };
  }, []);

  return (
    <div className="tabsWrap">
      <div
        ref={tabsBarRef}
        className="tabsBar"
        role="tablist"
        aria-label="Sections"
      >
        {safeTabs.map((t) => {
          const isActive = t.id === activeId;
          return (
            <button
              key={t.id}
              ref={(el) => {
                if (el) tabBtnRefs.current[t.id] = el;
              }}
              type="button"
              className={"tabBtn " + (isActive ? "tabBtnActive" : "")}
              aria-selected={isActive}
              onClick={() => onChange(t.id)}
            >
              <span className="tabIcon" aria-hidden="true">
                {t.icon}
              </span>
              <span className="tabLabel">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active tab content – no minHeight, just natural height */}
      <div id="tabPanelTop" className="tabPanel">
        <div className="tabPanelInner">{activeTab?.content}</div>
      </div>
    </div>
  );
}
