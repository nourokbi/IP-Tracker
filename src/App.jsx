/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import ViewLocation from "./components/ViewLocation";
import MyMap from "./components/MyMap";

function App() {
  const [ipAddress, setIpAddress] = useState("");
  const [locationData, setLocationData] = useState(null);
  const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_PibClQ7PRQ3IQmJ165EpSCUreuaMg&ipAddress=${
    ipAddress ? ipAddress : ""
  }`;
  // function validateAddress(address) {
  //   // Basic IP address validation regex
  //   const ipRegex =
  //     /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  //   const domainRegex =
  //     /^(?!-)(?:[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,6}$/;
  //   if (!ipRegex.test(address) && !domainRegex.test(address)) {
  //     setIpAddress("");
  //     document.querySelector(".no-data").classList.add("active");
  //     document.querySelector(".no-data").textContent =
  //       "Please enter a valid IP address or domain";
  //     // alert("Please enter a valid IP address or domain");
  //   }
  // }

  function handleSearch(e) {
    e.preventDefault();
    // Fetch location data from the API
    // if (ipAddress !== "" && validateAddress(ipAddress)) {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
      });
  }

  return (
    <>
      <Search
        setIpAddress={setIpAddress}
        onSearch={handleSearch}
        ipAddress={ipAddress}
      />
      <ViewLocation locationData={locationData} />
      <MyMap
        lat={locationData?.location?.lat}
        lng={locationData?.location?.lng}
      />
    </>
  );
}

export default App;
