/// arndMine 용
export const MINE = -1;
export const BOOM = -2;

/// status 용
export const STATUS = {
    CLOSE: 8, // 일반 칸 100
    OPEN: 9, // 오픈된 일반 칸 101

    BOARD_ON_MINE: 10, // 1010
    BOARD_ON_BOOM: 11, // 1011 

    FLAG: 16, // 10000
    NONE_ON_FLAG: 17, // FLAG | 1 10001
    MINE_ON_FLAG: 18, // FLAG | 2 10010
}

export const GAME_STATE = {
    BEFORE_START: 0,
    PROCEED: 1,
    
    END: 4,
    BAD_END: 5,
    GOOD_END: 6,
}

export const ICON = (arndMine) => ({
    [STATUS.CLOSE]: "",
    [STATUS.OPEN]: arndMine === MINE ? "💣" : arndMine === 0 ? "" : arndMine,
    [STATUS.FLAG]: "🚩",
    [STATUS.BOARD_ON_BOOM]: "💥",
});

export const ARND_COLORS = {
    [-1]: "black", // -1
    [0]: "black", // 0
    [1]: "blue", // 1
    [2]: "green", // 2
    [3]: "red", // 3
    [4]: "blueviolet", // 4
    [5]: "tomato", // 5
    [6]: "burlywood", // 6
    [7]: "cyan", // 7
    [8]: "pink", // 8
};
