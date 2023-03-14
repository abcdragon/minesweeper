import { useState, useEffect, useContext, useRef } from "react";

import { GAME_STATE } from "../lib/variables";
import { MineInfoContext } from "../lib/MineInfoContext";

export const Timer = () => {
    const [ time, setTime ] = useState(0);
    const { mineInfo } = useContext(MineInfoContext);
    const { game_state } = mineInfo;

    const tick = useRef(null);

    const startTick = () => {
        tick.current = setInterval(() => {
            setTime(time => time + 1);
        }, 1000);
    }

    const endTick = () => {
        clearInterval(tick.current);
    }

    useEffect(() => {
        if(game_state === GAME_STATE.PROCEED) startTick(); // 진행중이면 킴
        else if(game_state & GAME_STATE.END) endTick();

        if(game_state === GAME_STATE.BEFORE_START) setTime(0);
    }, [game_state]);

    return <h1>시간 : {time}</h1>
};