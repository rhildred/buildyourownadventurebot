var accountSid = 'ACed2e0b51a75802c35db9bba707215466'; // Your Account SID from www.twilio.com/console
var authToken = '9cf540375b4f017cb01cf1f2255c67b3';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node #2',
    to: '+12269726176',  // Text this number
    from: '+12268871460' // From a valid Twilio number
})
.then((message) => console.log(message));