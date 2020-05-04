
// stylesheets that apply the dark theme
const overrideSheets = [
  'editor-override'
];

let theme = 'monokai';  // current theme
let themeOn;  // are themes turned on

// available themes (filenames in themes/)
const themes = [
  'monokai',
  'nord',
  'fried'
];

// add a stylesheet link to the <head>
function loadCSS(file) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL('css/overrides/' + file + '.css');
  link.id = file;
  link.type = "text/css";
  link.rel = "stylesheet";

  // if sheet not already injected
  if (!document.getElementById(file)) {
    document.getElementsByTagName("head")[0].appendChild(link);
  }
}

// remove a stylesheet link from the <head>
function unloadCSS(file) {
  var cssNode = document.getElementById(file);
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

// for all override sheets, load or unload them
function enableDarkTheme() { 
  overrideSheets.map(sh => loadCSS(sh));
  loadCSS('themes/' + theme); // load the current theme
}

function disableDarkTheme() { 
  overrideSheets.map(sh => unloadCSS(sh)); 
  unloadCSS('themes/' + theme);   // unload the current theme
}

// add or remove stylesheets based on whether dark theme is on/off
function toggleTheme(darkThemeOn) {
  if (darkThemeOn) {
    enableDarkTheme();
  } else {
    disableDarkTheme();
  }
  themeOn = darkThemeOn;
}

function setTheme(newTheme) {
  if (newTheme != theme) {
    // only load / unload sheets if themes are turned on
    if (themeOn) {
      loadCSS('themes/' + newTheme);
      unloadCSS('themes/' + theme);
    }
    theme = newTheme;
  }
}

// listen for toggling dark theme
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.togglingTheme) {
      toggleTheme(request.darkThemeOn);
    }
    if (request.updatingTheme) {
      setTheme(request.currentTheme);
    }
  }
);

// check storage for current theme
chrome.storage.sync.get("currentTheme", (items) => {
  setTheme(items.currentTheme);

  // check storage for whether or not dark theme is enabled
  chrome.storage.sync.get("darkThemeOn", (items) => {
    toggleTheme(items.darkThemeOn);
  });
});