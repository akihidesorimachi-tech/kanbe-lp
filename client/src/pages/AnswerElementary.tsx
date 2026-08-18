import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { X, Mail, ChevronRight } from "lucide-react";
import AnswerBottomSections from "@/components/AnswerBottomSections";

export default function AnswerElementary() {
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

      {/* ===== BLUE DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #2563EB, #60A5FA, #2563EB)" }} />

      {/* ===== ANSWER SECTION ===== */}
      <section style={{ background: "#fff", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>

          {/* セクションラベル */}
          <p style={{ color: "#2563EB", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>
            ANSWER
          </p>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "6px" }}>
            「なんとなく積み立てている」を<br />
            <span style={{ color: "#DC2626" }}>今すぐ卒業する</span>3つの答え
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.7, marginBottom: "28px" }}>
            老後の必要額を把握し、積立額を最適化し、インデックス投資の仕組みを理解する——この3ステップで、あなたの資産形成は大きく変わります。
          </p>

          {/* ===== 答え 3（先頭に移動）===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            1．仕組みを知れば、怖さは消える
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
            「なぜ暴落するのか」「暴落後どうなるのか」——この2つが分かれば、インデックス投資への不安は大きく軽減されます。
            株価が下がる原因は、<strong>景気後退・金利上昇・地政学リスク</strong>など様々ですが、
            経済は長期的に成長を続けるため、<strong style={{ color: "#059669" }}>過去の大暴落はすべて回復しています</strong>。
          </p>

          {/* 暴落と回復の実績 */}
          <div style={{ background: "#fff", borderRadius: "8px", padding: "14px", border: "1px solid #E5E7EB", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", margin: "0 0 12px" }}>
              S&P500 主な暴落と回復までの期間
            </p>
            {[
              { event: "ITバブル崩壊（2000年）", drop: "−49%", recovery: "約7年で全値回復", recoveryColor: "#F59E0B" },
              { event: "リーマンショック（2008年）", drop: "−57%", recovery: "約5年で全値回復", recoveryColor: "#F59E0B" },
              { event: "コロナショック（2020年）", drop: "−34%", recovery: "約6ヶ月で全値回復", recoveryColor: "#059669" },
            ].map((d) => (
              <div key={d.event} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #F3F4F6", gap: "8px" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.73rem", color: "#374151", margin: 0, lineHeight: 1.4, fontWeight: 700 }}>{d.event}</p>
                  <p style={{ fontSize: "0.72rem", color: "#DC2626", fontWeight: 900, margin: "3px 0 0" }}>最大下落 {d.drop}</p>
                </div>
                <div style={{ background: "#DCFCE7", borderRadius: "6px", padding: "5px 10px", flexShrink: 0 }}>
                  <p style={{ fontSize: "0.7rem", color: d.recoveryColor, fontWeight: 900, margin: 0 }}>{d.recovery}</p>
                </div>
              </div>
            ))}
            <p style={{ fontSize: "0.75rem", color: "#2563EB", fontWeight: 900, textAlign: "center", margin: "12px 0 0" }}>
              長期保有すれば、暴落はいずれ回復している
            </p>
          </div>

          {/* 分散効果の説明 */}
          <div style={{ background: "#fff", borderRadius: "8px", padding: "14px", border: "1px solid #E5E7EB", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", margin: "0 0 12px" }}>
              インデックス投資が「怖くない」理由
            </p>
            {[
              { icon: "🌐", title: "数百〜数千銘柄に自動分散", body: "S&P500は米国の優良企業500社、オルカンは世界約3,000社に分散。1社が倒産しても影響は軽微です。" },
              { icon: "📈", title: "長期では右肩上がりの実績", body: "S&P500の過去30年の年平均リターンは約10%。短期の上下に惑わされず、長期保有が鍵です。" },
              { icon: "🔄", title: "積立投資なら「暴落が味方」になる", body: "毎月定額を積み立てると、暴落時に安く多く買えます。長期では平均取得単価が下がり有利になります。" },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0, lineHeight: 1.3 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 3px" }}>{item.title}</p>
                  <p style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>


          {/* ===== 答え 2（2番目）===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            2．老後の「本当の必要額」を計算する
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "14px" }}>
            「老後2,000万円問題」はあくまで平均的な会社員の試算です。勤務医の生活水準なら必要額はその数倍になります。
            以下の4ステップで、自分の数字を出してみてください。
          </p>

          {/* 必要額の計算ステップ */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #E5E7EB", padding: "14px", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", margin: "0 0 14px" }}>
              必要額の算出方法
            </p>
            {[
              {
                step: "STEP 1",
                label: "月いくら使いたいか決める",
                detail: "今の生活費を参考に、老後も維持したい月の生活費を設定する",
                example: "例）月50万円",
                color: "#2563EB", bg: "#EFF6FF",
              },
              {
                step: "STEP 2",
                label: "年金との差額（不足額）を出す",
                detail: "生活費 − 年金額（目安22万円）＝ 毎月の不足額",
                example: "例）50万円 − 22万円 ＝ 28万円／月",
                color: "#059669", bg: "#F0FDF4",
              },
              {
                step: "STEP 3",
                label: "老後30年分の必要額を計算",
                detail: "不足額 × 12ヶ月 × 30年 ＝ 必要額（インフレなし）",
                example: "例）28万円 × 12 × 30 ＝ 1億80万円",
                color: "#7C3AED", bg: "#F5F3FF",
              },
              {
                step: "STEP 4",
                label: "インフレ調整をかける",
                detail: "インフレ率2%だとすると老後30年間の合計必要額はインフレなしの約2.45倍に膨らむ",
                example: "例）1億80万円 × 2.45 ≒ 約2億4,700万円",
                color: "#DC2626", bg: "#FEF2F2",
              },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: item.bg, borderRadius: "8px", padding: "10px 12px", marginBottom: "8px", border: `1.5px solid ${item.color}` }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 900, color: "#fff", background: item.color, borderRadius: "4px", padding: "2px 6px", flexShrink: 0, marginTop: "2px", whiteSpace: "nowrap" }}>{item.step}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.78rem", fontWeight: 900, color: item.color, margin: "0 0 2px" }}>{item.label}</p>
                  <p style={{ fontSize: "0.68rem", color: "#4B5563", margin: "0 0 2px", lineHeight: 1.5 }}>{item.detail}</p>
                  <p style={{ fontSize: "0.68rem", color: "#6B7280", margin: 0, fontStyle: "italic" }}>{item.example}</p>
                </div>
              </div>
            ))}
            <p style={{ fontSize: "0.75rem", color: "#DC2626", fontWeight: 900, textAlign: "center", margin: "10px 0 0" }}>
              生活費・年金額・インフレ率は人によって異なるため、自分の数字で計算することが重要
            </p>
          </div>


          {/* ===== 答え 3（3番目）===== */}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.5, marginBottom: "12px" }}>
            3．必要額から逆算して積立額を決める
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "14px" }}>
            必要額が分かったら、次は「今の自分の積立力で届くか」を検証します。
            以下の3ステップで、必要な積立額と利回りを把握してください。
          </p>

          {/* 積立額の決め方ステップ */}
          <div style={{ background: "#fff", borderRadius: "8px", padding: "14px", border: "1px solid #E5E7EB", marginBottom: "16px" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", margin: "0 0 14px" }}>
              積立額の決め方
            </p>
            {[
              {
                step: "STEP 1",
                label: "年間の貯蓄可能額を概算する",
                detail: "旅行・大きな買い物など単発の出費を除いた、長期で継続できる年間の貯蓄額を出す",
                example: "例）年収1,500万円、生活費・税・社保を引いて年300万円が長期貯蓄に回せる",
                color: "#2563EB", bg: "#EFF6FF",
              },
              {
                step: "STEP 2",
                label: "複利計算で65歳時点の資産額を確認",
                detail: "貯蓄可能額と想定利回りを複利計算ソフトに入力し、65歳時点の資産額を見る（オルカンなら想定利回り5%程度）",
                example: "例）月25万円・年率5%・30年 → 約2億800万円",
                color: "#059669", bg: "#F0FDF4",
              },
              {
                step: "STEP 3",
                label: "数字を調整して商品と金額を決める",
                detail: "必要額に届くよう利回りや積立額を調整し、使う金融商品（投資信託・債券・保険・金など）と金額配分を検討する",
                example: "例）投資信託（オルカン・S&P500・FANG+）月20万円＋債券月5万円",
                color: "#7C3AED", bg: "#F5F3FF",
              },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: item.bg, borderRadius: "8px", padding: "10px 12px", marginBottom: "8px", border: `1.5px solid ${item.color}` }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 900, color: "#fff", background: item.color, borderRadius: "4px", padding: "2px 6px", flexShrink: 0, marginTop: "2px", whiteSpace: "nowrap" }}>{item.step}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.78rem", fontWeight: 900, color: item.color, margin: "0 0 2px" }}>{item.label}</p>
                  <p style={{ fontSize: "0.68rem", color: "#4B5563", margin: "0 0 2px", lineHeight: 1.5 }}>{item.detail}</p>
                  <p style={{ fontSize: "0.68rem", color: "#6B7280", margin: 0, fontStyle: "italic" }}>{item.example}</p>
                </div>
              </div>
            ))}
            <p style={{ fontSize: "0.72rem", color: "#1B2A5E", fontWeight: 700, textAlign: "center", margin: "10px 0 0", lineHeight: 1.6 }}>
              想定利回りの設定方法や、積立額の詳細な決め方はFP相談で聞いていただくことが可能です。
            </p>
          </div>


          {/* ANSWER CTA */}
          <div style={{
            background: "#F5F7FA", border: "1px solid #E5E7EB",
            borderRadius: "10px", padding: "16px", textAlign: "center", marginBottom: "4px"
          }}>
            <p style={{ fontSize: "0.95rem", color: "#1B2A5E", fontWeight: 900, lineHeight: 1.8, marginBottom: "14px" }}>
              必要額の試算・積立額の最適化・<br />適切なインデックスの選択など<br /><span style={{ color: "#DC2626", fontSize: "1.05rem" }}>「1級FPとの無料相談」</span>で解決できます
            </p>
            <button
              onClick={() => navigate("/#consultation")}
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
