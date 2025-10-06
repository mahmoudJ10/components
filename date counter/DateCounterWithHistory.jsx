import { useReducer } from "react";

const initialState = { count: 0, step: 1 };
const actions = [];

// All common states are centerlized in the use reducer function .✨ Nice
function reducer(state, action) {
  console.log(state);
  actions.push(action.type);
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };

    case "dec":
      return { ...state, count: state.count - state.step };

    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("No case matched !");
  }
}

function DateCounter() {
  // it returns current state (count) and the dispatch function as setter
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function() {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);

    // we pass the reducer action , it can have any properities but its common to just have type and payload .
    dispatch({ type: "dec", count, step });
  };

  const inc = function() {
    dispatch({ type: "inc", count, step });
  };
  const defineCount = function(e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function(e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function() {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>
          {step}
        </span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>
        {date.toDateString()}
      </p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
      <div>
        <ActionHistory actions={actions} />
      </div>
    </div>
  );
}

function ActionHistory({ actions = [] }) {
  return (
    <div className="action-history">
      {actions.map(item =>
        <p>
          {item}
        </p>
      )}
    </div>
  );
}
export default DateCounter;
