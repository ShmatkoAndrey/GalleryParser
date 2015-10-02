function onWindowLoad() {

    chrome.tabs.getSelected(function (tab) {
        getHtml(tab)

    });

    var getImages = function (html, tab) {
        var listImg = [];
        var i = 1;
        while (html.split('img src="')[i] != undefined) {

            var link = html.split('img src="')[i].split('"')[0];

            if (link[1] == '/') {
                break;
            }
            else if (link[0] == '/') {
                listImg[listImg.length] = tab.url + link
            }
            else if(link[0] == 'h') {
                listImg[listImg.length] = link
            }
            showImage(listImg[listImg.length - 1]);

            i++;
        }
    };

    var showImage = function (imgSrc) {
        document.getElementById('image').insertAdjacentHTML('beforeend', '<img src = ' + imgSrc + '><//img>');
        //document.getElementById('image').insertAdjacentHTML('beforeend', '<input type="checkbox"/>');

    };

    var getHtml = function (tab) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", tab.url, true);
        xmlhttp.send(null);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState != 4) return;
            clearTimeout(timeout)
            if (xmlhttp.status == 200) {
                if (xmlhttp.responseText) {

                    getImages(xmlhttp.responseText, tab)
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
}

window.onload = onWindowLoad;