import { createContext, useContext, useEffect, useReducer } from 'react';

const SECS_PER_QUESTION = 1;

const initialState = {
  questions: [],
  //loading, ready, active, finished, error
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'setAnswer': {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: 'ready',
      };
    case 'tick':
      return {
        ...state,
        secsRemaining: state.secsRemaining - 1,
        status: state.secsRemaining === 0 ? 'finished' : state.status,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
  }
}

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secsRemaining,
        dispatch,
        numQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error(`useQuiz is placed outside QuizProvider`);
  }
  return context;
}
