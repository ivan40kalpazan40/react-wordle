import { useState, useEffect, useRef } from 'react';
import { URL } from './config/constants';
import Row from './components/Row';
import Keyboard from './components/Keyboard';
import { alphabetConstructor, validChecker } from './config/util';
import './App.css';

function App() {
  const effectRan = useRef(false);
  const [word, setWord] = useState('');
  const [table, setTable] = useState(Array(6).fill(null));
  const [guess, setGuess] = useState('');
  const [row, setRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [kbd, setKbd] = useState(alphabetConstructor());
  const className = '';

  useEffect(() => {
    const handleInput = async (event) => {
      if (isGameOver) return;
      if (event.keyCode === 13) {
        // Enter

        if (guess.length < 5) return;

        //
        // guess.map((letter, index) => {
        //   let found = kbd.find((x) => x.letter === letter);
        //   if (word.includes(letter)) {
        //     if (word[index] === guess[index]) {
        //       // set kbd to green for current letter
        //       found.status = 'correctlyGuessed';
        //     } else {
        //       // set kbd to yellow for current letter
        //       found.status = 'closeGuessed';
        //     }
        //   } else {
        //     // set to grey
        //     found.status = 'wrongGuessed';
        //   }
        //   console.log(`FOUND::: ${found}`);
        // });

        // check if valid word
        const response = await validChecker(guess);
        const result = await response.json();
        const isValid = result.Response;
        if (!isValid) {
          setIsIncorrect(true);
          setTimeout(() => {
            setIsIncorrect(false);
          }, 2000);
          return;
        }
        for (let i = 0; i < guess.length; i++) {
          let found = kbd.find(
            (x) => x.letter.toLowerCase() === guess[i].toLowerCase()
          );
          if (word.includes(guess[i])) {
            if (word[i] === guess[i]) {
              found.status = 'correctlyGuessed';
            } else {
              found.status = 'closeGuessed';
            }
          } else {
            found.status = 'wrongGuessed';
          }
        }

        // guess === 5
        if (guess === word) {
          setRow((oldRowState) => oldRowState + 1);
          const rows = [...table];
          rows[row] = guess;
          setTable(rows);
          setGuess('');
          setIsGameOver(true);
          return;
        } else {
          if (row <= 5) {
            setRow((oldRowState) => oldRowState + 1);
            const rows = [...table];
            rows[row] = guess;
            setTable(rows);
            setGuess('');
          }
          return;
        }
      }
      if (event.keyCode === 8) {
        //Backspace
        setGuess(guess.slice(0, -1));
      }

      if (event.keyCode < 65 || event.keyCode > 90) {
        return;
      }
      if (guess.length < 5) {
        if (row < 6) {
          setGuess((oldGuess) => oldGuess + event.key);
        }
      }
    };

    window.addEventListener('keydown', handleInput);
    return () => window.removeEventListener('keydown', handleInput);
  }, [guess, row, table, isGameOver, word]);

  useEffect(() => {
    if (effectRan.current === false) {
      fetch(URL)
        .then((res) => res.json())
        .then((response) => setWord(response.Response));
    }
    return () => (effectRan.current = true);
  }, []);

  return (
    <div className='gameplay'>
      <div className='table'>
        {table.map((line, i) => {
          return (
            <Row
              row={row === i ? guess : line ?? ''}
              isEntered={row !== i && line != null}
              word={word}
              key={i}
            />
          );
        })}
        <p className={isGameOver ? 'success' : isIncorrect ? 'error' : ''}>
          {' '}
          {isGameOver ? 'SUCCESS' : isIncorrect ? 'WORD DOES NOT EXIST' : ''}
        </p>
      </div>
      <Keyboard kbd={kbd} />
    </div>
  );
}

export default App;
