export type OpportunityInput = {
  ideaTitle: string;
  valueProposition: string;
  targetCustomer: string;
  customerProblem: string;
  revenuePotential?: string;
  strategicFit?: string;
};

export type Question = {
  section: string;
  question: string;
  answers: string[];
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

export type AnalyzeResponse = {
  opportunityId: string;
  assessmentId: string;
  deterministic: DeterministicAnalysis;
  ai: AIAnalysis;
};

export type StoredAnalysisResult = {
  id: string;
  assessmentId: string;
  executiveSummary: string;
  opportunityEvaluationJson: string;
  strategicRationaleJson: string;
  priorityActionsJson: string;
  keyRisksJson: string;
  decisionRationale: string;
  roadmapJson: string;
  createdAt: string;
};

export type StoredAssessment = {
  id: string;
  opportunityId: string;
  answersJson: string;
  currentModel: string;
  secondaryModel: string;
  recommendedTransition: string;
  complexity: string;
  opportunityScore: number;
  goDecision: string;
  createdAt: string;
  analysisResult: StoredAnalysisResult | null;
};

export type StoredOpportunity = {
  id: string;
  ideaTitle: string;
  valueProposition: string;
  targetCustomer: string;
  customerProblem: string;
  revenuePotential: string | null;
  strategicFit: string | null;
  createdAt: string;
  updatedAt: string;
  assessments: StoredAssessment[];
};

export type AppStep = "home" | "opportunity" | "assessment" | "result" | "history";