import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import useSound from "use-sound";

import styles from './index.module.css'
import { Button, Container, Message, Title, Timer, TotalMoney } from '../../components'
import play from "../../../assets/sounds/play.mp3"
import rightAnswer from "../../../assets/sounds/correct.mp3"
import wrongAnswer from "../../../assets/sounds/wrong.mp3"
import { useQuestions } from '../../context';
import { IoFileTray } from 'react-icons/io5';

function Game() {

  const { data } = useQuestions()
  const [questionNumber, setQuestionNumber] =useState(0);

  const [message, setMessage] = useState('');
  const [currentMoney, setCurrentMoney] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [playSound] = useSound(play, {volume: 0.20})
  const [correctSound] = useSound(rightAnswer, {volume: 0.20})
  const [wrongSound] = useSound(wrongAnswer, {volume: 0.20})

  console.log('data at Game: ', data)
  const [timer, setTimer] = useState(8)
  const [timeOut, setTimeOut] = useState(false)
  // const [questionAndAnswers, setQuestionAndAnswers] = useState(data[questionNumber.current])
  // const [answersArray,setAnswersArray] = useState([...question.incorrect_answers.map(a => { return {answer: a, handleClick: wrong}}), {answer: question.correct_answer, handleClick: correct}])

  const money =
      [
        { id: 1, amount: 250 },
        { id: 2, amount: 500 },
        { id: 3, amount: 1000 },
        { id: 4, amount: 15000 },
        { id: 5, amount: 30000},
        { id: 6, amount: 60000 },
        { id: 7, amount: 125000 },
        { id: 8, amount: 250000 },
        { id: 9, amount: 500000 },
        { id: 10, amount: 1000000 }
      ]


// const updateQuestionAndAnswers = () => {
//   setQuestion(data[questionNumber])
//   const answers = [...question.incorrect_answers.map(a => { return {answer: a, handleClick: wrong}}), {answer: question.correct_answer, handleClick: correct}]
//   answers.sort(() => Math.random() - 0.5)
//   console.log('questionNumber: ', questionNumber)
//   setAnswersArray(answers)
// }

// useEffect(() => {
//   setQuestion(data[questionNumber])
//   const answers = [...question.incorrect_answers.map(a => { return {answer: a, handleClick: wrong}}), {answer: question.correct_answer, handleClick: correct}]
//   answers.sort(() => Math.random() - 0.5)
//   console.log(questionNumber)
//   setAnswersArray(answers)
// }, [questionNumber])

// useEffect(() => {
//   updateQuestionAndAnswers()
// },[])

useEffect(() => {
  if (timer === 0) {
    setQuestionNumber((prev) => prev + 1) 
  }
 
}, [timer]);
  
  const wrong = () => {
    // e.preventDefault()
    setMessage('You suck! How could you not know that?!')
    // setTimer(8)
    console.log('this is the wrong answer')
    setQuestionNumber((prev) => prev + 1)
    wrongSound()
  }
  const correct = () => {
    // e.preventDefault()
    setMessage('You did well. You\'re still poor tho... ')
    console.log('this is the correct answer')
    setQuestionNumber((prev) => prev + 1)
    setCorrectCount((prev) => prev + 1)
    // setTimer(8)
    setCurrentMoney((prev) => prev + money[correctCount].amount)
    correctSound()
  }

  const handleClick = (answer) => {
    if (answer.correct) {
      correct()
    } else {
      wrong()
    }
  }

  return (
    <div>
      <Title>Welcome to Utility Billionaire Game!!</Title>
      <div>{timer}</div>
      <Container>
        <Timer setTimeOut={timeOut} questionNumber={questionNumber}/>
        <TotalMoney>question for £{money[correctCount].amount}</TotalMoney>
        <Title classVariant='question'>{data[questionNumber].question}</Title>
        {[...data[questionNumber].incorrect_answers, {correct: data[questionNumber].correct_answer}]
            .sort(() => Math.random() - 0.5)        
            .map((a, i) => <Button key={i} handleClick={() => handleClick(a)} text={a} classVariant='answer'/>)}
      </Container>
      <TotalMoney>Total: ${currentMoney}</TotalMoney>
      <Message>{message}</Message>
    </div>
  )
}

export default Game
