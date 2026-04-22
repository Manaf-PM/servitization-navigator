import type { AppStep } from "../types";

type StepperProps = {
  currentStep: AppStep;
};

const steps: { key: AppStep; label: string }[] = [
  { key: "home", label: "1. Home" },
  { key: "opportunity", label: "2. Opportunity" },
  { key: "assessment", label: "3. Assessment" },
  { key: "result", label: "4. Result" },
  { key: "history", label: "5. History" }
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="stepper">
      {steps.map((step) => (
        <div
          key={step.key}
          className={`step-pill ${step.key === currentStep ? "active" : ""}`}
        >
          {step.label}
        </div>
      ))}
    </div>
  );
}