import { openaiClient } from "../lib/openai.js";
import { env } from "../config/env.js";
import type { AIAnalysis, DeterministicAnalysis, OpportunityInput } from "../types/index.js";

function fallbackAnalysis(deterministic: DeterministicAnalysis): AIAnalysis {
  return {
    executive_summary:
      `This opportunity appears aligned with a ${deterministic.currentModel}-oriented profile. ` +
      `The recommended next move is ${deterministic.recommendedTransition}, but execution should remain phased and focused.`,

    opportunity_evaluation: [
      "The opportunity addresses a potentially relevant business problem.",
      "Its success depends on internal readiness and the clarity of the value proposition.",
      "A pilot-first approach is more credible than a full rollout."
    ],

    strategic_rationale: [
      "The current business model suggests a realistic transition path rather than a radical jump.",
      "Customer value must be framed in operational or financial terms.",
      "Execution alignment across functions will matter as much as the idea itself."
    ],

    priority_actions: [
      "Refine the opportunity statement around customer value and pain points.",
      "Pilot the offer with one focused target segment.",
      "Define success metrics for adoption, pricing, and feasibility."
    ],

    key_risks: [
      "The opportunity may be strategically attractive but operationally immature.",
      "Ownership between marketing, product, and delivery may remain unclear.",
      "Customers may not yet be ready to adopt or pay for the proposed model."
    ],

    decision_rationale:
      `Recommended decision: ${deterministic.goDecision}. ` +
      `This is based on opportunity quality, current business model maturity, and execution difficulty.`,

    roadmap_90_days: [
      {
        phase: "Days 1-30",
        objective: "Clarify the opportunity",
        actions: [
          "Refine the target customer and pain point",
          "Translate the idea into a sharper value proposition"
        ]
      },
      {
        phase: "Days 31-60",
        objective: "Validate business model fit",
        actions: [
          "Test willingness to pay with selected stakeholders",
          "Define the pilot scope and success metrics"
        ]
      },
      {
        phase: "Days 61-90",
        objective: "Prepare a pilot launch",
        actions: [
          "Align delivery, pricing, and ownership",
          "Run a limited pilot and collect structured feedback"
        ]
      }
    ]
  };
}

export async function generateAIAnalysis(params: {
  opportunity: OpportunityInput;
  deterministic: DeterministicAnalysis;
}): Promise<AIAnalysis> {
  const { opportunity, deterministic } = params;

  if (!openaiClient || !env.OPENAI_MODEL) {
    return fallbackAnalysis(deterministic);
  }

  const prompt = `
You are a senior B2B product strategy advisor.

You are evaluating a new service opportunity.

Opportunity:
${JSON.stringify(opportunity, null, 2)}

Deterministic diagnosis:
${JSON.stringify(deterministic, null, 2)}

Return valid JSON only with this exact schema:
{
  "executive_summary": "string",
  "opportunity_evaluation": ["string", "string", "string"],
  "strategic_rationale": ["string", "string", "string"],
  "priority_actions": ["string", "string", "string"],
  "key_risks": ["string", "string", "string"],
  "decision_rationale": "string",
  "roadmap_90_days": [
    {
      "phase": "string",
      "objective": "string",
      "actions": ["string", "string"]
    },
    {
      "phase": "string",
      "objective": "string",
      "actions": ["string", "string"]
    },
    {
      "phase": "string",
      "objective": "string",
      "actions": ["string", "string"]
    }
  ]
}

Constraints:
- Be concise, specific, and business-oriented.
- Do not use markdown.
- Do not wrap JSON in code fences.
`;

  try {
    const response = await openaiClient.chat.completions.create({
      model: env.OPENAI_MODEL,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a precise B2B product strategy expert. Output valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const raw = response.choices[0]?.message?.content ?? "";
    return JSON.parse(raw) as AIAnalysis;
  } catch {
    return fallbackAnalysis(deterministic);
  }
}