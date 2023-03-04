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

export const ICON = (arndMine) => ({
    [STATUS.CLOSE]: "",
    [STATUS.OPEN]: arndMine === MINE ? "💣" : arndMine,
    [STATUS.FLAG]: "🚩",
    [STATUS.BOARD_ON_BOOM]: "💥",
});
