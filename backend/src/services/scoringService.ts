import type { Scores } from "../types/index.js";

export const QUESTIONS = [
  {
    section: "Business Model",
    question: "How do you generate most of your revenue?",
    answers: [
      { text: "One-time product sales", score: { product: 2, usage: 0, result: 0 } },
      { text: "Mix of sales and services", score: { product: 1, usage: 2, result: 0 } },
      { text: "Subscription or performance-based revenue", score: { product: 0, usage: 1, result: 2 } }
    ]
  },
  {
    section: "Business Model",
    question: "What best describes your customer relationship?",
    answers: [
      { text: "Mostly transactional", score: { product: 2, usage: 0, result: 0 } },
      { text: "Ongoing service relationship", score: { product: 0, usage: 2, result: 1 } },
      { text: "Long-term partnership focused on outcomes", score: { product: 0, usage: 1, result: 2 } }
    ]
  },
  {
    section: "Business Model",
    question: "What do customers primarily buy from you?",
    answers: [
      { text: "A product they own", score: { product: 2, usage: 0, result: 0 } },
      { text: "Access to a product or service bundle", score: { product: 0, usage: 2, result: 1 } },
      { text: "A guaranteed business outcome or performance", score: { product: 0, usage: 0, result: 2 } }
    ]
  },
  {
    section: "Capabilities",
    question: "Do you have internal service delivery capabilities?",
    answers: [
      { text: "Very limited", score: { product: 2, usage: 0, result: 0 } },
      { text: "Some structured service capabilities", score: { product: 0, usage: 2, result: 1 } },
      { text: "Strong service organization with clear processes", score: { product: 0, usage: 1, result: 2 } }
    ]
  },
  {
    section: "Capabilities",
    question: "Do you collect and use customer usage data?",
    answers: [
      { text: "No or very little", score: { product: 2, usage: 0, result: 0 } },
      { text: "Partially", score: { product: 0, usage: 2, result: 1 } },
      { text: "Yes, extensively and continuously", score: { product: 0, usage: 1, result: 2 } }
    ]
  },
  {
    section: "Capabilities",
    question: "How mature is your pricing model?",
    answers: [
      { text: "Mostly fixed price per product", score: { product: 2, usage: 0, result: 0 } },
      { text: "Recurring or subscription-based for some offers", score: { product: 0, usage: 2, result: 1 } },
      { text: "Pricing aligned with outcomes or performance", score: { product: 0, usage: 0, result: 2 } }
    ]
  },
  {
    section: "Market Context",
    question: "What is your market mainly competing on?",
    answers: [
      { text: "Price and product features", score: { product: 2, usage: 0, result: 0 } },
      { text: "Value-added services and flexibility", score: { product: 0, usage: 2, result: 1 } },
      { text: "Business outcomes and risk transfer", score: { product: 0, usage: 1, result: 2 } }
    ]
  },
  {
    section: "Market Context",
    question: "What do your customers expect most?",
    answers: [
      { text: "To buy and own the product", score: { product: 2, usage: 0, result: 0 } },
      { text: "Flexible access and ongoing support", score: { product: 0, usage: 2, result: 1 } },
      { text: "Guaranteed results with minimal management effort", score: { product: 0, usage: 0, result: 2 } }
    ]
  },
  {
    section: "Market Context",
    question: "How strong are external pressures to evolve your model?",
    answers: [
      { text: "Limited pressure", score: { product: 2, usage: 0, result: 0 } },
      { text: "Moderate pressure from competition or regulation", score: { product: 0, usage: 2, result: 1 } },
      { text: "Strong pressure to deliver measurable outcomes", score: { product: 0, usage: 0, result: 2 } }
    ]
  }
];

export function computeScores(answerIndexes: number[]): Scores {
  const scores: Scores = { product: 0, usage: 0, result: 0 };

  answerIndexes.forEach((answerIndex, questionIndex) => {
    const answer = QUESTIONS[questionIndex]?.answers?.[answerIndex];
    if (!answer) return;

    scores.product += answer.score.product;
    scores.usage += answer.score.usage;
    scores.result += answer.score.result;
  });

  return scores;
}

export function getDominantModel(scores: Scores): string {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export function getSecondaryModel(scores: Scores): string {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[1][0];
}

export function getPublicQuestions() {
  return QUESTIONS.map((question) => ({
    section: question.section,
    question: question.question,
    answers: question.answers.map((answer) => answer.text)
  }));
}