import React, { useContext, useEffect } from "react";

import { MineInfoContext, CLICK_CELL, CLICK_FLAG } from "../lib/MineInfoContext";
import { STATUS, ICON } from "../lib/variables";
import { Button } from "./common/Button";

import styles from './styles/Mine.module.css';


// halted 인데 flag면 연한 빨간 배경으로..
const Mine = ({ id }) => {
  const { mineInfo, dispatch } = useContext(MineInfoContext);

  const { halted } = mineInfo;
  const { status, arndMine } = mineInfo.board[id];

  const ICONS = ICON(arndMine);

  useEffect(() => {
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

  const style = `${styles.mine} `; /// 숫자에 따라 달라지게

  return (
    <Button 
      style={`${styles.mine}` + (halted && status === STATUS.NONE_ON_FLAG ? ` ${styles.notMine}` : ``)}
      
      disabled={halted}
      onClick={onClick}
      onContextMenu={onContextMenu}
      value={ ICONS[status & STATUS.FLAG ? STATUS.FLAG : status | STATUS.CLOSE] } />
  );
};

export default Mine;
