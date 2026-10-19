"use client";

import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CalDotCom from "./clickable-cal-dot-com";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#work" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#book-call" },
];
const lighthouseMetrics = [
  { label: "Performance", score: 96 },
  { label: "Accessibility", score: 98 },
  { label: "Best Practices", score: 94 },
  { label: "SEO", score: 100 },
];

const showcaseCards = [
  {
    number: "01",
    title: "SaaS & MVP",
    service: "Product development",
    background: "linear-gradient(145deg, rgba(232, 241, 255, 0.96), rgba(203, 220, 250, 0.82))",
  },
  {
    number: "02",
    title: "Web & Product",
    service: "UX/UI design",
    background: "linear-gradient(145deg, rgba(255, 238, 244, 0.96), rgba(246, 207, 222, 0.82))",
  },
  {
    number: "03",
    title: "Brand Systems",
    service: "Identity & direction",
    background: "linear-gradient(145deg, rgba(231, 249, 242, 0.96), rgba(194, 231, 214, 0.82))",
  },
  {
    number: "04",
    title: "Search Growth",
    service: "SEO, AEO & GEO",
    background: "linear-gradient(145deg, rgba(250, 242, 225, 0.96), rgba(238, 216, 174, 0.82))",
  },
  {
    number: "05",
    title: "Marketing",
    service: "Campaigns & conversion",
    background: "linear-gradient(145deg, rgba(241, 235, 255, 0.96), rgba(215, 201, 246, 0.82))",
  },
];

const LandingPage = () => {
  const [metricIndex, setMetricIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = (performance.now() - startedAt) / 1000;
      const nextMetricIndex = Math.floor(elapsed / 3) % lighthouseMetrics.length;
      const cycleProgress = (elapsed % 3) / 1.5;
      const easedProgress = 1 - Math.pow(1 - Math.min(cycleProgress, 1), 3);

      setMetricIndex(nextMetricIndex);
      setScore(Math.round(lighthouseMetrics[nextMetricIndex].score * easedProgress));
    }, 50);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-gradient relative m-2 min-h-[calc(100svh-1rem)] overflow-hidden rounded-[1.5rem] px-4 pb-14 pt-3 text-white sm:m-2 sm:min-h-[calc(100svh-1rem)] sm:rounded-[1.75rem] sm:px-6">
      <header className="mx-auto flex h-11 w-full max-w-[600px] items-center justify-between rounded-[10px] bg-white px-1.5 text-[#5E5E5E] shadow-[0_2px_14px_rgba(38,76,104,0.08)]">
        <Link href="#top" aria-label="Awaken Studios home" className="flex size-8 shrink-0 items-center justify-center rounded-[7px] bg-[#242424]">
          <Image src="/assets/logo/logo-light.svg" alt="" width={20} height={20} priority />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-[11px] font-semibold tracking-tight md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-black">
              {item.label}
            </Link>
          ))}
        </nav>

        <CalDotCom>
          <button className="rounded-[7px] bg-[#252525] px-4 py-2 text-[12px] font-medium text-white shadow-[inset_0_-3px_5px_rgba(255,255,255,0.16)] transition-transform hover:-translate-y-0.5 flex items-center gap-2">
            <span>Start Project</span>
            <MoveUpRight className="size-3" />
          </button>
        </CalDotCom>
      </header>

      <div className="mx-auto flex max-w-3xl flex-col items-center pt-24 text-center">
        <CalDotCom>
          <button className="group mb-7 flex items-center gap-5 rounded-full border border-white/70 bg-white/10 px-4 py-1 text-[10px] font-medium backdrop-blur-sm transition-colors hover:bg-white/20">
            Get a free audit
            <span aria-hidden="true" className="text-base leading-none transition-transform group-hover:translate-x-1">→</span>
          </button>
        </CalDotCom>

        <h1 className="max-w-[680px] text-balance text-[clamp(2.25rem,2.8vw,3.25rem)] font-normal leading-[1.09] tracking-[-0.04em]">
          We design, build, and grow
          <br />
          <span className="sm:whitespace-nowrap">digital products. </span>
          <span className="font-apparel font-normal tracking-[-0.025em]">Start to finish.</span>
        </h1>

        <p className="mt-5 max-w-sm text-balance text-xs font-medium leading-relaxed text-white/90 sm:text-[13px]">
          Websites, SaaS, MVPs, branding, marketing, SEO, AEO, and GEO for brands, founders, and business owners.
        </p>
      </div>

      <div className="showcase-orbit" aria-hidden="true">
        <div className="speedometer-shell">
          <div className="speedometer-ticks" />
          <div className="speedometer-readout">
            <span>{lighthouseMetrics[metricIndex].label}</span>
            <strong>{score}%</strong>
            <div className="metric-switcher">
              {lighthouseMetrics.map((metric, index) => (
                <i key={metric.label} className={index === metricIndex ? "is-active" : ""}>
                  {metric.label}
                </i>
              ))}
            </div>
          </div>
          <div className="speedometer-needle" style={{ transform: `rotate(${-68 + score * 1.36}deg)` }} />
          <div className="speedometer-pin" />
        </div>

        {showcaseCards.map((card) => (
          <div key={card.number} className="showcase-card" style={{ background: card.background }}>
            <span>{card.number}</span>
            <strong>{card.title}</strong>
            <small>{card.service}</small>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingPage;
