function onWindowLoad() {

    chrome.tabs.getSelected(function (tab) {
        chrome.tabs.sendRequest(tab.id, {method: "getHTML"}, function (response) {
            if (response.method == "getHTML") {

                var doc = document.implementation.createHTMLDocument('');
                doc.open();
                doc.write(response.data);
                doc.close();

                var listImg = doc.body.getElementsByTagName('img');

                for (var i = 0; i < listImg.length; i++) {
                    if (listImg[i].src[0] == 'h')
                        showImage(listImg[i].src, i);
                }
            }
        });
    });

    var showImage = function (imgSrc, i) {

        document.getElementById('image' + (i % 4 + 1)).insertAdjacentHTML('beforeend',
            '<img class = "unselected" id =' + i + ' src = ' + imgSrc + '><//img>');

        document.getElementById(i).ondragstart = function () {
            return false;
        };

        var select = function (i) {
            if (document.getElementById(i).className == "selected") document.getElementById(i).className = "unselected"
            else document.getElementById(i).className = "selected"
        };

        document.getElementById(i).onmousedown = function (e) {
            select(i)
        };

        document.getElementById(i).onmouseover = function (e) {
            if (e.buttons == 1)
                document.getElementById(i).className = "selected"
        };
    };

    document.getElementById('ok').addEventListener("click", function () {

        var lst = document.body.getElementsByTagName('img');

        var respLst = "";
        for (var i = 0; i < lst.length; i++) {
            if(lst[i].className == "selected"){
                respLst += lst[i].src + " "
            }
        }

        var worker = new Worker('worker.js');
        worker.postMessage(respLst);

        alert('Maybe saved')
    });
}

window.onload = onWindowLoad;