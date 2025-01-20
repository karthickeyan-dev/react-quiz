export default function NextButton({ answer, dispatch }) {
  return (
    answer !== null && (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    )
  );
}
