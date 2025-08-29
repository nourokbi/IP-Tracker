import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import ViewLocation from "./components/ViewLocation";
import MyMap from "./components/MyMap";

function App() {
  const [ipAddress, setIpAddress] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_PibClQ7PRQ3IQmJ165EpSCUreuaMg&`;
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

  function handleSearch(e) {
    e.preventDefault();
    // Fetch location data from the API
    const addressDetails = validateAddress(ipAddress);
    if (addressDetails.type) {
      setIsLoading(true);
      fetch(API_URL + addressDetails.type + "=" + addressDetails.value)
        .then((response) => response.json())
        .then((data) => {
          setLocationData(data);
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      <Search
        setIpAddress={setIpAddress}
        onSearch={handleSearch}
        ipAddress={ipAddress}
      />
      <ViewLocation locationData={locationData} isLoading={isLoading}/>
      <MyMap
        lat={locationData?.location?.lat}
        lng={locationData?.location?.lng}
      />
    </>
  );
}

export default App;
