"use client";

import { processCarImageWithAI } from "@/actions/car";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

// ─── Context ──────────────────────────────────────────────────────────────────

const AiExtractionContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AiExtractionProvider = ({ children }) => {
  // Use a ref for the processing flag so startExtraction never reads stale state
  // (avoids the "guard skipped because closure captured old value" bug).
  const isProcessingRef = useRef(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Keep result + imageFile in refs as well as state.
  // Refs let claimResult() read the LATEST value synchronously without
  // depending on a re-created useCallback (which was causing the effect
  // re-registration loop in the form).
  const resultRef = useRef(null);
  const imageFileRef = useRef(null);
  const [result, setResult] = useState(null);

  // The form registers a listener on mount; we call it when extraction done.
  const listenerRef = useRef(null);

  const registerListener = useCallback((fn) => {
    listenerRef.current = fn;
  }, []); // stable — no deps

  const unregisterListener = useCallback(() => {
    listenerRef.current = null;
  }, []); // stable — no deps

  /**
   * Start AI extraction.
   * — Guards against double-starts using a ref (not state) so the check is
   *   never stale even when startExtraction is called synchronously twice.
   * — Keeps imageFile in a ref so claimResult() always sees the latest file
   *   without needing to be in a useCallback dep array.
   */
  const startExtraction = useCallback(async (file) => {
    // Guard via ref — immune to stale closures
    if (isProcessingRef.current) {
      toast.info("AI is already processing an image. Please wait.");
      return;
    }

    isProcessingRef.current = true;
    setIsProcessing(true);

    // Store the file in a ref so claimResult/listener always has it
    imageFileRef.current = file;

    // Clear any previous result
    resultRef.current = null;
    setResult(null);

    const toastId = toast.loading("AI is extracting car details...", {
      description: "You can navigate freely — we'll notify you when done.",
      duration: Infinity,
    });

    try {
      const response = await processCarImageWithAI(file);

      if (response?.success) {
        toast.dismiss(toastId);
        toast.success("Car details extracted!", {
          description: `Detected ${response.data.year} ${response.data.make} ${response.data.model} with ${Math.round(response.data.confidence * 100)}% confidence.`,
          duration: 6000,
        });

        // Store in both ref and state
        resultRef.current = response;
        setResult(response);

        // Push directly to the form if it is currently visible
        if (listenerRef.current) {
          listenerRef.current(response, file);
          // Listener consumed it — clear so claimResult won't double-apply
          resultRef.current = null;
          imageFileRef.current = null;
          setResult(null);
        }
        // If listener is absent, the result sits in the ref+state until
        // the form mounts and calls claimResult().
      } else {
        toast.dismiss(toastId);
        toast.error("AI extraction failed. Please try again.");
        resultRef.current = null;
        imageFileRef.current = null;
        setResult(null);
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("AI extraction error: " + (err.message || "Unknown error"));
      resultRef.current = null;
      imageFileRef.current = null;
      setResult(null);
    } finally {
      isProcessingRef.current = false;
      setIsProcessing(false);
    }
  }, []); // stable — reads all mutable state via refs

  /**
   * Called by the form on mount to claim any result that arrived while
   * the form was not rendered. Uses refs so it is a stable function that
   * doesn't need to be in any useEffect dep array.
   */
  const claimResult = useCallback(() => {
    const pending = resultRef.current;
    const pendingFile = imageFileRef.current;
    return { result: pending, imageFile: pendingFile };
  }, []); // stable — reads only refs

  /**
   * Called by the form after it has consumed the result, so a remount
   * won't double-apply it.
   */
  const clearResult = useCallback(() => {
    resultRef.current = null;
    imageFileRef.current = null;
    setResult(null);
  }, []); // stable

  return (
    <AiExtractionContext.Provider
      value={{
        isProcessing,
        startExtraction,
        registerListener,
        unregisterListener,
        claimResult,
        clearResult,
      }}
    >
      {children}
    </AiExtractionContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAiExtraction = () => {
  const ctx = useContext(AiExtractionContext);
  if (!ctx) {
    throw new Error(
      "useAiExtraction must be used inside <AiExtractionProvider>"
    );
  }
  return ctx;
};
