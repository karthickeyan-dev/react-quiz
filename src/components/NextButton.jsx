export default function NextButton({ answer, dispatch, index, numQuestions }) {
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
