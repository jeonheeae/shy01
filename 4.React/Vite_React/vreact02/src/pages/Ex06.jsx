import "./Ex06.css";
import mystyle from "./Ex06.module.css";
const Css = () => {
  const style1 = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundColor: "Green",
  };
  return (
    <>
      <h1>6. CSS 스타일 적용하기</h1>
      <div style={style1}></div>
      <div style={{ ...style1, backgroundColor: "blue" }}></div>
      <div className={`ex6-div`}></div>
      <div className={mystyle.ex6div}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};
export default Css;
