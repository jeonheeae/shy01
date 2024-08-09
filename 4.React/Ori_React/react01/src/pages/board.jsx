import React from "react";
import "./board.css";

const Board = () => {
  return (
    <>
      <div class="board_wrap">
        <div class="board_title">
          <h3>게시판</h3>
        </div>
        <table class="board_list">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>월요일</td>
              <td>╯︿╰</td>
              <td>2022-08-05</td>
              <td>3</td>
            </tr>
            <tr>
              <td>2</td>
              <td>집에갈래</td>
              <td>집순이</td>
              <td>2023-08-01</td>
              <td>15</td>
            </tr>
            <tr>
              <td>3</td>
              <td>잠이와요</td>
              <td>😴</td>
              <td>2024-07-13</td>
              <td>2</td>
            </tr>
            <tr>
              <td>4</td>
              <td>제목이 길어도 괜찮은가요?</td>
              <td>내가 적는중!!</td>
              <td>2024-08-05</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Board;
