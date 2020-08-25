
function changeTheme(newTheme) {
  // set theme globally in storage
  chrome.storage.sync.set({ "theme": newTheme }, () => {
    console.log("current theme: ", newTheme);
  });

  // get all tabs currently in use
  chrome.tabs.query({ /* currentWindow: true, active: true */ }, (tabs) => {
    // send the new theme to all open tabs
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, { theme: newTheme });
    }
  });
}

// when the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // add a listener to each theme radio
  document.querySelectorAll('.theme').forEach(item => {
    item.addEventListener('click', event => {
      changeTheme(event.target.id);
    });
  });
});

// check storage for what the current theme is set to
chrome.storage.sync.get("theme", (items) => {
  let themeOptions = document.getElementById("theme-form").theme; // get the theme radio

  // check only the radio elt of the theme currently in use
  for (let i = 0; i < themeOptions.length; i++) {
    themeOptions[i].checked = themeOptions[i].value == items.theme;
  }
});