import classnames from "classnames";
import React, { FC } from "react";
import Input from "./Input";
import styles from "./LinkInput.module.css";

interface Props {
  value: string | undefined;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  error: boolean;
  setValue: (value: string) => void;
}

const LinkInput: FC<Props> = ({
  value,
  onInputChange,
  onSubmit,
  error,
  setValue,
}) => (
  <div className={classnames(styles.container, styles["container-center"])}>
    <h1 className={styles.title}>Smallify</h1>
    <Input
      value={value ?? ""}
      onChange={onInputChange}
      error={error}
      onPaste={async () => setValue(await navigator.clipboard.readText())}
    />
    <button className={styles.submit} onClick={onSubmit} disabled={!!error}>
      Get Url!
    </button>
  </div>
);

export default LinkInput;
