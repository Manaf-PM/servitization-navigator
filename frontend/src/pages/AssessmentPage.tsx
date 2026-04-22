import Stepper from "../components/Stepper";
import type { Question } from "../types";

type AssessmentPageProps = {
  questions: Question[];
  currentQuestionIndex: number;
  onAnswer: (answerIndex: number) => void;
  onBack: () => void;
};

export default function AssessmentPage({
  questions,
  currentQuestionIndex,
  onAnswer,
  onBack
}: AssessmentPageProps) {
  const question = questions[currentQuestionIndex];

  if (!question) {
    return (
      <section className="card">
        <p>Loading questions...</p>
      </section>
    );
  }

  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <>
      <section className="card">
        <Stepper currentStep="assessment" />
        <div className="progress-top">
          <div>
            <h2>Business Model Assessment</h2>
            <p className="muted-small">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="muted-small">{question.section}</div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="card">
        <div className="section-tag">{question.section}</div>
        <h3>{question.question}</h3>
        <p className="section-copy">
          Select the answer that best reflects your current situation.
        </p>

        <div className="answers">
          {question.answers.map((answer, index) => (
            <button
              key={answer}
              className="answer-btn"
              onClick={() => onAnswer(index)}
            >
              {answer}
            </button>
          ))}
        </div>

        <div className="footer-actions">
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
        </div>
      </section>
    </>
  );
}