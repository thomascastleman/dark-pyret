
// class names of supported themes
const themes = [
    'default',
    'base16',
    'material-darker',
    'monokai',
    'panda'
];

// determine if themes are natively supported by this version of CPO
let nativeSupport = false;
for (let i = 0; i < document.body.classList.length; i++) {
    if (themes.includes(document.body.classList[i])) {
        nativeSupport = true;
        break;
    }
}

if (nativeSupport) {
    console.log("Dark themes natively supported!");
} else {
    console.log("No native support for dark themes.");
}

let theme;  // the current theme name

// remove previous theme class & add new one to body
function setTheme(newTheme) {
    if (theme) document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    theme = newTheme;
}

if (!nativeSupport) {
    // get current theme from storage
    chrome.storage.sync.get("theme", (items) => {
        // set the theme to the cached theme
        setTheme(items.theme);

        // add legacy class to body, so now legacy themes loaded by the extension will apply
        document.body.classList.add("legacy");
    });

    // listen for theme changes
    chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
        setTheme(request.theme);
    });
}