chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "getHTML"){
            sendResponse({data: document.body.outerHTML, method: "getHTML"});
        }
    }
);