var express = require( "express");
var path = require( "path");
var app = express();
var all_messages = []

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("index");
})

var server = app.listen(5000, function() {
 console.log("listening on port 5000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);

	socket.on("message_posted", function(message){

	   	all_messages.push(message);
	   	io.emit("new_message", all_messages);
	})
	socket.on("load_div", function(){
		socket.emit("new_message", all_messages);

	})
	
})
