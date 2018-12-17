const { key, geolocation, accountSid, authToken } = require('./headers');
const twilio = require('twilio');


const client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+14169942941',  // Text this number
    from: '+16479526182' // From a valid Twilio number
})
.then((message) => console.log(message.sid));