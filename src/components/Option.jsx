export default function Option({ question, answer, dispatch }) {
  const isAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            isAnswered ? (index === answer ? 'answer' : '') : ''
          } ${
            isAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={isAnswered}
          onClick={() => dispatch({ type: 'setAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
