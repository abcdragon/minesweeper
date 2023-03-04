import styles from "./Button.module.css";

export const Button = ({ style, value, disabled, onClick, onContextMenu, onMouseEnter, onMouseLeave }) => {
    return (
        <button
            className={`${styles.Btn} ` + (style !== undefined ? `${style}` : ``)}
            onClick={onClick}
            disabled={disabled}
            onContextMenu={onContextMenu}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            { value }
        </button>
    );
};