import React, { useState, useEffect, useCallback } from "react";
import { GraduationCap, PlayCircle, RotateCcw, ClipboardCheck, type LucideIcon } from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════════
type Grade = 5 | 6;

type Route =
  | { view: "home" }
  | { view: "grade";  grade: Grade }
  | { view: "lesson"; grade: Grade; lessonId: string };

interface Feature { Icon: LucideIcon; line1: string; line2: string; href: string; }
interface Topic   { icon: string; title: string; desc: string; }
interface NavItem { label: string; href: string; }

interface Lesson {
  id:        string;
  title:     string;
  coverUrl?: string;
  videoUrl?: string;
  formula?:  string;
  theory?:   string;
  homework?: string[];
}
interface Chapter  { title: string; lessons: Lesson[]; }
interface GradeData { grade: Grade; chapters: Chapter[]; }

type WithVars = React.CSSProperties & { [key: `--${string}`]: string | number };

// ══════════════════════════════════════════════════════════════════════════
// STATIC DATA
// ══════════════════════════════════════════════════════════════════════════
const NAV_ITEMS: NavItem[] = [
  { label: "Жоба туралы", href: "#goal"   },
  { label: "5-сынып",     href: "#grade5" },
  { label: "6-сынып",     href: "#grade6" },
];

const FEATURES: Feature[] = [
  { Icon: GraduationCap,   line1: "5–6",   line2: "сыныптарға арналған", href: "#goal"   },
  { Icon: PlayCircle,      line1: "Қысқа", line2: "видеосабақтар",       href: "#grade5" },
  { Icon: RotateCcw,       line1: "Қайта", line2: "қарау мүмкіндігі",    href: "#grade6" },
  { Icon: ClipboardCheck,  line1: "Тапсырмалар", line2: "әр тақырыпта",  href: "#grade5" },
];

const TOPICS_5: Topic[] = [
  { icon: "½",   title: "Жай бөлшектер",   desc: "Жай бөлшектерді салыстыру, қысқарту және амалдар орындау" },
  { icon: "0.5", title: "Ондық бөлшектер", desc: "Ондық бөлшектерді оқу, жазу және есептерде қолдану"       },
  { icon: "%",   title: "Пайыз",            desc: "Пайызды табу, пайыз бойынша санды анықтау"                },
];

const TOPICS_6: Topic[] = [
  { icon: "∶",  title: "Қатынас және пропорция",  desc: "Қатынас, пропорция және олардың қасиеттері"             },
  { icon: "⊕",  title: "Координаталық жазықтық",  desc: "Нүктелерді белгілеу және координаталарын табу"          },
  { icon: "x²", title: "Өрнектер және теңдеулер", desc: "Қарапайым теңдеулерді шешу және өрнектерді түрлендіру"  },
];

// ══════════════════════════════════════════════════════════════════════════
// CURRICULUM DATA
// ══════════════════════════════════════════════════════════════════════════
const mkLesson = (id: string, title: string, coverUrl?: string): Lesson => ({
  id, title, coverUrl,
  formula:  "Бұл бөлім жақында толтырылады.",
  theory:   "Бұл бөлім жақында толтырылады.",
  homework: ["Бұл бөлім жақында толтырылады."],
});

const GRADES_DATA: GradeData[] = [
  {
    grade: 5,
    chapters: [
      {
        title: "Натурал сандар жиыны",
        lessons: [
          {
            id: "5-1-1",
            title: "Натурал сандарды оқу және жазу",
            coverUrl: "/covers/5-1-1.png",
            formula: "Разряд кестесі:\n бірліктер → ондықтар → жүздіктер → мыңдықтар\n\nМысал: 3 742 = 3 000 + 700 + 40 + 2\n           = 3 мың 7 жүз 4 он 2 бірлік",
            theory: "Натурал сандар — заттарды санауда қолданылатын оң бүтін сандар: 1, 2, 3, 4, ...\n\nСанды оқу үшін разрядтарға бөлеміз. Разрядтар оңнан солға қарай: бірліктер, ондықтар, жүздіктер, мыңдықтар, он мыңдықтар, жүз мыңдықтар.\n\nЖазу ережесі: үш разрядтан кейін бос орын қойылады.\nМысалдар: 1 000, 25 400, 3 000 000\n\n«5 034» санын оқу: «бес мың отыз төрт».\n«12 500» санын оқу: «он екі мың бес жүз».",
            homework: [
              "3 456 санын сөзбен жаз.",
              "«Он екі мың бес жүз» санын цифрмен жаз.",
              "Қай сан үлкен: 7 890 па, 7 908 пе? Неліктен?",
              "100 000 санын разрядтарға жіктеп жаз.",
            ],
          },
          mkLesson("5-1-2",  "Координаталық сәуле",            "/covers/5-1-2.png"),
          mkLesson("5-1-3",  "Сандарды салыстыру",             "/covers/5-1-3.png"),
          mkLesson("5-1-4",  "Қосу және азайту",               "/covers/5-1-4.png"),
          mkLesson("5-1-5",  "Көбейту және бөлу",              "/covers/5-1-5.png"),
          mkLesson("5-1-6",  "Амалдардың қасиеттері",          "/covers/5-1-6.png"),
          mkLesson("5-1-7",  "Санның квадраты және кубы",      "/covers/5-1-7.png"),
          mkLesson("5-1-8",  "Санды дәрежеге шығару",          "/covers/5-1-8.png"),
          mkLesson("5-1-9",  "Сандық және әріпті өрнектер",    "/covers/5-1-9.png"),
          mkLesson("5-1-10", "Формулалар",           "/covers/5-1-10.png"),
          mkLesson("5-1-11", "Теңдеулер",            "/covers/5-1-11.png"),
          mkLesson("5-1-12", "Мәтіндік есептер",     "/covers/5-1-12.png"),
        ],
      },
      {
        title: "Бөлінгіштік және жай бөлшектер",
        lessons: [
          mkLesson("5-2-1",  "Бөлгіштер мен еселіктер", "/covers/5-2-1.png"),
          mkLesson("5-2-2",  "Жай және құрама сандар"),
          mkLesson("5-2-3",  "Жай көбейткіштерге жіктеу"),
          mkLesson("5-2-4",  "2, 3, 5, 9, 10 сандарына бөліну белгілері"),
          mkLesson("5-2-5",  "Ең үлкен ортақ бөлгіш (ЕҮОБ)"),
          mkLesson("5-2-6",  "Ең кіші ортақ еселік (ЕКОЕ)"),
          mkLesson("5-2-7",  "Жай бөлшек ұғымы"),
          mkLesson("5-2-8",  "Бөлшектің негізгі қасиеті"),
          mkLesson("5-2-9",  "Дұрыс және бұрыс бөлшектер"),
          mkLesson("5-2-10", "Аралас сандар"),
          mkLesson("5-2-11", "Бөлшектерді салыстыру"),
          mkLesson("5-2-12", "Бөлшектерді қосу және азайту"),
        ],
      },
    ],
  },
  {
    grade: 6,
    chapters: [
      {
        title: "I тоқсан",
        lessons: [
          mkLesson("6-1-1",  "Қатынас ұғымы"),
          mkLesson("6-1-2",  "Пропорция"),
          mkLesson("6-1-3",  "Пропорцияның негізгі қасиеті"),
          mkLesson("6-1-4",  "Масштаб"),
          mkLesson("6-1-5",  "Санның пайызын табу"),
          mkLesson("6-1-6",  "Пайызы бойынша санды табу"),
          mkLesson("6-1-7",  "Теріс сандар туралы түсінік"),
          mkLesson("6-1-8",  "Координаталық түзу"),
          mkLesson("6-1-9",  "Рационал сандар"),
          mkLesson("6-1-10", "Қарама-қарсы сандар"),
          mkLesson("6-1-11", "Санның модулі"),
          mkLesson("6-1-12", "Рационал сандарды салыстыру"),
        ],
      },
      {
        title: "II тоқсан",
        lessons: [
          mkLesson("6-2-1",  "Рационал сандарға амалдар қолдану"),
          mkLesson("6-2-2",  "Рационал сандарды қосу"),
          mkLesson("6-2-3",  "Рационал сандарды азайту"),
          mkLesson("6-2-4",  "Рационал сандарды көбейту"),
          mkLesson("6-2-5",  "Рационал сандарды бөлу"),
          mkLesson("6-2-6",  "Рационал сандарды дәрежелеу"),
          mkLesson("6-2-7",  "Амалдардың қасиеттері"),
          mkLesson("6-2-8",  "Сандық өрнектер"),
          mkLesson("6-2-9",  "Әріпті өрнектер"),
          mkLesson("6-2-10", "Теңдеулер"),
          mkLesson("6-2-11", "Мәтіндік есептер"),
        ],
      },
    ],
  },
];

const findLessonAndChapter = (
  grade: Grade,
  lessonId: string,
): { lesson: Lesson; chapter: Chapter } | null => {
  const gd = GRADES_DATA.find((g) => g.grade === grade);
  if (!gd) return null;
  for (const chapter of gd.chapters) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, chapter };
  }
  return null;
};

// ══════════════════════════════════════════════════════════════════════════
// HOME PAGE SUB-COMPONENTS
// ══════════════════════════════════════════════════════════════════════════
interface SectionHeadProps { tag: string; title: string; sub?: string; }

const SectionHead: React.FC<SectionHeadProps> = ({ tag, title, sub }) => (
  <div className="me-section-head">
    <span className="me-tag">{tag}</span>
    <h2 className="me-section-title">{title}</h2>
    {sub && <p className="me-section-sub">{sub}</p>}
  </div>
);

const FeatureCard: React.FC<{ feature: Feature; onClick: () => void }> = ({ feature, onClick }) => (
  <button className="me-feature-card" onClick={onClick}>
    <div className="me-feature-icon">
      <feature.Icon size={24} strokeWidth={2} />
    </div>
    <p className="me-feature-text">
      <strong>{feature.line1}</strong><br />{feature.line2}
    </p>
  </button>
);

const TopicCard: React.FC<{ topic: Topic; delay: number; onLinkClick: () => void }> = ({ topic, delay, onLinkClick }) => {
  const style: WithVars = { "--delay": `${delay}ms` };
  return (
    <div className="me-topic-card me-fade-in" style={style}>
      <div className="me-topic-icon">{topic.icon}</div>
      <h3 className="me-topic-title">{topic.title}</h3>
      <p className="me-topic-desc">{topic.desc}</p>
      <button className="me-topic-link" onClick={onLinkClick}>
        Тізімге өту →
      </button>
    </div>
  );
};

const LessonCard: React.FC<{ lesson: Lesson; num: number; delay: number; onClick: () => void }> = ({ lesson, num, delay, onClick }) => {
  const style: WithVars = { "--delay": `${delay}ms` };
  return (
    <button className="me-lesson-card me-fade-in" style={style} onClick={onClick}>
      <div className="me-lesson-cover">
        {lesson.coverUrl
          ? <img src={lesson.coverUrl} alt="" className="me-lesson-cover-img" />
          : <div className="me-lesson-cover-ph">
              <span>{num}</span>
            </div>
        }
      </div>
      <div className="me-lesson-body">
        <h3 className="me-lesson-card-title">{lesson.title}</h3>
        <span className="me-lesson-cta">Оқу →</span>
      </div>
    </button>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// GRADE VIEW
// ══════════════════════════════════════════════════════════════════════════
interface GradeViewProps {
  gradeData:      GradeData;
  onLessonSelect: (lesson: Lesson) => void;
  onBack:         () => void;
}

const GradeView: React.FC<GradeViewProps> = ({ gradeData, onLessonSelect, onBack }) => {
  const totalLessons = gradeData.chapters.reduce((s, ch) => s + ch.lessons.length, 0);

  // running lesson counter across chapters
  let lessonCounter = 0;

  return (
    <main className="me-grade-view me-page">
      <div className="me-container">
        <button className="me-back-btn" onClick={onBack}>← Басты бетке</button>

        <div className="me-grade-header">
          <h1 className="me-grade-title">{gradeData.grade}-сынып тақырыптары</h1>
          <p className="me-grade-sub">
            {gradeData.chapters.length} бөлім · {totalLessons} тақырып
          </p>
        </div>

        {gradeData.chapters.map((chapter, ci) => {
          const chapterStart = lessonCounter;
          lessonCounter += chapter.lessons.length;
          return (
            <div key={chapter.title} className="me-chapter">
              <div className="me-chapter-head">
                <div className="me-chapter-num">{ci + 1}</div>
                <h2 className="me-chapter-title">{chapter.title}</h2>
              </div>
              <div className="me-cards-grid">
                {chapter.lessons.map((lesson, li) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    num={chapterStart + li + 1}
                    delay={li * 50}
                    onClick={() => onLessonSelect(lesson)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// LESSON VIEW
// ══════════════════════════════════════════════════════════════════════════
interface LessonViewProps {
  lesson:  Lesson;
  chapter: Chapter;
  grade:   Grade;
  onBack:  () => void;
}

interface LsSection {
  key:   string;
  icon:  string;
  label: string;
  body:  React.ReactNode;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, chapter, grade, onBack }) => {
  const sections: LsSection[] = [
    {
      key: "video",
      icon: "🎬",
      label: "Видеосабақ",
      body: lesson.videoUrl ? (
        <iframe
          className="me-video-iframe"
          src={lesson.videoUrl}
          title={lesson.title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <div className="me-video-stub">
          <div className="me-video-stub-play">▶</div>
          <span>Видео жақында қосылады</span>
        </div>
      ),
    },
    ...(lesson.formula ? [{
      key: "formula",
      icon: "📐",
      label: "Формула",
      body: <div className="me-formula-block">{lesson.formula}</div>,
    }] : []),
    ...(lesson.theory ? [{
      key: "theory",
      icon: "📖",
      label: "Тақырып",
      body: <p className="me-theory-text">{lesson.theory}</p>,
    }] : []),
    ...((lesson.homework && lesson.homework.length > 0) ? [{
      key: "hw",
      icon: "✏️",
      label: "Үй тапсырмасы",
      body: (
        <ul className="me-hw-list">
          {lesson.homework!.map((hw, i) => (
            <li key={i} className="me-hw-item">
              <div className="me-hw-num">{i + 1}</div>
              <span className="me-hw-text">{hw}</span>
            </li>
          ))}
        </ul>
      ),
    }] : []),
  ];

  return (
    <main className="me-page">
      <div className="me-container">
        <button className="me-back-btn" onClick={onBack}>← Артқа</button>

        <div className="me-lesson-header">
          <p className="me-lesson-grade-label">
            {grade}-сынып · {chapter.title}
          </p>
          <h1 className="me-lesson-title-big">{lesson.title}</h1>
        </div>

        {sections.map((sec) => (
          <div key={sec.key} className="me-lesson-section">
            <div className="me-ls-head">
              <div className="me-ls-icon">{sec.icon}</div>
              <span className="me-ls-label">{sec.label}</span>
            </div>
            {sec.body}
          </div>
        ))}
      </div>
    </main>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// STYLES  —  Indigo Fresh palette
// ══════════════════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700;900&family=Nunito:wght@400;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --primary:      #4F46E5;
  --primary-dark: #4338CA;
  --primary-soft: #EEF0FF;
  --primary-line: #C7C3F5;
  --success:      #10B981;
  --accent:       #F59E0B;
  --ink:          #1E1B4B;
  --ink-soft:     #5B5B7A;
  --bg:           #FFFFFF;
  --card:         #FFFFFF;
  --line:         #E8E8F2;
  --radius:       20px;
}

html { scroll-behavior: smooth; overflow-x: hidden; }
body { overflow-x: hidden; background: #FFFFFF; }

.me-wrap {
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
  background: var(--bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
}
.me-wrap > main { flex: 1; }

/* единый горизонтальный контейнер — одна сетка на всех страницах */
.me-container {
  max-width: 1180px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

/* ═══════════════════════════════════════
   HEADER
═══════════════════════════════════════ */
.me-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background: rgba(248, 250, 252, .92);
  border-bottom: 1px solid var(--line);
}
.me-header-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.me-logo {
  display: flex;
  align-items: center;
  color: inherit;
  flex-shrink: 0;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
}
.me-logo-main {
  font-family: 'Rubik', sans-serif;
  font-weight: 900;
  font-size: clamp(1.15rem, 4vw, 1.45rem);
  letter-spacing: -.5px;
  color: var(--ink);
}
.me-logo-dot { color: var(--primary); }

.me-nav { display: flex; gap: .05rem; list-style: none; }
.me-nav a {
  text-decoration: none;
  color: var(--ink-soft);
  font-size: .85rem;
  font-weight: 700;
  padding: .4rem .7rem;
  border-radius: 10px;
  transition: background .18s, color .18s;
  white-space: nowrap;
  cursor: pointer;
}
.me-nav a:hover { background: var(--primary-soft); color: var(--primary); }

.me-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 44px; height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  flex-shrink: 0;
  transition: background .18s;
}
.me-burger:hover { background: var(--primary-soft); }
.me-burger span {
  display: block;
  width: 22px; height: 2.5px;
  background: var(--ink);
  border-radius: 2px;
}

@media (max-width: 768px) {
  .me-nav    { display: none; }
  .me-burger { display: flex; }
}

/* ═══════════════════════════════════════
   DRAWER
═══════════════════════════════════════ */
.me-backdrop {
  position: fixed; inset: 0;
  background: rgba(30, 27, 75, .4);
  z-index: 199;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease;
}
.me-backdrop.me-open { opacity: 1; pointer-events: auto; }

.me-drawer {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: min(80vw, 300px);
  background: var(--card);
  z-index: 200;
  transform: translateX(100%);
  transition: transform .3s cubic-bezier(.4, 0, .2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 40px rgba(30, 27, 75, .14);
  overflow-y: auto;
}
.me-drawer.me-open { transform: translateX(0); }

.me-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--line);
  min-height: 64px;
  flex-shrink: 0;
}
.me-drawer-logo {
  font-family: 'Rubik', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  color: var(--ink);
  letter-spacing: -.3px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
.me-drawer-close {
  width: 44px; height: 44px;
  border: none;
  background: var(--primary-soft);
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: background .18s;
}
.me-drawer-close:hover { background: var(--primary-line); }

.me-drawer-nav { display: flex; flex-direction: column; padding: .75rem; gap: .2rem; flex: 1; }
.me-drawer-nav a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--ink);
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  padding: .85rem 1rem;
  border-radius: 14px;
  min-height: 52px;
  transition: background .18s, color .18s;
  cursor: pointer;
}
.me-drawer-nav a:hover { background: var(--primary-soft); color: var(--primary); }

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
.me-hero-wrap { position: relative; overflow: hidden; }

.me-blob { display: none; }

.me-hero {
  padding: 4rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}
@media (max-width: 900px) { .me-hero { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 0; } }

.me-hero-title {
  font-family: 'Rubik', sans-serif;
  font-weight: 900;
  font-size: clamp(1.55rem, 4.5vw, 2.75rem);
  line-height: 1.18;
  margin-bottom: 1.1rem;
  color: var(--ink);
}
.me-hero-keyword { color: var(--primary); }

.me-hero-desc {
  color: var(--ink-soft);
  font-size: clamp(.9rem, 2.5vw, 1rem);
  line-height: 1.72;
  margin-bottom: 1.8rem;
}
.me-hero-btns { display: flex; gap: .85rem; flex-wrap: wrap; }

/* Primary button */
.me-btn-dark {
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: .78rem 1.55rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: .95rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  min-height: 48px;
  transition: background .2s, transform .2s, box-shadow .2s;
}
.me-btn-dark:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 8px 22px rgba(79,70,229,.28); }

/* Secondary / outline button */
.me-btn-light {
  background: transparent;
  color: var(--primary);
  border: 1.5px solid var(--primary-line);
  border-radius: 12px;
  padding: .78rem 1.55rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: .95rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  transition: background .2s, border-color .2s;
}
.me-btn-light:hover { background: var(--primary-soft); border-color: var(--primary); }

/* Feature grid */
.me-features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: stretch; }
.me-feature-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 1.1rem 1rem;
  display: flex;
  align-items: center;
  gap: .8rem;
  box-shadow: 0 2px 12px rgba(30, 27, 75, .07);
  border: 1px solid var(--line);
  transition: transform .22s, box-shadow .22s;
  height: 100%;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
}
.me-feature-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(79,70,229,.12); }
.me-feature-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  background: var(--primary-soft);
  color: var(--primary);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; min-width: 48px;
}
.me-feature-text { font-size: .82rem; line-height: 1.35; color: var(--ink); min-width: 0; }
.me-feature-text strong { font-size: 1rem; display: block; font-family: 'Rubik', sans-serif; font-weight: 700; }
@media (max-width: 380px) {
  .me-feature-card { padding: .85rem .7rem; gap: .6rem; }
  .me-feature-icon { width: 40px; height: 40px; min-width: 40px; font-size: 1rem; }
  .me-feature-text { font-size: .75rem; }
}

/* ═══════════════════════════════════════
   GOAL SECTION
═══════════════════════════════════════ */
.me-goal { padding: 2.5rem 0; }
.me-goal-box {
  background: var(--ink);
  border-radius: 28px;
  padding: clamp(1.6rem, 3.5vw, 2.6rem) clamp(1.5rem, 4vw, 3rem);
  position: relative;
  overflow: hidden;
}
.me-goal-inner { max-width: 720px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
.me-goal-blob-1 { position: absolute; width: 260px; height: 260px; border-radius: 50%; background: var(--primary); opacity: .15; filter: blur(60px); top: -80px; left: -40px; pointer-events: none; }
.me-goal-blob-2 { position: absolute; width: 200px; height: 200px; border-radius: 50%; background: var(--success); opacity: .12; filter: blur(55px); bottom: -60px; right: 5%; pointer-events: none; }
.me-goal-box h2 {
  font-family: 'Rubik', sans-serif; font-weight: 800;
  font-size: clamp(1.3rem, 4vw, 2.1rem);
  color: #fff; margin-bottom: 1.1rem;
}
.me-goal-text { color: rgba(255,255,255,.72); font-size: clamp(.9rem, 2.5vw, 1rem); line-height: 1.82; max-width: 720px; margin: 0 auto; }
@media (max-width: 768px) { .me-goal-box { border-radius: 18px; } }

/* ═══════════════════════════════════════
   SHARED SECTION LAYOUT
═══════════════════════════════════════ */
.me-section { padding-top: 4rem; padding-bottom: 4rem; }
.me-section-head { text-align: left; margin-bottom: 2rem; }
.me-tag {
  display: inline-block;
  font-size: .73rem; font-weight: 700;
  padding: .28rem .85rem; border-radius: 50px; margin-bottom: .75rem;
  letter-spacing: .06em; text-transform: uppercase;
  background: var(--primary-soft); color: var(--primary);
}
.me-section-title { font-family: 'Rubik', sans-serif; font-weight: 800; font-size: clamp(1.3rem, 4vw, 2.1rem); color: var(--ink); margin-bottom: .55rem; }
.me-section-sub   { color: var(--ink-soft); font-size: clamp(.85rem, 2.5vw, .95rem); line-height: 1.65; }

/* Cards grid */
.me-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; align-items: stretch; }
@media (max-width: 900px) { .me-cards-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 540px) { .me-cards-grid { grid-template-columns: 1fr; gap: 1rem; } }

/* Topic card — uniform primary style */
.me-topic-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 1.6rem 1.4rem;
  box-shadow: 0 2px 12px rgba(30, 27, 75, .07);
  border: 1px solid var(--line);
  overflow: hidden;
  position: relative;
  display: flex; flex-direction: column; gap: .72rem;
  transition: transform .22s, box-shadow .22s;
}
.me-topic-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  background: var(--primary);
}
.me-topic-card:hover { transform: translateY(-5px); box-shadow: 0 10px 28px rgba(79,70,229,.14); }
.me-topic-icon {
  width: 48px; height: 48px;
  background: var(--primary-soft); color: var(--primary);
  border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; font-weight: 800; font-family: 'Rubik', sans-serif;
  line-height: 1; letter-spacing: -.02em; flex-shrink: 0;
}
.me-topic-title { font-family: 'Rubik', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--ink); }
.me-topic-desc  { color: var(--ink-soft); font-size: .88rem; line-height: 1.58; flex: 1; }
.me-topic-link {
  color: var(--primary);
  font-weight: 700; font-size: .85rem;
  background: none; border: none; cursor: pointer; padding: 0;
  display: inline-flex; align-items: center; gap: .3rem;
  margin-top: auto; padding-top: .5rem;
  min-height: 44px; align-self: flex-start; font-family: inherit;
  transition: gap .18s;
}
.me-topic-link:hover { gap: .6rem; }

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
.me-footer {
  background: var(--ink); color: rgba(255,255,255,.5);
  text-align: center; padding: 2.2rem 24px; font-size: .88rem;
}
.me-footer-logo {
  font-family: 'Rubik', sans-serif; font-weight: 900; font-size: 1.25rem;
  color: #fff; margin-bottom: .55rem; letter-spacing: -.3px;
}

/* Fade animation */
@keyframes me-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.me-fade-in {
  opacity: 0;
  animation: me-fade-up .55s ease forwards;
  animation-delay: var(--delay, 0ms);
}
@media (max-width: 768px) { .me-fade-in { animation-duration: .4s; } }

/* ═══════════════════════════════════════
   PAGE WRAPPER — одинаковый на всех страницах
═══════════════════════════════════════ */
.me-page {
  flex: 1;
  padding-top: 48px;
  padding-bottom: 48px;
}

/* ═══════════════════════════════════════
   BACK BUTTON
═══════════════════════════════════════ */
.me-back-btn {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  background: var(--primary-soft);
  color: var(--primary);
  border: none;
  border-radius: 12px;
  padding: .6rem 1.2rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: .92rem;
  cursor: pointer;
  min-height: 44px;
  transition: background .18s;
  margin-bottom: 2rem;
}
.me-back-btn:hover { background: var(--primary-line); }

/* ═══════════════════════════════════════
   GRADE VIEW
═══════════════════════════════════════ */
.me-grade-view { /* flex и вертикальный padding — через .me-page */ }
.me-grade-header { margin-bottom: 2.4rem; }
.me-grade-title {
  font-family: 'Rubik', sans-serif; font-weight: 900;
  font-size: clamp(1.5rem, 4vw, 2.3rem);
  color: var(--ink);
  margin: .6rem 0 .4rem;
  line-height: 1.18;
}
.me-grade-sub { color: var(--ink-soft); font-size: .92rem; }

.me-chapter { margin-bottom: 2.5rem; }
.me-chapter-head {
  display: flex; align-items: center; gap: .8rem;
  margin-bottom: 1rem;
  padding-bottom: .8rem;
  border-bottom: 2px solid var(--line);
}
.me-chapter-num {
  width: 34px; height: 34px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rubik', sans-serif; font-weight: 700; font-size: .85rem;
  flex-shrink: 0;
  background: var(--primary-soft); color: var(--primary);
}
.me-chapter-title { font-family: 'Rubik', sans-serif; font-weight: 700; font-size: 1.1rem; color: var(--ink); }

.me-lesson-card {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: 0 2px 12px rgba(30,27,75,.07);
  border: 1px solid var(--line);
  overflow: hidden;
  display: flex; flex-direction: column;
  cursor: pointer; text-align: left;
  font-family: inherit; width: 100%;
  transition: transform .22s, box-shadow .22s;
}
.me-lesson-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(79,70,229,.13);
}
.me-lesson-cover {
  width: 100%; aspect-ratio: 3 / 2; flex-shrink: 0; overflow: hidden;
}
.me-lesson-cover-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.me-lesson-cover-ph {
  width: 100%; height: 100%;
  background: var(--primary-soft);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rubik', sans-serif; font-weight: 900;
  font-size: 3.8rem; color: var(--primary); opacity: .4;
}
.me-lesson-body {
  padding: .9rem 1.1rem 1rem;
  display: flex; flex-direction: column; gap: .45rem; flex: 1;
}
.me-lesson-card-title {
  font-family: 'Rubik', sans-serif; font-weight: 700;
  font-size: .95rem; color: var(--ink); line-height: 1.35; flex: 1;
}
.me-lesson-cta {
  color: var(--primary); font-weight: 700; font-size: .83rem;
  margin-top: auto; padding-top: .4rem; display: block;
  font-family: inherit;
}

/* ═══════════════════════════════════════
   LESSON VIEW
═══════════════════════════════════════ */
.me-lesson-view { /* убрано: flex и padding — через .me-page + .me-container */ }
.me-lesson-header { margin-bottom: 2rem; }
.me-lesson-grade-label {
  font-size: .78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: .06em;
  margin-bottom: .55rem;
  color: var(--primary);
}
.me-lesson-title-big {
  font-family: 'Rubik', sans-serif; font-weight: 900;
  font-size: clamp(1.4rem, 4vw, 2rem);
  color: var(--ink); line-height: 1.2;
}

.me-lesson-section {
  background: var(--card);
  border-radius: var(--radius);
  padding: 1.5rem 1.6rem;
  box-shadow: 0 2px 12px rgba(30, 27, 75, .07);
  border: 1px solid var(--line);
  margin-bottom: 1.2rem;
}
.me-ls-head { display: flex; align-items: center; gap: .7rem; margin-bottom: 1.1rem; }
.me-ls-icon {
  width: 38px; height: 38px; border-radius: 11px;
  background: var(--primary-soft); color: var(--primary);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.05rem; flex-shrink: 0;
}
.me-ls-label { font-family: 'Rubik', sans-serif; font-weight: 700; font-size: 1rem; color: var(--ink); }

.me-video-stub {
  width: 100%; aspect-ratio: 16 / 9;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--ink), #2D2B6B);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: .85rem; color: rgba(255,255,255,.6); font-size: .9rem; font-weight: 600; overflow: hidden;
}
.me-video-stub-play {
  width: 62px; height: 62px; border-radius: 50%;
  background: rgba(255,255,255,.1);
  border: 2px solid rgba(255,255,255,.28);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; padding-left: 4px;
}
.me-video-iframe {
  width: 100%; aspect-ratio: 16 / 9;
  border-radius: 14px; border: none; display: block;
}

.me-formula-block {
  background: var(--primary-soft);
  border-radius: 13px;
  padding: 1.1rem 1.3rem;
  font-family: 'Rubik', sans-serif; font-size: 1.05rem;
  color: var(--ink);
  border-left: 3px solid var(--primary);
  line-height: 1.7;
}

.me-theory-text { color: var(--ink-soft); font-size: .97rem; line-height: 1.8; }

.me-hw-list { list-style: none; display: flex; flex-direction: column; gap: .6rem; }
.me-hw-item {
  display: flex; align-items: flex-start; gap: .75rem;
  background: var(--bg); border-radius: 12px; padding: .8rem 1rem;
  border: 1px solid var(--line);
}
.me-hw-num {
  width: 26px; height: 26px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rubik', sans-serif; font-weight: 700; font-size: .78rem;
  flex-shrink: 0; margin-top: .1rem;
  background: var(--primary-soft); color: var(--primary);
}
.me-hw-text { font-size: .92rem; color: var(--ink); line-height: 1.55; flex: 1; }

/* ═══════════════════════════════════════
   GLOBAL SAFETY
═══════════════════════════════════════ */
img { max-width: 100%; height: auto; }
iframe { max-width: 100%; }

/* Формулы с переносами строк (\n в данных) */
.me-formula-block {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
}
.me-theory-text   { overflow-wrap: break-word; word-break: break-word; }
.me-hw-text       { overflow-wrap: break-word; word-break: break-word; }
.me-lesson-title-big { overflow-wrap: break-word; word-break: break-word; }

/* ═══════════════════════════════════════
   MOBILE ≤768px — все страницы
═══════════════════════════════════════ */
@media (max-width: 768px) {
  /* Единый контейнер: 16px боковых отступов */
  .me-container     { padding-left: 16px; padding-right: 16px; }
  .me-header-inner  { padding-left: 16px; padding-right: 16px; }
  .me-footer        { padding-left: 16px; padding-right: 16px; }

  /* Page wrapper: меньше вертикального воздуха */
  .me-page { padding-top: 24px; padding-bottom: 32px; }

  /* Hero: меньше воздуха */
  .me-hero { padding-top: 2rem; padding-bottom: 1.5rem; gap: 1.5rem; }
  .me-hero-desc { margin-bottom: 1.2rem; }

  /* Goal: компактнее */
  .me-goal { padding-top: 1.5rem; padding-bottom: 1.5rem; }

  /* Sections — только вертикаль */
  .me-section { padding-top: 2.5rem; padding-bottom: 2.5rem; }
  .me-section-head { margin-bottom: 1.2rem; }

  /* Grade view: отступы внутри */
  .me-grade-header { margin-bottom: 1.4rem; }
  .me-back-btn     { margin-bottom: 1.2rem; }
  .me-chapter      { margin-bottom: 1.8rem; }
  .me-chapter-head { margin-bottom: .75rem; }

  /* Lesson view: отступы внутри */
  .me-lesson-section { padding: 1rem; }
  .me-lesson-header  { margin-bottom: 1.4rem; }
  .me-formula-block  { font-size: .91rem; }
}

/* ═══════════════════════════════════════
   MOBILE ≤540px — одна колонка везде
═══════════════════════════════════════ */
@media (max-width: 540px) {
  /* Feature cards hero → 1 колонка */
  .me-features-grid { grid-template-columns: 1fr; gap: .75rem; }

  /* Кнопки hero во всю ширину чуть раньше */
  .me-hero-btns  { flex-direction: column; gap: .65rem; }
  .me-btn-dark,
  .me-btn-light  { width: 100%; }
}
`;

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
const MathEdu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [route,    setRoute   ] = useState<Route>({ view: "home" });

  const navigate = useCallback((r: Route) => {
    setRoute(r);
    window.scrollTo(0, 0);
  }, []);

  const openHome   = useCallback(() => navigate({ view: "home" }),                          [navigate]);
  const openGrade  = useCallback((g: Grade) => navigate({ view: "grade", grade: g }),       [navigate]);
  const openLesson = useCallback(
    (grade: Grade, lessonId: string) => navigate({ view: "lesson", grade, lessonId }),
    [navigate],
  );

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#grade5" || href === "#grade6") {
      e.preventDefault();
      openGrade(href === "#grade5" ? 5 : 6);
    } else if (route.view !== "home") {
      e.preventDefault();
      openHome();
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  };

  const handleDrawerClick = (href: string) => {
    closeMenu();
    setTimeout(() => {
      if (href === "#grade5" || href === "#grade6") {
        openGrade(href === "#grade5" ? 5 : 6);
      } else {
        if (route.view !== "home") {
          openHome();
          setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 120);
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 340);
  };

  const lessonCtx = route.view === "lesson"
    ? findLessonAndChapter(route.grade, route.lessonId)
    : null;

  const gradeData = (route.view === "grade" || route.view === "lesson")
    ? GRADES_DATA.find((g) => g.grade === route.grade) ?? null
    : null;

  return (
    <div className="me-wrap">
      <style>{CSS}</style>

      {/* Backdrop */}
      <div
        className={`me-backdrop${menuOpen ? " me-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className={`me-drawer${menuOpen ? " me-open" : ""}`}
        role="dialog"
        aria-label="Навигация мәзірі"
        aria-modal="true"
      >
        <div className="me-drawer-head">
          <button className="me-drawer-logo" onClick={() => { closeMenu(); openHome(); }}>
            Math<span style={{ color: "var(--primary)" }}>.</span>Edu
          </button>
          <button className="me-drawer-close" onClick={closeMenu} aria-label="Жабу">✕</button>
        </div>
        <nav className="me-drawer-nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleDrawerClick(item.href); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Header */}
      <header className="me-header">
        <div className="me-header-inner">
          <button className="me-logo" onClick={openHome} aria-label="Басты бетке өту">
            <span className="me-logo-main">Math<span className="me-logo-dot">.</span>Edu</span>
          </button>
          <nav aria-label="Негізгі мәзір">
            <ul className="me-nav">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="me-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Мәзірді жабу" : "Мәзірді ашу"}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ══════════ HOME ══════════ */}
      {route.view === "home" && (
        <>
          {/* Hero */}
          <div className="me-hero-wrap">
            <div className="me-blob me-blob-1" aria-hidden="true" />
            <div className="me-blob me-blob-2" aria-hidden="true" />
            <div className="me-blob me-blob-3" aria-hidden="true" />
            <div className="me-container">
            <div className="me-hero">
              <div>
                <h1 className="me-hero-title">
                  5–6 сынып оқушыларына арналған{" "}
                  <span className="me-hero-keyword">математика платформасы</span>
                </h1>
                <p className="me-hero-desc">
                  Үлгерімі төмен оқушыларға, сабақтан қалған білім алушыларға және шалғай
                  аймақтағы балаларға арналған платформа: видеосабақтар, тақырыптар,
                  тапсырмалар және тесттер бір жерде.
                </p>
                <div className="me-hero-btns">
                  <button className="me-btn-dark" onClick={() => openGrade(5)}>
                    5-сынып тақырыптары →
                  </button>
                  <button className="me-btn-light" onClick={() => openGrade(6)}>
                    6-сынып тақырыптары →
                  </button>
                </div>
              </div>
              <div className="me-features-grid">
                {FEATURES.map((f) => (
                  <FeatureCard
                    key={f.line1}
                    feature={f}
                    onClick={() => {
                      if (f.href === "#grade5") openGrade(5);
                      else if (f.href === "#grade6") openGrade(6);
                      else document.querySelector(f.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                ))}
              </div>
            </div>
            </div>{/* .me-container */}
          </div>

          {/* Goal */}
          <section id="goal" className="me-goal" aria-labelledby="me-goal-h">
            <div className="me-container">
              <div className="me-goal-box">
                <div className="me-goal-blob-1" aria-hidden="true" />
                <div className="me-goal-blob-2" aria-hidden="true" />
                <div className="me-goal-inner">
                  <h2 id="me-goal-h">Жобаның мақсаты</h2>
                  <p className="me-goal-text">
                    Сандық технологияларды қолдану арқылы 5–6 сынып оқушыларына математика пәнін
                    түсінікті, қолжетімді және қызықты түрде ұсыну. Әсіресе үлгерімі төмен
                    оқушыларға және қосымша түсіндіруді қажет ететін білім алушыларға видеосабақтар
                    арқылы қолдау көрсету.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Grade 5 */}
          <section id="grade5">
            <div className="me-section me-container">
              <SectionHead
                tag="5-сынып"
                title="5-сынып тақырыптары"
                sub="Негізгі математикалық ұғымдарды бекіту және тереңдете түсіну"
              />
              <div className="me-cards-grid">
                {TOPICS_5.map((topic, i) => (
                  <TopicCard key={topic.title} topic={topic} delay={i * 110} onLinkClick={() => openGrade(5)} />
                ))}
              </div>
            </div>
          </section>

          {/* Grade 6 */}
          <section id="grade6">
            <div className="me-section me-container">
              <SectionHead
                tag="6-сынып"
                title="6-сынып тақырыптары"
                sub="Жаңа тақырыптарды игеру және есептерді шешу дағдысын дамыту"
              />
              <div className="me-cards-grid">
                {TOPICS_6.map((topic, i) => (
                  <TopicCard key={topic.title} topic={topic} delay={i * 110} onLinkClick={() => openGrade(6)} />
                ))}
              </div>
            </div>
          </section>

        </>
      )}

      {/* ══════════ GRADE VIEW ══════════ */}
      {route.view === "grade" && gradeData && (
        <GradeView
          gradeData={gradeData}
          onLessonSelect={(lesson) => openLesson(route.grade, lesson.id)}
          onBack={openHome}
        />
      )}

      {/* ══════════ LESSON VIEW ══════════ */}
      {route.view === "lesson" && lessonCtx && (
        <LessonView
          lesson={lessonCtx.lesson}
          chapter={lessonCtx.chapter}
          grade={route.grade}
          onBack={() => navigate({ view: "grade", grade: route.grade })}
        />
      )}

      {/* Footer */}
      <footer className="me-footer">
        <div className="me-footer-logo">Math<span style={{ color: "var(--primary)" }}>.</span>Edu</div>
        <p>5–6 сынып математикасы · Сандық технология арқылы оқыту</p>
      </footer>
    </div>
  );
};

export default MathEdu;
