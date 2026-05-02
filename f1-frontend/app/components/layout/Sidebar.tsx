"use client";

export default function Sidebar() {
  return (
    <nav className="hidden md:flex flex-col bg-[#121212] border-r border-[#1F1F1F] h-screen w-64 fixed left-0 top-0 z-40">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#E10600] italic">PIT WALL</h1>
        <p className="text-xs text-neutral-500 mt-2">ENGINEER ID: 8824</p>
      </div>

      <div className="flex-1 flex flex-col gap-2 mt-4">
        <button className="bg-neutral-800 text-[#E10600] border-l-4 border-[#E10600] py-4 px-6 text-left">
          Live Feed
        </button>
        <button className="text-neutral-500 py-4 px-6 text-left hover:text-white">
          Lap Analysis
        </button>
        <button className="text-neutral-500 py-4 px-6 text-left hover:text-white">
          Driver Compare
        </button>
      </div>
    </nav>
  );
}