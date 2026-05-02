"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ComparisonChart({ data }: any) {
  if (!data) return null;

  const length = Math.min(
    data.VER.lap_times.length,
    data.HAM.lap_times.length
  );

  const formatted = Array.from({ length }, (_, i) => ({
    lap: data.VER.lap_numbers[i],
    ver: data.VER.lap_times[i],
    ham: data.HAM.lap_times[i],
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="lap" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line dataKey="ver" stroke="#E10600" dot={false} />
          <Line dataKey="ham" stroke="#00ffff" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}