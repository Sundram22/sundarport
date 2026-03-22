/**
 * Google Apps Script — Contact Form Handler
 * Portfolio V2 — Sundram Tiwari
 * 
 * SETUP:
 * 1. Google Sheet mein jao → Extensions → Apps Script
 * 2. Ye poora code paste karo
 * 3. SHEET_ID neeche apna daalo
 * 4. Save → testDoPost run karo (Allow karo)
 * 5. Deploy → New Deployment → Web App → Anyone
 * 6. URL copy karo → js/main.js mein GOOGLE_SCRIPT_URL mein daalo
 */

// ⚠️ APNI GOOGLE SHEET KA ID YAHAN DAALO
var SHEET_ID = '1YsNJCk6YcYE2Ycfw5lfOOO-Jcfh23vHpesXiZiX1cpY';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
    }

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN"),
      data.name    || "",
      data.email   || "",
      data.subject || "",
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success", status: "API running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function testDoPost() {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  sheet.appendRow([
    new Date().toLocaleString("en-IN"),
    "TEST USER",
    "test@email.com",
    "Test Subject",
    "Test message from Apps Script!"
  ]);
  Logger.log("✅ Success! Sheet mein row add ho gayi.");
}
