
// when extension installed
chrome.runtime.onInstalled.addListener(() => {
  // default set dark theme
  chrome.storage.sync.set({ "darkThemeOn": true }, () => {
    console.log("Initialized dark theme as ON in global storage");
  });
});