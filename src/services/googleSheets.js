// Google Sheets API Integration Service for Portfolio Backend

export function getGoogleSheetsUrl() {
  return localStorage.getItem("portfolio_sheets_url") || import.meta.env.VITE_GOOGLE_SHEETS_API_URL || "";
}

/**
 * Fetch portfolio data from Google Sheets API
 */
export async function fetchPortfolioFromSheets() {
  const url = getGoogleSheetsUrl();
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    // Ensure valid portfolio data structure before returning
    if (data && typeof data === "object" && data.hero && data.contact) {
      return data;
    }
  } catch (err) {
    console.warn("Could not fetch from Google Sheets API, falling back to local storage:", err);
  }
  return null;
}

/**
 * Save portfolio data to Google Sheets API
 */
export async function savePortfolioToSheets(data) {
  const url = getGoogleSheetsUrl();
  if (!url) return { success: false, reason: "No API URL configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8", // text/plain prevents CORS preflight issue with Google Apps Script
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return { success: true, result };
  } catch (err) {
    console.error("Failed to save data to Google Sheets API:", err);
    return { success: false, error: err };
  }
}
