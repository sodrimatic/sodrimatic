/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Google Apps Script (Code.gs)
 * Backend for Dhriti & Soham Wedding Application.
 * 
 * Target Folders & Spreadsheets:
 * 1. Wishes & Blessings: wishes.xlsx
 * 2. RSVP Responses: RSVPresponse.xlsx
 * 3. Uploaded Photos (Guest Uploads): UploadedPhotos folder
 * 4. Approved Photos (Displayed on Memory Wall): ApprovedPhotos folder
 * 
 * Setup Instructions:
 * 1. Open your Apps Script editor.
 * 2. Replace all code in the editor with this entire Code.gs file.
 * 3. Verify WISHES_SPREADSHEET_ID, RSVP_SPREADSHEET_ID, UPLOADED_PHOTOS_FOLDER_ID, and APPROVED_PHOTOS_FOLDER_ID below.
 * 4. Click Deploy -> Manage deployments -> Edit -> Version: New version -> Deploy.
 */

// Your Wishes Google Sheet (wishes.xlsx):
const WISHES_SPREADSHEET_ID = "https://docs.google.com/spreadsheets/d/13Rk6KXWDrRIZn20IFgO_m8FNmZLycLQCr5QOik-qhHk/edit";

// Your RSVP Google Sheet (RSVPresponse.xlsx):
// Leave as empty string "" to auto-detect "RSVPresponse" in your Google Drive / wedding_website folder,
// or paste your RSVPresponse.xlsx Google Sheet URL/ID here:
const RSVP_SPREADSHEET_ID = "https://docs.google.com/spreadsheets/d/1Lu-HgN44faxWjIFeDYJophmXWI1jU8N4KLPBQhInt7s/edit";

// Google Drive Folder for guest photo uploads (UploadedPhotos):
const UPLOADED_PHOTOS_FOLDER_ID = "https://drive.google.com/drive/folders/1xes_lzI71UHtS_4p16UK4uOeE4V_lLa_";

// Google Drive Folder for approved photos displayed on the wall (ApprovedPhotos):
const APPROVED_PHOTOS_FOLDER_ID = "https://drive.google.com/drive/folders/1A5A4YXsNBvvLPxu3cVsr28lPZBJnKv9r";

/**
 * Test function: In Apps Script editor, select this function and click "Run"
 * to verify it connects to wishes.xlsx!
 */
function testWishesConnection() {
  const ss = getTargetSpreadsheet();
  if (!ss) {
    Logger.log("❌ ERROR: Could not open wishes spreadsheet. Check URL or ensure it's saved as Google Sheets.");
    return;
  }
  Logger.log("✅ Successfully connected to: " + ss.getName() + " [ID: " + ss.getId() + "]");
  const sheet = getWishesSheet(ss);
  Logger.log("✅ Target tab: " + sheet.getName() + " (Last row: " + sheet.getLastRow() + ")");
}

/**
 * Test function: In Apps Script editor, select this function and click "Run"
 * to verify it connects to RSVPresponse.xlsx!
 */
function testRsvpConnection() {
  const ss = getRsvpSpreadsheet();
  if (!ss) {
    Logger.log("❌ ERROR: Could not open RSVPresponse.xlsx spreadsheet.");
    Logger.log("💡 Tip: Open RSVPresponse.xlsx in Google Drive -> File -> Save as Google Sheets, or paste its URL in RSVP_SPREADSHEET_ID at top of Code.gs");
    return;
  }
  Logger.log("✅ Successfully connected to RSVP Sheet: " + ss.getName() + " [ID: " + ss.getId() + "]");
  const sheet = ss.getSheetByName("RSVP") || ss.getSheetByName("Responses") || ss.getSheets()[0];
  Logger.log("✅ Target tab: " + sheet.getName() + " (Last row: " + sheet.getLastRow() + ")");
}

/**
 * Test function: In Apps Script editor, select this function and click "Run"
 * to verify it connects to both UploadedPhotos and ApprovedPhotos folders!
 */
function testPhotoFoldersConnection() {
  const uploadId = extractFolderId(UPLOADED_PHOTOS_FOLDER_ID);
  const approvedId = extractFolderId(APPROVED_PHOTOS_FOLDER_ID);

  try {
    const uploadFolder = DriveApp.getFolderById(uploadId);
    Logger.log("✅ UploadedPhotos folder: " + uploadFolder.getName() + " [ID: " + uploadFolder.getId() + "]");
  } catch (e) {
    Logger.log("❌ Could not open UploadedPhotos folder: " + e.message);
  }

  try {
    const approvedFolder = DriveApp.getFolderById(approvedId);
    Logger.log("✅ ApprovedPhotos folder: " + approvedFolder.getName() + " [ID: " + approvedFolder.getId() + "]");
    let count = 0;
    const files = approvedFolder.getFiles();
    while (files.hasNext()) {
      files.next();
      count++;
    }
    Logger.log("ℹ️ Approved photos count in folder: " + count);
  } catch (e) {
    Logger.log("❌ Could not open ApprovedPhotos folder: " + e.message);
  }
}

/**
 * Extracts clean ID whether user provided a full URL or a raw ID
 */
function extractSpreadsheetId(input) {
  if (!input) return "";
  const match = String(input).match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : String(input).trim();
}

function extractFolderId(input) {
  if (!input) return "";
  const match = String(input).match(/\/folders\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : String(input).trim();
}

/**
 * Resolves the target spreadsheet for Wishes & Blessings
 */
function getTargetSpreadsheet() {
  // 1. Explicit WISHES_SPREADSHEET_ID (URL or ID)
  if (WISHES_SPREADSHEET_ID && WISHES_SPREADSHEET_ID !== "YOUR_SPREADSHEET_ID_HERE") {
    const cleanId = extractSpreadsheetId(WISHES_SPREADSHEET_ID);
    if (cleanId) {
      try {
        return SpreadsheetApp.openById(cleanId);
      } catch (e) {
        console.warn("Could not open by cleanId:", cleanId, e);
      }
    }
    if (String(WISHES_SPREADSHEET_ID).startsWith("http")) {
      try {
        return SpreadsheetApp.openByUrl(WISHES_SPREADSHEET_ID);
      } catch (e) {
        console.warn("Could not open by URL:", e);
      }
    }
  }

  // 2. Container-bound sheet (Extensions -> Apps Script from inside the sheet)
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}

  // 3. Search Drive for any sheet named "wishes" or "Wishes"
  try {
    const fileIter = DriveApp.getFilesByName("wishes");
    while (fileIter.hasNext()) {
      const f = fileIter.next();
      if (f.getMimeType() === MimeType.GOOGLE_SHEETS) {
        return SpreadsheetApp.open(f);
      }
    }
  } catch (e) {}

  // 4. Search Drive: wedding_website folder
  try {
    const root = DriveApp.getRootFolder();
    const fIter = root.getFoldersByName("wedding_website");
    if (fIter.hasNext()) {
      const folder = fIter.next();
      const files = folder.getFiles();
      while (files.hasNext()) {
        const file = files.next();
        const name = file.getName().toLowerCase();
        if (name.includes("wish") && file.getMimeType() === MimeType.GOOGLE_SHEETS) {
          return SpreadsheetApp.open(file);
        }
      }
      // Check subfolders
      const subFolders = folder.getFolders();
      while (subFolders.hasNext()) {
        const sub = subFolders.next();
        const subFiles = sub.getFiles();
        while (subFiles.hasNext()) {
          const file = subFiles.next();
          const name = file.getName().toLowerCase();
          if (name.includes("wish") && file.getMimeType() === MimeType.GOOGLE_SHEETS) {
            return SpreadsheetApp.open(file);
          }
        }
      }
    }
  } catch (err) {
    console.error("Error searching wedding_website in Drive:", err);
  }

  return null;
}

/**
 * Returns the dedicated "Wishes" sheet tab.
 * Ensures it NEVER writes to or reads from click-count / Sheet1 data.
 */
function getWishesSheet(ss) {
  if (!ss) return null;

  // Search case-insensitively for a sheet/tab with 'wish' or 'blessing' in its name
  const allSheets = ss.getSheets();
  for (let i = 0; i < allSheets.length; i++) {
    const name = allSheets[i].getName().toLowerCase().trim();
    if (name.includes("wish") || name.includes("blessing")) {
      return allSheets[i];
    }
  }

  // Look for common tab names
  const preferredNames = ["Wishes", "wishes", "Blessings", "blessings"];
  for (let i = 0; i < preferredNames.length; i++) {
    const s = ss.getSheetByName(preferredNames[i]);
    if (s) return s;
  }

  // Since this is the wishes.xlsx spreadsheet, use first sheet tab
  if (allSheets.length > 0) {
    return allSheets[0];
  }

  return ss.insertSheet("Wishes");
}

/**
 * Resolves the target spreadsheet for RSVP Responses (RSVPresponse.xlsx)
 */
function getRsvpSpreadsheet() {
  // 1. Explicit RSVP_SPREADSHEET_ID (URL or ID)
  if (RSVP_SPREADSHEET_ID && RSVP_SPREADSHEET_ID !== "YOUR_RSVP_SPREADSHEET_URL_OR_ID_HERE") {
    const cleanId = extractSpreadsheetId(RSVP_SPREADSHEET_ID);
    if (cleanId) {
      try {
        return SpreadsheetApp.openById(cleanId);
      } catch (e) {
        console.warn("Could not open RSVP spreadsheet by cleanId:", cleanId, e);
      }
    }
    if (String(RSVP_SPREADSHEET_ID).startsWith("http")) {
      try {
        return SpreadsheetApp.openByUrl(RSVP_SPREADSHEET_ID);
      } catch (e) {
        console.warn("Could not open RSVP spreadsheet by URL:", e);
      }
    }
  }

  // 2. Search Drive for files named "RSVPresponse", "RSVPresponse.xlsx", etc.
  const searchNames = [
    "RSVPresponse",
    "RSVPresponse.xlsx",
    "RSVPResponse",
    "RSVPResponse.xlsx",
    "rsvpresponse",
    "rsvpresponse.xlsx",
    "RSVP response",
    "RSVP response.xlsx"
  ];
  for (let n = 0; n < searchNames.length; n++) {
    try {
      const fileIter = DriveApp.getFilesByName(searchNames[n]);
      while (fileIter.hasNext()) {
        const f = fileIter.next();
        try {
          return SpreadsheetApp.open(f);
        } catch (e) {
          console.warn("Found file " + f.getName() + " but could not open directly: " + e);
        }
      }
    } catch (e) {}
  }

  // 3. Search Drive inside "wedding_website" folder and subfolders
  try {
    const root = DriveApp.getRootFolder();
    const fIter = root.getFoldersByName("wedding_website");
    while (fIter.hasNext()) {
      const folder = fIter.next();
      const files = folder.getFiles();
      while (files.hasNext()) {
        const file = files.next();
        const name = file.getName().toLowerCase();
        if (name.includes("rsvpresponse") || name.includes("rsvp_response") || name.includes("rsvp response")) {
          try {
            return SpreadsheetApp.open(file);
          } catch (e) {}
        }
      }
      // Check subfolders
      const subFolders = folder.getFolders();
      while (subFolders.hasNext()) {
        const sub = subFolders.next();
        const subFiles = sub.getFiles();
        while (subFiles.hasNext()) {
          const file = subFiles.next();
          const name = file.getName().toLowerCase();
          if (name.includes("rsvpresponse") || name.includes("rsvp_response") || name.includes("rsvp response")) {
            try {
              return SpreadsheetApp.open(file);
            } catch (e) {}
          }
        }
      }
    }
  } catch (err) {
    console.error("Error searching wedding_website for RSVPresponse:", err);
  }

  // 4. Fallback search across Drive
  try {
    const iter = DriveApp.searchFiles("title contains 'RSVPresponse' or title contains 'rsvpresponse'");
    while (iter.hasNext()) {
      const file = iter.next();
      try {
        return SpreadsheetApp.open(file);
      } catch (e) {}
    }
  } catch (e) {}

  // 5. Container-bound sheet fallback
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}

  // 6. If not found, auto-create "RSVPresponse" in wedding_website folder or root Drive
  try {
    let targetFolder = null;
    const fIter = DriveApp.getRootFolder().getFoldersByName("wedding_website");
    if (fIter.hasNext()) {
      targetFolder = fIter.next();
    }
    const newSs = SpreadsheetApp.create("RSVPresponse");
    if (targetFolder) {
      const file = DriveApp.getFileById(newSs.getId());
      targetFolder.addFile(file);
      DriveApp.getRootFolder().removeFile(file);
    }
    return newSs;
  } catch (e) {
    console.warn("Could not auto-create RSVPresponse spreadsheet:", e);
  }

  return null;
}

/**
 * Handle GET Requests
 * e.g. ?action=getBlessings, ?action=getWishes, ?action=getPhotos, ?action=ping
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || "ping";

    if (action === "getPhotos") {
      const cache = CacheService.getScriptCache();
      const cached = cache.get("cache_approved_photos");
      if (cached) {
        return ContentService.createTextOutput(cached).setMimeType(ContentService.MimeType.JSON);
      }
      const data = getDrivePhotos();
      try {
        cache.put("cache_approved_photos", JSON.stringify(data), 120);
      } catch (ce) {}
      return jsonResponse(data);
    }

    if (action === "getBlessings" || action === "getWishes") {
      const cache = CacheService.getScriptCache();
      const cached = cache.get("cache_blessings_list");
      if (cached) {
        return ContentService.createTextOutput(cached).setMimeType(ContentService.MimeType.JSON);
      }
      const data = getBlessingsList();
      try {
        cache.put("cache_blessings_list", JSON.stringify(data), 60);
      } catch (ce) {}
      return jsonResponse(data);
    }

    if (action === "getCheers" || action === "getTugOfWar") {
      const cache = CacheService.getScriptCache();
      const cached = cache.get("cache_cheers");
      if (cached) {
        return ContentService.createTextOutput(cached).setMimeType(ContentService.MimeType.JSON);
      }
      const data = getCheerCounts();
      try {
        cache.put("cache_cheers", JSON.stringify(data), 15);
      } catch (ce) {}
      return jsonResponse(data);
    }

    return jsonResponse({
      status: "success",
      message: "Dhriti & Soham Wedding API is active.",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return jsonResponse({ status: "error", error: error.toString() });
  }
}

/**
 * Handle POST Requests
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", message: "No post data received" });
    }

    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;

    if (action === "rsvp") {
      return handleRsvp(payload);
    } else if (action === "uploadPhoto") {
      return handlePhotoUpload(payload);
    } else if (action === "addBlessing" || action === "addWish") {
      return handleBlessing(payload);
    } else if (action === "cheer" || action === "addCheer") {
      return handleCheer(payload);
    } else {
      return jsonResponse({ status: "error", message: "Invalid action: " + action });
    }
  } catch (error) {
    return jsonResponse({ status: "error", error: error.toString() });
  }
}

/**
 * Record wish/blessing in Google Sheet (wishes.xlsx)
 * Appends row: [Timestamp, Wish] (No sender)
 */
function handleBlessing(data) {
  const ss = getTargetSpreadsheet();
  if (!ss) {
    return jsonResponse({
      status: "error",
      message: "Spreadsheet not found. Please verify WISHES_SPREADSHEET_ID in Code.gs."
    });
  }

  const sheet = getWishesSheet(ss);
  if (!sheet) {
    return jsonResponse({
      status: "error",
      message: "Could not access or create wishes sheet tab."
    });
  }

  // If brand new or empty sheet, add header row (no Sender)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Wish"]);
    sheet.getRange(1, 1, 1, 2).setFontWeight("bold");
  }

  const blessingText = data.blessing || data.wish || "";
  if (!blessingText) {
    return jsonResponse({ status: "error", message: "Empty blessing/wish text" });
  }

  sheet.appendRow([
    new Date(),
    blessingText
  ]);

  try {
    CacheService.getScriptCache().remove("cache_blessings_list");
  } catch (ce) {}

  return jsonResponse({
    status: "success",
    message: "Wish recorded with love into wishes sheet!"
  });
}

/**
 * Fetch blessings/wishes list & total count from wishes.xlsx
 */
function getBlessingsList() {
  const ss = getTargetSpreadsheet();
  if (!ss) {
    return { status: "error", message: "Spreadsheet not found", blessings: [], count: 0 };
  }

  const sheet = getWishesSheet(ss);
  if (!sheet) {
    return { status: "success", blessings: [], count: 0 };
  }

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { status: "success", blessings: [], count: 0 };
  }

  const lastCol = Math.max(sheet.getLastColumn(), 2);
  const values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  const blessings = [];
  let totalWishes = 0;

  for (let i = values.length - 1; i >= 0; i--) {
    const row = values[i];
    let text = "";
    let timestamp = row[0];

    // Priority: Column 2 (Wish text in standard [Timestamp, Wish])
    if (row.length >= 2 && row[1] && isNaN(Number(row[1]))) {
      text = String(row[1]).trim();
    } else if (row.length >= 1 && row[0] && isNaN(Number(row[0])) && isNaN(Date.parse(row[0]))) {
      text = String(row[0]).trim();
    } else {
      for (let c = 0; c < row.length; c++) {
        const val = String(row[c] || '').trim();
        if (val && isNaN(Number(val)) && isNaN(Date.parse(val))) {
          text = val;
          break;
        }
      }
    }

    if (text && text.toLowerCase() !== "wish" && text.toLowerCase() !== "blessing") {
      totalWishes++;
      blessings.push({
        timestamp: timestamp,
        text: text
      });
    }
  }

  const finalCount = totalWishes > 0 ? totalWishes : (lastRow - 1);

  return {
    status: "success",
    count: finalCount,
    blessings: blessings.slice(0, 30)
  };
}

/**
 * ==============================================================
 * Tug of War Cheers Management (PropertiesService + Sheet Sync)
 * ==============================================================
 */

/**
 * Fetch latest cheer scores (Bride & Groom)
 */
function getCheerCounts() {
  const props = PropertiesService.getScriptProperties();
  let bride = props.getProperty("cheers_bride");
  let groom = props.getProperty("cheers_groom");

  // If not yet in script properties, initialize from Google Sheet or fallback to 148
  if (bride === null || groom === null) {
    const sheetData = readCheersFromSheet();
    bride = String(sheetData.bride);
    groom = String(sheetData.groom);
    try {
      props.setProperty("cheers_bride", bride);
      props.setProperty("cheers_groom", groom);
    } catch (e) {}
  }

  return {
    status: "success",
    bride: parseInt(bride, 10) || 148,
    groom: parseInt(groom, 10) || 148,
    timestamp: new Date().toISOString()
  };
}

/**
 * Handle batched cheer increments from guests
 */
function handleCheer(data) {
  const brideDelta = parseInt(data.brideDelta || (data.team === "bride" ? (data.delta || 1) : 0), 10) || 0;
  const groomDelta = parseInt(data.groomDelta || (data.team === "groom" ? (data.delta || 1) : 0), 10) || 0;

  const props = PropertiesService.getScriptProperties();
  let bride = parseInt(props.getProperty("cheers_bride") || "0", 10);
  let groom = parseInt(props.getProperty("cheers_groom") || "0", 10);

  if (bride <= 0 || groom <= 0) {
    const sheetData = readCheersFromSheet();
    if (bride <= 0) bride = sheetData.bride;
    if (groom <= 0) groom = sheetData.groom;
  }

  bride += brideDelta;
  groom += groomDelta;

  try {
    props.setProperty("cheers_bride", String(bride));
    props.setProperty("cheers_groom", String(groom));
  } catch (e) {}

  // Invalidate Cache
  try {
    CacheService.getScriptCache().remove("cache_cheers");
  } catch (e) {}

  // Synchronize to TugOfWar sheet tab in wishes.xlsx
  syncCheersToSheet(bride, groom);

  return jsonResponse({
    status: "success",
    bride: bride,
    groom: groom,
    timestamp: new Date().toISOString()
  });
}

/**
 * Read cheers from "TugOfWar" sheet tab in wishes.xlsx
 */
function readCheersFromSheet() {
  try {
    const ss = getTargetSpreadsheet();
    if (!ss) return { bride: 148, groom: 148 };

    let sheet = ss.getSheetByName("TugOfWar") || ss.getSheetByName("Cheers");
    if (!sheet) {
      // Auto-create sheet tab with initial values
      sheet = ss.insertSheet("TugOfWar");
      sheet.appendRow(["Team", "Cheers", "Last Updated"]);
      sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
      sheet.appendRow(["Bride", 148, new Date()]);
      sheet.appendRow(["Groom", 148, new Date()]);
      return { bride: 148, groom: 148 };
    }

    const values = sheet.getRange(2, 1, 2, 2).getValues();
    let bride = 148;
    let groom = 148;

    for (let i = 0; i < values.length; i++) {
      const team = String(values[i][0]).toLowerCase();
      const val = parseInt(values[i][1], 10);
      if (!isNaN(val)) {
        if (team.includes("bride")) bride = val;
        if (team.includes("groom")) groom = val;
      }
    }

    return { bride, groom };
  } catch (e) {
    console.warn("Could not read cheers from sheet:", e);
    return { bride: 148, groom: 148 };
  }
}

/**
 * Sync updated scores into "TugOfWar" sheet tab
 */
function syncCheersToSheet(bride, groom) {
  try {
    const ss = getTargetSpreadsheet();
    if (!ss) return;

    let sheet = ss.getSheetByName("TugOfWar") || ss.getSheetByName("Cheers");
    if (!sheet) {
      sheet = ss.insertSheet("TugOfWar");
      sheet.appendRow(["Team", "Cheers", "Last Updated"]);
      sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
      sheet.appendRow(["Bride", bride, new Date()]);
      sheet.appendRow(["Groom", groom, new Date()]);
      return;
    }

    sheet.getRange(2, 2, 1, 2).setValues([[bride, new Date()]]);
    sheet.getRange(3, 2, 1, 2).setValues([[groom, new Date()]]);
  } catch (e) {
    console.warn("Could not sync cheers to sheet:", e);
  }
}

/**
 * Store Base64 Photo in "UploadedPhotos" Google Drive folder
 */
function handlePhotoUpload(data) {
  if (!data.base64) {
    return jsonResponse({ status: "error", message: "Missing base64 data" });
  }

  let folder = null;
  const cleanUploadFolderId = extractFolderId(UPLOADED_PHOTOS_FOLDER_ID);
  if (cleanUploadFolderId) {
    try {
      folder = DriveApp.getFolderById(cleanUploadFolderId);
    } catch (err) {
      console.warn("Could not open UploadedPhotos folder by ID:", cleanUploadFolderId, err);
    }
  }

  // Fallback search by folder name "UploadedPhotos"
  if (!folder) {
    try {
      const iter = DriveApp.getFoldersByName("UploadedPhotos");
      if (iter.hasNext()) folder = iter.next();
    } catch (e) {}
  }

  if (!folder) {
    folder = DriveApp.getRootFolder();
  }

  let base64String = data.base64;
  let mimeType = data.mimeType || "image/jpeg";

  if (base64String.indexOf(",") > -1) {
    const parts = base64String.split(",");
    const meta = parts[0];
    base64String = parts[1];
    if (meta.indexOf("image/png") > -1) mimeType = "image/png";
    if (meta.indexOf("image/webp") > -1) mimeType = "image/webp";
  }

  const decodedBytes = Utilities.base64Decode(base64String);
  const fileName = "wedding_upload_" + new Date().getTime() + (mimeType === "image/png" ? ".png" : ".jpg");
  const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);

  const file = folder.createFile(blob);
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {}

  if (data.caption) {
    file.setDescription(data.caption);
  }

  const fileId = file.getId();
  const directUrl = "https://lh3.googleusercontent.com/d/" + fileId;

  try {
    CacheService.getScriptCache().remove("cache_approved_photos");
  } catch (ce) {}

  return jsonResponse({
    status: "success",
    message: "Photo uploaded to UploadedPhotos successfully!",
    fileId: fileId,
    url: directUrl,
    caption: data.caption || "",
    timestamp: new Date().toISOString()
  });
}

/**
 * Fetch approved photos from "ApprovedPhotos" Google Drive folder
 */
function getDrivePhotos() {
  try {
    let folder = null;
    const cleanApprovedFolderId = extractFolderId(APPROVED_PHOTOS_FOLDER_ID);
    if (cleanApprovedFolderId) {
      try {
        folder = DriveApp.getFolderById(cleanApprovedFolderId);
      } catch (err) {
        console.warn("Could not open ApprovedPhotos folder by ID:", cleanApprovedFolderId, err);
      }
    }

    // Fallback search by folder name "ApprovedPhotos"
    if (!folder) {
      try {
        const iter = DriveApp.getFoldersByName("ApprovedPhotos");
        if (iter.hasNext()) folder = iter.next();
      } catch (e) {}
    }

    if (!folder) {
      return { status: "success", count: 0, photos: [] };
    }

    // Set folder-level public view access once rather than per-file in loop
    try {
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {}

    const files = folder.getFiles();
    const photoList = [];

    while (files.hasNext() && photoList.length < 50) {
      const file = files.next();
      const mime = file.getMimeType();
      if (mime.indexOf("image/") > -1) {
        const fileId = file.getId();
        photoList.push({
          id: fileId,
          url: "https://lh3.googleusercontent.com/d/" + fileId,
          caption: file.getDescription() || "Cherished memory",
          date: file.getDateCreated().toISOString()
        });
      }
    }

    return { status: "success", count: photoList.length, photos: photoList };
  } catch (e) {
    return { status: "error", error: e.toString(), photos: [] };
  }
}

/**
 * Append RSVP row to Google Sheet (RSVPresponse.xlsx)
 */
function handleRsvp(data) {
  const ss = getRsvpSpreadsheet();
  if (!ss) {
    return jsonResponse({
      status: "error",
      message: "RSVP spreadsheet (RSVPresponse.xlsx) not found. Please verify RSVP_SPREADSHEET_ID in Code.gs."
    });
  }

  // Target tab: "RSVP", "Responses", "Sheet1", or first available sheet tab
  let sheet = ss.getSheetByName("RSVP") || ss.getSheetByName("Responses") || ss.getSheetByName("Sheet1") || (ss.getSheets().length > 0 ? ss.getSheets()[0] : null);
  if (!sheet) {
    sheet = ss.insertSheet("RSVP");
  }

  // If brand new or empty sheet, add clean 4-column header row
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Full Name", "Attending", "Message"]);
    sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
  }

  // Check existing sheet headers to map columns dynamically without shifting
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const rawHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const headers = rawHeaders.map(function(h) {
    return String(h).toLowerCase().trim();
  });

  const hasDietaryCol = headers.some(function(h) { return h.indexOf("diet") > -1; });
  const hasGuestCol = headers.some(function(h) { return h.indexOf("guest") > -1; });

  if (hasDietaryCol || hasGuestCol) {
    // Map dynamically to existing headers
    const row = headers.map(function(h) {
      if (h.indexOf("time") > -1 || h.indexOf("date") > -1) return new Date();
      if (h.indexOf("name") > -1) return data.name || "Anonymous";
      if (h.indexOf("attend") > -1) return data.attending ? "Joyfully Accepts" : "Regretfully Declines";
      if (h.indexOf("guest") > -1) return data.guests || (data.attending ? "Attending" : "-");
      if (h.indexOf("diet") > -1) return data.dietary || "-";
      if (h.indexOf("mess") > -1 || h.indexOf("note") > -1 || h.indexOf("wish") > -1) return data.message || "";
      return "";
    });
    sheet.appendRow(row);
  } else {
    sheet.appendRow([
      new Date(),
      data.name || "Anonymous",
      data.attending ? "Joyfully Accepts" : "Regretfully Declines",
      data.message || ""
    ]);
  }

  return jsonResponse({
    status: "success",
    message: "RSVP recorded successfully into RSVPresponse!"
  });
}

/**
 * Return JSON response with CORS headers
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
