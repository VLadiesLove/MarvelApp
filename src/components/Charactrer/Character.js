import React from "react";
import styles from "./Character.module.scss";

const Character = ({ name, description, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={image} alt="#" />
      </div>

      <div className={styles.description}>
        <h2 className={styles.name}>{name}</h2>
        {description}
      </div>
    </div>
  );
};

export default Character;
