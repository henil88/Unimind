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

  const markdown = parsedMsg?.text || "";
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
    <div className="p-3 my-2 text-black rounded-lg max-w-full space-y-8 break-normal">
      {/* Markdown Preview */}
      <MDEditor.Markdown
        source={markdown}
        style={{
          fontSize: "1em",
          color:"black",
          backgroundColor: "#FFFBEB", // Tailwind bg-gray-900
          borderRadius: "0.5rem",
          padding: "1rem",
          // whiteSpace: "pre-wrap",
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
