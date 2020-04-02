
loadCSS('syntax-highlighting-override');
loadCSS('editor-override');

function loadCSS(file) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL('css/' + file + '.css');
  link.id = file;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

function unloadCSS(file) {
  var cssNode = document.getElementById(file);
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });