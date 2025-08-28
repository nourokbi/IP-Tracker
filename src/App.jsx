/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import ViewLocation from "./components/ViewLocation";
import MyMap from "./components/MyMap";

function App() {
  const [ipAddress, setIpAddress] = useState("");
  const [locationData, setLocationData] = useState(null);
  const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_PibClQ7PRQ3IQmJ165EpSCUreuaMg&ipAddress=${ipAddress}`;

  function handleSearch(e) {
    e.preventDefault();
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
      });
    console.log(locationData);
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
