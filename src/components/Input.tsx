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
  marginBottom?: boolean;
}

const Input: FC<Props> = ({
  value,
  onChange,
  readOnly,
  error,
  onPaste,
  marginBottom,
}) => (
  <div className={styles.input}>
    <input
      type="text"
      className={classNames(styles["input-field"], {
        [styles["input-readonly"]]: readOnly,
        [styles["input-error"]]: error,
        [styles["input-padding"]]: !!onPaste,
        [styles["input-margin-bottom"]]: marginBottom,
      })}
      placeholder="https://www.npmjs.com/package/smallify"
      autoComplete="off"
      readOnly={readOnly ?? false}
      onChange={onChange}
      defaultValue={value}
    />
    {onPaste && <PasteButton onClick={onPaste} />}
  </div>
);

export default Input;
