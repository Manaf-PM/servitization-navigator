import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import OpportunityPage from "./pages/OpportunityPage";
import AssessmentPage from "./pages/AssessmentPage";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";
import { analyzeOpportunity, fetchQuestions } from "./services/api";
import type {
  AnalyzeResponse,
  AppStep,
  OpportunityInput,
  Question
} from "./types";

const emptyOpportunity: OpportunityInput = {
  ideaTitle: "",
  valueProposition: "",
  targetCustomer: "",
  customerProblem: "",
  revenuePotential: "",
  strategicFit: ""
};

export default function App() {
  const [step, setStep] = useState<AppStep>("home");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState("");
  const [opportunity, setOpportunity] = useState<OpportunityInput>(emptyOpportunity);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      try {
        setQuestionsLoading(true);
        setQuestionsError("");
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        setQuestionsError(
          error instanceof Error ? error.message : "Failed to load questions"
        );
      } finally {
        setQuestionsLoading(false);
      }
    }

    loadQuestions();
  }, []);

  function startWorkflow() {
    setStep("opportunity");
  }

  function continueToAssessment(value: OpportunityInput) {
    setOpportunity(value);
    setAnswers(new Array(questions.length).fill(-1));
    setCurrentQuestionIndex(0);
    setStep("assessment");
  }

  async function handleAnswer(answerIndex: number) {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(updatedAnswers);

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    try {
      setSubmitting(true);
      const sanitizedAnswers = updatedAnswers.map((value) => (value < 0 ? 0 : value));
      const analysis = await analyzeOpportunity({
        opportunity,
        answers: sanitizedAnswers
      });
      setResult(analysis);
      setStep("result");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to analyze opportunity");
    } finally {
      setSubmitting(false);
    }
  }

  function handleAssessmentBack() {
    if (currentQuestionIndex === 0) {
      setStep("opportunity");
      return;
    }

    setCurrentQuestionIndex((prev) => prev - 1);
  }

  function resetWorkflow() {
    setStep("home");
    setOpportunity(emptyOpportunity);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setResult(null);
    setSubmitting(false);
  }

  return (
    <Layout>
      {questionsLoading ? (
        <section className="card">
          <p>Loading questions...</p>
        </section>
      ) : questionsError ? (
        <section className="card">
          <div className="error-box">{questionsError}</div>
        </section>
      ) : null}

      {step === "home" && (
        <HomePage
          onStart={startWorkflow}
          onSeeHistory={() => setStep("history")}
        />
      )}

      {step === "opportunity" && (
        <OpportunityPage
          initialValue={opportunity}
          onBack={() => setStep("home")}
          onContinue={continueToAssessment}
        />
      )}

      {step === "assessment" && (
        <>
          {submitting ? (
            <section className="card">
              <p>Analyzing opportunity...</p>
            </section>
          ) : null}

          <AssessmentPage
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onAnswer={handleAnswer}
            onBack={handleAssessmentBack}
          />
        </>
      )}

      {step === "result" && result ? (
        <ResultPage
          result={result}
          opportunity={opportunity}
          onRestart={resetWorkflow}
        />
      ) : null}

      {step === "history" && <HistoryPage onBack={() => setStep("home")} />}
    </Layout>
  );
}