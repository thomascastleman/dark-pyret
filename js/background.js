var themeOnStart = "monokai";

// when extension installed
chrome.runtime.onInstalled.addListener(() => {
  // initialize theme to default
  chrome.storage.sync.set({ "theme": themeOnStart }, () => {
    console.log(`Initialized theme to ${themeOnStart} in global storage`);
  });
});