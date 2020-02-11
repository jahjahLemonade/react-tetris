import React, {useState} from 'react'
import Display from './Display'
import StartButton from './StartButton'
import Stage from './Stage'
import {StyledTetrisWrapper, StyledTetris} from './style/StyledTetris'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
import { createStage, checkCollision } from '../gameHelper'
import { useInterval } from '../hooks/useInterval'
import { useGameStatus } from '../hooks/useGameStatus'

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

    const movePlayer = (d) => {
        if(!checkCollision(player, stage, {x: d, y: 0}))
        updatePlayerPos({x: d, y: 0})
    }
    const startGame = () => {
        setStage(createStage())
        setDropTime(500)
        resetPlayer()
        setScore(0)
        setLevel(0)
        setRows(0)
        setGameOver(false)
    }
    const drop = () => {
        if(rows > (level + 1) * 10){
            setLevel(prev => prev + 1)
            setDropTime(500 / (level + 1) + 200)
        }
        if(!checkCollision(player, stage, { x: 0, y: 1})){
            updatePlayerPos({x: 0, y: 1, collided: false})
        } else {
            if(player.position.y < 1){
                console.log("Game Over!!!")
                setGameOver(true)
                setDropTime(null)
            }
            updatePlayerPos({ x: 0, y: 0, collided: true})
        }
       
    }

    const keyUp = ({keyCode}) => {
        if(!gameOver){
            if(keyCode === 40){
                setDropTime(500 / (level + 1) + 200)
            }
        }
    } 
    const dropPlayer = () => {
        setDropTime(null)
        drop()

    }
    const move = ({keyCode}) => {
        if(!gameOver){
            if(keyCode === 37){
                movePlayer(-1)
            }else if(keyCode === 39){
                movePlayer(1)
            }else if(keyCode === 40){
                dropPlayer()
            }
            else if(keyCode === 38){
                playerRotate(stage, 1)
            }
        }
    }

    useInterval(() => {
        drop()
    }, dropTime)
    return (
        <StyledTetrisWrapper role='buttton' tabIndex='0' onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
            <Stage stage={stage}/>
            <aside>
                {gameOver ? (<Display gameOver={gameOver} text='Game Over Kiddo' />) 
                : ( <div>
                    <Display text={`Score: ${score}`}/>
                    <Display text={`Rows: ${rows}`}/>
                    <Display text={`Level: ${level}`}/>
                </div>)}
            </aside>
        <StartButton callback={startGame} />
        </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris