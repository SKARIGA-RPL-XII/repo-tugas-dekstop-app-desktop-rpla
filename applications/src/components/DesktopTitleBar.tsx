import { Minus, Square, X } from "lucide-react";

export default function DesktopTitleBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-10 bg-[#010c24] flex justify-between items-center px-3 select-none draggable z-[9999]">
      <div className="flex items-center gap-2 text-white text-sm">
        <img src="/src/assets/logo-collapse.svg" className="w-5 h-5" />
        <span>SKARPOS</span>
      </div>
      <div className="flex no-drag">
        <button onClick={() => window.electron.minimize()} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-white">
          <Minus strokeWidth={1} size={16} />
        </button>
        <button onClick={() => window.electron.maximize()} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-white">
          <Square strokeWidth={1} size={14} />
        </button>
        <button onClick={() => window.electron.close()} className="w-10 h-10 flex items-center justify-center hover:bg-red-500 text-white">
          <X strokeWidth={1} size={16} />
        </button>
      </div>
    </div>
  );
}
