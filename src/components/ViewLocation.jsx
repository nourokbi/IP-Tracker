import React from "react";

function ViewLocation({ locationData }) {
  return (
    <div className="container">
      <div className="location-info">
        {locationData ? (
          <>
            <div>
              <h3>IP Address</h3>
              <span>{locationData.ip}</span>
            </div>
            <div>
              <h3>Location</h3>
              <span>{`${locationData.location.city}, ${
                locationData.location.country
              }, ${
                locationData.location.postalCode
                  ? locationData.location.postalCode
                  : "No ZIP Provided"
              }`}</span>
            </div>
            <div>
              <h3>TimeZone</h3>
              <span>{"UTC " + locationData.location.timezone}</span>
            </div>
            <div>
              <h3>ISP</h3>
              <span>
                {locationData.location.isp
                  ? locationData.location.isp
                  : "No ISP Provided"}
              </span>
            </div>
          </>
        ) : (
          <p>No location data available, Search for an IP address</p>
        )}
      </div>
    </div>
  );
}

export default ViewLocation;
