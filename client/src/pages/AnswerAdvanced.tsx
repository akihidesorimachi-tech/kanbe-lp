import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { X, Mail, ChevronRight } from "lucide-react";
import AnswerBottomSections from "@/components/AnswerBottomSections";

export default function AnswerAdvanced() {
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

      {/* ===== PURPLE DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #7C3AED, #A78BFA, #7C3AED)" }} />

      {/* ===== ANSWER SECTION ===== */}
      <section style={{ background: "#fff", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p style={{ color: "#7C3AED", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>
            ANSWER
          </p>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.4, marginBottom: "8px" }}>
            個別株・債券を持つ上級者の先生へ、<span style={{ color: "#7C3AED" }}>3つの視点</span>で資産を最適化しましょう
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", marginBottom: "24px", fontWeight: 700 }}>
            すでに運用している方こそ、専門家の視点で「見落とし」を発見できます
          </p>

          {/* ===== 答え1: インデックス投資の本質的な理解 ===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            1．インデックス投資の本質を理解する
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
            個別株・債券を保有することは素晴らしいことです。ただ、<strong>長期で見るとオルカン・S&P500を上回り続けている個人投資家は少数</strong>です。まずインデックス投資の強みを腹落ちするまで理解することが、上級者の資産戦略の出発点です。
          </p>

          {/* インデックス投資の強みカード */}
          <div style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 900, color: "#7C3AED", marginBottom: "12px" }}>
              インデックス投資が強い理由
            </p>
            {[
              { icon: "📊", title: "市場平均を丸ごと取れる", body: "個別銘柄の選定ミスがなく、市場全体の成長をそのまま享受できる。長期では大多数のアクティブ運用を上回る実績がある。" },
              { icon: "💰", title: "コストが圧倒的に低い", body: "信託報酬0.1%以下の商品も多く、長期複利で見ると手数料の差が最終的なリターンに大きく影響する。" },
              { icon: "🧠", title: "感情に左右されない", body: "「何を買うか」を考えなくて良いため、暴落時に余計な判断をせず長期保有を続けやすい。" },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <span style={{ fontSize: "1.2rem", lineHeight: 1.4, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: "0.85rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 2px", lineHeight: 1.4 }}>{item.title}</p>
                  <p style={{ fontSize: "0.82rem", color: "#374151", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 個別株 vs ハイボラインデックス */}
          <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: "10px", padding: "16px", marginBottom: "28px" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 900, color: "#C2410C", marginBottom: "10px" }}>
              💡 個別株でパフォーマンスを追うなら…
            </p>
            <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
              「個別株が楽しい」「銘柄研究が趣味」なら続ける価値は十分あります。ただ、<strong>純粋にパフォーマンスを追うなら、個別株よりもハイボラティリティなインデックスの方が強い可能性</strong>があります。
            </p>
            <div style={{ background: "#fff", border: "1px solid #FED7AA", borderRadius: "8px", padding: "12px 14px" }}>
              <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 8px" }}>ハイボラインデックスの例</p>
              {[
                { name: "FANG+", desc: "Meta・Apple・Amazon・Netflix・Googleなど米国テック大型10銘柄に集中投資。過去10年の年率リターンはS&P500を大きく上回る実績。" },
                { name: "S&P10（レバレッジ型）", desc: "S&P500の2〜3倍の値動きを目指すETF。上昇時の恩恵は大きいが、下落時の損失も倍増するため、資産の一部（サテライト）での活用が前提。" },
              ].map((item) => (
                <div key={item.name} style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #FED7AA" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 900, color: "#C2410C", margin: "0 0 2px" }}>{item.name}</p>
                  <p style={{ fontSize: "0.78rem", color: "#374151", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
              <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
                ※ ハイボラ商品はリスクも高いため、安全資産との併用が望ましいです
              </p>
            </div>
          </div>

          {/* ===== 答え2: 安全資産とリスク資産の使い分け ===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            2．リスク資産と安全資産の特性を理解してバランスを適正に
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
            個別株・債券を持つ方ほど、<strong>ポートフォリオ全体のバランス設計</strong>が重要です。リスク資産と安全資産それぞれの特性を理解し、ライフステージに合わせた比率に整えることが資産を守る鍵です。
          </p>

          {/* リスク資産 vs 安全資産 比較 */}
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "12px", textAlign: "center" }}>リスク資産と安全資産の特性</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 900, color: "#7C3AED", margin: "0 0 6px" }}>📈 リスク資産（攻め）</p>
                {["株式・インデックス投資", "個別株・FANG+等", "変額保険・REIT"].map((t) => (
                  <p key={t} style={{ fontSize: "0.75rem", color: "#374151", margin: "0 0 3px", lineHeight: 1.5 }}>・{t}</p>
                ))}
                <p style={{ fontSize: "0.72rem", color: "#7C3AED", margin: "6px 0 0", fontWeight: 700 }}>長期で大きな資産形成を狙う</p>
              </div>
              <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 900, color: "#059669", margin: "0 0 6px" }}>🛡️ 安全資産（守り）</p>
                {["現預金・MRF", "国内・外国債券", "終身保険・金（ゴールド）"].map((t) => (
                  <p key={t} style={{ fontSize: "0.75rem", color: "#374151", margin: "0 0 3px", lineHeight: 1.5 }}>・{t}</p>
                ))}
                <p style={{ fontSize: "0.72rem", color: "#059669", margin: "6px 0 0", fontWeight: 700 }}>資産を守りリスクを調整する</p>
              </div>
            </div>
            <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "8px", padding: "10px 12px" }}>
              <p style={{ fontSize: "0.82rem", color: "#1D4ED8", fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
                💡 攻めと守りは対立ではなく共存。安全資産が「緩衝材」となり、暴落時にリスク資産を売らずに済む体制を作ります
              </p>
            </div>
          </div>

          {/* ライフステージ別 比率イメージ */}
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "28px" }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "4px", textAlign: "center" }}>
               ライフステージ別 推奨ポートフォリオ比率（目安）
            </p>
            <p style={{ fontSize: "0.68rem", color: "#6B7280", marginBottom: "14px", textAlign: "center" }}>「110－年齢」の法則に基づく一般的な目安（SBI証券・三菱UFJアセットマネジメント等）</p>
            {[
              { label: "40歳代（資産形成期）", risk: 70, safe: 30 },
              { label: "50歳代（起伏期）", risk: 60, safe: 40 },
              { label: "60歳代（移行期）", risk: 50, safe: 50 },
            ].map((row) => (
              <div key={row.label} style={{ marginBottom: "12px" }}>
                <p style={{ fontSize: "0.75rem", color: "#374151", margin: "0 0 4px", fontWeight: 700 }}>{row.label}</p>
                <div style={{ display: "flex", height: "22px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${row.risk}%`, background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "0.68rem", color: "#fff", fontWeight: 900 }}>リスク {row.risk}%</span>
                  </div>
                  <div style={{ width: `${row.safe}%`, background: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "0.68rem", color: "#fff", fontWeight: 900 }}>安全 {row.safe}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== 答え3: 出口戦略 ===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            3．出口戦略：取り崩し方と暴落時の備え
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
            資産形成に成功している方ほど、<strong>「どう取り崩すか」「暴落が来たらどうするか」</strong>の設計が不十分なケースが多いです。「増やす」だけでなく「使う」まで設計することが資産を守る鍵です。
          </p>

          {/* 取り崩し方3パターン */}
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "12px" }}>取り崩し方の3パターン比較</p>
            {[
              { type: "一括取り崩し", merit: "まとまった支出（住宅・教育費等）に対応しやすい", demerit: "タイミングによっては暴落時に売却するリスクがある", color: "#7C3AED", bg: "#F5F3FF" },
              { type: "定額取り崩し", merit: "毎月一定額を引き出す。管理しやすく生活費の計算が立てやすい", demerit: "資産が少ない時期でも同額を引き出すため、資産が早く底をつく可能性", color: "#2563EB", bg: "#EFF6FF" },
              { type: "定率取り崩し", merit: "残高の一定割合（例：年4%）を引き出す。資産が長持ちしやすい", demerit: "引き出し額が変動するため、生活費の計算が立てにくい", color: "#059669", bg: "#F0FDF4" },
            ].map((item) => (
              <div key={item.type} style={{ background: item.bg, borderRadius: "8px", padding: "12px 14px", marginBottom: "10px", borderLeft: `4px solid ${item.color}` }}>
                <p style={{ fontSize: "0.88rem", fontWeight: 900, color: item.color, margin: "0 0 6px" }}>{item.type}</p>
                <p style={{ fontSize: "0.78rem", color: "#374151", margin: "0 0 3px", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>◎ メリット：</span>{item.merit}
                </p>
                <p style={{ fontSize: "0.78rem", color: "#374151", margin: 0, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>△ 注意点：</span>{item.demerit}
                </p>
              </div>
            ))}
          </div>

          {/* 暴落時の対策 */}
          <div style={{ background: "#FFF5F5", border: "1px solid #FECACA", borderRadius: "10px", padding: "16px", marginBottom: "28px" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 900, color: "#DC2626", marginBottom: "10px" }}>
              📉 暴落時の対策：「順序リスク」を知っていますか？
            </p>
            <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
              取り崩し期に暴落が重なると、<strong>資産が想定より早く底をつく「順序リスク」</strong>が発生します。これは資産形成期の暴落よりも遥かにダメージが大きい。
            </p>
            <div style={{ background: "#fff", border: "1px solid #FECACA", borderRadius: "8px", padding: "12px 14px" }}>
              <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 8px" }}>対策の流れ</p>
              {[
                { step: "①", text: "安全資産（現預金・債券）を2〜3年分の生活費として確保しておく" },
                { step: "②", text: "暴落時はリスク資産の取り崩しを止め、安全資産から生活費を補填する" },
                { step: "③", text: "リスク資産が回復したら取り崩しを再開する" },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 900, color: "#DC2626", flexShrink: 0 }}>{item.step}</span>
                  <p style={{ fontSize: "0.82rem", color: "#374151", margin: 0, lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== 1級FPのポートフォリオ ===== */}
          <div style={{ background: "#1B2A5E", borderRadius: "12px", padding: "20px 16px", marginBottom: "28px" }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#A78BFA", letterSpacing: "0.08em", margin: "0 0 6px" }}>REFERENCE</p>
            <p style={{ fontSize: "1.05rem", fontWeight: 900, color: "#fff", lineHeight: 1.5, margin: "0 0 14px" }}>
              1級FPのポートフォリオを参考にしてみては？
            </p>
            <p style={{ fontSize: "0.85rem", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "14px" }}>
              「何を参考にすれば良いかわからない」という方には、担当1級FP自身のポートフォリオ構成をそのままお見せします。実際に自分のお金を運用しているFPが、どんな比率・商品で組んでいるかを知ることは、最も実践的な参考情報のひとつです。
            </p>
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "12px 14px", marginBottom: "14px" }}>
              <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#F5C400", margin: "0 0 8px" }}>無料相談でお伝えできること</p>
              {[
                "1級FP自身のポートフォリオ比率（リスク資産・安全資産の内訳）",
                "FANG+などハイボラ商品の取り入れ方と比率",
                "あなたのポートフォリオとの比較・改善提案",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
                  <span style={{ fontSize: "0.82rem", color: "#A78BFA", flexShrink: 0, lineHeight: 1.5 }}>✓</span>
                  <p style={{ fontSize: "0.82rem", color: "#E2E8F0", margin: 0, lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/booking')}
              style={{
                width: "100%", padding: "14px",
                background: "#F5C400",
                color: "#1B2A5E", fontWeight: 900, fontSize: "0.95rem",
                border: "none", borderRadius: "10px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
              }}
            >
              FPの空き状況を確認する
              <ChevronRight size={18} />
            </button>
            <p style={{ fontSize: "0.68rem", color: "#94A3B8", marginTop: "8px", marginBottom: 0, display: "flex", justifyContent: "space-between", gap: "0" }}>
              <span>✓ 無料</span><span>✓ 30分(延長可)</span><span>✓ オンライン可</span><span>✓ 21時以降可</span>
            </p>
          </div>

          {/* バナー画像 */}
          <div style={{ marginTop: "8px" }}>
            <img
              src="/assets/hero_banner_9cc7f1af_97b19273.jpeg"
              alt="お金の答えは1級フィナンシャルプランナーと税理士に聴くのが早い！"
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
