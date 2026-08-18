/**
 * AnswerBottomSections - ANSWERページ下部の共通セクション群
 * Home.tsxのABOUT 1ST CLASS FP以降をそのままコピーして全ANSWERページで再利用する
 * 含むセクション:
 *   - ABOUT 1ST CLASS FP
 *   - FEE（Chart.jsドーナツチャート）
 *   - なぜ無料？
 *   - 相談者の声
 *   - FAQ
 *   - 申し込みセクション
 *   - フッター
 */

import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Star,
  User,
  ClipboardList,
  MessageCircle,
} from "lucide-react";

declare const Chart: any;

// ===== データ定義 =====
const feeData = [
  { label: "5,000円未満", value: 14.2, color: "#CBD5E1" },
  { label: "5,000〜10,000円未満", value: 47.3, color: "#1B2A5E" },
  { label: "10,000〜20,000円未満", value: 33.5, color: "#0f1e3d" },
  { label: "20,000円以上", value: 5.0, color: "#F5C400" },
];

const voices = [
  {
    tag: "早期からのサポート",
    text: "投資を含む資産形成全般に関して最新の情報を提供してくださいます。後期研修医の頃からお世話になっており、早い時期から金融に興味を持てて良かったです。",
    name: "Wさん（30代開業医）",
    role: "元外科",
  },
  {
    tag: "納得できる提案",
    text: "説明がとてもわかりやすく、家計の整理をした上でこちらの状況に合わせた提案をしてくれるので、納得しながら判断できます。資産形成の基本だけでなく、最近の市況トレンドも踏まえてアドバイスをもらえるので、忙しい中でも安心して相談できています。",
    name: "Oさん（30代・市中病院勤務医）",
    role: "内科",
  },
];

const faqs = [
  "FIREって、実際のところ勤務医でも現実的に可能なの？",
  "インデックス投資って、本当に「最適解」なの？",
  "年収2000万クラスの勤務医はどのくらい投資に回すべき？",
  "現金比率は何％が合理的？",
  "インデックス投資の最大の弱点って何？",
  "「安全資産」を入れる意味って何？",
  "医師の節税で一番効果的な方法は何？",
  "1級FPはどんなポートフォリオを組んでいる？",
];

const applyOptions = [
  {
    id: "fp-individual",
    Icon: User,
    title: "1級FP無料相談(オンライン可)",
    desc: "FPの空き状況を確認する",
    sub: "30分～延長可 ・ 21時以降も対応可",
    color: "#1B2A5E",
    path: "/booking",
  },
  {
    id: "tax-individual",
    Icon: ClipboardList,
    title: "税理士オンラインセミナー参加",
    desc: "セミナー形式（60分）で税理士の話を聞きたい。",
    sub: "",
    color: "#059669",
    path: "/apply?type=tax-seminar",
  },
];

// ===== FEE サブコンポーネント =====
function FeeSectionInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let pollTimer: ReturnType<typeof setInterval> | null = null;
    let observer: IntersectionObserver | null = null;

    const initChart = () => {
      if (!canvasRef.current) return;
      if (typeof Chart === "undefined") return;
      if (chartRef.current) return;

      chartRef.current = new Chart(canvasRef.current, {
        type: "doughnut",
        data: {
          labels: feeData.map((d) => d.label),
          datasets: [{
            data: feeData.map((d) => d.value),
            backgroundColor: feeData.map((d) => d.color),
            borderColor: "#fff",
            borderWidth: 3,
            hoverOffset: 8,
          }],
        },
        options: {
          responsive: true,
          cutout: "60%",
          animation: { duration: 600 },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { label: (ctx: any) => `${ctx.label}: ${ctx.parsed}%` },
            },
          },
        },
      });

      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    };

    const startPolling = () => {
      if (typeof Chart !== "undefined") {
        initChart();
        return;
      }
      let attempts = 0;
      pollTimer = setInterval(() => {
        attempts++;
        if (typeof Chart !== "undefined") {
          initChart();
        }
        if (attempts >= 50) {
          if (pollTimer) clearInterval(pollTimer);
        }
      }, 100);
    };

    if ("IntersectionObserver" in window && sectionRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startPolling();
            observer?.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(sectionRef.current);
    } else {
      startPolling();
    }

    return () => {
      if (pollTimer) clearInterval(pollTimer);
      if (observer) observer.disconnect();
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#F5F7FA", padding: "36px 16px" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <p style={{ color: "#2563EB", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>
          FEE
        </p>
        <h2 style={{ fontWeight: 900, fontSize: "1.25rem", color: "#1B2A5E", marginBottom: "6px" }}>
          通常、FP相談は<span style={{ color: "#DC2626" }}>有料</span>です
        </h2>
        <p style={{ fontSize: "0.88rem", color: "#6B7280", marginBottom: "24px" }}>
          日本FP協会の調査（2021年度）によると、1時間あたりの相談料は…
        </p>
        <div style={{ maxWidth: "240px", margin: "0 auto 20px" }}>
          <canvas ref={canvasRef} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "24px" }}>
          {feeData.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "12px", height: "12px", borderRadius: "3px", flexShrink: 0, background: d.color, display: "inline-block" }} />
              <span style={{ fontSize: "0.72rem", color: "#6B7280" }}>
                {d.label} {d.value}%
              </span>
            </div>
          ))}
        </div>
        <div style={{
          padding: "24px 20px",
          textAlign: "center",
          background: "#1B2A5E",
          borderRadius: "10px",
          border: "2px solid #1B2A5E",
          boxShadow: "4px 4px 0 #F5C400",
        }}>
          <p style={{ fontSize: "0.72rem", marginBottom: "12px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)" }}>
            今回の相談料
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
            <span style={{ fontSize: "0.82rem", textDecoration: "line-through", color: "rgba(255,255,255,0.4)" }}>
              通常 5,000〜20,000円/時間
            </span>
            <span style={{ fontSize: "1.1rem", color: "#F5C400" }}>→</span>
            <span style={{ fontSize: "2.2rem", fontWeight: 900, color: "#F5C400", letterSpacing: "0.02em" }}>
              完全無料
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== メインエクスポート =====
export default function AnswerBottomSections() {
  const [, navigate] = useLocation();

  const handleApply = (id: string, path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* ===== BLUE DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== ABOUT 1ST CLASS FP ===== */}
      <section style={{ background: "#fff", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p style={{ color: "#2563EB", fontWeight: 900, fontSize: "0.82rem", letterSpacing: "0.12em", marginBottom: "8px" }}>
            ABOUT 1ST CLASS FP
          </p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "6px" }}>
            そもそも<span style={{ color: "#149fff" }}>1級FP</span>って？
          </h2>
          <p style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.7, marginBottom: "24px" }}>
            1級ファイナンシャル・プランニング技能士は、厚生労働省認可の国家資格でお金のプロとして最高峰の称号です。
          </p>

          {/* FP 3段階 */}
          <div style={{ background: "#F5F7FA", borderRadius: "10px", padding: "16px", marginBottom: "16px", border: "1px solid #E5E7EB" }}>
            <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "12px" }}>FP資格は3段階</p>
            {[
              { label: "3級FP", desc: "入門レベル。基礎的な知識を習得。", highlight: false },
              { label: "2級FP", desc: "実務レベル。より広範な相談に対応。", highlight: false },
              { label: "1級FP", desc: "最高峰。高度・複合的な相談に対応。国家資格の中でも難関クラス。", highlight: true },
            ].map((fp) => (
              <div key={fp.label} style={{
                display: "flex", gap: "12px", alignItems: "flex-start",
                padding: "10px 12px", marginBottom: "6px",
                borderRadius: "8px",
                background: fp.highlight ? "#1B2A5E" : "#fff",
                border: `1px solid ${fp.highlight ? "#1B2A5E" : "#E5E7EB"}`,
              }}>
                <div style={{ minWidth: "60px", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 900, color: fp.highlight ? "#F5C400" : "#1B2A5E", display: "block" }}>
                    {fp.label}
                  </span>
                  {fp.highlight && (
                    <span style={{ display: "inline-block", fontSize: "0.58rem", background: "#F5C400", color: "#1B2A5E", padding: "1px 5px", borderRadius: "3px", marginTop: "3px", fontWeight: 900, whiteSpace: "nowrap" }}>★ 最高峰</span>
                  )}
                </div>
                <p style={{ fontSize: "0.88rem", color: fp.highlight ? "#E2E8F0" : "#555", lineHeight: 1.5 }}>{fp.desc}</p>
              </div>
            ))}
          </div>

          {/* 0.09% */}
          <div style={{ background: "#1B2A5E", borderRadius: "10px", padding: "20px 16px", textAlign: "center", marginBottom: "16px" }}>
            <p style={{ color: "#93C5FD", fontSize: "0.85rem", marginBottom: "8px" }}>FP資格保有者に占める割合</p>
            <p style={{ color: "#F5C400", fontSize: "2.5rem", fontWeight: 900, lineHeight: 1 }}>0.09<span style={{ fontSize: "1.2rem" }}>%</span></p>
            <p style={{ color: "#93C5FD", fontSize: "0.75rem", marginTop: "6px" }}>
              ※FP資格合格者数の累計約670万人中、1級FP約6万人（2026年3月現在）
            </p>
            <div style={{ marginTop: "12px", padding: "8px 16px", background: "rgba(232,70,10,0.1)", borderRadius: "6px", border: "1px solid #F5C400" }}>
              <p style={{ color: "#F5C400", fontWeight: 900, fontSize: "0.92rem" }}>FP保有者の中でも希少な存在</p>
            </div>
          </div>

          {/* 比較表 */}
          <div style={{ background: "#F5F7FA", borderRadius: "10px", padding: "16px", marginBottom: "20px", border: "1px solid #E5E7EB" }}>
            <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "12px" }}>1級FPと2級FPの違い</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px", textAlign: "left", color: "#666", fontWeight: 700, borderBottom: "1px solid #E5E7EB" }}>項目</th>
                  <th style={{ padding: "8px", textAlign: "center", color: "#666", fontWeight: 700, borderBottom: "1px solid #E5E7EB" }}>2級FP</th>
                  <th style={{ padding: "8px", textAlign: "center", color: "#fff", fontWeight: 900, background: "#1B2A5E", borderRadius: "4px 4px 0 0", borderBottom: "1px solid #1B2A5E" }}>1級FP ★</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "合格率（過去10年平均）", v2: "約30％", v1: "約10％" },
                  { item: "受験資格", v2: "3級合格者等", v1: "2級合格＋実務1年以上" },
                  { item: "相談対応範囲", v2: "基礎的な相談", v1: "高度・複合的な相談" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: "8px", color: "#555", borderBottom: "1px solid #E5E7EB" }}>{row.item}</td>
                    <td style={{ padding: "8px", textAlign: "center", color: "#555", borderBottom: "1px solid #E5E7EB" }}>{row.v2}</td>
                    <td style={{ padding: "8px", textAlign: "center", color: "#1B2A5E", fontWeight: 900, background: "#EBF4FF", borderBottom: "1px solid #E5E7EB" }}>{row.v1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 今回の1級FPはさらに特別 */}
          <p style={{ fontSize: "0.95rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", marginBottom: "14px" }}>
            今回の1級FPはさらに特別
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { point: "POINT 1", title: "ロジカルな説明が得意", desc: "感情論ではなくデータとロジックで資産形成を解説。先生が求めるハイレベルな「なぜ？」に正面から答えます。" },
              { point: "POINT 2", title: "税理士とのコラボ", desc: "瀧田潤税理士事務所との協力体制により、FPと税理士の両視点から最適なアドバイスを提供。節税と資産形成を同時に解決します。" },
              { point: "POINT 3", title: "最新のトレンドに精通", desc: "FANG+やS&P10など最新の投資トレンドを常にアップデート。最新情報を元に、先生の資産形成に最適な戦略を提案します。" },
            ].map((item) => (
              <div key={item.point} style={{
                background: "#F5F7FA", borderRadius: "10px", padding: "14px 16px",
                border: "1px solid #E5E7EB",
                borderLeft: "4px solid #2563EB"
              }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 900, color: "#2563EB", marginBottom: "4px" }}>{item.point}</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "4px" }}>{item.title}</p>
                <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.6 }}>— {item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== FEE SECTION ===== */}
      <FeeSectionInner />

      {/* ===== WHY FREE SECTION ===== */}
      <section style={{ background: "#F5F7FA", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", marginBottom: "20px" }}>
            なぜ無料なのか？
          </h2>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "20px 16px", border: "1px solid #E5E7EB", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.95rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", marginBottom: "12px" }}>
              <span style={{ color: "#ebc924" }}>瀧田潤税理士事務所</span> × <span style={{ color: "#149fff" }}>1級FP</span> コラボ企画
            </p>
            <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7, marginBottom: "16px" }}>
              勤務医の資産形成・税務支援に強みを持つ瀧田潤税理士事務所が長期目線で行うブランディング施策の一環として、実施しているプロジェクトのため無料です。
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "特定の金融商品を勧めることは一切なし",
                "王道のインデックス投資の使い方を中心に中立的に解説",
                "安全資産の選択方法をロジカルにアドバイス",
                "勤務医の収入・税務構造を熟知したFP＋税理士が対応",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <CheckCircle size={16} color="#059669" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <p style={{ fontSize: "0.88rem", color: "#333", lineHeight: 1.5 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== CLIENT VOICES ===== */}
      <section style={{ background: "#fff", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p style={{ color: "#2563EB", fontWeight: 900, fontSize: "0.82rem", letterSpacing: "0.12em", marginBottom: "8px" }}>
            CLIENT VOICES
          </p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "6px" }}>
            相談者の声
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {voices.map((voice, i) => (
              <div key={i} style={{
                background: "#F5F7FA", borderRadius: "12px", padding: "18px 16px",
                border: "1px solid #E5E7EB",
                position: "relative"
              }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
                  <span style={{ background: "#1B2A5E", color: "#F5C400", fontSize: "0.78rem", fontWeight: 900, padding: "3px 10px", borderRadius: "100px" }}>
                    {voice.tag}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} fill="#F5C400" color="#F5C400" />
                  ))}
                </div>
                <p style={{ fontSize: "0.88rem", color: "#333", lineHeight: 1.7, marginBottom: "12px" }}>
                  "{voice.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: "#1B2A5E", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <span style={{ color: "#F5C400", fontWeight: 900, fontSize: "0.85rem" }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1B2A5E" }}>{voice.name}</p>
                    <p style={{ fontSize: "0.78rem", color: "#666" }}>{voice.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== FAQ SECTION ===== */}
      <section style={{ background: "#F5F7FA", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "6px" }}>
            こんな疑問にも<span style={{ color: "#2563EB" }}>ロジカルに</span><span style={{ color: "#DC2626" }}>答え</span>ます
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: "20px" }}>
            勤務医の先生の鋭い質問にも正面から答えます。
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                display: "flex", gap: "12px", alignItems: "flex-start",
                background: "#fff", borderRadius: "8px", padding: "14px 16px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
              }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "6px", flexShrink: 0,
                  background: "#1B2A5E",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <span style={{ color: "#F5C400", fontWeight: 900, fontSize: "0.85rem" }}>Q</span>
                </div>
                <p style={{ fontSize: "0.92rem", color: "#333", lineHeight: 1.6 }}>{faq}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== APPLY SECTION ===== */}
      <section style={{ background: "#fff", padding: "36px 16px" }} id="apply-section">
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "6px" }}>
            無料相談に申し込む
          </h2>
          <p style={{ fontSize: "0.92rem", color: "#555", marginBottom: "6px" }}>
            ご希望をお選びください
          </p>
          <p style={{ fontSize: "0.85rem", color: "#DC2626", fontWeight: 700, marginBottom: "20px" }}>
            5月申込限定・先着15名
          </p>
          <div style={{
            background: "#FFFDE7", border: "1px solid #F5C400", borderRadius: "8px",
            padding: "10px 14px", marginBottom: "20px",
            display: "flex", gap: "8px", alignItems: "flex-start"
          }}>
            <AlertTriangle size={16} color="#F5C400" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontSize: "0.82rem", color: "#B8860B", lineHeight: 1.6 }}>
              FPの稼働時間の都合上、申込枠に限りがあります。先着順ですので、申し込みはお早めに。
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {applyOptions.map((opt) => {
              const OptIcon = opt.Icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleApply(opt.id, opt.path)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "14px",
                    padding: "16px 18px", borderRadius: "10px",
                    background: "#fff",
                    border: `2px solid ${opt.color}`,
                    cursor: "pointer", textAlign: "left",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "8px", flexShrink: 0,
                    background: opt.color, display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <OptIcon size={22} color="#fff" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.95rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "2px" }}>
                      {opt.title}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.4 }}>{opt.desc}</p>
                    {opt.sub && (
                      <p style={{ fontSize: "0.78rem", color: "#999", marginTop: "2px" }}>{opt.sub}</p>
                    )}
                  </div>
                  <ChevronRight size={18} style={{ color: opt.color, flexShrink: 0 }} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#0f1e3d", padding: "28px 16px 40px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#93C5FD", fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px" }}>税理士×1級FP事務局</p>
          <p style={{ color: "#93C5FD", fontSize: "0.8rem", marginBottom: "4px" }}>📞 070-9097-3341</p>
          <p style={{ color: "#93C5FD", fontSize: "0.8rem", marginBottom: "12px" }}>✉ info@logicalfp.com</p>
          <a
            href="https://takita-tax-raxy253c.manus.space"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#64748B", fontSize: "0.7rem", textDecoration: "none", display: "inline-block", marginBottom: "8px" }}
          >
            powered by <span style={{ color: "#93C5FD", fontWeight: 700 }}>瀧田潤税理士事務所</span>
          </a>
          <br />
          <p style={{ color: "#4B5563", fontSize: "0.7rem", marginTop: "8px" }}>© 2025 All Rights Reserved.</p>
        </div>
      </footer>

      {/* ===== FIXED CTA BAR ===== */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "#1B2A5E",
        paddingBottom: "env(safe-area-inset-bottom)"
      }}>
        <div style={{ padding: "10px 16px", maxWidth: "480px", margin: "0 auto" }}>
          <button
            onClick={() => navigate('/booking')}
            style={{
              width: "100%", padding: "14px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: "#F5C400",
              color: "#fff", fontWeight: 900, fontSize: "0.95rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
            }}
          >
            <MessageCircle size={18} />
            FPの空き状況を確認する
          </button>
        </div>
      </div>
    </>
  );
}
