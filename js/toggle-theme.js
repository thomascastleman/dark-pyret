
// stylesheets that apply the dark theme
const overrideSheets = [
  'syntax-highlighting-override',
  'editor-override'
];

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

function unloadCSS(file) {
  var cssNode = document.getElementById(file);
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

function enableDarkTheme() {
  overrideSheets.map(sh => loadCSS(sh));
}

function disableDarkTheme() {
  overrideSheets.map(sh => unloadCSS(sh));
}

function updateTheme(darkThemeOn) {
  if (darkThemeOn) {
    enableDarkTheme();
  } else {
    disableDarkTheme();
  }
}

// listen for toggling dark theme
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    updateTheme(request.darkThemeOn);
  }
);

// check storage for whether or not dark theme is enabled
chrome.storage.sync.get("darkThemeOn", (items) => {
  console.log("CONTENT SCRIPT LOGGING STORAGE:");
  console.log(items);
  updateTheme(items.darkThemeOn);
});