identifyer = " ";
chrome.identity.getProfileUserInfo(function (userInfo) {
   identifyer = userInfo["id"];
   console.log(userInfo["email"]);
});

window.onload = function () {   
   document.getElementById("nameButton").onclick = function () { 
      addToLocal("name");
   };
   document.getElementById("companyButton").onclick = function () { 
      addToLocal("company");
   };
   document.getElementById("otherButton").onclick = function () { 
      addToLocal("other");
   };
   document.getElementById("emailButton").onclick = function () { 
      addToLocal("email");
   };

   function addToLocal(value) {
      console.log(identifyer);
      type = value;
      if(document.getElementById('element').value !== "") {
         chrome.storage.local.get(identifyer, function(result) {  
            if(Object.entries(result).length === 0 && result.constructor === Object) {
               chrome.storage.local.set({identifyer: {type: document.getElementById('element').value}});
            } else {
               result.type = document.getElementById('element').value;
               chrome.local.set(result);  
            }
         });   
      }
      chrome.storage.local.get(identifyer, function(result) {
         console.log(result);
      });
   }

   chrome.storage.local.get(['value'], function(result) {
      if(result.value.length > 0) {
         let item = result.value[0];
         console.log(item);
         console.log('Value currently is ' + item);
         var text = document.getElementById('element');
         text.setAttribute("value", item);
         item = result.value;
         item.shift();
         item.length === 0 ? chrome.storage.local.set({'value': []}) : chrome.storage.local.set({'value': item});
      }
   });
}
