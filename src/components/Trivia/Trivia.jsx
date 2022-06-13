import React, { useEffect, useState } from "react";
import "./Trivia.css";
import useSound from "use-sound"
import play from '../../assets/sounds/play.mp3'
import correct from '../../assets/sounds/correct.mp3'
import wrong from '../../assets/sounds/wrong.mp3'
import wait from '../../assets/sounds/wait.mp3'




const Trivia = ({ data, setStop, setQuestionNumber, questionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("trivia__answer");
  const [letsPlay] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [wrongAnswer] = useSound(wrong)

  useEffect(()=>{
    letsPlay()
  },[letsPlay])

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  useEffect(() => {
    if (data.length < questionNumber){

      setStop(true)
      setQuestionNumber(null)
    }
  }, [questionNumber]);

  
  console.log(questionNumber,'Question Number')
  console.log(data.length,'data length')

  const delay =  (duration,callback) => {
      setTimeout(()=>{
        callback()
      },duration)
  }

  const handleClick = (answerItem) =>{
        setSelectedAnswer(answerItem)
        setClassName("trivia__answer active")
        delay(3000,setClassName(answerItem.correct ? "trivia__answer correct" : "trivia__answer wrong"))
        delay(5000,()=>{
          correctAnswer() //plays sound for correct answer
          delay(1000,()=>{
            if (answerItem.correct){
              setQuestionNumber((prev) => prev + 1)
              setSelectedAnswer(null)
            }else{
              wrongAnswer()
              delay(1000,()=>{
                setStop(true)
              })
            }

          })
        })
      
  }

  return (
    <div className="trivia">
      <div className="trivia__question">{question?.question}</div>
      <div className="trivia__answers">
        {question?.answers.map((answerItem, id) => (
          <div className={selectedAnswer === answerItem ? className : "trivia__answer" } key={id} onClick={()=>handleClick(answerItem)}>
            {answerItem.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
