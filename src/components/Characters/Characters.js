import React, { useState, useEffect, useRef } from "react";
import Character from "../Charactrer/Character";
import styles from "./Characters.module.scss";
import { getCharacters } from "../../api/api";
import preloader from "../../assets/images/preloader.svg";
import { NavLink } from "react-router-dom";
  
const Characters = (props) => {
  let key = 0;
  let pageNumber = props.characters.length/20;
  const [ref, setRef] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          getCharacters(pageNumber)
            .then((response) => {
              if (response.status === 200) {
                props.setCharacters(response.data.data.results);
                pageNumber++;
                if (Math.ceil(response.data.data.total/20) === pageNumber){
                  setLoading(false)
                }
              }
            })
            .catch(() => {
              alert("Error!!!");
            });
        }
      },
      { threshold: 0.2 }
    )
  );

  useEffect(() => {
    const currentRef = ref;
    const currentObserver = observer.current;
    if (currentRef) {
      currentObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        currentObserver.unobserve(currentRef);
      }
    };
  }, [ref]);

  return (
    <>
      <div className={styles.cards}>
        <h1 className={styles.cards__header}>Marvel Characters</h1>
        {props.characters.map((character) => {
          return (
            <NavLink to={"/" + character.id} key={key++}>
              <Character
                name={character.name}
                description={character.description}
                image={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                id={character.id}
              />
            </NavLink>
          );
        })}
      </div>
      {loading && (
        <div ref={setRef}>
          <img src={preloader} alt="spinner" />{" "}
        </div>
      )}
    </>
  );
};

export default Characters;
