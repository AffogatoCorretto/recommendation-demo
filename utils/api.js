import axios from "axios";
import crypto from "crypto-browserify";

const SECRET = "1cHACoP9eDTHurLkCZJcD7NyxfBkve0S";

/**
 * Generate HMAC SHA-256 hash for a given data and secret
 * @param {string} data - The stringified payload or query string
 * @param {string} secret - The shared secret key
 * @returns {string} - HMAC SHA-256 hash
 */
function generateHash(data, secret) {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

/**
 * Fetch data from the backend API with HMAC authentication
 * @param {string} query - The search query
 * @returns {Promise<Array>} - The data result from the backend API
 */
export async function fetchBackendData(query) {
  try {
    const body = { query, model: "openai" };
    const hash = generateHash(JSON.stringify(body), SECRET);

    const response = await axios.post(
      "https://backend-ai.backd-api.workers.dev/search",
      body,
      {
        headers: { Authorization: `Bearer ${hash}` },
      }
    );

    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching backend data:", error);
    return [];
  }
}

/**
 * Fetch mocked Google search results
 * @param {string} query - The search query
 * @returns {Promise<Array>} - Mocked Google search results
 */
export async function fetchGoogleResults(query) {
  return [
    { title: "Result 1", link: "https://example.com/1" },
    { title: "Result 2", link: "https://example.com/2" },
  ];
}
