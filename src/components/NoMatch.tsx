import React, { FC } from "react";
import styles from "./NoMatch.module.css";

const NoMatch: FC = () => (
  <div className="container">
    <h1 className={styles.title}>Sorry, something failed!</h1>
    <p className={styles.text}>It looks like you have called a dead link.</p>
  </div>
);

export default NoMatch;
