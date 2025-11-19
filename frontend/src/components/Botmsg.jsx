import React from "react";
import MDEditor from "@uiw/react-md-editor";
import Chart from "react-apexcharts";

export default function Botmsg({ msg }) {
  // Parse msg into markdown text and charts array
  let parsedMsg = msg;
  if (typeof msg === "string") {
    try {
      parsedMsg = JSON.parse(msg);
    } catch (err) {
      parsedMsg = { text: msg, charts: [] }; // fallback no charts
    }
  }

  if (!parsedMsg) {
    return console.log("invalid response");
  }

  // Raw markdown
  let markdown = parsedMsg?.text || "";

  // === AUTO-UNWRAP: if the whole payload is a single fenced block, unwrap it ===
  // This only unwraps the outermost fenced block (```...```) and leaves other code blocks alone.
  const fencedListMatch = markdown.match(/^\s*```(?:\w*\n)?([\s\S]*?)```\s*$/);
  if (fencedListMatch) {
    // only unwrap if the inner content *looks like a markdown list* (lines starting with * - or +)
    const inner = fencedListMatch[1];
    const looksLikeList = inner
      .split("\n")
      .some((line) => /^\s*([*\-+])\s+/.test(line));
    if (looksLikeList) {
      markdown = inner.trim();
    }
  }

  const msgCharts = parsedMsg?.charts || [];

  // Chart options generator function
  const makeOptions = (data) => ({
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#22c55e"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    grid: { borderColor: "#374151", strokeDashArray: 3 },
    xaxis: {
      categories: data.map((d) => d.name),
      labels: { style: { colors: "#9ca3af" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: "#9ca3af" } } },
    tooltip: { theme: "dark", style: { fontSize: "12px" } },
  });

  return (
    // CHANGED: neutral, single background card
    <div className="p-4 my-3 rounded-lg max-w-full space-y-6 bg-gray-50 text-gray-800">
      {/* Scoped CSS: neutral theme, no bold blue accents */}
      <style>{`
        .botmsg-markdown { font-size: 1rem; line-height: 1.6; color: #0f172a; }
        .botmsg-markdown img { max-width: 100%; border-radius: 0.5rem; display: block; margin: 0.75rem 0; }

        .botmsg-markdown ul { list-style: disc; padding-left: 1.25rem; margin-top: 0.5rem; }
        .botmsg-markdown ol { list-style: decimal; padding-left: 1.25rem; margin-top: 0.5rem; }
        .botmsg-markdown li { margin: 0.25rem 0; }

        /* neutral blockquote (no blue accent) */
        .botmsg-markdown blockquote {
          border-left: 4px solid rgba(15,23,42,0.06);
          background: rgba(15,23,42,0.02);
          padding: 0.5rem 0.75rem;
          margin: 0.5rem 0;
          border-radius: 0.375rem;
        }

        /* tables */
        .botmsg-markdown table { width: 100%; border-collapse: collapse; margin-top: 0.6rem; }
        .botmsg-markdown th, .botmsg-markdown td { border: 1px solid #eef2f7; padding: 0.5rem; text-align: left; }
        .botmsg-markdown th { background: #f8fafc; font-weight: 500; }

        /* headings: not bold, neutral color */
        .botmsg-markdown h1, .botmsg-markdown h2, .botmsg-markdown h3,
        .botmsg-markdown h4, .botmsg-markdown h5, .botmsg-markdown h6 {
          font-weight: 500;
          color: #0f172a;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
        }

        /* Professional, light code block style (no dark theme, no heavy border) */
        .botmsg-markdown pre {
          background: #f6f8fa;
          color: #0f172a;
          padding: 0.75rem;
          border-radius: 0.5rem;
          overflow: auto;
          border: none;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Fira Code", monospace;
          font-size: 0.95rem;
          line-height: 1.45;
        }

        /* inline code */
        .botmsg-markdown code {
          background: rgba(15,23,42,0.04);
          color: #0f172a;
          padding: 0.12rem 0.32rem;
          border-radius: 0.32rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Fira Code", monospace;
          font-size: 0.92rem;
          font-weight: 400; /* ensure inline code not bold */
        }

        /* links: blue but not bold */
        .botmsg-markdown a {
          color: #2563eb;
          font-weight: 400;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .botmsg-markdown pre { font-size: 0.88rem; padding: 0.6rem; }
        }
      `}</style>

      {/* Markdown Preview */}
      <MDEditor.Markdown
        source={markdown}
        className="botmsg-markdown"
        style={{
          backgroundColor: "transparent",
          padding: 0,
          borderRadius: "0.5rem",
        }}
      />

      {/* Charts rendering unchanged but simplified wrapper */}
      {msgCharts.map((chart, idx) => (
        <div key={idx} className="w-full rounded-xl p-0">
          {chart.meta?.title && <h2 className="text-lg font-medium text-gray-800 mb-2">{chart.meta.title}</h2>}
          <Chart options={makeOptions(chart.data)} series={[{ name: chart.seriesName || "Value", data: chart.data.map((d) => d.value) }]} type="area" height={300} />
          {chart.meta?.subtext && <div className="text-gray-600 text-sm mt-2">{chart.meta.subtext}</div>}
          {/* ranges / stats unchanged */}
        </div>
      ))}
    </div>
  );
}
