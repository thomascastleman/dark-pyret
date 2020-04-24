
// when extension installed
chrome.runtime.onInstalled.addListener(() => {
  // default set dark theme, monokai
  chrome.storage.sync.set({ "darkThemeOn": true, "currentTheme": "monokai" }, () => {
    console.log("Initialized dark theme as ON in global storage");
  });
});