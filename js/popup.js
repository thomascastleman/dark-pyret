
// toggle dark theme on and off
function toggleDarkTheme() {
  let darkThemeOn;
  if (this.checked) {
    darkThemeOn = true;
  } else {
    darkThemeOn = false;
  }

  // store state
  setGlobalDarkTheme(darkThemeOn);

  // get all tabs currently in use
  chrome.tabs.query({ /* currentWindow: true, active: true */ }, (tabs) => {
    // send the new dark theme status to ALL open tabs
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, { darkThemeOn });
    }
  });
}

// when the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // listen for changes in the checkbox in the popup
  document.getElementById("toggle").addEventListener("change", toggleDarkTheme);
});

// record whether dark theme is on in global storage
function setGlobalDarkTheme(darkThemeOn) {
  chrome.storage.sync.set({ "darkThemeOn": darkThemeOn }, () => {
    console.log("darkThemeOn: ", darkThemeOn);
  });
}

// check storage for whether or not dark theme is enabled
// and update the toggle button to reflect current state
chrome.storage.sync.get("darkThemeOn", (items) => {
  const toggle = document.getElementById("toggle");
  
  if (items.darkThemeOn) {
    toggle.checked = true;
  } else {
    toggle.checked = false;
  }
});