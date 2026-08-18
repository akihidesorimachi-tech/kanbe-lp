/**
 * FeeSection - 相談料チャートセクション
 * Design: Medical Trust Blue（紺×ゴールド×白）
 * Chart.jsドーナツチャートで相談料の相場を視覚化
 * パフォーマンス最適化：IntersectionObserver + ポーリングでChart.jsの読み込みを待つ
 */
import { useEffect, useRef } from "react";

declare const Chart: any;

const feeData = [
  { label: "5,000円未満", value: 14.2, color: "#CBD5E1" },
  { label: "5,000〜10,000円未満", value: 47.3, color: "#1B2A5E" },
  { label: "10,000〜20,000円未満", value: 33.5, color: "#0f1e3d" },
  { label: "20,000円以上", value: 5.0, color: "#F5C400" },
];

export default function FeeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let pollTimer: ReturnType<typeof setInterval> | null = null;
    let observer: IntersectionObserver | null = null;

    const initChart = () => {
      if (!canvasRef.current) return;
      if (typeof Chart === "undefined") return;
      if (chartRef.current) return; // 既に初期化済み

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

      // 初期化成功したらポーリング停止
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
      // Chart.jsがまだ読み込まれていない場合は100msごとにポーリング（最大5秒）
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

    // IntersectionObserverでビューポートに入ったときだけ初期化
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
      // IntersectionObserver非対応環境はすぐ初期化
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
        <h2
          style={{ fontWeight: 900, fontSize: "1.25rem", color: "#1B2A5E", marginBottom: "6px" }}
        >
          通常、FP相談は
          <span style={{ color: "#DC2626" }}>有料</span>
          です
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

        {/* Highlight */}
        <div
          style={{
            padding: "24px 20px",
            textAlign: "center",
            background: "#1B2A5E",
            borderRadius: "10px",
            border: "2px solid #1B2A5E",
            boxShadow: "4px 4px 0 #F5C400",
          }}
        >
          <p style={{ fontSize: "0.72rem", marginBottom: "12px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)" }}>
            今回の相談料
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
            <span style={{ fontSize: "0.82rem", textDecoration: "line-through", color: "rgba(255,255,255,0.4)" }}>
              通常 5,000〜20,000円/時間
            </span>
            <span style={{ fontSize: "1.1rem", color: "#F5C400" }}>→</span>
            <span
              style={{ fontSize: "2.2rem", fontWeight: 900, color: "#F5C400", letterSpacing: "0.02em" }}
            >
              完全無料
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
