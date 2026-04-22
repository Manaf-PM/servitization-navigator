type HomePageProps = {
  onStart: () => void;
  onSeeHistory: () => void;
};

export default function HomePage({ onStart, onSeeHistory }: HomePageProps) {
  return (
    <section className="card hero-card">
      <span className="eyebrow">AI-enhanced opportunity workflow</span>
      <h1>Turn marketing ideas into structured product opportunities</h1>
      <p className="hero-copy">
        Evaluate a business opportunity, assess servitization maturity,
        and generate a decision-ready recommendation with a clear action roadmap.
      </p>

      <div className="hero-grid">
        <div className="mini-panel">
          <strong>What this product does</strong>
          <ul>
            <li>Captures an opportunity in a structured way</li>
            <li>Assesses business model maturity</li>
            <li>Recommends the next transition path</li>
            <li>Supports GO / EXPLORE / NO GO decisions</li>
          </ul>
        </div>

        <div className="mini-panel">
          <strong>Workflow</strong>
          <ul>
            <li>Idea input first</li>
            <li>Assessment second</li>
            <li>Decision third</li>
            <li>Roadmap last</li>
          </ul>
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={onStart}>
          Start workflow
        </button>
        <button className="btn btn-secondary" onClick={onSeeHistory}>
          View history
        </button>
      </div>
    </section>
  );
}