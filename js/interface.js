
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {type:"test"}, function(response){
//       alert(response);
//   });
// });

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('toggle').addEventListener("click", onToggle, false);

//   const onToggle = () => {
//     alert("test");
//     chrome.tabs.query({ currentWindow: true, active: true },
//       (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, "TESTING MESSAGE");
//       });
//   }
// });