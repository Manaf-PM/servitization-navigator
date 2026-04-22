import type {
  AnalyzeResponse,
  OpportunityInput,
  Question,
  StoredOpportunity
} from "../types";

const API_BASE_URL = "http://localhost:4000/api";

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch(`${API_BASE_URL}/questions`);

  if (!response.ok) {
    throw new Error("Failed to load questions");
  }

  const data = await response.json();
  return data.questions;
}

export async function analyzeOpportunity(payload: {
  opportunity: OpportunityInput;
  answers: number[];
}): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.details
        ? JSON.stringify(data.details)
        : data.error || "Failed to analyze opportunity"
    );
  }

  return data;
}

export async function fetchOpportunities(): Promise<StoredOpportunity[]> {
  const response = await fetch(`${API_BASE_URL}/opportunities`);

  if (!response.ok) {
    throw new Error("Failed to load opportunities");
  }

  return response.json();
}