var express = require('express');
var path = require('path');
var twilio = require('twilio');
var app = express();
var bodyParser = require('body-parser');
var oConnections = {};


// Define the port to run on
app.set('port', process.env.PORT || parseInt(process.argv.pop()) || 5100);

// Define the Document Root path
var sPath = path.join(__dirname, '.');

app.use(express.static(sPath));

app.use(bodyParser.urlencoded({ extended: true }));

function gameOver_KawalaBearElectricutesYou (){
  twiml.message("A magical flying kawala bear appears out of nowhere, shouting at you for being indecisive, and electricutes you with its magic powers, knocking you out. " + 
  "Maybe next time you should answer the question.")
  oConnections[sFrom].fCurState = fBeginning;
}

function fEatCottonCandyOrNot(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("yes") != -1){
    twiml.message("You catch a piece of cotton candy and shove it in your mouth. You find yourself feeling dizzy, and your vision going blurry... and you start to feel a bit numb. " + 
    "Do you spit out the cotton candy or do you swallow it and accept your fate?");
    //oConnections[sFrom].fCurState = fSwallowOrSpitOut;
  }
  else if(sAction.toLowerCase().search("no") != -1){  
    twiml.message("You decide to just watch the cotton candy fall in peace and not take any chances. But suddenly the cotton candy begins to swarm you and cover your entire body, " + 
    "forming a body suit. You feel an urge to jump. Do you?");
    //oConnections[sFrom].fCurState = fJumpInCottonCandySuitOrNot;
  }
  else {
    gameOver_KawalaBearElectricutesYou();
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fBeginning(req, res){
  var sFrom = req.body.From;
  oConnections[sFrom].fCurState = fEatCottonCandyOrNot;
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message('You wake up to find yourself in a very strange world, and you notice that it\'s raining cotton candy. Do you eat the cotton candy that is falling from the sky?');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

}

//define a method for the twilio webhook
app.post('/sms', function(req, res) {
  var sFrom = req.body.From;
  if(!oConnections.hasOwnProperty(sFrom)){
    oConnections[sFrom] = {"fCurState":fBeginning};
  }
  oConnections[sFrom].fCurState(req, res);
});

// Listen for requests
var server = app.listen(app.get('port'), () =>{
  var port = server.address().port;
  console.log('Listening on localhost:' + port);
  console.log("Document Root is " + sPath);
});
