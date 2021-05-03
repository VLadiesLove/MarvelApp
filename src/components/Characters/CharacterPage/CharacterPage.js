import React, { useEffect, useState } from "react";
import styles from "./CharacterPage.module.scss";
import { getComics, getSeries, getEvents } from "../../../api/api";
import Character from "../../Charactrer/Character";


export default function CharacterPage({ characters, match }) {
  let key = 0;
  let key_1 = 0;
  let key_2 = 0;
  const [comics, setComics] = useState([]);
  const [series, setSeries] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getComics(match.params.id).then((response) => {
      setComics(response.data.data.results);
    });
    getSeries(match.params.id).then((response) => {
        setSeries(response.data.data.results);
      });
    getEvents(match.params.id).then((response) => {
        setEvents(response.data.data.results);
      });
  }, [match.params.id]);


  let currentCharacter = null;
  for (let i = 0; i < characters.length; i++) {
    if (characters[i].id === parseInt(match.params.id)) {
      currentCharacter = characters[i];
    }
  }
  return (
    <div className={styles.page}>
      {currentCharacter && <h1>Page of {currentCharacter.name}</h1>}
      <div className={styles.image}>
        <img
          src={`${currentCharacter.thumbnail.path}/portrait_uncanny.${currentCharacter.thumbnail.extension}`}
          alt="#"
        />
      </div>
      {comics && <div className={styles.header}>
        <h2>Comics with {currentCharacter.name} </h2>
      </div>
      }
      <div className={styles.itemsWrapper}>
        {comics && comics.map((item) => {
          return (
            <Character
              name={item.title}
              description={""}
              image={`${item.thumbnail.path}/standard_fantastic.jpg`}
              key={key++}
            />
          );
        })}
      </div>

      {series && <div className={styles.header}>
        <h2>Series with {currentCharacter.name}</h2>
      </div>}
      <div className={styles.itemsWrapper}>
      {series && series.map((item) => {
          return (
            <Character
              name={item.title}
              description={""}
              image={`${item.thumbnail.path}/standard_fantastic.jpg`}
              key={key_1++}
            />
          );
        })}
      </div>

      {events && <div className={styles.header}>
        <h2>Events with {currentCharacter.name}</h2>
      </div>}
      <div className={styles.itemsWrapper}>
      {events && events.map((item) => {
          return (
            <a href={item.urls[0].url} target="_blank" rel="noopener noreferrer" key={key_2++}>
            <Character
              name={item.title}
              description={""}
              image={`${item.thumbnail.path}/standard_fantastic.jpg`} 
            />
            </a>
          );
        })}
      </div>

      {!currentCharacter && <div>NOT FOUND</div>}
    </div>
  );
}
