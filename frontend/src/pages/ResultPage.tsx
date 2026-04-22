import Stepper from "../components/Stepper";
import ResultSummary from "../components/ResultSummary";
import RoadmapView from "../components/RoadmapView";
import type { AnalyzeResponse, OpportunityInput } from "../types";

type ResultPageProps = {
  result: AnalyzeResponse;
  opportunity: OpportunityInput;
  onRestart: () => void;
};

export default function ResultPage({
  result,
  opportunity,
  onRestart
}: ResultPageProps) {
  return (
    <>
      <section className="card">
        <Stepper currentStep="result" />
        <span className="eyebrow">Decision-ready output</span>
        <h2>{opportunity.ideaTitle}</h2>
        <p className="section-copy">
          Deterministic diagnosis plus AI-generated strategic interpretation.
        </p>
      </section>

      <section className="card">
        <ResultSummary result={result} />
      </section>

      <section className="card">
        <div className="list-card">
          <strong>Submitted opportunity</strong>

          <div className="opportunity-block">
            <div className="opportunity-label">Value proposition</div>
            <p className="result-copy">{opportunity.valueProposition}</p>
          </div>

          <div className="opportunity-block">
            <div className="opportunity-label">Target customer</div>
            <p className="result-copy">{opportunity.targetCustomer}</p>
          </div>

          <div className="opportunity-block">
            <div className="opportunity-label">Customer problem</div>
            <p className="result-copy">{opportunity.customerProblem}</p>
          </div>

          {opportunity.revenuePotential ? (
            <div className="opportunity-block">
              <div className="opportunity-label">Revenue potential</div>
              <p className="result-copy">{opportunity.revenuePotential}</p>
            </div>
          ) : null}

          {opportunity.strategicFit ? (
            <div className="opportunity-block">
              <div className="opportunity-label">Strategic fit</div>
              <p className="result-copy">{opportunity.strategicFit}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="card">
        <span className="eyebrow">90-day roadmap</span>
        <h2>Recommended next steps</h2>
        <p className="section-copy">
          A pragmatic sequence to convert the idea into a validated product opportunity.
        </p>

        <RoadmapView roadmap={result.ai.roadmap_90_days} />
      </section>

      <section className="card">
        <div className="footer-actions">
          <button className="btn btn-primary" onClick={onRestart}>
            Restart workflow
          </button>
        </div>
      </section>
    </>
  );
}