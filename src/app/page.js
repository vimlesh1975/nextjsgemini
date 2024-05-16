'use client'

import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [prompt, setPrompt] = useState("explain Kirchhoff's 1st law");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/gemini", { prompt });
      console.log(response.data.response1)
      setResponse(response.data.response1.response.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error(error);
      // Handle errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", width: "100%", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
        <textarea
          style={{ width: "100%", minHeight: "200px", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc", resize: "vertical" }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button style={{ width: "100%", padding: "10px", borderRadius: "4px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }} type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send to Gemini"}
        </button>
      </form>
      {response && <p style={{ marginTop: "20px", textAlign: "center" }}>{response}</p>}
    </div>
  );
}
