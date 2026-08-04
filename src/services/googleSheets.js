// Google Sheets Apps Script API integration service

const GOOGLE_SHEETS_API_URL = import.meta.env?.VITE_GOOGLE_SHEETS_URL || "";

export function getGoogleSheetsUrl() {
  return GOOGLE_SHEETS_API_URL;
}

/**
 * Fetch portfolio configuration data from remote Google Sheets Apps Script backend
 */
export async function fetchPortfolioFromSheets() {
  if (!GOOGLE_SHEETS_API_URL) {
    return null;
  }
  try {
    const response = await fetch(GOOGLE_SHEETS_API_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Google Sheets fetch failed or disabled:", error);
    return null;
  }
}

/**
 * Save portfolio data or contact message to Google Sheets Apps Script backend
 */
export async function savePortfolioToSheets(payload) {
  if (!GOOGLE_SHEETS_API_URL) {
    return false;
  }
  try {
    const response = await fetch(GOOGLE_SHEETS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8" // avoiding CORS preflight for Apps Script POST if needed
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.warn("Google Sheets save failed or disabled:", error);
    return false;
  }
}
