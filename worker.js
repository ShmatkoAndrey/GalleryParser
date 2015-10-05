////----------------------- old
////importScripts('xhr2-FormData.js')
//self.onmessage = function(event) {
//    var resourceUrl = event.data;
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', resourceUrl, true);
//    xhr.responseType = 'arraybuffer';
//
//    xhr.onload = function(e) {
//        if (xhr.status == 200) {
//            nextStep(xhr.response);
//        }
//    };
//    xhr.send();
//};
//function nextStep(arrayBuffer) {
//    var xhr = new XMLHttpRequest();
//    var fd = new FormData();
//    fd.append('server-method', 'upload');
//    fd.append('file', arrayBuffer);
//
//    xhr.open('POST', 'http://YOUR.DOMAIN.HERE/posturl.php', true);
//
//    xhr.send(fd);
//};