"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DeltaChart({ data }: any) {
  if (!data || !data.delta) return null;

  const formatted = data.delta.map((d: number, i: number) => ({
    lap: i + 1,
    delta: d,
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="lap" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="delta"
            stroke="#ffaa00"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}