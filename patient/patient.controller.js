const patient = require("./patient.model");
const cloudant = require('@cloudant/cloudant');
var uuid = require('uuid-random');

module.exports = {
    delete: (request, response) => {
    },

    add: (request, response) => {
       var str = uuid(); 
        var matches1 = str.match(/\d+/g); 
       var _id= matches1.join().replace(/,/g, '').substring(1,10);
        var payloadData = {
           _id:_id, name: request.body.name, gender: request.body.gender,symptom:[],
            mobileno: request.body.mobileno, location: request.body.location, temprature: request.body.temprature
        }
        patient.createDocument(payloadData, function (err, data) {
            response.send(data);
        });
    },

    all: (request, response, next) => {
        patient.readDocument(function (err, data) {
            response.send(data);
        });
    },
    covidpatient: (request, response, next) => {
        // patient.readDocument(function (err, data) {
            
        console.log(JSON.stringify(request.body))
        response.send(JSON.stringify(request.body));
        // });
    },
    addsymptom: (request, response, next) => {
      var user_id= request.body.user_id;
      console.log(user_id);
        var payloadData = {
            age: request.body.age, family: request.body.family,
            gender: request.body.gender, travelled: request.body.travelled,
            experience: request.body.experience, temperature: request.body.temperature
        };
        patient.updateDocument(user_id, payloadData, function (err, data) {
            response.send({ sucess: true });
        });
        response.send({ sucess: true });
    },

};
