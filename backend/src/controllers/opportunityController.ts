import type { Request, Response } from "express";
import { analysisRequestSchema } from "../schemas/opportunitySchema.js";
import { buildDeterministicAnalysis } from "../services/decisionService.js";
import { generateAIAnalysis } from "../services/analysisService.js";
import { getPublicQuestions } from "../services/scoringService.js";
import {
  createOpportunity,
  createAssessment,
  createAnalysisResult,
  getOpportunityById,
  listOpportunities
} from "../repositories/opportunityRepository.js";

export async function getQuestions(_req: Request, res: Response) {
  return res.json({
    questions: getPublicQuestions()
  });
}

export async function analyzeOpportunity(req: Request, res: Response) {
  const parsed = analysisRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      details: parsed.error.flatten()
    });
  }

  const { opportunity, answers } = parsed.data;

  try {
    const deterministic = buildDeterministicAnalysis(opportunity, answers);
    const ai = await generateAIAnalysis({ opportunity, deterministic });

    const savedOpportunity = await createOpportunity(opportunity);
    const assessment = await createAssessment({
      opportunityId: savedOpportunity.id,
      answers,
      deterministic
    });

    await createAnalysisResult({
      assessmentId: assessment.id,
      ai
    });

    return res.status(201).json({
      opportunityId: savedOpportunity.id,
      assessmentId: assessment.id,
      deterministic,
      ai
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to analyze opportunity",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

export async function getOpportunities(_req: Request, res: Response) {
  try {
    const items = await listOpportunities();
    return res.json(items);
  } catch {
    return res.status(500).json({ error: "Failed to load opportunities" });
  }
}

export async function getOpportunity(req: Request, res: Response) {
  try {
    const item = await getOpportunityById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Opportunity not found" });
    }

    return res.json(item);
  } catch {
    return res.status(500).json({ error: "Failed to load opportunity" });
  }
}