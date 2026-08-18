/**
 * LevelPage - 投資レベル別詳細ページ（リニューアル版）
 * Design: Medical Trust Blue（紺×ゴールド×白）
 * 構成：logicalfp.pro準拠・勤務医向けアレンジ
 *
 * セクション順序：
 * 1. ヘッダー（戻るボタン + powered by）
 * 2. レベル別コンテンツ（ポイント3つ）
 * 3. CTA（無料相談に申し込む）
 * 4. 申し込みフォーム選択
 * 5. フッター
 */

import { useLocation, useParams } from "wouter";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  ArrowUpRight,
  Shield,
  Lightbulb,
  Coins,
  Frown,
  HelpCircle,
  Scale,
  Search,
  PieChart,
  ThumbsUp,
  Clock,
  Eye,
  Banknote,
  FileText,
  Building2,
  User,
  Users,
  ClipboardList,
  Briefcase,
} from "lucide-react";

type Point = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  iconColor: string;
  text: string;
};

type LevelContent = {
  id: string;
  label: string;
  description: string;
  tagline: string;
  headerBg: string;
  accentColor: string;
  borderColor: string;
  headline: string;
  subheadline: string;
  points: Point[];
  ctaText: string;
  recommendedForm: string;
};

const levelContents: Record<string, LevelContent> = {
  beginner: {
    id: "beginner",
    label: "初心者",
    description: "現預金のみ",
    tagline: "「何かしなきゃ」と思いつつ、手をつけられていない先生へ",
    headerBg: "#2563EB",
    accentColor: "#2563EB",
    borderColor: "#2563EB",
    headline: "インフレ時代、\n銀行預金だけでは危険",
    subheadline: "具体的な始め方・金額設定は\n1級FPへの無料相談で解決できます",
    points: [
      {
        Icon: AlertTriangle, iconColor: "#D97706",
        text: "インフレ（物価上昇）に対して現預金の価値は目減りし続けます。高収入な勤務医であっても、インフレ次第では老後に資産が枯渇する可能性は十分にあります。",
      },
      {
        Icon: ArrowUpRight, iconColor: "#2563EB",
        text: "投資はNISA枠でインデックス投資が正解と言われています。インデックス投資とは何か、毎月いくらくらい積み立てた方が良いのか、初心者にも丁寧にロジカルに解説します。",
      },
      {
        Icon: Shield, iconColor: "#059669",
        text: "安全資産（債券・保険・金など）を組み合わせることで、暴落時も安心です。投資が怖いという先生は安全資産だけでも検討してみては？インフレには負けにくくなりますよ。",
      },
    ],
    ctaText: "無料で1級FPに相談する",
    recommendedForm: "fp-individual",
  },
  elementary: {
    id: "elementary",
    label: "初級者",
    description: "オルカンなど少額",
    tagline: "少し始めているのに、預貯金が多すぎませんか？",
    headerBg: "#059669",
    accentColor: "#059669",
    borderColor: "#059669",
    headline: "少し始めているのに\n預貯金が多すぎませんか？",
    subheadline: "リスク資産・安全資産の金額バランスも含めて\n1級FPのアドバイスが役立ちます",
    points: [
      {
        Icon: Coins, iconColor: "#D97706",
        text: "少し投資をしていても、預貯金が圧倒的に多い状態ではインフレに負けて勿体ない。高収入な先生こそ、資産の最適配分が重要です。",
      },
      {
        Icon: Frown, iconColor: "#2563EB",
        text: "とはいえ投資の比率が高すぎると不安ですよね？安全資産をポートフォリオに組み込むことでリスクを抑えながら資産を増やせます。",
      },
      {
        Icon: HelpCircle, iconColor: "#7C3AED",
        text: "本当にオルカンやS&P500だけでベストなのか？FANG+やS&P10といった選択肢も含めてプロの意見を聞いてみましょう。",
      },
    ],
    ctaText: "無料で1級FPに相談する",
    recommendedForm: "fp-individual",
  },
  intermediate: {
    id: "intermediate",
    label: "中級者",
    description: "インデックス中心",
    tagline: "投資比率が高いなら、バランスの見直しを",
    headerBg: "#D97706",
    accentColor: "#D97706",
    borderColor: "#D97706",
    headline: "投資比率が高いなら\nバランスの見直しを",
    subheadline: "現状の戦略が本当に正しいか\n専門家のセカンドオピニオンを聞いてみましょう",
    points: [
      {
        Icon: Scale, iconColor: "#D97706",
        text: "貯蓄のほとんどをインデックス投資に回しているなら、安全資産との比率が重要になってきます。暴落時のリスクを具体的な数字で確認しましょう。",
      },
      {
        Icon: Search, iconColor: "#2563EB",
        text: "本当にオルカンやS&P500がベストなのか？FANG+やS&P10といったインデックスをご存知ですか？これだけではリスクも大きいですが、ひと工夫加えることで大幅にリスクを下げられます。",
      },
      {
        Icon: PieChart, iconColor: "#059669",
        text: "金額のバランスも含めて、1級FPの助言を仰ぐことで最適なポートフォリオを構築できます。リスク資産・安全資産の選択と金額バランス。プロの視点で最適化しましょう。",
      },
    ],
    ctaText: "無料で1級FPに相談する",
    recommendedForm: "fp-individual",
  },
  advanced: {
    id: "advanced",
    label: "上級者",
    description: "個別株や債券も",
    tagline: "しっかり運用している先生へ、セカンドオピニオンのすすめ",
    headerBg: "#7C3AED",
    accentColor: "#7C3AED",
    borderColor: "#7C3AED",
    headline: "しっかり運用している先生へ\nセカンドオピニオンのすすめ",
    subheadline: "1級FP自身がどのようなポートフォリオで\n何を選んでいるのか、参考になる話が聞けます",
    points: [
      {
        Icon: ThumbsUp, iconColor: "#059669",
        text: "FANG+や個別株・債券まで手がけているのは素晴らしい。しっかりと取り組んでいる証拠です。多くの勤務医が資産形成に無頓着な中、先生は既に大きなアドバンテージを持っています。",
      },
      {
        Icon: Clock, iconColor: "#D97706",
        text: "ただ、お金のことを考えすぎると本業に影響が出ることも。医師としての本業こそが最大の資産形成手段。適切な「手離れ」も大切です。",
      },
      {
        Icon: Eye, iconColor: "#7C3AED",
        text: "現状のバランスが本当にベストか、専門家のセカンドオピニオンを聞くことで新たな気づきが生まれます。見落としていたリスクや改善点が見つかることがあります。",
      },
    ],
    ctaText: "無料で1級FPに相談する",
    recommendedForm: "fp-individual",
  },
  tax: {
    id: "tax",
    label: "税務特化",
    description: "まず節税を知りたい",
    tagline: "高収入な勤務医こそ、税金対策が最優先です",
    headerBg: "#DC2626",
    accentColor: "#DC2626",
    borderColor: "#DC2626",
    headline: "高収入な勤務医こそ\n税金対策が最優先です",
    subheadline: "税理士との個別相談で\nあなたの状況に合った最適な節税プランを提案します",
    points: [
      {
        Icon: Banknote, iconColor: "#DC2626",
        text: "勤務医は高収入な分、税額も大きい。所得税・住民税・社会保険料を合わせると収入の40〜50%が税金として消えることも。適切な税金対策をするだけで手取りが大幅に変わります。",
      },
      {
        Icon: FileText, iconColor: "#2563EB",
        text: "ふるさと納税・iDeCo・医療費控除・生命保険料控除など、活用できる制度を最大限に使えていますか？これらを組み合わせることで、合法的に税負担を大幅に減らすことができます。",
      },
      {
        Icon: Building2, iconColor: "#7C3AED",
        text: "将来の開業・法人化を見据えた税務戦略も、早めに考えておくことが重要です。資産運用と税金は一体で考えることで、手取りのリターンが大きく変わります。",
      },
    ],
    ctaText: "無料で税理士に相談する",
    recommendedForm: "tax-individual",
  },
};

const applyOptions = [
  { id: "fp-individual", Icon: User, title: "個別相談", desc: "1級FPの話をマンツーマンで聞きたい", sub: "30分〜延長可 ・ 21時以降も対応可", color: "#1B2A5E" },
  { id: "fp-seminar", Icon: Users, title: "オンラインセミナー参加", desc: "セミナー形式（60分）で1級FPの話を聞きたい", sub: "", color: "#2563EB" },
  { id: "tax-individual", Icon: ClipboardList, title: "税理士相談", desc: "税務の相談を専門家にしたい", sub: "30分〜延長可", color: "#059669" },
  { id: "all-round", Icon: Briefcase, title: "丸っと相談", desc: "FP＋税理士コラボで全部まとめて相談したい", sub: "", color: "#F5C400" },
];

export default function LevelPage() {
  const { level } = useParams<{ level: string }>();
  const [, navigate] = useLocation();

  const content = levelContents[level || "beginner"];

  if (!content) {
    navigate("/");
    return null;
  }

  const handleApply = (id: string) => {
    if (id === "fp-individual") navigate("/booking");
    else if (id === "fp-seminar") navigate("/fp-seminar-booking");
    else navigate(`/apply?type=${id}&level=${level}`);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F7FA", fontFamily: "'Noto Sans JP', sans-serif" }}>

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

      {/* ===== HEADER ===== */}
      <div style={{
        background: content.headerBg,
        padding: "16px 16px 24px",
      }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <button
            onClick={() => window.location.href = "/"}
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              color: "rgba(255,255,255,0.8)", fontSize: "0.82rem",
              background: "none", border: "none", cursor: "pointer",
              marginBottom: "16px", padding: 0
            }}
          >
            <ChevronLeft size={16} />
            トップに戻る
          </button>

          <div style={{ marginBottom: "8px" }}>
            <span style={{
              fontSize: "0.72rem", fontWeight: 900, padding: "3px 10px",
              background: "rgba(255,255,255,0.2)", borderRadius: "100px",
              color: "#fff", display: "inline-block", marginBottom: "10px"
            }}>
              {content.label}の先生へ
            </span>
            <h1 style={{
              fontSize: "1.25rem", fontWeight: 900, color: "#fff",
              lineHeight: 1.5, whiteSpace: "pre-line"
            }}>
              {content.headline}
            </h1>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.15)", borderRadius: "8px",
            padding: "10px 14px", backdropFilter: "blur(4px)"
          }}>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.78rem", lineHeight: 1.6 }}>
              あなたの現状に合わせた情報をご覧ください。最後に無料相談の申し込みフォームへご案内します。
            </p>
          </div>
        </div>
      </div>

      {/* ===== GOLD DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== CONTENT SECTION ===== */}
      <section style={{ background: "#F5F7FA", padding: "28px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            {content.points.map((point, i) => {
              const PointIcon = point.Icon;
              return (
                <div key={i} style={{
                  display: "flex", gap: "12px", alignItems: "flex-start",
                  background: "#fff", borderRadius: "10px", padding: "14px 16px",
                  border: "1px solid #E5E7EB",
                  borderLeft: `4px solid ${point.iconColor}`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
                    background: `${point.iconColor}18`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <PointIcon size={16} color={point.iconColor} />
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#333", lineHeight: 1.7 }}>{point.text}</p>
                </div>
              );
            })}
          </div>

          <div style={{
            background: "#fff", borderRadius: "10px", padding: "16px",
            border: "1px solid #E5E7EB", textAlign: "center", marginBottom: "20px"
          }}>
            <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {content.subheadline}
            </p>
          </div>

          <button
            onClick={() => document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              width: "100%", padding: "16px", borderRadius: "8px",
              background: content.headerBg, color: "#fff", fontWeight: 900,
              fontSize: "0.95rem", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
            }}
          >
            {content.ctaText} <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ===== GOLD DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== APPLY SECTION ===== */}
      <section style={{ background: "#fff", padding: "28px 16px" }} id="apply-section">
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", marginBottom: "6px" }}>
            無料相談に申し込む
          </h2>
          <p style={{ fontSize: "0.78rem", color: "#555", textAlign: "center", marginBottom: "6px" }}>
            ご希望の形式をお選びください
          </p>
          <p style={{ fontSize: "0.72rem", color: "#DC2626", fontWeight: 700, textAlign: "center", marginBottom: "20px" }}>
            先着順 ・ 週5名限定
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {applyOptions.map((opt) => {
              const OptIcon = opt.Icon;
              const isRecommended = opt.id === content.recommendedForm;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleApply(opt.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 16px", borderRadius: "10px",
                    background: isRecommended ? content.headerBg : "#fff",
                    border: `2px solid ${isRecommended ? content.headerBg : "#E5E7EB"}`,
                    cursor: "pointer", textAlign: "left",
                    boxShadow: isRecommended ? `0 4px 12px ${content.headerBg}33` : "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  {isRecommended && (
                    <span style={{
                      position: "absolute",
                      fontSize: "0.6rem", fontWeight: 900,
                      background: "#F5C400", color: "#fff",
                      padding: "2px 8px", borderRadius: "100px",
                    }}>
                    </span>
                  )}
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "8px", flexShrink: 0,
                    background: isRecommended ? "rgba(255,255,255,0.2)" : opt.color,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <OptIcon size={20} color={isRecommended ? "#fff" : "#fff"} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                      <p style={{ fontSize: "0.85rem", fontWeight: 900, color: isRecommended ? "#fff" : "#1B2A5E" }}>
                        {opt.title}
                      </p>
                      {isRecommended && (
                        <span style={{
                          fontSize: "0.6rem", fontWeight: 900,
                          background: "#F5C400", color: "#fff",
                          padding: "2px 6px", borderRadius: "100px",
                        }}>
                          おすすめ
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.72rem", color: isRecommended ? "rgba(255,255,255,0.8)" : "#555", lineHeight: 1.4 }}>{opt.desc}</p>
                    {opt.sub && (
                      <p style={{ fontSize: "0.65rem", color: isRecommended ? "rgba(255,255,255,0.6)" : "#999", marginTop: "2px" }}>{opt.sub}</p>
                    )}
                  </div>
                  <ChevronRight size={16} color={isRecommended ? "rgba(255,255,255,0.7)" : "#999"} style={{ flexShrink: 0 }} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#0f1e3d", padding: "24px 16px 80px", textAlign: "center" }}>
        <p style={{ color: "#93C5FD", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px" }}>税理士×1級FP事務局</p>
        <p style={{ color: "#93C5FD", fontSize: "0.78rem", marginBottom: "4px" }}>📞 070-9097-3341</p>
        <p style={{ color: "#93C5FD", fontSize: "0.78rem", marginBottom: "10px" }}>✉ info@logicalfp.com</p>
        <a
          href="https://takita-tax-raxy253c.manus.space"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#64748B", fontSize: "0.7rem", textDecoration: "none", display: "inline-block", marginBottom: "6px" }}
        >
          powered by <span style={{ color: "#93C5FD", fontWeight: 700 }}>瀧田潤税理士事務所</span>
        </a>
        <p style={{ color: "#4B5563", fontSize: "0.7rem" }}>© 2025 All Rights Reserved.</p>
      </footer>

      {/* ===== FIXED CTA BAR ===== */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "#1B2A5E",
        paddingBottom: "env(safe-area-inset-bottom)"
      }}>
        <div style={{ padding: "10px 16px", maxWidth: "480px", margin: "0 auto" }}>
          <button
            onClick={() => document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              width: "100%", padding: "14px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: "#1B2A5E",
              color: "#1B2A5E", fontWeight: 900, fontSize: "0.95rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
            }}
          >
            無料相談に申し込む（完全無料）
          </button>
        </div>
      </div>
    </div>
  );
}
