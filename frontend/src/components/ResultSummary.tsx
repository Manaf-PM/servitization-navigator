import type { AnalyzeResponse } from "../types";

type ResultSummaryProps = {
  result: AnalyzeResponse;
};

function normalizeLabel(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
}
function getDecisionClass(decision: string): string {
  if (decision === "GO") return "decision-go";
  if (decision === "NO GO") return "decision-no-go";
  return "decision-explore";
}

function getDecisionText(decision: string): string {
  if (decision === "GO") {
    return "This opportunity is strong enough to justify a focused pilot and concrete productization work.";
  }

  if (decision === "NO GO") {
    return "This opportunity should not move forward in its current form. The gap between idea quality and execution readiness is too high.";
  }

  return "This opportunity deserves validation, but it still needs sharper framing, stronger evidence, or tighter operational alignment.";
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const { deterministic, ai } = result;
  const maxScore = Math.max(
    deterministic.scores.product,
    deterministic.scores.usage,
    deterministic.scores.result,
    1
  );

  return (
    <>
      <div className={`decision-banner ${getDecisionClass(deterministic.goDecision)}`}>
        <div className="decision-title">Decision: {deterministic.goDecision}</div>
        <p>{getDecisionText(deterministic.goDecision)}</p>
      </div>

      <div className="result-grid">
        <div>
          <div className="list-card">
            <strong>AI executive summary</strong>
            <p className="result-copy">{ai.executive_summary}</p>
          </div>

          <div className="list-card">
            <strong>Opportunity evaluation</strong>
            <ul>
              {ai.opportunity_evaluation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="list-card">
            <strong>Strategic rationale</strong>
            <ul>
              {ai.strategic_rationale.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="list-card">
            <strong>Priority actions</strong>
            <ul>
              {ai.priority_actions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="list-card">
            <strong>Key risks</strong>
            <ul>
              {ai.key_risks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="list-card">
            <strong>Deterministic diagnosis</strong>

            <div className="stat-line">
              <span>Current model</span>
              <span className="badge badge-blue">
                {normalizeLabel(deterministic.currentModel)}
              </span>
            </div>

            <div className="stat-line">
              <span>Recommended transition</span>
              <span className="badge badge-blue">
                {normalizeLabel(deterministic.recommendedTransition)}
              </span>
            </div>

            <div className="stat-line">
              <span>Transformation complexity</span>
              <span className="badge badge-orange">{deterministic.complexity}</span>
            </div>

            <div className="stat-line">
              <span>Opportunity score</span>
              <span className="badge badge-green">
                {deterministic.opportunityScore} / 10
              </span>
            </div>

            <div className="score-box">
              <div className="score-row">
                <div className="score-label">Product</div>
                <div className="score-bar">
                  <div
                    className="score-fill fill-product"
                    style={{
                      width: `${(deterministic.scores.product / maxScore) * 100}%`
                    }}
                  />
                </div>
                <div>{deterministic.scores.product}</div>
              </div>

              <div className="score-row">
                <div className="score-label">Usage</div>
                <div className="score-bar">
                  <div
                    className="score-fill fill-usage"
                    style={{
                      width: `${(deterministic.scores.usage / maxScore) * 100}%`
                    }}
                  />
                </div>
                <div>{deterministic.scores.usage}</div>
              </div>

              <div className="score-row">
                <div className="score-label">Result</div>
                <div className="score-bar">
                  <div
                    className="score-fill fill-result"
                    style={{
                      width: `${(deterministic.scores.result / maxScore) * 100}%`
                    }}
                  />
                </div>
                <div>{deterministic.scores.result}</div>
              </div>
            </div>
          </div>

          <div className="list-card">
            <strong>Decision rationale</strong>
            <p className="result-copy">{ai.decision_rationale}</p>
          </div>
        </div>
      </div>
    </>
  );
}