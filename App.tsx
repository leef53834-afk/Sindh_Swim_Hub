import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Medal,
  Menu,
  Phone,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Timer,
  Trophy,
  Users,
  Waves,
  X,
} from "lucide-react";
import heroImage from "./assets/swimmer-hero.jpg";
import { AjrakDivider, AjrakPattern, Logo } from "./components/Brand";
import { athletes, events, navItems, records, results, type EventItem } from "./data";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
};

function SectionHeading({ eyebrow, title, accent, description }: SectionHeadingProps) {
  return (
    <div className="mb-9 md:mb-12">
      <div className="mb-3 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.28em] text-sky-soft">
        <span className="h-[2px] w-8 bg-sindh-red" />
        {eyebrow}
      </div>
      <h2 className="display-font text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
        {title} <span className="text-sindh-gold">{accent}</span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sky-soft/75 sm:text-base">{description}</p>
    </div>
  );
}

function totalMedals(row: { gold: number; silver: number; bronze: number }) {
  return row.gold + row.silver + row.bronze;
}

type RecordFilter = "All" | "Provincial" | "Championship";
const recordFilters: RecordFilter[] = ["All", "Provincial", "Championship"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [resultYear, setResultYear] = useState("All");
  const [resultChampionship, setResultChampionship] = useState("All");

  const [athleteQuery, setAthleteQuery] = useState("");
  const [ageGroup, setAgeGroup] = useState("All");
  const [athleteClub, setAthleteClub] = useState("All");

  const [recordScope, setRecordScope] = useState<RecordFilter>("All");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEvent(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedEvent]);

  const championshipOptions = useMemo(
    () => Array.from(new Set(results.map((row) => row.championship))).sort(),
    [],
  );
  const ageOptions = useMemo(() => Array.from(new Set(athletes.map((item) => item.ageGroup))).sort(), []);
  const clubOptions = useMemo(() => Array.from(new Set(athletes.map((item) => item.club))).sort(), []);

  const filteredResults = useMemo(() => {
    return results
      .filter((row) => resultYear === "All" || String(row.year) === resultYear)
      .filter((row) => resultChampionship === "All" || row.championship === resultChampionship)
      .sort((a, b) => totalMedals(b) - totalMedals(a) || b.gold - a.gold);
  }, [resultYear, resultChampionship]);

  const filteredAthletes = useMemo(() => {
    const query = athleteQuery.trim().toLowerCase();
    return athletes.filter((athlete) => {
      const matchesQuery =
        !query ||
        athlete.name.toLowerCase().includes(query) ||
        athlete.club.toLowerCase().includes(query) ||
        athlete.specialty.toLowerCase().includes(query);
      const matchesAge = ageGroup === "All" || athlete.ageGroup === ageGroup;
      const matchesClub = athleteClub === "All" || athlete.club === athleteClub;
      return matchesQuery && matchesAge && matchesClub;
    });
  }, [athleteQuery, ageGroup, athleteClub]);

  const filteredRecords = useMemo(
    () => records.filter((record) => recordScope === "All" || record.scope === recordScope),
    [recordScope],
  );

  const topResult = filteredResults[0];
  const maxTotal = Math.max(1, ...filteredResults.map(totalMedals));
  const resetResults = () => {
    setResultYear("All");
    setResultChampionship("All");
  };
  const resetAthletes = () => {
    setAthleteQuery("");
    setAgeGroup("All");
    setAthleteClub("All");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-navy text-white">
      {/* Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-sindh-red/45 bg-navy-deep/95 shadow-[0_12px_35px_rgba(0,0,0,0.32)]"
            : "border-white/10 bg-navy-deep/80"
        } backdrop-blur-xl`}
      >
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-sindh-red via-sindh-gold to-sindh-red opacity-80" />
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#home" className="flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
            <Logo className="h-12 w-12 shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]" />
            <span className="hidden sm:block">
              <span className="display-font block text-[21px] font-extrabold uppercase leading-none tracking-wide text-white">
                Sindh Swim Hub
              </span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.28em] text-sky-soft/70">
                Aquatics Network
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                  activeSection === item.href ? "text-sindh-gold" : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-[3px] h-[2px] rounded-full bg-sindh-red transition-transform ${
                    activeSection === item.href ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-lg border border-sindh-gold/50 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-sindh-gold transition-colors hover:bg-sindh-gold/10 xl:inline-flex"
          >
            Get in Touch <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-navy-deep/98 px-5 py-4 lg:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg border-l-2 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.14em] ${
                    activeSection === item.href
                      ? "border-sindh-red bg-white/5 text-sindh-gold"
                      : "border-transparent text-white/80 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-navy-deep pt-[118px] sm:pt-[132px] lg:pt-[150px]">
        <AjrakPattern className="ajrak-fade pointer-events-none absolute inset-0 h-full w-full" opacity={0.22} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 78% 38%, rgba(196,30,58,0.19), transparent 42%)" }}
        />
        <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-navy-soft/30 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16 lg:pb-28">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sindh-red/45 bg-sindh-red/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/85">
              <span className="h-2 w-2 rounded-full bg-sindh-red shadow-[0_0_10px_rgba(196,30,58,0.9)]" />
              Official Sindh Aquatics Coverage · Season 2026
            </div>

            <h1 className="display-font mt-7 text-[clamp(4.4rem,11vw,8.5rem)] font-extrabold uppercase leading-[0.8] tracking-tight">
              <span className="block">Sindh</span>
              <span className="mt-2 block">
                <span className="text-sindh-gold">Swim</span> Hub
              </span>
            </h1>

            <p className="mt-7 text-xl font-bold text-white sm:text-2xl">Promoting Swimming Across Sindh</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-soft/80 sm:text-sm">
              <span>Coverage</span>
              <span className="text-sindh-red">•</span>
              <span>Results</span>
              <span className="text-sindh-red">•</span>
              <span>Talent Development</span>
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#events" className="btn-primary">
                Upcoming Events <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#results" className="btn-outline">
                View Results <Medal className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-11 grid max-w-xl grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
              {[
                { value: "24+", label: "Meets Covered" },
                { value: "14", label: "Districts" },
                { value: "480+", label: "Athletes" },
              ].map((stat) => (
                <div key={stat.label} className="px-2 first:pl-0 sm:px-5">
                  <div className="display-font text-3xl font-extrabold text-sindh-gold sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-soft/65 sm:text-[11px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute -inset-3 rounded-[38px] border border-sindh-red/25" />
            <div className="relative h-[360px] overflow-hidden rounded-[30px] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:h-[440px] lg:h-[500px]">
              <img
                src={heroImage}
                alt="Competitive swimmer racing through dark blue water"
                className="h-full w-full object-cover object-[65%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy-deep/65 p-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sindh-red/20 text-sindh-gold">
                  <Waves className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sindh-gold">Every stroke matters</div>
                  <div className="text-xs font-semibold text-white/80">Covering the next generation of Sindh swimmers</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-5 rounded-full border-4 border-navy-deep bg-navy-deep shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:-left-9">
              <Logo className="h-24 w-24 sm:h-28 sm:w-28" />
            </div>

            <div className="absolute -right-3 top-9 hidden rounded-2xl border border-sindh-gold/35 bg-navy-deep/85 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
              <div className="flex items-center gap-2 text-sindh-gold">
                <Trophy className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]">Season 2026</span>
              </div>
              <div className="mt-1 text-xs font-bold text-white/80">4 championship meets</div>
            </div>
          </div>
        </div>
      </section>

      <AjrakDivider />

      {/* Upcoming Events */}
      <section id="events" className="relative overflow-hidden bg-navy py-20 sm:py-24">
        <AjrakPattern className="ajrak-fade pointer-events-none absolute inset-0 h-full w-full" opacity={0.12} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Sindh Aquatics Calendar"
              title="Upcoming"
              accent="Events"
              description="The next meets on the provincial circuit — clear dates, venues and everything swimmers need to prepare."
            />
            <div className="mb-9 hidden shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-soft/60 lg:mb-12 lg:flex">
              <CalendarDays className="h-4 w-4 text-sindh-red" /> 2026 Championship Circuit
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {events.map((event) => (
              <article
                key={event.id}
                className="glass-panel card-hover relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl border-t-2 border-t-sindh-red p-5"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rotate-45 border border-sindh-red/20" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex h-[68px] w-[60px] flex-col items-center justify-center rounded-xl border border-sindh-red/50 bg-sindh-red/15">
                    <span className="text-[10px] font-extrabold tracking-[0.2em] text-sindh-gold">{event.month}</span>
                    <span className="display-font text-3xl font-extrabold leading-none text-white">{event.day}</span>
                    <span className="text-[9px] font-bold tracking-[0.15em] text-sky-soft/70">2026</span>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-sky-soft/85">
                    {event.status}
                  </span>
                </div>

                <h3 className="mt-6 text-base font-extrabold leading-snug text-white">{event.title}</h3>

                <div className="mt-4 space-y-2.5 text-xs text-sky-soft/75">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sindh-red" />
                    <span>{event.venue}, {event.city}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="h-3.5 w-3.5 shrink-0 text-sindh-red" />
                    <span>{event.category}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-sky-soft/50">Sindh Circuit</span>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-sindh-gold transition-colors hover:text-white"
                  >
                    View Details <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AjrakDivider />

      {/* Meets & Results */}
      <section id="results" className="relative overflow-hidden bg-navy-deep py-20 sm:py-24">
        <AjrakPattern className="ajrak-fade pointer-events-none absolute inset-0 h-full w-full" opacity={0.11} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Championship Archive"
            title="Meets &"
            accent="Results"
            description="Browse recent championship medal tallies by season and competition. Rankings are sorted by total medals."
          />

          <div className="glass-panel mb-6 flex flex-col gap-4 rounded-2xl p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-sky-soft/75">
              <SlidersHorizontal className="h-4 w-4 text-sindh-red" /> Filter standings
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["All", "2026", "2025", "2024"].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setResultYear(year)}
                  className={`rounded-lg border px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                    resultYear === year
                      ? "border-sindh-red bg-sindh-red text-white"
                      : "border-white/12 bg-white/[0.03] text-sky-soft/75 hover:border-sindh-gold/50 hover:text-white"
                  }`}
                >
                  {year === "All" ? "All Years" : year}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px] flex-1 lg:max-w-[310px]">
              <select
                value={resultChampionship}
                onChange={(event) => setResultChampionship(event.target.value)}
                className="field-control py-2.5 pl-3.5 pr-10 text-xs font-semibold"
                aria-label="Filter by championship name"
              >
                <option value="All">All Championships</option>
                {championshipOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sindh-gold" />
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.5fr]">
            <div className="glass-panel relative overflow-hidden rounded-2xl border-t-2 border-t-sindh-gold p-6">
              <AjrakPattern className="pointer-events-none absolute -right-10 -top-10 h-44 w-44" opacity={0.18} />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-sindh-gold/35 bg-sindh-gold/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-sindh-gold">
                  <Trophy className="h-3.5 w-3.5" /> Leading Club
                </div>

                {topResult ? (
                  <>
                    <div className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-soft/60">
                      {topResult.year} · {topResult.championship}
                    </div>
                    <h3 className="display-font mt-1 text-4xl font-extrabold uppercase leading-none text-white">
                      {topResult.club}
                    </h3>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        { label: "Gold", value: topResult.gold, color: "bg-sindh-gold" },
                        { label: "Silver", value: topResult.silver, color: "bg-slate-300" },
                        { label: "Bronze", value: topResult.bronze, color: "bg-[#B87343]" },
                      ].map((medal) => (
                        <div key={medal.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                          <span className={`mx-auto mb-2 block h-3 w-3 rounded-full ${medal.color}`} />
                          <div className="display-font text-3xl font-extrabold leading-none text-white">{medal.value}</div>
                          <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-sky-soft/60">
                            {medal.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 space-y-3.5">
                      {filteredResults.slice(0, 4).map((row, index) => (
                        <div key={row.id}>
                          <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
                            <span className={index === 0 ? "text-sindh-gold" : "text-white/75"}>{row.club}</span>
                            <span className="text-sky-soft/60">{totalMedals(row)} medals</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full ${index === 0 ? "bg-sindh-gold" : "bg-sindh-red/80"}`}
                              style={{ width: `${(totalMedals(row) / maxTotal) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-6 text-sm text-sky-soft/70">No standings match this combination.</p>
                )}

                <button
                  type="button"
                  onClick={resetResults}
                  className="mt-7 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-sky-soft/60 transition-colors hover:text-sindh-gold"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset filters
                </button>
              </div>
            </div>

            <div className="glass-panel overflow-hidden rounded-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-4">
                <h3 className="display-font text-2xl font-extrabold uppercase tracking-wide text-white">Medal Table</h3>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-sky-soft/60">
                  {filteredResults.length} club {filteredResults.length === 1 ? "tally" : "tallies"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-[10px] font-extrabold uppercase tracking-[0.14em] text-sky-soft/60">
                      <th className="px-5 py-3">#</th>
                      <th className="px-3 py-3">Club / Championship</th>
                      <th className="px-3 py-3 text-center">Gold</th>
                      <th className="px-3 py-3 text-center">Silver</th>
                      <th className="px-3 py-3 text-center">Bronze</th>
                      <th className="px-5 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`border-b border-white/[0.06] text-sm transition-colors hover:bg-white/[0.04] ${
                          index === 0 ? "bg-sindh-gold/[0.06]" : ""
                        }`}
                      >
                        <td className="px-5 py-3.5 text-xs font-bold text-sky-soft/50">{String(index + 1).padStart(2, "0")}</td>
                        <td className="px-3 py-3.5">
                          <div className="font-bold text-white">{row.club}</div>
                          <div className="mt-0.5 text-[10px] font-medium text-sky-soft/55">
                            {row.year} · {row.championship}
                          </div>
                        </td>
                        <td className="px-3 py-3.5 text-center font-bold text-sindh-gold">{row.gold}</td>
                        <td className="px-3 py-3.5 text-center font-bold text-slate-200">{row.silver}</td>
                        <td className="px-3 py-3.5 text-center font-bold text-[#D9966B]">{row.bronze}</td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="inline-flex min-w-9 justify-center rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-extrabold text-white">
                            {totalMedals(row)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AjrakDivider />

      {/* Athlete Search */}
      <section id="athletes" className="relative overflow-hidden bg-navy py-20 sm:py-24">
        <AjrakPattern className="ajrak-fade pointer-events-none absolute inset-0 h-full w-full" opacity={0.11} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Talent Directory"
            title="Athlete / Player"
            accent="Search"
            description="Find swimmers by name, age group, school or club, and see their medal summaries at a glance."
          />

          <div className="glass-panel mb-6 rounded-2xl p-4 sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[1.5fr_0.7fr_1.05fr_auto]">
              <label className="relative">
                <span className="sr-only">Search by athlete name</span>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sindh-gold" />
                <input
                  type="search"
                  value={athleteQuery}
                  onChange={(event) => setAthleteQuery(event.target.value)}
                  placeholder="Search athlete name, club or event..."
                  className="field-control py-3 pl-10 pr-4 text-sm"
                />
              </label>

              <label className="relative">
                <span className="sr-only">Filter by age group</span>
                <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sindh-red" />
                <select
                  value={ageGroup}
                  onChange={(event) => setAgeGroup(event.target.value)}
                  className="field-control py-3 pl-10 pr-9 text-xs font-semibold"
                  aria-label="Filter by age group"
                >
                  <option value="All">All Age Groups</option>
                  {ageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-soft/60" />
              </label>

              <label className="relative">
                <span className="sr-only">Filter by school or club</span>
                <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sindh-red" />
                <select
                  value={athleteClub}
                  onChange={(event) => setAthleteClub(event.target.value)}
                  className="field-control py-3 pl-10 pr-9 text-xs font-semibold"
                  aria-label="Filter by school or club"
                >
                  <option value="All">All Schools / Clubs</option>
                  {clubOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-soft/60" />
              </label>

              <button
                type="button"
                onClick={resetAthletes}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-sky-soft/70 transition-colors hover:border-sindh-gold/50 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-soft/55">
              <span>{filteredAthletes.length} athlete profiles found</span>
              <span>Season 2026 registry</span>
            </div>
          </div>

          {filteredAthletes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredAthletes.map((athlete) => {
                const initials = athlete.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("");
                const medalData = [
                  { label: "Gold", value: athlete.medals.gold, color: "bg-sindh-gold" },
                  { label: "Silver", value: athlete.medals.silver, color: "bg-slate-300" },
                  { label: "Bronze", value: athlete.medals.bronze, color: "bg-[#B87343]" },
                ];

                return (
                  <article key={athlete.id} className="glass-panel card-hover rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sindh-gold/40 bg-gradient-to-br from-sindh-red/25 to-navy-soft/60">
                        <span className="display-font text-2xl font-extrabold text-white">{initials}</span>
                      </div>
                      <span className="rounded-full border border-sindh-red/40 bg-sindh-red/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-sindh-gold">
                        {athlete.ageGroup}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-extrabold text-white">{athlete.name}</h3>
                    <div className="mt-1.5 flex items-center gap-2 text-xs font-medium text-sky-soft/70">
                      <Building2 className="h-3.5 w-3.5 shrink-0 text-sindh-red" />
                      {athlete.club}
                    </div>
                    <div className="mt-3 inline-flex rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[10px] font-semibold text-sky-soft/70">
                      {athlete.specialty}
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      {medalData.map((medal) => (
                        <div key={medal.label} className="text-center">
                          <span className={`mx-auto mb-1.5 block h-2.5 w-2.5 rounded-full ${medal.color}`} />
                          <div className="text-sm font-extrabold text-white">{medal.value}</div>
                          <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-sky-soft/50">
                            {medal.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="glass-panel flex flex-col items-center rounded-2xl px-6 py-14 text-center">
              <Waves className="h-9 w-9 text-sindh-red" />
              <h3 className="mt-4 text-lg font-extrabold text-white">No athletes found</h3>
              <p className="mt-2 max-w-sm text-sm text-sky-soft/65">Try a different name, age group or club filter.</p>
              <button type="button" onClick={resetAthletes} className="btn-outline mt-6">
                Clear Filters <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <AjrakDivider />

      {/* Records */}
      <section id="records" className="relative overflow-hidden bg-navy-deep py-20 sm:py-24">
        <AjrakPattern className="ajrak-fade pointer-events-none absolute inset-0 h-full w-full" opacity={0.11} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Sindh Best Times"
            title="Provincial & Championship"
            accent="Records"
            description="Ratified best times across provincial and championship meets. Clean, current and easy to scan."
          />

          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex rounded-xl border border-white/12 bg-white/[0.03] p-1">
              {recordFilters.map((scope) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => setRecordScope(scope)}
                  className={`rounded-lg px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                    recordScope === scope
                      ? "bg-sindh-red text-white shadow-[0_8px_20px_rgba(196,30,58,0.25)]"
                      : "text-sky-soft/70 hover:text-white"
                  }`}
                >
                  {scope === "All" ? "All Records" : scope}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-soft/55">
              <Timer className="h-4 w-4 text-sindh-gold" /> {filteredRecords.length} ratified marks
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-2xl border-t-2 border-t-sindh-red">
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-[10px] font-extrabold uppercase tracking-[0.14em] text-sky-soft/60">
                    <th className="px-6 py-4">Event / Category</th>
                    <th className="px-4 py-4">Record Holder</th>
                    <th className="px-4 py-4">Type</th>
                    <th className="px-4 py-4 text-right">Time</th>
                    <th className="px-6 py-4 text-right">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr
                      key={record.id}
                      className={`border-b border-white/[0.06] transition-colors last:border-0 hover:bg-white/[0.04] ${
                        index % 2 === 1 ? "bg-white/[0.015]" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-extrabold text-white">{record.event}</div>
                        <div className="mt-0.5 text-[11px] font-medium text-sky-soft/55">{record.category}</div>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-white/85">{record.holder}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-full border border-sindh-gold/30 bg-sindh-gold/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-sindh-gold">
                          {record.scope}
                        </span>
                      </td>
                      <td className="display-font px-4 py-4 text-right text-2xl font-extrabold text-sindh-gold">
                        {record.time}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-sky-soft/70">{record.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-white/10 md:hidden">
              {filteredRecords.map((record) => (
                <div key={record.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-extrabold text-white">{record.event}</div>
                      <div className="mt-0.5 text-[11px] text-sky-soft/60">{record.category}</div>
                    </div>
                    <div className="display-font text-2xl font-extrabold text-sindh-gold">{record.time}</div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-white/85">{record.holder}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-sky-soft/50">
                      {record.scope} · {record.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-sky-soft/50">
            Times shown are hub-reported championship bests for reference and talent development tracking.
          </p>
        </div>
      </section>

      <AjrakDivider />

      {/* Footer / Contact */}
      <footer id="contact" className="relative overflow-hidden bg-navy-deep pb-8 pt-20">
        <AjrakPattern className="ajrak-fade pointer-events-none absolute inset-0 h-full w-full" opacity={0.15} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 15% 0%, rgba(196,30,58,0.12), transparent 45%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_0.85fr]">
            <div>
              <div className="flex items-center gap-4">
                <Logo className="h-20 w-20 shrink-0" />
                <div>
                  <div className="display-font text-3xl font-extrabold uppercase leading-none text-white">Sindh Swim Hub</div>
                  <div className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-sindh-gold">
                    Dive In · Rise Up
                  </div>
                </div>
              </div>
              <p className="mt-6 max-w-lg text-sm leading-7 text-sky-soft/70">
                Sindh Swim Hub is dedicated to growing swimming awareness and developing the sport rapidly across the Sindh region.
              </p>

              <div className="mt-6 flex items-center gap-3">
                {[
                  {
                    label: "Instagram",
                    href: "https://instagram.com/sindhswimhub",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    ),
                  },
                  {
                    label: "Facebook",
                    href: "https://facebook.com/sindhswimhub",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.28-.04-1.25-.12-2.35-.12-2.32 0-3.9 1.42-3.9 4.02V9.9H7.8V13h2.6v8h3.1z" />
                      </svg>
                    ),
                  },
                  {
                    label: "YouTube",
                    href: "https://youtube.com/@sindhswimhub",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M21.6 7.2c-.23-.86-.9-1.53-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.84.44c-.86.23-1.53.9-1.76 1.76C2 8.8 2 12 2 12s0 3.2.4 4.8c.23.86.9 1.53 1.76 1.76C5.75 19 12 19 12 19s6.25 0 7.84-.44c.86-.23 1.53-.9 1.76-1.76.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-sky-soft/75 transition-colors hover:border-sindh-red hover:bg-sindh-red hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-sindh-gold">Contact</h3>
              <div className="mt-6 space-y-4 text-sm text-sky-soft/75">
                <a href="mailto:info@sindhswimhub.pk" className="flex items-start gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sindh-red" /> info@sindhswimhub.pk
                </a>
                <a href="tel:+92210000000" className="flex items-start gap-3 transition-colors hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sindh-red" /> +92 21 0000 0000
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sindh-red" /> Karachi, Sindh, Pakistan
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-sindh-gold">Explore</h3>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-xs font-bold uppercase tracking-[0.1em] text-sky-soft/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <a href="#events" className="btn-outline mt-7 w-full py-3 text-[10px]">
                See 2026 Calendar <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-soft/45 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Sindh Swim Hub. All rights reserved.</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rotate-45 bg-sindh-red" /> Promoting Swimming Across Sindh
            </span>
          </div>
        </div>
      </footer>

      {/* Event details dialog */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedEvent(null);
          }}
        >
          <div className="absolute inset-0 bg-navy-deep/88 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-dialog-title"
            className="glass-panel relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-sindh-gold/25 shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
          >
            <div className="relative overflow-hidden border-b border-white/10 bg-sindh-red/15 px-6 py-6">
              <AjrakPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.17} strong />
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close event details"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-navy-deep/70 text-white transition-colors hover:bg-sindh-red"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sindh-gold">Event Details</div>
                <h3 id="event-dialog-title" className="display-font mt-2 max-w-[85%] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  {selectedEvent.title}
                </h3>
                <div className="mt-3 inline-flex rounded-full border border-sindh-red/50 bg-sindh-red/20 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
                  {selectedEvent.status}
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <CalendarDays className="h-4 w-4" />, label: "Date", value: `${selectedEvent.day} ${selectedEvent.month} 2026` },
                  { icon: <Clock3 className="h-4 w-4" />, label: "Start Time", value: selectedEvent.time },
                  { icon: <MapPin className="h-4 w-4" />, label: "Venue", value: selectedEvent.venue },
                  { icon: <Users className="h-4 w-4" />, label: "Category", value: selectedEvent.category },
                ].map((detail) => (
                  <div key={detail.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-sindh-gold">
                      {detail.icon} {detail.label}
                    </div>
                    <div className="mt-1.5 text-xs font-semibold text-white/85">{detail.value}</div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-sky-soft/75">{selectedEvent.description}</p>

              <h4 className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.18em] text-sindh-gold">Meet Highlights</h4>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {selectedEvent.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-xs font-medium text-white/80">
                    <Check className="h-3.5 w-3.5 shrink-0 text-sindh-red" /> {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                <a href="#contact" onClick={() => setSelectedEvent(null)} className="btn-primary">
                  Contact Organizer <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-xl border border-white/15 px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-sky-soft/70 transition-colors hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
