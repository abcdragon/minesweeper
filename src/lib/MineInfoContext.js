import { createContext, useReducer } from "react"

import { createMineInfo } from "./func";

import { MINE, STATUS } from './variables';

const initialState = {
    board: createMineInfo(),
    flag: 10,
    halted: false,
}

export const MineInfoContext = createContext(null);

export const CLICK_CELL = "CLICK_CELL";
export const CLICK_FLAG = "CLICK_FLAG";
export const INIT_GAME = "INIT_GAME";

const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
const dx = [-1, 0, 1, -1, 1, -1, 0, 1];


// 1. 승리 패턴이랑 2. 시간 넣으면 끝
const reducer = (state, action) => {
    const { type, id } = action;
    const loseGame = () => {
        alert("boooom!");
        return {
            ...state,
            board: state.board.map((cell, _id) => {
                return cell.arndMine !== MINE ? cell : { ...cell, status: id === _id ? STATUS.BOARD_ON_BOOM : STATUS.OPEN };
            }),
            halted: true,
        };
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

    switch(type){
        case CLICK_CELL:
            switch(state.board[id].status){
                // FLAG 면 무시
                case STATUS.MINE_ON_FLAG: 
                case STATUS.NONE_ON_FLAG: return state;

                // 지뢰를 눌렀으면
                case STATUS.BOARD_ON_MINE: return loseGame();

                // 열렸거나 닫히면
                case STATUS.CLOSE:
                case STATUS.OPEN:
                    const change = new Set(), id_stack = [];
                    change.add(id);

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

                    // else(깃발이랑 보드가 다르면): 주변칸이 안 열림
                
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
                        board: state.board.map((cell, _id) => {
                            return change.has(_id) ? { ...cell, status: STATUS.OPEN, } : cell;
                        }),
                    };
            
                default:
                    return state;
            }

        case CLICK_FLAG:
            return state.board[id].status === STATUS.OPEN ? state : {
                ...state,
                board: state.board.map((cell) => {
                    return id !== cell.id ? cell : {
                        ...cell,
                        // 이미 flag가 세워져 있으면 CLOSE로
                        status: cell.status & STATUS.FLAG
                                ? STATUS.CLOSE
                                : (cell.arndMine === MINE 
                                    ? STATUS.MINE_ON_FLAG : STATUS.NONE_ON_FLAG),
                    }
                }),
                flag: state.board[id].status & STATUS.FLAG
                        ? state.flag + 1 
                        : state.flag - 1,
            };

        case INIT_GAME:
            return {
                board: createMineInfo(),
                flag: 10,
                halted: false,
            };

        default:
            return state;
    }
}


export const MineInfoProvider = ({ children }) => {
    const [mineInfo, dispatch] = useReducer(reducer, initialState);
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
