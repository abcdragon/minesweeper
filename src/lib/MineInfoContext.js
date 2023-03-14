import { createContext, useReducer } from "react"

import { createMineInfo } from "./func";

import { MINE, STATUS, GAME_STATE } from './variables';

const initialState = () => ({
    board: createMineInfo(),
    flag: 10,
    rest_cell: 81,
    game_state: GAME_STATE.BEFORE_START,
});

export const MineInfoContext = createContext(null);

export const CLICK_CELL = "CLICK_CELL";
export const CLICK_FLAG = "CLICK_FLAG";
export const INIT_GAME = "INIT_GAME";

const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
const dx = [-1, 0, 1, -1, 1, -1, 0, 1];

const reducer = (state, action) => {
    const { type, id } = action;

    const loseGame = () => {
        alert("boooom!");
        return {
            ...state,
            board: state.board.map((cell, _id) => {
                return cell.arndMine !== MINE ? cell : { ...cell, status: id === _id ? STATUS.BOARD_ON_BOOM : STATUS.OPEN };
            }),
            game_state: GAME_STATE.BAD_END,
        };
    }
    
    // 지뢰를 제외한 모든 칸이 열렸다면? ==> 승리
    // 이 때, 지뢰인 칸은 모두 깃발 꽂힌 걸로 처리
    // 그러면 깃발은 상관은 승리조건에 아무런 관련이 없다
    const isWon = (rest_cell) => {
        if(rest_cell === 10) {
            alert("You win!!!");
            return true;
        }

        return false;
    }

    const cntFlag = (id) => {
        const ret = {
            mof: 0,
            nof: 0,
        }
        
        for(let i = 0; i < 8; i++){
            const [y, x] = [parseInt((id) / 9) + dy[i], id % 9 + dx[i]];
            // 범위를 벗어나면 건너뛰고
            if(y < 0 || y > 8 || x < 0 || x > 8) continue;

            if(state.board[y * 9 + x].status === STATUS.MINE_ON_FLAG) {
                ret.mof += 1;
            }
            
            if(state.board[y * 9 + x].status === STATUS.NONE_ON_FLAG) {
                ret.nof += 1;
            }
        }

        return ret;
    }

    const clickCell = () => {
        const change = new Set(), id_stack = [];
        if(state.board[id].status === STATUS.CLOSE){
            change.add(id);
        }

        // mine on flag / none on flag
        const { mof, nof } = cntFlag(id);

        // 깃발이 모두 올바르게 설치되었으면
        if(state.board[id].arndMine === mof) {
            for(let i = 0; i < 8; i++){
                const [y, x] = [parseInt((id) / 9) + dy[i], id % 9 + dx[i]];
                // 범위를 벗어나면 건너뛰고
                if(y < 0 || y > 8 || x < 0 || x > 8) continue;
                
                // 이미 열렸으면 건너뛰고
                if(state.board[y * 9 + x].status === STATUS.OPEN) continue;

                // 깃발이면 건너뛰고
                if(state.board[y * 9 + x].status & STATUS.FLAG) continue;

                change.add(y * 9 + x);

                // 지뢰가 없다면
                if(state.board[y * 9 + x].arndMine === 0)
                    id_stack.push(y * 9 + x);
            }
        }
        
        // 올바르게 설치되지 않은 깃발이 있으면
        else if(state.board[id].arndMine === mof + nof) return loseGame();

        // else(깃발이랑 보드가 다르면): 주변칸이 안 열림 == 그대로
    
        while(id_stack.length){
            const _id = id_stack.pop();
            change.add(_id);
            
            if(state.board[_id].arndMine !== 0) continue;

            for(let i = 0; i < 8; i++){
                const [y, x] = [parseInt((_id) / 9) + dy[i], _id % 9 + dx[i]];
                // 범위를 벗어나면 건너뛰고
                if(y < 0 || y > 8 || x < 0 || x > 8) continue;

                // 이미 등록되어 있으면 건너뛰고
                if(change.has(y * 9 + x)) continue;

                // 지뢰면 건너뛰고
                if(state.board[y * 9 + x].arndMine === MINE) continue;

                // 이미 열렸으면 건너뛰고
                if(state.board[y * 9 + x].status === STATUS.OPEN) continue;

                // 깃발이면 건너뛰고
                if(state.board[y * 9 + x].status & STATUS.FLAG) continue;

                id_stack.push(y * 9 + x);
            }
        }

        return {
            ...state,
            rest_cell: state.rest_cell - change.size,
            board: state.board.map((cell, _id) => {
                return change.has(_id) ? { ...cell, status: STATUS.OPEN } : cell;
            }),
            game_state: isWon(state.rest_cell - change.size) ? GAME_STATE.GOOD_END : state.game_state,
        };
    }

    switch(type){
        case CLICK_CELL:
            switch(state.board[id].status){
                // FLAG 면 무시
                case STATUS.MINE_ON_FLAG: 
                case STATUS.NONE_ON_FLAG: return state;

                // 지뢰를 눌렀으면
                case STATUS.BOARD_ON_MINE: return loseGame();

                // 닫힌 / 열린 칸일 때
                case STATUS.CLOSE:
                    if(state.game_state === GAME_STATE.PROCEED) return clickCell();
                    return {
                        ...clickCell(),
                        game_state: GAME_STATE.PROCEED,
                    };
                    
                case STATUS.OPEN: return clickCell();
            
                default:
                    return state;
            }

        case CLICK_FLAG:
            return state.board[id].status === STATUS.OPEN ? state : {
                    ...state,
                    board: state.board.map((cell) => {
                        return id !== cell.id ? cell : {
                            ...cell,
                            status: cell.status & STATUS.FLAG ? 
                                STATUS.CLOSE : 
                                (cell.arndMine === MINE ? STATUS.MINE_ON_FLAG : STATUS.NONE_ON_FLAG),
                        }
                    }),
                    flag: state.flag + (state.board[id].status & STATUS.FLAG ? 1 : - 1),
                }

        case INIT_GAME:                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            return initialState();

        default:
            return state;
    }
}


export const MineInfoProvider = ({ children }) => {
    const [mineInfo, dispatch] = useReducer(reducer, initialState());
    const theme = {
        textAlign: "center",
        margin: "auto",   
    };

    return (
        <MineInfoContext.Provider value={{ mineInfo, theme, dispatch }}>
            { children }
        </MineInfoContext.Provider>
    )
}
