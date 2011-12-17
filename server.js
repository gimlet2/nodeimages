var http = require("http");
var url = require("url");

var router = require("./router");
var requestHandlers = require("./requestHandlers");

  
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

function onRequest(request, response) {
    var postData = "";
        var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      router.route(handle, pathname, response, postData);
    });

  }

module.exports = http.createServer(onRequest);
console.log("Server has started.");

