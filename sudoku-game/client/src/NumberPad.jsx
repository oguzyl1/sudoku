function NumberPad({handleNumberClick}) {
  return (
    <div className="numbers">
      {[...Array(9).keys()].map((num) => (
        <div key={num + 1}
             className="number"
             onClick={()=>handleNumberClick(num+1)}>{num + 1}</div>
      ))}
      <div className="number number-delete-btn"
           onClick={()=>handleNumberClick("")}>X</div>
    </div>
  );
}

export default NumberPad;
