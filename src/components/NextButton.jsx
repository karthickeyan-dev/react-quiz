import { useQuiz } from '../contexts/QuizContext';

export default function NextButton() {
  const { answer, dispatch, index, numQuestions } = useQuiz();

  if (answer !== null && index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );
  if (answer !== null && index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    );
}
