import { useState } from 'react';


const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (nextMode, replace = false) => {
    if (replace) {
      setHistory([...history.slice(0, -1), nextMode]);
    } else {
      setHistory([...history, nextMode]);
    }
    setMode(nextMode);
  };

  const back = () => {
    if (history.length > 1) {
      const dropLast = history.slice(0, -1);
      setHistory(dropLast);
      let lastIndex = dropLast.length - 1;
      setMode(dropLast[lastIndex]);
    }
  };



  return { mode, transition, back };
};

export default useVisualMode;