export default function FinishScreen({ points, maxPoints, highscore }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  return (
    <>
      <p className="result">
        You scored {points} out of {maxPoints} ({percentage}%)
      </p>
      <p className="highscore">(Your Highscore - {highscore})</p>
    </>
  );
}
