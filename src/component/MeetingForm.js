import React, { useState } from 'react';
import './MeetingForm.css'; // 기존 스타일 유지

export default function MeetingForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [count, setCount] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = () => {
    onSubmit({
      title,
      date,
      count,
      deadline,
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">모임 정보 입력</h2>

      <label className="form-label">모임명</label>
      <input
        className="form-input"
        type="text"
        placeholder="예: 점심 모임"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="form-label">날짜</label>
      <input
        className="form-input"
        type="text"
        placeholder="예: 5월 9일"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label className="form-label">인원 수</label>
      <input
        className="form-input"
        type="number"
        placeholder="예: 2"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />

      <label className="form-label">마감 기한</label>
      <input
        className="form-input"
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button className="form-button" onClick={handleSubmit}>
        링크 생성하기
      </button>
    </div>
  );
}
