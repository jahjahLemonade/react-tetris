export const STAGE_WIDTH = 12 
export const STAGE_HEIGHT = 20

export const createStage = () =>
Array.from(Array(STAGE_HEIGHT), () => 
    new Array(STAGE_WIDTH).fill([0, 'clear'])
) 

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tech.length; y += 1) {
        for(let x = 0; x < player.tech[y].length; x += 1){
            if(player.tech[y][x]!== 0){
                if(
                    !stage[y + player.position.y + moveY] ||
                    !stage[y + player.position.y + moveY][x + player.position.x + moveX] ||
                    stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !==
                        'clear'
                ) {
                    return true
                }
            }
        }
    }
}