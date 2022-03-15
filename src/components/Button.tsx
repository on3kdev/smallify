import React, { FC } from "react";
import styles from "./Button.module.css";

interface Props {
  onClick: () => void;
}

const Button: FC<Props> = ({ onClick, children }) => (
  <button className={styles.btn} onClick={onClick}>
    {children}
  </button>
);

export default Button;
