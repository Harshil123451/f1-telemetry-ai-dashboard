"use client";

export default function InsightsPanel({ insights }: any) {
  return (
    <div style={{ padding: "20px", background: "#111", color: "#fff" }}>
      <h2>AI Insights</h2>
      {insights.map((item: string, index: number) => (
        <p key={index}>• {item}</p>
      ))}
    </div>
  );
}