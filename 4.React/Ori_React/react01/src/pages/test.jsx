import React from "react";
import "./test.css";

const Test = () => {
  return (
    <>
      <div className="board_wrap">
        <div className="board_title">
          <h3>게시판</h3>
        </div>
        <div class="board_list">
          <div class="header">
            <div>번호</div>
            <div>제목</div>
            <div>작성자</div>
            <div>작성일</div>
            <div>조회수</div>
          </div>
          <div class="row">
            <div>1</div>
            <div>월요일</div>
            <div>╯︿╰</div>
            <div>2024-08-05</div>
            <div>3</div>
          </div>
          <div class="row">
            <div>2</div>
            <div>집에갈래</div>
            <div>집순이</div>
            <div>2024-08-05</div>
            <div>10</div>
          </div>
          <div class="row">
            <div>3</div>
            <div>잠이와요</div>
            <div>😴</div>
            <div>2024-08-05</div>
            <div>2</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
