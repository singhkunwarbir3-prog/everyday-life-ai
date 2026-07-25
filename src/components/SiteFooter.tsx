export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <p className="gradient-text text-lg font-semibold">Everyday Life AI</p>
            <p className="mt-1 max-w-md">
              Your AI-powered companion for meals, plans, packing, budgets and everything in between.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-2 font-medium text-foreground">Product</p>
              <ul className="space-y-1">
                <li><a href="/#tools" className="hover:text-foreground">All tools</a></li>
                <li><a href="/#faq" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-foreground">Company</p>
              <ul className="space-y-1">
                <li><a href="/#testimonials" className="hover:text-foreground">Testimonials</a></li>
                <li><a href="mailto:hello@example.com" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-foreground">Legal</p>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs">© {new Date().getFullYear()} Everyday Life AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
