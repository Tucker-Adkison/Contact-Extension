chrome.runtime.onInstalled.addListener(function() {
   chrome.contextMenus.create({
      id: "1",
      title: "Import",
      type: 'normal',
      contexts: ['selection']
   });
   chrome.storage.local.set({'value': []});
});

chrome.contextMenus.onClicked.addListener(function(info) {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      if(typeof tabs[0] !== "undefined") {
         chrome.storage.local.get(['value'], function(result) {
            let item = result.value;
            item.push(info.selectionText);
            console.log(item);
            chrome.storage.local.set({'value': item}, function() {
               console.log('Value is set to ' + item);
            });
         });
      }
   });
});