import React, { useEffect, useState } from "react";

/* -----------------------------------------------------------
   Scroll-reveal: adds "is-visible" once an element enters view
------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .ltv-tab");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* -----------------------------------------------------------
   Content — this is a synthetic, multi-touch attribution &
   channel-LTV study for a fictional D2C e-commerce store. Every
   record in this dataset is synthetically generated (no real
   customer or company data). That's called out explicitly in the
   hero and footer so a reviewer never has to wonder.
------------------------------------------------------------ */
const METHOD_STEPS = [
  { num: "01", title: "Data Simulation", body: "Generated synthetic sessions, carts and orders across 5 channels in Python (NumPy), each with its own CVR, AOV and monthly spend." },
  { num: "02", title: "Funnel Build", body: "Constructed the Sessions → Add to Cart → Checkout → Purchase funnel per channel to see exactly where each one leaks." },
  { num: "03", title: "Attribution Modeling", body: "Computed First-Touch, Last-Touch and Linear multi-touch attribution to see how revenue credit shifts depending on the model." },
  { num: "04", title: "LTV & ROAS", body: "Calculated 90-day and 180-day LTV per channel cohort, then tracked monthly ROAS for every paid channel against breakeven." },
  { num: "05", title: "Dashboard", body: "Built a 4-panel Power BI report: funnel, LTV by channel, attribution comparison, and ROAS trend." },
];

const KEY_METRICS = [
  { label: "Blended ROAS", value: "5.37×", sub: "Across 5 acquisition channels" },
  { label: "Total revenue", value: "₹1.56M", sub: "6-month synthetic window" },
  { label: "Total ad spend", value: "₹290.63K", sub: "Paid channels only" },
  { label: "Best 90-day LTV", value: "₹2,800", sub: "Influencer channel" },
  { label: "LTV gap, best vs. worst", value: "2.5×", sub: "Influencer vs. Google Ads" },
  { label: "Organic's attribution swing", value: "2.0×", sub: "Linear credit vs. last-touch" },
];

const QUICK_LINKS = [
  { href: "#problem", label: "Business Question" },
  { href: "#deep-dive", label: "Deep-Dive Analysis" },
  { href: "#dashboard", label: "Power BI Dashboard" },
  // { href: "#ab-test", label: "A/B Test" },
  { href: "#insights", label: "Key Insights" },
  { href: "#recommendations", label: "Recommendations" },
  { href: "#projects", label: "Project Links" },
];

const TABS = ["Objective", "My Analysis", "Methodology", "Key Result"];

const ANALYSIS_DONE = [
  { title: "Funnel analysis", body: "Broke each channel's journey into Sessions, Add to Cart, Checkout and Purchase to find exactly where volume was being lost." },
  { title: "Attribution modeling", body: "Compared First-Touch, Last-Touch and Linear revenue credit per channel — the model you pick can double a channel's apparent value." },
  { title: "LTV cohort analysis", body: "Calculated 90-day and 180-day lifetime value per channel to separate cheap conversions from genuinely valuable customers." },
  { title: "ROAS trend tracking", body: "Tracked monthly ROAS for every paid channel from Dec 2024 to Apr 2025 against a breakeven line." },
  { title: "Channel comparison", body: "Ranked all five channels side by side on funnel efficiency, LTV, attribution sensitivity and ROAS trajectory." },
];

const AB_TEST = {
  status: "Suggested experiment — not yet run",
  hypothesis: "Fixing the Google Ads checkout step that's currently losing the most sessions between Add to Cart and Purchase will lift the channel's conversion rate without extra spend.",
  control: { label: "Control", desc: "Current checkout flow for Google Ads traffic", metric: "Checkout completion rate", value: "—" },
  variant: { label: "Variant B", desc: "Simplified one-page checkout for Google Ads traffic", metric: "Checkout completion rate", value: "—" },
};

const DASHBOARD_FIGURES = [
  {
    label: "Conversion funnel by channel",
    caption: "Fig 1 — Funnel view",
    img: "/images/dashboard/Conversion funnel by channel.png",
    explain: "A bar chart tracking Sessions → Add to Cart → Checkout → Purchase for all 5 channels. Google Ads brings the most sessions by far, but its bars shrink fastest — the channel converts at just 2.14%, the lowest of the five.",
  },
  {
    label: "90-day LTV by acquisition channel",
    caption: "Fig 2 — Channel LTV",
    img: "/images/dashboard/90-day LTV by acquisition channel.png",
    explain: "A horizontal bar chart ranking channels by 90-day LTV, with a dashed line marking the blended average. Influencer leads at ₹2,800 — 2.5× the weakest channel, Google Ads, at ₹1,100.",
  },
  {
    label: "Attribution model comparison",
    caption: "Fig 3 — First-touch vs. last-touch vs. linear",
    img: "/images/dashboard/Attribution model comparison.png",
    explain: "A grouped bar chart comparing revenue credit under three attribution models. Organic is the outlier: it's credited ₹238K under last-touch but ₹476K under linear — almost double — because it quietly assists conversions it never gets to close.",
  },
  {
    label: "ROAS trend, paid channels",
    caption: "Fig 4 — Monthly ROAS, Dec 2024–Apr 2025",
    img: "/images/dashboard/ROAS trend.png",
    explain: "A line chart tracking monthly ROAS for the three paid channels against a breakeven line at 1×. Instagram and Influencer both sit well above breakeven but are trending down; Google Ads is the lowest line but the only one climbing.",
  },
];

const PROJECT_LINKS = [
  { icon: "📓", label: "GitHub Repository", desc: "Full code — synthetic data generation, funnel logic, attribution & LTV models", href: "https://github.com/kritikajain14/channel-attribution-model" },
  { icon: "📊", label: "Power BI Dashboard", desc: "The live 4-panel report shown on this page", href: "https://drive.google.com/drive/folders/10RhZQBKai6f2TCJIIxYt3rDbFjjLTxUW?usp=sharing" },
  { icon: "📁", label: "Dataset (synthetic)", desc: "Funnel, attribution, LTV and ROAS CSVs used in this analysis", href: "https://drive.google.com/drive/folders/1jxFYg9ijBqUDfuDKh3UoN84-xveCUMvw?usp=sharing" },
  { icon: "📄", label: "Written Report", desc: "The full write-up this page is based on", href: "https://drive.google.com/drive/folders/1PPb4V7mcG8Npf2HUj1q9ELZ3q_1oqBph?usp=sharing" },
];

const PROBLEM_POINTS = [
  "Marketing spend was allocated by last-touch revenue — the channel that happened to close the sale got all the credit",
  "Google Ads brought in the most traffic by a wide margin, but nobody had checked whether that traffic actually converted",
  "Some channels looked cheap to acquire from, but no one had connected acquisition cost back to what those customers were worth 90 or 180 days later",
  "There was no single view comparing attribution models side by side, so an assist-heavy channel like organic could be quietly underfunded",
];

const APPROACH_POINTS = [
  "Generated a realistic synthetic dataset — sessions, carts, orders — across 5 channels since this is a fictional store built for this case study",
  "Modeled per-channel conversion rate, average order value and monthly spend so funnel drop-off reflects real e-commerce patterns, not random noise",
  "Built Sessions → Add to Cart → Checkout → Purchase as an actual funnel per channel, not just a single conversion-rate number",
  "Computed First-Touch, Last-Touch and Linear attribution for every channel so I could see how much the choice of model changes the story",
  "Calculated 90-day and 180-day LTV per channel and tracked monthly ROAS for paid channels against a breakeven line",
];

const DEEP_DIVE = [
  {
    tint: "bg-green-deep",
    title: "Funnel leakage",
    body: "Google Ads drives 26,716 sessions — more than any other channel — and converts 25.9% to Add to Cart. But only 2.14% ever complete a Purchase, the weakest conversion rate of all five channels.",
  },
  {
    tint: "bg-green-bright",
    title: "Attribution sensitivity",
    body: "Organic is credited ₹238,079 under last-touch but ₹476,526 under linear attribution — a 2× swing. Direct also drops sharply under linear (₹418,727 → ₹301,023), the opposite pattern.",
  },
  {
    tint: "bg-gold",
    title: "Lifetime value",
    body: "Influencer customers are worth ₹2,800 at 90 days and ₹4,054 at 180 days — the highest of any channel — despite bringing in the fewest sessions (6,047).",
  },
  {
    tint: "bg-sage",
    title: "ROAS trajectory",
    body: "Instagram and Influencer both run 5–7× ROAS but are trending down month over month. Google Ads is the only paid channel improving, climbing from 3.88× to as high as 5.18×.",
  },
];

const INSIGHTS = [
  { tag: "Funnel", title: "Google Ads has the most volume and the weakest conversion", body: "26,716 sessions and a strong 25.9% add-to-cart rate, but only 2.14% of sessions ever complete a purchase — the lowest CVR of all five channels. The leak sits between checkout and purchase, not at the top of the funnel." },
  { tag: "Attribution", title: "Organic's value nearly doubles depending on the model you use", body: "Last-touch credits organic ₹238,079. Linear attribution — which spreads credit across every touchpoint — credits it ₹476,526. Judging organic by last-touch alone would make a real assist channel look expendable." },
  { tag: "LTV", title: "Influencer delivers the highest lifetime value by a wide margin", body: "₹2,800 at 90 days and ₹4,054 at 180 days, versus ₹1,100 and ₹1,630 for Google Ads — a 2.5× gap that doesn't show up in session volume alone." },
  { tag: "ROAS", title: "The two best-performing paid channels are both cooling off", body: "Instagram ROAS slipped from 7.22× to 6.62× and Influencer from 6.45× to 5.27× across the 5-month window, even though both remain well above the 1× breakeven line." },
  { tag: "Quality", title: "Direct is small but highly efficient", body: "Only 5,319 sessions — the smallest channel — but the highest conversion rate (6.13%) and highest AOV (₹1,284) of any channel in the dataset." },
];

const IMPACT_POINTS = [
  "Reframed 'best channel' as a question that depends on which attribution model you ask — not a single fixed answer",
  "Quantified the funnel gap: Google Ads converts at 2.14%, less than a third of Direct's 6.13%, despite bringing in 5× the sessions",
  "Separated acquisition volume from acquisition quality — Influencer brings the fewest sessions but the highest 90-day LTV of any channel",
  "Built the case for tracking ROAS trend, not just current ROAS — Instagram and Influencer are still profitable but both are declining",
];

const RECOMMENDATIONS = [
  { tag: "Attribution", title: "Don't judge organic on last-touch revenue alone", body: "Its linear-attribution credit is nearly double its last-touch number — it's assisting conversions it rarely closes." },
  { tag: "Funnel fix", title: "Diagnose the Google Ads checkout drop-off", body: "25.9% add-to-cart rate but only 2.14% purchase conversion points to friction at checkout, not a traffic-quality problem." },
  { tag: "Budget", title: "Protect Google Ads spend despite the lower ROAS", body: "It's the only paid channel with ROAS trending up — 3.88× to as high as 5.18× over 5 months." },
  { tag: "Retention", title: "Invest further in Influencer for LTV, not just ROAS", body: "₹2,800 90-day LTV is 2.5× Google Ads — worth protecting even as its ROAS cools." },
  { tag: "Monitoring", title: "Watch the Instagram & Influencer ROAS decline", body: "Both are still well above breakeven but have been trending down for 3+ consecutive months." },
  { tag: "Efficiency", title: "Study what makes Direct convert so well", body: "6.13% CVR and ₹1,284 AOV on the smallest session volume — understanding why could inform creative on other channels." },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/kritikajain14" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kritika-jain-b89334234/" },
  { label: "Portfolio", href: "https://kritika-jain-portfolio-ten-omega-65.vercel.app/" },
  { label: "Email", href: "mailto:jainkritika2020@gmail.com" },
];

const TECH_STACK = [
  { key: "languages", val: "Python, SQL, DAX" },
  { key: "analysis", val: "Pandas, NumPy, Attribution Modeling" },
  { key: "visualization", val: "Power BI, Matplotlib, Seaborn" },
  { key: "tools", val: "Git, Jupyter, VS Code" },
  { key: "also_builds", val: "React, Node.js (MERN)" },
];


/* -----------------------------------------------------------
   Small building blocks
------------------------------------------------------------ */
function Pill({ children }) {
  return (
    <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-butter/80 border border-green-deep/15 text-green-deep font-bold">
      {children}
    </span>
  );
}

function SectionEyebrow({ children, boxed = false }) {
  return (
    <div
      className={`flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-3 font-bold ${boxed ? "text-green-mid" : "text-butter"
        }`}
    >
      <span className="w-6 h-px bg-gold inline-block" />
      {children}
    </div>
  );
}

function ImgPlaceholder({ label, icon = "📊" }) {
  /* Swap this block for a real screenshot:
     <img src="/images/your-file.png" alt="..." className="w-full h-full object-cover" /> */
  return (
    <div className="aspect-16/10 w-full rounded-xl border-2 border-dashed border-green-mid/50 bg-butter flex items-center justify-center text-center p-6 font-mono text-sm text-green-mid">
      <div>
        <span className="block text-2xl mb-2">{icon}</span>
        {label}
      </div>
    </div>
  );
}

function DashboardImage({ src, alt, icon = "📊", onExpand }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full aspect-4/3 sm:aspect-16/10 rounded-xl border-2 border-dashed border-green-mid/50 bg-butter flex items-center justify-center text-center p-6 font-mono text-sm text-green-mid">
        <div>
          <span className="block text-2xl mb-2">{icon}</span>
          {alt}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onExpand?.({ src, alt })}
      className="group relative w-full rounded-xl border border-green-deep/15 bg-[#081024] overflow-hidden shadow-sm flex items-center justify-center p-2 sm:p-3 cursor-zoom-in text-left"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-butter text-green-deep text-xs font-bold font-mono px-3 py-1.5 rounded-full shadow-lg">
          🔍 Click to enlarge
        </span>
      </span>
    </button>
  );
}

/* Boxed image frame — keeps every screenshot at a fixed, predictable
   aspect ratio so the grid stays aligned at every breakpoint. Drop a
   real <img> in as the child to replace the dashed placeholder. */
function ImageBox({ children }) {
  return (
    <div className="aspect-16/10 w-full rounded-xl border border-green-deep/15 bg-butter overflow-hidden shadow-sm">
      {children}
    </div>
  );
}

/* Full-stack signature: a terminal-styled "stack.json" panel. Small,
   quiet nod to the MERN background behind an analytics-only page. */
function TerminalStack() {
  return (
    <div className="terminal w-full max-w-md">
      <div className="terminal-bar">
        <span className="terminal-dot" style={{ background: "#ff5f57" }} />
        <span className="terminal-dot" style={{ background: "#febc2e" }} />
        <span className="terminal-dot" style={{ background: "#28c840" }} />
        <span className="ml-2 font-mono text-[11px] text-white/40">stack.json</span>
      </div>
      <pre>
        <span className="tok-punc">{"{"}</span>{"\n"}
        {TECH_STACK.map((row, i) => (
          <React.Fragment key={row.key}>
            {"  "}
            <span className="tok-key">"{row.key}"</span>
            <span className="tok-punc">: </span>
            <span className="tok-str">"{row.val}"</span>
            <span className="tok-punc">{i < TECH_STACK.length - 1 ? "," : ""}</span>
            {"\n"}
          </React.Fragment>
        ))}
        <span className="tok-punc">{"}"}</span>
        <span className="cursor">&nbsp;</span>
      </pre>
    </div>
  );
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-[#081024]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-butter/10 hover:bg-butter/20 text-butter flex items-center justify-center text-xl transition-colors z-10"
      >
        ✕
      </button>

      <div
        className="max-w-6xl w-full max-h-full flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        <p className="text-butter/70 text-xs sm:text-sm font-mono text-center">
          {image.alt} — tap outside or press Esc to close
        </p>
      </div>
    </div>
  );
}

export default function App() {
  useReveal();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* ambient backdrop — soft solid blurs, no gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="blob w-72 h-72 sm:w-96 sm:h-96 -top-24 -left-20 bg-butter/15" />
        <div className="blob w-64 h-64 sm:w-80 sm:h-80 top-1/3 -right-24 bg-gold/20" style={{ animationDelay: "-8s" }} />
        <div className="blob w-72 h-72 sm:w-md sm:h-112 -bottom-40 left-1/4 bg-butter/10" style={{ animationDelay: "-14s" }} />
      </div>

      {/* NAV — solid cream, high contrast against the navy page */}
      <nav className="sticky top-0 z-50 bg-butter border-b border-black/10 shadow-[0_8px_24px_-16px_rgba(1,38,34,0.6)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 shrink-0 rounded-full bg-gold flex items-center justify-center text-green-deep font-display font-black text-sm">
              MT
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-green-deep leading-tight text-sm sm:text-base truncate">
                Multi-Touch Attribution &amp; Channel LTV
              </p>
              <p className="hidden sm:block text-xs text-green-deep/60 font-mono">
                Funnel · Attribution · LTV · ROAS Analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#dashboard"
              className="px-3 sm:px-4 py-2 rounded-full bg-gold text-green-deep text-xs sm:text-sm font-bold hover:bg-gold-bright transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#recommendations"
              className="hidden sm:inline-block px-4 py-2 rounded-full border border-green-deep/40 text-green-deep text-sm font-bold hover:bg-green-deep hover:text-butter transition-colors"
            >
              Recommendations
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* HERO / EXECUTIVE SUMMARY */}
        <section id="summary" className="pt-12 sm:pt-14 pb-10">
          <div className="bg-[#F8F0E5] border border-[#F8F0E5] rounded-3xl p-6 sm:p-9 reveal shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <SectionEyebrow boxed>
                Executive Summary
              </SectionEyebrow>
              <Pill>5 channels · 6-month window</Pill>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F45] leading-[1.05] mb-4">
              The "best" channel depends on who's asking the question.
            </h1>

            <p className="text-[#24406B] leading-relaxed mb-2 max-w-2xl font-medium">
              This is a synthetic multi-touch attribution and channel-LTV
              study for a fictional D2C store. It was spending across five
              channels using last-touch attribution alone — a model that,
              this analysis shows, can undervalue a channel by half. This
              project builds the funnel, compares{" "}
              <span className="font-bold text-[#0B1F45]">
                three attribution models
              </span>{" "}
              side by side, and tracks LTV and ROAS to find which channels
              are actually worth the spend.
            </p>

            <p className="text-xs font-mono text-[#57708F] mb-7">
              All data in this project — sessions, orders, revenue, spend —
              is synthetic. No real company or customer data is used.
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-[#E4D8C4] mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2.5 text-sm font-bold rounded-t-lg transition-colors ${activeTab === tab
                    ? "text-[#0B1F45] border-b-2 border-[#C89F3D]"
                    : "text-[#57708F] hover:text-[#0B1F45]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Objective" && (
              <p className="text-[#24406B] leading-relaxed">
                Find out which acquisition channels are genuinely worth the
                spend once funnel efficiency, attribution model and lifetime
                value are all accounted for — not just whichever channel
                closed the sale last.
              </p>
            )}

            {activeTab === "My Analysis" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {ANALYSIS_DONE.map((a) => (
                  <div key={a.title} className="flex gap-3">
                    <span className="text-[#C89F3D] font-black shrink-0">—</span>

                    <div>
                      <p className="font-display font-bold text-[#0B1F45] text-sm mb-0.5">
                        {a.title}
                      </p>

                      <p className="text-sm text-[#24406B] leading-relaxed">
                        {a.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Methodology" && (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {METHOD_STEPS.map((s) => (
                  <div
                    key={s.num}
                    className="bg-[#FBF5EC] rounded-xl p-4 border border-[#E4D8C4]"
                  >
                    <span className="font-mono text-[#2C5FA8] font-bold text-lg block mb-1">
                      {s.num}
                    </span>

                    <p className="font-display font-bold text-[#0B1F45] text-sm mb-1">
                      {s.title}
                    </p>

                    <p className="text-xs text-[#24406B] leading-snug">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Key Result" && (
              <div className="ltv-tab">
                <p className="font-display italic text-4xl sm:text-5xl font-black text-[#0B1F45] mb-1">
                  2.5×
                </p>

                <p className="font-mono text-xs text-[#57708F] mb-5 font-bold">
                  higher 90-day LTV — influencer vs. Google Ads
                </p>

                <div className="mb-4">
                  <div className="flex justify-between font-mono text-xs text-[#0B1F45] mb-1.5 font-bold">
                    <span>Influencer</span>
                    <span>₹2,800</span>
                  </div>

                  <div className="h-3 rounded-full bg-[#E4D8C4] overflow-hidden">
                    <div className="bar-fill bar-fill--organic" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs text-[#0B1F45] mb-1.5 font-bold">
                    <span>Google Ads</span>
                    <span>₹1,100</span>
                  </div>

                  <div className="h-3 rounded-full bg-[#E4D8C4] overflow-hidden">
                    <div className="bar-fill bar-fill--low bar-fill--coupon" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>


        {/* QUICK LINKS — same boxed-cream treatment as Key Metrics below */}
        {/* QUICK LINKS */}
        <section className="pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-butter mb-3 font-bold reveal">
            Jump to
          </p>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 reveal">
            {QUICK_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="bg-[#F8F0E5] text-[#0B1F45] rounded-2xl px-4 py-3.5 text-sm font-bold text-center border border-[#E4D8C4] shadow-lg hover:bg-[#FBF5EC] transition-all duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>
        </section>

        {/* KEY METRICS — dedicated full-width section, same grid language as Deep-Dive/Insights */}
        {/* KEY METRICS */}
        <section className="pb-14">
          <SectionEyebrow>By The Numbers</SectionEyebrow>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-butter mb-8 reveal">
            The headline metrics
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {KEY_METRICS.map((m) => (
              <div
                key={m.label}
                className="bg-[#F8F0E5] rounded-2xl p-5 reveal flex flex-col justify-between min-h-33 border border-[#E4D8C4] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <p className="text-sm text-[#57708F] font-medium leading-snug">
                  {m.label}
                </p>

                <div>
                  <p className="font-mono font-black text-3xl text-[#0B1F45] leading-none mb-1">
                    {m.value}
                  </p>

                  <p className="text-xs text-[#24406B] font-mono">
                    {m.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BUSINESS QUESTION */}
        {/* BUSINESS QUESTION */}
        <section id="problem" className="py-10">
          <SectionEyebrow>The Business Question</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Which channel is "best" — and best by what measure?
          </h2>

          <p className="text-butter max-w-2xl mb-8 reveal leading-relaxed">
            Budget was being allocated by last-touch revenue — whichever
            channel happened to close the sale. That's a simple rule, but
            it can be badly wrong for channels that assist rather than close.
          </p>

          <div className="bg-[#F8F0E5] border border-[#E4D8C4] rounded-2xl p-6 sm:p-7 reveal shadow-lg">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {PROBLEM_POINTS.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-sm text-[#24406B] leading-relaxed"
                >
                  <span className="text-butter font-black shrink-0">—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ROLE & APPROACH */}
        {/* ROLE & APPROACH */}
        <section id="approach" className="py-10">
          <SectionEyebrow>My Role &amp; Approach</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            What I actually did
          </h2>

          <p className="text-butter max-w-2xl mb-8 reveal leading-relaxed">
            I built the synthetic session-and-order dataset representing this
            store's traffic and ran the full funnel, attribution and LTV
            analysis end-to-end, from raw data to a decision-ready dashboard.
          </p>

          <div className="bg-[#F8F0E5] border border-[#E4D8C4] rounded-2xl p-6 sm:p-7 reveal shadow-lg">
            <ol className="flex flex-col gap-4">
              {APPROACH_POINTS.map((p, i) => (
                <li
                  key={p}
                  className="flex gap-4 text-sm text-[#24406B] leading-relaxed"
                >
                  <span className="font-mono font-black text-[#2C5FA8] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {p}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* DEEP DIVE QUADRANT */}
        <section id="deep-dive" className="py-14">
          <SectionEyebrow>Detailed Analysis</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Deep-dive by theme
          </h2>
          <p className="text-butter/85 max-w-xl mb-9 reveal">
            Four lenses on the same 6-month dataset — funnel leakage,
            attribution sensitivity, lifetime value, and ROAS trajectory.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {DEEP_DIVE.map((card) => (
              <div
                key={card.title}
                className="relative bg-butter border border-green-deep/10 rounded-2xl p-6 pl-8 reveal"
              >
                <span className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-full ${card.tint}`} />
                <h3 className="font-display font-bold text-xl text-green-deep mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-green-mid leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* POWER BI DASHBOARD */}
        {/* POWER BI DASHBOARD */}
        <section id="dashboard" className="py-14">
          <SectionEyebrow>The Deliverable</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Power BI Dashboard
          </h2>

          <p className="text-butter max-w-xl mb-9 reveal leading-relaxed">
            A four-panel interactive dashboard built in Power BI to analyze
            the conversion funnel, channel LTV, attribution model comparison
            and ROAS trend, all in one view.
          </p>

          <div className="reveal mb-10 max-w-2xl">
            <p className="font-display font-bold text-butter mb-3">
              Complete Dashboard
            </p>

            <DashboardImage
              src="/images/dashboard/Market Channel Dashboard.png"
              alt="Complete Marketing Channel Performance Dashboard"
              onExpand={setLightboxImg}
            />



            <p className="text-sm text-[#57708F] mt-3">
              Overview of all four panels including blended ROAS, total
              revenue, total spend and best-LTV channel KPIs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {DASHBOARD_FIGURES.map((fig) => (
              <div
                key={fig.label}
                className="bg-[#F8F0E5] border border-[#E4D8C4] rounded-2xl p-5 reveal shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h4 className="font-display font-bold text-[#0B1F45] mb-1">
                  {fig.label}
                </h4>

                <p className="font-mono text-xs text-[#57708F] mb-4">
                  {fig.caption}
                </p>

                <DashboardImage src={fig.img} alt={fig.label} onExpand={setLightboxImg} />



                <p className="text-sm text-[#24406B] mt-4 leading-relaxed">
                  {fig.explain}

                </p>
              </div>
            ))}
          </div>
        </section>

        {/* A/B TEST */}
        {/* A/B TEST */}
        {/* <section id="ab-test" className="py-14">
          <SectionEyebrow>Experimentation</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            A/B Testing Proposal
          </h2>

          <div className="bg-[#F8F0E5] border border-[#E4D8C4] rounded-3xl p-7 reveal shadow-lg">

            <span className="inline-block px-4 py-2 rounded-full bg-[#C89F3D] text-white text-xs font-bold mb-6">
              {AB_TEST.status}
            </span>

            <p className="text-[#24406B] leading-relaxed mb-7">
              This analysis identifies where conversion is lost, but validating
              the recommendation requires experimentation. The following A/B test
              would measure the effect of simplifying checkout for Google Ads traffic.
            </p>

            <div className="bg-[#FBF5EC] border border-[#E4D8C4] rounded-2xl p-5 mb-6">

              <p className="uppercase tracking-widest text-xs font-bold text-[#C89F3D] mb-2">
                Hypothesis
              </p>

              <p className="text-[#24406B]">
                {AB_TEST.hypothesis}
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-[#FBF5EC] rounded-2xl p-5 border border-[#E4D8C4]">

                <p className="text-xs uppercase font-bold text-[#57708F] mb-2">
                  {AB_TEST.control.label}
                </p>

                <p className="text-[#0B1F45] mb-4">
                  {AB_TEST.control.desc}
                </p>

                <p className="text-sm text-[#57708F]">
                  {AB_TEST.control.metric}
                </p>

                <p className="text-3xl font-black text-[#0B1F45] mt-2">
                  {AB_TEST.control.value}
                </p>

              </div>

              <div className="bg-[#FBF5EC] rounded-2xl p-5 border border-[#E4D8C4]">

                <p className="text-xs uppercase font-bold text-[#57708F] mb-2">
                  {AB_TEST.variant.label}
                </p>

                <p className="text-[#0B1F45] mb-4">
                  {AB_TEST.variant.desc}
                </p>

                <p className="text-sm text-[#57708F]">
                  {AB_TEST.variant.metric}
                </p>

                <p className="text-3xl font-black text-[#0B1F45] mt-2">
                  {AB_TEST.variant.value}
                </p>

              </div>

            </div>

          </div>
        </section> */}

        {/* PROJECT LINKS */}
        {/* PROJECT LINKS */}

        <section id="projects" className="py-14">

          <SectionEyebrow>Project Resources</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Explore the Project
          </h2>

          <p className="text-butter max-w-xl mb-9 reveal">
            Access the complete source code, Power BI dashboard, dataset and
            documentation behind this case study.
          </p>

          <div className="grid md:grid-cols-2 gap-5">

            {PROJECT_LINKS.map((p) => (

              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F8F0E5] border border-[#E4D8C4] rounded-2xl p-6 flex gap-5 items-start reveal shadow-lg hover:bg-[#FBF5EC] hover:-translate-y-1 transition-all duration-300"
              >

                <div className="text-3xl">
                  {p.icon}
                </div>

                <div>

                  <h3 className="font-display font-bold text-[#0B1F45] mb-1">
                    {p.label}
                  </h3>

                  <p className="text-[#24406B] text-sm">
                    {p.desc}
                  </p>

                </div>

              </a>

            ))}

          </div>

        </section>

        {/* INSIGHTS */}
        <section id="insights" className="py-14">
          <SectionEyebrow>Key Insights &amp; Findings</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            What the data showed
          </h2>
          <p className="text-butter/85 max-w-xl mb-9 reveal">
            Five findings that tie funnel behavior, attribution model and
            lifetime value directly to channel decisions.
          </p>

          <div className="flex flex-col gap-4">
            {INSIGHTS.map((item) => (
              <div
                key={item.title}
                className="relative bg-butter border-l-4 border-green-deep rounded-r-2xl rounded-l-md pl-6 pr-6 py-5 reveal"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-gold mb-1.5 font-bold">
                  → {item.tag}
                </p>
                <h4 className="font-display font-bold text-lg text-green-deep mb-1.5">
                  {item.title}
                </h4>
                <p className="text-sm text-green-mid leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMMENDATIONS */}

        <section id="recommendations" className="py-14">

          <SectionEyebrow>Recommendations</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Business Recommendations
          </h2>

          <p className="text-butter max-w-xl mb-9 reveal">
            Based on the funnel, attribution and LTV analysis, these actions
            would generate the largest improvement in marketing ROI.
          </p>

          <div className="grid md:grid-cols-2 gap-5">

            {RECOMMENDATIONS.map((r) => (

              <div
                key={r.title}
                className="bg-[#F8F0E5] border border-[#E4D8C4] rounded-2xl p-6 reveal shadow-lg hover:shadow-xl transition-all duration-300"
              >

                <span className="inline-block px-3 py-1 rounded-full bg-[#0B1F45] text-[#F8F0E5] text-xs font-bold mb-5">

                  {r.tag}

                </span>

                <h3 className="font-display text-xl font-bold text-[#0B1F45] mb-3">

                  {r.title}

                </h3>

                <p className="text-[#24406B] leading-relaxed">

                  {r.body}

                </p>

              </div>
            ))}
          </div>
        </section>

        {/* IMPACT + QUOTE */}
        <section id="impact" className="py-14">
          <SectionEyebrow>Impact</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-8 reveal">
            Why this mattered
          </h2>

          <div className="grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 bg-butter border border-green-deep/10 rounded-2xl p-6 sm:p-7 reveal">
              <ul className="flex flex-col gap-3">
                {IMPACT_POINTS.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-green-mid leading-relaxed">
                    <span className="text-gold font-black shrink-0">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 bg-butter text-green-deep rounded-2xl p-6 sm:p-7 reveal flex items-center">
              <p className="font-display italic text-lg sm:text-xl leading-snug">
                "This project changed how I read a channel report — you stop
                asking who closed the sale, and start asking who actually
                helped get the customer there."
              </p>
            </div>
          </div>
        </section>




        {/* ABOUT THE ANALYST */}
        <section id="about" className="py-14">
          <div className="bg-butter border border-green-deep/10 rounded-3xl p-6 sm:p-8 md:p-10 reveal">
            <SectionEyebrow boxed>About the Analyst</SectionEyebrow>
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <div className="flex flex-col sm:flex-row gap-6 sm:items-center mb-6">
                  {/* Swap for a real photo: <img src="/images/profile.jpg" className="w-20 h-20 rounded-full object-cover" /> */}

                  <div>
                    <h3 className="font-display text-2xl font-black text-green-deep">
                      Kritika Jain
                    </h3>
                    <p className="text-green-mid text-sm font-mono font-bold">Data Analyst</p>
                  </div>
                </div>
                <p className="text-green-mid leading-relaxed mb-7">
                  I came to data analytics from a full-stack (MERN) and
                  electronics engineering background — which is why this
                  project isn't just a Power BI dashboard, it's also a
                  hand-built React case-study page around it. I like problems
                  where a messy pile of numbers turns into one decision
                  someone can actually act on.
                </p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.label !== "Email" ? "_blank" : undefined}
                      rel={l.label !== "Email" ? "noopener noreferrer" : undefined}
                      className="px-4 py-2 rounded-full border border-green-deep text-green-deep text-sm font-bold hover:bg-green-deep hover:text-butter transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <TerminalStack />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-butter py-8 mt-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-green-deep/70">
            Synthetic dataset, 5 channels · Power BI · Multi-Touch
            Attribution &amp; Channel LTV Analysis
          </p>
        </div>
      </footer>
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </div >
  );
}
