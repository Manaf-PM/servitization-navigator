import { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import { fetchOpportunities } from "../services/api";
import type { StoredOpportunity } from "../types";

type HistoryPageProps = {
  onBack: () => void;
};

function formatDate(value: string): string {
  return new Date(value).toLocaleString();
}

function normalizeLabel(value: string): string {
  return value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function HistoryPage({ onBack }: HistoryPageProps) {
  const [items, setItems] = useState<StoredOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchOpportunities();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load opportunities");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <>
      <section className="card">
        <Stepper currentStep="history" />
        <span className="eyebrow">Saved opportunities</span>
        <h2>Opportunity history</h2>
        <p className="section-copy">
          Review previously analyzed opportunities stored in the database.
        </p>
      </section>

      <section className="card">
        {loading ? <p>Loading history...</p> : null}

        {error ? <div className="error-box">{error}</div> : null}

        {!loading && !error && items.length === 0 ? (
          <p>No opportunities yet.</p>
        ) : null}

        {!loading && !error && items.length > 0 ? (
          <div className="history-list">
            {items.map((item) => {
              const latestAssessment = item.assessments[0];

              return (
                <div className="history-card" key={item.id}>
                  <div className="history-card-header">
                    <div>
                      <h3>{item.ideaTitle}</h3>
                      <p className="muted-small">
                        Created {formatDate(item.createdAt)}
                      </p>
                    </div>

                    {latestAssessment ? (
                      <span className="badge badge-blue">
                        {latestAssessment.goDecision}
                      </span>
                    ) : null}
                  </div>

                  <p className="result-copy">{item.valueProposition}</p>

                  <div className="history-meta">
                    <div className="history-meta-item">
                      <strong>Target customer</strong>
                      <span>{item.targetCustomer}</span>
                    </div>

                    {latestAssessment ? (
                      <>
                        <div className="history-meta-item">
                          <strong>Current model</strong>
                          <span>{normalizeLabel(latestAssessment.currentModel)}</span>
                        </div>

                        <div className="history-meta-item">
                          <strong>Recommended transition</strong>
                          <span>{normalizeLabel(latestAssessment.recommendedTransition)}</span>
                        </div>

                        <div className="history-meta-item">
                          <strong>Opportunity score</strong>
                          <span>{latestAssessment.opportunityScore} / 10</span>
                        </div>
                      </>
                    ) : null}
                  </div>

                  {latestAssessment?.analysisResult ? (
                    <div className="list-card">
                      <strong>Latest executive summary</strong>
                      <p className="result-copy">
                        {latestAssessment.analysisResult.executiveSummary}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="footer-actions">
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
        </div>
      </section>
    </>
  );
}