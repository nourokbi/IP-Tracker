import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";

function Search({ onSearch, setIpAddress, ipAddress }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search to recent searches
  const saveToRecent = (search) => {
    const updated = [
      search,
      ...recentSearches.filter((s) => s !== search),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const defaultSuggestions = [
    "8.8.8.8",
    "1.1.1.1",
    "102.43.68.253",
    "102.43.15.25",
    "google.com",
  ];

  // Combine recent searches with default suggestions
  const suggestions =
    recentSearches.length > 0
      ? [
          ...recentSearches,
          ...defaultSuggestions.filter((s) => !recentSearches.includes(s)),
        ].slice(0, 5)
      : defaultSuggestions;

  const handleSuggestionClick = (suggestion) => {
    setIpAddress(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    saveToRecent(suggestion);
    // Trigger search immediately with the selected suggestion
    onSearch(null, suggestion);
  };

  const handleSearch = (e) => {
    if (ipAddress.trim()) {
      saveToRecent(ipAddress);
    }
    onSearch(e);
  };

  const handleClear = () => {
    setIpAddress("");
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else if (ipAddress.trim()) {
        setShowSuggestions(false);
        handleSearch(e);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="search">
      <div className="container">
        <h1>IP Address Tracker</h1>
        <div className="search-input">
          <div className="input-wrapper">
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => {
                setIpAddress(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search for any IP address or domain"
            />
            {ipAddress && (
              <button className="clear-btn" onClick={handleClear} type="button">
                <X size={20} />
              </button>
            )}
            {showSuggestions && (
              <div className="suggestions-dropdown">
                {recentSearches.length > 0 && (
                  <div className="suggestion-header">Recent Searches</div>
                )}
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`suggestion-item ${
                      index === selectedIndex ? "selected" : ""
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleSearch}>
            <SearchIcon size={20} />
          </button>
          <p>Please enter a valid IP address or domain</p>
        </div>
      </div>
    </div>
  );
}

export default Search;
