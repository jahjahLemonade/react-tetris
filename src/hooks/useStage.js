import {useState, useEffect} from 'react'
import {createStage} from '../gameHelper'

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage())
    useEffect(() => {
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
            }
            return newStage
        }
        setStage(prev => updateStage(prev))
    }, [player, resetPlayer])
    
    return [stage, setStage]
}