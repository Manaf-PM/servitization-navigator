type RoadmapViewProps = {
  roadmap: {
    phase: string;
    objective: string;
    actions: string[];
  }[];
};

export default function RoadmapView({ roadmap }: RoadmapViewProps) {
  return (
    <div className="roadmap-steps">
      {roadmap.map((step, index) => (
        <div className="roadmap-step" key={`${step.phase}-${index}`}>
          <div className="roadmap-number">{index + 1}</div>
          <div>
            <h3>{step.phase}</h3>
            <p>
              <strong>Objective:</strong> {step.objective}
            </p>
            <ul>
              {step.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}