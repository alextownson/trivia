import {React, useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import Questions from './components/Questions'
import Start from './components/Start'

export default function App() {

    const [start, setStart] = useState(false)
    const [triviaData, setTriviaData] = useState([])
    const [count, setCount] = useState(0)
    const [score, setScore] = useState(0)
    const [check, setCheck] = useState(false)

    const shuffle = (array) => array.sort(() => Math.random() - 0.5)

    useEffect(() => {
        async function getTriviaData() {
            const res = await fetch('https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple')
            const data = await res.json()
            let tdb = []
            data.results.forEach(question => {tdb.push({
                id: nanoid(), 
                question: question.question, 
                correct: question.correct_answer, 
                incorrect: [...question.incorrect_answers], 
                answers: shuffle([question.correct_answer, ...question.incorrect_answers]),
                selected: null,
                response: false
            })
        })
            setTriviaData(tdb)
        }
        getTriviaData()
    }, [count])

    const questionElements = triviaData.map(question => (
        <Questions 
            id={question.id}
            key={question.id}
            question={question}
            handleClickAnswers={handleClickAnswers}
            check={check}
        />
    ))

    function handleClickAnswers (id, answer) {
        setTriviaData(prevTriviaData => prevTriviaData.map(question => {
            let newTriviaData
            if(question.id === id) {
                newTriviaData = {...question, selected: answer}
            } else {newTriviaData = {...question}}
            return newTriviaData
        }))
    }

    function checkAnswers() {
        let selected = true
        triviaData.forEach(question => {
            if (question.selected === null) {
                selected = false
                return
            }
        })
        if (!selected) {
            return
        }
        setTriviaData(prevTriviaData => prevTriviaData.map(question => {
            let newTriviaData
            if (question.selected === question.correct) {
                newTriviaData = {...question, response: true}
                setScore(prevScore => prevScore + 1)
            } else {newTriviaData = {...question}}
            setCheck(true)
            return newTriviaData
        }))
    }

    function newGame() {
        setCount(prevCount => prevCount + 1)
        setCheck(false)
    }

    function handleStartGame () {
        setStart(true)
    }

    return(
        <>
            {start ?
                <div className='trivia'>
                    {questionElements}
                    <div className='end-buttons'>
                        {check && <h3>{score}/5 answers are correct!</h3>}
                        <button onClick={check ? newGame : checkAnswers} className='end-button'>{check ? 'Play again' : 'Check answers'}</button>
                    </div>
                </div>
                :
                <Start  handleStartGame={handleStartGame}/>
            }
        </>
    )   
}