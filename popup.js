function onWindowLoad() {

    var siteUrl = "site";

    chrome.tabs.getSelected(function (tab) {

        siteUrl = tab.url;

        chrome.tabs.sendRequest(tab.id, {method: "getHTML"}, function (response) {
            if (response.method == "getHTML") {

                var doc = document.implementation.createHTMLDocument('');
                doc.open();
                doc.write(response.data);
                doc.close();

                var listImg = doc.body.getElementsByTagName('img');

                for (var i = 0; i < listImg.length; i++) {
                    //if (listImg[i].src[0] == 'h')
                        showImage(listImg[i].src, i);
                }
            }
        });
    });

    var showImage = function (imgSrc, i) {

        document.getElementById('image' + (i % 4 + 1)).insertAdjacentHTML('beforeend',
            '<div class="image unselected"><img id =' + i + ' src = ' + imgSrc + '><//img><//div>');

        document.getElementById(i).ondragstart = function () {
            return false;
        };

        var select = function (i) {
            if (document.getElementById(i).parentNode.className == "image selected") {
                document.getElementById(i).parentNode.className = "image unselected"
            }
            else {
                document.getElementById(i).parentNode.className = "image selected"
            }
        };

        document.getElementById(i).parentNode.onmousedown = function (e) {
            select(i)
        };

        document.getElementById(i).parentNode.onmouseover = function (e) {
            if (e.buttons == 1) {
                document.getElementById(i).parentNode.className = "image selected"
            }
        };
    };

    document.getElementById('ok').addEventListener("click", function () {

        var lst = document.body.getElementsByTagName('img');

        var respLst = "site:"+siteUrl+"++ ";
        for (var i = 0; i < lst.length; i++) {
            if(lst[i].parentNode.className == "image selected"){
                respLst += lst[i].src + " "
            }
        }

        var worker = new Worker('worker.js');
        worker.postMessage(respLst);

        chrome.tabs.getSelected(function (tab) {
            chrome.tabs.update(tab.id, {url: 'https://galleryshmat.herokuapp.com'});
        });

    });
}

window.onload = onWindowLoad;