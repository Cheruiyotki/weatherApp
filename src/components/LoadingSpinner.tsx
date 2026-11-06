import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-17">
      <div className="relative ">
        {/* Outer Ring */}
        <div className="w-20 h-20 inset-0 border-4 border-white/20 border-t-white/90 rounded-full animate-spin shadow-lg" />

        {/* Inner Ring (Spins in reverse with smaller diameter) */}
        <div className="w-12 inset-2 h-12 absolute h-12 border-3 border-blue-300/20 border-b-blue-300/80 rounded-full animate-spin [animation-direction:reverse] animate-delay-150" />

        {/* Center Glowing Dot */}
        <div className="absolute inset-0 flex items-center justify-center  ">
          <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;