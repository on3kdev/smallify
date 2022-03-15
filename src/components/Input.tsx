import classNames from "classnames";
import React, { FC } from "react";
import styles from "./Input.module.css";
import PasteButton from "./PasteButton";

interface Props {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  error?: boolean;
  onPaste?: () => void;
}

const Input: FC<Props> = ({ value, onChange, readOnly, error, onPaste }) => (
  <div className={styles.input}>
    <input
      type="text"
      className={classNames(styles["input-field"], {
        [styles["input-readonly"]]: readOnly,
        [styles["input-error"]]: error,
        [styles["input-padding"]]: !!onPaste,
      })}
      placeholder="https://www.npmjs.com/package/smallify"
      autoComplete="off"
      readOnly={readOnly ?? false}
      onChange={onChange}
      value={value}
    />
    {onPaste && <PasteButton onClick={onPaste} />}
  </div>
);

export default Input;
