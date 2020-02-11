import {useState, useEffect} from 'react'
import {createStage} from '../gameHelper'

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage())
    const [rowsCleared, setRowsCleared] = useState(0)

    useEffect(() => {
        setRowsCleared(0)

        const sweepRows = newStage => 
            newStage.reduce((ack, row) => {
                if(row.findIndex(c => c[0] === 0) === -1){
                    setRowsCleared(prev => prev + 1)
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']))
                    return ack
                }
                ack.push(row)
                return ack 
            }, []) 
            
        const updateStage = prevStage => {
            const newStage = prevStage.map(row =>
                row.map(c => (c[1] === 'clear' ? [0, 'clear'] : c))
            )
        
            player.tech.forEach((row, y) => {
                row.forEach((v, x) => {
                    if(v !== 0) {
                       newStage[y + player.position.y][x + player.position.x] = [v, `${player.collided ? 'merged' : 'clear'}`] 
                    }
                })
            })
            if(player.collided){
                resetPlayer()
                return sweepRows(newStage)
            }
            return newStage
        }
        setStage(prev => updateStage(prev))
    }, [player, resetPlayer])
    
    return [stage, setStage, rowsCleared]
}