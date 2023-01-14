import React from 'react'

export default function Start(props) {

    function startGame () {
        props.handleStartGame()
    }

    return(
        <div className='start-menu'>
            <h1>Video Game Trivia</h1>
            <button className='start-button' onClick={startGame}>Start quiz</button>
        </div>
    )
}