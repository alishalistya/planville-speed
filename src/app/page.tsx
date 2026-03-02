"use client";

import { useState } from "react";
import {
  Shield,
  Thermometer,
  Paintbrush,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
  Lock,
  Sun,
  Award,
  DoorOpen,
  Sparkles,
  BadgeCheck,
  CircleDollarSign,
  ClipboardCheck,
  Package,
  HardHat,
  HeartHandshake,
  Palette,
  Home,
  Euro,
  Menu,
  X,
  Send,
  Fingerprint,
  FileText,
  Eye,
  ShieldCheck,
  Handshake,
  XCircle,
  Wrench,
  Zap,
} from "lucide-react";

/* ─── TYPES ─── */
interface FAQItem {
  question: string;
  answer: string;
}

/* ─── DATA ─── */
const trustBenefits = [
  {
    icon: ShieldCheck,
    value: "RC2+",
    title: "Sorgenfrei",
    text: "Alle Türen mit mindestens RC2-Sicherheitsstandard – für maximalen Einbruchschutz.",
  },
  {
    icon: Package,
    value: "All-Inclusive",
    title: "Alles-inklusive Beratung",
    text: "Beratung, Aufmaß, Fertigung und Montage – ein Ansprechpartner für alles.",
  },
  {
    icon: Lock,
    value: "10 Jahre",
    title: "Sichern und umfassend",
    text: "Langfristige Garantie und umfassender Service auch nach der Montage.",
  },
];

const whyPlanville = [
  {
    icon: Shield,
    title: "Absicherung",
    text: "Alle Arbeiten sind versichert. Bei Schäden übernehmen wir die volle Verantwortung.",
  },
  {
    icon: FileText,
    title: "E-Dokumentation",
    text: "Digitale Dokumentation aller Maße, Konfigurationen und Vereinbarungen.",
  },
  {
    icon: Eye,
    title: "Voll Transparent",
    text: "Keine versteckten Kosten. Du erhältst einen detaillierten Kostenvoranschlag vorab.",
  },
  {
    icon: Handshake,
    title: "Professionelle Beratung",
    text: "Unsere Fachberater nehmen sich Zeit für deine Wünsche und beraten individuell.",
  },
  {
    icon: Euro,
    title: "Festpreis Planville",
    text: "Festpreisgarantie – der vereinbarte Preis gilt. Keine Nachforderungen.",
  },
  {
    icon: HeartHandshake,
    title: "Langfristiger Service",
    text: "Auch nach der Montage sind wir für dich da – Wartung, Nachjustierung und Support.",
  },
];

const comparisonWith = [
  "Persönlicher Ansprechpartner von Anfang an",
  "Kostenlose Vor-Ort-Beratung und Aufmaß",
  "Festpreis ohne versteckte Kosten",
  "Fachgerechte Montage durch eigene Teams",
  "10 Jahre Garantie auf Montage",
  "Förderberatung inklusive",
];

const comparisonWithout = [
  "Verschiedene Ansprechpartner und Zuständige",
  "Aufmaß oft kostenpflichtig und ungenau",
  "Nachträgliche Preiserhöhungen möglich",
  "Montage durch wechselnde Subunternehmer",
  "Eingeschränkte oder keine Garantie",
  "Kein Förderservice – alles selbst organisieren",
];

const customerProjects = [
  {
    title: "Villa Bergstraße",
    location: "Erkelenz",
    type: "Aluminium Haustür",
    description: "Moderne Aluminium-Haustür mit Seitenteil und Fingerprint",
  },
  {
    title: "Einfamilienhaus Stadtkern",
    location: "Mönchengladbach",
    type: "Holz-Alu Haustür",
    description: "Klassische Holz-Alu-Haustür mit Oberlicht in Eiche",
  },
  {
    title: "Neubau Am Stadtpark",
    location: "Düsseldorf",
    type: "Kunststoff Haustür",
    description: "Energieeffiziente Kunststoff-Haustür mit RC3-Sicherheit",
  },
  {
    title: "Reihenhaus Sonnenviertel",
    location: "Aachen",
    type: "Aluminium Haustür",
    description: "Flächenbündige Alu-Haustür mit Smart-Home-Anbindung",
  },
];

const processSteps = [
  {
    title: "Kostenlose Planung deiner Haustür",
    text: "Wir beraten dich individuell zu Material, Design und Sicherheitsausstattung – kostenlos und unverbindlich.",
  },
  {
    title: "Vorbereitung des Bauvorhabens in max. 2 Wochen",
    text: "Nach dem Aufmaß erstellen wir dein Angebot und bereiten alle Details für die Fertigung vor.",
  },
  {
    title: "Wir kümmern uns um den Papierkram",
    text: "Fördermittelanträge, Genehmigungen und Dokumentation – wir erledigen alles für dich.",
  },
  {
    title: "Wir installieren deine Haustür innerhalb eines Tages",
    text: "Unsere erfahrenen Monteure bauen deine neue Haustür fachgerecht ein – sauber und termingerecht.",
  },
];

const components = [
  { icon: Shield, label: "Aluminium", sub: "Premium & langlebig" },
  { icon: Euro, label: "Kunststoff", sub: "Preis-Leistung" },
  { icon: Sun, label: "Holz-Alu", sub: "Natürlich & modern" },
  { icon: Fingerprint, label: "Smart Home", sub: "Zugang digital" },
];

const faqs: FAQItem[] = [
  {
    question: "Wie groß sollte ich Seitenteile für meine Haustür einplanen?",
    answer:
      "Seitenteile sorgen für mehr Tageslicht im Eingangsbereich. Die Breite hängt von der Wandöffnung ab – üblich sind 30 bis 50 cm. Wir beraten dich bei der Planung und nehmen genaue Maße vor Ort.",
  },
  {
    question: "Brauche ich einen Speziellen für meine neue Haustür?",
    answer:
      "In der Regel brauchst du keine Baugenehmigung für den Austausch einer Haustür. Bei denkmalgeschützten Gebäuden kann es Auflagen geben. Wir klären das gerne für dich.",
  },
  {
    question: "Welche Haustür bietet die beste Wärmedämmung?",
    answer:
      "Aluminium-Haustüren mit thermisch getrennten Profilen erreichen UD-Werte ab 0,80 W/(m²·K). Holz-Alu-Varianten bieten ähnliche Werte mit natürlicher Optik. Kunststoff-Haustüren starten bei ca. 1,0 W/(m²·K).",
  },
  {
    question: "Welches Material eignet sich für meine Haustür?",
    answer:
      "Aluminium ist die beliebteste Wahl: modern, langlebig und pflegeleicht. Kunststoff bietet das beste Preis-Leistungs-Verhältnis. Holz-Alu verbindet natürliche Wärme innen mit Wetterschutz außen.",
  },
  {
    question: "Wie lange dauert die Produktion und Montage?",
    answer:
      "Die Fertigung dauert in der Regel 6–8 Wochen. Die Montage selbst ist bei Standardtüren in einem Tag erledigt. Wir halten dich während der gesamten Produktionszeit auf dem Laufenden.",
  },
  {
    question: "Welche Sicherheitsklasse empfehlt ihr für Einfamilienhäuser?",
    answer:
      "Wir empfehlen mindestens RC2 nach DIN EN 1627. Für erhöhten Schutz bieten wir RC3 an. Alle Türen haben serienmäßig Mehrfachverriegelung und Sicherheitsbeschläge.",
  },
  {
    question: "Gibt es 2026 eine Förderung für Haustüren?",
    answer:
      "Ja! Über das KfW-Programm und BAFA kannst du Zuschüsse für energieeffiziente Haustüren erhalten. Voraussetzung ist ein UD-Wert von max. 1,3 W/(m²·K). Wir helfen dir beim Antrag.",
  },
  {
    question: "Kann ich meine Haustür auch ohne Montage bestellen?",
    answer:
      "Ja, wir bieten auch Lieferung ohne Montage an. Wir empfehlen aber unseren Montageservice – so hast du Garantie auf die fachgerechte Installation und alle Dichtungen.",
  },
  {
    question: "Ist es möglich, die Produktionsschritte zu verfolgen?",
    answer:
      "Ja! Über unser digitales Portal erhältst du Updates zum Fertigungsstatus. Du weißt jederzeit, wie weit deine Haustür ist und wann die Montage stattfindet.",
  },
];

/* ─── HELPERS ─── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < count ? "fill-[#FFA202] text-[#FFA202]" : "text-[#E5E7EB]"
          }
        />
      ))}
    </div>
  );
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-[16px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E7EB]"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAFAFA] transition-colors rounded-[16px]"
            aria-expanded={open === i}
          >
            <span className="font-medium text-[#222B20] pr-4 text-[15px]">
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className={`text-[#329866] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-5 pb-5 text-[#6B7280] leading-relaxed text-[14px] border-t border-[#E5E7EB] pt-4">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE — Planville Haustüren
   (Exact clone of planville.de PV page structure)
   ════════════════════════════════════════════ */
export default function HaustuerenPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      {/* ═══════════════════════════════════════
          1. HEADER — sticky nav
          ═══════════════════════════════════════ */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
          <a href="/" className="text-[26px] font-bold text-[#222B20] shrink-0">
            Plan<span className="text-[#329866]">ville</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              "Haustüren",
              "Fenster",
              "Photovoltaik",
              "Wärmepumpen",
              "Dachsanierung",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[14px] font-medium text-[#6B7280] hover:text-[#329866] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+4924312345678"
              className="hidden md:flex items-center gap-2 text-[14px] text-[#6B7280] hover:text-[#329866] transition-colors"
            >
              <Phone size={16} />
              02431 / 123 456 78
            </a>
            <a
              href="#kontakt"
              className="hidden sm:inline-flex bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] font-semibold text-[14px] px-6 py-2.5 rounded-full transition-colors"
            >
              Angebot anfordern
            </a>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 text-[#222B20]"
              aria-label="Menü"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden border-t border-[#E5E7EB] bg-white animate-slide-in">
            <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-3">
              {[
                "Haustüren",
                "Fenster",
                "Photovoltaik",
                "Wärmepumpen",
                "Dachsanierung",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[15px] font-medium text-[#222B20] py-2 border-b border-[#E5E7EB]"
                >
                  {link}
                </a>
              ))}
              <a
                href="#kontakt"
                className="bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] font-semibold text-[14px] px-6 py-3 rounded-full text-center transition-colors mt-2"
              >
                Angebot anfordern
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════
          2. HERO — dark bg with house image overlay
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        {/* Background image simulation */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #1a2318 0%, #222B20 40%, #1a3a25 70%, #222B20 100%)",
          }}
        />
        {/* Subtle green glow top-right like PV page */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#329866]/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#329866]/5 blur-[100px]" />

        <div className="relative max-w-[1200px] mx-auto px-6 py-20 lg:py-28 w-full text-center">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.15] font-bold text-white mb-5">
            Spare Geld mit Deiner
            <br />
            <span className="text-[#329866]">neuen Haustür</span>
          </h1>

          <p className="text-[15px] sm:text-[16px] text-white/70 leading-relaxed max-w-[520px] mx-auto mb-8">
            Finde deine individuelle Haustür aus Aluminium, Kunststoff oder
            Holz-Alu – mit höchster Sicherheit und bester Wärmedämmung. Von
            der Planung bis zur Montage alles aus einer Hand.
          </p>

          <a
            href="#konfigurator"
            className="inline-flex items-center justify-center gap-2 bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] font-semibold px-8 py-4 rounded-full text-[16px] transition-colors"
          >
            Konfiguriert jetzt prüfen
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. TRUST / AWARD SECTION
          "Warum Planville — Deutschlands bestbewerteter Haustüren-Anbieter"
          Google badge + product badges + 3 benefit cards
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-[#329866] font-semibold text-[15px] mb-2">
              Warum Planville
            </p>
            <h2 className="text-[24px] sm:text-[32px] font-bold text-[#222B20] leading-tight">
              Deutschlands bestbewerteter Haustüren-Anbieter
            </h2>
          </div>

          {/* Google badge + product images row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
            {/* Google Review Badge */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-[#E5E7EB] px-6 py-5 text-center">
                <div className="text-[11px] font-bold text-[#222B20] tracking-wider uppercase mb-1">
                  Ausgezeichnet
                </div>
                <div className="flex justify-center mb-1.5">
                  <StarRating count={5} />
                </div>
                <div className="text-[12px] text-[#6B7280] mb-2">
                  4,9 / 5,0 — 500+ Bewertungen
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-4 h-4 bg-[#4285F4] rounded-full flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">G</span>
                  </div>
                  <span className="text-[12px] font-medium text-[#6B7280]">
                    Google
                  </span>
                </div>
              </div>
            </div>

            {/* Product badges / certification icons */}
            <div className="flex items-center gap-6">
              {[
                { icon: ShieldCheck, label: "DIN EN 1627" },
                { icon: Award, label: "CE-zertifiziert" },
                { icon: BadgeCheck, label: "Made in Germany" },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-[#F3F4F6] rounded-[12px] flex items-center justify-center">
                      <Icon size={28} className="text-[#329866]" />
                    </div>
                    <span className="text-[11px] font-medium text-[#6B7280]">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3 Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="text-center px-6 py-8"
                >
                  <div className="w-14 h-14 bg-[#329866]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-[#329866]" />
                  </div>
                  <div className="text-[20px] font-bold text-[#329866] mb-1">
                    {b.value}
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#222B20] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-[14px] text-[#6B7280] leading-relaxed">
                    {b.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. GREEN MOTTO BAR — "Sicher. Zukunft. Bauen."
          ═══════════════════════════════════════ */}
      <section className="py-10 bg-[#329866]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[24px] sm:text-[32px] font-bold text-white mb-2">
            Sicher. Zukunft. Bauen.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-white/80 max-w-[480px] mx-auto">
            Vertraue auf über 10 Jahre Erfahrung, um sich mit Planville sicher zu investieren.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. "ALLES AUS EINER HAND" — image left, text right
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image placeholder */}
            <div className="flex-1 w-full">
              <div className="aspect-[4/3] rounded-[16px] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#329866]/5" />
                <DoorOpen size={80} className="text-[#329866]/20 relative z-10" />
              </div>
            </div>
            {/* Text side */}
            <div className="flex-1">
              <p className="text-[#329866] font-semibold text-[14px] mb-2">
                Alles aus einer Hand:
              </p>
              <h2 className="text-[26px] sm:text-[34px] leading-[1.2] font-bold text-[#222B20] mb-4">
                für ein sorgenfreies
                <br />
                Hausprojekt
              </h2>
              <p className="text-[15px] text-[#6B7280] leading-relaxed mb-6">
                Mit Planville brauchst du dich um nichts zu kümmern. Von der
                ersten Beratung über das professionelle Aufmaß bis zur
                fachgerechten Montage – wir begleiten dich durch den gesamten
                Prozess. Ein Ansprechpartner, ein Festpreis, kein Stress.
              </p>
              <p className="text-[15px] text-[#6B7280] leading-relaxed">
                Unsere Haustüren werden nach deinen Wünschen in Deutschland
                gefertigt und erfüllen höchste Standards bei Sicherheit,
                Wärmedämmung und Design. Alles CE-zertifiziert und
                GEG-konform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. PHILOSOPHY — text left, image right
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text side */}
            <div className="flex-1">
              <p className="text-[#329866] font-semibold text-[14px] mb-2">
                Unsere Philosophie:
              </p>
              <h2 className="text-[26px] sm:text-[34px] leading-[1.2] font-bold text-[#222B20] mb-4">
                dein langfristiger Nutzen
              </h2>
              <p className="text-[15px] text-[#6B7280] leading-relaxed mb-4">
                Wir bei Planville denken langfristig. Eine Haustür ist eine
                Investition für Jahrzehnte. Deshalb beraten wir ehrlich, verwenden
                nur hochwertige Materialien und sorgen für eine fachgerechte
                Montage, die lange hält.
              </p>
              <p className="text-[15px] text-[#6B7280] leading-relaxed">
                Nachhaltigkeit, Energieeffizienz und Sicherheit stehen dabei
                im Mittelpunkt. Unsere Türen erfüllen die aktuellen
                GEG-Anforderungen und sind förderfähig – damit du sparst und
                gleichzeitig dein Zuhause aufwertest.
              </p>
            </div>
            {/* Image placeholder */}
            <div className="flex-1 w-full">
              <div className="aspect-[4/3] rounded-[16px] bg-gradient-to-br from-[#329866]/10 to-[#329866]/5 flex items-center justify-center">
                <Home size={80} className="text-[#329866]/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. WHY PLANVILLE — dark bg, 6 icon cards
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#222B20]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#329866] font-semibold text-[15px] mb-2">
              Warum Planville die
            </p>
            <h2 className="text-[26px] sm:text-[34px] font-bold text-white leading-tight">
              beste Wahl für dich ist
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyPlanville.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-14 h-14 bg-[#329866]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-[#329866]" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-white/60 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. COMPARISON — "Dein Planville Service" vs "Ohne Planville"
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WITH Planville */}
            <div className="rounded-[16px] border-2 border-[#329866] p-6 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#329866] rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <h3 className="text-[18px] font-bold text-[#222B20]">
                  Dein Planville Service
                </h3>
              </div>
              <ul className="space-y-3.5">
                {comparisonWith.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px] text-[#222B20]"
                  >
                    <CheckCircle
                      size={16}
                      className="text-[#329866] shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WITHOUT Planville */}
            <div className="rounded-[16px] border border-[#E5E7EB] p-6 bg-[#FAFAFA]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                  <XCircle size={20} className="text-[#9CA3AF]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#6B7280]">
                  Ohne Planville
                </h3>
              </div>
              <ul className="space-y-3.5">
                {comparisonWithout.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px] text-[#6B7280]"
                  >
                    <XCircle
                      size={16}
                      className="text-[#D1D5DB] shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          9. CUSTOMER PROJECTS — "Unsere Kundenprojekte"
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[26px] sm:text-[34px] font-bold text-[#222B20] text-center mb-12">
            Unsere Kundenprojekte
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerProjects.map((project) => (
              <div
                key={project.title}
                className="rounded-[16px] overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#222B20] to-[#1a3a25] flex items-center justify-center relative">
                  <DoorOpen size={48} className="text-[#329866]/30" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold text-white bg-[#329866] px-2.5 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-semibold text-[#222B20] mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[12px] text-[#6B7280] flex items-center gap-1 mb-2">
                    <MapPin size={11} />
                    {project.location}
                  </p>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          10. GREEN CTA — "Mach jetzt den 2-Minuten-Haustüren-Check!"
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-[#222B20] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#222B20] via-[#1a3a25] to-[#222B20]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#329866]/10 blur-[100px]" />
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[24px] sm:text-[32px] font-bold text-white mb-3">
            Mach jetzt den 2-Minuten-
            <br />
            Haustüren-Check!
          </h2>
          <a
            href="#konfigurator"
            className="inline-flex items-center justify-center gap-2 bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] font-semibold px-8 py-4 rounded-full text-[16px] transition-colors mt-4"
          >
            Jetzt konfigurieren
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          11. PROCESS TIMELINE — "Dein Ablauf mit Planville"
          Image left, timeline steps right
          ═══════════════════════════════════════ */}
      <section id="konfigurator" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#222B20] font-semibold text-[15px] mb-1">
              Dein Ablauf
            </p>
            <h2 className="text-[26px] sm:text-[34px] font-bold leading-tight">
              <span className="text-[#222B20]">mit </span>
              <span className="text-[#329866]">Planville</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Image placeholder */}
            <div className="flex-1 w-full lg:sticky lg:top-[100px]">
              <div className="aspect-[3/4] rounded-[16px] bg-gradient-to-b from-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#329866]/5" />
                <DoorOpen
                  size={100}
                  className="text-[#329866]/15 relative z-10"
                />
              </div>
            </div>

            {/* Timeline steps */}
            <div className="flex-1">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-[28px] bottom-[28px] w-[2px] bg-[#329866]/20" />

                <div className="space-y-10">
                  {processSteps.map((step, i) => (
                    <div key={i} className="flex gap-5 relative">
                      {/* Number circle */}
                      <div className="w-10 h-10 bg-[#329866] rounded-full flex items-center justify-center shrink-0 z-10">
                        <span className="text-white font-bold text-[14px]">
                          {i + 1}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="pt-1.5">
                        <h3 className="text-[16px] font-semibold text-[#222B20] mb-2">
                          {step.title}
                        </h3>
                        <p className="text-[14px] text-[#6B7280] leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          12. COMPONENTS — "Unsere Komponenten"
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#222B20]">
              Unsere
            </h2>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#329866]">
              Komponenten
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {components.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center mx-auto mb-3">
                    <Icon size={32} className="text-[#222B20]" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#222B20]">
                    {c.label}
                  </h3>
                  <p className="text-[12px] text-[#6B7280] mt-0.5">{c.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          13. DARK PRODUCT CTA
          ═══════════════════════════════════════ */}
      <section className="py-14 bg-[#222B20] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a25]/40 to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-[20px] sm:text-[26px] font-bold text-white leading-snug">
                Möchten Sie mehr über die
                <br />
                von uns verwendeten
                <br />
                Produkte erfahren?
              </h2>
            </div>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] font-semibold px-8 py-4 rounded-full text-[15px] transition-colors shrink-0"
            >
              Mehr erfahren
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          14. FAQ SECTION — accordion + green CTA box
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[760px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[24px] sm:text-[32px] font-bold text-[#222B20]">
              Häufige Fragen
            </h2>
            <p className="text-[24px] sm:text-[32px] font-bold text-[#329866]">
              zu Haustüren
            </p>
          </div>

          <FAQAccordion items={faqs} />

          {/* Green CTA box at bottom of FAQ */}
          <div className="mt-10 rounded-[16px] bg-[#329866] p-8 text-center">
            <p className="text-white font-semibold text-[16px] mb-1">
              Hast du weitere Fragen?
            </p>
            <p className="text-white/80 text-[14px] mb-5">
              Unser Team berät dich gerne persönlich und unverbindlich.
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] font-semibold px-6 py-3 rounded-full text-[14px] transition-colors"
            >
              Jetzt Beratung anfragen
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          15. NEWSLETTER — dark bg
          ═══════════════════════════════════════ */}
      <section
        id="kontakt"
        className="py-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #222B20 0%, #1a3a25 50%, #222B20 100%)",
        }}
      >
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#329866]/8 blur-[100px]" />
        <div className="relative max-w-[560px] mx-auto px-6 text-center">
          <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-2">
            Melde dich für unseren
            <br />
            Newsletter an!
          </h3>
          <p className="text-[14px] text-white/60 mb-6">
            Erhalte exklusive Angebote, Tipps zu Fördermitteln und Inspiration für dein Zuhause.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Deine E-Mail-Adresse"
              className="flex-1 px-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-[14px] text-white placeholder-white/40 focus:outline-none focus:border-[#329866] focus:ring-2 focus:ring-[#329866]/30 transition-colors"
            />
            <button className="bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] font-semibold px-6 py-3.5 rounded-full text-[14px] transition-colors whitespace-nowrap">
              Anmelden
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          16. FOOTER — 4-column dark bg + trust badges
          ═══════════════════════════════════════ */}
      <footer className="bg-[#222B20] text-white/60 pt-14 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Col 1 — Brand */}
            <div>
              <div className="text-[22px] font-bold text-white mb-4">
                Plan<span className="text-[#329866]">ville</span>
              </div>
              <p className="text-[14px] leading-relaxed mb-4">
                Dein Partner für hochwertige Haustüren, Fenster und
                Energielösungen in Erkelenz und Umgebung.
              </p>
              <div className="text-[13px] flex items-center gap-2">
                <MapPin size={13} className="text-[#329866]" />
                Erkelenz, NRW
              </div>
            </div>

            {/* Col 2 — Produkte */}
            <div>
              <h4 className="text-white font-semibold text-[15px] mb-4">
                Für alle Hauseigentümer
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                {[
                  "Haustüren",
                  "Fenster",
                  "Photovoltaik",
                  "Wärmepumpen",
                  "Dachsanierung",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="hover:text-[#329866] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Über uns */}
            <div>
              <h4 className="text-white font-semibold text-[15px] mb-4">
                Über uns
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                {[
                  "Über Planville",
                  "Karriere",
                  "Blog",
                  "Partnerprogramm",
                  "Kontakt",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="hover:text-[#329866] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Kontakt */}
            <div>
              <h4 className="text-white font-semibold text-[15px] mb-4">
                Kontakt
              </h4>
              <ul className="space-y-3 text-[14px]">
                <li className="flex items-center gap-2.5">
                  <Phone size={14} className="text-[#329866]" />
                  02431 / 123 456 78
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={14} className="text-[#329866]" />
                  info@planville.de
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock size={14} className="text-[#329866]" />
                  Mo–Fr: 08:00 – 16:00
                </li>
              </ul>
            </div>
          </div>

          {/* Trust badges row */}
          <div className="border-t border-white/10 pt-6 mb-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {["MAXDA", "Trusted Shops", "TÜV Rheinland", "SSL Secured", "Google Partner"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="text-[11px] font-medium text-white/30 bg-white/5 px-3 py-1.5 rounded-[8px] border border-white/10"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px]">
            <span>
              &copy; {new Date().getFullYear()} Planville. Alle Rechte
              vorbehalten.
            </span>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-[#329866] transition-colors"
              >
                Impressum
              </a>
              <a
                href="#"
                className="hover:text-[#329866] transition-colors"
              >
                Datenschutz
              </a>
              <a
                href="#"
                className="hover:text-[#329866] transition-colors"
              >
                AGB
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
