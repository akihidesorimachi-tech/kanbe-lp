import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { X, Mail, ChevronRight } from "lucide-react";
import AnswerBottomSections from "@/components/AnswerBottomSections";

export default function AnswerBeginner() {
  const [, navigate] = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [toastMounted, setToastMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof (window as any).fbq === 'function') { (window as any).fbq('track', 'Lead'); }
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") !== "1") return;
    window.history.replaceState(null, "", window.location.pathname);
    const t = setTimeout(() => {
      setToastMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShowToast(true));
      });
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const closeToast = () => {
    setShowToast(false);
    setTimeout(() => setToastMounted(false), 500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "'Noto Sans JP', sans-serif" }}>

      {/* ===== TOAST NOTIFICATION ===== */}
      {toastMounted && (
        <div
          style={{
            position: "fixed",
            top: showToast ? "16px" : "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            transition: "top 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
            width: "calc(100% - 32px)",
            maxWidth: "440px",
          }}
        >
          <div style={{
            background: "#1B2A5E",
            color: "#fff",
            borderRadius: "12px",
            padding: "14px 16px 10px 14px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
              <div style={{ flexShrink: 0, marginTop: "2px" }}>
                <Mail size={20} color="#F5C400" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 900, fontSize: "0.9rem", color: "#F5C400" }}>
                  メールに答えと無料相談クーポンをお送りしました
                </p>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#CBD5E1", lineHeight: 1.5 }}>
                  届かない場合は迷惑メールフォルダもご確認ください
                </p>
              </div>
              <button
                onClick={closeToast}
                style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#94A3B8", marginTop: "1px" }}
                aria-label="閉じる"
              >
                <X size={16} />
              </button>
            </div>
            <button
              onClick={closeToast}
              style={{
                width: "100%", padding: "8px", background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px",
                color: "#CBD5E1", fontSize: "0.8rem", fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.03em"
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* ===== POWERED BY (TOP) ===== */}
      <div style={{ background: "#F5F7FA", borderBottom: "1px solid #E2E8F0", padding: "6px 0", textAlign: "center" }}>
        <a
          href="https://takita-tax-raxy253c.manus.space"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#64748B", fontSize: "0.7rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          powered by <span style={{ color: "#1B2A5E", fontWeight: 700 }}>瀧田潤税理士事務所</span>
        </a>
      </div>

      {/* ===== BACK BUTTON ===== */}
      <div style={{ background: "#F5F7FA", padding: "8px 16px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            background: "none", border: "none", cursor: "pointer",
            color: "#1B2A5E", fontSize: "0.85rem", fontWeight: 700,
            padding: "4px 0",
          }}
        >
          ← 戻る
        </button>
      </div>

      {/* ===== HEADER ===== */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #E2E8F0",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "4px 10px", border: "2px solid #1B2A5E", borderRadius: "4px", color: "#fff", background: "#1B2A5E" }}>
            勤務医限定
          </span>
          <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "4px 10px", border: "2px solid #1B2A5E", borderRadius: "4px", color: "#1B2A5E", background: "#fff" }}>
            無料FP相談
          </span>
        </div>
        <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "4px 10px", background: "#DC2626", color: "#fff", borderRadius: "4px", letterSpacing: "0.03em" }}>
          6月限定先着15名
        </span>
      </div>

      {/* ===== GREEN DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #059669, #34D399, #059669)" }} />

      {/* ===== ANSWER SECTION ===== */}
      <section style={{ background: "#fff", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>

          {/* セクションラベル */}
          <p style={{ color: "#059669", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>
            ANSWER
          </p>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "6px" }}>
            「何から始めれば？」への<br />
            <span style={{ color: "#DC2626" }}>明確な答え</span>が3つあります
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.7, marginBottom: "28px" }}>
            情報が多すぎて迷うのは当然です。でも実は、勤務医の先生が最初にやるべきことはシンプルに絞られています。専門家の知識をもとに、あなたに合った道筋を一緒に整理しましょう。
          </p>

          {/* ===== 答え 1 ===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            1．まずは一度ちゃんと考えてみる
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
            お金の勉強は難しそうに見えるので、腰が重くなるのは当然です。でも<strong>考えてみれば意外と簡単</strong>——ゴールから逆算して「いくら貯めるか」「何を使うか」を決めるだけです。一度方針を決めてしまえば、あとは<strong>ほぼ放置できる</strong>積立投資など、忙しい勤務医の先生にこそピッタリの資産形成法があります。
          </p>
          <div style={{ background: "#F0FDF4", borderRadius: "10px", padding: "14px 16px", marginBottom: "28px", borderLeft: "4px solid #059669" }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#065F46", margin: "0 0 6px" }}>忙しい先生に向いている理由</p>
            {[
              "「積み立て設定」をしたら毎月自動で動く",
              "相場を毎日チェックする必要なし。長期保有が基本",
              "一度方針を決めれば、年1回の見直しで十分",
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: i < 2 ? "6px" : 0 }}>
                <span style={{ color: "#059669", fontWeight: 900, flexShrink: 0 }}>✓</span>
                <p style={{ fontSize: "0.82rem", color: "#374151", margin: 0, lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>

          {/* ===== 答え 2 ===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            2．王道はNISAでインデックス投資、安全資産という選択肢も
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
            資産形成の王道は<strong>NISAを使ったインデックス投資</strong>です。非課税で積み立てられ、経済の成長に乗ることができるシンプルな方法です。一方、「元本を減らしたくない」「リスクを最小限にしたい」という先生には、債券や貯蓄保険などの<strong>安全資産</strong>を使うだけでもインフレには対応できます。
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
            {[
              { label: "攻め", sublabel: "NISAインデックス投資", desc: "長期で大きな資産形成を狙う王道。非課税で積み立て、毎月自動積立で放置できる。世界経済の成長に乗るシンプルな方法", labelColor: "#DC2626", labelBg: "#FEF2F2", borderColor: "#FECACA" },
              { label: "守り", sublabel: "安全資産（債券・保険）", desc: "元本割れのリスクを抑えたい先生向き。インフレに負けない程度のリターンを安定的に確保。攻めと並行してリスク調整にも活用できる", labelColor: "#1D4ED8", labelBg: "#EFF6FF", borderColor: "#BFDBFE" },
            ].map((item, i) => (
              <div key={i} style={{ background: item.labelBg, border: `1px solid ${item.borderColor}`, borderRadius: "8px", padding: "12px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 900, color: item.labelColor }}>{item.label}</span><br />
                  <span style={{ fontSize: "0.72rem", color: "#6B7280" }}>{item.sublabel}</span>
                </div>
                <p style={{ fontSize: "0.84rem", color: "#374151", margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ===== 答え 3 ===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            3．資格を持った専門家の活用が効率的
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
            SNSやYouTubeで自分であれこれ調べるのは時間がかかる上に、自分に合った答えにたどり着けないことがほとんどです。<strong>国家資格である1級FP</strong>を活用すれば、確かな知識に基き金融商品の全体感を掴みながらあなたの状況に合わせた答えを短時間で得られます。
          </p>
          <div style={{ background: "#F0FDF4", borderRadius: "10px", padding: "14px 16px", marginBottom: "28px", borderLeft: "4px solid #059669" }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#065F46", margin: "0 0 6px" }}>1級FPの活用が効率的な理由</p>
            {[
              "厚生労働省認可の国家資格なので確かな知識を有している",
              "自分で調べる何十時間分を、30分の相談で凝縮できる",
              "金融商品の全体感を掴みながら、特定の商品に寄らず中立的にアドバイス。",
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: i < 2 ? "6px" : 0 }}>
                <span style={{ color: "#059669", fontWeight: 900, flexShrink: 0 }}>✓</span>
                <p style={{ fontSize: "0.82rem", color: "#374151", margin: 0, lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>

          {/* ===== ANSWER CTA ===== */}
          <div style={{
            background: "#F5F7FA", border: "1px solid #E5E7EB",
            borderRadius: "10px", padding: "16px", textAlign: "center", marginBottom: "4px"
          }}>
            <p style={{ fontSize: "0.95rem", color: "#1B2A5E", fontWeight: 900, lineHeight: 1.8, marginBottom: "14px" }}>
              「何から始めるか」の<span style={{ color: "#DC2626", fontSize: "1.05rem" }}>答え</span>は<br />
              「1級FPとの無料相談」で<br />
              あなた専用に設計できます
            </p>
            <button
              onClick={() => navigate('/booking')}
              style={{
                width: "100%", padding: "16px",
                background: "#059669",
                color: "#fff", fontWeight: 900, fontSize: "1rem",
                border: "none", borderRadius: "10px", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(5,150,105,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
              }}
            >
              FPの空き状況を確認する
              <ChevronRight size={18} />
            </button>
            <p style={{ fontSize: "0.68rem", color: "#6B7280", marginTop: "8px", marginBottom: 0, display: "flex", justifyContent: "space-between", gap: "0" }}>
              <span>✓ 無料</span><span>✓ 30分(延長可)</span><span>✓ オンライン可</span><span>✓ 21時以降可</span>
            </p>
          </div>

        </div>
      </section>

      {/* ===== ABOUT 1ST CLASS FP 以降の共通セクション ===== */}
      <AnswerBottomSections />

    </div>
  );
}
