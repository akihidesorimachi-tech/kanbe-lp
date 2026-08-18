/**
 * TopPage - 本番トップページ（和風×官兵衛テーマ）
 * カラーパレット（官兵衛画像から抽出）:
 *   和紙ベージュ: #F5EDD6  深紺: #2C3A5A  金: #C8A832
 *   オリーブ緑: #6B7A3A  朱: #8B2020  白: #F0EDE0
 */
import React, { useState, useRef } from "react";
import { useLocation } from "wouter";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycby_A_PCC-yJDtt93jzGyRIKcZlPMWVDCHeyMgU5BjpXEAB5q-kn7S-faf1eC0SnqrjDog/exec";

const KANBE_IMG = "/assets/kanbe-character_c7e76fa2.png";

// カラーパレット
const C = {
  washi: "#F5EDD6",      // 和紙ベージュ（背景）
  washiDark: "#EDE0C0",  // 少し濃い和紙
  navy: "#2C3A5A",       // 深紺
  navyDark: "#1C2840",   // より深い紺
  gold: "#C8A832",       // 金
  goldLight: "#E8C84A",  // 明るい金
  olive: "#6B7A3A",      // オリーブ緑
  crimson: "#8B2020",    // 朱
  ink: "#1A1A2E",        // 墨（テキスト）
  inkLight: "#3D3D5C",   // 薄墨
  cream: "#F0EDE0",      // 白（陣羽織）
  border: "#C8A83260",   // 金の半透明ボーダー
};

// 4要素は別途JSXで詳細展開するため、ここでは型定義のみ
const STRENGTHS_META = [
  { icon: "📚", label: "知識",     badge: "1級FP",           highlight: true  },
  { icon: "🧠", label: "思考力",   badge: "ロジカルシンキング", highlight: false },
  { icon: "⚔️", label: "経験値",   badge: "10年の実務",       highlight: false },
  { icon: "📡", label: "情報収集力", badge: "常時アップデート",  highlight: false },
];

const SPECIALTIES = [
  "内科（循環器・消化器・呼吸器など）",
  "外科（消化器外科・心臓血管外科など）",
  "整形外科", "小児科", "産婦人科",
  "精神科（心療内科含む）", "眼科", "耳鼻咽喉科",
  "皮膚科", "泌尿器科", "その他",
];

// 和風区切り線コンポーネント
const WashiDivider = ({ label }: { label?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "0 0 24px" }}>
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${C.gold})` }} />
    {label && (
      <span style={{
        fontSize: "0.7rem", fontWeight: 900, color: C.gold,
        letterSpacing: "0.2em", whiteSpace: "nowrap",
      }}>{label}</span>
    )}
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${C.gold})` }} />
  </div>
);

export default function TopPage() {
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [occupation, setOccupation] = useState<"doctor" | "other" | "">("");
  const [specialty, setSpecialty] = useState("");
  const [otherText, setOtherText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const occValid = occupation === "doctor" ? specialty !== "" : occupation === "other" ? otherText.trim() !== "" : false;
  const formValid = occValid && emailValid;

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const handleSubmit = async () => {
    if (!formValid || isSubmitting) return;
    setIsSubmitting(true);
    const q3 = occupation === "doctor" ? specialty : "other:" + otherText;
    fetch(GAS_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "request", q3, email }),
    }).catch(() => {});
    navigate("/lp?sent=1");
  };

  return (
    <div style={{ minHeight: "100vh", background: C.washi, fontFamily: "'Noto Serif JP', 'Noto Sans JP', serif" }}>

      {/* ── POWERED BY ── */}
      <div style={{ background: C.navyDark, padding: "5px 0", textAlign: "center", borderBottom: `1px solid ${C.gold}40` }}>
        <a href="https://takita-tax-raxy253c.manus.space" target="_blank" rel="noopener noreferrer"
          style={{ color: "#A0AEC0", fontSize: "0.68rem", textDecoration: "none" }}>
          powered by <span style={{ color: C.goldLight, fontWeight: 700 }}>瀧田潤税理士事務所</span>
        </a>
      </div>

      {/* ── スティッキーヘッダー ── */}
      <div style={{
        background: C.navyDark,
        borderBottom: `2px solid ${C.gold}`,
        padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 40,
      }}>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span style={{
            fontSize: "0.72rem", fontWeight: 900, padding: "3px 10px",
            border: `1.5px solid ${C.gold}`, borderRadius: "3px",
            color: C.gold, background: "transparent", whiteSpace: "nowrap",
            letterSpacing: "0.05em",
          }}>勤務医限定</span>
          <span style={{
            fontSize: "0.72rem", fontWeight: 900, padding: "3px 10px",
            border: `1.5px solid ${C.cream}80`, borderRadius: "3px",
            color: C.cream, background: "transparent", whiteSpace: "nowrap",
            letterSpacing: "0.05em",
          }}>無料FP相談</span>
        </div>
        <span style={{
          fontSize: "0.7rem", fontWeight: 900, padding: "4px 10px",
          background: C.crimson, color: C.cream,
          borderRadius: "3px", whiteSpace: "nowrap", letterSpacing: "0.05em",
        }}>7月限定先着15名</span>
      </div>

      {/* ── 金の装飾ライン ── */}
      <div style={{ height: "3px", background: `linear-gradient(90deg, ${C.navyDark}, ${C.gold}, ${C.olive}, ${C.gold}, ${C.navyDark})` }} />

      {/* ── HERO ── */}
      <section style={{ background: C.washi, padding: "36px 16px 0", position: "relative", overflow: "hidden" }}>
        {/* 背景の家紋風装飾 */}
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          width: "120px", height: "120px",
          background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`,
          borderRadius: "50%",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "0", left: "-20px",
          width: "100px", height: "100px",
          background: `radial-gradient(circle, ${C.olive}15 0%, transparent 70%)`,
          borderRadius: "50%",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
          {/* キャッチコピー */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1 style={{
              fontSize: "clamp(26px, 6.5vw, 44px)",
              fontWeight: 900,
              color: C.ink,
              lineHeight: 1.4,
              marginBottom: "14px",
              fontFamily: "'Noto Serif JP', serif",
            }}>
              忙しい先生に<br />
              <span style={{ color: C.navy }}>最高レベルの軍師</span>を
            </h1>
            <p style={{ fontSize: "0.9rem", color: C.inkLight, lineHeight: 1.8 }}>
              1級FP×税理士による無料個別コンサルティング。
            </p>
          </div>

          {/* 官兵衛画像 */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0" }}>
            <img
              src={KANBE_IMG}
              alt="軍師官兵衛"
              style={{
                width: "min(240px, 60vw)",
                height: "auto",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── 軍師とFPの比喩 ── */}
      <section style={{
        background: C.navy,
        padding: "40px 16px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* 背景装飾 */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, ${C.gold}05 0px, ${C.gold}05 1px, transparent 1px, transparent 20px)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
          <WashiDivider label="FPは言うなれば軍師です" />
          {/* 引用ブロック */}
          <div style={{
            background: `${C.navyDark}CC`,
            border: `1px solid ${C.gold}60`,
            borderLeft: `4px solid ${C.gold}`,
            borderRadius: "6px",
            padding: "22px 20px",
            marginBottom: "24px",
          }}>
            <p style={{ color: C.cream, fontSize: "0.95rem", lineHeight: 2, margin: 0, fontFamily: "'Noto Serif JP', serif" }}>
              軍師の能力も千差万別。<span style={{ color: C.goldLight, fontWeight: 900 }}>官兵衛のように主君を天下人に押し上げた軍師</span>もいれば、早々に表舞台から消えてしまう軍師もいました。<br />
              より優秀なFPをあなたの<span style={{ color: C.goldLight, fontWeight: 900 }}>軍師</span>として選ぶことが重要です。
            </p>
          </div>
          {/* 2×2マトリクス */}
          <div style={{
            background: `${C.navyDark}80`,
            borderRadius: "8px",
            padding: "18px 16px",
            border: `1px solid ${C.gold}30`,
          }}>
            <p style={{ color: "#A0AEC0", fontSize: "0.78rem", marginBottom: "14px", fontWeight: 700, letterSpacing: "0.1em", textAlign: "center" }}>
              優秀なFPの条件とは？
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                {
                  label: "知識",
                  icon: "📚",
                  desc: "1級FP資格・国家資格",
                  color: C.gold,
                  border: `2px solid ${C.gold}70`,
                  bg: `${C.gold}18`,
                },
                {
                  label: "思考力",
                  icon: "🧠",
                  desc: "論理的な提案・分析力",
                  color: "#93C5FD",
                  border: `2px solid #93C5FD50`,
                  bg: `#93C5FD12`,
                },
                {
                  label: "経験値",
                  icon: "⚔️",
                  desc: "コンサル・実務ノウハウ",
                  color: "#86EFAC",
                  border: `2px solid #86EFAC50`,
                  bg: `#86EFAC12`,
                },
                {
                  label: "情報収集力",
                  icon: "📡",
                  desc: "最新情報の検証・進化",
                  color: "#F9A8D4",
                  border: `2px solid #F9A8D450`,
                  bg: `#F9A8D412`,
                },
              ].map((item, i) => (
                <div key={i} style={{
                  background: item.bg,
                  border: item.border,
                  borderRadius: "6px",
                  padding: "14px 12px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>{item.icon}</div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 900, color: item.color, margin: "0 0 4px", letterSpacing: "0.05em" }}>{item.label}</p>
                  <p style={{ fontSize: "0.65rem", color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>

      {/* ── 我々ロジカルFPは ── */}
      <section style={{ background: C.washiDark, padding: "40px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <WashiDivider label="WE ARE" />
          <h2 style={{
            fontSize: "clamp(22px, 5vw, 32px)",
            fontWeight: 900,
            color: C.ink,
            textAlign: "center",
            marginBottom: "28px",
            lineHeight: 1.3,
            fontFamily: "'Noto Serif JP', serif",
          }}>
            我々<span style={{ color: C.navy }}>ロジカルFP</span>は
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* ── 知識：1級FP ── */}
            <div style={{
              background: C.navy, border: `2px solid ${C.gold}`,
              borderRadius: "6px", padding: "22px 18px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, background: C.gold, color: C.navyDark, fontSize: "0.6rem", fontWeight: 900, padding: "3px 10px", borderRadius: "0 6px 0 6px" }}>★ 最高峰</div>
              {/* ヘッダー */}
              <div style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "1.8rem" }}>📚</span>
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: C.gold, fontFamily: "'Noto Serif JP', serif", letterSpacing: "0.05em", lineHeight: 1 }}>知識</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 900, padding: "3px 8px", borderRadius: "2px", background: `${C.gold}25`, color: C.goldLight, border: `1px solid ${C.gold}50`, whiteSpace: "nowrap", alignSelf: "center" }}>1級FP</span>
                </div>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: C.cream, fontFamily: "'Noto Serif JP', serif", margin: 0, paddingLeft: "2px" }}>1級FPのみが在籍</p>
              </div>

              {/* ABOUT 1ST CLASS FP 引用 */}
              <p style={{ fontSize: "0.75rem", color: C.goldLight, fontWeight: 900, letterSpacing: "0.15em", marginBottom: "8px" }}>1級FPとは？</p>
              <p style={{ fontSize: "0.88rem", color: "#CBD5E1", lineHeight: 1.8, marginBottom: "16px" }}>
                1級ファイナンシャル・プランニング技能士は、厚生労働省認可の国家資格でお金のプロとして<span style={{ color: C.goldLight, fontWeight: 900 }}>最高峰の称号</span>です。ロジカルFPには<span style={{ color: C.goldLight, fontWeight: 900 }}>1級FPのみが在籍</span>しており、最高峰の知識を持つプロに、安心してご相談いただけます。
              </p>

              {/* FP3段階 */}
              <div style={{ borderBottom: `2px solid ${C.gold}40`, paddingBottom: "16px", marginBottom: "16px" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 900, color: C.cream, marginBottom: "10px" }}>FP資格は3段階</p>
                <div style={{ border: `1px solid ${C.gold}40`, borderRadius: "6px", overflow: "hidden" }}>
                  {/* ヘッダー行 */}
                  <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 60px", background: `${C.navyDark}90`, borderBottom: `2px solid ${C.gold}50`, padding: "6px 12px" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 900, color: C.goldLight, letterSpacing: "0.05em" }}>資格</span>
                    <span style={{ fontSize: "0.68rem", fontWeight: 900, color: C.goldLight, letterSpacing: "0.05em" }}>内容</span>
                    <span style={{ fontSize: "0.68rem", fontWeight: 900, color: C.goldLight, letterSpacing: "0.05em", textAlign: "center" }}>合格率</span>
                  </div>
                  {[
                    { label: "3級FP", desc: "入門レベル。基礎的な知識を習得。", rate: "約50%", highlight: false },
                    { label: "2級FP", desc: "実務レベル。より広範な相談に対応。", rate: "約30%", highlight: false },
                    { label: "1級FP", desc: "最高峰。高度・複合的な相談に対応。国家資格の中でも難関クラス。", rate: "約10%", highlight: true },
                  ].map((fp, i, arr) => (
                    <div key={fp.label} style={{
                      display: "grid", gridTemplateColumns: "80px 1fr 60px", alignItems: "center",
                      padding: "10px 12px",
                      borderBottom: i < arr.length - 1 ? `2px solid ${C.gold}35` : "none",
                      background: fp.highlight ? `${C.gold}18` : `${C.navyDark}60`,
                    }}>
                      <div>
                        <span style={{ fontSize: "0.82rem", fontWeight: 900, color: fp.highlight ? C.gold : "#93C5FD", display: "block" }}>{fp.label}</span>
                        {fp.highlight && <span style={{ display: "inline-block", fontSize: "0.55rem", background: C.gold, color: C.navyDark, padding: "1px 5px", borderRadius: "2px", marginTop: "3px", fontWeight: 900, whiteSpace: "nowrap" }}>★ 最高峰</span>}
                      </div>
                      <p style={{ fontSize: "0.78rem", color: fp.highlight ? C.cream : "#93C5FD", lineHeight: 1.5, margin: 0 }}>{fp.desc}</p>
                      <p style={{ fontSize: "0.82rem", fontWeight: 900, color: fp.highlight ? C.gold : "#93C5FD", textAlign: "center", margin: 0 }}>{fp.rate}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 0.09% */}
              <div style={{ textAlign: "center", padding: "16px 0", borderBottom: `2px solid ${C.gold}40`, marginBottom: "16px" }}>
                <p style={{ color: "#93C5FD", fontSize: "0.78rem", marginBottom: "4px" }}>FP資格保有者に占める1級FPの割合</p>
                <p style={{ color: C.gold, fontSize: "2.8rem", fontWeight: 900, lineHeight: 1, marginBottom: "4px", fontFamily: "'Noto Serif JP', serif" }}>0.09<span style={{ fontSize: "1.2rem" }}>%</span></p>
                <p style={{ color: "#93C5FD", fontSize: "0.68rem", lineHeight: 1.6 }}>※FP資格合格者累計約670万人中、1級FP約6万人（2026年3月現在）</p>
                <p style={{ color: C.goldLight, fontWeight: 900, fontSize: "0.82rem", marginTop: "8px" }}>FP保有者の中でも希少な存在</p>
              </div>

              {/* 相談料相場 + TODAY'S OFFER 統合 */}
              <div style={{ padding: "0 0 0 0", textAlign: "center" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 900, color: C.cream, marginBottom: "2px" }}>1級FP相談料の相場（1回あたり）</p>
                <p style={{ fontSize: "0.68rem", color: "#94A3B8", marginBottom: "14px" }}>※10事務所のサンプルの平均</p>
                {/* 取り消し線付き相場価格 */}
                <div style={{ marginBottom: "8px" }}>
                  <span style={{
                    fontSize: "2.2rem", fontWeight: 900,
                    color: "#94A3B8",
                    textDecoration: "line-through",
                    textDecorationColor: "#EF4444",
                    textDecorationThickness: "3px",
                    fontFamily: "'Noto Serif JP', serif",
                  }}>10,920</span>
                  <span style={{ fontSize: "1rem", color: "#94A3B8", textDecoration: "line-through", textDecorationColor: "#EF4444" }}>円</span>
                </div>
                {/* 下矢印 */}
                <div style={{ fontSize: "1.8rem", color: C.gold, lineHeight: 1, marginBottom: "8px" }}>▼</div>
                {/* TODAY'S OFFER カード */}
                <div style={{
                  background: `linear-gradient(135deg, ${C.gold}30 0%, ${C.gold}15 100%)`,
                  border: `2px solid ${C.gold}70`,
                  borderRadius: "8px",
                  padding: "14px 20px",
                  marginBottom: "14px",
                }}>
                  <p style={{ fontSize: "0.68rem", color: C.goldLight, fontWeight: 900, letterSpacing: "0.15em", marginBottom: "4px" }}>TODAY'S OFFER</p>
                  <p style={{ fontSize: "2rem", fontWeight: 900, color: C.gold, fontFamily: "'Noto Serif JP', serif", margin: "0 0 4px", lineHeight: 1.2 }}>2回まで無料</p>
                  <p style={{ fontSize: "0.75rem", color: C.goldLight, fontWeight: 700, margin: 0 }}>（1～2回で資産形成の方针は決まります）</p>
                </div>
                <p style={{ fontSize: "0.75rem", fontWeight: 900, color: C.goldLight, letterSpacing: "0.05em", marginBottom: "4px", textAlign: "left" }}>❓ なぜ無料なの？</p>
                <p style={{ fontSize: "0.78rem", color: "#CBD5E1", lineHeight: 1.8, textAlign: "left" }}>
                  本サービスは、「瀑田潤税理士事務所」の長期目線によるブランディング戦略の一環として実施しており、そのため無料でご提供できています。<br />
                  特定の金融商品を勧めることは一切なく、中立的な立場でアドバイスを提供します。
                </p>
              </div>
            </div>

            {/* ── 思考力 ── */}
            <div style={{ background: C.cream, border: `1px solid ${C.gold}50`, borderRadius: "6px", padding: "22px 18px" }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "1.8rem" }}>🧠</span>
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: C.navy, fontFamily: "'Noto Serif JP', serif", letterSpacing: "0.05em", lineHeight: 1 }}>思考力</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 900, padding: "3px 8px", borderRadius: "2px", background: `${C.navy}15`, color: C.navy, border: `1px solid ${C.navy}30`, whiteSpace: "nowrap", alignSelf: "center" }}>ロジカルシンキング</span>
                </div>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: C.ink, fontFamily: "'Noto Serif JP', serif", margin: 0, paddingLeft: "2px" }}>旧帝大理系×コンサル出身</p>
              </div>
              <p style={{ fontSize: "0.88rem", color: C.inkLight, lineHeight: 1.85, marginBottom: "14px" }}>
                ロジカルFPの代表FPは旧帝大理系卒業後、ベンチャー企業でコンサルとして研鳽を積んだ後にFPへ転身。彼のノウハウをベースとして、<span style={{ color: C.navy, fontWeight: 900 }}>国公立大卒の優秀なFP</span>がコンサルティングを行います。感情論ではなく<span style={{ color: C.navy, fontWeight: 900 }}>データとロジック</span>で先生のハイレベルな「なぜ？」に正面から答えます。
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                {[
                  { icon: "📊", text: "数字とデータで根拠を示す説明" },
                  { icon: "🎓", text: "旧帝大理系の論理的思考力" },
                  { icon: "💼", text: "ベンチャーコンサルで培った問題解決力" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px 12px", background: `${C.navy}08`, borderRadius: "4px", border: `1px solid ${C.navy}15` }}>
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                    <p style={{ fontSize: "0.85rem", color: C.inkLight, lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>

              {/* クライアントの声 */}
              <div style={{
                background: `${C.navy}06`,
                border: `1px solid ${C.navy}20`,
                borderLeft: `3px solid ${C.navy}`,
                borderRadius: "4px",
                padding: "14px 16px",
              }}>
                <p style={{ fontSize: "0.72rem", color: C.navy, fontWeight: 900, letterSpacing: "0.12em", marginBottom: "12px" }}>💬 クライアントの声</p>

                {/* Y.Hさん */}
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <img
                      src="/assets/client-yh-avatar_b31f5eb0.jpg"
                      alt="Y.Hさん"
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${C.navy}30` }}
                    />
                    <div>
                      <p style={{ fontSize: "0.8rem", fontWeight: 900, color: C.ink, margin: 0 }}>Y.Hさん（30代）</p>
                      <p style={{ fontSize: "0.7rem", color: C.inkLight, margin: 0 }}>外資系戦略コンサル勤務 / マネージャー</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: C.inkLight, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                    「説明が論理的で腹落ちしやすく、暗黙知になりがちな前提や根拠も明確に伝えてくれるので信頼して相談できます。市場やマクロ環境の変化も踏まえた提案を、スピード感ある対話で進められるのも一つの魅力です。」
                  </p>
                </div>

                {/* A.Oさん */}
                <div style={{ paddingTop: "14px", borderTop: `1px solid ${C.navy}15` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <img
                      src="/assets/client-ao-avatar_4dfd8bb8.jpg"
                      alt="A.Oさん"
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${C.navy}30` }}
                    />
                    <div>
                      <p style={{ fontSize: "0.8rem", fontWeight: 900, color: C.ink, margin: 0 }}>A.Oさん（30代）</p>
                      <p style={{ fontSize: "0.7rem", color: C.inkLight, margin: 0 }}>市中病院勤務 / 内科医</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: C.inkLight, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                    「説明がとてもロジカルでわかりやすく、家計の整理をした上でこちらの状況に合わせた提案をしてくれるので、納得しながら判断できます。資産形成の基本だけでなく、最近の市況トレンドも踏まえてアドバイスをもらえるので、忙しい中でも安心して相談できています。」
                  </p>
                </div>
              </div>
            </div>

            {/* ── 経験値 ── */}
            <div style={{ background: C.cream, border: `1px solid ${C.gold}50`, borderRadius: "6px", padding: "22px 18px" }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "1.8rem" }}>⚔️</span>
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: C.navy, fontFamily: "'Noto Serif JP', serif", letterSpacing: "0.05em", lineHeight: 1 }}>経験値</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 900, padding: "3px 8px", borderRadius: "2px", background: `${C.navy}15`, color: C.navy, border: `1px solid ${C.navy}30`, whiteSpace: "nowrap", alignSelf: "center" }}>10年の実務</span>
                </div>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: C.ink, fontFamily: "'Noto Serif JP', serif", margin: 0, paddingLeft: "2px" }}>高収入層への専門アドバイス</p>
              </div>
              <p style={{ fontSize: "0.88rem", color: C.inkLight, lineHeight: 1.85, marginBottom: "14px" }}>
                10年間にわたり医師・コンサル・エンジニアなど<span style={{ color: C.navy, fontWeight: 900 }}>高収入層へのアドバイス</span>を積み重ね、
                実践で磨き上げたノウハウをベースにしています。
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {[
                  { icon: "🏥", text: "勤務医の収入・税務構造を熟知" },
                  { icon: "📈", text: "高収入層特有の資産形成課題に対応" },
                  { icon: "🛡️", text: "特定の金融商品を勧めない中立的アドバイス" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px 12px", background: `${C.navy}08`, borderRadius: "4px", border: `1px solid ${C.navy}15` }}>
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                    <p style={{ fontSize: "0.85rem", color: C.inkLight, lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>

              {/* 実績指標 */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                <div style={{ flex: 1, textAlign: "center", padding: "12px 8px", background: `${C.navy}08`, borderRadius: "4px", border: `1px solid ${C.navy}20` }}>
                  <p style={{ fontSize: "1.6rem", fontWeight: 900, color: C.navy, fontFamily: "'Noto Serif JP', serif", margin: 0, lineHeight: 1 }}>400<span style={{ fontSize: "0.9rem" }}>人</span></p>
                  <p style={{ fontSize: "0.68rem", color: C.inkLight, margin: "4px 0 0", lineHeight: 1.4 }}>平均コンサルティング数</p>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "12px 8px", background: `${C.navy}08`, borderRadius: "4px", border: `1px solid ${C.navy}20` }}>
                  <p style={{ fontSize: "1.1rem", fontWeight: 900, color: C.navy, fontFamily: "'Noto Serif JP', serif", margin: 0, lineHeight: 1.3 }}>プライム<br />上場企業</p>
                  <p style={{ fontSize: "0.68rem", color: C.inkLight, margin: "4px 0 0", lineHeight: 1.4 }}>講演実績あり</p>
                </div>
              </div>

              {/* クライアントの声 */}
              <div style={{
                background: `${C.navy}06`,
                border: `1px solid ${C.navy}20`,
                borderLeft: `3px solid ${C.navy}`,
                borderRadius: "4px",
                padding: "14px 16px",
              }}>
                <p style={{ fontSize: "0.72rem", color: C.navy, fontWeight: 900, letterSpacing: "0.12em", marginBottom: "12px" }}>💬 クライアントの声</p>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <img
                      src="/assets/client-ys-avatar_84b99057.jpg"
                      alt="Y.Sさん"
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${C.navy}30` }}
                    />
                    <div>
                      <p style={{ fontSize: "0.8rem", fontWeight: 900, color: C.ink, margin: 0 }}>Y.Sさん（30代）</p>
                      <p style={{ fontSize: "0.7rem", color: C.inkLight, margin: 0 }}>市中病院勤務 / 内科医</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: C.inkLight, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                    「最初NISAやiDeCoも始めていない状態でお話を聞きましたが、初心者にもとても分かりやすく投資や資産形成について教えてくださりました。勤務先や状況が変わる時に相談できるのは心強いと思いました。」
                  </p>
                </div>

                {/* 2人目: O.Wさん */}
                <div style={{ paddingTop: "14px", borderTop: `1px solid ${C.navy}15` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
                      background: C.navy, border: `2px solid ${C.navy}50`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#fff", letterSpacing: "0.02em" }}>O.W</span>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.8rem", fontWeight: 900, color: C.ink, margin: 0 }}>O.Wさん（30代）</p>
                      <p style={{ fontSize: "0.7rem", color: C.inkLight, margin: 0 }}>開業医 / 元外科医</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: C.inkLight, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                    「投資を含む資産形成全般に関して最新の情報を提供してくださいます。後期研修医の頃からお世話になっており、早い時期から金融に興味を持てて良かったです。」
                  </p>
                </div>
              </div>
            </div>

            {/* ── 情報収集力 ── */}
            <div style={{ background: C.cream, border: `1px solid ${C.gold}50`, borderRadius: "6px", padding: "22px 18px" }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "1.8rem" }}>📡</span>
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: C.navy, fontFamily: "'Noto Serif JP', serif", letterSpacing: "0.05em", lineHeight: 1 }}>情報収集力</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 900, padding: "3px 8px", borderRadius: "2px", background: `${C.navy}15`, color: C.navy, border: `1px solid ${C.navy}30`, whiteSpace: "nowrap", alignSelf: "center" }}>検証×進化</span>
                </div>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: C.ink, fontFamily: "'Noto Serif JP', serif", margin: 0, paddingLeft: "2px" }}>情報があふれる時代だからこそ、「検証」と「進化」の両輪が必要</p>
              </div>

              {/* 問題提起ボックス */}
              <div style={{ marginBottom: "16px" }}>
                {[
                  {
                    icon: "⚠️",
                    label: "SNSの情報は玉石混交",
                    body: "インフルエンサーの発信が正しいとは限りません。バズりやすい情報ほど、根拠が薄いケースも多くあります。",
                  },
                  {
                    icon: "🤖",
                    label: "AIは大きく間違えることもある",
                    body: "AIが誤った医療アドバイスを患者に伝えているのを見たことはありませんか？金融も同じです。AIは最新データを持たず、自信満々に誤情報を提示することがあります。",
                  },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    padding: "12px 14px", marginBottom: "8px",
                    background: "#FFF8F0", borderRadius: "4px",
                    border: `1px solid #E8A03060`,
                    borderLeft: `3px solid #E8A030`,
                  }}>
                    <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: "1px" }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#92400E", margin: "0 0 4px" }}>{item.label}</p>
                      <p style={{ fontSize: "0.8rem", color: C.inkLight, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ロジカルFPの強み */}
              <div style={{ borderTop: `2px solid ${C.navy}20`, paddingTop: "14px" }}>
                {/* 検証・進化を同等に表示 */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: `${C.navy}08`, borderRadius: "4px", border: `2px solid ${C.navy}30` }}>
                    <p style={{ fontSize: "1.1rem", margin: "0 0 2px" }}>🔍</p>
                    <p style={{ fontSize: "0.78rem", fontWeight: 900, color: C.navy, margin: "0 0 4px" }}>検証力</p>
                    <p style={{ fontSize: "0.7rem", color: C.inkLight, lineHeight: 1.5, margin: 0 }}>SNS・AIの情報を裏付け、正しい情報のみを届ける</p>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: `${C.navy}08`, borderRadius: "4px", border: `2px solid ${C.navy}30` }}>
                    <p style={{ fontSize: "1.1rem", margin: "0 0 2px" }}>📈</p>
                    <p style={{ fontSize: "0.78rem", fontWeight: 900, color: C.navy, margin: "0 0 4px" }}>進化力</p>
                    <p style={{ fontSize: "0.7rem", color: C.inkLight, lineHeight: 1.5, margin: 0 }}>FANG+・S&P10など最新トレンドを常時アップデート</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { icon: "🛡️", text: "特定の金融商品を勧めない中立的な立場で、検証済みの正確な情報だけをお届け" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px 12px", background: `${C.navy}08`, borderRadius: "4px", border: `1px solid ${C.navy}15` }}>
                      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                      <p style={{ fontSize: "0.85rem", color: C.inkLight, lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: C.navy,
        padding: "40px 16px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, ${C.gold}05 0px, ${C.gold}05 1px, transparent 1px, transparent 20px)`,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
          <WashiDivider label="軍師に相談する" />

          {/* TODAY'S OFFER 再掲 */}
          <div style={{
            background: `${C.navyDark}90`,
            border: `2px solid ${C.gold}60`,
            borderRadius: "8px",
            padding: "20px 18px",
            textAlign: "center",
            marginBottom: "28px",
          }}>
            <p style={{ fontSize: "0.72rem", color: C.goldLight, fontWeight: 900, letterSpacing: "0.2em", marginBottom: "8px" }}>TODAY'S OFFER</p>
            <p style={{ fontSize: "1.4rem", fontWeight: 900, color: C.gold, fontFamily: "'Noto Serif JP', serif", marginBottom: "4px" }}>
              <span style={{ fontSize: "2.2rem" }}>2回まで</span>無料
            </p>
            <p style={{ fontSize: "0.78rem", color: C.goldLight, fontWeight: 700, marginBottom: "10px" }}>（1〜2回で資産形成の方針は決まります）</p>
            <p style={{ fontSize: "0.75rem", color: "#94A3B8", lineHeight: 1.8 }}>
              本サービスは、「瀧田潤税理士事務所」の長期目線によるブランディング戦略の一環として実施しており、そのため無料でご提供できています。<br />
              特定の金融商品を勧めることは一切なく、中立的な立場でアドバイスを提供します。
            </p>
          </div>

          <h2 style={{
            color: C.cream,
            fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: "8px",
            lineHeight: 1.4,
            fontFamily: "'Noto Serif JP', serif",
          }}>
            あなたの<span style={{ color: C.gold }}>軍師</span>として<br />
            最適な戦略を立案します
          </h2>
          <p style={{ color: `${C.cream}80`, fontSize: "0.85rem", textAlign: "center", marginBottom: "28px", lineHeight: 1.7 }}>
            完全無料・先着順。お気軽にご相談ください。
          </p>

          {/* CTA1 個別コンサル */}
          <button
            onClick={() => navigate("/booking")}
            style={{
              width: "100%",
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, ${C.gold} 100%)`,
              color: C.navyDark,
              border: "none",
              borderRadius: "4px",
              padding: "20px 24px",
              fontSize: "1.05rem",
              fontWeight: 900,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: `0 4px 20px ${C.gold}50`,
              marginBottom: "14px",
              letterSpacing: "0.05em",
              fontFamily: "'Noto Serif JP', serif",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px ${C.gold}60`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 20px ${C.gold}50`;
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>📅</span>
            個別コンサルを依頼する
            <span style={{ fontSize: "1rem", marginLeft: "4px" }}>›</span>
          </button>

          {/* CTA2 資料請求アコーディオン */}
          <button
            onClick={handleToggle}
            style={{
              width: "100%",
              background: isOpen ? `${C.cream}15` : "transparent",
              color: C.cream,
              border: `2px solid ${C.cream}60`,
              borderRadius: isOpen ? "4px 4px 0 0" : "4px",
              padding: "18px 24px",
              fontSize: "1.05rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              letterSpacing: "0.05em",
              fontFamily: "'Noto Serif JP', serif",
              transition: "background 0.2s, border-radius 0.2s",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.2rem" }}>📄</span>
              まずは資料請求する
            </span>
            <span style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              opacity: 0.7,
            }}>▼</span>
          </button>

          {/* フォーム展開 */}
          {isOpen && (
            <div ref={formRef} style={{
              background: C.washi,
              border: `2px solid ${C.cream}60`,
              borderTop: "none",
              borderRadius: "0 0 4px 4px",
              padding: "24px 20px 20px",
              animation: "slideDown 0.25s ease",
            }}>
              <style>{`
                @keyframes slideDown {
                  from { opacity: 0; transform: translateY(-8px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <p style={{ fontSize: "0.82rem", color: C.inkLight, marginBottom: "20px", lineHeight: 1.8, textAlign: "center" }}>
                ご登録のメールアドレスに<br />
                <span style={{ color: C.navy, fontWeight: 900 }}>資料（PDF）</span>と
                <span style={{ color: C.navy, fontWeight: 900 }}>無料相談クーポン</span>をお送りします。
              </p>

              {/* 職業 */}
              <div style={{ marginBottom: "18px" }}>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: C.navy, marginBottom: "8px" }}>
                  ご職業 <span style={{ color: C.crimson }}>*</span>
                </p>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  {(["doctor", "other"] as const).map((occ) => (
                    <button key={occ} onClick={() => {
                      setOccupation(occ);
                      if (occ === "doctor") setOtherText(""); else setSpecialty("");
                    }} style={{
                      flex: 1, padding: "10px 8px", borderRadius: "4px",
                      fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
                      border: `2px solid ${occupation === occ ? C.navy : C.gold + "60"}`,
                      background: occupation === occ ? `${C.navy}15` : C.cream,
                      color: occupation === occ ? C.navy : C.inkLight,
                      transition: "all 0.15s",
                    }}>
                      {occ === "doctor" ? "🏥 医師" : "💼 その他"}
                    </button>
                  ))}
                </div>
                {occupation === "doctor" && (
                  <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{
                    width: "100%", padding: "10px 12px", borderRadius: "4px",
                    border: `1.5px solid ${C.gold}60`, fontSize: "0.88rem",
                    color: specialty ? C.ink : "#9CA3AF",
                    background: C.cream, appearance: "auto",
                  }}>
                    <option value="">専門科を選択してください</option>
                    {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
                {occupation === "other" && (
                  <input type="text" placeholder="職業を入力してください" value={otherText}
                    onChange={(e) => setOtherText(e.target.value)} style={{
                      width: "100%", padding: "10px 12px", borderRadius: "4px",
                      border: `1.5px solid ${C.gold}60`, fontSize: "0.88rem",
                      color: C.ink, background: C.cream, boxSizing: "border-box",
                    }} />
                )}
              </div>

              {/* メール */}
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: C.navy, marginBottom: "4px" }}>
                  メールアドレス <span style={{ color: C.crimson }}>*</span>
                </p>
                <input type="email" placeholder="example@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} style={{
                    width: "100%", padding: "10px 12px", borderRadius: "4px",
                    border: `1.5px solid ${emailValid && email !== "" ? C.olive : C.gold + "60"}`,
                    fontSize: "0.88rem", color: C.ink,
                    background: C.cream, boxSizing: "border-box",
                  }} />
                <p style={{ fontSize: "0.75rem", color: C.inkLight, marginTop: "6px", lineHeight: 1.6 }}>
                  🎁 資料と無料相談クーポンをメールでお届けします。
                </p>
              </div>

              {/* 送信ボタン */}
              <button onClick={handleSubmit} disabled={!formValid || isSubmitting} style={{
                width: "100%",
                background: (formValid && !isSubmitting)
                  ? `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDark} 100%)`
                  : "#D1D5DB",
                color: (formValid && !isSubmitting) ? C.gold : "#fff",
                border: "none", borderRadius: "4px",
                padding: "14px 16px", fontSize: "0.95rem", fontWeight: 900,
                cursor: (formValid && !isSubmitting) ? "pointer" : "not-allowed",
                boxShadow: (formValid && !isSubmitting) ? `0 4px 14px ${C.navy}50` : "none",
                transition: "background 0.2s",
                letterSpacing: "0.05em",
                fontFamily: "'Noto Serif JP', serif",
              }}>
                {isSubmitting ? "送信中..." : "📩 資料請求する"}
              </button>
              {!formValid && (
                <p style={{ fontSize: "0.75rem", color: "#9CA3AF", textAlign: "center", marginTop: "6px" }}>
                  {occupation === "" ? "ご職業を選択してください"
                    : occupation === "doctor" && specialty === "" ? "専門科を選択してください"
                    : occupation === "other" && otherText.trim() === "" ? "職業を入力してください"
                    : !emailValid ? "メールアドレスを正しく入力してください" : ""}
                </p>
              )}
            </div>
          )}

          <p style={{ color: `${C.cream}50`, fontSize: "0.7rem", textAlign: "center", marginTop: "16px", lineHeight: 1.7 }}>
            ※ 資料請求後、メールに記載のURLから詳細ページへアクセスできます。<br />
            ※ 個別相談は完全無料・先着順です。
          </p>
        </div>
      </section>

      {/* ── 開発用仮ボタン ── */}
      <div style={{
        background: C.washiDark,
        padding: "20px 16px",
        textAlign: "center",
        borderTop: `1px dashed ${C.gold}40`,
      }}>
        <p style={{ color: `${C.gold}60`, fontSize: "11px", marginBottom: "10px" }}>▼ 開発用仮ボタン（後で削除）</p>
        <button onClick={() => navigate("/lp")} style={{
          background: "transparent",
          color: `${C.ink}60`,
          border: `1px solid ${C.gold}40`,
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "13px",
          fontWeight: 700,
          cursor: "pointer",
        }}>
          📋 資料請求後のページを確認する（仮）
        </button>
      </div>

      {/* ── フッター ── */}
      <footer style={{ background: C.navyDark, borderTop: `2px solid ${C.gold}`, padding: "28px 16px 48px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          {/* 金の区切り */}
          <div style={{ width: "60px", height: "2px", background: C.gold, margin: "0 auto 16px" }} />
          <p style={{ color: C.goldLight, fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px", fontFamily: "'Noto Serif JP', serif" }}>
            税理士×1級FP事務局
          </p>
          <p style={{ color: "#93C5FD", fontSize: "0.8rem", marginBottom: "4px" }}>📞 070-9097-3341</p>
          <p style={{ color: "#93C5FD", fontSize: "0.8rem", marginBottom: "12px" }}>✉ info@logicalfp.com</p>
          <a href="https://takita-tax-raxy253c.manus.space" target="_blank" rel="noopener noreferrer"
            style={{ color: "#64748B", fontSize: "0.7rem", textDecoration: "none", display: "inline-block", marginBottom: "8px" }}>
            powered by <span style={{ color: C.goldLight, fontWeight: 700 }}>瀧田潤税理士事務所</span>
          </a>
          <p style={{ color: "#4B5563", fontSize: "0.7rem", marginTop: "8px" }}>© 2025 All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
