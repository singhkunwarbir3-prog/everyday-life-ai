import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const Input = z.object({
  system: z.string().min(1).max(4000),
  prompt: z.string().min(1).max(8000),
});

export const generateAssistantResponse = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => Input.parse(v))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    try {
      const { text } = await generateText({
        model: gateway("google/gemini-3.6-flash"),
        system: data.system,
        prompt: data.prompt,
      });
      return { text };
    } catch (err: unknown) {
      const e = err as { status?: number; statusCode?: number; message?: string };
      const status = e.status ?? e.statusCode;
      if (status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
      throw new Error(e.message ?? "AI request failed");
    }
  });
