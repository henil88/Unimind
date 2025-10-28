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
    <div className="p-3 my-2 rounded-lg max-w-full space-y-8 break-normal">
      {/* Force-safe CSS for list rendering in case global styles removed bullets */}
      <style>{`
        /* Scope this CSS to the markdown output */
        .botmsg-markdown ul { list-style: disc; padding-left: 1.25rem; margin-top: 0.5rem; }
        .botmsg-markdown ol { list-style: decimal; padding-left: 1.25rem; margin-top: 0.5rem; }
        .botmsg-markdown li { margin: 0.25rem 0; }
        /* Optional: better code-block appearance */
        .botmsg-markdown pre { background: #FFF7D9  ; color: #f8fafc; padding: 0.75rem; border-radius: 0.5rem; overflow: auto; }
      `}</style>

      {/* Markdown Preview */}
      <MDEditor.Markdown
        source={markdown}
        className="botmsg-markdown"
        style={{
          fontSize: "1em",
          backgroundColor: "#FFF9E8",
          borderRadius: "0.5rem",
          padding: "1rem",
          color: "#2D2D2D",
        }}
      />

      {/* Charts Rendering */}
      {msgCharts.map((chart, idx) => {
        const options = makeOptions(chart.data);
        const series = [
          {
            name: chart.seriesName || "Value",
            data: chart.data.map((d) => d.value),
          },
        ];
        const meta = chart.meta || {};

        return (
          <div
            key={idx}
            className="w-full bg-[#FFFBEB] rounded-xl p-4 shadow-md space-y-3"
          >
            {meta.title && (
              <h2 className="text-lg font-semibold">{meta.title}</h2>
            )}

            <Chart options={options} series={series} type="area" height={300} />

            {meta.subtext && (
              <div className="text-gray-700 text-sm">{meta.subtext}</div>
            )}

            {meta.ranges && (
              <div className="flex justify-center gap-2 mt-2">
                {meta.ranges.map((range) => (
                  <button
                    key={range}
                    className="px-3 py-1 rounded-md text-xs bg-gray-700 hover:bg-gray-600"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}

            {meta.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700 mt-3">
                {Object.entries(meta.stats).map(([label, value]) => (
                  <div key={label}>
                    <span className="block text-gray-700">{label}</span>
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
