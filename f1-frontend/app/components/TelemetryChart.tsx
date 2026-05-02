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

export default function TelemetryChart({ data }: any) {
  if (!data || !data.distance) return null;

  const formatted = data.distance.map((d: number, i: number) => ({
    distance: d,
    speed: data.speed[i],
    throttle: data.throttle[i],
    brake: data.brake[i],
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="distance" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="speed" stroke="#E10600" dot={false} />
          <Line type="monotone" dataKey="throttle" stroke="#00ff00" dot={false} />
          <Line type="monotone" dataKey="brake" stroke="#0099ff" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}