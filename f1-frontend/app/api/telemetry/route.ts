import { NextResponse } from "next/server";
import telemetry from "@/data/telemetry.json";

export async function GET() {
  return NextResponse.json(telemetry);
}