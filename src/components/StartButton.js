import React from 'react'
import {StyledStartButton} from './style/StyledStartButton'

const StartButton = ({callback}) => {
    return (
        <StyledStartButton onClick={callback}>Start Button</StyledStartButton>
    )
}

export default StartButton