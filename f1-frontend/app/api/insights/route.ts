import { NextResponse } from "next/server";
import laps from "@/data/laps.json";

export async function GET() {
  const lap_times = laps.lap_times;
  const insights: string[] = [];

  if (lap_times[lap_times.length - 1] > lap_times[lap_times.length - 2]) {
    insights.push("Driver losing pace");
  }

  if (Math.max(...lap_times) - Math.min(...lap_times) > 2) {
    insights.push("High lap time variation detected");
  }

  return NextResponse.json({ insights });
}