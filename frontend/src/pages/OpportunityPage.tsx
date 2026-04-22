import { useState } from "react";
import type { OpportunityInput } from "../types";
import Stepper from "../components/Stepper";

type OpportunityPageProps = {
  initialValue: OpportunityInput;
  onBack: () => void;
  onContinue: (value: OpportunityInput) => void;
};

export default function OpportunityPage({
  initialValue,
  onBack,
  onContinue
}: OpportunityPageProps) {
  const [form, setForm] = useState<OpportunityInput>(initialValue);
  const [error, setError] = useState("");

  function updateField<K extends keyof OpportunityInput>(
    key: K,
    value: OpportunityInput[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  }

 function handleContinue() {
  if (form.ideaTitle.trim().length < 3) {
    setError("Idea title must be at least 3 characters long.");
    return;
  }

  if (form.valueProposition.trim().length < 10) {
    setError("Value proposition must be at least 10 characters long.");
    return;
  }

  if (form.targetCustomer.trim().length < 5) {
    setError("Target customer must be at least 5 characters long.");
    return;
  }

  if (form.customerProblem.trim().length < 10) {
    setError("Customer problem must be at least 10 characters long.");
    return;
  }

  setError("");
  onContinue(form);
}

  return (
    <>
      <section className="card">
        <Stepper currentStep="opportunity" />
        <span className="eyebrow">Opportunity input</span>
        <h2>Describe the idea clearly</h2>
        <p className="section-copy">
          This forces structured thinking before the evaluation starts.
        </p>
      </section>

      <section className="card">
        <div className="grid-2">
          <div>
            <div className="form-group">
              <label htmlFor="ideaTitle">Idea title</label>
              <input
                id="ideaTitle"
                value={form.ideaTitle}
                onChange={(e) => updateField("ideaTitle", e.target.value)}
                placeholder="Example: Predictive maintenance subscription for UPS systems"
              />
            </div>

            <div className="form-group">
              <label htmlFor="targetCustomer">Target customer</label>
              <textarea
                id="targetCustomer"
                value={form.targetCustomer}
                onChange={(e) => updateField("targetCustomer", e.target.value)}
                placeholder="Example: Mid-sized industrial companies with critical uptime requirements"
              />
            </div>

            <div className="form-group">
              <label htmlFor="strategicFit">Strategic fit</label>
              <textarea
                id="strategicFit"
                value={form.strategicFit ?? ""}
                onChange={(e) => updateField("strategicFit", e.target.value)}
                placeholder="Example: Fits our installed base, service capabilities, and recurring revenue strategy"
              />
            </div>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="valueProposition">Value proposition</label>
              <textarea
                id="valueProposition"
                value={form.valueProposition}
                onChange={(e) => updateField("valueProposition", e.target.value)}
                placeholder="Example: Reduce downtime through predictive alerts, proactive service, and subscription-based support"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerProblem">Customer problem</label>
              <textarea
                id="customerProblem"
                value={form.customerProblem}
                onChange={(e) => updateField("customerProblem", e.target.value)}
                placeholder="Example: Customers struggle with unplanned downtime and fragmented support after installation"
              />
            </div>

            <div className="form-group">
              <label htmlFor="revenuePotential">Revenue potential</label>
              <textarea
                id="revenuePotential"
                value={form.revenuePotential ?? ""}
                onChange={(e) => updateField("revenuePotential", e.target.value)}
                placeholder="Example: Converts one-off sales into recurring service contracts and increases retention"
              />
            </div>
          </div>
        </div>

        {error ? <div className="error-box show">{error}</div> : null}

        <div className="footer-actions">
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button className="btn btn-primary" onClick={handleContinue}>
            Continue to assessment
          </button>
        </div>
      </section>
    </>
  );
}