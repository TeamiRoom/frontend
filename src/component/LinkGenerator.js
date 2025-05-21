import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function LinkGenerator({ setModalOpen, setLink }) {
  const handleClick = () => {
    const id = uuidv4();
    const generated = `https://yourapp.com/invite/${id}`;
    setLink(generated);       // ✅ 고쳤다!
    setModalOpen(true);       // ✅ 모달 열기
  };

  return (
    <button onClick={handleClick}>
      링크 생성하기
    </button>
  );
}