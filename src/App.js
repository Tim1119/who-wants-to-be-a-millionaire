import "./App.css";
import { moneyPyramid, data } from "./assets/MainData";
import { useEffect, useState } from "react";
import Trivia from "./components/Trivia/Trivia";
import Timer from "./components/Timer/Timer";
import Start from "./components/Start/Start";

function App() {
  // useEffect(() => {
  //   console.log('s')
  //   });

  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₦0");

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        moneyPyramid.find((money) => money.id === questionNumber - 1).amount
      );
  }, [questionNumber]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="main__earned-text">Hy {username}, you earned: {earned}</h1>
            ) : (
              <>
                <section className="main__top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </section>
                <section className="main__bottom">
                  <Trivia
                    data={data}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    questionNumber={questionNumber}
                  />
                </section>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="pyramid__money-list">
              {moneyPyramid.map((level) => (
                <li
                  className={
                    questionNumber === level.id
                      ? "pyramid__money-list-item active"
                      : "pyramid__money-list-item"
                  }
                >
                  <span className="pyramid__money-list-item-number">
                    {level.id}
                  </span>
                  <span className="pyramid__money-list-item-amount">
                    {level.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
