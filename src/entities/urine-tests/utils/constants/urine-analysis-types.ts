import { UrineAnalysisType } from "@/shared/types";

export const URINE_ANALYSIS_TYPES_ARRAY = [
  "LABORATORY",
  "MACROSCOPIC",
  "MICROSCOPIC",
] as const;

export const URINE_ANALYSIS_TYPES: Record<UrineAnalysisType, { uz: string; ru: string }> = {
  LABORATORY: {
    ru: "Лабораторный",
    uz: "Laboratoriya"
  },
  MACROSCOPIC: {
    ru: "Макроскопический",
    uz: "Makroskopik"
  },
  MICROSCOPIC: {
    ru: "Микроскопический",
    uz: "Mikroskopik"
  }
};