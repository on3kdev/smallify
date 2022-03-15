import React, { FC } from "react";
import Button from "./Button";
import { Paste } from "./dist/svg";
import styles from "./PasteButton.module.css";

interface Props {
  onClick: () => void;
}

const PasteButton: FC<Props> = ({ onClick }) => (
  <div className={styles.paste}>
    <Button onClick={onClick}>
      <Paste />
    </Button>
  </div>
);

export default PasteButton;
