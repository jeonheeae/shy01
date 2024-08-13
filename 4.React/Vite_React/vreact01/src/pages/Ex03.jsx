import { useState } from "react";
import list from "./ex03.js";

const Check = () => {
  const [chk, setChk] = useState({});
  const handleChk = (e) => {
    const { value, checked } = e.target;
    //const {value:value, checked:checked} = {value:e.target.value, checked:e.target.checked
    setChk((data) => ({ ...data, [value]: checked }));
    console.log(e.target.value);
  };
  return (
    <>
      <h1>3. 체크확인 </h1>
      {list.map((v, i) => {
        return (
          <div key={v}>
            <input
              type="checkbox"
              onChange={handleChk}
              value={v}
              checked={chk[i]}
            />
            {v}
            <br />
          </div>
        );
      })}
      <h3>선택결과:{JSON.stringify(chk)}</h3>
      {/* { list를 사용하면 순서 정렬되서 나옴,
       object사용하면 key가 우선순위라서 나열순서 없음 */}
      {/* <h3>{Object.keys(chk).filter((key) => chk[key])}</h3> */}
      {/* <h3>{list.filter((key) => chk[key]).join("")}</h3> */}
      <h3>
        <ul>
          {list
            .filter((key) => chk[key])
            .map((v) => (
              <li key={v}>{v},</li>
            ))}
        </ul>
      </h3>
    </>
  );
};
export default Check;
