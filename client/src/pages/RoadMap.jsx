import React, { useState } from "react";
import axios from "axios";

function RoadMap() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const response = await axios.post("https://konya-backend.onrender.com/api/roadmap/generate", {
        content: input,
      });

      if (response.data.success) {
        setOutput(response.data.generatedContent);
      } else {
        setOutput("⚠️ Yanıt alınamadı.");
      }
    } catch (error) {
      setOutput("❌ Hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 30 }}>
      <h1>📘 Yazılım Yol Haritası Asistanı</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        cols={60}
        placeholder="örnek: Backend öğrenmek istiyorum"
        style={{ fontSize: 16, padding: 10, marginTop: 10 }}
      />
      <br />
      <button onClick={handleGenerate} style={{ marginTop: 10, padding: "10px 20px", fontSize: 16 }}>
        🚀 Yol Haritasını Al
      </button>

      {loading && <p style={{ marginTop: 20 }}>⏳ Yanıt hazırlanıyor...</p>}

      {output && (
        <div style={{ marginTop: 30, whiteSpace: "pre-wrap", backgroundColor: "#f4f4f4", padding: 20, borderRadius: 8 }}>
          {output}
        </div>
      )}
    </div>
  );
}

export default RoadMap;
