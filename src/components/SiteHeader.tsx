import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 max-w-6xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-xl btn-brand">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="gradient-text text-lg">Everyday Life AI</span>
          </Link>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <a href="/#tools" className="hover:text-foreground">Tools</a>
            <a href="/#testimonials" className="hover:text-foreground">Loved by</a>
            <a href="/#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <a
            href="/#tools"
            className="btn-brand inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
