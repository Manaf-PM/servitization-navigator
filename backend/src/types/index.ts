export type OpportunityInput = {
  ideaTitle: string;
  valueProposition: string;
  targetCustomer: string;
  customerProblem: string;
  revenuePotential?: string;
  strategicFit?: string;
};

export type AssessmentInput = {
  answers: number[];
};

export type Scores = {
  product: number;
  usage: number;
  result: number;
};

export type DeterministicAnalysis = {
  scores: Scores;
  currentModel: string;
  secondaryModel: string;
  recommendedTransition: string;
  complexity: string;
  opportunityScore: number;
  goDecision: string;
};

export type AIAnalysis = {
  executive_summary: string;
  opportunity_evaluation: string[];
  strategic_rationale: string[];
  priority_actions: string[];
  key_risks: string[];
  decision_rationale: string;
  roadmap_90_days: {
    phase: string;
    objective: string;
    actions: string[];
  }[];
};