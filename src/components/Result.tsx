import classNames from "classnames";
import React, { FC } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import { Back, Replay } from "./dist/svg";
import Header from "./Header";
import Input from "./Input";
import styles from "./Result.module.css";

interface Props {
  url: string | undefined;
  clearFull: () => void;
}

const Result: FC<Props> = ({ url, clearFull }) => {
  const navigate = useNavigate();

  return (
    <>
      <Header isResult={true} value={url} />
      <div id="result" className={classNames(styles.container)}>
        <p className={styles.text}>Copy your new URL!</p>
        <Input
          value={url ?? ""}
          onPaste={() => url && navigator.clipboard.writeText(url)}
        />
        <div className={styles["button-container"]}>
          <Button onClick={() => navigate("/")}>
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
    </>
  );
};

export default Result;
