/**
 * Home Page - トップページ（リニューアル版）
 * Design: Medical Trust Blue（紺×ゴールド×白）
 * 構成：logicalfp.pro準拠・勤務医向けアレンジ
 *
 * セクション順序：
 * 1. ヘッダー（powered by / バッジ）
 * 2. ヒーロー（大見出し + CTA + 週5名限定）
 * 3. PROBLEM（3課題）
 * 4. FOR ALL LEVELSバナー
 * 5. SOLUTION（4解決策）
 * 6. 二刀流セクション
 * 7. 投資レベル別タブ（5種類）
 * 8. そもそも1級FPって？
 * 9. 相談料チャート（FeeSection）
 * 10. なぜ無料？
 * 11. 相談者の声
 * 12. こんな疑問にも答えます（FAQ）
 * 13. 申し込みセクション
 * 14. フッター
 */

import React, { useState, useEffect } from "react";
import FeeSection from "@/components/FeeSection";
import { useLocation } from "wouter";
import {
  ChevronRight,
  ChevronDown,
  Clock,
  Shield,
  BadgePercent,
  AlertTriangle,
  HelpCircle,
  Banknote,
  ArrowUpRight,
  Lightbulb,
  Coins,
  Frown,
  Scale,
  Search,
  PieChart,
  ThumbsUp,
  Eye,
  FileText,
  Building2,
  User,
  Users,
  ClipboardList,
  Briefcase,
  Star,
  TrendingUp,
  Landmark,
  BarChart2,
  Rocket,
  Receipt,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

// ===== 投資レベルデータ =====
const levels = [
  {
    id: "beginner",
    Icon: Landmark,
    label: "初心者",
    description: "現預金のみ",
    color: "#EBF4FF",
    borderColor: "#2563EB",
    labelBg: "#2563EB",
    content: {
      headline: "初心者の方へ",
      subheadline: "「何かしなきゃ」と思いつつ、手をつけられていない方",
      ctaText: "具体的な始め方・金額設定は1級FPへの無料相談で解決できます",
      points: [
        { num: "01", title: "インフレ時代、銀行預金だけでは危険", desc: "インフレ（物価上昇）に対して現預金の価値は目減りし続けます。高収入であってもインフレ次第では老後に資産が枯渇する可能性は十分にあります。" },
        { num: "02", title: "まずはNISAでインデックス投資から", desc: "投資はNISA枠でインデックス投資が正解と言われています。インデックス投資とは何か、毎月いくらくらい積み立てた方が良いのか、初心者にも丁寧にロジカルに解説します。" },
        { num: "03", title: "安全資産も持つべき", desc: "安全資産（債券・保険・金など）を組み合わせることで、暴落時も安心です。投資が怖いという方は安全資産だけでも検討してみては？インフレには負けにくくなりますよ。" },
      ],
    },
  },
  {
    id: "elementary",
    Icon: TrendingUp,
    label: "初級者",
    description: "オルカンなど少額",
    color: "#ECFDF5",
    borderColor: "#059669",
    labelBg: "#059669",
    content: {
      headline: "初級の方へ",
      subheadline: "なんとなくインデックス投資少額",
      ctaText: "具体的なメリットデメリットや金額は1級FPと考えるのが効率的です",
      points: [
        { num: "01", title: "現預金が圧倒的に多い状態はインフレ負け", desc: "少額の投資をしていても、残りが全部現預金では資産全体でインフレに負け続けていき、将来資産が枯渇する恐れがあります。比率の最適化が必要です。" },
        { num: "02", title: "「なぜオルカンが良いか」説明できますか？", desc: "周囲の情報で始めたものの、メリットデメリットを理解せずに投資するのは危険です。理解は安心とリスク回避につながります。" },
        { num: "03", title: "将来困らないために必要な積み立て額から逆算する", desc: "インデックス投資を理解すれば安心して投資への予算を上げることができます。将来からの逆算も踏まえて必要な積み立てをすることが重要です。" },
      ],
    },
  },
  {
    id: "intermediate",
    Icon: BarChart2,
    label: "中級者",
    description: "インデックス中心",
    color: "#FFFBEB",
    borderColor: "#D97706",
    labelBg: "#D97706",
    content: {
      headline: "中級の方へ",
      subheadline: "貯蓄のほとんどをインデックス投資に回している方",
      ctaText: "ポートフォリオの最適化は1級FPとの無料相談で",
      points: [
        { num: "01", title: "オルカン・S&P500は「安全」ではない", desc: "S&P500は以下のように何度も暴落を繰り返しています。個別株よりは低リスクではあるものの、カテゴリとしてはリスク資産です。", bullets: ["ITバブル崩壊：約49%下落（回復に7年）", "リーマンショック：56%下落（回復に6年）"] },
        { num: "02", title: "暴落時に大きな出費が重なったら？", desc: "住宅購入・子どもの教育費・転職など、人生の大きなイベントが暴落と重なった場合、リスク資産だけでは対応できません。" },
        { num: "03", title: "安全資産をパートナーとして組み込む", desc: "債券・保険・金などの安全資産があることで暴落時にリスク資産を使わずに凌ぐことができ、結果的にリスク資産のパフォーマンスを上げることに繋がります。" },
        { num: "04", title: "そもそもオルカン・S&P500がベストか？", desc: "FANG+等のハイボラティリティなインデックス＋安全資産の組み合わせは、オルカンやS&P500等へ集中投資した際のパフォーマンスを期待値上遥かに上回ります。" },
      ],
    },
  },
  {
    id: "advanced",
    Icon: Rocket,
    label: "上級者",
    description: "個別株や債券も",
    color: "#F5F3FF",
    borderColor: "#7C3AED",
    labelBg: "#7C3AED",
    content: {
      headline: "上級の方へ",
      subheadline: "FANG+や個別株・債券なども保有している方",
      ctaText: "ポートフォリオの最適化は1級FPとの無料相談で",
      points: [
        { num: "01", title: "しっかり取り組んでいる、素晴らしい！", desc: "ここまで自分で考えて行動できている方は少数です。その姿勢は本業にも活きているはずです。" },
        { num: "02", title: "お金のことを考えすぎると本業に影響も", desc: "本業で最大のパフォーマンスを発揮するためにも、資産管理に使う認知リソースは最小化すべきです。" },
        { num: "03", title: "現状のバランスは本当にベストか？", desc: "専門家のセカンドオピニオンを聞くことで、見落としや改善点が見つかることがあります。" },
        { num: "04", title: "1級FP自身のポートフォリオも公開", desc: "1級FP自身がどのようなポートフォリオを組んでいるか、具体的な参考情報として共有します。" },
      ],
    },
  },
  {
    id: "tax",
    Icon: Receipt,
    label: "税務特化",
    description: "まず節税を知りたい",
    color: "#FFF1F2",
    borderColor: "#DC2626",
    labelBg: "#DC2626",
    content: {
      headline: "税務特化の方へ",
      subheadline: "高収入な勤務医こそ、税金対策が最優先です",
      points: [
        { num: "01", title: "適切な税金対策で手取りが大幅に変わる", desc: "勤務医は高収入な分、税額も大きい。適切な税金対策をするだけで手取りが大幅に変わります。" },
        { num: "02", title: "活用できる制度を最大限に使えていますか？", desc: "ふるさと納税・iDeCo・医療費控除・生命保険料控除など、活用できる制度を最大限に使えていますか？" },
        { num: "03", title: "将来の開業・法人化を見据えた税務戦略を", desc: "将来の開業・法人化を見据えた税務戦略も、早めに考えておくことが重要です。税理士との個別相談で最適な節税プランを提案します。" },
      ],
    },
  },
];

// ===== 申し込みオプション =====
const applyOptions = [
  {
    id: "fp-individual",
    Icon: User,
    title: "1級FP無料相談(オンライン可)",
    desc: "FPの空き状況を確認する",
    sub: "30分～延長可 ・ 21時以降も対応可",
    color: "#1B2A5E",
  },
  {
    id: "tax-individual",
    Icon: ClipboardList,
    title: "税理士オンラインセミナー参加",
    desc: "セミナー形式（60分）で税理士の話を聞きたい。",
    sub: "",
    color: "#059669",
  },
];

// ===== 相談者の声 =====
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

// ===== FAQ =====
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

const q3Items = ["銀行預金", "個別株", "投資信託・ETF(株)", "投資信託・ETF(債券)", "投資信託・ETF(その他)", "債券", "保険", "その他"];

const GAS_URL = "https://script.google.com/macros/s/AKfycby_A_PCC-yJDtt93jzGyRIKcZlPMWVDCHeyMgU5BjpXEAB5q-kn7S-faf1eC0SnqrjDog/exec";

function SurveyBlock({ answerPath, answerLabel, accentColor, navigate, q1, setQ1, q2BankRatio, setQ2BankRatio, q2InvestRatio, setQ2InvestRatio, q3Specialty, setQ3Specialty, email, setEmail, forceOpen }: {
  answerPath: string;
  answerLabel: string;
  accentColor: string;
  navigate: (path: string) => void;
  q1: string;
  setQ1: (v: string) => void;
  q2BankRatio: string;
  setQ2BankRatio: (v: string) => void;
  q2InvestRatio: string;
  setQ2InvestRatio: (v: string) => void;
  q3Specialty: string;
  setQ3Specialty: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  forceOpen?: boolean;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  useEffect(() => { if (forceOpen) setLocalOpen(true); }, [forceOpen]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const bankNum = parseInt(q2BankRatio || "0", 10) || 0;
  const investNum = parseInt(q2InvestRatio || "0", 10) || 0;
  const q2Total = bankNum + investNum;
  const q2Valid = q2Total === 100;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [q3Occupation, setQ3Occupation] = useState<"doctor" | "other" | "">(q3Specialty.startsWith("other:") ? "other" : q3Specialty !== "" ? "doctor" : "");
  const [q3OtherText, setQ3OtherText] = useState(q3Specialty.startsWith("other:") ? q3Specialty.slice(6) : "");
  const [q3DoctorSpecialty, setQ3DoctorSpecialty] = useState(q3Specialty.startsWith("other:") ? "" : q3Specialty);
  const q3Valid = q3Occupation === "doctor" ? q3DoctorSpecialty !== "" : q3Occupation === "other" ? q3OtherText.trim() !== "" : false;
  const isSurveyValid = q1 !== "" && q2Valid && q3Valid && emailValid;
  return (
  <div id="survey-block" data-survey-open={localOpen ? 'true' : 'false'} style={{ padding: "0 16px 24px" }}>
    {/* アンケートに回答して答えを見る（アコーディオン風トリガー） */}
    <button
      onClick={() => setLocalOpen(!localOpen)}
      style={{
        width: "100%",
        background: localOpen ? "#F9FAFB" : "#fff",
        color: "#1B2A5E",
        border: `2px solid ${accentColor}`,
        borderRadius: localOpen ? "10px 10px 0 0" : "10px",
        padding: "14px 16px",
        fontSize: "0.95rem",
        fontWeight: 900,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "border-radius 0.2s, background 0.2s",
      }}
    >
      <span>アンケートに回答して<span style={{ color: accentColor, fontWeight: 900 }}>答え</span>と<br /><span style={{ color: accentColor, fontWeight: 900 }}>無料相談クーポン</span>を入手</span>
      <span style={{
        display: "inline-block",
        transition: "transform 0.3s",
        transform: localOpen ? "rotate(180deg)" : "rotate(0deg)",
        fontSize: "1.1rem",
      }}>▼</span>
    </button>
    {localOpen && (
      <div style={{
        borderRadius: "0 0 10px 10px", border: `2px solid ${accentColor}`, borderTop: "none", padding: "20px 16px", marginBottom: "12px" }}>
        <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "16px", lineHeight: 1.6 }}>
          3つの質問に答えるだけ・完全無料
        </p>
        {/* Q1 */}
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "8px" }}>
            質問 1　金融商品を使う目的は？ <span style={{ color: "#DC2626" }}>*</span>
          </p>
          <select
            value={q1}
            onChange={(e) => setQ1(e.target.value)}
            style={{
              width: "100%", padding: "10px 12px", borderRadius: "8px",
              border: "1.5px solid #D1D5DB", fontSize: "0.88rem", color: q1 ? "#111827" : "#9CA3AF",
              background: "#fff", appearance: "auto",
            }}
          >
            <option value="">選択してください</option>
            <option value="リスクがあっても資産をどんどん増やしたい">リスクがあっても資産をどんどん増やしたい</option>
            <option value="リスクは抑えて将来困らないくらいには増やしたい">リスクは抑えて将来困らないくらいには増やしたい</option>
            <option value="バランス良くどちらも">バランス良くどちらも</option>
            <option value="その他">その他</option>
          </select>
        </div>

        {/* Q2 */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "4px" }}>
            質問 2　年間貯蓄額の銀行預金と金融商品の割合は？ <span style={{ color: "#DC2626" }}>*</span>
          </p>
          {/* 上段：ラベル横並び */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ fontSize: "0.82rem", color: "#374151", fontWeight: 700, flex: 1, textAlign: "center" }}>銀行預金</span>
            <span style={{ fontSize: "0.9rem", color: "#9CA3AF", fontWeight: 700 }}>：</span>
            <span style={{ fontSize: "0.82rem", color: "#374151", fontWeight: 700, flex: 1, textAlign: "center" }}>金融商品</span>
          </div>
          {/* 下段：入力欄横並び */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center" }}>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={q2BankRatio}
                onChange={(e) => {
                  const v = e.target.value;
                  setQ2BankRatio(v);
                  const bank = parseInt(v || "0", 10) || 0;
                  const remain = 100 - bank;
                  if (remain >= 0 && remain <= 100) setQ2InvestRatio(String(remain));
                }}
                style={{ width: "72px", padding: "8px 10px", borderRadius: "6px", border: "1.5px solid #D1D5DB", fontSize: "0.88rem", textAlign: "right" }}
              />
              <span style={{ fontSize: "0.88rem", color: "#6B7280" }}>%</span>
            </div>
            <span style={{ fontSize: "0.9rem", color: "#9CA3AF", fontWeight: 700 }}>：</span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center" }}>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={q2InvestRatio}
                onChange={(e) => {
                  const v = e.target.value;
                  setQ2InvestRatio(v);
                  const invest = parseInt(v || "0", 10) || 0;
                  const remain = 100 - invest;
                  if (remain >= 0 && remain <= 100) setQ2BankRatio(String(remain));
                }}
                style={{ width: "72px", padding: "8px 10px", borderRadius: "6px", border: "1.5px solid #D1D5DB", fontSize: "0.88rem", textAlign: "right" }}
              />
              <span style={{ fontSize: "0.88rem", color: "#6B7280" }}>%</span>
            </div>
          </div>
          {/* 合計表示 */}
          {(q2BankRatio !== "" || q2InvestRatio !== "") && (
            <div style={{
              display: "flex", justifyContent: "flex-end", alignItems: "center",
              gap: "6px", marginTop: "8px", padding: "6px 8px",
              borderRadius: "6px",
              background: q2Total === 100 ? "#DCFCE7" : q2Total > 100 ? "#FEE2E2" : "#FEF9C3",
            }}>
              <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>合計</span>
              <span style={{
                fontSize: "1rem", fontWeight: 900,
                color: q2Total === 100 ? "#16A34A" : q2Total > 100 ? "#DC2626" : "#B45309",
              }}>{q2Total}%</span>
              {q2Total === 100 && <span style={{ fontSize: "0.8rem", color: "#16A34A" }}>✓ OK</span>}
              {q2Total !== 100 && <span style={{ fontSize: "0.78rem", color: q2Total > 100 ? "#DC2626" : "#B45309" }}>（残り{100 - q2Total}%）</span>}
            </div>
          )}
        </div>

        {/* Q3 職業 */}
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "8px" }}>
            質問 3　職業は？ <span style={{ color: "#DC2626" }}>*</span>
          </p>
          {/* 医師 / それ以外 の二択ボタン */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            {(["doctor", "other"] as const).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  setQ3Occupation(val);
                  if (val === "doctor") {
                    setQ3Specialty(q3DoctorSpecialty);
                  } else {
                    setQ3Specialty("other:" + q3OtherText);
                  }
                }}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 700,
                  border: `2px solid ${q3Occupation === val ? accentColor : "#D1D5DB"}`,
                  background: q3Occupation === val ? accentColor : "#fff",
                  color: q3Occupation === val ? "#fff" : "#374151",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {val === "doctor" ? "医師" : "それ以外"}
              </button>
            ))}
          </div>
          {/* 医師 → 専門科選択 */}
          {q3Occupation === "doctor" && (
            <select
              value={q3DoctorSpecialty}
              onChange={(e) => {
                setQ3DoctorSpecialty(e.target.value);
                setQ3Specialty(e.target.value);
              }}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: "8px",
                border: "1.5px solid #D1D5DB", fontSize: "0.88rem",
                color: q3DoctorSpecialty ? "#111827" : "#9CA3AF",
                background: "#fff", appearance: "auto",
              }}
            >
              <option value="">専門科を選択してください</option>
              <option value="内科（循環器・消化器・呼吸器など）">内科（循環器・消化器・呼吸器など）</option>
              <option value="外科（消化器外科・心臓血管外科など）">外科（消化器外科・心臓血管外科など）</option>
              <option value="整形外科">整形外科</option>
              <option value="小児科">小児科</option>
              <option value="産婦人科">産婦人科</option>
              <option value="精神科（心療内科含む）">精神科（心療内科含む）</option>
              <option value="眼科">眼科</option>
              <option value="耳鼻咽喉科">耳鼻咽喉科</option>
              <option value="皮膚科">皮膚科</option>
              <option value="泌尿器科">泌尿器科</option>
              <option value="その他">その他</option>
            </select>
          )}
          {/* それ以外 → 自由記入 */}
          {q3Occupation === "other" && (
            <input
              type="text"
              placeholder="職業を入力してください"
              value={q3OtherText}
              onChange={(e) => {
                setQ3OtherText(e.target.value);
                setQ3Specialty("other:" + e.target.value);
              }}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: "8px",
                border: "1.5px solid #D1D5DB", fontSize: "0.88rem", color: "#111827",
                background: "#fff", boxSizing: "border-box",
              }}
            />
          )}
        </div>

        {/* メールアドレス */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "4px" }}>
            答え送付先 <span style={{ color: "#DC2626" }}>*</span>
          </p>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "10px 12px", borderRadius: "8px",
              border: `1.5px solid ${emailValid && email !== "" ? "#16A34A" : "#D1D5DB"}`,
              fontSize: "0.88rem", color: "#111827",
              background: "#fff", boxSizing: "border-box",
            }}
          />
          <p style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "6px", lineHeight: 1.6 }}>
            🎁 キャンペーン終了後も有効な無料相談クーポンをお送りします。
          </p>
        </div>
        {/* 答えを見るボタン */}
        <button
          onClick={async () => {
            if (!isSurveyValid || isSubmitting) return;
            setIsSubmitting(true);
            setSubmitError("");
            // fire-and-forget: GASの応答を待たず即座にページ遷移
            fetch(GAS_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                level: answerLabel,
                q1,
                q2Bank: q2BankRatio,
                q2Invest: q2InvestRatio,
                q3: q3Specialty,
                email,
              }),
            }).catch(() => {});
            navigate(answerPath + "?sent=1");
          }}
          disabled={!isSurveyValid || isSubmitting}
          style={{
            width: "100%", background: (isSurveyValid && !isSubmitting) ? accentColor : "#D1D5DB",
            color: "#fff", border: "none", borderRadius: "10px", padding: "14px 16px",
            fontSize: "0.95rem", fontWeight: 900, cursor: (isSurveyValid && !isSubmitting) ? "pointer" : "not-allowed",
            boxShadow: (isSurveyValid && !isSubmitting) ? `0 4px 14px ${accentColor}55` : "none",
            transition: "background 0.2s",
          }}
        >
          {isSubmitting ? "送信中..." : <>{answerLabel}向けの<span style={{ color: (isSurveyValid && !isSubmitting) ? "#FDE047" : "#9CA3AF", fontWeight: 900 }}>答え</span>を見る</>}
        </button>
        {submitError && (
          <p style={{ fontSize: "0.75rem", color: "#DC2626", textAlign: "center", marginTop: "6px" }}>{submitError}</p>
        )}
        {!isSurveyValid && (
          <p style={{ fontSize: "0.75rem", color: "#9CA3AF", textAlign: "center", marginTop: "6px" }}>
            {q1 === "" ? "質問1を選択してください" : !q2Valid ? `割合の合計が${q2Total}%です。合計100%になるよう入力してください` : !q3Valid ? (q3Occupation === "" ? "質問3（職業）を選択してください" : q3Occupation === "doctor" ? "専門科を選択してください" : "職業を入力してください") : !emailValid ? "メールアドレスを正しく入力してください" : ""}
          </p>
        )}
      </div>
    )}
  </div>
  );
}


export default function Home() {
  const [, navigate] = useLocation();
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [showFixedCta, setShowFixedCta] = useState(false);
  const [fixedCtaOpen, setFixedCtaOpen] = useState(false);
  const [forceOpenSurvey, setForceOpenSurvey] = useState(false);
  const [openProblems, setOpenProblems] = useState<Record<string, boolean>>({});
  const toggleProblem = (id: string) => setOpenProblems(prev => ({ ...prev, [id]: !prev[id] }));
  const [fixedCtaSubmitting, setFixedCtaSubmitting] = useState(false);
  // アンケートstate（レベル切り替え・ANSWERページ往復をまたいで引き継ぐ）
  const [surveyQ1, setSurveyQ1Raw] = useState(() => sessionStorage.getItem("survey_q1") || "");
  const [surveyQ2BankRatio, setSurveyQ2BankRatioRaw] = useState(() => sessionStorage.getItem("survey_q2bank") || "");
  const [surveyQ2InvestRatio, setSurveyQ2InvestRatioRaw] = useState(() => sessionStorage.getItem("survey_q2invest") || "");
  const [surveyQ3Specialty, setSurveyQ3SpecialtyRaw] = useState(() => sessionStorage.getItem("survey_q3specialty") || "");
  const [surveyEmail, setSurveyEmailRaw] = useState(() => sessionStorage.getItem("survey_email") || "");
  const setSurveyQ1 = (v: string) => { setSurveyQ1Raw(v); sessionStorage.setItem("survey_q1", v); };
  const setSurveyQ2BankRatio = (v: string) => { setSurveyQ2BankRatioRaw(v); sessionStorage.setItem("survey_q2bank", v); };
  const setSurveyQ2InvestRatio = (v: string) => { setSurveyQ2InvestRatioRaw(v); sessionStorage.setItem("survey_q2invest", v); };
  const setSurveyQ3Specialty = (v: string) => { setSurveyQ3SpecialtyRaw(v); sessionStorage.setItem("survey_q3specialty", v); };
  const setSurveyEmail = (v: string) => { setSurveyEmailRaw(v); sessionStorage.setItem("survey_email", v); };
  // 旧q3state（未使用・削除予定）
  const [_surveyQ3OtherText] = useState("");
  const [_surveyQ3Checks] = useState<Record<string, boolean>>({
    "銀行預金": false, "個別株": false, "投資信託・ETF(株)": false,
    "投資信託・ETF(債券)": false, "投資信託・ETF(その他)": false,
    "債券": false, "保険": false, "その他": false,
  });
  const [_surveyQ3Ratios] = useState<Record<string, string>>({});
    const [showPrivacy, setShowPrivacy] = useState(false);
  // トースト（資料請求後 sent=1）
  const [showToast, setShowToast] = useState(false);
  const [toastMounted, setToastMounted] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") !== "1") return;
    window.history.replaceState(null, "", window.location.pathname);
    const t = setTimeout(() => {
      setToastMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setShowToast(true)));
    }, 500);
    return () => clearTimeout(t);
  }, []);
  const closeToast = () => {
    setShowToast(false);
    setTimeout(() => setToastMounted(false), 500);
  };
  // (q1/q2/q3のstateはSurveyBlock内部に移動済み)
  // 全レベルの画像をプリロード（ボタン押下時に即表示するため）
  useEffect(() => {
    const preloadUrls = [
      "/assets/beginner_catchcopy_b7d0273c_a17de93b.jpeg",
      "/assets/catchcopy_elementary_dfabc8a7_5f71639e.jpeg",
      "/assets/catchcopy_doctor_643479f5_766a4e3e.jpeg",
      "/assets/catchcopy_advanced_56d77ae8_4d24fb27.jpeg",
    ];
    preloadUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedCta(window.scrollY > 200);
    };
    // レベル未選択時はパネルを閉じる
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLevel = levels.find((l) => l.id === activeLevel) || levels[0];

  const handleApply = (id: string) => {
    if (id === "fp-individual") navigate("/booking");
    else if (id === "fp-seminar") navigate("/fp-seminar-booking");
    else if (id === "tax-individual") navigate("/seminar-booking");
    else navigate(`/apply?type=${id}`);
  };

    // アンケートフォームブロック（各レベル共通）
  return (
    <div className="min-h-screen" style={{ background: "#F5F7FA", fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* ===== 資料請求完了トースト ===== */}
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
                📧
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 900, fontSize: "0.9rem", color: "#F5C400" }}>
                  資料と無料相談クーポンをメールでお送りしました
                </p>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#CBD5E1", lineHeight: 1.5 }}>
                  届かない場合は迷惑メールフォルダもご確認ください
                </p>
              </div>
              <button
                onClick={closeToast}
                style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#94A3B8", marginTop: "1px", fontSize: "16px" }}
                aria-label="閉じる"
              >
                ×
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
      {/* ===== LP戻るボタン ===== */}
      <div style={{ background: "#1B2A5E", padding: "8px 16px", display: "flex", alignItems: "center" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "6px",
            color: "rgba(255,255,255,0.85)",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "4px 12px",
            cursor: "pointer",
            letterSpacing: "0.03em",
            transition: "background 0.15s ease, border-color 0.15s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
          }}
        >
          &#8592; トップに戻る
        </button>
      </div>
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
        background: "#fff",
        borderBottom: "1px solid #E2E8F0",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: "6px",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}>
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
          <span style={{
            fontSize: "0.75rem", fontWeight: 900, padding: "3px 8px",
            border: "2px solid #1B2A5E", borderRadius: "4px", color: "#fff", background: "#1B2A5E",
            whiteSpace: "nowrap"
          }}>
            勤務医限定
          </span>
          <span style={{
            fontSize: "0.75rem", fontWeight: 900, padding: "3px 8px",
            border: "2px solid #1B2A5E", borderRadius: "4px", color: "#1B2A5E", background: "#fff",
            whiteSpace: "nowrap"
          }}>
            無料FP相談
          </span>
        </div>
        <span style={{
          fontSize: "0.72rem", fontWeight: 900, padding: "4px 8px",
          background: "#DC2626", color: "#fff",
          borderRadius: "4px", letterSpacing: "0.02em", whiteSpace: "nowrap"
        }}>
          6月限定先着15名
        </span>
      </div>

      {/* ===== HERO SECTION (レベル選択型) ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />
      <section style={{ background: "#fff", padding: "0" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>

          {/* バナー画像 */}
          <div style={{ padding: "8px 16px 4px" }}>
            <img
              src="/assets/banner_doctor_new_8a20a12b_cdbae806.jpeg"
              alt="お金の答えは1級FPと税理士に聞くのが早い！"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* メインメッセージ */}
          <div style={{ padding: "12px 16px 8px", textAlign: "center" }}>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#374151", lineHeight: 1.6, margin: "0 0 4px" }}>
              勤務医の先生に
            </p>
            <p style={{ fontSize: "1.55rem", fontWeight: 900, color: "#1B2A5E", lineHeight: 1.45, margin: 0 }}>
              <span style={{ color: "#38BDF8", fontSize: "1.75rem" }}>1級FP</span>
              <span style={{ color: "#1B2A5E", fontSize: "1.55rem" }}>×</span>
              <span style={{ color: "#F5C400", fontSize: "1.75rem" }}>税理士</span>の<br />
              <span style={{ fontSize: "1.35rem", fontWeight: 700 }}><span style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 6vw, 2rem)" }}>確か</span>な<span style={{ color: "#EF4444", fontSize: "clamp(1.2rem, 5vw, 1.5rem)" }}>答え</span>を</span>
            </p>
          </div>

          {/* レベル選択 */}
          <div style={{ padding: "14px 16px 0px" }}>
            {/* 吹き出し＋矢印 */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#374151", margin: "0 0 10px", letterSpacing: "0em", whiteSpace: "nowrap" }}>
                あなたの現状によって<span style={{ color: "#DC2626", fontWeight: 900 }}>答え</span>の範囲が変わります
              </p>
              <div style={{
                display: "inline-block",
                background: "#1B2A5E",
                color: "#fff",
                fontWeight: 900,
                fontSize: "0.88rem",
                padding: "7px 22px",
                borderRadius: "999px",
                boxShadow: "0 2px 10px rgba(27,42,94,0.25)",
                letterSpacing: "0.04em",
              }}>
                あなたの現状を選んでください
              </div>
              {/* 下向きバウンス矢印 */}
              <div style={{ marginTop: "5px" }}>
                <style>{`
                  @keyframes bounce-arrow {
                    0%, 100% { transform: translateY(0); opacity: 1; }
                    50% { transform: translateY(5px); opacity: 0.5; }
                  }
                  .bounce-arrow { animation: bounce-arrow 1.2s ease-in-out infinite; }
                `}</style>
                <span className="bounce-arrow" onClick={() => setActiveLevel(null)} style={{ display: "inline-block", fontSize: "1rem", color: "#1B2A5E", cursor: "pointer" }}>▼</span>
              </div>
            </div>

            {/* ボタン列 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", alignItems: "stretch" }}>
              {[
                { id: "beginner",     label: "初心者",   sub: "現預金のみ",      color: "#059669", bgColor: "#A7F3D0" },
                { id: "elementary",  label: "初級者",   sub: "オルカンなど少額", color: "#2563EB", bgColor: "#BFDBFE" },
                { id: "intermediate",label: "中級者",   sub: "インデックス中心", color: "#DC2626", bgColor: "#FECACA" },
                { id: "advanced",    label: "上級者",   sub: "個別株や債券も",   color: "#7C3AED", bgColor: "#DDD6FE" },
              ].map((lv) => (
                <div key={lv.id} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                  <button
                    onClick={() => setActiveLevel(lv.id)}
                    style={{
                      width: "100%",
                      height: "72px",
                      borderTop: activeLevel === lv.id ? `2px solid ${lv.color}` : "2px solid #D1D5DB",
                      borderLeft: activeLevel === lv.id ? `2px solid ${lv.color}` : "2px solid #D1D5DB",
                      borderRight: activeLevel === lv.id ? `2px solid ${lv.color}` : "2px solid #D1D5DB",
                      borderBottom: activeLevel === lv.id ? `2px solid ${lv.color}` : "2px solid #D1D5DB",
                      borderRadius: "10px",
                      padding: "10px 4px 10px",
                      display: "flex",
                      flexDirection: "column" as const,
                      alignItems: "center",
                      justifyContent: "center",
                      background: activeLevel === lv.id ? lv.color : "#fff",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s",
                      boxShadow: activeLevel === lv.id ? `0 -3px 10px ${lv.color}44` : "none",
                      overflow: "hidden",
                    }}
                  >
                    <p style={{ fontSize: "0.82rem", fontWeight: 900, margin: "0 0 3px", color: activeLevel === lv.id ? "#fff" : "#1B2A5E" }}>{lv.label}</p>
                    <p style={{ fontSize: "0.62rem", margin: 0, lineHeight: 1.4, color: activeLevel === lv.id ? "rgba(255,255,255,0.85)" : "#6B7280" }}>{lv.sub}</p>
                  </button>
                  {/* 三角ポインター — 常に領域を確保、非選択時は透明 */}
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: "14px solid transparent",
                    borderRight: "14px solid transparent",
                    borderBottom: activeLevel === null ? "16px solid #E5E7EB" : activeLevel === lv.id ? `16px solid ${lv.bgColor}` : "16px solid transparent",
                    flexShrink: 0,
                    transition: "border-top-color 0.2s",
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== レベル別コンテンツ ===== */}
      {/* 未選択時の誘導メッセージ */}
      {activeLevel === null && (
        <section className="animate-fade-in-up" style={{ background: "linear-gradient(to bottom, #E5E7EB 0%, #F9FAFB 60px, #F9FAFB 100%)", padding: "32px 16px 40px" }}>
          <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "8px" }}>あなたの現状に近いものを</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "20px" }}>上のボタンから選択してください</p>
            <p style={{ fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.7 }}>あなたの状況に合わせた<br />1級FPからのアドバイスが表示されます。</p>
          </div>
        </section>
      )}
      {/* 初心者: 現預金のみ */}
      {activeLevel === "beginner" && (
        <>
          <section key={activeLevel} className="animate-fade-in-up" style={{ background: "linear-gradient(to bottom, #A7F3D0 0%, #ECFDF5 80px, #ECFDF5 100%)", padding: "20px 0 0" }}>
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <div style={{ padding: "0 16px 4px" }}>
                <p style={{ color: "#059669", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>FOR BEGINNERS</p>
              </div>
              <div style={{ padding: "0 16px 4px" }}>
                <img
                  src="/assets/beginner_catchcopy_b7d0273c_a17de93b.jpeg"
                  alt="何から始めれば良い？忙しいので効率的に答えを知りたい"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </section>
          {/* 初心者 問題サマリーカード（アコーディオン） */}
          <section style={{ background: "linear-gradient(to bottom, #ECFDF5 0%, #F5F7FA 100%)", padding: "20px 0 0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", padding: "10px 0 16px" }}>

              {/* 問題1 */}
              <div style={{ border: "1.5px solid #059669", overflow: "hidden", marginBottom: "10px" }}>
                <div
                  onClick={() => toggleProblem('beg-1')}
                  style={{ background: openProblems['beg-1'] ? "#F0FDF4" : "#fff", borderLeft: "4px solid #059669", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#059669", margin: 0 }}>問題1．忙しくて何が正解か分からない</p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                    <span style={{ fontSize: "0.75rem", color: "#059669", transition: "transform 0.2s", display: "inline-block", transform: openProblems['beg-1'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </div>
                </div>
                {openProblems['beg-1'] && (
                  <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                    <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                      勤務医の先生は日々の診療・当直・研究で時間がありません。その上、NISA・iDeCo・保険・不動産・節税…と情報が溢れすぎていて、「何から手をつければいいか分からない」という状態になりがちです。
                    </p>
                    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "12px" }}>こんな状態になっていませんか？</p>
                      {[
                        "SNSやYouTubeで情報収集するが、何が自分に合うか分からない",
                        "周りの医師の真似をしようと思うがなんとなく不安で始められていない",
                        "忙しくて勉強する時間がなく、ずっと後回しにしている",
                      ].map((text, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                          <span style={{ fontSize: "1rem", lineHeight: 1.4, flexShrink: 0 }}>⚠️</span>
                          <p style={{ fontSize: "0.85rem", color: "#374151", margin: 0, lineHeight: 1.6 }}>{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 問題2 */}
              <div style={{ border: "1.5px solid #DC2626", overflow: "hidden", marginBottom: "10px" }}>
                <div
                  onClick={() => toggleProblem('beg-2')}
                  style={{ background: openProblems['beg-2'] ? "#FFF5F5" : "#fff", borderLeft: "4px solid #DC2626", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#DC2626", margin: 0 }}>問題2．インフレで貯金の価値が減っている</p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#DC2626", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                    <span style={{ fontSize: "0.75rem", color: "#DC2626", transition: "transform 0.2s", display: "inline-block", transform: openProblems['beg-2'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </div>
                </div>
                {openProblems['beg-2'] && (
                  <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                    <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                      「貯金している」つもりでも、物価が上がれば同じお金で買えるものが減ります。金額は変わらなくても、実質的な価値は年々目減りしています。
                    </p>
                    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "12px", textAlign: "center" }}>2020年→2025年 わずか5年でこんなに上がった</p>
                      {[
                        { label: "首都圈中古マンション成約価格", before: "3,110万円", after: "5,200万円", note: "+67%", emoji: "🏠", source: "出典：東日本不動産流通機構（REINS）" },
                        { label: "マクドナルド ビッグマック（単品）", before: "390円", after: "480円", note: "+23%", emoji: "🍔", source: "出典：The Economist Big Mac Index" },
                        { label: "電気代（全国平均・月額）", before: "12,832円", after: "13,817円", note: "+8%", emoji: "💡", source: "出典：総務省統計局 小売物価統計調査" },
                      ].map((item, i) => (
                        <div key={i} style={{ marginBottom: i < 2 ? "10px" : 0, paddingBottom: i < 2 ? "10px" : 0, borderBottom: i < 2 ? "1px solid #F3F4F6" : "none" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{item.emoji}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151", margin: "0 0 3px" }}>{item.label}</p>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "nowrap" }}>
                                <span style={{ fontSize: "0.78rem", color: "#6B7280", whiteSpace: "nowrap" }}>{item.before}</span>
                                <span style={{ fontSize: "0.85rem", color: "#DC2626", fontWeight: 900, flexShrink: 0 }}>→</span>
                                <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#DC2626", whiteSpace: "nowrap" }}>{item.after}</span>
                              </div>
                            </div>
                            <span style={{ fontSize: "0.68rem", color: "#DC2626", fontWeight: 700, background: "#FFF5F5", border: "1px solid #FECACA", borderRadius: "4px", padding: "2px 5px", flexShrink: 0, whiteSpace: "nowrap" }}>{item.note}</span>
                          </div>
                          <p style={{ fontSize: "0.65rem", color: "#9CA3AF", margin: "3px 0 0 30px" }}>{item.source}</p>
                        </div>
                      ))}
                      <div style={{ borderTop: "1px solid #E5E7EB", marginTop: "12px", paddingTop: "12px" }}>
                        <p style={{ fontSize: "0.78rem", color: "#DC2626", fontWeight: 900, textAlign: "center", margin: "0 0 4px" }}>
                          消費者物価指数（CPI）は5年で+11.9%上昇（年平均+2.3%）
                        </p>
                        <p style={{ fontSize: "0.78rem", color: "#374151", textAlign: "center", margin: 0 }}>
                          貯金残高が変わらなくても、実質的な購買力は約10.6%下がったことになる。
                        </p>
                        <p style={{ fontSize: "0.65rem", color: "#9CA3AF", textAlign: "center", margin: "4px 0 0" }}>
                          出典：総務省統計局「消費者物価指数」2020年＝100基準（2020年：100.0 → 2025年：111.9）
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 問題3 */}
              <div style={{ border: "1.5px solid #D97706", overflow: "hidden" }}>
                <div
                  onClick={() => toggleProblem('beg-3')}
                  style={{ background: openProblems['beg-3'] ? "#FFFBEB" : "#fff", borderLeft: "4px solid #F59E0B", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#B45309", margin: 0 }}>問題3．将来、お金が足りなくなるリスク</p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#B45309", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                    <span style={{ fontSize: "0.75rem", color: "#B45309", transition: "transform 0.2s", display: "inline-block", transform: openProblems['beg-3'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </div>
                </div>
                {openProblems['beg-3'] && (
                  <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                    <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                      インフレが続くと、老後に必要な生活費は今の感覚より大幅に増えます。高収入の勤務医であっても、現預金だけで備えるのは困難です。
                    </p>
                    {/* インフレによる物価倍率グラフ（中級から流用） */}
                    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "24px", textAlign: "center", lineHeight: 1.5 }}>
                        2％インフレが進んだ場合の物価の変化
                      </p>
                      <svg viewBox="0 0 340 160" style={{ width: "100%", overflow: "visible", marginBottom: "8px" }}>
                        {[1,2,3,3.62].map((v, i) => {
                          const y = 120 - ((v - 1) / 2.62) * 110;
                          return <line key={i} x1="40" x2="330" y1={y} y2={y} stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray={v === 1 ? "0" : "4,4"} />;
                        })}
                        {["1倍","2倍","3倍"].map((label, i) => {
                          const vals = [1, 2, 3];
                          const y = 120 - ((vals[i] - 1) / 2.62) * 110;
                          return <text key={i} x="34" y={y + 4} fontSize="10" fill="#9CA3AF" textAnchor="end">{label}</text>;
                        })}
                        {(() => {
                          const pts = [
                            { age: 35, value: 1.00 },
                            { age: 65, value: 1.81 },
                            { age: 75, value: 2.21 },
                            { age: 85, value: 2.69 },
                            { age: 95, value: 3.28 },
                          ];
                          const toX = (age: number) => 42 + ((age - 35) / 60) * 284;
                          const toY = (val: number) => 120 - ((val - 1) / 2.28) * 110;
                          const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.age)},${toY(p.value)}`).join(' ');
                          const areaD = pathD + ` L${toX(95)},120 L${toX(35)},120 Z`;
                          return (
                            <>
                              <defs>
                                <linearGradient id="inflGradBeginner" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#DC2626" stopOpacity="0.3" />
                                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0.03" />
                                </linearGradient>
                              </defs>
                              <path d={areaD} fill="url(#inflGradBeginner)" />
                              <path d={pathD} fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinejoin="round" />
                              {pts.map((p, i) => (
                                <g key={i}>
                                  <circle cx={toX(p.age)} cy={toY(p.value)} r="4"
                                    fill={i === 0 ? "#1B2A5E" : "#F87171"}
                                    stroke="#fff" strokeWidth="1.5" />
                                  {i !== 0 && (
                                    <text x={toX(p.age)} y={toY(p.value) - 9} fontSize="12"
                                      fill="#1B2A5E" fontWeight="bold" textAnchor="middle">
                                      {p.value.toFixed(2)}倍
                                    </text>
                                  )}
                                  <text x={toX(p.age)} y={138} fontSize="9.5" fill="#6B7280" textAnchor="middle">{p.age}歳</text>
                                </g>
                              ))}
                              <line x1="40" x2="330" y1="120" y2="120" stroke="#D1D5DB" strokeWidth="1" />
                            </>
                          );
                        })()}
                      </svg>
                      <p style={{ fontSize: "0.75rem", color: "#DC2626", fontWeight: 900, textAlign: "center", margin: 0 }}>
                        65歳時には物価が現在の約1.8倍、85歳では約2.7倍に！
                      </p>
                    </div>
                    {/* 老後資金必要額比較 */}
                    <div style={{ background: "transparent", border: "2px solid #DC2626", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "10px" }}>
                        老後に月３０万円ずつ取り崩す場合の必要金額
                      </p>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1, background: "#EFF6FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                          <p style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700, margin: "0 0 4px" }}>インフレなし</p>
                          <p style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 2px" }}>1億800万円</p>
                          <p style={{ fontSize: "0.65rem", color: "#6B7280", margin: "0 0 3px" }}>65歳から30年分</p>
                          <p style={{ fontSize: "0.6rem", color: "#9CA3AF", margin: 0, lineHeight: 1.4 }}>30万円×12ヶ月×30年</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "1.2rem", color: "#DC2626", fontWeight: 900 }}>→</div>
                        <div style={{ flex: 1, background: "#FFF5F5", borderRadius: "8px", padding: "10px", textAlign: "center", border: "2px solid #DC2626" }}>
                          <p style={{ fontSize: "0.7rem", color: "#DC2626", fontWeight: 700, margin: "0 0 4px" }}>2％インフレ時</p>
                          <p style={{ fontSize: "0.9rem", fontWeight: 900, color: "#DC2626", margin: "0 0 2px" }}>約2億6,500万円</p>
                          <p style={{ fontSize: "0.65rem", color: "#6B7280", margin: 0 }}>必要額が約2.45倍に</p>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.7, marginBottom: "8px" }}>
                      高収入の医師と言えど、この金額を現預金だけで準備するのは容易ではありません。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div style={{ background: "#fff", padding: "20px 16px 16px", textAlign: "center", borderTop: "2px solid #D1FAE5" }}>
            <p style={{ fontSize: "0.92rem", color: "#374151", margin: "0 0 4px" }}>この問題を解決する</p>
            <p style={{ fontSize: "1.05rem", fontWeight: 900, color: "#1B2A5E", margin: 0 }}>勤務医のお金の<span style={{ color: "#059669" }}>答え</span>は・・・</p>
          </div>
          <SurveyBlock navigate={navigate} answerPath="/answer-beginner" answerLabel="初心者" accentColor="#059669"
              q1={surveyQ1}
              setQ1={setSurveyQ1}
              q2BankRatio={surveyQ2BankRatio}
              setQ2BankRatio={setSurveyQ2BankRatio}
              q2InvestRatio={surveyQ2InvestRatio}
              setQ2InvestRatio={setSurveyQ2InvestRatio}
              q3Specialty={surveyQ3Specialty}
              setQ3Specialty={setSurveyQ3Specialty}
              email={surveyEmail}
              setEmail={setSurveyEmail}
              forceOpen={forceOpenSurvey}
            />
        </>
      )}

      {/* 初級者: オルカンなど少額 */}
      {activeLevel === "elementary" && (
        <>
          <section key={activeLevel} className="animate-fade-in-up" style={{ background: "linear-gradient(to bottom, #BFDBFE 0%, #EBF4FF 80px, #EBF4FF 100%)", padding: "20px 0 0" }}>
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <div style={{ padding: "0 16px 4px" }}>
                <p style={{ color: "#2563EB", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>FOR ELEMENTARY</p>
              </div>
              <div style={{ padding: "0 16px 4px" }}>
                <img
                  src="/assets/catchcopy_elementary_dfabc8a7_5f71639e.jpeg"
                  alt="少額投資だけで満足している勤務医の先生へ"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </section>
          {/* 初級者 問題アコーディオンセクション */}
          <section style={{ background: "#EBF4FF", padding: "0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", padding: "10px 0 16px" }}>

              {/* 問題1 */}
              <div style={{ border: "1.5px solid #2563EB", overflow: "hidden", marginBottom: "10px" }}>
                <div
                  onClick={() => toggleProblem('elem-1')}
                  style={{ background: openProblems['elem-1'] ? "#EFF6FF" : "#fff", borderLeft: "4px solid #2563EB", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#2563EB", margin: 0 }}>問題1．老後の必要額を把握できている？</p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                    <span style={{ fontSize: "0.75rem", color: "#2563EB", transition: "transform 0.2s", display: "inline-block", transform: openProblems['elem-1'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </div>
                </div>
                {openProblems['elem-1'] && (
                  <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                    <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                      「老後2,000万円問題」という言葉を聞いたことがある方も多いと思いますが、あれは<strong>平均的な会社員世帯</strong>の試算です。生活水準の高い勤務医の場合、老後に必要な金額はその数倍になることも珍しくありません。
                    </p>
                    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "24px", textAlign: "center", lineHeight: 1.5 }}>
                        2％インフレが進んだ場合の物価の変化
                      </p>
                      <svg viewBox="0 0 340 160" style={{ width: "100%", overflow: "visible", marginBottom: "8px" }}>
                        {[1,2,3,3.62].map((v, i) => {
                          const y = 120 - ((v - 1) / 2.62) * 110;
                          return <line key={i} x1="40" x2="330" y1={y} y2={y} stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray={v === 1 ? "0" : "4,4"} />;
                        })}
                        {["1倍","2倍","3倍"].map((label, i) => {
                          const vals = [1, 2, 3];
                          const y = 120 - ((vals[i] - 1) / 2.62) * 110;
                          return <text key={i} x="34" y={y + 4} fontSize="10" fill="#9CA3AF" textAnchor="end">{label}</text>;
                        })}
                        {(() => {
                          const pts = [
                            { age: 35, value: 1.00 },
                            { age: 65, value: 1.81 },
                            { age: 75, value: 2.21 },
                            { age: 85, value: 2.69 },
                            { age: 95, value: 3.28 },
                          ];
                          const toX = (age: number) => 42 + ((age - 35) / 60) * 284;
                          const toY = (val: number) => 120 - ((val - 1) / 2.28) * 110;
                          const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.age)},${toY(p.value)}`).join(' ');
                          const areaD = pathD + ` L${toX(95)},120 L${toX(35)},120 Z`;
                          return (
                            <>
                              <defs>
                                <linearGradient id="inflGradElem" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.03" />
                                </linearGradient>
                              </defs>
                              <path d={areaD} fill="url(#inflGradElem)" />
                              <path d={pathD} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
                              {pts.map((p, i) => (
                                <g key={i}>
                                  <circle cx={toX(p.age)} cy={toY(p.value)} r="4"
                                    fill={i === 0 ? "#1B2A5E" : "#60A5FA"}
                                    stroke="#fff" strokeWidth="1.5" />
                                  {i !== 0 && (
                                    <text x={toX(p.age)} y={toY(p.value) - 9} fontSize="12"
                                      fill="#1B2A5E" fontWeight="bold" textAnchor="middle">
                                      {p.value.toFixed(2)}倍
                                    </text>
                                  )}
                                  <text x={toX(p.age)} y={138} fontSize="9.5" fill="#6B7280" textAnchor="middle">{p.age}歳</text>
                                </g>
                              ))}
                              <line x1="40" x2="330" y1="120" y2="120" stroke="#D1D5DB" strokeWidth="1" />
                            </>
                          );
                        })()}
                      </svg>
                      <p style={{ fontSize: "0.75rem", color: "#2563EB", fontWeight: 900, textAlign: "center", margin: 0 }}>
                        65歳時には物価が現在の約1.8倍、85歳では約2.7倍に！
                      </p>
                    </div>
                    <div style={{ background: "transparent", border: "2px solid #2563EB", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "10px" }}>
                        年金で足りない分を月３０万円補填する場合の必要金額
                      </p>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1, background: "#EFF6FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                          <p style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700, margin: "0 0 4px" }}>インフレなし</p>
                          <p style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 2px" }}>1億800万円</p>
                          <p style={{ fontSize: "0.65rem", color: "#6B7280", margin: "0 0 3px" }}>65歳から30年分</p>
                          <p style={{ fontSize: "0.6rem", color: "#9CA3AF", margin: 0, lineHeight: 1.4 }}>30万円×12ヶ月×30年</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "1.2rem", color: "#DC2626", fontWeight: 900 }}>→</div>
                        <div style={{ flex: 1, background: "#FFF5F5", borderRadius: "8px", padding: "10px", textAlign: "center", border: "2px solid #DC2626" }}>
                          <p style={{ fontSize: "0.7rem", color: "#DC2626", fontWeight: 700, margin: "0 0 4px" }}>2％インフレ時</p>
                          <p style={{ fontSize: "0.9rem", fontWeight: 900, color: "#DC2626", margin: "0 0 2px" }}>約2億6,500万円</p>
                          <p style={{ fontSize: "0.65rem", color: "#6B7280", margin: 0 }}>必要額が約2.45倍に</p>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.7, marginBottom: "8px" }}>
                      これ以外に病気、自宅の修繕など突発的な出費が発生する可能性も・・・
                    </p>
                  </div>
                )}
              </div>

              {/* 問題2 */}
              <div style={{ border: "1.5px solid #DC2626", overflow: "hidden", marginBottom: "10px" }}>
                <div
                  onClick={() => toggleProblem('elem-2')}
                  style={{ background: openProblems['elem-2'] ? "#FFF5F5" : "#fff", borderLeft: "4px solid #DC2626", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#DC2626", margin: 0 }}>問題2．月数万では足りない現実</p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#DC2626", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                    <span style={{ fontSize: "0.75rem", color: "#DC2626", transition: "transform 0.2s", display: "inline-block", transform: openProblems['elem-2'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </div>
                </div>
                {openProblems['elem-2'] && (
                  <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                    <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "14px" }}>
                      上記の必要額に、今の穏立額で届くでしょうか？
                      月５万円を年率４%で３０年穏み立てても、到達できるのは<strong style={{ color: "#DC2626" }}>約3,482万円</strong>。必要額の6分の1にも届きません。
                    </p>
              {/* 縦棒グラフ：SVGで正確に差額ブラケットを描画 */}
                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "10px 12px", marginBottom: "16px" }}>
                  <p style={{ fontSize: "0.72rem", color: "#64748B", textAlign: "center" as const, marginBottom: "6px" }}>老後資金30年分の試算（月30万円補填・2%インフレ想定）</p>
                  {(() => {
                    // 数値定義
                    // レイアウト: 左=現状棒, 中=ブラケット縦線, 右=必要額棒
                    // 差額カードは現状棒の上にオーバーラップ
                    const svgW = 380;
                    const barW = 90;
                    const maxVal = 26500;
                    const curVal = 3482;
                    const barMaxH = 150;
                    const baseY = 160;
                    const labelH = 72; // 棒の下のラベル高さ
                    const svgH = baseY + labelH;
                    const curBarH = Math.max(Math.round((curVal / maxVal) * barMaxH), 28); // 最小28pxで視認性確保
                    const reqBarH = barMaxH;
                    // 棒の位置: 左に現状、右に必要額、間にブラケット
                    const curBarX = 16;
                    const reqBarX = 220;
                    // ブラケット縦線: 2本の棒の間の中央
                    const bracketX = curBarX + barW + (reqBarX - curBarX - barW) / 2; // 棒の間の中央
                    const curTopY = baseY - curBarH;
                    const reqTopY = baseY - reqBarH;
                    const midY = (curTopY + reqTopY) / 2;
                    // 差額カードは縦線の左側に配置（縦線と重ならないよう左にオフセット）
                    const cardW = 100;
                    const cardH = 50;
                    const cardX = bracketX - cardW - 6; // 縦線の左側に配置
                    const cardY = midY - cardH / 2; // 縦線の中央の高さに合わせる
                    return (
                      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: "block", overflow: "visible" }}>
                        <defs>
                          <linearGradient id="blueGrad2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#BFDBFE" />
                            <stop offset="100%" stopColor="#1D4ED8" />
                          </linearGradient>
                          <linearGradient id="redGrad2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FCA5A5" />
                            <stop offset="100%" stopColor="#991B1B" />
                          </linearGradient>
                        </defs>
                        {/* ベースライン */}
                        <line x1="10" y1={baseY} x2={svgW - 10} y2={baseY} stroke="#E5E7EB" strokeWidth="2" />
                        {/* 現状棒 */}
                        <rect x={curBarX} y={curTopY} width={barW} height={curBarH} rx="4" fill="url(#blueGrad2)" />
                        {/* 必要額棒 */}
                        <rect x={reqBarX} y={reqTopY} width={barW} height={reqBarH} rx="4" fill="url(#redGrad2)" />
                        {/* 差額カード：ブラケット縦線の中央に配置（縦線より先に描画して縦線が上に表示される） */}
                        <rect x={cardX} y={cardY} width={cardW} height={cardH} rx="6" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.5" />
                        <text x={cardX + cardW / 2} y={cardY + 16} textAnchor="middle" fontSize="12" fill="#DC2626" fontWeight="700">不足額</text>
                        <text x={cardX + cardW / 2} y={cardY + 38} textAnchor="middle" fontSize="18" fill="#DC2626" fontWeight="900">2.3億円</text>
                        {/* 差額ブラケット（2本の棒の間）：必要額上端→現状上端（カードの上に描画） */}
                        {/* 上端ティック（必要額の高さ） */}
                        <line x1={bracketX - 8} y1={reqTopY} x2={bracketX + 8} y2={reqTopY} stroke="#DC2626" strokeWidth="2.5" />
                        {/* 縦線（カードの上に描画される） */}
                        <line x1={bracketX} y1={reqTopY} x2={bracketX} y2={curTopY} stroke="#DC2626" strokeWidth="2.5" />
                        {/* 下端ティック（現状の高さ） */}
                        <line x1={bracketX - 8} y1={curTopY} x2={bracketX + 8} y2={curTopY} stroke="#DC2626" strokeWidth="2.5" />
                        {/* 現状ラベル */}
                        <text x={curBarX + barW / 2} y={baseY + 18} textAnchor="middle" fontSize="15" fill="#2563EB" fontWeight="700">現状</text>
                        <text x={curBarX + barW / 2} y={baseY + 33} textAnchor="middle" fontSize="12" fill="#6B7280">月5万円積立</text>
                        <text x={curBarX + barW / 2} y={baseY + 47} textAnchor="middle" fontSize="12" fill="#6B7280">年率4%・30年</text>
                        <text x={curBarX + barW / 2} y={baseY + 64} textAnchor="middle" fontSize="15" fill="#2563EB" fontWeight="900">3,482万円</text>
                        {/* 必要額ラベル */}
                        <text x={reqBarX + barW / 2} y={baseY + 18} textAnchor="middle" fontSize="15" fill="#DC2626" fontWeight="700">必要額</text>
                        <text x={reqBarX + barW / 2} y={baseY + 33} textAnchor="middle" fontSize="12" fill="#6B7280">2%インフレ想定</text>
                        <text x={reqBarX + barW / 2} y={baseY + 47} textAnchor="middle" fontSize="12" fill="#6B7280">老後30年分</text>
                        <text x={reqBarX + barW / 2} y={baseY + 64} textAnchor="middle" fontSize="15" fill="#DC2626" fontWeight="900">2億6,500万円</text>
                      </svg>
                    );
                  })()}
                </div>
              {/* 銀行に眠る資産を投資に回すという切り口のコンテンツ */}
              <div style={{ background: "#FFF7ED", border: "2px solid #F59E0B", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#92400E", marginBottom: "8px" }}>問題は<strong style={{ color: "#DC2626" }}>積立額ではなく、銀行に眠らせている額</strong></p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                  {[
                    { label: "銀行預金（普通・定期）", sub: "金利0.1%・インフレに負け続ける", icon: "🏦", color: "#FEE2E2", borderColor: "#FCA5A5", textColor: "#991B1B", badge: "勿体ない" },
                    { label: "投資に回した場合", sub: "年率4%・30年で約3.2倍に成長", icon: "📈", color: "#DCFCE7", borderColor: "#86EFAC", textColor: "#166534", badge: "活かせる" },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "10px", background: row.color, border: `1.5px solid ${row.borderColor}`, borderRadius: "8px", padding: "10px 12px" }}>
                      <span style={{ fontSize: "1.4rem" }}>{row.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 900, color: row.textColor }}>{row.label}</span>
                          <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#fff", background: row.textColor, borderRadius: "4px", padding: "1px 6px" }}>{row.badge}</span>
                        </div>
                        <span style={{ fontSize: "0.68rem", color: "#4B5563" }}>{row.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.72rem", color: "#92400E", marginTop: "10px", marginBottom: 0, lineHeight: 1.6 }}>
                  銀行に積み上がっていく資産を「働かせる」だけで、老後資金の不足を大きく縮小できます。
                </p>
              </div>
                  </div>
                )}
              </div>

              {/* 問題3 */}
              <div style={{ border: "1.5px solid #7C3AED", overflow: "hidden" }}>
                <div
                  onClick={() => toggleProblem('elem-3')}
                  style={{ background: openProblems['elem-3'] ? "#F5F3FF" : "#fff", borderLeft: "4px solid #7C3AED", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#7C3AED", margin: 0 }}>問題3．分からないから怖い</p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#7C3AED", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                    <span style={{ fontSize: "0.75rem", color: "#7C3AED", transition: "transform 0.2s", display: "inline-block", transform: openProblems['elem-3'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </div>
                </div>
                {openProblems['elem-3'] && (
                  <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                    <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                      「周りがオルカンやS&P500をやっているから」という理由だけで始める方が多いです。仕組みを十分に理解しないまま始めると、不安から穏立額が不足してしまいます。
                    </p>
                    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "12px" }}>
                        「怖い」と感じる主な理由
                      </p>
                      {[
                        { icon: "📉", title: "なぜ暴落するのか分からない", body: "経済の悪化で株価が下がることは知っていても、「なぜ下がるのか」「どのくらい下がるのか」を説明できる人は少ないです。仕組みが分からないため、暴落が怖くて踏み出せないのです。" },
                        { icon: "📊", title: "暴落後にどうなるか分からない", body: "「暴落したらそのまま戻らないのでは」と思っていませんか？過去の暴落の後、市場がどう推移したかを知らないままだと、少額にしか投資できないのも当然です。" },
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
                    <div style={{ background: "#EFF6FF", border: "2px solid #2563EB", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "0.88rem", color: "#1B2A5E", lineHeight: 1.85, margin: 0 }}>
                        <span style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                          <span style={{ fontSize: "1.1rem", lineHeight: 1.4, flexShrink: 0 }}>💡</span>
                          <span>「怖い」という感情は正常です。ただ、その怖さを放置したまま少額の穏立投資を続けることが、<strong style={{ color: "#DC2626" }}>最大のリスク</strong>になっている可能性があります。</span>
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div style={{ background: "#fff", padding: "20px 16px 16px", textAlign: "center", borderTop: "2px solid #BFDBFE" }}>
            <p style={{ fontSize: "0.92rem", color: "#374151", margin: "0 0 4px" }}>この問題を解決する</p>
            <p style={{ fontSize: "1.05rem", fontWeight: 900, color: "#1B2A5E", margin: 0 }}>勤務医のお金の<span style={{ color: "#2563EB" }}>答え</span>は・・・</p>
          </div>
          <SurveyBlock navigate={navigate} answerPath="/answer-elementary" answerLabel="初級者" accentColor="#2563EB"
              q1={surveyQ1}
              setQ1={setSurveyQ1}
              q2BankRatio={surveyQ2BankRatio}
              setQ2BankRatio={setSurveyQ2BankRatio}
              q2InvestRatio={surveyQ2InvestRatio}
              setQ2InvestRatio={setSurveyQ2InvestRatio}
              q3Specialty={surveyQ3Specialty}
              setQ3Specialty={setSurveyQ3Specialty}
              email={surveyEmail}
              setEmail={setSurveyEmail}
              forceOpen={forceOpenSurvey}
            />
        </>
      )}

      {/* 中級者: インデックス中心 → 元のファーストビュー＋PROBLEMを表示 */}
      {activeLevel === "intermediate" && (
        <>
          <section key={activeLevel} className="animate-fade-in-up" style={{ background: "linear-gradient(to bottom, #FECACA 0%, #FEE2E2 80px, #fff 200px)", padding: "20px 0 12px" }}>
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <div style={{ padding: "0 16px 4px" }}>
                <p style={{ color: "#DC2626", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>FOR INTERMEDIATE</p>
              </div>
              <div style={{ padding: "0 16px 4px" }}>
                <img
                  src="/assets/catchcopy_doctor_643479f5_766a4e3e.jpeg"
                  alt="NISAでオルカンやS&P500だけで本当に大丈夫なのか？"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", padding: "10px 0 16px" }}>
                {/* 問題1アコーディオン */}
                <div style={{ border: "1.5px solid #DC2626", overflow: "hidden", marginBottom: "10px" }}>
                  <div
                    onClick={() => toggleProblem('inter-1')}
                    style={{ background: openProblems['inter-1'] ? "#FFF5F5" : "#fff", borderLeft: "4px solid #DC2626", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#DC2626", margin: 0 }}>問題1．暴落時にどうする？</p>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                      <span style={{ fontSize: "0.7rem", color: "#DC2626", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                      <span style={{ fontSize: "0.75rem", color: "#DC2626", transition: "transform 0.2s", display: "inline-block", transform: openProblems['inter-1'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </div>
                  </div>
                  {openProblems['inter-1'] && (
                    <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                      <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                        S&amp;P500は以下のように何度も暴落を繰り返しています。個別株よりは低リスクではあるものの、カテゴリとしてはリスク資産です。
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                        {[
                          { label: "世界恐慌", detail: "約86％下落（回復に25年）" },
                          { label: "オイルショック", detail: "約46％下落（回復に9年）" },
                          { label: "ITバブル崩壊", detail: "約49％下落（回復に7年）" },
                          { label: "リーマンショック", detail: "約56％下落（回復に6年）" },
                        ].map((item) => (
                          <div key={item.label} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            flexWrap: "nowrap", gap: "8px",
                            background: "#fff", borderRadius: "8px", padding: "8px 12px",
                            border: "1px solid #FECACA",
                            borderLeft: "4px solid #DC2626",
                          }}>
                            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", flexShrink: 0 }}>{item.label}</span>
                            <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#DC2626", whiteSpace: "nowrap" }}>{item.detail}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{
                        background: "#FFF5F5", border: "2px solid #DC2626", borderRadius: "10px",
                        padding: "14px 16px", marginBottom: "12px"
                      }}>
                        <p style={{ fontSize: "0.88rem", color: "#1B2A5E", lineHeight: 1.85, margin: 0 }}>
                          <span style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                            <span style={{ fontSize: "1.1rem", lineHeight: 1.4, flexShrink: 0 }}>⚠️</span>
                            <span>そんな時に<strong>住宅購入・子の教育費・転職</strong>など人生の大きなイベントが重なった場合、<strong style={{ color: "#DC2626" }}>リスク資産だけでは対応できません。</strong></span>
                          </span>
                          <span style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginTop: "6px" }}>
                            <span style={{ fontSize: "1.1rem", lineHeight: 1.4, flexShrink: 0 }}>⚠️</span>
                            <span style={{ fontSize: "0.85rem", color: "#DC2626", fontWeight: 700 }}>或いは老後に発生したら…？</span>
                          </span>
                          <span style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #FECACA" }}>
                            <span style={{ fontSize: "0.88rem", color: "#374151", fontWeight: 700 }}>「どう増やすか」だけでなく、「どう使うか」の<strong style={{ color: "#DC2626", fontSize: "0.95rem" }}>出口戦略</strong>が重要です</span>
                          </span>
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "1.2rem", color: "#F5C400", flexShrink: 0, lineHeight: 1 }}>▶</span>
                        <p style={{ fontSize: "0.88rem", fontWeight: 900, color: "#F5C400", margin: 0, lineHeight: 1.6 }}>
                          とは言え、投資を控えてしまうと更に大きなリスクを抱えることになります。
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 問題2アコーディオン */}
                <div style={{ border: "1.5px solid #2563EB", overflow: "hidden", marginBottom: "10px" }}>
                  <div
                    onClick={() => toggleProblem('inter-2')}
                    style={{ background: openProblems['inter-2'] ? "#F0F7FF" : "#fff", borderLeft: "4px solid #2563EB", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#2563EB", margin: 0 }}>問題2．とは言え現金比率が高いのも危ない</p>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                      <span style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                      <span style={{ fontSize: "0.75rem", color: "#2563EB", transition: "transform 0.2s", display: "inline-block", transform: openProblems['inter-2'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </div>
                  </div>
                  {openProblems['inter-2'] && (
                    <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                      <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "16px" }}>
                        暴落を恐れて現金の比率を高め過ぎるのもそれはそれでリスクとなります。
                        インフレ時代に突入した今、現金で長期の資金を貯めるのは困難を伴います。
                      </p>
                      {/* インフレによる物価倍率グラフ */}
                      <div style={{
                        background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px",
                        padding: "16px", marginBottom: "16px"
                      }}>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "24px", textAlign: "center", lineHeight: 1.5 }}>
                          2％インフレが進んだ場合の物価の変化
                        </p>
                        <svg viewBox="0 0 340 160" style={{ width: "100%", overflow: "visible", marginBottom: "8px" }}>
                          {[1,2,3,3.62].map((v, i) => {
                            const y = 120 - ((v - 1) / 2.62) * 110;
                            return <line key={i} x1="40" x2="330" y1={y} y2={y} stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray={v === 1 ? "0" : "4,4"} />;
                          })}
                          {["1倍","2倍","3倍"].map((label, i) => {
                            const vals = [1, 2, 3];
                            const y = 120 - ((vals[i] - 1) / 2.62) * 110;
                            return <text key={i} x="34" y={y + 4} fontSize="10" fill="#9CA3AF" textAnchor="end">{label}</text>;
                          })}
                          {(() => {
                            const pts = [
                              { age: 35, value: 1.00 },
                              { age: 65, value: 1.81 },
                              { age: 75, value: 2.21 },
                              { age: 85, value: 2.69 },
                              { age: 95, value: 3.28 },
                            ];
                            const toX = (age: number) => 42 + ((age - 35) / 60) * 284;
                            const toY = (val: number) => 120 - ((val - 1) / 2.28) * 110;
                            const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.age)},${toY(p.value)}`).join(' ');
                            const areaD = pathD + ` L${toX(95)},120 L${toX(35)},120 Z`;
                            return (
                              <>
                                <defs>
                                  <linearGradient id="inflGradInter" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#DC2626" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#DC2626" stopOpacity="0.03" />
                                  </linearGradient>
                                </defs>
                                <path d={areaD} fill="url(#inflGradInter)" />
                                <path d={pathD} fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinejoin="round" />
                                {pts.map((p, i) => (
                                  <g key={i}>
                                    <circle cx={toX(p.age)} cy={toY(p.value)} r="4"
                                      fill={i === 0 ? "#1B2A5E" : "#F87171"}
                                      stroke="#fff" strokeWidth="1.5" />
                                    {i !== 0 && (
                                      <text x={toX(p.age)} y={toY(p.value) - 9} fontSize="12"
                                        fill="#1B2A5E" fontWeight="bold" textAnchor="middle">
                                        {p.value.toFixed(2)}倍
                                      </text>
                                    )}
                                    <text x={toX(p.age)} y={138} fontSize="9.5" fill="#6B7280" textAnchor="middle">{p.age}歳</text>
                                  </g>
                                ))}
                                <line x1="40" x2="330" y1="120" y2="120" stroke="#D1D5DB" strokeWidth="1" />
                              </>
                            );
                          })()}
                        </svg>
                        <p style={{ fontSize: "0.75rem", color: "#DC2626", fontWeight: 900, textAlign: "center", margin: 0 }}>
                          65歳時には物価が現在の約1.8倍、85歳では約2.7倍に！
                        </p>
                      </div>
                      {/* 老後資金必要額比較 */}
                      <div style={{
                        background: "transparent", border: "2px solid #DC2626", borderRadius: "10px",
                        padding: "14px 16px", marginBottom: "16px"
                      }}>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "10px" }}>
                          老後に月30万円ずつ取り崩す場合の必要金額
                        </p>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <div style={{ flex: 1, background: "#EFF6FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                            <p style={{ fontSize: "0.7rem", color: "#2563EB", fontWeight: 700, margin: "0 0 4px" }}>インフレなし</p>
                            <p style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 2px" }}>1億800万円</p>
                            <p style={{ fontSize: "0.65rem", color: "#6B7280", margin: "0 0 3px" }}>65歳から30年分</p>
                            <p style={{ fontSize: "0.6rem", color: "#9CA3AF", margin: 0, lineHeight: 1.4 }}>30万円×12ヶ月×30年</p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", fontSize: "1.2rem", color: "#DC2626", fontWeight: 900 }}>→</div>
                          <div style={{ flex: 1, background: "#FFF5F5", borderRadius: "8px", padding: "10px", textAlign: "center", border: "2px solid #DC2626" }}>
                            <p style={{ fontSize: "0.7rem", color: "#DC2626", fontWeight: 700, margin: "0 0 4px" }}>2％インフレ時</p>
                            <p style={{ fontSize: "0.9rem", fontWeight: 900, color: "#DC2626", margin: "0 0 2px" }}>約2億6,500万円</p>
                            <p style={{ fontSize: "0.65rem", color: "#6B7280", margin: 0 }}>必要額が約2.45倍に</p>
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.7, marginBottom: "8px" }}>
                        高収入の医師と言えど、この金額を貯めるのは容易ではありません。
                        貯める額を気にし過ぎて今楽しくお金を使えないこともストレスになるでしょう。
                      </p>
                    </div>
                  )}
                </div>
            </div>
          </section>
          <div style={{ background: "#fff", padding: "20px 16px 16px", textAlign: "center", borderTop: "2px solid #FECACA" }}>
            <p style={{ fontSize: "0.92rem", color: "#374151", margin: "0 0 4px" }}>この問題を解決する</p>
            <p style={{ fontSize: "1.05rem", fontWeight: 900, color: "#1B2A5E", margin: 0 }}>勤務医のお金の<span style={{ color: "#DC2626" }}>答え</span>は・・・</p>
          </div>
          <SurveyBlock navigate={navigate} answerPath="/answer-intermediate" answerLabel="中級者" accentColor="#DC2626"
              q1={surveyQ1}
              setQ1={setSurveyQ1}
              q2BankRatio={surveyQ2BankRatio}
              setQ2BankRatio={setSurveyQ2BankRatio}
              q2InvestRatio={surveyQ2InvestRatio}
              setQ2InvestRatio={setSurveyQ2InvestRatio}
              q3Specialty={surveyQ3Specialty}
              setQ3Specialty={setSurveyQ3Specialty}
              email={surveyEmail}
              setEmail={setSurveyEmail}
              forceOpen={forceOpenSurvey}
            />
        </>
      )}
      {/* 上級者: 個別株・債券も */}
      {activeLevel === "advanced" && (
        <>
          <section key={activeLevel} className="animate-fade-in-up" style={{ background: "linear-gradient(to bottom, #DDD6FE 0%, #FDF4FF 80px, #FDF4FF 100%)", padding: "20px 0 0" }}>
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <div style={{ padding: "0 16px 4px" }}>
                <p style={{ color: "#7C3AED", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "8px" }}>FOR ADVANCED</p>
              </div>
              <div style={{ padding: "0 16px 4px" }}>
                <img
                  src="/assets/catchcopy_advanced_56d77ae8_4d24fb27.jpeg"
                  alt="個別株・債券も持つ上級者の勤務医の先生へ"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              {/* 上級者問題サマリーカード */}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", padding: "10px 0 16px" }}>
                {/* 問題1アコーディオン */}
                <div style={{ border: "1.5px solid #7C3AED", overflow: "hidden", marginBottom: "10px" }}>
                  <div
                    onClick={() => toggleProblem('adv-1')}
                    style={{ background: openProblems['adv-1'] ? "#F5F3FF" : "#fff", borderLeft: "4px solid #7C3AED", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#7C3AED", margin: 0 }}>問題1．インデックス投資を超えるパフォーマンスを上げられている？</p>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                      <span style={{ fontSize: "0.7rem", color: "#7C3AED", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                      <span style={{ fontSize: "0.75rem", color: "#7C3AED", transition: "transform 0.2s", display: "inline-block", transform: openProblems['adv-1'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </div>
                  </div>
                  {openProblems['adv-1'] && (
                    <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                      <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                        個別株や債券を持っているのは素晴らしいことです。ただ、長期で見るとオルカン・S&P500を上回り続けている個人投資家は少数です。自分のポートフォリオの実績を正確に把握できていますか？
                      </p>
                      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "14px", textAlign: "center" }}>
                          長期10年の年率リターン比較（参考）
                        </p>
                        {[
                          { label: "S&P500（インデックス）", value: "+11%/年", color: "#059669", pct: 90 },
                          { label: "個人投資家の平均", value: "+2〜5%/年", color: "#DC2626", pct: 40 },
                        ].map((row) => (
                          <div key={row.label} style={{ marginBottom: "12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                              <p style={{ fontSize: "0.78rem", color: "#374151", margin: 0, fontWeight: 700 }}>{row.label}</p>
                              <span style={{ fontSize: "0.82rem", color: row.color, fontWeight: 900 }}>{row.value}</span>
                            </div>
                            <div style={{ width: "100%", background: "#F3F4F6", borderRadius: "4px", height: "20px", overflow: "hidden" }}>
                              <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: "4px" }} />
                            </div>
                          </div>
                        ))}
                        <div style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: "8px", padding: "10px 12px", marginTop: "10px" }}>
                          <p style={{ fontSize: "0.82rem", color: "#7C3AED", fontWeight: 700, margin: 0, lineHeight: 1.6 }}>自分のポートフォリオの実績をインデックスと比較したことはありますか？</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 問題2アコーディオン */}
                <div style={{ border: "1.5px solid #DC2626", overflow: "hidden", marginBottom: "10px" }}>
                  <div
                    onClick={() => toggleProblem('adv-2')}
                    style={{ background: openProblems['adv-2'] ? "#FFF5F5" : "#fff", borderLeft: "4px solid #DC2626", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#DC2626", margin: 0 }}>問題2．安全資産とリスク資産を使い分けられているか？</p>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                      <span style={{ fontSize: "0.7rem", color: "#DC2626", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                      <span style={{ fontSize: "0.75rem", color: "#DC2626", transition: "transform 0.2s", display: "inline-block", transform: openProblems['adv-2'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </div>
                  </div>
                  {openProblems['adv-2'] && (
                    <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                      <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                        個別株・債券を持つ方ほど、ポートフォリオ全体のバランス設計が重要になります。リスク資産が増えるほど、安全資産（債券・保険・金など）との最適比率を意識的に設計することが求められます。リスク資産偏重の場合、暴落時に安全資産で凌ぐことができず、大きな損失につながるリスクがあります。
                      </p>
                      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "14px", textAlign: "center" }}>
                          ポートフォリオバランスのイメージ
                        </p>
                        <div style={{ display: "flex", height: "40px", borderRadius: "6px", overflow: "hidden", marginBottom: "10px" }}>
                          <div style={{ width: "60%", background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "0.88rem", color: "#fff", fontWeight: 900 }}>60%</span>
                          </div>
                          <div style={{ width: "40%", background: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "0.88rem", color: "#fff", fontWeight: 900 }}>40%</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                          <div style={{ width: "60%" }}>
                            <p style={{ fontSize: "0.75rem", color: "#7C3AED", fontWeight: 700, margin: "0 0 3px", lineHeight: 1.4 }}>リスク資産</p>
                            <p style={{ fontSize: "0.7rem", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>個別株・インデックス・不動産投資信託</p>
                          </div>
                          <div style={{ width: "40%" }}>
                            <p style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700, margin: "0 0 3px", lineHeight: 1.4 }}>安全資産</p>
                            <p style={{ fontSize: "0.7rem", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>現預金・債券・金・保険</p>
                          </div>
                        </div>
                        <div style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: "8px", padding: "10px 12px", marginTop: "10px" }}>
                          <p style={{ fontSize: "0.82rem", color: "#7C3AED", fontWeight: 700, margin: 0, lineHeight: 1.6 }}>自分のポートフォリオの実績をインデックスと比較したことはありますか？</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 問題3アコーディオン */}
                <div style={{ border: "1.5px solid #059669", overflow: "hidden", marginBottom: "10px" }}>
                  <div
                    onClick={() => toggleProblem('adv-3')}
                    style={{ background: openProblems['adv-3'] ? "#F0FDF4" : "#fff", borderLeft: "4px solid #059669", cursor: "pointer", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <p style={{ fontSize: "0.92rem", fontWeight: 900, color: "#059669", margin: 0 }}>問題3．出口戦略まで考えられているか？</p>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0, marginLeft: "8px" }}>
                      <span style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 700, whiteSpace: "nowrap" }}>詳しく</span>
                      <span style={{ fontSize: "0.75rem", color: "#059669", transition: "transform 0.2s", display: "inline-block", transform: openProblems['adv-3'] ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </div>
                  </div>
                  {openProblems['adv-3'] && (
                    <div style={{ background: "#F5F7FA", padding: "20px 16px" }}>
                      <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                        資産形成に成功している方ほど、「取り崩し方」「暴落時の備え」の設計が不十分なケースが非常に多いです。あなたは下記を設計できていますか？
                      </p>
                      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                        {[
                          { icon: "💸", label: "取り崩し方の選択", sub: "一括・定額・定率—どれが自分に合っている？" },
                          { icon: "📉", label: "暴落時の対策", sub: "順序リスクを知っている？安全資産で凌げる備えは？" },
                          { icon: "🏠", label: "相続・贈与の設計", sub: "次世代への資産移転を意識している？" },
                        ].map((item) => (
                          <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                            <span style={{ fontSize: "1.3rem", lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
                            <div>
                              <p style={{ fontSize: "0.88rem", fontWeight: 900, color: "#1B2A5E", margin: "0 0 2px" }}>{item.label}</p>
                              <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{item.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
          </section>
          <div style={{ background: "#fff", padding: "20px 16px 16px", textAlign: "center", borderTop: "2px solid #DDD6FE" }}>
            <p style={{ fontSize: "0.92rem", color: "#374151", margin: "0 0 4px" }}>この問題を解決する</p>
            <p style={{ fontSize: "1.05rem", fontWeight: 900, color: "#1B2A5E", margin: 0 }}>勤務医のお金の<span style={{ color: "#7C3AED" }}>答え</span>は・・・</p>
          </div>
          <SurveyBlock navigate={navigate} answerPath="/answer-advanced" answerLabel="上級者" accentColor="#7C3AED"
              q1={surveyQ1}
              setQ1={setSurveyQ1}
              q2BankRatio={surveyQ2BankRatio}
              setQ2BankRatio={setSurveyQ2BankRatio}
              q2InvestRatio={surveyQ2InvestRatio}
              setQ2InvestRatio={setSurveyQ2InvestRatio}
              q3Specialty={surveyQ3Specialty}
              setQ3Specialty={setSurveyQ3Specialty}
              email={surveyEmail}
              setEmail={setSurveyEmail}
              forceOpen={forceOpenSurvey}
            />
        </>
      )}



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
          <div style={{
            background: "#F5F7FA", borderRadius: "10px", padding: "16px",
            marginBottom: "16px", border: "1px solid #E5E7EB"
          }}>
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
                  <span style={{
                    fontSize: "0.82rem", fontWeight: 900,
                    color: fp.highlight ? "#F5C400" : "#1B2A5E",
                    display: "block"
                  }}>
                    {fp.label}
                  </span>
                  {fp.highlight && <span style={{ display: "inline-block", fontSize: "0.58rem", background: "#F5C400", color: "#1B2A5E", padding: "1px 5px", borderRadius: "3px", marginTop: "3px", fontWeight: 900, whiteSpace: "nowrap" }}>★ 最高峰</span>}
                </div>
                <p style={{ fontSize: "0.88rem", color: fp.highlight ? "#E2E8F0" : "#555", lineHeight: 1.5 }}>{fp.desc}</p>
              </div>
            ))}
          </div>

          {/* 0.09% */}
          <div style={{
            background: "#1B2A5E", borderRadius: "10px", padding: "20px 16px",
            textAlign: "center", marginBottom: "16px"
          }}>
            <p style={{ color: "#93C5FD", fontSize: "0.85rem", marginBottom: "8px" }}>FP資格保有者に占める割合</p>
            <p style={{ color: "#F5C400", fontSize: "2.5rem", fontWeight: 900, lineHeight: 1 }}>0.09<span style={{ fontSize: "1.2rem" }}>%</span></p>
            <p style={{ color: "#93C5FD", fontSize: "0.75rem", marginTop: "6px" }}>
              ※FP資格合格者数の累計約670万人中、1級FP約6万人（2026年3月現在）
            </p>
            <div style={{
              marginTop: "12px", padding: "8px 16px",
              background: "rgba(232,70,10,0.1)", borderRadius: "6px",
              border: "1px solid #F5C400"
            }}>
              <p style={{ color: "#F5C400", fontWeight: 900, fontSize: "0.92rem" }}>FP保有者の中でも希少な存在</p>
            </div>
          </div>

          {/* 比較表 */}
          <div style={{
            background: "#F5F7FA", borderRadius: "10px", padding: "16px",
            marginBottom: "20px", border: "1px solid #E5E7EB"
          }}>
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

      {/* ===== ORANGE DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== FEE SECTION (Chart.js) ===== */}
      <FeeSection />

      {/* ===== WHY FREE SECTION ===== */}
      <section style={{ background: "#F5F7FA", padding: "36px 16px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#1B2A5E", textAlign: "center", marginBottom: "20px" }}>
            なぜ無料なのか？
          </h2>
          <div style={{
            background: "#fff", borderRadius: "12px", padding: "20px 16px",
            border: "1px solid #E5E7EB", marginBottom: "16px"
          }}>
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

      {/* ===== ORANGE DIVIDER ===== */}
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
                  <span style={{
                    background: "#1B2A5E", color: "#F5C400",
                    fontSize: "0.78rem", fontWeight: 900, padding: "3px 10px",
                    borderRadius: "100px"
                  }}>
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

      {/* ===== ORANGE DIVIDER ===== */}
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

      {/* ===== ORANGE DIVIDER ===== */}
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
           5月申込限定・先着15名          </p>
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
                  onClick={() => handleApply(opt.id)}
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
      <footer style={{ background: "#0f1e3d", padding: "28px 16px 80px" }}>
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
          <button
            onClick={() => setShowPrivacy(true)}
            style={{ color: "#64748B", fontSize: "0.7rem", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", marginBottom: "8px" }}
          >
            プライバシーポリシー
          </button>
          <p style={{ color: "#4B5563", fontSize: "0.7rem" }}>© 2025 All Rights Reserved.</p>
        </div>
      </footer>

      {/* ===== PRIVACY POLICY MODAL ===== */}
      {showPrivacy && (
        <div
          onClick={() => setShowPrivacy(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: "16px", maxWidth: "480px", width: "100%",
              maxHeight: "80vh", overflowY: "auto", padding: "24px 20px"
            }}
          >
            <h2 style={{ fontSize: "1rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "16px", textAlign: "center" }}>
              プライバシーポリシー
            </h2>
            <div style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <p style={{ fontWeight: 700, marginBottom: "6px" }}>１．個人情報の管理</p>
                <p>当事務局は、お客様の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・職員教育の徹底等の必要な措置を講じ、安全対策を実施し、個人情報の厳重な管理を行ないます。</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: "6px" }}>２．個人情報の利用目的</p>
                <p>お客様からお預かりした個人情報は、当事務局からのご連絡やご質問に対する回答のご送付のために利用いたします。</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: "6px" }}>３．個人情報の第三者への開示・提供の禁止</p>
                <p style={{ marginBottom: "6px" }}>当事務局は、お客様よりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。</p>
                <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <li>お客様の同意がある場合</li>
                  <li>お客様が希望されるサービスを行なうため当事務局が業務を委託する業者に対して開示する場合</li>
                  <li>法令に基づき開示することが必要である場合</li>
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: "6px" }}>４．個人情報の安全対策</p>
                <p>当事務局は、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: "6px" }}>５．個人情報の訂正等について</p>
                <p>お客様がご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: "6px" }}>６．法令、規範の遵守と見直し</p>
                <p>当事務局は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。</p>
              </div>
            </div>
            <button
              onClick={() => setShowPrivacy(false)}
              style={{
                marginTop: "20px", width: "100%", padding: "12px",
                background: "#1B2A5E", color: "#fff", fontWeight: 700,
                fontSize: "0.9rem", borderRadius: "10px", border: "none", cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===== FIXED CTA BAR ===== */}
      {(() => {
        // 選択中レベルのanswerPathとaccentColorを取得
        const levelAnswerMap: Record<string, { path: string; label: string; color: string }> = {
          beginner:     { path: "/answer-beginner",     label: "初心者",   color: "#059669" },
          elementary:   { path: "/answer-elementary",   label: "初級者",   color: "#2563EB" },
          intermediate: { path: "/answer-intermediate", label: "中級者",   color: "#DC2626" },
          advanced:     { path: "/answer-advanced",     label: "上級者",   color: "#7C3AED" },
          tax:          { path: "/answer-intermediate", label: "中級者",   color: "#DC2626" },
        };
        const lvInfo = activeLevel ? levelAnswerMap[activeLevel] : null;
        // レベル未選択 or スクロール前は非表示
        const visible = showFixedCta && !!lvInfo;
        const accentColor = lvInfo?.color || "#1B2A5E";
        // アンケートバリデーション
        const bankNum = parseInt(surveyQ2BankRatio || "0", 10) || 0;
        const investNum = parseInt(surveyQ2InvestRatio || "0", 10) || 0;
        const q2Total = bankNum + investNum;
        const q2Valid = q2Total === 100;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(surveyEmail);
        const q3Valid = surveyQ3Specialty !== "" && surveyQ3Specialty !== "other:";
        const isSurveyValid = surveyQ1 !== "" && q2Valid && q3Valid && emailValid;
        return (
          <div
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
              background: "#1B2A5E",
              transform: visible ? "translateY(0)" : "translateY(100%)",
              opacity: visible ? 1 : 0,
              transition: "transform 0.3s ease, opacity 0.3s ease",
              paddingBottom: "env(safe-area-inset-bottom)"
            }}
          >
            {/* アンケートパネルは削除 - ページ内SurveyBlockにスクロールして開く */}
            <div style={{ display: "none" }}>
              {/* × ボタン：overflow内でstickyにするためスクロール可能な親に属する */}
              {fixedCtaOpen && (
                <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff", display: "flex", justifyContent: "flex-end", padding: "4px 12px 0" }}>
                  <button onClick={() => setFixedCtaOpen(false)} style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", color: "#6B7280", padding: "2px 4px", lineHeight: 1 }}>✕</button>
                </div>
              )}
              <div style={{ padding: "4px 16px 8px", maxWidth: "480px", margin: "0 auto" }}>
                <div style={{ marginBottom: "10px" }}>
                  <p style={{ fontSize: "0.82rem", fontWeight: 900, color: "#1B2A5E", margin: 0 }}>
                    3つの質問に答えるだけ・完全無料
                  </p>
                </div>
                {/* Q1 */}
                <div style={{ marginBottom: "14px" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "6px" }}>質問1　金融商品を使う目的は？ <span style={{ color: "#DC2626" }}>*</span></p>
                  <select value={surveyQ1} onChange={(e) => setSurveyQ1(e.target.value)}
                    style={{ width: "100%", padding: "9px 10px", borderRadius: "8px", border: "1.5px solid #D1D5DB", fontSize: "0.85rem", color: surveyQ1 ? "#111827" : "#9CA3AF", background: "#fff", appearance: "auto" }}>
                    <option value="">選択してください</option>
                    <option value="リスクがあっても資産をどんどん増やしたい">リスクがあっても資産をどんどん増やしたい</option>
                    <option value="リスクは抑えて将来困らないくらいには増やしたい">リスクは抑えて将来困らないくらいには増やしたい</option>
                    <option value="バランス良くどちらも">バランス良くどちらも</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
                {/* Q2 */}
                <div style={{ marginBottom: "14px" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "6px" }}>質問2　年間貯蓄額の銀行預金と金融商品の割合は？ <span style={{ color: "#DC2626" }}>*</span></p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.8rem", color: "#374151", fontWeight: 700, flex: 1, textAlign: "center" }}>銀行預金</span>
                    <span style={{ fontSize: "0.9rem", color: "#9CA3AF" }}>：</span>
                    <span style={{ fontSize: "0.8rem", color: "#374151", fontWeight: 700, flex: 1, textAlign: "center" }}>金融商品</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center" }}>
                      <input type="number" min="0" max="100" placeholder="0" value={surveyQ2BankRatio}
                        onChange={(e) => { const v = e.target.value; setSurveyQ2BankRatio(v); const b = parseInt(v||"0",10)||0; const r=100-b; if(r>=0&&r<=100) setSurveyQ2InvestRatio(String(r)); }}
                        style={{ width: "64px", padding: "7px 8px", borderRadius: "6px", border: "1.5px solid #D1D5DB", fontSize: "0.85rem", textAlign: "right" }} />
                      <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>%</span>
                    </div>
                    <span style={{ fontSize: "0.9rem", color: "#9CA3AF" }}>：</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center" }}>
                      <input type="number" min="0" max="100" placeholder="0" value={surveyQ2InvestRatio}
                        onChange={(e) => { const v = e.target.value; setSurveyQ2InvestRatio(v); const i = parseInt(v||"0",10)||0; const r=100-i; if(r>=0&&r<=100) setSurveyQ2BankRatio(String(r)); }}
                        style={{ width: "64px", padding: "7px 8px", borderRadius: "6px", border: "1.5px solid #D1D5DB", fontSize: "0.85rem", textAlign: "right" }} />
                      <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>%</span>
                    </div>
                  </div>
                  {(surveyQ2BankRatio !== "" || surveyQ2InvestRatio !== "") && (
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "6px", marginTop: "6px", padding: "5px 8px", borderRadius: "6px", background: q2Total===100?"#DCFCE7":q2Total>100?"#FEE2E2":"#FEF9C3" }}>
                      <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>合計</span>
                      <span style={{ fontSize: "0.95rem", fontWeight: 900, color: q2Total===100?"#16A34A":q2Total>100?"#DC2626":"#B45309" }}>{q2Total}%</span>
                      {q2Total===100 && <span style={{ fontSize: "0.78rem", color: "#16A34A" }}>✓ OK</span>}
                      {q2Total!==100 && <span style={{ fontSize: "0.75rem", color: q2Total>100?"#DC2626":"#B45309" }}>（残り{100-q2Total}%）</span>}
                    </div>
                  )}
                </div>
                {/* Q3 */}
                <div style={{ marginBottom: "14px" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "6px" }}>質問3　職業は？ <span style={{ color: "#DC2626" }}>*</span></p>
                  <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    {(["doctor", "other"] as const).map((val) => {
                      const isDoctor = surveyQ3Specialty !== "" && !surveyQ3Specialty.startsWith("other:");
                      const isOther = surveyQ3Specialty.startsWith("other:");
                      const selected = val === "doctor" ? isDoctor : isOther;
                      return (
                        <button key={val} type="button"
                          onClick={() => {
                            if (val === "doctor") setSurveyQ3Specialty("");
                            else setSurveyQ3Specialty("other:");
                          }}
                          style={{ flex: 1, padding: "9px 0", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, border: `2px solid ${selected ? accentColor : "#D1D5DB"}`, background: selected ? accentColor : "#fff", color: selected ? "#fff" : "#374151", cursor: "pointer" }}>
                          {val === "doctor" ? "医師" : "それ以外"}
                        </button>
                      );
                    })}
                  </div>
                  {!surveyQ3Specialty.startsWith("other:") && surveyQ3Specialty !== "" || (!surveyQ3Specialty.startsWith("other:") && surveyQ3Specialty === "") ? (
                    surveyQ3Specialty !== "" || (!surveyQ3Specialty.startsWith("other:")) ? (
                      <select value={surveyQ3Specialty.startsWith("other:") ? "" : surveyQ3Specialty}
                        onChange={(e) => setSurveyQ3Specialty(e.target.value)}
                        style={{ width: "100%", padding: "9px 10px", borderRadius: "8px", border: "1.5px solid #D1D5DB", fontSize: "0.85rem", color: (surveyQ3Specialty && !surveyQ3Specialty.startsWith("other:")) ? "#111827" : "#9CA3AF", background: "#fff", appearance: "auto", display: surveyQ3Specialty.startsWith("other:") ? "none" : "block" }}>
                        <option value="">専門科を選択してください</option>
                        <option value="内科（循環器・消化器・呼吸器など）">内科（循環器・消化器・呼吸器など）</option>
                        <option value="外科（消化器外科・心臓血管外科など）">外科（消化器外科・心臓血管外科など）</option>
                        <option value="整形外科">整形外科</option>
                        <option value="小児科">小児科</option>
                        <option value="産婦人科">産婦人科</option>
                        <option value="精神科（心療内科含む）">精神科（心療内科含む）</option>
                        <option value="眼科">眼科</option>
                        <option value="耳鼻咽喉科">耳鼻咽喉科</option>
                        <option value="皮膚科">皮膚科</option>
                        <option value="泌尿器科">泌尿器科</option>
                        <option value="その他">その他</option>
                      </select>
                    ) : null
                  ) : null}
                  {surveyQ3Specialty.startsWith("other:") && (
                    <input type="text" placeholder="職業を入力してください"
                      value={surveyQ3Specialty.slice(6)}
                      onChange={(e) => setSurveyQ3Specialty("other:" + e.target.value)}
                      style={{ width: "100%", padding: "9px 10px", borderRadius: "8px", border: "1.5px solid #D1D5DB", fontSize: "0.85rem", color: "#111827", background: "#fff", boxSizing: "border-box" }} />
                  )}
                </div>
                {/* メール */}
                <div style={{ marginBottom: "14px" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1B2A5E", marginBottom: "4px" }}>答え送付先 <span style={{ color: "#DC2626" }}>*</span></p>
                  <input type="email" placeholder="example@email.com" value={surveyEmail} onChange={(e) => setSurveyEmail(e.target.value)}
                    style={{ width: "100%", padding: "9px 10px", borderRadius: "8px", border: `1.5px solid ${emailValid && surveyEmail !== "" ? "#16A34A" : "#D1D5DB"}`, fontSize: "0.85rem", color: "#111827", background: "#fff", boxSizing: "border-box" }} />
                  <p style={{ fontSize: "0.73rem", color: "#6B7280", marginTop: "5px", lineHeight: 1.5 }}>🎁 キャンペーン終了後も有効な無料相談クーポンをお送りします。</p>
                </div>
                {/* 送信ボタン */}
                <button
                  onClick={async () => {
                    if (!isSurveyValid || fixedCtaSubmitting || !lvInfo) return;
                    setFixedCtaSubmitting(true);
                    fetch(GAS_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ level: lvInfo.label, q1: surveyQ1, q2Bank: surveyQ2BankRatio, q2Invest: surveyQ2InvestRatio, q3: surveyQ3Specialty, email: surveyEmail }),
                    }).catch(() => {});
                    navigate(lvInfo.path + "?sent=1");
                  }}
                  disabled={!isSurveyValid || fixedCtaSubmitting}
                  style={{ width: "100%", background: (isSurveyValid && !fixedCtaSubmitting) ? accentColor : "#D1D5DB", color: "#fff", border: "none", borderRadius: "10px", padding: "13px 16px", fontSize: "0.95rem", fontWeight: 900, cursor: (isSurveyValid && !fixedCtaSubmitting) ? "pointer" : "not-allowed", marginBottom: "8px" }}>
                  {fixedCtaSubmitting ? "送信中..." : <>{lvInfo?.label}向けの<span style={{ color: (isSurveyValid && !fixedCtaSubmitting) ? "#FDE047" : "#9CA3AF", fontWeight: 900 }}>答え</span>を見る</>}
                </button>
                {!isSurveyValid && (
                  <p style={{ fontSize: "0.73rem", color: "#9CA3AF", textAlign: "center", marginBottom: "8px" }}>
                    {surveyQ1 === "" ? "質問1を選択してください" : !q2Valid ? `割合の合計が${q2Total}%です` : !q3Valid ? "質問3（職業）を入力してください" : !emailValid ? "メールアドレスを正しく入力してください" : ""}
                  </p>
                )}
              </div>
            </div>
            {/* ボタンバー */}
            <div style={{ padding: "7px 16px", maxWidth: "480px", margin: "0 auto" }}>
              <button
                onClick={() => {
                  setForceOpenSurvey(false);
                  setTimeout(() => {
                    setForceOpenSurvey(true);
                    const el = document.getElementById('survey-block');
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }, 0);
                }}
                style={{
                  width: "100%", padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer",
                  background: accentColor,
                  color: "#fff", fontWeight: 900, fontSize: "0.88rem",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
                }}
              >
                <div style={{ lineHeight: 1.4 }}>
                  <div>アンケートに回答して<span style={{ color: "#FDE047", fontWeight: 900 }}>答え</span>と</div>
                  <div><span style={{ color: "#FDE047", fontWeight: 900 }}>無料相談クーポン</span>を入手</div>
                </div>
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
