import React from 'react'
import { StyledCell } from './style/StyledCell'
import { TETROMINOS } from '../tetrisminos'

const Cell = ({type}) => {
    return (
        <StyledCell type={type} color={TETROMINOS[type].color} />
    )
}

export default Cell