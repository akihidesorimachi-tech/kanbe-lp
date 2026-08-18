/**
 * ApplyPage - 申し込みページ
 * Design: Banner-Aligned Warm Blue
 * - バナーと統一：白背景・紺枠・太字ゴシック・温かみのある青×オレンジ
 * - 4種類の申し込みフォーム
 */

import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { ChevronLeft, CheckCircle, User, Users, ClipboardList, Briefcase } from "lucide-react";

const formTypes = [
  {
    id: "fp-individual",
    Icon: User,
    title: "個別相談",
    desc: "1級FPの話をマンツーマンで聞きたい",
    sub: "30分〜延長可 ・ 21時以降も対応可",
    color: "#1B2A5E",
  },
  {
    id: "fp-seminar",
    Icon: Users,
    title: "オンラインセミナー参加",
    desc: "セミナー形式（60分）で1級FPの話を聞きたい",
    sub: "",
    color: "#2563EB",
  },
  {
    id: "tax-individual",
    Icon: ClipboardList,
    title: "税理士相談",
    desc: "税務の相談を専門家にしたい",
    sub: "30分〜延長可",
    color: "#059669",
  },
  {
    id: "all-round",
    Icon: Briefcase,
    title: "丸っと相談",
    desc: "FP＋税理士コラボで全部まとめて相談したい",
    sub: "",
    color: "#F5C400",
  },
];

export default function ApplyPage() {
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialType = params.get("type") || "fp-individual";

  const [selectedType, setSelectedType] = useState(initialType);
  const [formData, setFormData] = useState({
    name: "",
    hospital: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedForm = formTypes.find((f) => f.id === selectedType) || formTypes[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "お名前を入力してください";
    if (!formData.email.trim()) newErrors.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "正しいメールアドレスを入力してください";
    if (!formData.agree) newErrors.agree = "個人情報の取り扱いに同意してください";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "'Noto Sans JP', sans-serif", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 16px", textAlign: "center", maxWidth: "480px", margin: "0 auto", width: "100%" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "#1B2A5E",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px"
          }}>
            <CheckCircle size={36} color="#1B3A6B" />
          </div>
          <h1 style={{ fontWeight: 900, color: "#1B3A6B", fontSize: "1.4rem", marginBottom: "12px" }}>
            申し込みが完了しました！
          </h1>
          <p style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "24px" }}>
            ご入力いただいたメールアドレスに<br />
            確認メールをお送りします。<br /><br />
            担当者より2〜3営業日以内に<br />
            ご連絡いたします。
          </p>
          <div style={{
            background: "#fff", borderRadius: "10px", padding: "16px",
            border: "2px solid #1B3A6B", width: "100%", marginBottom: "24px"
          }}>
            <p style={{ color: "#1B3A6B", fontWeight: 900, fontSize: "0.85rem", marginBottom: "8px" }}>申し込み内容</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: selectedForm.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <selectedForm.Icon size={18} color="#fff" />
              </div>
              <p style={{ color: "#333", fontSize: "0.85rem", fontWeight: 700 }}>{selectedForm.title}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            style={{ color: "#1B3A6B", fontSize: "0.85rem", fontWeight: 700, textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
          >
            トップページに戻る
          </button>
        </div>
        <footer style={{ background: "#0f2347", padding: "24px 0", textAlign: "center" }}>
          <p style={{ color: "#93C5FD", fontSize: "0.8rem", fontWeight: 700 }}>税理士×1級FP事務局</p>
          <p style={{ color: "#93C5FD", fontSize: "0.75rem", marginTop: "4px" }}>📞 070-9097-3341</p>
          <p style={{ color: "#93C5FD", fontSize: "0.75rem", marginTop: "2px" }}>✉ info@logicalfp.com</p>
          <p style={{ color: "#6B7280", fontSize: "0.7rem", marginTop: "4px" }}>© 2025 All Rights Reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "'Noto Sans JP', sans-serif" }}>

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
      <div style={{ background: "#fff", borderBottom: "3px solid #1B2A5E" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "16px 16px 20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              color: "#1B2A5E", fontSize: "0.85rem", fontWeight: 700,
              background: "none", border: "none", cursor: "pointer", marginBottom: "14px"
            }}
          >
            <ChevronLeft size={16} />
            戻る
          </button>
          <span style={{
            background: "#1B2A5E", color: "#fff",
            fontWeight: 900, fontSize: "0.7rem", padding: "3px 12px", borderRadius: "100px",
            display: "inline-block", marginBottom: "8px"
          }}>完全無料</span>
          <h1 style={{ fontWeight: 900, color: "#1B2A5E", fontSize: "1.3rem" }}>
            無料相談に申し込む
          </h1>
          <p style={{ color: "#666", fontSize: "0.75rem", marginTop: "4px" }}>
            ご希望の形式をお選びください ・ 週5名限定
          </p>
        </div>
      </div>

      {/* ===== GOLD DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "24px 16px" }}>

        {/* ===== FORM TYPE SELECTION ===== */}
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "#1B2A5E", fontWeight: 900, fontSize: "0.85rem", marginBottom: "12px" }}>
            STEP 1｜相談形式を選ぶ
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {formTypes.map((form) => {
              const isSelected = selectedType === form.id;
              return (
                <button
                  key={form.id}
                  onClick={() => form.id === "fp-individual" ? navigate("/booking") : form.id === "fp-seminar" ? navigate("/fp-seminar-booking") : setSelectedType(form.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "12px",
                    padding: "14px 16px", borderRadius: "10px", cursor: "pointer",
                    background: isSelected ? "#EBF4FF" : "#fff",
                    border: `2px solid ${isSelected ? form.color : "#D1D5DB"}`,
                    textAlign: "left", transition: "all 0.2s ease"
                  }}
                >
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "8px", flexShrink: 0,
                    background: isSelected ? form.color : "#F3F4F6",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <form.Icon size={20} color={isSelected ? "#fff" : form.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 900, color: isSelected ? form.color : "#333", marginBottom: "2px" }}>
                      {form.title}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#666" }}>{form.desc}</p>
                    {(form as any).sub && <p style={{ fontSize: "0.65rem", color: "#999", marginTop: "2px" }}>{(form as any).sub}</p>}
                  </div>
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${isSelected ? form.color : "#D1D5DB"}`,
                    background: isSelected ? form.color : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {isSelected && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff" }} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== FORM ===== */}
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "#1B2A5E", fontWeight: 900, fontSize: "0.85rem", marginBottom: "16px" }}>
            STEP 2｜お申し込み情報を入力
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#333", marginBottom: "6px" }}>
                お名前 <span style={{ color: "#DC2626" }}>*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="山田 太郎"
                style={{
                  width: "100%", borderRadius: "8px", padding: "12px 14px", fontSize: "0.9rem",
                  border: `2px solid ${errors.name ? "#DC2626" : "#D1D5DB"}`,
                  background: "#fff", outline: "none", boxSizing: "border-box"
                }}
              />
              {errors.name && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: "4px" }}>{errors.name}</p>}
            </div>

            {/* Hospital */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#333", marginBottom: "6px" }}>
                勤務先病院名
              </label>
              <input
                type="text"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                placeholder="○○病院"
                style={{
                  width: "100%", borderRadius: "8px", padding: "12px 14px", fontSize: "0.9rem",
                  border: "2px solid #D1D5DB", background: "#fff", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#333", marginBottom: "6px" }}>
                メールアドレス <span style={{ color: "#DC2626" }}>*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                style={{
                  width: "100%", borderRadius: "8px", padding: "12px 14px", fontSize: "0.9rem",
                  border: `2px solid ${errors.email ? "#DC2626" : "#D1D5DB"}`,
                  background: "#fff", outline: "none", boxSizing: "border-box"
                }}
              />
              {errors.email && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: "4px" }}>{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#333", marginBottom: "6px" }}>
                電話番号
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="090-0000-0000"
                style={{
                  width: "100%", borderRadius: "8px", padding: "12px 14px", fontSize: "0.9rem",
                  border: "2px solid #D1D5DB", background: "#fff", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#333", marginBottom: "6px" }}>
                ご質問・ご要望（任意）
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="事前にお聞きしたいことや、現在の資産状況など、自由にご記入ください。"
                rows={4}
                style={{
                  width: "100%", borderRadius: "8px", padding: "12px 14px", fontSize: "0.9rem",
                  border: "2px solid #D1D5DB", background: "#fff", outline: "none",
                  resize: "none", boxSizing: "border-box"
                }}
              />
            </div>

            {/* Privacy agreement */}
            <div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                <div
                  onClick={() => setFormData({ ...formData, agree: !formData.agree })}
                  style={{
                    width: "20px", height: "20px", borderRadius: "4px", flexShrink: 0, marginTop: "2px",
                    border: `2px solid ${formData.agree ? "#1B2A5E" : "#D1D5DB"}`,
                    background: formData.agree ? "#1B2A5E" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}
                >
                  {formData.agree && <CheckCircle size={12} color="#fff" />}
                </div>
                <span style={{ fontSize: "0.75rem", color: "#555", lineHeight: 1.7 }}>
                  <span style={{ color: "#DC2626" }}>*</span>{" "}
                  個人情報の取り扱いに同意します。ご入力いただいた情報は、相談対応および連絡目的にのみ使用し、第三者への提供は行いません。
                </span>
              </label>
              {errors.agree && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: "4px" }}>{errors.agree}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              style={{
                width: "100%", padding: "16px", borderRadius: "8px", border: "none", cursor: "pointer",
                background: "#1B2A5E",
                color: "#1B2A5E", fontWeight: 900, fontSize: "1rem",
                boxShadow: "0 4px 16px rgba(201,168,76,0.4)"
              }}
            >
              無料相談に申し込む
            </button>

            <p style={{ color: "#999", fontSize: "0.72rem", textAlign: "center" }}>
              申し込み後、2〜3営業日以内にご連絡いたします
            </p>
          </form>
        </div>

        {/* ===== CONTACT INFO ===== */}
        <div style={{
          background: "#fff", borderRadius: "10px", padding: "16px",
          border: "2px solid #1B2A5E"
        }}>
          <p style={{ color: "#1B2A5E", fontWeight: 900, fontSize: "0.85rem", marginBottom: "6px" }}>お問い合わせ先</p>
          <p style={{ color: "#333", fontWeight: 700, fontSize: "0.9rem" }}>税理士×1級FP事務局</p>
          <p style={{ color: "#1B2A5E", fontSize: "0.8rem", fontWeight: 700, marginTop: "6px" }}>📞 070-9097-3341</p>
          <p style={{ color: "#1B2A5E", fontSize: "0.8rem", fontWeight: 700, marginTop: "2px" }}>✉ info@logicalfp.com</p>
          <p style={{ color: "#666", fontSize: "0.75rem", marginTop: "6px" }}>
            ご不明な点はお気軽にお問い合わせください。
          </p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#0f1e3d", padding: "24px 0", textAlign: "center" }}>
        <p style={{ color: "#93C5FD", fontSize: "0.8rem", fontWeight: 700 }}>税理士×1級FP事務局</p>
        <p style={{ color: "#93C5FD", fontSize: "0.75rem", marginTop: "4px" }}>📞 070-9097-3341</p>
        <p style={{ color: "#93C5FD", fontSize: "0.75rem", marginTop: "2px" }}>✉ info@logicalfp.com</p>
        <p style={{ color: "#6B7280", fontSize: "0.7rem", marginTop: "4px" }}>© 2025 All Rights Reserved.</p>
      </footer>
    </div>
  );
}
