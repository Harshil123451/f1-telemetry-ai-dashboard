import { NextResponse } from "next/server";
import ham from "@/data/laps_HAM.json";
import ver from "@/data/laps_VER.json";

export async function GET() {
  const length = Math.min(ver.lap_times.length, ham.lap_times.length);

  const delta = Array.from({ length }, (_, i) => 
    ver.lap_times[i] - ham.lap_times[i]
  );

  return NextResponse.json({ delta });
}