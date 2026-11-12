import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

/* ---------- Helfer ---------- */
const rnd = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)] as T;
const round = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
const ggt = (a: number, b: number): number => (b === 0 ? a : ggt(b, a % b));

/* ---------- Aufgabentyp ---------- */
interface Question {
  topic: string;
  frage: string;
  note?: string;
  antwort: number;
  toleranz: number;
  einheit: string;
  zeit: number; // Sekunden
  hinweis?: string;
}

/* --- Stufe 1 --- */

const addSub1 = (): Question => {
  const b = rnd(12, 89), a = rnd(b + 10, b + 200), c = rnd(12, 99);
  const plus = Math.random() < 0.5;
  return {
    topic: plus ? "Addition" : "Subtraktion",
    frage: `${a} ${plus ? "+" : "−"} ${c} = ?`,
    antwort: plus ? a + c : a - c, toleranz: 0, einheit: "", zeit: 25,
  };
};

const mulDiv1 = (): Question => {
  if (Math.random() < 0.5) {
    const a = rnd(3, 12), b = rnd(3, 12);
    return { topic: "Multiplikation", frage: `${a} · ${b} = ?`, antwort: a * b, toleranz: 0, einheit: "", zeit: 20 };
  }
  const b = rnd(3, 12), antwort = rnd(3, 12);
  return { topic: "Division", frage: `${b * antwort} : ${b} = ?`, antwort, toleranz: 0, einheit: "", zeit: 20 };
};

const punktVorStrich1 = (): Question => {
  const b = rnd(3, 9), c = rnd(3, 9), a = rnd(10, 60);
  const plus = Math.random() < 0.5;
  return {
    topic: "Punkt vor Strich",
    frage: `${a} ${plus ? "+" : "−"} ${b} · ${c} = ?`,
    antwort: plus ? a + b * c : a - b * c, toleranz: 0, einheit: "", zeit: 30,
  };
};

const bruch1 = (): Question => {
  const d = pick([4, 6, 8, 10, 12]);
  const n1 = rnd(1, d - 2), n2 = rnd(1, d - n1);
  const g = ggt(n1 + n2, d);
  return {
    topic: "Brüche",
    frage: `${n1}/${d} + ${n2}/${d} = ?`,
    note: "gekürzt oder ungekürzt",
    antwort: (n1 + n2) / d, toleranz: 0.001, einheit: "", zeit: 35,
    hinweis: `z. B. ${(n1 + n2) / g}/${d / g} oder ${(n1 + n2)}/${d}`,
  };
};

const prozent1 = (): Question => {
  const p = pick([10, 20, 25, 50, 75]);
  const G = pick([200, 300, 400, 600, 800, 1200, 2400]);
  return { topic: "Prozentrechnung", frage: `Berechne ${p} % von ${G}.`, antwort: (G * p) / 100, toleranz: 0.01, einheit: "", zeit: 30 };
};

const flaeche1 = (): Question => {
  if (Math.random() < 0.5) {
    const a = rnd(4, 25), b = rnd(3, 20);
    return { topic: "Fläche", frage: `Ein Rechteck ist ${a} m lang und ${b} m breit. Wie groß ist die Fläche?`, antwort: a * b, toleranz: 0.01, einheit: "m²", zeit: 30 };
  }
  const g = rnd(4, 20), h = rnd(3, 15);
  return { topic: "Fläche", frage: `Ein Dreieck hat die Grundseite ${g} m und die Höhe ${h} m. Wie groß ist die Fläche?`, antwort: (g * h) / 2, toleranz: 0.01, einheit: "m²", zeit: 35 };
};

const dreisatz1 = (): Question => {
  const einheit = pick(["Ziegel", "Schrauben", "Bretter", "Dübel"]);
  const klein = rnd(2, 6), pro = rnd(8, 30), gesucht = rnd(20, 90);
  return {
    topic: "Dreisatz",
    frage: `${klein} Arbeiter brauchen für ${pro} ${einheit} eine Stunde. Wie viele ${einheit} schaffen ${gesucht} Arbeiter in einer Stunde?`,
    antwort: round((pro * gesucht) / klein, 2), toleranz: 0.5, einheit: "", zeit: 45,
  };
};

const bau1 = (): Question => {
  const varianten = [
    (): Question => {
      const reihen = rnd(4, 15), steine = rnd(8, 14);
      return { topic: "Baustelle", frage: `Eine Mauer hat ${reihen} Reihen mit je ${steine} Ziegel. Wie viele Ziegel sind es insgesamt?`, antwort: reihen * steine, toleranz: 0, einheit: "", zeit: 30 };
    },
    (): Question => {
      const lang = rnd(20, 80), breit = rnd(20, 60), hoehe = rnd(5, 25);
      return { topic: "Baustelle", frage: `Eine Mauer ist ${lang} cm lang, ${breit} cm breit und ${hoehe} cm hoch. Wie viele cm³ umfasst sie?`, antwort: lang * breit * hoehe, toleranz: 0, einheit: "cm³", zeit: 40 };
    },
    (): Question => {
      const stunden = rnd(3, 9), lohn = pick([12, 13, 14, 15]);
      return { topic: "Baustelle", frage: `Ein Hilfsarbeiter verdient ${lohn} € pro Stunde und arbeitet ${stunden} Stunden. Wie viel verdient er?`, antwort: stunden * lohn, toleranz: 0, einheit: "€", zeit: 30 };
    },
  ];
  return pick(varianten)();
};

/* --- Stufe 2 --- */

const addSub2 = (): Question => {
  const a = rnd(120, 2500), b = rnd(80, 900);
  const plus = Math.random() < 0.5;
  return { topic: plus ? "Addition" : "Subtraktion", frage: `${a} ${plus ? "+" : "−"} ${b} = ?`, antwort: plus ? a + b : a - b, toleranz: 0, einheit: "", zeit: 30 };
};

const mulDiv2 = (): Question => {
  if (Math.random() < 0.5) {
    const a = rnd(12, 25), b = rnd(11, 19);
    return { topic: "Multiplikation", frage: `${a} · ${b} = ?`, antwort: a * b, toleranz: 0, einheit: "", zeit: 35 };
  }
  const b = rnd(11, 25), antwort = rnd(11, 40);
  return { topic: "Division", frage: `${b * antwort} : ${b} = ?`, antwort, toleranz: 0, einheit: "", zeit: 35 };
};

const punktVorStrich2 = (): Question => {
  const varianten = [
    (): Question => {
      const a = rnd(3, 12), b = rnd(3, 12), c = rnd(10, 90), d = rnd(2, 9);
      return { topic: "Punkt vor Strich", frage: `${c} + ${a} · ${b} − ${d} = ?`, antwort: c + a * b - d, toleranz: 0, einheit: "", zeit: 40 };
    },
    (): Question => {
      const a = rnd(6, 25), b = rnd(3, 9), c = rnd(3, 9), d = rnd(2, 8);
      const antw = a - b * c + d;
      if (antw < 0) return punktVorStrich2();
      return { topic: "Punkt vor Strich", frage: `${a} − ${b} · ${c} + ${d} = ?`, antwort: antw, toleranz: 0, einheit: "", zeit: 40 };
    },
  ];
  return pick(varianten)();
};

const bruch2 = (): Question => {
  const varianten = [
    (): Question => {
      const d1 = pick([2, 3, 4, 6]);
      const d2 = pick([2, 3, 4, 6].filter((x) => x !== d1));
      const n1 = rnd(1, d1 - 1), n2 = rnd(1, d2 - 1);
      return { topic: "Brüche", frage: `${n1}/${d1} + ${n2}/${d2} = ?`, note: "Bruch oder Dezimal", antwort: round(n1 / d1 + n2 / d2, 3), toleranz: 0.01, einheit: "", zeit: 45 };
    },
    (): Question => {
      const n1 = rnd(1, 5), d1 = rnd(2, 9), n2 = rnd(1, 5), d2 = rnd(2, 9);
      return { topic: "Brüche", frage: `${n1}/${d1} · ${n2}/${d2} = ?`, note: "gekürzt oder Dezimal", antwort: round((n1 * n2) / (d1 * d2), 3), toleranz: 0.01, einheit: "", zeit: 45 };
    },
  ];
  return pick(varianten)();
};

const prozent2 = (): Question => {
  const varianten = [
    (): Question => {
      const p = pick([5, 12, 15, 18, 19, 24, 35, 60, 80]);
      const G = pick([250, 480, 640, 1250, 2450, 3800]);
      return { topic: "Prozentrechnung", frage: `Berechne ${p} % von ${G} €.`, antwort: round((G * p) / 100, 2), toleranz: 0.5, einheit: "€", zeit: 40 };
    },
    (): Question => {
      const preis = pick([80, 120, 250, 400, 640, 950]);
      const rabatt = pick([10, 15, 20, 25, 30]);
      return { topic: "Prozentrechnung", frage: `Material kostet ${preis} €. Du bekommst ${rabatt} % Rabatt. Was zahlst du?`, antwort: round(preis * (1 - rabatt / 100), 2), toleranz: 0.5, einheit: "€", zeit: 45 };
    },
    (): Question => {
      const netto = pick([100, 150, 240, 320, 500]);
      const mwst = pick([5, 7, 19]);
      return { topic: "Prozentrechnung", frage: `Ein Werkzeug kostet netto ${netto} €. Wie viel ist es mit ${mwst} % Mehrwertsteuer?`, antwort: round(netto * (1 + mwst / 100), 2), toleranz: 0.5, einheit: "€", zeit: 45 };
    },
  ];
  return pick(varianten)();
};

const dreisatz2 = (): Question => {
  const varianten = [
    (): Question => {
      const menge = rnd(3, 8), stunden = rnd(2, 6), gesucht = rnd(10, 40);
      return { topic: "Dreisatz", frage: `${menge} Maurer brauchen für eine Wand ${stunden} Stunden. Wie lange brauchen ${gesucht} Maurer?`, antwort: round((stunden * gesucht) / menge, 2), toleranz: 0.5, einheit: "h", zeit: 50 };
    },
    (): Question => {
      const kg = rnd(20, 60), preis = rnd(15, 45), gesucht = rnd(5, 15);
      const antw = round((preis * gesucht) / kg, 2);
      if (antw <= 0) return dreisatz2();
      return { topic: "Dreisatz", frage: `${kg} kg Mörtel kosten ${preis} €. Was kosten ${gesucht} kg?`, antwort: antw, toleranz: 0.5, einheit: "€", zeit: 50 };
    },
  ];
  return pick(varianten)();
};

const flaeche2 = (): Question => {
  const varianten = [
    (): Question => {
      const a = rnd(5, 18), b = rnd(3, 12), h = rnd(2, 9);
      return { topic: "Fläche", frage: `Ein Trapez hat die parallelen Seiten ${a} m und ${b} m sowie die Höhe ${h} m. Wie groß ist die Fläche?`, antwort: ((a + b) * h) / 2, toleranz: 0.01, einheit: "m²", zeit: 50 };
    },
    (): Question => {
      const r = rnd(2, 12);
      return { topic: "Fläche", frage: `Ein Kreis hat den Radius ${r} m. Wie groß ist die Fläche?`, note: "π ≈ 3,14, auf 1 m² gerundet", antwort: round(3.14 * r * r, 1), toleranz: 0.6, einheit: "m²", zeit: 50 };
    },
    (): Question => {
      const a = rnd(6, 20), b = rnd(4, 15);
      return { topic: "Fläche", frage: `Wie viel Meter Umfang hat ein Rechteck mit ${a} m und ${b} m Seitenlänge?`, antwort: 2 * (a + b), toleranz: 0.01, einheit: "m", zeit: 35 };
    },
  ];
  return pick(varianten)();
};

const volumen2 = (): Question => {
  const varianten = [
    (): Question => {
      const a = rnd(2, 9), b = rnd(2, 8), c = rnd(2, 10);
      return { topic: "Volumen", frage: `Ein Quader ist ${a} m lang, ${b} m breit und ${c} m hoch. Wie groß ist das Volumen?`, antwort: a * b * c, toleranz: 0.01, einheit: "m³", zeit: 40 };
    },
    (): Question => {
      const r = pick([1, 2, 3, 5, 10]), h = rnd(2, 12);
      return { topic: "Volumen", frage: `Ein Zylinder (Betonstütze) hat den Radius ${r} m und die Höhe ${h} m. Volumen?`, note: "π ≈ 3,14, auf 0,1 m³ gerundet", antwort: round(3.14 * r * r * h, 1), toleranz: 0.6, einheit: "m³", zeit: 55 };
    },
  ];
  return pick(varianten)();
};

const einheiten2 = (): Question => {
  const varianten = [
    (): Question => { const m = rnd(2, 15); return { topic: "Einheiten", frage: `${m} m = ? cm`, antwort: m * 100, toleranz: 0, einheit: "cm", zeit: 20 }; },
    (): Question => { const cm = rnd(200, 9500); return { topic: "Einheiten", frage: `${cm} cm = ? m`, antwort: cm / 100, toleranz: 0.001, einheit: "m", zeit: 25 }; },
    (): Question => { const t = rnd(1, 9); return { topic: "Einheiten", frage: `${t} t = ? kg`, antwort: t * 1000, toleranz: 0, einheit: "kg", zeit: 20 }; },
    (): Question => { const cm2 = pick([10000, 20000, 50000]); return { topic: "Einheiten", frage: `${cm2} cm² = ? m²`, antwort: cm2 / 10000, toleranz: 0.001, einheit: "m²", zeit: 30 }; },
  ];
  return pick(varianten)();
};

/* --- Stufe 3 --- */

const punktVorStrich3 = (): Question => {
  const varianten = [
    (): Question => {
      const a = rnd(5, 20), b = rnd(2, 9), c = rnd(2, 9), d = rnd(2, 6), e = rnd(10, 80);
      const antw = e + (a + b * c) / d;
      if (!Number.isInteger(antw * 10)) return punktVorStrich3();
      return { topic: "Terme", frage: `${e} + (${a} + ${b} · ${c}) : ${d} = ?`, antwort: round(antw, 2), toleranz: 0.01, einheit: "", zeit: 55 };
    },
    (): Question => {
      const a = rnd(6, 25), b = rnd(2, 8), c = rnd(3, 9), d = rnd(2, 7), e = rnd(2, 9);
      const antw = a * e - (b + c) * d;
      if (antw < 0) return punktVorStrich3();
      return { topic: "Terme", frage: `${a} · ${e} − (${b} + ${c}) · ${d} = ?`, antwort: antw, toleranz: 0, einheit: "", zeit: 55 };
    },
  ];
  return pick(varianten)();
};

const bruch3 = (): Question => {
  const varianten = [
    (): Question => {
      const n1 = rnd(1, 5), d1 = rnd(2, 9), n2 = rnd(1, 5), d2 = rnd(2, 9);
      return { topic: "Brüche", frage: `${n1}/${d1} : ${n2}/${d2} = ?`, note: "Bruch oder Dezimal", antwort: round((n1 * d2) / (d1 * n2), 3), toleranz: 0.01, einheit: "", zeit: 55 };
    },
    (): Question => {
      const d1 = pick([3, 4, 5, 6, 8, 10, 12]);
      const n1 = rnd(1, d1 - 1), n2 = rnd(1, d1 - 1);
      return { topic: "Brüche", frage: `Was ist ${n1}/${d1} von ${n2}/${d1}?`, note: "Bruch oder Dezimal", antwort: round((n1 / d1) * (n2 / d1), 3), toleranz: 0.01, einheit: "", zeit: 50 };
    },
  ];
  return pick(varianten)();
};

const prozent3 = (): Question => {
  const varianten = [
    (): Question => {
      const p = pick([15, 25, 40, 60, 75]);
      const anteil = p * rnd(2, 20);
      return { topic: "Prozentrechnung", frage: `${p} % einer Summe sind ${anteil} €. Wie hoch ist die Gesamtsumme?`, antwort: round((anteil * 100) / p, 2), toleranz: 1, einheit: "€", zeit: 55 };
    },
    (): Question => {
      const G = pick([200, 400, 800, 1200, 1600]);
      const p = pick([5, 15, 20, 30, 45]);
      const W = (G * p) / 100;
      return { topic: "Prozentrechnung", frage: `${W} € sind wie viel Prozent von ${G} €?`, note: "nur die Zahl", antwort: p, toleranz: 0.5, einheit: "%", zeit: 55 };
    },
    (): Question => {
      const alt = pick([800, 1200, 2400, 3600]);
      const steigerung = pick([10, 20, 25, 50]);
      return { topic: "Prozentrechnung", frage: `Ein Angebot liegt bei ${alt} € und wird um ${steigerung} % erhöht. Neuer Preis?`, antwort: round(alt * (1 + steigerung / 100), 2), toleranz: 1, einheit: "€", zeit: 50 };
    },
  ];
  return pick(varianten)();
};

const dreisatz3 = (): Question => {
  const varianten = [
    (): Question => {
      const leute = rnd(2, 6), tage = rnd(3, 12), gesucht = rnd(2, 8);
      return { topic: "Dreisatz", frage: `${leute} Zimmerleute brauchen ${tage} Tage für einen Dachstuhl. Wie lange brauchen ${gesucht} Zimmerleute?`, note: "antiproportional", antwort: round((leute * tage) / gesucht, 2), toleranz: 0.5, einheit: "Tage", zeit: 60 };
    },
    (): Question => {
      const mengen = rnd(2, 6), stunden = rnd(2, 6), gesucht = rnd(10, 40);
      return { topic: "Dreisatz", frage: `${mengen} Betonmischer schaffen in ${stunden} h eine bestimmte Menge. Wie lange brauchen ${gesucht} Mischer?`, note: "antiproportional", antwort: round((gesucht * stunden) / mengen, 2), toleranz: 0.5, einheit: "h", zeit: 60 };
    },
  ];
  return pick(varianten)();
};

const geometrie3 = (): Question => {
  const varianten = [
    (): Question => {
      const k = rnd(2, 12);
      return { topic: "Pythagoras", frage: `Ein Dachsparren: Die waagerechte Seite misst ${3 * k} m, die Höhe ${4 * k} m. Wie lang ist der Sparren?`, note: "auf 1 Nachkommastelle", antwort: round(5 * k, 1), toleranz: 0.2, einheit: "m", zeit: 60 };
    },
    (): Question => {
      const a = rnd(3, 9), b = rnd(2, 8), h = rnd(3, 10);
      return { topic: "Volumen", frage: `Eine Pyramide (Fundament) hat die Grundfläche ${a} m × ${b} m und die Höhe ${h} m. Volumen?`, antwort: round((a * b * h) / 3, 2), toleranz: 0.1, einheit: "m³", zeit: 60 };
    },
    (): Question => {
      const a = rnd(4, 12), h = rnd(3, 10);
      return { topic: "Volumen", frage: `Ein Prisma hat die Grundfläche ${a} m² und die Höhe ${h} m. Volumen?`, antwort: a * h, toleranz: 0.01, einheit: "m³", zeit: 40 };
    },
    (): Question => {
      const a = rnd(6, 15), b = rnd(4, 12), h = rnd(2, 8);
      return { topic: "Fläche", frage: `Berechne: ${a} m · ${b} m + ${a} m · ${h} m`, note: "Punkt vor Strich!", antwort: a * b + a * h, toleranz: 0.01, einheit: "m²", zeit: 45 };
    },
  ];
  return pick(varianten)();
};

const bauMisch3 = (): Question => {
  const varianten = [
    (): Question => {
      const zement = rnd(1, 5), sand = zement * pick([2, 3, 4]);
      const faktor = rnd(2, 8);
      return { topic: "Baustelle", frage: `Mörtel wird im Verhältnis ${zement} : ${sand} (Zement : Sand) gemischt. Wie viel Sand brauchst du für ${zement * faktor} Eimer Zement?`, antwort: sand * faktor, toleranz: 0, einheit: "Eimer", zeit: 50 };
    },
    (): Question => {
      const lang = rnd(6, 20), breit = rnd(4, 12), dick = pick([0.2, 0.25, 0.3]);
      return { topic: "Baustelle", frage: `Eine Bodenplatte ist ${lang} m × ${breit} m und ${dick} m dick. Wie viel m³ Beton brauchst du?`, antwort: round(lang * breit * dick, 2), toleranz: 0.05, einheit: "m³", zeit: 55 };
    },
    (): Question => {
      const stunden = rnd(30, 200), satz = rnd(18, 45);
      return { topic: "Baustelle", frage: `Ein Subunternehmer rechnet ${satz} € pro Stunde ab und war ${stunden} h auf der Baustelle. Rechnungsbetrag?`, antwort: stunden * satz, toleranz: 0, einheit: "€", zeit: 45 };
    },
  ];
  return pick(varianten)();
};

/* ---------- Niveau-Definitionen ---------- */
type Generator = () => Question;

const LEVELS: Record<number, Generator[]> = {
  1: [addSub1, mulDiv1, punktVorStrich1, bruch1, prozent1, flaeche1, dreisatz1, bau1],
  2: [addSub2, mulDiv2, punktVorStrich2, bruch2, prozent2, dreisatz2, flaeche2, volumen2, einheiten2],
  3: [punktVorStrich3, bruch3, prozent3, dreisatz3, geometrie3, bauMisch3, mulDiv2, volumen2],
};

const LEVEL_LABELS: Record<number, string> = {
  1: "Stufe 1 · 1. Lehrjahr",
  2: "Stufe 2 · 2. Lehrjahr",
  3: "Stufe 3 · 3. Lehrjahr",
};

/* ---------- Antwort-Parsing ---------- */
const parseAnswer = (raw: string): number | null => {
  const str = raw.trim().replace(/,/g, ".").replace(/€/g, "").replace(/\s/g, "");
  if (str === "") return null;
  const m = str.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
};

/* ---------- Komponente ---------- */
const Kopfrechnen = () => {
  const [level, setLevel] = useState(1);
  const [current, setCurrent] = useState<Question | null>(null);
  const [lastGen, setLastGen] = useState<Generator | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);
  const [stats, setStats] = useState({ score: 0, streak: 0, correct: 0, total: 0, timeSum: 0 });
  const [remainingPct, setRemainingPct] = useState(100);

  const deadlineRef = useRef(0);
  const totalMsRef = useRef(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastGenRef = useRef<Generator | null>(null);

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const next = useCallback((lvl: number) => {
    stopTimer();
    setFeedback(null);
    setShowAnswer(false);
    setLocked(false);
    setInputValue("");

    const gens = LEVELS[lvl];
    let gen = pick(gens);
    if (gens.length > 1) {
      let guard = 0;
      while (gen === lastGenRef.current && guard < 10) {
        gen = pick(gens);
        guard += 1;
      }
    }
    lastGenRef.current = gen;
    setCurrent(gen());

    totalMsRef.current = 0;
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (current === null) return;
    totalMsRef.current = current.zeit * 1000;
    deadlineRef.current = Date.now() + totalMsRef.current;
    setRemainingPct(100);
    timerRef.current = setInterval(() => {
      const remaining = deadlineRef.current - Date.now();
      setRemainingPct(Math.max(0, (remaining / totalMsRef.current) * 100));
      if (remaining <= 0) {
        finish(false, true);
      }
    }, 250);
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const finish = (ok: boolean, timeout = false) => {
    if (current === null || locked) return;
    stopTimer();
    const usedSec = round((totalMsRef.current - Math.max(0, deadlineRef.current - Date.now())) / 1000, 1);
    setLocked(true);

    setStats((s) => ({
      score: s.score + (ok ? level * 10 + (s.streak + 1 >= 3 ? 5 : 0) : 0),
      streak: ok ? s.streak + 1 : 0,
      correct: s.correct + (ok ? 1 : 0),
      total: s.total + 1,
      timeSum: s.timeSum + usedSec,
    }));

    if (ok) {
      const bonus = level * 10;
      setFeedback({ text: `✅ Richtig! (+${bonus} Punkte)`, ok: true });
    } else {
      setFeedback({
        text: timeout ? "⏰ Zeit abgelaufen!" : "❌ Leider falsch.",
        ok: false,
      });
    }
    setShowAnswer(true);
    setTimeout(() => next(level), ok ? 1200 : 2500);
  };

  const check = () => {
    if (current === null || locked) return;
    const val = parseAnswer(inputValue);
    if (val === null) {
      setFeedback({ text: "Bitte eine Zahl oder einen Bruch (z. B. 3/4) eingeben.", ok: false });
      return;
    }
    finish(Math.abs(val - current.antwort) <= (current.toleranz || 0));
  };

  const switchLevel = (lvl: number) => {
    setLevel(lvl);
    if (current !== null) next(lvl);
  };

  const running = current !== null;
  const timePct = Math.round(remainingPct);
  const avg = stats.total > 0 ? `${round(stats.timeSum / stats.total, 1)} s` : "–";

  return (
    <main className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center gap-4 p-4">
      <header className="w-full text-center">
        <h1 className="text-2xl font-semibold">🧱 Kopfrechnen für die Ausbildung</h1>
        <p className="text-sm text-neutral-500">
          Maurer &amp; Zimmerer · jederzeit umschaltbares Niveau · Zeit pro Aufgabe
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {[1, 2, 3].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => switchLevel(lvl)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                level === lvl
                  ? "border-amber-600 bg-amber-600 text-white"
                  : "border-amber-600 bg-white text-amber-700 hover:bg-amber-50"
              }`}
            >
              {LEVEL_LABELS[lvl]}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm">
          <span>Punkte: <b>{stats.score}</b></span>
          <span>Serie: <b>{stats.streak}</b></span>
          <span>
            Richtig: <b>{stats.correct}</b>/<b>{stats.total}</b>
          </span>
          <span>Ø Zeit: <b>{avg}</b></span>
        </div>
      </header>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className={`h-full rounded-full transition-[width] duration-250 ${
            timePct < 30 ? "bg-red-600" : "bg-amber-600"
          }`}
          style={{ width: running ? `${timePct}%` : "0%" }}
        />
      </div>

      <section className="w-full rounded-2xl bg-white p-6 text-center shadow-md">
        {current === null ? (
          <>
            <p className="text-lg">Drücke „Start“, um zu beginnen.</p>
            <button
              type="button"
              onClick={() => next(level)}
              className="mt-4 rounded-xl bg-amber-600 px-6 py-2.5 text-base font-semibold text-white hover:bg-amber-700"
            >
              Start
            </button>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              Stufe {level} · {current.topic}
            </p>
            <p className="mt-3 text-2xl leading-relaxed">
              {current.frage}
              {current.note ? (
                <span className="block text-base font-normal text-neutral-500">({current.note})</span>
              ) : null}
            </p>

            {showAnswer ? (
              <p className="mt-3 text-lg text-amber-700">
                Antwort: {current.antwort}
                {current.einheit ? ` ${current.einheit}` : ""}
                {current.hinweis ? ` · ${current.hinweis}` : ""}
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") check();
                  }}
                  disabled={locked}
                  inputMode="decimal"
                  placeholder="Ergebnis"
                  autoComplete="off"
                  className="w-48 rounded-xl border-2 border-neutral-300 px-4 py-2.5 text-center text-xl focus:border-amber-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={check}
                  disabled={locked}
                  className="rounded-xl bg-amber-600 px-6 py-2.5 text-base font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
                >
                  Prüfen
                </button>
              </div>
            )}

            <p
              className={`mt-3 min-h-7 text-base font-semibold ${
                feedback ? (feedback.ok ? "text-green-600" : "text-red-600") : ""
              }`}
            >
              {feedback?.text ?? ""}
            </p>

            {!locked ? (
              <button
                type="button"
                onClick={() => finish(false, true)}
                className="mt-2 text-sm text-neutral-500 underline"
              >
                Aufgabe überspringen
              </button>
            ) : null}

            <p className="mt-3 text-xs text-neutral-500">
              Tipp: Brüche als „3/4“ oder Dezimalzahl (z. B. 0,75) · Enter = Prüfen · Niveau jederzeit oben umschaltbar
            </p>
          </>
        )}
      </section>
    </main>
  );
};

export const Route = createFileRoute("/")({
  component: Kopfrechnen,
});
