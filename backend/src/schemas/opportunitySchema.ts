import { z } from "zod";

export const opportunitySchema = z.object({
  ideaTitle: z.string().min(3).max(120),
  valueProposition: z.string().min(10).max(500),
  targetCustomer: z.string().min(5).max(300),
  customerProblem: z.string().min(10).max(500),
  revenuePotential: z.string().max(300).optional().or(z.literal("")),
  strategicFit: z.string().max(300).optional().or(z.literal(""))
});

export const analysisRequestSchema = z.object({
  opportunity: opportunitySchema,
  answers: z.array(z.number().int().min(0).max(2)).length(9)
});