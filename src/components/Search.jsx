/* eslint-disable no-unused-vars */
import { useState } from "react";
import arrowIcon from "../assets/icon-arrow.svg";
function Search({ onSearch, setIpAddress, ipAddress }) {
  

  return (
    <div className="search">
      <div className="container">
        <h1>IP Address Tracker</h1>
        <div className="search-input">
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => {
              setIpAddress(e.target.value);
            }}
            placeholder="Search for any IP address or domain"
          />
          <button onClick={(e) => onSearch(e)}>
            <img src={arrowIcon} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
