# Building Ultimate Scheduler

This guide explains how to build the application into a standalone Windows executable (`.exe`).

## Quick Start (Recommended)

We have provided a helper script to automate the build process and check for common issues.

1.  **Move the folder**: Ensure this project folder is **NOT** inside OneDrive. (e.g., move it to `C:\Ultimate_Scheduler`).
    *   *Why?* OneDrive syncing locks files and causes "Operation not permitted" errors during the build.
2.  Double-click **`build_executable.bat`**.
3.  Wait for the process to finish.
4.  Find your app in the `dist` folder!

---

## Manual Build Instructions

If you prefer to run commands manually:

### Prerequisites

1.  **Node.js**: Ensure Node.js is installed (Version 18+).
2.  **Internet Connection**: Required to download Electron binaries.

### Steps

1.  Open a terminal (Command Prompt or PowerShell) in the project folder.
2.  Run the following commands:

```bash
npm install
npm run dist
```

## Output

Once the build finishes, look in the `dist/` folder. You will see:

1.  **`Ultimate Scheduler Setup 2.0.1.exe`**: Standard installer. Installs the app to your computer.
2.  **`UltimateScheduler_Portable.exe`**: Portable version. You can copy this single file to a USB stick and run it anywhere.

## Troubleshooting

### "Operation not permitted" / EPERM Errors
If you see errors like `EPERM: operation not permitted` or `rmdir` failed:
*   **Cause**: You are likely running this inside a **OneDrive** synced folder (`C:\Users\Name\OneDrive\...`).
*   **Fix**: Move the entire project folder to a non-synced location, such as `C:\Ultimate_Scheduler` or `C:\Users\Name\Documents\Ultimate_Scheduler` (if Documents is not synced).

### "Python not found" / "node-gyp failed"
*   **Fix**: We have updated the project to avoid needing Python/C++ build tools. Ensure you are using the latest code (check `package.json` has `better-sqlite3` version 12+).
*   Run `npm install` again.

### "Electron not recognized"
*   Ensure you ran `npm install` successfully first.
