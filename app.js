var express = require('express');
var path = require('path');
var twilio = require('twilio');
var app = express();
var bodyParser = require('body-parser');

// Define the port to run on
app.set('port', 5100);

// Define the Document Root path
var sPath = path.join(__dirname, '.');

app.use(express.static(sPath));
app.use(bodyParser.urlencoded({ extended: true })); 

// Define a method for the webhook
app.get("/api/chatbot", (req, res)=>{ 
    res.send("Hello from the chatbot");

});

//Twilio webhook method
app.post('/sms', function(req, res) {
  console.log(req.body);
  var twilio = require('twilio');
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// Listen for requests
var server = app.listen(app.get('port'), () =>{
  var port = server.address().port;
  console.log('Listening on localhost:' + port);
  console.log("Document Root is " + sPath);
});