// Ultra-light markdown renderer (headings, lists, bold, inline code, paragraphs).
import { Fragment, type ReactElement } from "react";

function inline(text: string) {
  const nodes: (string | ReactElement)[] = [];
  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) nodes.push(<strong key={i++}>{m[2]}</strong>);
    else if (m[3] !== undefined)
      nodes.push(
        <code key={i++} className="rounded bg-muted px-1 py-0.5 text-[0.85em]">{m[3]}</code>,
      );
    else if (m[4] !== undefined) nodes.push(<em key={i++}>{m[4]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function MarkdownView({ text }: { text: string }) {
  const lines = text.replace(/\r/g, "").split("\n");
  const out: ReactElement[] = [];
  let list: string[] | null = null;
  let ordered = false;
  let key = 0;

  const flushList = () => {
    if (!list) return;
    const items = list;
    const Tag = ordered ? "ol" : "ul";
    out.push(
      <Tag key={key++} className={ordered ? "ml-5 list-decimal space-y-1" : "ml-5 list-disc space-y-1"}>
        {items.map((li, i) => <li key={i}>{inline(li)}</li>)}
      </Tag>,
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flushList(); continue; }
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    const ul = /^[-*]\s+(.*)$/.exec(line);
    const ol = /^\d+\.\s+(.*)$/.exec(line);
    if (h) {
      flushList();
      const level = h[1].length;
      const cls = level === 1 ? "text-2xl font-semibold mt-4"
        : level === 2 ? "text-xl font-semibold mt-4"
        : level === 3 ? "text-lg font-semibold mt-3"
        : "text-base font-semibold mt-2";
      out.push(<div key={key++} className={cls}>{inline(h[2])}</div>);
    } else if (ul) {
      if (!list || ordered) { flushList(); list = []; ordered = false; }
      list.push(ul[1]);
    } else if (ol) {
      if (!list || !ordered) { flushList(); list = []; ordered = true; }
      list.push(ol[1]);
    } else {
      flushList();
      out.push(<p key={key++} className="leading-relaxed">{inline(line)}</p>);
    }
  }
  flushList();
  return <div className="space-y-2 text-sm text-foreground/90">{out.map((n, i) => <Fragment key={i}>{n}</Fragment>)}</div>;
}
