function onWindowLoad() {

    chrome.tabs.getSelected(function (tab) {
        getHtml(tab.url)
    });

    var getImages = function (html) {
        var listImg = []
        var i = 1;
        while (html.split('img src="')[i] != undefined) {
            listImg[listImg.length] = html.split('img src="')[i].split('"')[0]
            showImage(listImg[listImg.length - 1])
            i++;
        }
    };

    var showImage = function (imgSrc) {//0661584263
        document.getElementById('image').insertAdjacentHTML('afterend', '<img src = ' + imgSrc + '></img>');
    };

    var getHtml = function (url) {
        var xmlhttp = new getXmlHttp();

        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState != 4) return;
            clearTimeout(timeout)
            if (xmlhttp.status == 200) {
                if (xmlhttp.responseText) {

                    getImages(xmlhttp.responseText)
                    //return xmlhttp.responseText
                }
            }
        };

        var timeout = setTimeout(function () {
            xmlhttp.abort();
            handleError("Time over")
        }, 10000);

        function handleError(message) {
            alert("Error: " + message)
        }
    };

    function getXmlHttp() {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
}

window.onload = onWindowLoad;