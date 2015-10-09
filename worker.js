self.onmessage = function(event) {
    var resourceUrl = event.data;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    fd.append('server-method', 'upload');
    fd.append('file', resourceUrl);
    xhr.open('POST', 'http://localhost:3000/posts', true);
    //xhr.open('POST', 'https://galleryshmat.herokuapp.com/posts', true);
    xhr.send(fd);
};

//self.onmessage = function(event) {
//    var resourceUrl = event.data;
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', resourceUrl, true);
//    xhr.responseType = 'arraybuffer';
//
//    xhr.onload = function(e) {
//
//        if (xhr.status == 200) {
//            nextStep(xhr.response);
//        }
//    };
//    xhr.send();
//};
//
//function nextStep(arrayBuffer) {
//    var xhr = new XMLHttpRequest();
//    var fd = new FormData();
//    fd.append('server-method', 'upload');
//    fd.append('file', arrayBuffer);
//
//    xhr.open('POST', 'http://localhost:3000/posts', true);
//
//    xhr.send(fd);
//};