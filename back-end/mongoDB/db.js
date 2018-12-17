// const mongoose = require('mongoose');

// const Users = require('./models/Users');

// mongoose.connect('mongodb://localhost:27017/hairco');

// const user = new Users({
//     name: 'John',
//     type:'Stylists',
//     location:{
//         type: 'Point',
//         coordinates: [-79.400080, 43.63671]
//     },
//     phone_number:4169942941,
//     img:'https://images.pexels.com/photos/331989/pexels-photo-331989.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     rating:5
// });

// user.save()
// .then(saveduser=>{
//     console.log(saveduser)
// })
// .catch(err=>console.log(err))

// const connection = mongoose.connection;
// connection.on('open', ()=>{
//     console.log('mongoose connected!')
// })

