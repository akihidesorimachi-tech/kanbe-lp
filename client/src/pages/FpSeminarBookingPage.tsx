/**
 * FpSeminarBookingPage - 1級FPオンラインセミナー予約フォームページ
 * Design: Banner-Aligned Warm Blue
 *
 * ⚠️ 重要：GAS連携のためDOM直接操作方式で実装
 * - ReactのstateやuseRefでフォーム値を管理しない
 * - hidden inputはDOMに残す
 * - 送信payloadはすべてdocument.getElementById()で読み取る
 *
 * payloadキー（GASと完全一致）:
 * name / email / phone / age / location / station / time / message
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";

const GAS_URL = "https://script.google.com/macros/s/AKfycbwqe4ATjtcMu4H1NXEEjxGVh6EXV3rJqN1PVOOwDtA_oB90AceOsZMyFzqXRMUzkcGCzw/exec";

export default function FpSeminarBookingPage() {
  const [, navigate] = useLocation();

  // ページ表示時に一番上にスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loader = document.getElementById("fp-seminar-loader");
    const slotSelect = document.getElementById("fp-seminar-slot-select") as HTMLSelectElement;

    async function init() {
      try {
        const res = await fetch(`${GAS_URL}?t=${Date.now()}`, { redirect: "follow" });
        const data = await res.json();
        if (!data.slots || data.slots.length === 0) {
          const opt = document.createElement("option");
          opt.value = "";
          opt.innerText = "現在、予約可能な日程がありません";
          slotSelect?.appendChild(opt);
          if (slotSelect) slotSelect.disabled = true;
        } else {
          data.slots.forEach((slot: { value: string; label: string }) => {
            const opt = document.createElement("option");
            opt.value = slot.value;
            opt.innerText = slot.label;
            if (slot.label.includes("(日)")) {
              opt.style.color = "red";
            }
            slotSelect?.appendChild(opt);
          });
        }
      } catch {
        alert("スケジュールの取得に失敗しました");
      }
      if (loader) loader.style.display = "none";
    }

    const handleSlotChange = function (this: HTMLSelectElement) {
      const hidden = document.getElementById("fp-seminar-selected-slot-label") as HTMLInputElement;
      if (hidden) {
        hidden.value = this.value === "" ? "" : (this.options[this.selectedIndex]?.text ?? "");
      }
    };

    slotSelect?.addEventListener("change", handleSlotChange);
    init();

    return () => {
      slotSelect?.removeEventListener("change", handleSlotChange);
    };
  }, []);

  function showConfirmation() {
    const timeValue = (document.getElementById("fp-seminar-slot-select") as HTMLSelectElement)?.value;
    const timeLabel = (document.getElementById("fp-seminar-selected-slot-label") as HTMLInputElement)?.value;
    const name = (document.getElementById("fp-seminar-user-name") as HTMLInputElement)?.value;
    const email = (document.getElementById("fp-seminar-user-email") as HTMLInputElement)?.value;

    if (!name || !email || !timeValue) {
      alert("必須項目をすべて入力し、日時を選択してください。");
      return;
    }

    const age = (document.getElementById("fp-seminar-user-age") as HTMLSelectElement)?.value;
    const phone = (document.getElementById("fp-seminar-user-phone") as HTMLInputElement)?.value;
    const message = (document.getElementById("fp-seminar-user-message") as HTMLTextAreaElement)?.value;

    const confirmContent = document.getElementById("fp-seminar-confirm-content");
    if (confirmContent) {
      confirmContent.innerHTML = `
        <div style="border-bottom:1px solid #e5e7eb; padding-bottom:12px; margin-bottom:12px;">
          <p style="color:#94a3b8; font-size:10px; font-weight:700; margin-bottom:4px;">お名前</p>
          <p style="font-weight:700; color:#1e293b;">${name}</p>
        </div>
        <div style="border-bottom:1px solid #e5e7eb; padding-bottom:12px; margin-bottom:12px;">
          <p style="color:#94a3b8; font-size:10px; font-weight:700; margin-bottom:4px;">年代</p>
          <p style="font-weight:700; color:#1e293b;">${age}</p>
        </div>
        <div style="border-bottom:1px solid #e5e7eb; padding-bottom:12px; margin-bottom:12px;">
          <p style="color:#94a3b8; font-size:10px; font-weight:700; margin-bottom:4px;">メールアドレス</p>
          <p style="font-weight:700; color:#1e293b;">${email}</p>
        </div>
        <div style="border-bottom:1px solid #e5e7eb; padding-bottom:12px; margin-bottom:12px;">
          <p style="color:#94a3b8; font-size:10px; font-weight:700; margin-bottom:4px;">電話番号</p>
          <p style="font-weight:700; color:#1e293b;">${phone || "未入力"}</p>
        </div>
        <div style="border-bottom:1px solid #e5e7eb; padding-bottom:12px; margin-bottom:12px;">
          <p style="color:#2563eb; font-size:10px; font-weight:700; margin-bottom:4px;">希望日時</p>
          <p style="font-weight:700; color:#2563eb;">${timeLabel}</p>
        </div>
        <div style="padding-bottom:4px;">
          <p style="color:#94a3b8; font-size:10px; font-weight:700; margin-bottom:4px;">特に聞きたい内容</p>
          <p style="font-weight:700; color:#1e293b;">${message || "特になし"}</p>
        </div>
      `;
    }

    const inputSection = document.getElementById("fp-seminar-input-section");
    const confirmSection = document.getElementById("fp-seminar-confirm-section");
    if (inputSection) inputSection.style.display = "none";
    if (confirmSection) confirmSection.style.display = "block";
    window.scrollTo(0, 0);
  }

  function hideConfirmation() {
    const inputSection = document.getElementById("fp-seminar-input-section");
    const confirmSection = document.getElementById("fp-seminar-confirm-section");
    if (inputSection) inputSection.style.display = "block";
    if (confirmSection) confirmSection.style.display = "none";
  }

  async function submitBooking() {
    const btn = document.getElementById("fp-seminar-submitBtn") as HTMLButtonElement;
    if (btn) { btn.disabled = true; btn.innerText = "送信中..."; }

    const payload = {
      name:     (document.getElementById("fp-seminar-user-name") as HTMLInputElement)?.value,
      email:    (document.getElementById("fp-seminar-user-email") as HTMLInputElement)?.value,
      phone:    (document.getElementById("fp-seminar-user-phone") as HTMLInputElement)?.value || "-",
      age:      (document.getElementById("fp-seminar-user-age") as HTMLSelectElement)?.value,
      location: "オンライン",
      station:  "-",
      time:     (document.getElementById("fp-seminar-selected-slot-label") as HTMLInputElement)?.value,
      message:  (document.getElementById("fp-seminar-user-message") as HTMLTextAreaElement)?.value,
    };

    try {
      await fetch(GAS_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });

      // GA4に予約完了イベントを飛ばす
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "fp_seminar_reservation",
        });
      }

      // 完了画面表示
      const confirmSection = document.getElementById("fp-seminar-confirm-section");
      const completeSection = document.getElementById("fp-seminar-complete-section");
      if (confirmSection) confirmSection.style.display = "none";
      if (completeSection) completeSection.style.display = "flex";
      window.scrollTo(0, 0);
    } catch {
      alert("送信エラーが発生しました。時間をおいて再度お試しください。");
      if (btn) { btn.disabled = false; btn.innerText = "予約申込を確定する"; }
    }
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* ===== TOP BAR ===== */}
      <div style={{ background: "#1B2A5E", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={() => { window.location.href = "/"; }}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0 }}
        >
          <ChevronLeft size={22} color="#fff" />
        </button>
        <div>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1rem", margin: 0 }}>セミナー申込</h1>
          <p style={{ color: "#93C5FD", fontSize: "0.7rem", margin: 0 }}>完全無料・1級FP登壇</p>
        </div>
      </div>

      {/* ===== DIVIDER ===== */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1B2A5E, #2563EB, #1B2A5E)" }} />

      {/* ===== LOADER ===== */}
      <div
        id="fp-seminar-loader"
        style={{
          position: "fixed", inset: 0, background: "white", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: "12px"
        }}
      >
        <div style={{
          width: "40px", height: "40px", border: "4px solid #e5e7eb",
          borderTop: "4px solid #1B2A5E", borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <p style={{ fontWeight: 700, color: "#1B2A5E", fontSize: "0.9rem" }}>開催スケジュールを取得中...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px 16px 80px" }}>

        {/* ===== INPUT SECTION ===== */}
        <div id="fp-seminar-input-section">
          <div style={{ marginBottom: "16px" }}>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B3A6B", marginBottom: "4px" }}>
              1級FPの資産形成術オンラインセミナー
            </h1>
            <p style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 700 }}>
              必要事項を入力し、参加希望日を選択してください
            </p>
          </div>

          <div style={{
            background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: "20px",
            display: "flex", flexDirection: "column", gap: "16px"
          }}>

            {/* お名前 */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "6px" }}>
                お名前 <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <input
                type="text"
                id="fp-seminar-user-name"
                placeholder="例：山田 太郎"
                style={{
                  width: "100%", padding: "12px", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "0.9rem", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            {/* 年代 */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "6px" }}>
                年代 <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <select
                id="fp-seminar-user-age"
                defaultValue="30代"
                style={{
                  width: "100%", padding: "12px", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
                  appearance: "none",
                  backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M1.41%204.295L6%208.885l4.59-4.59L12%205.705l-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  backgroundSize: "12px"
                }}
              >
                <option value="20代">20代</option>
                <option value="30代">30代</option>
                <option value="40代">40代</option>
                <option value="50代">50代</option>
                <option value="その他">その他</option>
              </select>
            </div>

            {/* メールアドレス */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "6px" }}>
                メールアドレス（半角のみ） <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <input
                type="email"
                id="fp-seminar-user-email"
                placeholder="example@mail.com"
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/[^\x20-\x7e]/g, "");
                }}
                style={{
                  width: "100%", padding: "12px", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "0.9rem", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            {/* 電話番号 */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "6px" }}>
                電話番号（任意）
              </label>
              <p style={{ fontSize: "0.7rem", color: "#94a3b8", marginBottom: "6px" }}>
                メールが届かない場合に備え、可能であればご入力ください
              </p>
              <input
                type="tel"
                id="fp-seminar-user-phone"
                placeholder="例：09012345678"
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/[^0-9]/g, "");
                }}
                style={{
                  width: "100%", padding: "12px", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "0.9rem", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            {/* 参加希望日 */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "6px" }}>
                参加希望日の選択 <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <select
                id="fp-seminar-slot-select"
                style={{
                  width: "100%", padding: "12px", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "0.85rem", outline: "none", boxSizing: "border-box",
                  appearance: "none",
                  backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M1.41%204.295L6%208.885l4.59-4.59L12%205.705l-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  backgroundSize: "12px"
                }}
              >
                <option value="">選択してください</option>
              </select>
              <p style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "6px" }}>
                ※現在予約可能な日程が表示されています
              </p>
              <input type="hidden" id="fp-seminar-selected-slot-label" />
            </div>

            {/* 特に聞きたい内容 */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", marginBottom: "6px" }}>
                特に聞きたい内容（任意）
              </label>
              <textarea
                id="fp-seminar-user-message"
                rows={3}
                placeholder="例：毎月いくら積み立てるべきか、自分にあった投資先はなにかなど"
                style={{
                  width: "100%", padding: "12px", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "0.85rem", outline: "none", resize: "none",
                  boxSizing: "border-box", fontFamily: "sans-serif"
                }}
              />
            </div>

            <button
              type="button"
              onClick={showConfirmation}
              style={{
                width: "100%", padding: "16px", background: "#1B3A6B",
                color: "#fff", fontWeight: 900, fontSize: "1rem",
                borderRadius: "12px", border: "none", cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#0f2347")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1B3A6B")}
            >
              確認画面へ進む
            </button>
          </div>
        </div>

        {/* ===== CONFIRM SECTION ===== */}
        <div id="fp-seminar-confirm-section" style={{ display: "none" }}>
          <div style={{ marginBottom: "16px" }}>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1B3A6B", marginBottom: "4px" }}>
              入力内容の確認
            </h1>
            <p style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 700 }}>
              内容に間違いがなければ「予約申込を確定する」を押してください
            </p>
          </div>

          <div style={{
            background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: "20px", marginBottom: "20px"
          }}>
            <div id="fp-seminar-confirm-content" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              type="button"
              id="fp-seminar-submitBtn"
              onClick={submitBooking}
              style={{
                width: "100%", padding: "16px", background: "#2563EB",
                color: "#fff", fontWeight: 900, fontSize: "1rem",
                borderRadius: "12px", border: "none", cursor: "pointer"
              }}
            >
              予約申込を確定する
            </button>
            <button
              type="button"
              onClick={hideConfirmation}
              style={{
                width: "100%", padding: "16px", background: "#e5e7eb",
                color: "#475569", fontWeight: 700, fontSize: "0.95rem",
                borderRadius: "12px", border: "none", cursor: "pointer"
              }}
            >
              修正する
            </button>
          </div>
        </div>

        {/* ===== COMPLETE SECTION ===== */}
        <div
          id="fp-seminar-complete-section"
          style={{
            display: "none", flexDirection: "column", alignItems: "center",
            justifyContent: "center", minHeight: "70vh", textAlign: "center", padding: "20px"
          }}
        >
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#1B3A6B", marginBottom: "12px" }}>
            セミナー申込を完了しました
          </h1>
          <div style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "20px" }}>
            <p>お申し込みありがとうございます。</p>
            <p>確認メールをお送りしましたのでご確認ください。</p>
            <p style={{ marginTop: "10px", fontWeight: 700, color: "#ef4444" }}>
              ※メールが来ない場合は迷惑メールフォルダもご確認ください。
            </p>
            <div style={{ marginTop: "16px", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
              <p>メールが届かない場合には下記までご連絡ください。</p>
              <p style={{ fontWeight: 900, color: "#1B3A6B", marginTop: "8px" }}>info@logicalfp.com</p>
              <p style={{ fontWeight: 900, color: "#1B3A6B" }}>070-9097-3341</p>
            </div>
          </div>
          <button
            onClick={() => { window.location.href = "/"; }}
            style={{
              marginTop: "20px", color: "#2563EB", fontWeight: 700,
              background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem"
            }}
          >
            トップページに戻る
          </button>
        </div>

      </div>
    </div>
  );
}
