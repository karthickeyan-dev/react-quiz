export default function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} Points
      </p>
    </header>
  );
}
