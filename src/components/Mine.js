import React, { useContext, useEffect } from "react";

import { MineInfoContext, CLICK_CELL, CLICK_FLAG } from "../lib/MineInfoContext";
import { STATUS, ICON, ARND_COLORS, GAME_STATE } from "../lib/variables";
import { Button } from "./common/Button";

import styles from './styles/Mine.module.css';


// halted 인데 flag면 연한 빨간 배경으로..
const Mine = ({ id }) => {
  const { mineInfo, dispatch } = useContext(MineInfoContext);

  const { game_state } = mineInfo;
  const { status, arndMine } = mineInfo.board[id];

  const ICONS = ICON(arndMine);

  useEffect(() => {
    // render test code
    console.log("HI");
  }, []);

  const onClick = () => {
    // console.log(halted);
    dispatch({ type: CLICK_CELL, id });
  }

  const onContextMenu = (e) => {
    e.preventDefault();

    dispatch({ type: CLICK_FLAG, id });
  }

  return (
    <Button 
      className={[
          (game_state & GAME_STATE.END && status === STATUS.NONE_ON_FLAG ? ` ${styles.notMine}` : ``),
          (status === STATUS.OPEN ? ` ${styles.open}` : ` ${styles.close}`),
        ].join(' ')}
      fontColor={ARND_COLORS[arndMine]}
      disabled={game_state & GAME_STATE.END}
      onClick={onClick}
      onContextMenu={onContextMenu}
      value={ ICONS[status & STATUS.FLAG ? STATUS.FLAG : status | STATUS.CLOSE] } />
  );
};

export default Mine;
