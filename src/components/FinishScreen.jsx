import { useQuiz } from '../contexts/QuizContext';

export default function FinishScreen() {
  const { points, maxPoints, highscore, dispatch } = useQuiz();
  const percentage = Math.ceil((points / maxPoints) * 100);

  return (
    <>
      <p className="result">
        You scored {points} out of {maxPoints} ({percentage}%)
      </p>
      <p className="highscore">(Your Highscore - {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  );
}
