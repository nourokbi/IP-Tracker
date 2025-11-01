import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import "./App.css";
import Search from "./components/Search";
import ViewLocation from "./components/ViewLocation";
import MyMap from "./components/MyMap";

function App() {
  const [ipAddress, setIpAddress] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_PibClQ7PRQ3IQmJ165EpSCUreuaMg&`;

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(savedTheme === "true");
    }
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function validateAddress(address) {
    // Basic IP address validation regex
    const searchType = {
      type: "",
      value: address,
    };
    // creating IP regex
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    // if it's an IP
    if (ipRegex.test(address)) {
      searchType.type = "ipAddress";
      document.querySelector(".search-input").classList.remove("error");
      return searchType;
    }
    const domainRegex =
      /^(?!-)(?:[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,6}$/;
    if (domainRegex.test(address)) {
      searchType.type = "domain";
      document.querySelector(".search-input").classList.remove("error");
      return searchType;
    }
    document.querySelector(".search-input").classList.add("error");
    return searchType;
  }

  function handleSearch(e, suggestion = null) {
    if (e) e.preventDefault();
    // Use suggestion if provided, otherwise use ipAddress state
    const addressToSearch = suggestion || ipAddress;
    // Fetch location data from the API
    const addressDetails = validateAddress(addressToSearch);
    if (addressDetails.type) {
      setIsLoading(true);
      setError(null);
      fetch(API_URL + addressDetails.type + "=" + addressDetails.value)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLocationData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch location data. Please try again.");
          setIsLoading(false);
          console.error("Error fetching data:", err);
        });
    }
  }

  // Auto-detect user's IP on initial load
  useEffect(() => {
    // Check if URL has a search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");

    if (searchParam) {
      // If there's a search parameter, use it
      setIpAddress(searchParam);
      handleSearch(null, searchParam);
    } else {
      // Otherwise, auto-detect user's IP
      setIsLoading(true);
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setLocationData(data);
          setIpAddress(data.ip);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Failed to auto-detect your IP address.");
          setIsLoading(false);
          console.error("Error auto-detecting IP:", err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      <Search
        setIpAddress={setIpAddress}
        onSearch={handleSearch}
        ipAddress={ipAddress}
      />
      <ViewLocation
        locationData={locationData}
        isLoading={isLoading}
        error={error}
      />
      <MyMap
        lat={locationData?.location?.lat}
        lng={locationData?.location?.lng}
        locationData={locationData}
        darkMode={darkMode}
      />
    </>
  );
}

export default App;
