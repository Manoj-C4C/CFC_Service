const http = require('http');
//const socket = require('socket.io');

const app = require('./app');

var server  = http.createServer(app);
//var io      = socket.listen(server);

// var bodyParser = require("body-parser");
// var Cloudant = require('@cloudant/cloudant');


// var cloudant = new Cloudant({ url: 'https://7a3b4541-51bd-4f69-954f-c1f951f7414a-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: '0HuQu3nG8Fjb-vPh9DvO5cDCWXCZTv4XnGvdRxXmZC-z' } } });

// //Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// var db = cloudant.db.use('c4c')

// app.get('/', (req, res) => {
//   res.send('Call for Code 2020 - COVID-19 Challenge!');
// });

/// Post Data
////{"age":90,"male":null,"gender":"male:male","experience":"None of these","temperature":"normal"} 
// app.post('/addpatientinfo',function(request,response){
// var age=request.body.age;
// var gender=request.body.gender;
// var experience=request.body.experience;
// var male=request.body.male;
// console.log(JSON.stringify(request.body));
// response.send('Your information :\n  Age : '+age +'\n gender :'+gender+'\n experience :'+experience);
// });

/// create DB
// var createDocument = function() {
// //  cloudant.db.create('alice').then(() => {
//   var cities = [
//   { "_id":"Boston",
//     "type":"Feature",
//     "geometry": {
//       "type":"Point","coordinates": [-71.063611, 42.358056]
//     }
//   },
//   { "_id":"Houston",
//     "type":"Feature",
//     "geometry": {
//       "type":"Point","coordinates": [-95.383056, 29.762778]
//     }
//   },
//   { "_id":"Ruston",
//     "type":"Feature",
//     "geometry": {
//       "type":"Point","coordinates": [-92.640556, 32.529722]
//     }
//   }
// ];

// db.bulk({ docs: cities }, function(err) {
//   if (err) {
//     throw err;
//   }

//   console.log('Inserted all cities');
// });
// };

// app.get('/adduser', (req, res) => {
//  // db.createCollection("teachers", { capped : true, size : 9232768} )
//   createDocument();
// });
// app.get('/getuser', (req, res) => {
//   db.get('Boston', function(err, data) {
//     // keep a copy of the doc so we know its revision token
//     console.log(err);
//     console.log(data);
//     res.send(data);
//   });
// });


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
