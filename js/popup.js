
// toggle dark theme on and off
function toggleDarkTheme() {
  let darkThemeOn;
  if (this.checked) {
    darkThemeOn = true;
  } else {
    darkThemeOn = false;
  }

  // get all tabs currently in use
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    // send the new dark theme status to the active tab
    chrome.tabs.sendMessage(tabs[0].id, { darkThemeOn });
  });
}

// when the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // listen for changes in the checkbox in the popup
  document.getElementById("toggle").addEventListener("change", toggleDarkTheme);
});