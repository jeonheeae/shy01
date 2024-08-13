import { useState } from "react";
import data from "./ex03.js";
const Radio = () => {
  const [chk, setChk] = useState({});
  const handleCk = (e) => {
    const { value, checked } = e.target;
    setChk((prev) => ({
      //...prev,
      [value]: checked,
    }));
  };

  return (
    <>
      <h1>4. 라디오확인</h1>
      {data.map((v, i) => (
        <div key={i}>
          <input
            type="radio"
            name="one"
            onChange={handleCk}
            value={v}
            checked={chk[v]}
          />
          {v} <br />
        </div>
      ))}
      <h3>{JSON.stringify(chk)}</h3>
    </>
  );
};
export default Radio;
