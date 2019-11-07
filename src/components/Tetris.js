import React, {useState} from 'react'
import Display from './Display'
import StartButton from './StartButton'
import Stage from './Stage'
import {StyledTetrisWrapper, StyledTetris} from './style/StyledTetris'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player] = usePlayer()
    const [stage, setStage] = useStage(player)
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
            <Stage stage={stage}/>
            <aside>
                {gameOver ? (<Display gameOver={gameOver} text='Game Over Kiddo' />) 
                : ( <div>
                    <Display text='Score'/>
                    <Display text='Rows'/>
                    <Display text='Level'/>
                </div>)}
            </aside>
        <StartButton />
        </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris