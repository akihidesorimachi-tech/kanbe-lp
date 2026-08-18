/**
 * AnswerPage - ANSWERセクション専用ページ（/answer-intermediate）
 * メールで案内する隠しページ。Home.tsxから分離。
 */

import { useLocation } from "wouter";
import { ChevronRight, X, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import AnswerBottomSections from "@/components/AnswerBottomSections";

export default function AnswerPage() {
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
    <div className="min-h-screen" style={{ background: "#F5F7FA", fontFamily: "'Noto Sans JP', sans-serif" }}>

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
          <span style={{
            fontSize: "0.82rem", fontWeight: 900, padding: "4px 10px",
            border: "2px solid #1B2A5E", borderRadius: "4px", color: "#fff", background: "#1B2A5E"
          }}>
            勤務医限定
          </span>
          <span style={{
            fontSize: "0.82rem", fontWeight: 900, padding: "4px 10px",
            border: "2px solid #1B2A5E", borderRadius: "4px", color: "#1B2A5E", background: "#fff"
          }}>
            無料FP相談
          </span>
        </div>
        <span style={{
          fontSize: "0.82rem", fontWeight: 900, padding: "4px 10px",
          background: "#DC2626", color: "#fff",
          borderRadius: "4px", letterSpacing: "0.03em"
        }}>
          6月限定先着15名
        </span>
      </div>

      {/* ===== BLUE DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== ANSWER SECTION ===== */}
      <section style={{ background: "#fff", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p style={{ color: "#2563EB", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>
            ANSWER
          </p>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.4, marginBottom: "8px", whiteSpace: "nowrap" }}>
            <span style={{ color: "#DC2626" }}>答え</span>は<span style={{ color: "#2563EB" }}>リスク資産</span>・<span style={{ color: "#059669" }}>安全資産</span>の二刀流！
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", marginBottom: "16px", fontWeight: 700 }}>これらのベストバランスと出口戦略が重要です</p>

          {/* 二刀流イラスト */}
          <div style={{ marginBottom: "20px" }}>
            <img src="/assets/nitouryu_katana_6ca1165a_9411e9c7.png" alt="二刀流（大刀・小刀）" style={{ width: "100%", maxWidth: "280px", display: "block", margin: "0 auto" }} />
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              {/* 大刀（左） */}
              <div style={{
                flex: 1,
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: "8px",
                padding: "10px 10px",
                textAlign: "center"
              }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 4px" }}>高い攻撃力の大刀</p>
                <p style={{ fontSize: "0.72rem", color: "#374151", margin: "0 0 2px" }}>攻めの資産形成</p>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", margin: "0 0 2px" }}>リスク資産</p>
                <p style={{ fontSize: "0.68rem", color: "#6B7280", margin: 0 }}>インデックス投資<br />（オルカン・FANG+など）</p>
              </div>
              {/* 小刀（右） */}
              <div style={{
                flex: 1,
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                borderRadius: "8px",
                padding: "10px 10px",
                textAlign: "center"
              }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 4px" }}>小回りの利く小刀</p>
                <p style={{ fontSize: "0.72rem", color: "#374151", margin: "0 0 2px" }}>守りの資産形成</p>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#059669", margin: "0 0 2px" }}>安全資産</p>
                <p style={{ fontSize: "0.68rem", color: "#6B7280", margin: 0 }}>債券・保険・金など<br />(現預金以外)</p>
              </div>
            </div>
          </div>

          {/* 答え 1 */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            1．安全資産を持つ
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "28px" }}>
            現金に代わりインフレに負けない<strong>安全資産（債券・保険・金など）</strong>を
            ポートフォリオ（※）に組み込みましょう。
            リスク資産（オルカンなど）の暴落時に安全資産で凌ぐことができれば、
            結果的に<strong>リスク資産のパフォーマンスを最大化</strong>することができます。
            <br /><span style={{ fontSize: "0.78rem", color: "#6B7280" }}>※資産構成、資産の組み合わせ</span>
          </p>

          {/* 答え 2 */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            2．ベストバランスを知る
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "28px" }}>
            リスク資産と安全資産の割合・金額を考え、将来貯まる資産額をシミュレーションしましょう。
            自分にとって最適な将来への積立額が分かれば、
            <strong>残りは自由に好きに使えるので、金錢面のストレスは大幅に軽減</strong>できます。
          </p>

          {/* 答え 3 */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            3．オルカンやS&amp;P500以外の選択肢も
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "28px" }}>
            安全資産の存在で暴落のリスクをヘッジできるのであれば、
            <strong>FANG+やS&amp;P10などのよりハイリターンを見込めるインデックス</strong>の活用も視野に入れられます。
            これらハイボラティリティなインデックス＋安全資産の組み合わせの期待リターンは、
            オルカンやS&amp;P500等への集中投資した際のパフォーマンスを大きく上回ります。
          </p>

          {/* ANSWER CTA */}
          <div style={{
            background: "#F5F7FA", border: "1px solid #E5E7EB",
            borderRadius: "10px", padding: "16px", textAlign: "center", marginBottom: "4px"
          }}>
            <p style={{ fontSize: "0.95rem", color: "#1B2A5E", fontWeight: 900, lineHeight: 1.8, marginBottom: "14px" }}>
              ポートフォリオの最適化や<br />積立のシミュレーションは<br /><span style={{ color: "#DC2626", fontSize: "1.05rem" }}>「1級FPとの無料相談」</span>で解決できます
            </p>
            <button
              onClick={() => navigate('/booking')}
              style={{
                width: "100%", padding: "16px",
                background: "#1B2A5E",
                color: "#fff", fontWeight: 900, fontSize: "1rem",
                border: "none", borderRadius: "10px", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(27,42,94,0.3)",
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

          {/* バナー画像 */}
          <div style={{ marginTop: "24px" }}>
            <img
              src="/assets/hero_banner_9cc7f1af_97b19273.jpeg"
              alt="お金の答えは1級FPと税理士に聞くのが早い！"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "10px" }}
            />
          </div>
        </div>
      </section>

      {/* ===== ABOUT 1ST CLASS FP 以降の共通セクション ===== */}
      <AnswerBottomSections />

    </div>
  );
}
