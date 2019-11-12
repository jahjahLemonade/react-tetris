 import {useState, useCallback} from 'react'
 import {random, TETROMINOS} from '../tetrominos'
import { STAGE_WIDTH, checkCollision } from '../gameHelper'

 export const usePlayer = () => {
    const [player, setPlayer] = useState({
        position: { x: 0, y: 0},
        tech: TETROMINOS[0].shape,
        collided: false,
    })

    const rotate = (matrix, d) => {
        const rotatedTetro = matrix.map((_, index) => 
            matrix.map(col => col[index]),
        )
        if(d > 0) return rotatedTetro.map(row => row.reverse())
        return rotatedTetro.reverse()
    }

    const playerRotate = (stage, d) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player))
        clonedPlayer.tech = rotate(clonedPlayer.tech, d)
        
        const position = clonedPlayer.position.x
        let offset = 1
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0})) {
            clonedPlayer.position.x += offset
            offset = -(offset + (offset > 0 ? 1 : -1))
            if(offset > clonedPlayer.tech[0].length) {
                rotate(clonedPlayer.tech, -d)
                clonedPlayer.position.x = position
                return
            }
        }
        setPlayer(clonedPlayer)
    }

    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            position: { x: (prev.position.x += x), y: (prev.position.y += y)}, collided
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            position: {x: STAGE_WIDTH / 2 - 2, y : 0},
            tech: random().shape,
            collided: false
        })
    }, [])
    return [player, updatePlayerPos, resetPlayer, playerRotate]
 }
 