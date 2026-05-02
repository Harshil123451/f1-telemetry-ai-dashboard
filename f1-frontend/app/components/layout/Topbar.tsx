"use client";

export default function Topbar() {
  return (
    <header className="flex justify-between items-center px-6 py-3 border-b border-[#1F1F1F] bg-black sticky top-0 z-30">
      <h2 className="text-xl font-bold text-[#E10600] italic">
        TELEMETRY CONTROL
      </h2>

      <span className="text-xs text-gray-400 uppercase">
        Bahrain GP • LIVE
      </span>
    </header>
  );
}