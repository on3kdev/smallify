import classNames from "classnames";
import React, { FC } from "react";
import Button from "./Button";
import { Back, Replay } from "./dist/svg";
import Input from "./Input";
import styles from "./Result.module.css";

interface Props {
  url: string | undefined;
  clearFull: () => void;
  setIsResult: (value: boolean) => void;
}

const Result: FC<Props> = ({ url, clearFull, setIsResult }) => (
  <div id="result" className={classNames(styles.container)}>
    <p className={styles.text}>Copy your new URL!</p>
    <Input value="" onPaste={() => url && navigator.clipboard.writeText(url)} />
    <div className={styles["button-container"]}>
      <Button onClick={() => setIsResult(false)}>
        <Back />
      </Button>
      <button className={styles.btn} onClick={clearFull}>
        Send URL!
      </button>
      <Button onClick={clearFull}>
        <Replay />
      </Button>
    </div>
  </div>
);

export default Result;
