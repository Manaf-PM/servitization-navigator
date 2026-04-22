import type { DeterministicAnalysis, OpportunityInput, Scores } from "../types/index.js";
import { computeScores, getDominantModel, getSecondaryModel } from "./scoringService.js";

function getRecommendedTransition(currentModel: string): string {
  if (currentModel === "product") return "usage";
  if (currentModel === "usage") return "result";
  return "scale_result";
}

function getComplexity(currentModel: string): string {
  if (currentModel === "product") return "Medium";
  if (currentModel === "usage") return "Medium / High";
  return "High";
}

function getOpportunityScore(opportunity: OpportunityInput): number {
  const fields = [
    opportunity.valueProposition,
    opportunity.targetCustomer,
    opportunity.customerProblem,
    opportunity.revenuePotential ?? "",
    opportunity.strategicFit ?? ""
  ];

  let score = 0;

  for (const field of fields) {
    if (!field) continue;
    if (field.length > 120) score += 2;
    else if (field.length > 30) score += 1;
  }

  return Math.min(score, 10);
}

function getGoDecision(scores: Scores, currentModel: string, opportunityScore: number): string {
  const values = Object.values(scores);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const confidenceGap = max - min;

  if (opportunityScore >= 8 && confidenceGap >= 4 && currentModel !== "result") {
    return "GO";
  }

  if (opportunityScore <= 4) {
    return "NO GO";
  }

  return "EXPLORE";
}

export function buildDeterministicAnalysis(
  opportunity: OpportunityInput,
  answers: number[]
): DeterministicAnalysis {
  const scores = computeScores(answers);
  const currentModel = getDominantModel(scores);
  const secondaryModel = getSecondaryModel(scores);
  const recommendedTransition = getRecommendedTransition(currentModel);
  const complexity = getComplexity(currentModel);
  const opportunityScore = getOpportunityScore(opportunity);
  const goDecision = getGoDecision(scores, currentModel, opportunityScore);

  return {
    scores,
    currentModel,
    secondaryModel,
    recommendedTransition,
    complexity,
    opportunityScore,
    goDecision
  };
}