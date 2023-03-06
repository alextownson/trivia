import React from 'react'
import { nanoid } from 'nanoid'

export default function Questions(props) {

    function handleClick (answer) {
        props.handleClickAnswers(props.id, answer)
    }

    function cleanUp (data) {
        const cleanData = data.replace(/&quot;/g,'"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'é').replace(/&amp;/g, '&').replace(/&iuml;/g, 'ï')
        return cleanData
    }

    const answers = props.question.answers
    const answerElements = answers.map(answer => {
        let id = null
        if(props.check){
            if (props.question.correct === answer){
                id = 'correct'
            } else if (props.question.selected === answer) {
                id = 'incorrect'
            } else {id = 'not-selected'}

        }
        return(
            <button 
                key={nanoid()} 
                id={id}
                className={props.question.selected === answer ? 'answers selected' : 'answers'} 
                onClick={() => handleClick(answer)}
            >{cleanUp(answer)}</button>   
        )   
})

    return(
        <div className='trivia'>
            <h2 className='questions'>{cleanUp(props.question.question)}</h2>
            {answerElements}
            <hr></hr>
        </div>
    )
}