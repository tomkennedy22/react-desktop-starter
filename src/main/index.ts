import { join } from "node:path";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import { app, BrowserWindow } from "electron";
import { createIPCHandler } from "electron-trpc-experimental/main";
import icon from "../../resources/icon.png?asset";
import { router } from "../backend/api";

function createWindow(): void {
	const mainWindow = new BrowserWindow({
		width: 1020,
		height: 800,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === "linux" ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, "../preload/index.js"),
			sandbox: false,
		},
	});

	mainWindow.on("ready-to-show", () => {
		mainWindow.show();
	});

	if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
		mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
	} else {
		mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
		// mainWindow.loadFile("/");
	}

	createIPCHandler({ router, windows: [mainWindow] });
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId("com.electron");

	app.on("browser-window-created", (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

function appQuit() {
	if (process.platform !== "darwin") {
		app.quit();
	}
}

app.on("window-all-closed", () => {
	appQuit();
});
