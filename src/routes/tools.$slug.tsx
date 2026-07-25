import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolPage } from "@/components/ToolPage";
import { getTool } from "@/lib/tools";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tool not found — Everyday Life AI" }, { name: "robots", content: "noindex" }] };
    }
    const { tool } = loaderData;
    const title = `${tool.name} — Everyday Life AI`;
    return {
      meta: [
        { title },
        { name: "description", content: tool.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: tool.tagline },
      ],
    };
  },
  component: ToolRoute,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-10 text-center">
      <h1 className="text-2xl font-semibold">Tool not found</h1>
      <p className="mt-2 text-muted-foreground">The tool you're looking for doesn't exist.</p>
    </div>
  ),
});

function ToolRoute() {
  const { tool } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <ToolPage tool={tool} />
      <SiteFooter />
    </div>
  );
}
