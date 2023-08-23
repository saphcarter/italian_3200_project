// individual task entry point, will take you to quiz page
function ScoreCard({ taskName, SelfScore, GivenScore }) {
  return (
    <div className="score-card">
      <h4 className="score-text">{taskName}</h4>
      <p className="score-text">Self Evaluation Score: {SelfScore}</p>
      <p className="score-text">Similarity Score: {GivenScore}</p>
    </div>
  );
}

// container for all available task entry points
function ScoreSection() {
  return (
    <>
      <div className="section">
        <h2 className="section-header">Your Results</h2>
        <div className="score-card-section">
          <ScoreCard taskName="Example Quiz" SelfScore="100" GivenScore="100" />
          <ScoreCard taskName="Week 0 Quiz" SelfScore="75" GivenScore="90" />
        </div>
      </div>
    </>
  );
}

export default ScoreSection;
