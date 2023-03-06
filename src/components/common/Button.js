import styles from "./Button.module.css";

export const Button = ({ className, fontColor, value, disabled, onClick, onContextMenu, onMouseEnter, onMouseLeave }) => {
    return (
        <button
            className={[styles.Btn, (className ? className : '')].join(' ')}
            style={{
                "color": fontColor,
            }}
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