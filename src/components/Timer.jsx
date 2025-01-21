import { useEffect } from 'react';

export default function Timer({ secsRemaining, dispatch }) {
  const mins = Math.floor(secsRemaining / 60);
  const secs = secsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
    </div>
  );
}
