import React, { useState, useEffect } from "react";
import { sample, range } from "lodash";
import styles from "./App.module.css";
import { ReactComponent as Hangman } from "./img/hangman.svg";
import clsx from "clsx";
import words from "./words.json";

const alphabet = range(65, 91).map((code) => String.fromCharCode(code));

function App() {
  const [currentWord, setCurrentWord] = useState<string>(
    () => sample(words) as string
  );
  const createLetters = (word: string) =>
    word.split("").map((letter) => ({ letter, isRevealed: false }));
  const [letters, setLetters] = useState(createLetters(currentWord));

  const [correctGuessed, setCorrectGuessed] = useState<string[]>([]);
  const [incorrectGuessed, setIncorrectGuessed] = useState<string[]>([]);

  const hasWon = letters.every((letter) => letter.isRevealed);

  useEffect(() => {
    console.log(letters);
  }, []);

  return (
    <div className={styles.app}>
      <p className={styles.word}>
        {letters.map((letter, index) => (
          <span className={styles.letter} key={index}>
            {letter.isRevealed === true ? letter.letter : "_"}
          </span>
        ))}
      </p>
      <Hangman
        className={clsx(styles.image, {
          [styles.show0]: incorrectGuessed.length > 0,
          [styles.show1]: incorrectGuessed.length > 1,
          [styles.show2]: incorrectGuessed.length > 2,
          [styles.show3]: incorrectGuessed.length > 3,
          [styles.show4]: incorrectGuessed.length > 4,
          [styles.show5]: incorrectGuessed.length > 5,
          [styles.show6]: incorrectGuessed.length > 6,
          [styles.show7]: incorrectGuessed.length > 7,
          [styles.show8]: incorrectGuessed.length > 8,
          [styles.show9]: incorrectGuessed.length > 9,
          [styles.show10]: incorrectGuessed.length > 10,
        })}
      ></Hangman>

      {incorrectGuessed.length > 10 && (
        <div className={styles.lose}>You lost!</div>
      )}
      {hasWon && <div className={styles.win}>You won!</div>}

      <div className={styles.alphabet}>
        {alphabet.map((letter) => {
          return (
            <button
              className={clsx(styles.letterButton, {
                [styles.correct]: correctGuessed.includes(letter),
                [styles.incorrect]: incorrectGuessed.includes(letter),
              })}
              disabled={
                correctGuessed.includes(letter) ||
                incorrectGuessed.includes(letter) ||
                incorrectGuessed.length > 10 ||
                hasWon
              }
              key={letter}
              onClick={(e) => {
                const newLetters = letters.map((l) => {
                  if (l.letter === letter) {
                    return { ...l, isRevealed: true };
                  } else {
                    return l;
                  }
                });
                setLetters(newLetters);
                if (currentWord.includes(letter)) {
                  setCorrectGuessed([...correctGuessed, letter]);
                } else {
                  setIncorrectGuessed([...incorrectGuessed, letter]);
                }
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
      <button
        className={styles.resetButton}
        onClick={(e) => {
          const newWord = sample(words) as string;
          setCurrentWord(newWord);
          setCorrectGuessed([]);
          setIncorrectGuessed([]);
          setLetters(createLetters(newWord));
        }}
      >
        New Game
      </button>
    </div>
  );
}

export default App;
