const Row = ({ row, word, isEntered }) => {
    const line = [];
    for (let i = 0; i < 5; i++) {
      const char = row[i];
      let className = 'tile';
      if (isEntered) {
        if (char === word[i]) {
          className += ' correct';
        } else if (word.includes(char)) {
          className += ' available';
        } else {
          className += ' filled';
        }
      }
      line.push(
        <div className={className} key={i}>
          {char}
        </div>
      );
    }
  
    return <div className='row'>{line}</div>;
  };
  
  export default Row;