import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { tools } from "@/lib/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Everyday Life AI — Your AI Assistant for Everyday Life" },
      {
        name: "description",
        content:
          "Save time, stay organized, and solve everyday problems with AI. Meal plans, daily schedules, packing lists, budgets, gifts, travel and more — in one place.",
      },
      { property: "og:title", content: "Everyday Life AI — Your AI Assistant for Everyday Life" },
      {
        property: "og:description",
        content: "AI tools for meal planning, daily schedules, packing, budgets, gifts, travel and more.",
      },
    ],
  }),
  component: Landing,
});

const testimonials = [
  { name: "Sara M.", role: "Working mom", quote: "The meal planner alone saves me 3 hours every week. Absolute game-changer." },
  { name: "Daniel R.", role: "Freelancer", quote: "I use the daily planner every morning. My focus and output have doubled." },
  { name: "Amelie K.", role: "Frequent traveler", quote: "Packing lists that actually match the weather. I never forget things anymore." },
];

const faqs = [
  { q: "Is Everyday Life AI free to try?", a: "Yes — every tool is instantly usable, no sign-up required to try." },
  { q: "How does the AI work?", a: "We use modern large language models tuned with practical, everyday-life prompts to give you clear, actionable answers." },
  { q: "Is my data private?", a: "We only send your inputs to the AI model to generate a response. We don't sell your data." },
  { q: "Can I use it on mobile?", a: "Yes. The whole site is mobile-first and works great on any device." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Tools />
      <Testimonials />
      <FAQ />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[color:var(--brand)] opacity-30 blur-3xl animate-blob" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-[color:var(--brand-accent)] opacity-30 blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[color:var(--brand)] opacity-20 blur-3xl animate-blob" />
      </div>
      <div className="mx-auto max-w-5xl px-4 pt-20 pb-16 text-center sm:pt-28">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-accent)]" />
          Powered by AI, built for real life
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
          Your <span className="gradient-text">AI Assistant</span> for Everyday Life
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Save time, stay organized, and solve everyday problems with AI. Meals, plans,
          packing, budgets, gifts and more — all in one calm, beautiful place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#tools" className="btn-brand inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium">
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#faq" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium hover:bg-background/70">
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          One toolkit for the <span className="gradient-text">whole day</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Pick a tool, describe what you need, and get a clear plan in seconds.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.slug}
              to="/tools/$slug"
              params={{ slug: t.slug }}
              className="glass group flex flex-col rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl btn-brand text-xl">
                  <span>{t.emoji}</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">AI Tool</p>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                </div>
                <Icon className="ml-auto h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{t.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--brand)] group-hover:gap-2 transition-all">
                Open tool <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Loved by <span className="gradient-text">busy humans</span>
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="glass rounded-2xl p-6">
            <div className="mb-3 flex gap-0.5 text-[color:var(--brand-accent)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-medium">{t.name}</span>
              <span className="text-muted-foreground"> — {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked <span className="gradient-text">questions</span>
        </h2>
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="glass rounded-2xl">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
