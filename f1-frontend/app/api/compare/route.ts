import { NextResponse } from "next/server";
import ham from "@/data/laps_HAM.json";
import ver from "@/data/laps_VER.json";

export async function GET() {
  return NextResponse.json({
    VER: ver,
    HAM: ham,
  });
}