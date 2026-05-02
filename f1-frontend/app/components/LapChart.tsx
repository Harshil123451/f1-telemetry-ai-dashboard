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

export default function LapChart({ data }: any) {
  if (!data) return null;

  const formatted = data.lap_numbers.map((lap: number, i: number) => ({
    lap,
    time: data.lap_times[i],
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="lap" />
          <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="time"
            stroke="#E10600"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}