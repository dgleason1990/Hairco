const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { geolocation, accountSid, authToken, SECRET_KEY, MONGODB_URI } = require('./public-headers');
const axios = require('axios');
const twilio = require('twilio');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('./mongoDB/models/Users');
const fs = require('fs');
const cors = require('cors');
const authorization = require('./Authorization');
const path = require('path')

// mongoose.connect('mongodb://localhost:27017/hairco');
mongoose.connect(MONGODB_URI)
.then(()=>console.log('MongoDB connected!'))
.catch(err=>console.log(err))

const connection = mongoose.connection;
connection.on('open', ()=>{
    console.log('mongoose connected!')
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(__dirname + '/front-end/build', {
//     setHeaders: function(res, path) { res.set("Cache-Control", "no-cache"); }
// }));
app.use(express.static('__dirname + /front-end/build', {
    setHeaders: function(res, path) { res.set("Cache-Control", "no-cache"); }
 }));
// app.get('*',(req, res) => {
//     res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'));
//     });

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
    console.log(req.body)
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

// Monthly Goals
app.post('/goals', authorization, (req,res)=>{
    let id = data.id;
    let goal = req.body.monthlyGoal;
    Users.findById(id)
    .then()
})

app.listen(process.env.PORT || 8080)