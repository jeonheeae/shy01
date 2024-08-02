import "./App.css";
import Login from "./pages/login.jsx";
import Test from "./pages/test.jsx";

function App() {
  const pop = () => alert("안녕하세요🌞");
  const state = true;
  return (
    <>
      <h1>🎇처음 리액트를 정식으로 시작합니다🎇</h1>
      <button onClick={pop}>처음인 버튼</button>
      <hr />
      {state && <Login />}
      <hr />
      {state && <Test />}
    </>
  );
}

export default App;
