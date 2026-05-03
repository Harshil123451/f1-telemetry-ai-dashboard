"use client";

import { useEffect, useState } from "react";

import ComparisonChart from "./components/ComparisonChart";
import DeltaChart from "./components/DeltaChart";
import InsightsPanel from "./components/InsightsPanel";
import LapChart from "./components/LapChart";
import Sidebar from "./components/layout/Sidebar";
import TelemetryChart from "./components/TelemetryChart";
import Topbar from "./components/layout/Topbar";
import axios from "axios";
import { formatLapTime } from "./utils/formatTime";

export default function Home() {
  const [laps, setLaps] = useState<any>(null);
  const [telemetry, setTelemetry] = useState<any>(null);
  const [compare, setCompare] = useState<any>(null);
  const [delta, setDelta] = useState<any>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [aiInsights, setAiInsights] = useState("");

  useEffect(() => {
  axios.get("/api/laps").then(res => setLaps(res.data));
  axios.get("/api/telemetry").then(res => setTelemetry(res.data));
  axios.get("/api/compare").then(res => setCompare(res.data));
  axios.get("/api/delta").then(res => setDelta(res.data));
  axios.get("/api/insights").then(res => setInsights(res.data.insights));
  axios.get("/api/ai-insights").then(res => setAiInsights(res.data.analysis));
}, []);

  if (!laps || !telemetry || !compare || !delta) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen flex">
      
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <Topbar />

        <div className="p-6">

          {/* HEADER */}
          <div className="flex justify-between items-end border-b border-[#1F1F1F] pb-4 mb-6">
            <h1 className="text-xl font-bold">F1 Telemetry Dashboard</h1>
            <span className="text-xs text-gray-400">
              Bahrain GP 2023 • VER
            </span>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Metric label="Fastest Lap" value= {formatLapTime(Math.min(...laps.lap_times))} />
            <Metric label="Average Lap" value={formatLapTime(laps.lap_times.reduce((a: number, b: number) => a + b, 0) / laps.lap_times.length)} />
            <Metric label="Best Delta" value={delta?.delta?.length ? `${Math.min(...delta.delta) > 0 ? "+" : ""}${Math.min(...delta.delta).toFixed(3)}s` : "N/A"} />
            <Metric label="Total Laps" value={laps.lap_times.length} />
          </div>
    
          {/* TOP */}
          <div className="grid grid-cols-12 gap-6 mb-6">

            <div className="col-span-8 bg-[#121212] border border-[#1F1F1F] rounded-xl p-4 h-[300px]">
              <LapChart data={laps} />
            </div>

            <div className="col-span-4 space-y-3">
              <InsightsPanel insights={insights} />
            </div>

          </div>

          {/* TELEMETRY */}
          <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl p-4 mb-6 resize-y overflow-auto min-h-[300px] max-h-[600px]">
            <TelemetryChart data={telemetry} />
          </div>

          {/* BOTTOM */}
          <div className="grid grid-cols-2 gap-6">

            <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl p-4 h-[250px]">
              <ComparisonChart data={compare} />
            </div>

            <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl p-4 h-[250px]">
              <DeltaChart data={delta} />
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);