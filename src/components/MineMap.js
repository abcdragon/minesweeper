import { useContext } from "react";
import { MineInfoContext } from "../lib/MineInfoContext";
import Mine from "./Mine";

const MineMap = () => {
  const { theme } = useContext(MineInfoContext);

  return (
    <table style={theme} onContextMenu={(e) => e.preventDefault()}><tbody>
      {Array(9).fill().map((_, y) => (
        <tr key={y}>
          {Array(9).fill().map((_, x) => (
            <td key={x}>
              <Mine id={y * 9 + x} />
            </td>
          ))}
        </tr>
      ))}
    </tbody></table>
  );
};

export default MineMap;
