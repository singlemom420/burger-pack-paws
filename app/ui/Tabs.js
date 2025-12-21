"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Tabs({ tabs, activeId, onChange }) {
  const safeTabs = tabs || [];
  const activeTab = safeTabs.find((t) => t.id === activeId) || safeTabs[0];

  const measureWrapRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  const tabsBarRef = useRef(null);
  const tabBtnRefs = useRef({});

  const recomputeMaxHeight = () => {
    const wrap = measureWrapRef.current;
    if (!wrap) return;

    const nodes = wrap.querySelectorAll("[data-measure-tab]");
    let tallest = 0;

    nodes.forEach((node) => {
      const h = node.getBoundingClientRect().height;
      if (h > tallest) tallest = h;
    });

    if (tallest > 0) setMaxHeight(Math.ceil(tallest));
  };

  useLayoutEffect(() => {
    recomputeMaxHeight();
  }, []);

  useLayoutEffect(() => {
    recomputeMaxHeight();
  }, [activeId]);

  useEffect(() => {
    const onResize = () => recomputeMaxHeight();
    window.addEventListener("resize", onResize);

    let ro;
    if (typeof ResizeObserver !== "undefined" && measureWrapRef.current) {
      ro = new ResizeObserver(() => recomputeMaxHeight());
      ro.observe(measureWrapRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, []);

  // Scroll the tabs strip horizontally to reveal the active tab
  // WITHOUT any vertical page scrolling.
  useEffect(() => {
    const bar = tabsBarRef.current;
    const btn = tabBtnRefs.current?.[activeId];
    if (!bar || !btn) return;

    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const btnLeft = (btnRect.left - barRect.left) + bar.scrollLeft;
    const btnRight = btnLeft + btnRect.width;

    const visibleLeft = bar.scrollLeft;
    const visibleRight = visibleLeft + bar.clientWidth;

    if (btnLeft >= visibleLeft && btnRight <= visibleRight) return;

    const target =
      btnLeft - (bar.clientWidth / 2) + (btnRect.width / 2);

    bar.scrollTo({
      left: Math.max(0, target),
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <div className="tabsWrap">
      <div ref={tabsBarRef} className="tabsBar" role="tablist" aria-label="Sections">
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
              <span className="tabIcon" aria-hidden="true">{t.icon}</span>
              <span className="tabLabel">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="tabPanelHeightLock" style={{ minHeight: maxHeight ? `${maxHeight}px` : undefined }}>
        <div className="tabPanelInner">{activeTab?.content}</div>
      </div>

      <div ref={measureWrapRef} className="tabMeasure" aria-hidden="true">
        {safeTabs.map((t) => (
          <div key={t.id} data-measure-tab className="tabMeasureItem">
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
