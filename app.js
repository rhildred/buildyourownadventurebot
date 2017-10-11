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

function fBeginning(req, res){
  var sFrom = req.body.From;
  oConnections[sFrom].fCurState = fEatCottonCandyOrNot;
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message('You wake up one morning to find yourself in a very strange world, and you notice that it\'s raining cotton candy. Do you eat the cotton candy that is falling from the sky?');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

}

function fEatCottonCandyOrNot(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("yes") != -1){
    twiml.message("You catch a piece of cotton candy and shove it in your mouth. You find yourself feeling dizzy, and your vision going blurry... and you start to feel a bit numb. Do you spit out the cotton candy or do you swallow it and accept your fate?");
    oConnections[sFrom].fCurState = fSwallowOrSpitOut;
  }
  else if(sAction.toLowerCase().search("no") != -1){  
    twiml.message("You decide to just watch the cotton candy fall in peace and not take any chances. But suddenly the cotton candy comes to life and begins to swarm you and cover your entire body, forming a body suit. You feel an urge to jump. Do you?");
    oConnections[sFrom].fCurState = fJumpInCottonCandySuitOrNot;
  }
  else {
    gameOver_KawalaBearElectricutesYou();
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fJumpInCottonCandySuitOrNot(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("yes") != -1 || (sAction.toLowerCase().search("jump") != -1 && sAction.toLowerCase().search("don't") == -1 && sAction.toLowerCase().search("dont") == -1)){
    twiml.message("You decide to ignore your urge to jump with your cotton candy suit, but a few minutes later your suit begins to squeeze you tightly, suffocating you until you die.");
    oConnections[sFrom].fCurState = fBeginning;
  }
  else if(sAction.toLowerCase().search("no") != -1 || sAction.toLowerCase().search("don't") != -1 || sAction.toLowerCase().search("dont") != -1){  
    twiml.message("As you jump into the air, you begin floating upward as if you were full of helium. You don't know how to stop going up. You float so high into the sky that there is no longer enough oxygen for you to breathe. You quickly lose conciousness and then you die from lack of oxygen.");
    oConnections[sFrom].fCurState = fBeginning;
  }
  else {
    gameOver_KawalaBearElectricutesYou();
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fSwallowOrSpitOut(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("spit") != -1){
    twiml.message("Immediately after spitting out the cotton candy, it comes to life and forces its way back into your mouth and down your throat, choking you to death.");
    oConnections[sFrom].fCurState = fBeginning;
  }
  else if(sAction.toLowerCase().search("swallow") != -1){
    twiml.message("You pass out, and wake up later to find yourself in a very empty room. The only thing in the room is the bed you are laying on, and a small red button on the wall. Do you shout for help, or do you press the button");
    oConnections[sFrom].fCurState = fShoutOrPressButton;
  }
  else {
    gameOver_KawalaBearElectricutesYou();
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fShoutOrPressButton(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("shout") != -1 || sAction.toLowerCase().search("help") != -1){
    twiml.message("The ghost of a pirate seeps through the wall, and stabs you with his sword. You Died.");
    oConnections[sFrom].fCurState = fBeginning;
  }
  else if(sAction.toLowerCase().search("press") != -1 || sAction.toLowerCase().search("button") != -1){
    twiml.message("You press the button on the wall and a secret compartment emerges from the wall, unveiling a jack in the box. Do you wind up the jack in the box?");
    oConnections[sFrom].fCurState = fWindUpJackInBoxOrNot;
  }
  else {
    gameOver_KawalaBearElectricutesYou();
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fWindUpJackInBoxOrNot(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("no") != -1){
    twiml.message("You decide to ignore the jack in the box, and after a few minutes pass, a trap door opens below you, and you fall into a bottomless pit, and die a slow death as you endlessly keep falling, and falling, and falling.");
    oConnections[sFrom].fCurState = fBeginning;
  }
  else if(sAction.toLowerCase().search("yes") != -1){
    twiml.message("After you wind up the jack in the box, it plays its little song, and the jack pops out of the box causing a blinding white light. Moments later, as you look around, you discover yourself back at home, in your bedroom. You have no idea what just happened, but you hope it never happens again.");
    oConnections[sFrom].fCurState = fBeginning;
  }
  else {
    gameOver_KawalaBearElectricutesYou();
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}


function gameOver_KawalaBearElectricutesYou (){
  twiml.message("A magical flying kawala bear appears out of nowhere, shouting at you for not answering the question properly, and electricutes you with its magic powers. You Died.")
  oConnections[sFrom].fCurState = fBeginning;
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
