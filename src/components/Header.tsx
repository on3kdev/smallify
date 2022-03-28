import classnames from "classnames";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Github, Instagram } from "./dist/svg";
import styles from "./Header.module.css";
import Input from "./Input";

interface Props {
  isResult: boolean;
  value: string | undefined;
}

const Header: FC<Props> = ({ isResult, value }) => (
  <header
    className={classnames(styles.header, {
      [styles["header-flex-end"]]: !isResult,
    })}
  >
    {isResult && (
      <>
        <a
          className={styles["title-small"]}
          onClick={(e) => {
            e.preventDefault();
            <Link to="/" />;
          }}
        >
          Smallify
        </a>
        <Input value={value ?? ""} readOnly={true} />
      </>
    )}
    <div className={styles["external-links"]}>
      <a
        href="https://github.com/on3kdev/"
        target="_blank"
        className={styles.btn}
      >
        <Github className={styles.icon} />
      </a>
      <a
        href="https://www.instagram.com/on3k.dev/"
        target="_blank"
        className={styles.btn}
      >
        <Instagram className={styles.icon} />
      </a>
    </div>
  </header>
);

export default Header;
