import { useContext } from "react"
import { MineInfoContext, INIT_GAME } from "../lib/MineInfoContext"

import { Button } from "./common/Button";

import styles from "./styles/ResetButton.module.css";

export const ResetButton = () => {
    const { mineInfo, dispatch } = useContext(MineInfoContext);
    const { halted } = mineInfo;

    // 이겼을 때를 제외하고는
    // "🙂" -> "😭" -> "😵" -> "🙂" 대충 이 순으로 돌아감
    const onMouseEnter = (e) => {
        if(halted) e.target.textContent = "🙂"; // 죽었는데 리셋하려고 하면
        else e.target.textContent = "😵"; // 리셋하려고 하면
    }

    const onMouseLeave = (e) => {
        if(halted) e.target.textContent = "😭"; // 죽었는리셋하려다 말면
        else e.target.textContent = "🙂"; // 리셋하려다 말면
    }

    return (
        <Button
            style={styles.reset}
            value={halted ? "😭" : "🙂"}
            onClick={() => dispatch({ type: INIT_GAME })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    )
}