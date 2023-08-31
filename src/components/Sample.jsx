import React from "react";
import styles from "./styles/Sample.module.css";
const Sample = ({ title, sample }) => {
  return (
    <div className={styles.box}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.que}>
        <span>{sample}</span>
      </div>
    </div>
  );
};

export default Sample;
