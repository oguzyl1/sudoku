import { useState } from "react";

function SkorBoard({ skorCount }) {
  return (
    <div className="skorboard-container">
      <label htmlFor="" className="skorboard-label">
        Skor : {skorCount}
      </label>
    </div>
  );
}

export default SkorBoard;
