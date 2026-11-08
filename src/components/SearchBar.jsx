import { MapPin, Search, X } from "lucide-react";
import React, { useState } from "react";

function SearchBar({ onSearch, onLocationSearch, loading }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Handle form submission (when user presses Enter)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setShowSuggestions(false); // Hide dropdown on search
            setQuery(""); // Clear input box
        }
 
    };

    return (
        <div className="relative max-w-2xl w-full mx-auto"> 
            <form className="relative" onSubmit={handleSubmit}>
                <div className="relative group">
                    {/* Fixed w-50 typo to w-5 */}
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-white transition-all" />
                    
                    <input
                       type="text"
                       value={query}
                       onChange={(e) => setQuery(e.target.value)}
                       onFocus={() => setShowSuggestions(true)}
                       placeholder="Search for any city..."
                       className="w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
                         
                    />
                     
                    {/* Clear Button (Wipes input text) */}
                    {query && (
                        <button 
                            type="button"
                            onClick={() => setQuery("")}
                            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}

                    {/* Geolocation Button (Triggers onLocationSearch from App.jsx) */}
                    <button 
                        type="button"
                        onClick={onLocationSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
                        disabled={loading}
                    >
                        <MapPin className="w-5 h-5" />
                    </button>
                </div>
            </form>

            {/* Suggestions Dropdown (Will display when you wire up live autocomplete data) */}
            {showSuggestions && (suggestions.length > 0 || isLoading) && ( 
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
                    {isLoading ? (
                        <div className="p-6 text-center text-white/70">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto"></div>
                            <p className="mt-2">Searching cities...</p>
                        </div>
                    ) : (
                        suggestions.map((city, index) => (
                            <button 
                                key={index}
                                onClick={() => {
                                    onSearch(city.name);
                                    setQuery("");
                                    setShowSuggestions(false);
                                }}
                                className="w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-300 flex items-center justify-between group border-b border-white/20 last:border-b-0"
                            >
                                <div className="font-medium text-white group-hover:text-white/90">
                                    {city.name}
                                    <span className="text-white/60 text-sm">, {city.country}</span>
                                </div>
                                <Search className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-all" />
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;