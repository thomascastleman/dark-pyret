
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
      chrome.tabs.sendMessage(tabs[i].id, { 
        darkThemeOn,
        togglingTheme: true // flag to indicate what's being changed
      });
    }
  });
}

function changeTheme(newTheme) {
  setGlobalThemeChange(newTheme);

  // get all tabs currently in use
  chrome.tabs.query({ /* currentWindow: true, active: true */ }, (tabs) => {
    // send the new theme to all open tabs
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, { 
        currentTheme: newTheme, 
        updatingTheme: true   // flag to indicate what's being changed
      });
    }
  });
}

// when the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // listen for changes in the checkbox in the popup
  document.getElementById("toggle").addEventListener("change", toggleDarkTheme);

  // add a listener to each theme radio
  document.querySelectorAll('.theme').forEach(item => {
    item.addEventListener('click', event => {
      const themeID = event.target.id;

      changeTheme(themeID);
    });
  });
});

// record whether dark theme is on in global storage
function setGlobalDarkTheme(darkThemeOn) {
  chrome.storage.sync.set({ "darkThemeOn": darkThemeOn }, () => {
    console.log("darkThemeOn: ", darkThemeOn);
  });
}

// record the current theme in global storage
function setGlobalThemeChange(newTheme) {
  chrome.storage.sync.set({ "currentTheme": newTheme }, () => {
    console.log("currentTheme: ", newTheme);
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

// check storage for what the current theme is set to
chrome.storage.sync.get("currentTheme", (items) => {
  let themeOptions = document.getElementById("theme-form").theme; // get the theme radio

  // check only the radio elt of the theme currently in use
  for (let i = 0; i < themeOptions.length; i++) {
    themeOptions[i].checked = themeOptions[i].value == items.currentTheme;
  }
});