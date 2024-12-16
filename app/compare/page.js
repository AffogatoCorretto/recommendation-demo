"use client";

import { useState } from "react";
import { fetchBackendData, fetchGoogleResults } from "../../utils/api";

export default function Compare() {
  const [query, setQuery] = useState("");
  const [backendResults, setBackendResults] = useState([]);
  const [googleResults, setGoogleResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return alert("Please enter a search query.");

    const backendData = await fetchBackendData(query);
    setBackendResults(backendData);

    const googleData = await fetchGoogleResults(query);
    setGoogleResults(googleData);
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "40px",
        backgroundColor: "#F6F6F6",
        minHeight: "100vh",
        color: "#222",
      }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            letterSpacing: "2px",
            color: "#333",
          }}
        >
          COMPARE
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            letterSpacing: "1px",
          }}
        >
          Search, Compare, and Explore with Precision
        </p>
      </header>

      {/* Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a query..."
          style={{
            padding: "15px",
            width: "400px",
            marginRight: "10px",
            border: "2px solid #222",
            borderRadius: "0",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "15px 30px",
            backgroundColor: "#FF5700",
            color: "#FFF",
            border: "none",
            borderRadius: "0",
            fontSize: "16px",
            cursor: "pointer",
            letterSpacing: "1px",
          }}
        >
          SEARCH
        </button>
      </div>

      {/* Results Section */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          justifyContent: "space-between",
        }}
      >
        {/* Backend Results */}
        <section
          style={{
            flex: "1",
            backgroundColor: "#FFF",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderLeft: "8px solid #FF5700",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              borderBottom: "2px solid #222",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Backend Results
          </h2>
          {backendResults.length > 0 ? (
            backendResults.map((item) => (
              <div
                key={item.item_id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #EEE",
                  paddingBottom: "15px",
                }}
              >
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/120"}
                  alt={item.item_name}
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "5px",
                      color: "#333",
                    }}
                  >
                    {item.item_name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    {item.description}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#FF5700",
                      marginTop: "10px",
                    }}
                  >
                    Category: {item.category}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#888" }}>No backend results yet.</p>
          )}
        </section>

        {/* Google Results */}
        <section
          style={{
            flex: "1",
            backgroundColor: "#FFF",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderLeft: "8px solid #007BFF",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              borderBottom: "2px solid #222",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Google Results
          </h2>
          {googleResults.length > 0 ? (
            googleResults.map((result, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                  borderBottom: "1px solid #EEE",
                  paddingBottom: "10px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "5px",
                    color: "#333",
                  }}
                >
                  {result.title}
                </h3>
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "14px",
                    color: "#007BFF",
                    textDecoration: "none",
                  }}
                >
                  {result.link}
                </a>
              </div>
            ))
          ) : (
            <p style={{ color: "#888" }}>No Google results yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
