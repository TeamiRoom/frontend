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

    // id만 포함된 링크 생성 ("/write" 없이)
    const newLink = `http://localhost:3000/${newId}`;
    setLink(newLink);
    setModalOpen(true);
  };

  const handleStart = () => {
    console.log("약속서 작성 시작!", link);
    setModalOpen(false);
    if (link) {
      const idFromLink = link.split('/').pop();
      navigate(`/${idFromLink}`); // /write 대신 바로 /id로 이동
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
  const { id: urlId } = useParams();
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
        {/* path를 /write/:id => /:id 로 변경 */}
        <Route
          path="/:id"
          element={<WritePageWrapper formData={formData} id={id} />}
        />
      </Routes>
    </Router>
  );
}
