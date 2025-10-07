import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Chart from "react-apexcharts";

const Botmsg = ({ msg }) => {
  // --- 1. Parse msg safely ---
  let parsedMsg = msg;
  if (typeof msg === "string") {
    try {
      parsedMsg = JSON.parse(msg);
    } catch (err) {
      parsedMsg = { text: msg }; // Not JSON, fallback to plain text
    }
  }

  const msgText = parsedMsg?.text || "";
  const msgCharts = parsedMsg?.charts || [];

  // --- 2. Chart options generator ---
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
      gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0, stops: [0, 90, 100] },
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
    <div className="p-3 my-2 bg-gray-900 text-white rounded-lg shadow max-w-full space-y-4">
      {/* Markdown / Text Rendering */}
      {msgText && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const detectedLang = match?.[1] || "plaintext";

              return !inline ? (
                <div className="relative my-2">
                  <span className="absolute top-1 right-2 text-xs text-gray-400">{detectedLang}</span>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={detectedLang}
                    PreTag="div"
                    showLineNumbers
                    wrapLongLines
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="bg-gray-800 px-1 py-0.5 rounded text-xs">{children}</code>
              );
            },
          }}
        >
          {msgText}
        </ReactMarkdown>
      )}

      {/* Chart Rendering */}
      {msgCharts.map((chart, idx) => {
        const options = makeOptions(chart.data);
        const series = [{ name: chart.seriesName || "Value", data: chart.data.map((d) => d.value) }];
        const meta = chart.meta || {};

        return (
          <div key={idx} className="w-full bg-gray-800 rounded-xl p-4 shadow-md space-y-3">
            {/* Optional Header */}
            {meta.title && (
              <div>
                <h2 className="text-lg font-semibold">{meta.title}</h2>
                {meta.price && (
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-bold">{meta.price}</span>
                    {meta.change && (
                      <span className={`text-sm ${meta.change.includes("-") ? "text-red-500" : "text-green-500"}`}>
                        {meta.change}
                      </span>
                    )}
                  </div>
                )}
                {meta.subtext && <div className="text-gray-400 text-sm">{meta.subtext}</div>}
              </div>
            )}

            {/* Chart */}
            <Chart options={options} series={series} type="area" height={300} />

            {/* Optional time range buttons */}
            {meta.ranges && (
              <div className="flex justify-center gap-2 mt-2">
                {meta.ranges.map((range) => (
                  <button key={range} className="px-3 py-1 rounded-md text-xs bg-gray-700 hover:bg-gray-600">
                    {range}
                  </button>
                ))}
              </div>
            )}

            {/* Optional stats row */}
            {meta.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-300 mt-3">
                {Object.entries(meta.stats).map(([label, value]) => (
                  <div key={label}>
                    <span className="block text-gray-400">{label}</span>
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
};

export default Botmsg;
