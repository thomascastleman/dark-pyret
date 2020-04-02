
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

// listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.darkThemeOn) {
      enableDarkTheme();
    } else {
      disableDarkTheme();
    }
  }
);

// by default, dark theme is on
enableDarkTheme();