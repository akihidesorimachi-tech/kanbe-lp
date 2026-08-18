/**
 * BookingPage.tsx
 * Design: Medical Trust Blue — 白背景・紺×オレンジ・太字ゴシック・温かみのあるデザイン
 * 1級FP個別相談の予約フォームページ
 * GAS URL: https://script.google.com/macros/s/AKfycbxrJyPHfBJ-5SPHHLyQMJ6-o2_KsvZf53EWTDTt82krOQrfd-3ATY3_3Ngqb8wYv18mLw/exec
 */

import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxrJyPHfBJ-5SPHHLyQMJ6-o2_KsvZf53EWTDTt82krOQrfd-3ATY3_3Ngqb8wYv18mLw/exec";

type Slot = { date: string; time: string; isoDate: string };

export default function BookingPage() {
  const [, navigate] = useLocation();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showOnline, setShowOnline] = useState(true);
  const [step, setStep] = useState<"input" | "confirm" | "done">("input");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "30代",
    email: "",
    phone: "",
    location: "オンライン",
    station: "",
    message: "",
  });

  const mainScrollRef = useRef<HTMLDivElement>(null);
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const timeLabelsScrollRef = useRef<HTMLDivElement>(null);

  // Fetch busy slots via tRPC backend proxy (avoids CORS issues with direct GAS fetch from browser)
  const { data: busySlotsData, isLoading: loading } = trpc.booking.getBusySlots.useQuery(
    undefined,
    { retry: false }
  );
  const busySlots = busySlotsData?.busySlots ?? [];

  // ページ表示時に一番上にスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const mainEl = mainScrollRef.current;
    const headerEl = headerScrollRef.current;
    const timeLabelsEl = timeLabelsScrollRef.current;
    if (!mainEl || !headerEl) return;

    // スクロール同期ハンドラ
    const scrollHandler = () => {
      headerEl.scrollLeft = mainEl.scrollLeft;
      if (timeLabelsEl) timeLabelsEl.scrollTop = mainEl.scrollTop;
    };
    mainEl.addEventListener("scroll", scrollHandler);

    // ホイールイベントを mainGrid に閉じ込める（passive:false で preventDefault 可能にする）
    const wheelHandler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        mainEl.scrollTop += e.deltaY;
      }
    };
    mainEl.addEventListener("wheel", wheelHandler, { passive: false });

    return () => {
      mainEl.removeEventListener("scroll", scrollHandler);
      mainEl.removeEventListener("wheel", wheelHandler);
    };
  }, [loading]);

  // Build date list (start from 2 days later, 21 days)
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 2);
  const dates = Array.from({ length: 21 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    return d;
  });

  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8〜21
  const minutes = ["00", "30"];

  function isBusy(isoDate: string, time: string) {
    return busySlots.includes(`${isoDate} ${time}`);
  }

  function toIso(d: Date) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function handleSlotClick(d: Date, h: number, m: string) {
    const isoDate = toIso(d);
    const time = `${h}:${m}`;
    setSelectedSlot({
      date: `${d.getMonth() + 1}/${d.getDate()}(${dayNames[d.getDay()]})`,
      time,
      isoDate,
    });
  }

  function handleConfirm() {
    if (!form.name || !form.email || !selectedSlot) {
      alert("必須項目をすべて入力し、日時を選択してください。");
      return;
    }
    setStep("confirm");
    window.scrollTo(0, 0);
  }

  async function handleSubmit() {
    setSubmitting(true);
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      age: form.age,
      location: form.location,
      station: form.station || "-",
      time: `${selectedSlot?.isoDate} ${selectedSlot?.time}`,
      message: form.message,
    };
    try {
      await fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
      if ((window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          'event_category': 'form',
          'event_label': 'fp_consultation'
        });
      }
      setStep("done");
      window.scrollTo(0, 0);
    } catch {
      alert("送信に失敗しました。");
    } finally {
      setSubmitting(false);
    }
  }

  const colWidth = "calc((100vw - 32px - 60px) / 5)";

  // ===== DONE =====
  if (step === "done") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F5F7FA",
          fontFamily: "'Noto Sans JP', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 20px",
          textAlign: "center",
        }}
      >
        <CheckCircle size={64} color="#22C55E" style={{ marginBottom: "20px" }} />
        <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#1B2A5E", marginBottom: "10px" }}>
          予約申込を完了しました
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.8, marginBottom: "8px" }}>
          お申し込みありがとうございます。<br />
          確認メールをお送りしましたのでご確認ください。
        </p>
        <p style={{ fontSize: "0.8rem", color: "#EF4444", fontWeight: 700, marginBottom: "16px" }}>
          ※メールが来ない場合は迷惑メールフォルダもご確認ください。
        </p>
        <div
          style={{
            borderTop: "1px solid #E2E8F0",
            paddingTop: "16px",
            fontSize: "0.8rem",
            color: "#555",
            lineHeight: 1.8,
          }}
        >
          <p>メールが届かない場合には下記までご連絡ください。</p>
          <p style={{ fontWeight: 700, color: "#1B2A5E" }}>info@logicalfp.com</p>
          <p style={{ fontWeight: 700, color: "#1B2A5E" }}>070-9097-3341</p>
        </div>
        <button
          onClick={() => { window.location.href = "/"; }}
          style={{
            marginTop: "28px",
            color: "#2563EB",
            fontWeight: 700,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          トップページに戻る
        </button>
      </div>
    );
  }

  // ===== CONFIRM =====
  if (step === "confirm") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F5F7FA",
          fontFamily: "'Noto Sans JP', sans-serif",
          paddingBottom: "40px",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#1B2A5E",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setStep("input")}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0 }}
          >
            <ChevronLeft size={22} color="#fff" />
          </button>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1rem", margin: 0 }}>入力内容の確認</h1>
        </div>

        <div style={{ padding: "20px 16px" }}>
          <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: "16px" }}>
            内容に間違いがなければ「予約申込を確定する」を押してください
          </p>

          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            {[
              {
                label: "希望日時",
                value: selectedSlot ? `${selectedSlot.date} ${selectedSlot.time}〜` : "",
                highlight: true,
              },
              {
                label: "相談場所",
                value: form.location === "対面" ? `対面 (${form.station})` : "オンライン",
              },
              { label: "お名前", value: form.name },
              { label: "年代", value: form.age },
              { label: "メールアドレス", value: form.email },
              { label: "電話番号", value: form.phone || "未入力" },
              { label: "特に聞きたい内容", value: form.message || "特になし" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: i < 6 ? "1px solid #F1F5F9" : "none",
                  paddingBottom: "12px",
                  marginBottom: "12px",
                }}
              >
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#94A3B8", marginBottom: "2px" }}>
                  {item.label}
                </p>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: item.highlight ? "#2563EB" : "#1B2A5E",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                width: "100%",
                padding: "16px",
                background: submitting ? "#93C5FD" : "#2563EB",
                color: "#fff",
                fontWeight: 900,
                fontSize: "1rem",
                border: "none",
                borderRadius: "12px",
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "送信中..." : "予約申込を確定する"}
            </button>
            <button
              onClick={() => setStep("input")}
              style={{
                width: "100%",
                padding: "14px",
                background: "#E2E8F0",
                color: "#475569",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              修正する
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== INPUT =====
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7FA",
        fontFamily: "'Noto Sans JP', sans-serif",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1B2A5E",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => { window.location.href = "/"; }}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0 }}
        >
          <ChevronLeft size={22} color="#fff" />
        </button>
        <div>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1rem", margin: 0 }}>個別FP相談 予約申込</h1>
          <p style={{ color: "#93C5FD", fontSize: "0.7rem", margin: 0 }}>完全無料・30分〜</p>
        </div>
      </div>

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.9)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#1B3A6B",
          }}
        >
          最新の空き状況を確認中...
        </div>
      )}

      <div style={{ padding: "20px 16px" }}>
        <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: "16px" }}>
          日時を選択してください
        </p>

        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          {/* Calendar — 希望日時 */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "6px" }}>
              希望日時の選択 <span style={{ color: "#E11D48" }}>*</span>
            </label>
            <p style={{ fontSize: "0.68rem", color: "#94A3B8", marginBottom: "2px" }}>
              ※対応可能なFPがいる日時が◯表示されています
            </p>
            <p style={{ fontSize: "0.68rem", color: "#94A3B8", marginBottom: "8px" }}>
              ※申込上限に達し次第選択できなくなります
            </p>

            {/* Calendar widget */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "400px",
                border: "2px solid #E2E8F0",
                borderRadius: "12px",
                background: "#fff",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  background: "#F8FAFC",
                  borderBottom: "2px solid #CBD5E1",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {/* Corner */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#F8FAFC",
                    boxShadow: "2px 0 0 #CBD5E1",
                    borderBottom: "2px solid #CBD5E1",
                    flexShrink: 0,
                    position: "sticky",
                    left: 0,
                    zIndex: 110,
                  }}
                />
                <div
                  ref={headerScrollRef}
                  style={{ display: "flex", overflow: "hidden", flex: 1 }}
                >
                  {dates.map((d, i) => {
                    const colorStyle =
                      d.getDay() === 0
                        ? { color: "#EF4444" }
                        : d.getDay() === 6
                        ? { color: "#2563EB" }
                        : { color: "#1E293B" };
                    return (
                      <div
                        key={i}
                        style={{
                          minWidth: colWidth,
                          flexShrink: 0,
                          height: "60px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRight: "1px solid #E2E8F0",
                          ...colorStyle,
                        }}
                      >
                        <span style={{ fontSize: "11px", fontWeight: 700 }}>
                          {d.getMonth() + 1}/{d.getDate()}
                        </span>
                        <span style={{ fontSize: "10px" }}>{dayNames[d.getDay()]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Body */}
              <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                {/* Time labels */}
                <div
                  ref={timeLabelsScrollRef}
                  style={{
                    width: "60px",
                    flexShrink: 0,
                    overflowY: "hidden",
                    background: "#F8FAFC",
                    boxShadow: "2px 0 0 #CBD5E1",
                    position: "sticky",
                    left: 0,
                    zIndex: 100,
                  }}
                >
                  {hours.map((h) =>
                    minutes.map((m) => (
                      <div
                        key={`${h}:${m}`}
                        style={{
                          height: "44px",
                          borderBottom: "1px solid #F1F5F9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#64748B",
                        }}
                      >
                        {h}:{m}
                      </div>
                    ))
                  )}
                </div>

                {/* Day columns */}
                <div
                  ref={mainScrollRef}
                  onScroll={(e) => {
                    const el = e.currentTarget;
                    if (headerScrollRef.current) headerScrollRef.current.scrollLeft = el.scrollLeft;
                    if (timeLabelsScrollRef.current) timeLabelsScrollRef.current.scrollTop = el.scrollTop;
                  }}
                  style={{ display: "flex", overflowX: "auto", overflowY: "auto", flex: 1 }}
                >
                  {dates.map((d, di) => {
                    const isoDate = toIso(d);
                    return (
                      <div
                        key={di}
                        style={{
                          minWidth: colWidth,
                          flexShrink: 0,
                          borderRight: "1px solid #E2E8F0",
                          background: "#fff",
                        }}
                      >
                        {hours.map((h) =>
                          minutes.map((m) => {
                            const time = `${h}:${m}`;
                            const busy = isBusy(isoDate, time);
                            const isSelected =
                              selectedSlot?.isoDate === isoDate && selectedSlot?.time === time;
                            return (
                              <div
                                key={time}
                                onClick={() => !busy && handleSlotClick(d, h, m)}
                                style={{
                                  height: "44px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderBottom: "1px solid #F1F5F9",
                                  fontSize: busy ? "10px" : "14px",
                                  fontWeight: busy ? 400 : 700,
                                  color: isSelected ? "#fff" : busy ? "#CBD5E1" : "#2563EB",
                                  background: isSelected ? "#2563EB" : busy ? "#FCFCFC" : "transparent",
                                  cursor: busy ? "default" : "pointer",
                                }}
                              >
                                {busy ? "ー" : "◯"}
                              </div>
                            );
                          })
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected display */}
            <div
              style={{
                marginTop: "12px",
                padding: "14px",
                background: selectedSlot ? "#EFF6FF" : "#F8FAFC",
                border: `1px solid ${selectedSlot ? "#BFDBFE" : "#E2E8F0"}`,
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: selectedSlot ? "#2563EB" : "#94A3B8",
              }}
            >
              {selectedSlot
                ? `${selectedSlot.date} ${selectedSlot.time}〜`
                : "カレンダーから日時を選んでください"}
            </div>
          </div>

          {/* Location — 相談場所 */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "8px" }}>
              相談場所 <span style={{ color: "#E11D48" }}>*</span>
            </label>
            <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
              {["オンライン", "対面 (23区内のみ)"].map((loc) => {
                const val = loc === "オンライン" ? "オンライン" : "対面";
                return (
                  <label key={loc} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="location"
                      value={val}
                      checked={form.location === val}
                      onChange={() => {
                        setForm({ ...form, location: val });
                        setShowOnline(val === "オンライン");
                      }}
                    />
                    {loc}
                  </label>
                );
              })}
            </div>
            {!showOnline && (
              <input
                type="text"
                placeholder="希望の場所（駅名）をご記入ください"
                value={form.station}
                onChange={(e) => setForm({ ...form, station: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  borderRadius: "10px",
                  outline: "none",
                  fontSize: "0.85rem",
                  boxSizing: "border-box",
                }}
              />
            )}
          </div>

          {/* Name — お名前 */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "6px" }}>
              お名前 <span style={{ color: "#E11D48" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="例：山田 太郎"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                outline: "none",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Age — 年代 */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "6px" }}>
              年代 <span style={{ color: "#E11D48" }}>*</span>
            </label>
            <select
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                outline: "none",
                fontSize: "0.9rem",
              }}
            >
              {["20代", "30代", "40代", "50代", "60代", "70代", "その他"].map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Email — メールアドレス */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "6px" }}>
              メールアドレス（半角のみ） <span style={{ color: "#E11D48" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value.replace(/[^\x20-\x7e]/g, "") })}
              style={{
                width: "100%",
                padding: "12px",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                outline: "none",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Phone — 電話番号（任意） */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "6px" }}>
              電話番号（任意）<br />
              <span style={{ fontWeight: 400, fontSize: "0.68rem" }}>メールが届かない場合に備え可能であればご入力ください</span>
            </label>
            <input
              type="tel"
              placeholder="例：09012345678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9]/g, "") })}
              inputMode="numeric"
              style={{
                width: "100%",
                padding: "12px",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                outline: "none",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Message — 特に聞きたい内容 */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "6px" }}>
              特に聞きたい内容（任意）
            </label>
            <textarea
              rows={3}
              placeholder="例：毎月いくら積み立てるべきか、自分にあった投資先はなにかなど"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                outline: "none",
                fontSize: "0.85rem",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={handleConfirm}
            style={{
              width: "100%",
              padding: "16px",
              background: "#1B2A5E",
              color: "#FFFFFF",
              fontWeight: 900,
              fontSize: "1rem",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            確認画面へ進む
          </button>
        </div>
      </div>
    </div>
  );
}
