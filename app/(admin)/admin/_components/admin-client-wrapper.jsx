"use client";
import { AiExtractionProvider } from "@/context/ai-extraction-context";

/**
 * Thin client wrapper so the server AdminLayout can inject the
 * AiExtractionProvider without becoming a client component itself.
 */
export default function AdminClientWrapper({ children }) {
  return <AiExtractionProvider>{children}</AiExtractionProvider>;
}
