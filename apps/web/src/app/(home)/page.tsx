"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  Boxes,
  ChevronRight,
  Cloud,
  Code2,
  DatabaseZap,
  Layers3,
  Menu,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "AI Product Systems",
    copy: "Assistants, automation, retrieval, agentic workflows and intelligent product surfaces built for production.",
    icon: Bot,
  },
  {
    number: "02",
    title: "Web and SaaS Platforms",
    copy: "Fast, elegant web apps with resilient architecture, refined UX and the operational depth teams expect.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Mobile Experiences",
    copy: "Native-quality iOS and Android products that feel fluid, focused and unmistakably premium.",
    icon: Smartphone,
  },
  {
    number: "04",
    title: "Cloud and DevOps",
    copy: "Scalable infrastructure, CI/CD, observability and deployment systems that make shipping feel calm.",
    icon: Cloud,
  },
  {
    number: "05",
    title: "UI/UX Design",
    copy: "Editorial interfaces, product systems, prototypes and conversion flows with founder-level taste.",
    icon: WandSparkles,
  },
  {
    number: "06",
    title: "Automation Engines",
    copy: "Internal tooling, integrations and workflow automation that remove repetitive work from growing teams.",
    icon: DatabaseZap,
  },
];

const principles = [
  "Zero-to-one product strategy",
  "Design systems with motion",
  "Secure enterprise architecture",
  "Launch-ready engineering teams",
];

const metrics = [
  ["14", "day prototype sprint"],
  ["99.9%", "cloud-ready reliability"],
  ["4x", "faster product iteration"],
];

const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#120d2e] text-[#151133]">
      <section className="relative isolate min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_8%,rgba(167,118,255,0.32),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(135deg,#17103b_0%,#2b1959_46%,#130d2d_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),transparent)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto min-h-[calc(100vh-32px)] max-w-[1480px] overflow-hidden rounded-[32px] border border-white/70 bg-[#fbf9ff] shadow-[0_34px_120px_rgba(12,6,42,0.55)] sm:min-h-[calc(100vh-48px)]"
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
            <a href="#" className="group flex items-center gap-3" aria-label="Awaken Studios home">
              <span className="grid size-10 place-items-center rounded-2xl bg-[#181033] text-white shadow-[0_12px_30px_rgba(111,61,255,0.35)] transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="size-5 text-[#caa9ff]" aria-hidden="true" />
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#171034]">
                Awaken Studios
              </span>
            </a>

            <div className="hidden items-center gap-1 rounded-full border border-[#e9dcff] bg-white/68 p-1 text-sm text-[#675b87] shadow-[0_18px_55px_rgba(71,34,145,0.08)] backdrop-blur-xl md:flex">
              {["Work", "Services", "Systems", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="rounded-full px-4 py-2 transition-colors duration-300 hover:bg-[#f1eaff] hover:text-[#6f39ff]"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden rounded-full bg-[#171034] px-5 py-3 text-sm font-medium text-white shadow-[0_16px_34px_rgba(23,16,52,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#6d39ff] sm:inline-flex"
              >
                Start a build
              </a>
              <button
                className="grid size-11 place-items-center rounded-full border border-[#e5d7ff] bg-white/70 text-[#171034] shadow-[0_12px_34px_rgba(71,34,145,0.08)] md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </nav>

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#ddcaff] bg-white/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7839ff] shadow-[0_18px_45px_rgba(111,57,255,0.1)] backdrop-blur-xl">
                <Sparkles className="size-4" aria-hidden="true" />
                Future systems studio
              </div>

              <h1 className="max-w-5xl text-[clamp(3.4rem,8vw,8.7rem)] font-semibold leading-[0.86] tracking-[-0.07em] text-[#171034]">
                Awaken
                <span className="block bg-[linear-gradient(100deg,#171034_8%,#7a38ff_46%,#bd8cff_78%)] bg-clip-text text-transparent">
                  Studios.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 tracking-[-0.02em] text-[#5e557d] sm:text-xl">
                We design and engineer AI products, SaaS platforms, mobile apps,
                cloud systems and automation for companies that need their next
                launch to feel inevitable.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#7b39ff] px-6 py-4 text-sm font-semibold text-white shadow-[0_22px_50px_rgba(123,57,255,0.34)] transition duration-300 hover:-translate-y-1 hover:bg-[#171034]"
                >
                  Build the next product
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dfd1fb] bg-white/72 px-6 py-4 text-sm font-semibold text-[#171034] shadow-[0_18px_45px_rgba(71,34,145,0.09)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#b58cff]"
                >
                  <Play className="size-4 fill-[#171034]" aria-hidden="true" />
                  View systems
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 34, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: "easeOut" }}
              className="relative min-h-[520px] rounded-[32px] border border-[#e9dcff] bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(247,238,255,0.55))] p-3 shadow-[0_28px_90px_rgba(85,40,160,0.18)] backdrop-blur-2xl"
            >
              <div className="absolute -right-10 top-10 h-56 w-56 rounded-full bg-[#b076ff]/30 blur-3xl" />
              <div className="absolute -bottom-12 left-8 h-56 w-56 rounded-full bg-[#7e3cff]/20 blur-3xl" />

              <div className="relative h-full overflow-hidden rounded-[26px] border border-white/80 bg-[#fbf9ff]/86 p-5 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#eadfff] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#ff8bad]" />
                    <span className="size-3 rounded-full bg-[#ffd36c]" />
                    <span className="size-3 rounded-full bg-[#88e2b0]" />
                  </div>
                  <div className="rounded-full border border-[#eadfff] bg-white/72 px-3 py-1 text-xs font-medium text-[#7b6b9f]">
                    Live product OS
                  </div>
                </div>

                <div className="grid gap-4 pt-5 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="space-y-4">
                    <div className="rounded-[24px] bg-[#171034] p-5 text-white shadow-[0_22px_55px_rgba(23,16,52,0.22)]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.18em] text-[#cbb7ff]">Velocity</span>
                        <Code2 className="size-5 text-[#b58cff]" aria-hidden="true" />
                      </div>
                      <div className="mt-8 text-5xl font-semibold tracking-[-0.07em]">4.8x</div>
                      <p className="mt-2 text-sm leading-6 text-[#d9ceff]">
                        Prototype, validate and scale inside one product rhythm.
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-[#eadfff] bg-white/72 p-5 shadow-[0_18px_45px_rgba(71,34,145,0.08)] backdrop-blur-xl">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#171034]">Launch stack</span>
                        <Boxes className="size-5 text-[#7939ff]" aria-hidden="true" />
                      </div>
                      {["Design", "AI", "Cloud"].map((item, index) => (
                        <div key={item} className="mb-3 last:mb-0">
                          <div className="mb-2 flex justify-between text-xs text-[#7b6b9f]">
                            <span>{item}</span>
                            <span>{92 - index * 7}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#eee6ff]">
                            <div
                              className="h-full rounded-full bg-[linear-gradient(90deg,#7b39ff,#d2a8ff)]"
                              style={{ width: `${92 - index * 7}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {metrics.map(([value, label]) => (
                        <div
                          key={label}
                          className="rounded-[24px] border border-[#eadfff] bg-white/72 p-5 shadow-[0_18px_45px_rgba(71,34,145,0.08)] backdrop-blur-xl"
                        >
                          <div className="text-3xl font-semibold tracking-[-0.06em] text-[#171034]">
                            {value}
                          </div>
                          <p className="mt-2 text-xs leading-5 text-[#70658e]">{label}</p>
                        </div>
                      ))}
                      <div className="rounded-[24px] bg-[linear-gradient(140deg,#8b45ff,#d8b6ff)] p-5 text-white shadow-[0_20px_55px_rgba(123,57,255,0.25)]">
                        <ShieldCheck className="size-6" aria-hidden="true" />
                        <p className="mt-8 text-sm font-medium leading-6">
                          Enterprise-grade security from the first sprint.
                        </p>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[28px] border border-[#eadfff] bg-white/72 p-5 shadow-[0_18px_45px_rgba(71,34,145,0.08)] backdrop-blur-xl">
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(139,69,255,0.14))]" />
                      <div className="relative flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#171034]">Product intelligence</p>
                          <p className="mt-1 text-xs text-[#7b6b9f]">AI, analytics and workflow orchestration</p>
                        </div>
                        <div className="grid size-11 place-items-center rounded-2xl bg-[#f1e8ff] text-[#7b39ff]">
                          <Bot className="size-5" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="relative mt-7 grid grid-cols-12 items-end gap-2">
                        {[36, 64, 48, 78, 56, 88, 68, 96, 72, 105, 82, 116].map((height, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-[linear-gradient(180deg,#8c45ff,#dcc4ff)] shadow-[0_10px_24px_rgba(123,57,255,0.18)]"
                            style={{ height }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="services" className="bg-[#fbf9ff] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7b39ff]">
              Design language, engineering gravity
            </p>
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#171034]">
              Digital products with the polish of a category leader.
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ number, title, copy, icon: Icon }) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="group relative min-h-[320px] overflow-hidden rounded-[28px] border border-[#e8dcff] bg-white/74 p-7 shadow-[0_24px_70px_rgba(71,34,145,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(111,57,255,0.16)]"
              >
                <div className="absolute -right-16 -top-16 size-44 rounded-full bg-[#a66dff]/18 blur-2xl transition duration-500 group-hover:bg-[#a66dff]/28" />
                <div className="relative flex items-center justify-between">
                  <span className="text-3xl font-semibold tracking-[-0.06em] text-[#7b39ff]">
                    {number}
                  </span>
                  <span className="grid size-12 place-items-center rounded-2xl border border-[#eadfff] bg-[#f6f0ff] text-[#7b39ff]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="relative mt-16 max-w-xs text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#171034]">
                  {title}
                </h3>
                <p className="relative mt-4 max-w-sm text-base leading-7 text-[#645a82]">
                  {copy}
                </p>
                <span className="absolute bottom-7 left-7 h-1 w-10 rounded-full bg-[#7b39ff]" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="bg-[#fbf9ff] px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] bg-[#171034] p-8 text-white shadow-[0_30px_100px_rgba(23,16,52,0.3)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#cdb9ff]">Operating model</p>
            <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              Built like an internal elite product team.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#d9ceff]">
              Strategy, design, engineering and deployment move in one loop, so
              the work stays sharp from first concept to scale.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((item, index) => (
              <div
                key={item}
                className="rounded-[28px] border border-[#e8dcff] bg-white/76 p-7 shadow-[0_24px_70px_rgba(71,34,145,0.08)] backdrop-blur-xl"
              >
                <span className="text-sm font-semibold text-[#7b39ff]">0{index + 1}</span>
                <h3 className="mt-14 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#171034]">
                  {item}
                </h3>
                <ChevronRight className="mt-6 size-5 text-[#7b39ff]" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#fbf9ff] px-5 pb-5 sm:px-8 sm:pb-8 lg:px-10">
        <div className="mx-auto overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_22%_16%,rgba(216,190,255,0.9),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f3e9ff_50%,#ffffff_100%)] px-6 py-16 text-center shadow-[0_30px_110px_rgba(71,34,145,0.16)] sm:px-10 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7b39ff]">Awaken the next thing</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(2.5rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-[#171034]">
            Bring us the ambitious version.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#62577f]">
            From AI-native products to enterprise platforms, we turn complex
            technology into digital experiences people want to use.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="mailto:hello@awakenstudios.dev"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#171034] px-7 py-4 text-sm font-semibold text-white shadow-[0_22px_55px_rgba(23,16,52,0.24)] transition duration-300 hover:-translate-y-1 hover:bg-[#7b39ff]"
            >
              hello@awakenstudios.dev
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
