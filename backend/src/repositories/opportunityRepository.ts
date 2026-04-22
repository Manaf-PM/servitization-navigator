import { PrismaClient } from "@prisma/client";
import type { AIAnalysis, DeterministicAnalysis, OpportunityInput } from "../types/index.js";

const prisma = new PrismaClient();

export async function createOpportunity(data: OpportunityInput) {
  return prisma.opportunity.create({
    data: {
      ideaTitle: data.ideaTitle,
      valueProposition: data.valueProposition,
      targetCustomer: data.targetCustomer,
      customerProblem: data.customerProblem,
      revenuePotential: data.revenuePotential || null,
      strategicFit: data.strategicFit || null
    }
  });
}

export async function createAssessment(params: {
  opportunityId: string;
  answers: number[];
  deterministic: DeterministicAnalysis;
}) {
  const { opportunityId, answers, deterministic } = params;

  return prisma.assessment.create({
    data: {
      opportunityId,
      answersJson: JSON.stringify(answers),
      currentModel: deterministic.currentModel,
      secondaryModel: deterministic.secondaryModel,
      recommendedTransition: deterministic.recommendedTransition,
      complexity: deterministic.complexity,
      opportunityScore: deterministic.opportunityScore,
      goDecision: deterministic.goDecision
    }
  });
}

export async function createAnalysisResult(params: {
  assessmentId: string;
  ai: AIAnalysis;
}) {
  const { assessmentId, ai } = params;

  return prisma.analysisResult.create({
    data: {
      assessmentId,
      executiveSummary: ai.executive_summary,
      opportunityEvaluationJson: JSON.stringify(ai.opportunity_evaluation),
      strategicRationaleJson: JSON.stringify(ai.strategic_rationale),
      priorityActionsJson: JSON.stringify(ai.priority_actions),
      keyRisksJson: JSON.stringify(ai.key_risks),
      decisionRationale: ai.decision_rationale,
      roadmapJson: JSON.stringify(ai.roadmap_90_days)
    }
  });
}

export async function listOpportunities() {
  return prisma.opportunity.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      assessments: {
        orderBy: { createdAt: "desc" },
        include: {
          analysisResult: true
        }
      }
    }
  });
}

export async function getOpportunityById(id: string) {
  return prisma.opportunity.findUnique({
    where: { id },
    include: {
      assessments: {
        orderBy: { createdAt: "desc" },
        include: {
          analysisResult: true
        }
      }
    }
  });
}