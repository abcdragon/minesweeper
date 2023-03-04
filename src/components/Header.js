import { useContext } from "react";
import { MineInfoContext } from "../lib/MineInfoContext";

import { ResetButton } from "./ResetButton";
import { Timer } from "./Timer";

export const Header = () => {
    const { mineInfo, theme } = useContext(MineInfoContext);

    return (
        <div style={ theme }>
            <Timer />
            <h1>{mineInfo.halted ? "지뢰를 밟았습니다...." : `남은 지뢰 : ${mineInfo.flag}`}</h1>
            <ResetButton />
            
        </div>
    );
}