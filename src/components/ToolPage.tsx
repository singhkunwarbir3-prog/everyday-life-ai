import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Wand2, Copy, Check } from "lucide-react";
import { generateAssistantResponse } from "@/lib/ai.functions";
import type { Tool } from "@/lib/tools";
import { MarkdownView } from "./MarkdownView";

export function ToolPage({ tool }: { tool: Tool }) {
  const run = useServerFn(generateAssistantResponse);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await run({ data: { system: tool.system, prompt: tool.buildPrompt(values) } });
      setResult(res.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to all tools
      </Link>
      <header className="mt-6 flex items-start gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl btn-brand text-2xl">
          <span>{tool.emoji}</span>
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="gradient-text">{tool.name}</span>
          </h1>
          <p className="mt-1 max-w-xl text-muted-foreground">{tool.tagline}</p>
        </div>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <form onSubmit={onSubmit} className="glass space-y-4 rounded-2xl p-6">
          {tool.fields.map((f) => (
            <div key={f.name} className="space-y-1.5">
              <label className="text-sm font-medium">
                {f.label} {f.required && <span className="text-accent">*</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  required={f.required}
                  placeholder={f.placeholder}
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              ) : (
                <input
                  type={f.type ?? "text"}
                  required={f.required}
                  placeholder={f.placeholder}
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="btn-brand inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {loading ? "Generating..." : "Generate with AI"}
          </button>
          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
          )}
        </form>

        <div className="glass min-h-[300px] rounded-2xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              AI Result
            </h2>
            {result && (
              <button
                onClick={copyResult}
                className="inline-flex items-center gap-1 rounded-lg border border-border bg-background/50 px-2 py-1 text-xs hover:bg-background"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          {!result && !loading && (
            <p className="text-sm text-muted-foreground">
              Fill in the details and hit “Generate with AI”. Your personalized {tool.name.toLowerCase()} will appear here.
            </p>
          )}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
            </div>
          )}
          {result && <MarkdownView text={result} />}
        </div>
      </div>
    </div>
  );
}
