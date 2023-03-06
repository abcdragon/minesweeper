import { MINE, STATUS } from './variables';

const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
const dx = [-1, 0, 1, -1, 1, -1, 0, 1];

export const createMineInfo = () => {
    const board = Array(81).fill().map((_, id) => ({
        id,
        arndMine: 0,
        status: STATUS.CLOSE,
    }));

    let cnt = 10;
    while(cnt) {
        const rndId = Math.floor(Math.random() * 81);
        // 이미 지뢰면 넘어가기
        if(board[rndId].arndMine === MINE) continue;
        
        board[rndId].arndMine = MINE;
        board[rndId].status = STATUS.BOARD_ON_MINE;

        // 주변 칸에 +1
        for(let i = 0; i < 8; i++){
            const [y, x] = [parseInt((rndId) / 9) + dy[i], rndId % 9 + dx[i]];
            if(y < 0 || y > 8 || x < 0 || x > 8) continue;
            if(board[y * 9 + x].arndMine === MINE) continue;
            board[y * 9 + x].arndMine += 1;
        }

        cnt -= 1;
    }

    return board;
};
