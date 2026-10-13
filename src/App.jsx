import React from "react";

 
import bgImage from "./assets/background.webp"

function App() {
  return (
     <div className="relative   min-h-screen overflow-hidden"> 
     {/* Background Image with Overlay */}
     <div className="absolute inset-0 bg-cover bg-center bg-no-repeat " style={{backgroundImage: `url(${bgImage})`}}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
            Weather <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              App
            </span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">Experience weather like never before with real-time data, beautiful visuals, and precise forecasts for any locations worldwide.</p>
        </div>
      </div>

     </div>
     </div>
      
     </div>
  );
}

export default App;