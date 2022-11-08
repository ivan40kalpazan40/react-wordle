import { useEffect, useRef } from 'react';

const Keyboard = ({ kbd }) => {
  // const getRandomIntInclusive = () => {
  //   return Math.floor(Math.random() * kbd.length);
  // };

  return (
    <div className='letterBoard'>
      {kbd.map((tile, i) => {
        let className = 'letterBox';
        className += ' ' + tile.status;
        return (
          <div className={className} key={i}>
            {tile.letter}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
