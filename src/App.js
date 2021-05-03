import "./App.css";
import React, { useState, useEffect } from "react";
import Characters from "./components/Characters/Characters";
import { getCharacters } from "./api/api";
import { Route } from "react-router-dom";
import CharacterPage from "./components/Characters/CharacterPage/CharacterPage";

function App() {
  const [characters, setCharacters] = useState([]);

  const callbackSetCharacters = (characters) => {
    setCharacters((prev) => {
      return [...prev, ...characters];
    });
  };

  useEffect(() => {
    getCharacters(0)
      .then((response) => {
        if (response.status === 200) {
          setCharacters(response.data.data.results);
        }
      })
      .catch(() => {
        alert("Error!!!");
      });
  }, []);

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => (
          <Characters
            characters={characters}
            setCharacters={callbackSetCharacters}
          />
        )}
      />
      <Route
        path="/:id"
        render={({ match }) => (
          <CharacterPage characters={characters} match={match} />
        )}
      />
    </div>
  );
}

export default App;
