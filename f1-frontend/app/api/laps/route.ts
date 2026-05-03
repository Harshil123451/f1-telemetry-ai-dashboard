import { NextResponse } from "next/server";
import laps from "@/data/laps.json";

export async function GET() {
  return NextResponse.json(laps);
}