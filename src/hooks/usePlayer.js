 import {useState} from 'react'
 import {random} from '../tetrisminos'

 export const usePlayer = () => {
    const [player, setPlayer] = useState({
        position: { x: 0, y: 0},
        tech: random(),//might  have to come back
        collided: false,
    })
    return [player]
 }