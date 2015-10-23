
var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    port = process.env.PORT || 3030,
    app = express();

// config
app.set('views', __dirname + '/src');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/src')));


// send everything to the index page and let angular take over
app.get('/', function (request, response) {
    response.render('index.html');
});

// server
http.createServer(app).listen(port, function(){
  //console.log("Express server listening on port " + port);
});