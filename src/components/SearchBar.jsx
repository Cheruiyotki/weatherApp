import { Search } from "lucide-react";
import React from "react";

function SearchBar() {
    return (
        <div className="relative "> 
            <form className="relative" action="">
                <div className="relative group">
                  <Search  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-white transition-all" />
                  <input type="text" className="w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-white/15" />
                </div>
            </form>
        </div>
    )
}

export default SearchBar;