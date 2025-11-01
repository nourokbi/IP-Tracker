import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";

function ViewLocation({ locationData, isLoading, error }) {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const exportAsCSV = () => {
    if (!locationData) return;

    const csvContent = [
      ["Field", "Value"],
      ["IP Address", locationData.ip],
      ["City", locationData.location.city],
      ["Country", locationData.location.country],
      ["Postal Code", locationData.location.postalCode || "N/A"],
      ["Timezone", locationData.location.timezone],
      ["Latitude", locationData.location.lat],
      ["Longitude", locationData.location.lng],
      ["ISP", locationData.isp || "N/A"],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ip-tracker-${locationData.ip}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="location-info">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : locationData ? (
          <>
            {locationData && (
              <button
                className="export-btn-corner"
                onClick={exportAsCSV}
                title="Export as CSV"
              >
                <Download size={16} />
              </button>
            )}
            <div className="info-grid">
              <div className="info-item">
                <h3 title="Your public IP address visible to websites and services">
                  IP Address
                </h3>
                <div className="value-with-copy">
                  <span>{locationData.ip}</span>
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(locationData.ip, "ip")}
                    title="Copy IP Address"
                  >
                    {copiedField === "ip" ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="info-item">
                <h3 title="Physical location associated with this IP address">
                  Location
                </h3>
                <div className="value-with-copy">
                  <span>
                    {`${locationData.location.city}, ${locationData.location.country}, `}
                    <br />
                    {locationData.location.postalCode
                      ? locationData.location.postalCode
                      : " No ZIP Provided"}
                  </span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      copyToClipboard(
                        `${locationData.location.city}, ${
                          locationData.location.country
                        }${
                          locationData.location.postalCode
                            ? ", " + locationData.location.postalCode
                            : ""
                        }`,
                        "location"
                      )
                    }
                    title="Copy Location"
                  >
                    {copiedField === "location" ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="info-item">
                <h3 title="Local time zone at this location">TimeZone</h3>
                <div className="value-with-copy">
                  <span>{"UTC " + locationData.location.timezone}</span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      copyToClipboard(
                        "UTC " + locationData.location.timezone,
                        "timezone"
                      )
                    }
                    title="Copy Timezone"
                  >
                    {copiedField === "timezone" ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="info-item">
                <h3 title="Internet Service Provider managing this IP address">
                  ISP
                </h3>
                <div className="value-with-copy">
                  <span>
                    {locationData.isp ? locationData.isp : `No ISP Provided`}
                  </span>
                  {locationData.isp && (
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(locationData.isp, "isp")}
                      title="Copy ISP"
                    >
                      {copiedField === "isp" ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="no-data">
            No location data available, Search for an IP address
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewLocation;
