import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/generate-questions", {
        text: text
      });
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error(err);
      alert("Error generating questions. Check backend console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Question Generator Bot</h1>
      <textarea
        rows={5}
        cols={60}
        placeholder="Enter your passage or topic..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={generateQuestions} disabled={loading}>
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      <div style={{ marginTop: "1rem" }}>
        {questions.length > 0 && <h2>Generated Questions:</h2>}
        <ul>
          {questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
