import {React, useState, useEffect} from 'react'

export default function App() {

    const [triviaData, setTriviaData] = useState([])
    const [shuffledAnswers, setShuffledAnswers] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([
        {answer: '',
        isCorrect: false},
        {answer: '',
        isCorrect: false},
        {answer: '',
        isCorrect: false},
        {answer: '',
        isCorrect: false},
        {answer: '',
        isCorrect: false}
    ])

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => setTriviaData(data.results))
    }, [])

    useEffect(() => {
        const shuffled = [...triviaData]
        shuffled.map((data, index) => {
            data.id = index
            data.answers = [data.correct_answer, ...data.incorrect_answers]
            data.answers.sort(() => Math.random() - 0.5)
        })
        setShuffledAnswers(shuffled)
    },[triviaData])

    console.log(selectedAnswers)

    function select(index, answer) {
        setSelectedAnswers(prevSelectedAnswers => {
            const newArray = [...prevSelectedAnswers]
            newArray[index].answer = answer
            if (newArray[index].answer === shuffledAnswers[index].correct_answer)
            {newArray[index].isCorrect = true}
            else{newArray[index].isCorrect}
            return newArray
        })
    }

    function checkAnswers() {

        
    }

    return(
        <div className='trivia'>
            {shuffledAnswers.map((question, index) => (
                <div key={question.id}>
                    <h2 className='questions'>{question.question.replace(/&quot;/g,'"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'é')}</h2>
                    {
                        question.answers.map(((answer) => (
                        <button 
                            key={answer} 
                            className='answers'
                            onClick={() => select(index, answer)}
                            style={{backgroundColor: answer === selectedAnswers[index].answer ? '#D6DBF5' : 'transparent'}}
                        >{answer}</button>    
                    )))}
                    <hr></hr>
                </div>
            ))}
            <button 
                className='check-answers'
                onClick={checkAnswers}
            >Check answers</button>
        </div>
    )
}