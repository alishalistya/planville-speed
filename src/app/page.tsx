"use client";

import { useState } from "react";
import {
  Shield,
  Thermometer,
  Paintbrush,
  Smartphone,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
  Volume2,
  Lock,
  Sun,
  Fingerprint,
  Settings,
  Award,
  DoorOpen,
  Sparkles,
  BadgeCheck,
  CircleDollarSign,
  HandHelping,
  ClipboardCheck,
  Package,
  HardHat,
  HeartHandshake,
  Ruler,
  Palette,
  FileText,
  Home,
  Euro,
} from "lucide-react";

/* ─────────────── TYPES ─────────────── */
interface FAQItem {
  question: string;
  answer: string;
}

/* ─────────────── DATA ─────────────── */
const materials = [
  {
    name: "Aluminium",
    badge: "Beliebteste Wahl",
    description:
      "Extrem langlebig, pflegeleicht und in zahlreichen Farben verfügbar. Ideale Wärmedämmung durch thermisch getrennte Profile.",
    features: [
      "Witterungsbeständig & rostfrei",
      "Schmale Profilansichten",
      "Über 200 RAL-Farben",
      "Höchste Einbruchsicherheit",
    ],
    ud: "bis 0,87 W/(m²·K)",
    icon: Shield,
  },
  {
    name: "Kunststoff",
    badge: "Preis-Leistung",
    description:
      "Hervorragendes Preis-Leistungs-Verhältnis mit guter Wärmedämmung. Pflegeleicht und in vielen Dekoren erhältlich.",
    features: [
      "Günstigste Option",
      "Gute Wärmedämmung",
      "Pflegeleicht",
      "Viele Dekore verfügbar",
    ],
    ud: "bis 1,0 W/(m²·K)",
    icon: Euro,
  },
  {
    name: "Holz",
    badge: "Natürlich",
    description:
      "Natürlicher Werkstoff mit hervorragender Wärmedämmung und behaglicher Optik. Nachhaltig und individuell gestaltbar.",
    features: [
      "Natürliche Wärmedämmung",
      "Nachhaltiger Werkstoff",
      "Behagliche Ausstrahlung",
      "Individuell gestaltbar",
    ],
    ud: "bis 0,90 W/(m²·K)",
    icon: Sun,
  },
  {
    name: "Holz-Aluminium",
    badge: "Premium",
    description:
      "Das Beste aus beiden Welten: Holz-Wärme innen, Aluminium-Schutz außen. Maximale Langlebigkeit und Ästhetik.",
    features: [
      "Holz innen, Alu außen",
      "Beste Wärmedämmung",
      "Maximale Langlebigkeit",
      "Premium-Optik",
    ],
    ud: "bis 0,80 W/(m²·K)",
    icon: Sparkles,
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Einbruchschutz",
    subtitle: "RC2 & RC3 Sicherheit",
    description:
      "Mehrfachverriegelung und Sicherheitsbeschläge nach DIN EN 1627. Schütze dein Zuhause mit geprüfter Widerstandsklasse RC2 oder RC3.",
    stats: "bis RC3",
  },
  {
    icon: Thermometer,
    title: "Wärmedämmung",
    subtitle: "Energieeffizienz A+",
    description:
      "Dreifachverglasung und thermisch getrennte Profile für beste UD-Werte. Erfüllt die Anforderungen des Gebäudeenergiegesetzes (GEG).",
    stats: "UD 0,80",
  },
  {
    icon: Paintbrush,
    title: "Design",
    subtitle: "Über 200 RAL-Farben",
    description:
      "Individuelle Gestaltung mit Seitenteilen, Oberlichtern, Glasoptionen und Griffen. Deine Haustür wird zum Blickfang.",
    stats: "200+ Farben",
  },
  {
    icon: Smartphone,
    title: "Smart Home",
    subtitle: "Fingerprint & App",
    description:
      "Fingerprint-Scanner, elektronische Türschlösser und App-Steuerung. Komm schlüssellos nach Hause.",
    stats: "Schlüsselfrei",
  },
  {
    icon: Volume2,
    title: "Schallschutz",
    subtitle: "Bis Klasse 3",
    description:
      "Optimierte Dichtungssysteme und Spezialverglasungen reduzieren Außenlärm effektiv. Genieße Ruhe in deinem Zuhause.",
    stats: "bis 42 dB",
  },
  {
    icon: Lock,
    title: "Barrierefreiheit",
    subtitle: "Nullschwelle möglich",
    description:
      "Bodenebene Schwellen für barrierefreien Zugang nach DIN 18040. Komfortabel und zukunftssicher für jedes Alter.",
    stats: "DIN 18040",
  },
];

const doorModels = [
  {
    name: "Die Tür – Kompakt",
    description: "Aluminium-Haustür im kompakten Format",
    features: ["Aluminium", "Standardmaße", "Gute Dämmung"],
    tag: "Einsteiger",
  },
  {
    name: "Die Tür – Standard",
    description: "Vielseitige Haustür mit bewährter Qualität",
    features: ["Aluminium", "Seitenteile möglich", "RC2 Sicherheit"],
    tag: "Bestseller",
  },
  {
    name: "Die Tür – All Inclusive",
    description: "Premium-Ausstattung inklusive aller Extras",
    features: ["Premium Alu", "Smart Home ready", "RC3 Sicherheit"],
    tag: "Premium",
  },
  {
    name: "Die Tür – Groß Design",
    description: "Großflächige Designs für moderne Architektur",
    features: ["XXL-Formate", "Seitenteil & Oberlicht", "Individuelle Maße"],
    tag: "Exklusiv",
  },
  {
    name: "Fenster – Loft",
    description: "Loft-Elemente für maximalen Lichteinfall",
    features: ["Loft-Stil", "Große Glasflächen", "Moderne Optik"],
    tag: "Modern",
  },
  {
    name: "Nebeneingangstür",
    description: "Funktionale Tür für Nebeneingang und Keller",
    features: ["Robust", "Wärmedämmend", "Preiswert"],
    tag: "Funktional",
  },
];

const configuratorSteps = [
  {
    step: 1,
    title: "Modell wählen",
    description: "Wähle aus unseren Türmodellen dein Wunschdesign.",
    icon: DoorOpen,
  },
  {
    step: 2,
    title: "Maße angeben",
    description: "Gib die exakten Maße deiner Türöffnung ein.",
    icon: Ruler,
  },
  {
    step: 3,
    title: "Design anpassen",
    description: "Farbe, Verglasung, Griffe und Seitenteile konfigurieren.",
    icon: Palette,
  },
  {
    step: 4,
    title: "Sicherheit wählen",
    description: "Wähle deine gewünschte Sicherheitsausstattung.",
    icon: Shield,
  },
  {
    step: 5,
    title: "Angebot erhalten",
    description: "Erhalte dein individuelles Angebot innerhalb von 24h.",
    icon: FileText,
  },
];

const testimonials = [
  {
    name: "Michael & Sandra K.",
    location: "Erkelenz",
    rating: 5,
    text: "Von der Beratung bis zur Montage alles perfekt. Unsere neue Aluminium-Haustür sieht fantastisch aus und die Wärmedämmung ist spürbar besser.",
    door: "Die Tür – All Inclusive",
  },
  {
    name: "Thomas R.",
    location: "Mönchengladbach",
    rating: 5,
    text: "Der Konfigurator war super einfach zu bedienen. Das Team hat uns professionell beraten und die Tür wurde pünktlich geliefert.",
    door: "Die Tür – Standard",
  },
  {
    name: "Familie Weber",
    location: "Düsseldorf",
    rating: 5,
    text: "Wir haben uns für die Groß Design Variante entschieden – ein absoluter Hingucker! Die Qualität der Verarbeitung überzeugt auf ganzer Linie.",
    door: "Die Tür – Groß Design",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Konfigurieren",
    description:
      "Gestalte deine Traumtür online oder lass dich persönlich beraten.",
    icon: Settings,
  },
  {
    step: 2,
    title: "Aufmaß & Beratung",
    description:
      "Unser Fachberater kommt zu dir und nimmt professionell Maß.",
    icon: ClipboardCheck,
  },
  {
    step: 3,
    title: "Fertigung",
    description:
      "Deine Haustür wird nach Maß gefertigt – präzise und in höchster Qualität.",
    icon: Package,
  },
  {
    step: 4,
    title: "Montage",
    description:
      "Fachgerechte Montage durch unser erfahrenes Montageteam vor Ort.",
    icon: HardHat,
  },
  {
    step: 5,
    title: "Nachbetreuung",
    description:
      "Wir sind auch nach der Montage für dich da – Service und Garantie inklusive.",
    icon: HeartHandshake,
  },
];

const faqs: FAQItem[] = [
  {
    question: "Welches Material ist am besten für meine Haustür?",
    answer:
      "Die Wahl des Materials hängt von deinen Prioritäten ab. Aluminium bietet höchste Witterungsbeständigkeit und modernes Design. Kunststoff überzeugt durch ein gutes Preis-Leistungs-Verhältnis. Holz bietet natürliche Wärme und Behaglichkeit. Holz-Aluminium vereint die Vorteile beider Materialien. Unser Konfigurator hilft dir bei der Entscheidung.",
  },
  {
    question: "Wie lange dauert die Lieferung meiner Haustür?",
    answer:
      "Die Lieferzeit beträgt in der Regel 6-8 Wochen nach Auftragsbestätigung. Bei Standardmodellen kann es auch schneller gehen. Wir informieren dich nach der Bestellung über den genauen Liefertermin und halten dich während der gesamten Produktion auf dem Laufenden.",
  },
  {
    question: "Welche Sicherheitsklasse empfehlt ihr?",
    answer:
      "Für Privathaushalte empfehlen wir mindestens die Widerstandsklasse RC2 nach DIN EN 1627. Diese bietet Schutz gegen den Einsatz von einfachen Werkzeugen. Für erhöhte Sicherheitsanforderungen bieten wir RC3 an. Alle unsere Türen sind serienmäßig mit Mehrfachverriegelung ausgestattet.",
  },
  {
    question: "Kann ich staatliche Förderung für meine neue Haustür erhalten?",
    answer:
      "Ja! Über die KfW und das BAFA kannst du Zuschüsse oder günstige Kredite für energieeffiziente Haustüren erhalten. Voraussetzung ist ein UD-Wert von maximal 1,3 W/(m²·K). Unsere Haustüren erfüllen in der Regel diese Anforderung. Wir beraten dich gerne zu den aktuellen Fördermöglichkeiten.",
  },
  {
    question: "Bietet ihr auch den Einbau / die Montage an?",
    answer:
      "Ja, wir bieten einen Komplettservice von der Beratung über das Aufmaß bis zur fachgerechten Montage. Unsere erfahrenen Monteure sorgen für eine professionelle Installation. Auf Wunsch entsorgen wir auch deine alte Tür und führen alle notwendigen Anpassungsarbeiten durch.",
  },
  {
    question: "Was kostet eine neue Haustür bei Planville?",
    answer:
      "Die Kosten hängen von Material, Größe, Design und Ausstattung ab. Kunststoff-Haustüren beginnen bei ca. 800 €, Aluminium-Haustüren ab ca. 1.500 €. Nutze unseren Online-Konfigurator für eine erste Preisindikation oder fordere ein individuelles Angebot an.",
  },
  {
    question: "Welche Verglasung ist die richtige?",
    answer:
      "Wir empfehlen standardmäßig Dreifachverglasung für beste Wärme- und Schalldämmung. Für Glaselemente stehen verschiedene Optionen zur Verfügung: Klarglas, Ornamentglas, Milchglas und Sicherheitsglas. Seitenteile und Oberlichter können ebenfalls verglast werden.",
  },
  {
    question: "Kann ich meine Haustür mit Smart Home verbinden?",
    answer:
      "Ja! Wir bieten verschiedene Smart-Home-Lösungen: Fingerprint-Scanner, elektronische Türschlösser mit App-Steuerung, digitale Türspione und automatische Verriegelungssysteme. Diese lassen sich in bestehende Smart-Home-Systeme integrieren.",
  },
];

/* ─────────────── TAG COLORS ─────────────── */
const tagColors: Record<string, string> = {
  Einsteiger: "bg-gray-100 text-[#222B20]",
  Bestseller: "bg-[#329866]/10 text-[#329866]",
  Premium: "bg-[#FFA202]/10 text-[#E68F00]",
  Exklusiv: "bg-[#222B20]/10 text-[#222B20]",
  Modern: "bg-[#329866]/10 text-[#329866]",
  Funktional: "bg-gray-100 text-[#222B20]",
};

/* ─────────────── HELPER COMPONENTS ─────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "fill-[#329866] text-[#329866]"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-[16px] overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FAFAFA] transition-colors"
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-[#222B20] pr-4">
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className={`text-[#6B7280] shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
            />
          </button>
          {openIndex === i && (
            <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#E5E7EB] pt-4">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────── PAGE ─────────────── */
export default function HaustuerenPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      {/* ── Navigation ── */}
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-2xl font-bold text-[#222B20]">
              Plan<span className="text-[#329866]">ville</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#materialien"
                className="text-[#6B7280] hover:text-[#329866] transition-colors text-sm font-medium"
              >
                Materialien
              </a>
              <a
                href="#vorteile"
                className="text-[#6B7280] hover:text-[#329866] transition-colors text-sm font-medium"
              >
                Vorteile
              </a>
              <a
                href="#modelle"
                className="text-[#6B7280] hover:text-[#329866] transition-colors text-sm font-medium"
              >
                Modelle
              </a>
              <a
                href="#konfigurator"
                className="text-[#6B7280] hover:text-[#329866] transition-colors text-sm font-medium"
              >
                Konfigurator
              </a>
              <a
                href="#foerderung"
                className="text-[#6B7280] hover:text-[#329866] transition-colors text-sm font-medium"
              >
                Förderung
              </a>
              <a
                href="#faq"
                className="text-[#6B7280] hover:text-[#329866] transition-colors text-sm font-medium"
              >
                FAQ
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="tel:+4924312345678"
                className="hidden sm:flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#329866]"
              >
                <Phone size={16} />
                02431 / 123 456 78
              </a>
              <a
                href="#konfigurator"
                className="bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Jetzt konfigurieren
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── 1. HERO SECTION ── */}
      <section className="relative bg-[#222B20] text-white min-h-[600px] flex items-center overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(50,152,102,0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(50,152,102,0.15),transparent_50%)]" />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 py-20 sm:py-28 lg:py-32 relative w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#329866]/20 border border-[#329866]/30 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={14} className="text-[#329866]" />
              <span className="text-sm text-[#329866]">
                Jetzt Traumtür konfigurieren
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[48px] lg:leading-[56px] font-bold leading-tight mb-6">
              Deine Haustür –{" "}
              <span className="text-[#329866]">
                die Visitenkarte
              </span>{" "}
              deines Zuhauses
            </h1>
            <p className="text-base sm:text-lg text-[#E5E7EB] mb-8 leading-relaxed max-w-2xl">
              Konfiguriere deine individuelle Haustür aus Aluminium,
              Kunststoff oder Holz. Höchste Sicherheit, beste Wärmedämmung und
              zeitloses Design – alles aus einer Hand von Planville.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#konfigurator"
                className="inline-flex items-center justify-center gap-2 bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] px-8 py-4 rounded-full text-base font-semibold transition-colors"
              >
                Haustür konfigurieren
                <ArrowRight size={20} />
              </a>
              <a
                href="#materialien"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white hover:text-[#222B20] transition-colors"
              >
                Materialien vergleichen
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/15">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-[#329866]" />
                <span className="text-sm text-[#E5E7EB]">
                  Kostenlose Beratung
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-[#329866]" />
                <span className="text-sm text-[#E5E7EB]">Made in Germany</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-[#329866]" />
                <span className="text-sm text-[#E5E7EB]">
                  Fachgerechte Montage
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-[#329866]" />
                <span className="text-sm text-[#E5E7EB]">
                  KfW-förderfähig
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR (dark section) ── */}
      <section className="bg-[#222B20] border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-white/70">
            <div className="flex items-center gap-2">
              <BadgeCheck size={20} className="text-[#329866]" />
              <span className="text-sm font-medium">CE-zertifiziert</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-[#329866]" />
              <span className="text-sm font-medium">DIN EN 1627</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-[#329866]" />
              <span className="text-sm font-medium">RAL-Gütezeichen</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer size={20} className="text-[#329866]" />
              <span className="text-sm font-medium">GEG-konform</span>
            </div>
            <div className="flex items-center gap-2">
              <Home size={20} className="text-[#329866]" />
              <span className="text-sm font-medium">Made in Germany</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURES / QUICK BENEFITS (white) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all p-6 text-center">
              <div className="w-12 h-12 bg-[#329866] rounded-[12px] flex items-center justify-center mx-auto mb-4">
                <Palette size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#222B20] mb-2">
                Volle Anpassung
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Konfiguriere Aluminium-, Kunststoff- und Holztüren exakt
                nach deinen Wünschen – Farbe, Verglasung, Griffe und mehr.
              </p>
            </div>
            <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all p-6 text-center">
              <div className="w-12 h-12 bg-[#329866] rounded-[12px] flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#222B20] mb-2">
                Sofort-Übersicht
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Erhalte eine detaillierte Zusammenfassung deiner gewählten
                Konfiguration – transparent und übersichtlich.
              </p>
            </div>
            <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all p-6 text-center">
              <div className="w-12 h-12 bg-[#329866] rounded-[12px] flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#222B20] mb-2">
                Direkte Angebotsanfrage
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Reiche deine Konfiguration direkt ein und erhalte ein
                unverbindliches Angebot von Planville.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MATERIAL SELECTION (light bg) ── */}
      <section id="materialien" className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] leading-[44px] font-semibold text-[#222B20] mb-4">
              Welches Material passt zu dir?
            </h2>
            <p className="text-base text-[#6B7280] max-w-2xl mx-auto">
              Jedes Material hat seine Stärken. Vergleiche die
              Eigenschaften und finde die perfekte Haustür für dein Zuhause.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((mat) => {
              const Icon = mat.icon;
              return (
                <div
                  key={mat.name}
                  className="rounded-[16px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#329866]/10 rounded-full flex items-center justify-center">
                      <Icon size={24} className="text-[#329866]" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#329866] text-white">
                      {mat.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#222B20] mb-2">
                    {mat.name}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
                    {mat.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {mat.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-[#222B20]"
                      >
                        <CheckCircle size={14} className="text-[#329866] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6B7280]">UD-Wert</span>
                      <span className="text-sm font-semibold text-[#329866]">
                        {mat.ud}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. USP / BENEFITS (white) ── */}
      <section id="vorteile" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] leading-[44px] font-semibold text-[#222B20] mb-4">
              Was deine neue Haustür auszeichnet
            </h2>
            <p className="text-base text-[#6B7280] max-w-2xl mx-auto">
              Unsere Haustüren vereinen Sicherheit, Energieeffizienz, Design und
              Komfort – für ein Zuhause, das du verdienst.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="group bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#329866] rounded-[12px] flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-[#222B20]">
                          {b.title}
                        </h3>
                        <span className="text-xs font-semibold text-[#329866] bg-[#329866]/10 px-2 py-0.5 rounded-full">
                          {b.stats}
                        </span>
                      </div>
                      <p className="text-sm text-[#329866] font-medium mb-2">
                        {b.subtitle}
                      </p>
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. PRODUCT / DOOR MODELS (light bg) ── */}
      <section id="modelle" className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] leading-[44px] font-semibold text-[#222B20] mb-4">
              Unsere Türmodelle
            </h2>
            <p className="text-base text-[#6B7280] max-w-2xl mx-auto">
              Vom kompakten Einsteigermodell bis zur exklusiven Designtür –
              finde die perfekte Haustür für deinen Eingangsbereich.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doorModels.map((model) => (
              <div
                key={model.name}
                className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all overflow-hidden group"
              >
                <div className="h-48 bg-[#FAFAFA] flex items-center justify-center relative">
                  <DoorOpen
                    size={64}
                    className="text-[#E5E7EB] group-hover:text-[#329866] transition-colors"
                  />
                  <span
                    className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${tagColors[model.tag] || "bg-gray-100 text-[#222B20]"}`}
                  >
                    {model.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#222B20] mb-1">
                    {model.name}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-4">
                    {model.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {model.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-[#FAFAFA] text-[#6B7280] px-2.5 py-1 rounded-full border border-[#E5E7EB]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#konfigurator"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#329866] hover:text-[#2A7F55]"
                  >
                    Jetzt konfigurieren
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CONFIGURATOR PROMOTION (accent green bg) ── */}
      <section id="konfigurator" className="py-20 bg-[#329866] text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] leading-[44px] font-bold mb-4">
              So einfach konfigurierst du deine Traumtür
            </h2>
            <p className="text-base text-white/80 max-w-2xl mx-auto">
              In nur 5 Schritten zu deiner individuellen Haustür – online
              konfigurieren und unverbindliches Angebot erhalten.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {configuratorSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="text-center relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-[16px] flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-white/60 mb-1 uppercase tracking-wide">
                    Schritt {s.step}
                  </div>
                  <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <a
              href="https://planville.de/haustueren/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] px-10 py-4 rounded-full text-base font-bold transition-colors shadow-lg"
            >
              Jetzt Haustür konfigurieren
              <ArrowRight size={20} />
            </a>
            <p className="text-sm text-white/60 mt-4">
              Kostenlos & unverbindlich – Angebot in 24 Stunden
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. SOCIAL PROOF / TESTIMONIALS (light bg) ── */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] leading-[44px] font-semibold text-[#222B20] mb-4">
              Das sagen unsere Kunden
            </h2>
            <p className="text-base text-[#6B7280]">
              Über 500 zufriedene Kunden vertrauen auf Planville Haustüren.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all p-6"
              >
                <StarRating rating={t.rating} />
                <p className="text-[#6B7280] mt-4 mb-4 leading-relaxed text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4">
                  <div>
                    <div className="font-semibold text-[#222B20] text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-[#6B7280] flex items-center gap-1">
                      <MapPin size={12} /> {t.location}
                    </div>
                  </div>
                  <div className="text-xs text-[#329866] font-medium bg-[#329866]/10 px-2 py-1 rounded-full">
                    {t.door}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Stats bar (dark) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-[16px] bg-[#222B20]">
              <div className="text-3xl font-bold text-[#329866]">500+</div>
              <div className="text-sm text-white/70 mt-1">
                Zufriedene Kunden
              </div>
            </div>
            <div className="text-center p-6 rounded-[16px] bg-[#222B20]">
              <div className="text-3xl font-bold text-[#329866]">4.9/5</div>
              <div className="text-sm text-white/70 mt-1">
                Kundenbewertung
              </div>
            </div>
            <div className="text-center p-6 rounded-[16px] bg-[#222B20]">
              <div className="text-3xl font-bold text-[#329866]">10+</div>
              <div className="text-sm text-white/70 mt-1">
                Jahre Erfahrung
              </div>
            </div>
            <div className="text-center p-6 rounded-[16px] bg-[#222B20]">
              <div className="text-3xl font-bold text-[#329866]">100%</div>
              <div className="text-sm text-white/70 mt-1">
                Meisterbetrieb
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FÖRDERUNG (white) ── */}
      <section id="foerderung" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#329866]/10 rounded-full px-4 py-1.5 mb-4">
                <CircleDollarSign size={16} className="text-[#329866]" />
                <span className="text-sm font-semibold text-[#329866]">
                  Staatliche Förderung
                </span>
              </div>
              <h2 className="text-[36px] leading-[44px] font-semibold text-[#222B20] mb-4">
                Bis zu 20% Zuschuss für deine neue Haustür
              </h2>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                Profitiere von staatlichen Förderprogrammen für
                energieeffiziente Haustüren. Die KfW und das BAFA bezuschussen
                den Einbau neuer Haustüren mit einem UD-Wert von max. 1,3
                W/(m²·K).
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-[#329866] shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-[#222B20]">
                      KfW-Förderung (BEG EM)
                    </div>
                    <div className="text-sm text-[#6B7280]">
                      Bis zu 20% Zuschuss oder zinsgünstiger Kredit für
                      Einzelmaßnahmen
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-[#329866] shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-[#222B20]">
                      BAFA-Zuschuss
                    </div>
                    <div className="text-sm text-[#6B7280]">
                      Förderfähig im Rahmen der Bundesförderung für effiziente
                      Gebäude
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-[#329866] shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-[#222B20]">
                      Steuerliche Absetzung
                    </div>
                    <div className="text-sm text-[#6B7280]">
                      Alternativ bis zu 20% der Kosten über 3 Jahre steuerlich
                      absetzbar (§35c EStG)
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="#konfigurator"
                className="inline-flex items-center gap-2 bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Förderfähige Tür konfigurieren
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-[#E5E7EB] p-8">
              <h3 className="text-xl font-semibold text-[#222B20] mb-6">
                Fördervoraussetzungen
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-[12px]">
                  <span className="text-sm font-medium text-[#6B7280]">
                    Max. UD-Wert Haustür
                  </span>
                  <span className="text-sm font-bold text-[#329866]">
                    1,3 W/(m²·K)
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-[12px]">
                  <span className="text-sm font-medium text-[#6B7280]">
                    Planville Haustüren
                  </span>
                  <span className="text-sm font-bold text-[#329866]">
                    ab 0,80 W/(m²·K)
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-[12px]">
                  <span className="text-sm font-medium text-[#6B7280]">
                    Max. Zuschuss
                  </span>
                  <span className="text-sm font-bold text-[#329866]">
                    bis 20%
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-[12px]">
                  <span className="text-sm font-medium text-[#6B7280]">
                    Energieberater nötig?
                  </span>
                  <span className="text-sm font-bold text-[#329866]">
                    Wir beraten dich
                  </span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#329866]/10 rounded-[12px] border border-[#329866]/20">
                <div className="flex items-start gap-3">
                  <HandHelping size={20} className="text-[#329866] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#222B20]">
                    <span className="font-semibold">Planville hilft:</span> Wir
                    unterstützen dich bei der Antragstellung und beraten dich zu
                    den optimalen Fördermöglichkeiten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. INSTALLATION PROCESS (light bg) ── */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] leading-[44px] font-semibold text-[#222B20] mb-4">
              Dein Weg zur neuen Haustür
            </h2>
            <p className="text-base text-[#6B7280] max-w-2xl mx-auto">
              Von der ersten Idee bis zur fertigen Montage – wir begleiten dich
              durch den gesamten Prozess.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative text-center">
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-[#329866]/20" />
                  )}
                  <div className="w-16 h-16 bg-[#329866]/10 rounded-[16px] flex items-center justify-center mx-auto mb-4 relative z-10">
                    <Icon size={28} className="text-[#329866]" />
                  </div>
                  <div className="text-xs font-bold text-[#329866] mb-1 uppercase tracking-wide">
                    Schritt {s.step}
                  </div>
                  <h3 className="text-base font-semibold text-[#222B20] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 11. FAQ (white) ── */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] leading-[44px] font-semibold text-[#222B20] mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-base text-[#6B7280]">
              Finde Antworten auf die wichtigsten Fragen rund um Haustüren.
            </p>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ── 12. FINAL CTA (dark) ── */}
      <section className="py-20 bg-[#222B20] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[36px] leading-[44px] font-bold mb-4">
            Bereit für deine neue Haustür?
          </h2>
          <p className="text-base text-white/70 mb-8 max-w-2xl mx-auto">
            Starte jetzt mit der Konfiguration oder lass dich
            persönlich beraten. Unser Team steht dir jederzeit zur Verfügung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://planville.de/haustueren/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] px-8 py-4 rounded-full text-base font-semibold transition-colors"
            >
              Haustür konfigurieren
              <ArrowRight size={20} />
            </a>
            <a
              href="tel:+4924312345678"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white hover:text-[#222B20] transition-colors"
            >
              <Phone size={20} />
              Jetzt anrufen
            </a>
          </div>
          <div className="flex flex-wrap gap-6 justify-center text-sm text-white/50">
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#329866]" /> Kostenlose
              Beratung
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#329866]" />{" "}
              Unverbindliches Angebot
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#329866]" /> Antwort in
              24h
            </span>
          </div>
        </div>
      </section>

      {/* ── 13. NEWSLETTER (light bg) ── */}
      <section className="py-12 bg-[#FAFAFA] border-t border-[#E5E7EB]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-[#222B20] mb-2">
            Immer informiert bleiben
          </h3>
          <p className="text-sm text-[#6B7280] mb-6">
            Erhalte Neuigkeiten, Angebote und Tipps rund um Haustüren und
            Renovierung.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Deine E-Mail-Adresse"
              className="flex-1 px-4 py-3 rounded-[12px] border border-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#329866]/30 focus:border-[#329866] text-[#222B20]"
            />
            <button className="bg-[#FFA202] hover:bg-[#E68F00] text-[#222B20] px-6 py-3 rounded-full text-sm font-semibold transition-colors whitespace-nowrap">
              Anmelden
            </button>
          </div>
        </div>
      </section>

      {/* ── 14. FOOTER (dark) ── */}
      <footer className="bg-[#222B20] text-white/60 py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-white mb-4">
                Plan<span className="text-[#329866]">ville</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Dein Partner für hochwertige Haustüren, Fenster und
                Energielösungen in Erkelenz und Umgebung.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} />
                Erkelenz, NRW
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produkte</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Haustüren
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Fenster
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Photovoltaik
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Wärmepumpen
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Dachsanierung
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Service</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Konfigurator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Förderberatung
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Aufmaß-Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Montage
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#329866] transition-colors">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-[#329866]" />
                  02431 / 123 456 78
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-[#329866]" />
                  info@planville.de
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={14} className="text-[#329866]" />
                  Mo-Fr: 08:00 – 18:00
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Planville. Alle Rechte
              vorbehalten.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-[#329866] transition-colors">
                Impressum
              </a>
              <a href="#" className="hover:text-[#329866] transition-colors">
                Datenschutz
              </a>
              <a href="#" className="hover:text-[#329866] transition-colors">
                AGB
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
