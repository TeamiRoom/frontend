import React, { useRef, useEffect, useState } from "react";
import './WriteForm.css';

export default function WriteForm({ id }) {
  const activityInputRef = useRef(null);
  const [menu, setMenu] = useState("");
  const [activity, setActivity] = useState("");
  const [decoration, setDecoration] = useState(5);
  const [loading, setLoading] = useState(false);

  const [finalResult, setFinalResult] = useState(null);
  const [fetchingFinal, setFetchingFinal] = useState(true);

  useEffect(() => {
    if (activityInputRef.current) {
      activityInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!id) {
      setFetchingFinal(false);
      return;
    }

    setFetchingFinal(true);
    fetch(`/api/promise/final/${id}`)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setFinalResult(data);
          } else {
            setFinalResult(null);
          }
        } else if (res.status === 404) {
          setFinalResult(null);
        } else {
          throw new Error('서버 오류');
        }
      })
      .catch((error) => {
        console.error('최종 결과 불러오기 실패:', error);
        setFinalResult(null);
      })
      .finally(() => {
        setFetchingFinal(false);
      });
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    console.log("작성 내용 제출:", { id, menu, activity, decoration }); // ✅ id 포함
  
    try {
      const response = await fetch('/api/promise/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,             // ✅ id 전송
          menu,
          activity,
          decoration,
        }),
      });
  
      if (!response.ok) throw new Error('서버 오류');
  
      const result = await response.json();
      setFinalResult(result);
  
    } catch (error) {
      alert('제출 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  // 최종 결과 불러오는 중
  if (fetchingFinal) {
    return <div>최종 결과를 불러오는 중입니다...</div>;
  }

  // 최종 결과가 있으면 결과 화면
  if (finalResult) {
    return (
      <div className="page-wrapper">
        <div className="form-container">
          <h2 className="form-title">✨ 약속서가 완성되었습니다! ✨</h2>
          <p><strong>메뉴:</strong> {finalResult.menu}</p>
          <p><strong>활동:</strong> {finalResult.activity}</p>
          <p><strong>꾸밈 점수:</strong> {finalResult.decoration}</p>

          <button className="form-button" onClick={() => setFinalResult(null)}>
            다시 작성하기
          </button>
        </div>
      </div>
    );
  }

  // 작성 폼
  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2 className="form-title">약속서 작성</h2>

        <label className="form-label">오늘은 어떤 메뉴가 마음에 끌리시나요?</label>
        <textarea
          className="form-textarea"
          placeholder="예: 마라탕, 초밥, 삼겹살..."
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        />

        <label className="form-label">오늘은 어떤 걸 하면서 즐기고 싶으세요?</label>
        <textarea
          ref={activityInputRef}
          className="form-textarea"
          placeholder="예: 보드게임, 카페에서 수다, 산책"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />

        <label className="form-label">오늘의 꾸밈 정도는?</label>
        <input
          type="range"
          min="0"
          max="10"
          className="form-range"
          value={decoration}
          onChange={(e) => setDecoration(e.target.value)}
        />

        <button
          className="form-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '제출 중...' : '약속서 제출하기'}
        </button>
      </div>
    </div>
  );
}
