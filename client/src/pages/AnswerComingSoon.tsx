import { useLocation } from "wouter";

export default function AnswerComingSoon() {
  const [, navigate] = useLocation();
  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
      <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🚧</div>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "12px" }}>
          ただいま作成中です
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "32px" }}>
          このレベル向けのANSWERコンテンツは現在準備中です。<br />
          完成次第、公開いたします。
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#1B2A5E",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 28px",
            fontSize: "0.9rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          トップページに戻る
        </button>
      </div>
    </div>
  );
}
