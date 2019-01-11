const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { key, geolocation, accountSid, authToken, SECRET_KEY } = require('./headers');
const axios = require('axios');
const twilio = require('twilio');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('./mongoDB/models/Users');
const fs = require('fs');
const cors = require('cors');
const authorization = require('./Authorization')

mongoose.connect('mongodb://localhost:27017/hairco');

const connection = mongoose.connection;
connection.on('open', ()=>{
    console.log('mongoose connected!')
})

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     next();
// });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public', {
    setHeaders: function(res, path) { res.set("Cache-Control", "no-cache"); }
}));

app.post('/client', async (req,res)=>{
    let clientLocation = req.body.location;
    let result = await axios.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + clientLocation + '&key=' + geolocation)
    let location = result.data.results[0].geometry.location;
    let latitude = location.lat;
    let longitude = location.lng;
    Users.aggregate(
            [
              { $geoNear: {
                  near: {
                    type: "Point",
                    coordinates: [ longitude, latitude ]
                  },
                  spherical: true,
                  distanceField: "dis",
                //   maxDistance: 10000
              }}
            ])
            .then((data)=>{
                res.json(data)})
                .catch(err=>console.log(err))
    })

let client = new twilio(accountSid, authToken);

// Booking an appointment
app.post('/appointment', async (req,res)=>{
    let appointmentData = req.body;
    let id = appointmentData.stylistId;
    let name = appointmentData.name
    let comment = appointmentData.comment;
    let date = appointmentData.date;
    let clientName = appointmentData.client;
    let phoneNumber = appointmentData.phoneNumber;
    let text = 'Hi ' + name + ' a client by the name of ' + clientName + ' is interested in your services. On ' + date + ' Here is there request: ' + comment + '. Please contact them at ' + phoneNumber
    // Sending request to database for everything with the id
    Users.findById(id)
    .then((response)=>{
        client.messages.create({
            body: text,
            to: response.phone_number,  // Text this number
            from: '+16479526182' // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
    })
    .catch(err=>console.log(err));
    res.send('Recieved')
})

// Account registration
app.post('/registration', async (req, res) => {
    let address = req.body.address;
    let result = await axios.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + geolocation);
    let location = result.data.results[0].geometry.location;
    let latitude = location.lat;
    let longitude = location.lng;
    const user = new Users({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        type:'Stylists',
        location:{
            type: 'Point',
            coordinates: [ longitude , latitude ]
        },
        phone_number: req.body.phoneNumber,
        img: req.body.profile,
        rating: '5'
    });
    bcrypt.hash(user.password , 12, function(err,hash){
        if (err){
            return res.status(500).json({'msg': 'Oops'})
        }
        user.password = hash;
        user.save()
        .then(saveduser=>{
            console.log(saveduser)
        })
        .catch(err=>console.log(err))
        res.send("successful registration")
    });
})

// Login
app.post('/login', (req,res) => {
    Users.findOne({ username: req.body.username })
    .then((response) => { bcrypt.compare(req.body.password, response.password, (err, result)=>{
        if (result){
            const token = jwt.sign({id: response.id}, SECRET_KEY, {expiresIn: '10h'});
            res.json({token: token})
        } 
        else res.sendStatus(401).json({'message': 'Invalid Credentials'})
        })
    })
    .catch(err=>console.log(err))
})

//Dashboard
app.get('/dashboard', authorization, (req,res)=>{
    let id = data.id;
    Users.findById(id)
    .then(response => {
        res.json(response)
    })
    .catch(err=>console.log(err))
})

app.listen(process.env.PORT || 5000)
// app.listen(8080, () => {
//     console.log('You are connected to port 8080')
//    })

   

// Tokens
//    bcrypt.compare(password, user.password, (err, result) => {
//     if(result){
//       // passwords match! GENERATE TOKEN AND SEND BACK!
//       const token = jwt.sign({subject: email}, SECRET_KEY);
//       res.json({token: token, login:true})
//     } 
//     else{
//       // passwords don't match! Danger! reject with a 401
//       res.status(401).json({'msg': "invalid credentials", login:false});
//     }
// })


// Authentication
// function authorize(req, res, next) {
//     // retrieve token from header with name 'authorization'
//     const { authorization } = req.headers;
    
//     const token = authorization.split('Bearer ')[1];
//     // if no toek, reject with 401 status
//     if(!token) {
//         return res.status(401).json({'msg': 'no token provided'});
//     }
//     // if there is a token, try to verifty it
//     const decoded = jwt.verify(token, SECRET_KEY);
//     // if it is NOT aythentic reject with 401
//     if(!decoded) {
//         return res.status(401).json({'msg': 'invalid token'});
//     }
//     // else if it IS authentic, store identtiy at req.user and call next
//     req.user = decoded;
//     //   calling next() signals we are done, call next request handler function
//     next();
// }


// Front-end purposes {to grab token from local storage}
// const init = {
//     method: "GET",
//     headers: {
//         // here grab token from localStorager 
//         authorization: `Bearer ${localStorage.getItem('token')}`
//     }
// }

// Old Account registration
// app.post('/registration', async (req,res)=>{
//     let registrationData = req.body;
//     console.log(registrationData)
//     let address = registrationData.location;
//     let result = await axios.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + geolocation);
//     console.log(result);
//     let location = result.data.results[0].geometry.location;
//     let latitude = location.lat;
//     let longitude = location.lng;
//     const user = new Users({
//         name: registrationData.name,
//         type:'Stylists',
//         location:{
//             type: 'Point',
//             coordinates: [ longitude , latitude ]
//         },
//         phone_number: registrationData.phoneNumber,
//         img: registrationData.img,
//         rating: registrationData.rating
//     });
//     user.save()
//     .then(saveduser=>{
//         console.log(saveduser)
//     })
//     .catch(err=>console.log(err))
//     res.sendStatus("successful registration")
// })