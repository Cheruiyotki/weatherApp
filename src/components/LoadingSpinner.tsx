import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-white/20 border-t-white/90 rounded-full animate-spin shadow-lg" />

        {/* Inner Ring (Spins in reverse with smaller diameter) */}
        <div className="w-12 h-12 border-2 border-blue-300/20 border-b-blue-300/80 rounded-full animate-spin [animation-direction:reverse]" />

        {/* Center Glowing Dot */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 bg-white/70 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;