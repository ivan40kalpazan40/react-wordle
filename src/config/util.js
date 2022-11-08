import { VALID_WORD_CHECK } from './constants';

export const validChecker = async (guessWord) => {
  return await fetch(`${VALID_WORD_CHECK}${guessWord}`);
};

export const alphabetConstructor = () => {
  const alphabet = [];

  for (let i = 0; i < 26; i++) {
    alphabet.push({ letter: String.fromCharCode(i + 65), status: 'free' });
  }

  return alphabet;
};
