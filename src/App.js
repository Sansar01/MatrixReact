import React, { useState } from "react";

const App = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill("white"))); // Initialize matrix with white color
  const [clickOrder, setClickOrder] = useState([]); // To store the sequence of clicks

  const handleClick = (row, col) => {
    const isLastBox = row === 2 && col === 2;

    if (!isLastBox) {
      setClickOrder((prev) => [...prev, { row, col }]);
      setMatrix((prev) =>
        prev.map((r, i) =>
          r.map((color, j) =>
            i === row && j === col ? "green" : color
          )
        )
      );
    } else {
      let delay = 0;
      clickOrder.forEach(({ row, col }, index) => {
        setTimeout(() => {
          setMatrix((prev) =>
            prev.map((r, i) =>
              r.map((color, j) =>
                i === row && j === col ? "orange" : color
              )
            )
          );
        }, delay);
        delay += 500; // Change to orange in sequence
      });
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "5px" }}>
      {matrix.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleClick(rowIndex, colIndex)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: color,
              border: "1px solid black",
              cursor: "pointer",
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default App;
