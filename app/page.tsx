"use client";

import { useState, useEffect, useRef } from "react";
import { Archivo_Black, Archivo } from "next/font/google";
import Image from "next/image";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

/* ---------- EDIT THESE: your video files in /public/VIDEOS ---------- */
type Video = { src: string; title?: string; tag?: string; poster?: string };

const threadVideos: Video[] = [
  { src: "/VIDEOS/VID1.mp4", title: "Thread 1", tag: "2026" },
  { src: "/VIDEOS/VID2.mp4", title: "Thread 2", tag: "2026" },
  { src: "/VIDEOS/VID3.mp4", title: "Thread 3", tag: "2026" },
  { src: "/VIDEOS/VID4.mp4", title: "Thread 4", tag: "2026" },
  { src: "/VIDEOS/VID5.mp4", title: "Thread 5", tag: "2026" },
];
const adVideos: Video[] = [
  { src: "/VIDEOS/vin.mp4", title: "Ad 1", tag: "2026" },
  { src: "/VIDEOS/vid10.mp4", title: "Ad 2", tag: "2026" },
  { src: "/VIDEOS/vid11.mp4", title: "Ad 3", tag: "2026" },
];
const launchVideos: Video[] = [
  { src: "/VIDEOS/launch-1.mp4", title: "Launch 1", tag: "2026" },
  { src: "/VIDEOS/launch-2.mp4", title: "Launch 2", tag: "2026" },
  { src: "/VIDEOS/launch-3.mp4", title: "Launch 3", tag: "2026" },
  { src: "/VIDEOS/launch-4.mp4", title: "Launch 4", tag: "2026" },
  { src: "/VIDEOS/launch-5.mp4", title: "Launch 5", tag: "2026" },
];

/* ---------- EDIT THESE: your stack. Put the 3D icons in /public/IMAGES ---------- */
type Tool = {
  name: string;
  role: string;
  img: string;
  accent: string;
  desc: string;
  list: string[];
};

const tools: Tool[] = [
  {
    name: "After Effects",
    role: "Motion Graphics & VFX",
    img: "/IMAGES/ae.png",
    accent: "#9999ff",
    desc: "My main tool for polished, high-end motion design: where ideas become precise, layered animation.",
    list: [
      "Kinetic typography and title animations",
      "Logo animations and brand intros",
      "Keyframe animation, easing and graph editor control",
      "Compositing, masking and visual effects",
    ],
  },
  {
    name: "Alight Motion",
    role: "Mobile Motion Design",
    img: "/IMAGES/alightmotion.png",
    accent: "#1de9a0",
    desc: "Fast, flexible motion work built for social. Full keyframing and effects, right from my phone.",
    list: [
      "Animated edits and smooth transitions",
      "Custom presets, shakes and glitch effects",
      "Multi-layer compositions with blending modes",
      "Quick-turnaround reels and shorts",
    ],
  },
  {
    name: "CapCut",
    role: "Short-Form Video Editing",
    img: "/IMAGES/Capcut.png",
    accent: "#ffffff",
    desc: "Where speed meets style: cutting content that holds attention on Reels, TikTok and Shorts.",
    list: [
      "Fast-paced cuts, captions and beat-synced edits",
      "Trending effects, templates and transitions",
      "Colour grading and sound design",
      "Content built for Instagram, TikTok and YouTube",
    ],
  },
  {
    name: "Claude",
    role: "AI-Assisted Building & Workflow",
    img: "/IMAGES/claude.png",
    accent: "#d97757",
    desc: "My AI partner for turning ideas into working products faster, from code to copy to creative direction.",
    list: [
      "Building and debugging websites and web apps",
      "Writing scripts, captions and brand copy",
      "Prompting and refining AI-generated visuals",
      "Speeding up research, planning and problem-solving",
    ],
  },
  {
    name: "Higgsfield",
    role: "AI Video Generation",
    img: "/IMAGES/higgsfield.png",
    accent: "#b5cc2e",
    desc: "My go-to for AI-generated video: cinematic shots and camera movement that would take far longer to produce by hand.",
    list: [
      "Cinematic AI video clips from images and prompts",
      "Dynamic camera moves and visual effects",
      "Concept visuals and b-roll for brand videos",
      "Blending AI footage into motion graphics edits",
    ],
  },
];

/* ---------- EDIT THESE: your experience ---------- */
type Stat = { value: number; suffix?: string; label: string };
type Role = { company: string; title: string; period: string; logo?: string };
type Experience = {
  name: string;
  role: string;
  stats: Stat[];
  roles?: Role[];
};

const experiences: Experience[] = [
  {
    name: "Superteam",
    role: "Video production for creators in the Superteam ecosystem.",
    stats: [
      { value: 10, suffix: "+", label: "Creators worked with" },
      { value: 20, suffix: "+", label: "Videos made" },
    ],
  },
  {
    name: "ScribbleDAO",
    role: "Video production for creators in the ScribbleDAO community.",
    stats: [
      { value: 5, suffix: "+", label: "Creators worked with" },
      { value: 10, suffix: "+", label: "Videos made" },
    ],
  },
  {
    name: "YouTube",
    role: "Brand videos produced for YouTube.",
    stats: [
      { value: 3, label: "Brands worked with" },
      { value: 3, label: "Videos produced" },
    ],
  },
  {
    name: "Team Roles",
    role: "Community and content roles with growing teams.",
    stats: [],
    // Put the logo files in /public/IMAGES/logos/
    roles: [
      {
        company: "Spinedao",
        title: "Community Manager",
        period: "2025 - 2026",
        logo: "/IMAGES/spinedao.png",
      },
      {
        company: "Nodes Agency",
        title: "Content Writer",
        period: "2025 - 2026",
        logo: "/IMAGES/nodes.png",
      },
    ],
  },
];

/* ---------- EDIT THESE: your about photos in /public/IMAGES ---------- */
const aboutPhotos = [
  { src: "/IMAGES/me5.jpeg", alt: "Maxwell Teenoq Magaji, portrait 1" },
  { src: "/IMAGES/me6.jpg", alt: "Maxwell Teenoq Magaji, portrait 2" },
 
];

/* ---------- About photo: 3D tilt card, fades between pictures ---------- */
function AboutSlideshow() {
  const n = aboutPhotos.length;
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [hovering, setHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // auto-advance every 4s (restarts if you click a bar)
  useEffect(() => {
    const id = setTimeout(() => setActive((a) => (a + 1) % n), 4000);
    return () => clearTimeout(id);
  }, [active, n]);

  // tilt toward the pointer
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 22}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 22}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const resetTilt = () => {
    const el = cardRef.current;
    setHovering(false);
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--gx", "50%");
    el.style.setProperty("--gy", "50%");
  };

  return (
    <div className="mx-auto w-full max-w-[420px] md:max-w-none">
      {/* perspective stage */}
      <div style={{ perspective: "1100px" }}>
        <div className="about-float">
          <div
            ref={cardRef}
            onPointerEnter={() => setHovering(true)}
            onPointerMove={handleMove}
            onPointerLeave={resetTilt}
            onPointerCancel={resetTilt}
            className="relative w-full"
            style={{
              aspectRatio: "4 / 5",
              transformStyle: "preserve-3d",
              transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              transition: hovering
                ? "transform 120ms ease-out"
                : "transform 700ms cubic-bezier(0.22,0.8,0.3,1)",
              touchAction: "pan-y",
            }}
          >
            {/* back slab: gives the card visible thickness */}
            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-[#1a1a1a]"
              style={{ transform: "translateZ(-34px) scale(0.97)" }}
            />
            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-[#151515]"
              style={{ transform: "translateZ(-17px) scale(0.985)" }}
            />

            {/* front face */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-[#111]"
              style={{
                transform: "translateZ(0)",
                boxShadow:
                  "0 40px 60px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {aboutPhotos.map((p, i) =>
                failed[i] ? null : (
                  <Image
                    key={p.src}
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 460px"
                    priority={i === 0}
                    className="object-cover object-top grayscale"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transition: "opacity 1200ms ease-in-out",
                    }}
                    onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                  />
                )
              )}

              {/* glare that follows the pointer */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.22), transparent 55%)",
                  opacity: hovering ? 1 : 0,
                  transition: "opacity 400ms",
                  mixBlendMode: "overlay",
                }}
              />
            </div>

            {/* floating label pops out of the card */}
            <div
              className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur sm:text-xs"
              style={{ transform: "translateZ(50px)" }}
            >
              Teenoq
            </div>
          </div>
        </div>
      </div>

      {/* indicators (taller tap area on mobile) */}
      <div className="mt-6 flex gap-2 sm:mt-8">
        {aboutPhotos.map((_, i) => (
          <button
            key={i}
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setActive(i)}
            className="group flex-1 py-3"
          >
            <span
              className={`block h-[3px] w-full rounded-full transition-colors duration-500 ${
                i === active ? "bg-white" : "bg-white/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Number that counts up when scrolled into view ---------- */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Company logo box (shows initials until the file exists) ---------- */
function RoleLogo({ src, name }: { src?: string; name: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:h-14 sm:w-14">
      {src && ok ? (
        <Image
          src={src}
          alt={`${name} logo`}
          fill
          sizes="56px"
          className="object-contain p-1.5"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-[#9a9aab]">
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}

/* ---------- Experience: one card per platform ---------- */
function ExperienceSection() {
  return (
    <section id="experience" className="w-full px-5 pb-20 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center sm:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c9c4b8] sm:text-sm">
            Experience
          </span>
          <h2
            className="mt-2 leading-[0.9] tracking-[-0.03em] text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 8vw, 96px)",
            }}
          >
            where i&apos;ve worked
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {experiences.map((exp, i) => (
            <div
              key={exp.name}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/30 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <h3
                  className="text-2xl text-white sm:text-4xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {exp.name}
                </h3>
                <span className="text-sm text-[#9a9aab]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 leading-relaxed text-[#d6d3cb]">{exp.role}</p>

              {exp.stats.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
                  {exp.stats.map((s) => (
                    <div key={s.label}>
                      <div
                        className="text-4xl leading-none text-white sm:text-6xl"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <CountUp to={s.value} suffix={s.suffix} />
                      </div>
                      <div className="mt-2 text-sm text-[#9a9aab]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {exp.roles && (
                <div className="mt-6 space-y-4 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
                  {exp.roles.map((r) => (
                    <div key={r.company} className="flex items-center gap-4">
                      <RoleLogo src={r.logo} name={r.company} />
                      <div className="min-w-0">
                        <div
                          className="text-lg text-white sm:text-2xl"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {r.company}
                        </div>
                        <div className="text-sm text-[#d6d3cb]">{r.title}</div>
                        <div className="text-xs text-[#9a9aab]">{r.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- EDIT THESE: your certificates. Put the images in /public/IMAGES/certificates ---------- */
type Certificate = { img: string; title: string; issuer: string; year?: string };

const certificates: Certificate[] = [
  { img: "/IMAGES/certificates.png", title: "Free AI Generation Course", issuer: "Simplilearn", year: "2026" },
  { img: "/IMAGES/certificates2.png", title: "The Strategy of Content Marketing", issuer: "Coursera", year: "2026" },
  { img: "/IMAGES/certificates3.png", title: "AI Generation and Motion graphics", issuer: "NodeDesktop ", year: "2026" },
];

/* shows a placeholder if the certificate image file isn't there yet */
function CertImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#111] p-4 text-center text-xs text-[#9a9aab] sm:text-sm">
        Add certificate image
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 74vw, 560px"
      className="object-contain"
      onError={() => setOk(false)}
    />
  );
}

/* ---------- Certifications: slider of certificates, tap to enlarge ---------- */
function CertificatesSection() {
  const n = certificates.length;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const pausedRef = useRef(false);
  const touchX = useRef<number | null>(null);

  const prev = () => setActive((a) => (a - 1 + n) % n);
  const next = () => setActive((a) => (a + 1) % n);

  // auto-advance (stops while the enlarged view is open)
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current || open) return;
      setActive((a) => (a + 1) % n);
    }, 4000);
    return () => clearInterval(id);
  }, [n, open]);

  // Escape closes + lock page scroll while enlarged
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const cur = certificates[active];

  return (
    <section id="certifications" className="w-full px-4 pb-20 sm:pb-32">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center sm:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c9c4b8] sm:text-sm">
            Certifications
          </span>
          <h2
            className="mt-2 leading-[0.9] tracking-[-0.03em] text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 8vw, 96px)",
            }}
          >
            certified
          </h2>
        </div>

        <div
          className="cert-stage relative mx-auto w-full touch-pan-y overflow-hidden"
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") pausedRef.current = true;
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") pausedRef.current = false;
          }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
            touchX.current = null;
          }}
        >
          {certificates.map((c, i) => {
            const d = offsetOf(i);
            const abs = Math.abs(d);
            const isCenter = d === 0;
            const visible = abs <= 2;
            const x = d * 0.9;
            const scale = Math.max(1 - abs * 0.16, 0.5);
            const opacity = !visible ? 0 : [1, 0.7, 0.3][abs];

            return (
              <div
                key={i}
                onClick={() => (isCenter ? setOpen(true) : setActive(i))}
                className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl"
                style={{
                  width: "var(--cert-w)",
                  aspectRatio: "4 / 3",
                  transform: `translate(-50%, -50%) translateX(calc(var(--cert-w) * ${x})) scale(${scale})`,
                  opacity,
                  zIndex: 10 - abs,
                  filter: isCenter ? "none" : `blur(${abs * 0.8}px) brightness(0.75)`,
                  transition:
                    "transform 700ms cubic-bezier(0.22,0.8,0.3,1), opacity 700ms, filter 700ms",
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <CertImage src={c.img} alt={c.title} />
                {isCenter && (
                  <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white sm:text-xs">
                    tap to enlarge
                  </div>
                )}
              </div>
            );
          })}

          {/* arrows (hidden on phones, swipe instead) */}
          <button
            aria-label="Previous certificate"
            onClick={prev}
            className="absolute left-1 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur hover:bg-white/20 sm:left-4 sm:flex"
          >
            ‹
          </button>
          <button
            aria-label="Next certificate"
            onClick={next}
            className="absolute right-1 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur hover:bg-white/20 sm:right-4 sm:flex"
          >
            ›
          </button>
        </div>

        {/* caption for the centre certificate */}
        <div className="mt-5 px-2 text-center sm:mt-6">
          <div
            key={active}
            className="modal-pop text-xl text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {cur.title}
          </div>
          <div className="mt-1 text-sm text-[#9a9aab]">
            {cur.issuer}
            {cur.year ? ` · ${cur.year}` : ""}
          </div>
        </div>

        {/* dots */}
        <div className="mt-2 flex justify-center">
          {certificates.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to certificate ${i + 1}`}
              onClick={() => setActive(i)}
              className="flex h-6 items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ENLARGED VIEW */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-xl sm:p-4"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Close certificate"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white hover:bg-white/25 sm:right-8 sm:top-8 sm:h-10 sm:w-10"
          >
            ✕
          </button>
          <div
            className="modal-pop relative h-[min(70vh,720px)] w-[min(94vw,1000px)] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl sm:h-[min(80vh,720px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <CertImage src={cur.img} alt={cur.title} />
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Skills / stack: 3D icon in the centre, text on both sides ---------- */
function SkillsSection() {
  const [active, setActive] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (i: number) => {
    if (i === active || swapping) return;
    setSwapping(true);
    swapTimer.current = setTimeout(() => {
      setActive(i);
      setSwapping(false);
    }, 350);
  };

  // auto-rotate every 5s (restarts whenever the active tool changes)
  useEffect(() => {
    const id = setTimeout(() => go((active + 1) % tools.length), 5000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    return () => {
      if (swapTimer.current) clearTimeout(swapTimer.current);
    };
  }, []);

  const t = tools[active];
  const fade = swapping ? "opacity-0" : "opacity-100";

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden px-5 py-20 sm:px-6 sm:py-32"
    >
      {/* soft glow behind the icon, changes colour per tool */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-[45%] rounded-full opacity-20 blur-3xl transition-colors duration-700 md:h-[520px] md:w-[520px]"
        style={{ backgroundColor: t.accent }}
      />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-10 text-center sm:mb-20">
          <span
            className="text-xs uppercase tracking-[0.3em] transition-colors duration-700 sm:text-sm"
            style={{ color: t.accent }}
          >
            My Stack
          </span>
          <h2
            className="mt-2 leading-[0.9] tracking-[-0.03em] text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 8vw, 96px)",
            }}
          >
            tools i create with
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_minmax(240px,380px)_1fr] md:gap-10">
          {/* LEFT TEXT */}
          <div
            className={`text-center transition-all duration-300 md:text-right ${fade} ${
              swapping ? "md:-translate-x-5" : ""
            }`}
          >
            <h3
              className="mb-2 text-3xl text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.name}
            </h3>
            <div
              className="mb-3 font-semibold transition-colors duration-700"
              style={{ color: t.accent }}
            >
              {t.role}
            </div>
            <p className="leading-relaxed text-[#d6d3cb]">{t.desc}</p>
          </div>

          {/* CENTRE 3D ICON */}
          <div className="order-first flex justify-center md:order-none">
            <div className="skill-float">
              <Image
                key={t.img}
                src={t.img}
                alt={`${t.name} icon`}
                width={500}
                height={500}
                priority
                className={`aspect-square h-auto w-[180px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] transition-all duration-300 sm:w-[300px] md:w-[380px] ${
                  swapping ? "scale-90 -rotate-6 opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div
            className={`transition-all duration-300 ${fade} ${
              swapping ? "md:translate-x-5" : ""
            }`}
          >
            <div className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-white md:text-left">
              What I do with it
            </div>
            <ul>
              {t.list.map((item) => (
                <li
                  key={item}
                  className="border-b border-white/10 py-2.5 text-sm leading-snug text-[#d6d3cb] sm:text-base"
                >
                  <span
                    className="mr-1 transition-colors duration-700"
                    style={{ color: t.accent }}
                  >
                    ▹
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* selector */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-16 sm:gap-3">
          {tools.map((tool, i) => (
            <button
              key={tool.name}
              onClick={() => go(i)}
              className={`rounded-full border px-4 py-2.5 text-[13px] transition-all sm:px-5 sm:text-sm ${
                i === active
                  ? "border-transparent font-semibold text-black"
                  : "border-white/15 bg-white/5 text-[#9a9aab] hover:text-white"
              }`}
              style={i === active ? { backgroundColor: t.accent } : undefined}
            >
              {tool.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Coverflow carousel + enlarge-on-tap player ---------- */
function CoverflowSlider({
  title,
  videos,
  interval = 3500,
}: {
  title: string;
  videos: Video[];
  interval?: number;
}) {
  const n = videos.length;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false); // enlarged player open?
  const pausedRef = useRef(false);
  const touchX = useRef<number | null>(null);
  const vidRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const prev = () => setActive((a) => (a - 1 + n) % n);
  const next = () => setActive((a) => (a + 1) % n);

  // auto-advance, loops forever (stops while the player is open)
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current || open) return;
      setActive((a) => (a + 1) % n);
    }, interval);
    return () => clearInterval(id);
  }, [n, interval, open]);

  // only the centre video plays in the row (all pause while enlarged)
  useEffect(() => {
    vidRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !open) {
        v.muted = true;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, open]);

  // close with Escape + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // shortest circular distance from the active card
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <div className="mb-16 last:mb-0 sm:mb-24">
      <h3
        className="mb-5 px-2 text-center text-lg tracking-tight text-white sm:mb-6 sm:text-4xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>

      <div
        className="cf-stage relative mx-auto w-full touch-pan-y overflow-hidden"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") pausedRef.current = true;
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") pausedRef.current = false;
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
          touchX.current = null;
        }}
      >
        {videos.map((v, i) => {
          const d = offsetOf(i);
          const abs = Math.abs(d);
          const isCenter = d === 0;
          const visible = abs <= 2;

          const x = d * 0.88; // spacing, in card widths
          const scale = Math.max(1 - abs * 0.16, 0.5);
          const opacity = !visible ? 0 : [1, 0.75, 0.35][abs];

          return (
            <div
              key={i}
              // centre card -> enlarge, side card -> bring to centre
              onClick={() => (isCenter ? setOpen(true) : setActive(i))}
              className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl"
              style={{
                width: "var(--card-w)",
                aspectRatio: "16 / 9",
                transform: `translate(-50%, -50%) translateX(calc(var(--card-w) * ${x})) scale(${scale})`,
                opacity,
                zIndex: 10 - abs,
                filter: isCenter ? "none" : `blur(${abs * 0.8}px) brightness(0.75)`,
                transition:
                  "transform 700ms cubic-bezier(0.22,0.8,0.3,1), opacity 700ms, filter 700ms",
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <video
                ref={(el) => {
                  vidRefs.current[i] = el;
                }}
                /* #t=0.001 makes iOS Safari show the first frame instead of a black box */
                src={`${v.src}#t=0.001`}
                poster={v.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 pt-8 sm:p-3 sm:pt-10">
                {v.title && (
                  <div
                    className="text-sm text-white sm:text-lg"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {v.title}
                  </div>
                )}
                {v.tag && (
                  <span className="mt-1 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white sm:text-xs">
                    {v.tag}
                  </span>
                )}
              </div>

              {isCenter && (
                <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white sm:text-xs">
                  ▶ tap to play
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* dots */}
      <div className="mt-1 flex justify-center">
        {videos.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to video ${i + 1}`}
            onClick={() => setActive(i)}
            className="flex h-6 items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ENLARGED PLAYER — page behind is blurred + darkened */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-xl sm:p-4"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Close video"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white hover:bg-white/25 sm:right-8 sm:top-8 sm:h-10 sm:w-10"
          >
            ✕
          </button>

          <div
            className="modal-pop w-[min(94vw,1000px)] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
            style={{ aspectRatio: "16 / 9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={videos[active].src}
              src={videos[active].src}
              poster={videos[active].poster}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <main
      className={`${archivoBlack.variable} ${archivo.variable} w-full overflow-x-hidden bg-black text-[#f1efe9]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* HERO: tall on phones, 16:9 from tablet up */}
      <section className="flex min-h-[100svh] w-full items-center">
        <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden md:aspect-[16/9]">
          <div className="reveal-blur absolute inset-x-0 top-0 z-30 flex items-start justify-between px-[5%] pt-[5%] md:px-[3%] md:pt-[3%]">
            <span className="text-xs font-semibold tracking-[0.14em] text-white sm:text-base">
              CREATIVE DIRECTOR
            </span>
            <div className="text-right text-[11px] leading-relaxed text-[#c9c4b8] sm:text-sm">
              <div className="text-white">2026</div>
              <div className="tracking-[0.08em]">BRAND IDENTITY</div>
            </div>
          </div>

          <svg
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
            className="reveal-blur pointer-events-none absolute left-1/2 top-[40%] z-10 h-[26%] w-[96%] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:h-[85%] md:w-[90%]"
          >
            <text
              x="500"
              y="230"
              textAnchor="middle"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="var(--font-display)"
              fontSize="260"
              fill="#fff"
            >
              PORTFOLIO
            </text>
          </svg>

          <div className="absolute bottom-0 left-1/2 z-20 h-[68%] w-[100%] -translate-x-1/2 md:h-[72%] md:w-[48%]">
            <div
              className="portrait-bounce relative h-full w-full"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 1%, black 10%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 1%, black 78%, transparent 100%)",
              }}
            >
              {imgOk ? (
                <Image
                  src="/IMAGES/me2.png"
                  alt="Portrait"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 48vw"
                  className="object-cover object-top grayscale"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-b from-[#1a1a1a] to-black" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="w-full px-5 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-8 sm:mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c9c4b8] sm:text-sm">
              About
            </span>
            <h2
              className="mt-2 leading-[0.9] tracking-[-0.03em] text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 8vw, 96px)",
              }}
            >
              about me
            </h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:gap-14">
            {/* LEFT: fading photos */}
            <AboutSlideshow />

            {/* RIGHT: text */}
            <div className="text-sm leading-[1.7] text-[#d6d3cb]">
              <p>
                <strong className="font-semibold text-white">
                  MAXWELL &ldquo;TEENOQ&rdquo; MAGAJI
                </strong>{" "}
                is a creative visual strategist and creative director. He
                blends creative expertise with visuals and technology to build
                aesthetic brand identities with motion graphic videos, giving
                brands a strong identity, whatever the vision.
              </p>

              <p className="mt-4">
                He has been doing this since 2022 and has worked on multiple
                websites, which you can find in the{" "}
                <a
                  href="#work-done"
                  className="text-white underline underline-offset-4"
                >
                  Work Done
                </a>{" "}
                section. He is proficient in After Effects, CapCut and Alight
                Motion and also is expericend in writing  , he has rewritten more than 40 + threads on his twitter and is also a certified writer
              </p>

              <p className="mt-4">
                He studied at Bowen University, where
                he majored in Computer Science
              </p>

              <p className="mt-8 text-xs text-[#9a9aab] sm:mt-10">
                based in <span className="text-white">Abuja, Nigeria</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS / STACK */}
      <SkillsSection />

      {/* EXPERIENCE */}
      <ExperienceSection />

      {/* PROOF OF WORK */}
      <section id="work-done" className="w-full px-4 pb-20 sm:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <h2
            className="mb-10 text-center leading-[0.85] tracking-[-0.03em] text-white sm:mb-16"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 11vw, 140px)",
            }}
          >
            proof of work
          </h2>

          <CoverflowSlider title="THREAD / PROJECT VIDEOS" videos={threadVideos} />
          <CoverflowSlider title="AD VIDEOS/AI LAUNCH VIDEOS" videos={adVideos} />
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <CertificatesSection />

      {/* FOOTER / CONTACT */}
      <footer
        id="contact"
        className="w-full border-t border-white/10 px-5 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div
              className="text-2xl text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              let&apos;s work together
            </div>
            <div className="mt-1 text-sm text-[#9a9aab]">
              © 2026 Maxwell &ldquo;Teenoq&rdquo; Magaji
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-[#d6d3cb] sm:items-end">
            <a
              href="https://t.me/Teenoq"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              <span className="text-[#9a9aab]">Telegram</span> · @Teenoq
            </a>
            <a
              href="mailto:maxaaron108@gmail.com"
              className="transition-colors hover:text-white"
            >
              <span className="text-[#9a9aab]">Gmail</span> · maxaaron108@gmail.com
            </a>
            <a
              href="https://instagram.com/Teenoqtheeditor"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              <span className="text-[#9a9aab]">Instagram</span> · @Teenoqtheeditor
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        /* carousel sizing: bigger cards on phones, original sizing from tablet up */
        .cf-stage {
          --card-w: min(74vw, 380px);
          height: calc(var(--card-w) * 0.66);
        }
        .cert-stage {
          --cert-w: min(74vw, 380px);
          height: calc(var(--cert-w) * 0.8);
        }
        @media (min-width: 768px) {
          .cf-stage {
            --card-w: clamp(220px, 40vw, 520px);
            height: calc(var(--card-w) * 0.8);
          }
          .cert-stage {
            --cert-w: clamp(240px, 46vw, 560px);
            height: calc(var(--cert-w) * 0.8);
          }
        }

        .skill-float {
          animation: skillFloat 4s ease-in-out infinite;
        }
        @keyframes skillFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        .about-float {
          animation: aboutFloat 5s ease-in-out infinite;
        }
        @keyframes aboutFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-float { animation: none; }
          .skill-float { animation: none; }
          .portrait-bounce { animation: none; }
        }

        .modal-pop {
          animation: modalPop 280ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
        }
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .reveal-blur {
          animation: revealBlur 1.4s ease-out forwards;
        }
        @keyframes revealBlur {
          0% { filter: blur(22px); }
          55% { filter: blur(8px); }
          100% { filter: blur(0px); }
        }
        .portrait-bounce {
          animation:
            portraitBounceIn 1.1s cubic-bezier(0.28, 0.84, 0.42, 1) forwards,
            portraitBounceLoop 2.6s ease-out 1.1s infinite;
        }
        @keyframes portraitBounceIn {
          0% { transform: translateY(70px); opacity: 0; }
          45% { transform: translateY(-16px); opacity: 1; }
          65% { transform: translateY(6px); }
          85% { transform: translateY(-3px); }
          100% { transform: translateY(0); }
        }
        @keyframes portraitBounceLoop {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-9px); }
          35% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          63% { transform: translateY(0); }
          73% { transform: translateY(-1.5px); }
          82% { transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}