import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';

import MeetingForm from './component/MeetingForm';
import LinkModal from './component/LinkModal';
import WriteForm from './component/WriteForm';

function HomePage({ setFormData, setId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    console.log("폼 데이터:", formData);
    const newId = new Date().getTime().toString();

    setId(newId);
    setFormData(formData);

    const newLink = `http://localhost:3000/write/${newId}`;
    setLink(newLink);
    setModalOpen(true);
  };

  const handleStart = () => {
    console.log("약속서 작성 시작!", link);
    setModalOpen(false);
    // id는 이미 setId를 통해 상위 상태에 저장됐음
    if (link) {
      // id는 link에서 추출 가능, 또는 상위 상태 id를 사용해도 됨
      // 여기선 그냥 url로 이동
      const idFromLink = link.split('/').pop();
      navigate(`/write/${idFromLink}`);
    }
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <MeetingForm onSubmit={handleFormSubmit} />

      {modalOpen && (
        <LinkModal
          link={link}
          onClose={() => setModalOpen(false)}
          onStart={handleStart}
        />
      )}
    </div>
  );
}

function WritePageWrapper({ formData, id }) {
  // URL 파라미터에서 id 받기
  const { id: urlId } = useParams();

  // id 우선순위: URL param > props id
  const finalId = urlId || id;

  return <WriteForm id={finalId} formData={formData} />;
}

export default function App() {
  const [formData, setFormData] = useState(null);
  const [id, setId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage setFormData={setFormData} setId={setId} />}
        />
        <Route
          path="/write/:id"
          element={<WritePageWrapper formData={formData} id={id} />}
        />
      </Routes>
    </Router>
  );
}
