const patient = require("./patient.model");
const cloudant = require('@cloudant/cloudant');
var uuid = require('uuid-random');

module.exports = {
    delete: (request, response) => {

    },
    add: (request, response) => {
        var payloadData = {
            name: request.body.name, gender: request.body.gender, symptom: [], timestamp: Date.now(),
            mobileno: request.body.mobileno, location: request.body.location, temprature: request.body.temprature
        }
        patient.createDocument(payloadData, function (err, data) {
            response.send(data);
        });
    },

    readPatient: (request, response, next) => {
        var patientid = request.params.patientid;
        patient.readDocument(patientid, function (err, data) {
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
        var user_id = request.body.user_id;
        var res = { success: true };
        var payloadData = {
            age: request.body.age, family: request.body.family,
            gender: request.body.gender, travelled: request.body.travelled,
            experience: request.body.experience, temperature: request.body.temperature, timestamp: Date.now()
        };
        patient.updateDocument(user_id, payloadData, function (err, data) {
            res = data;
            response.send(res);
        });
    },

    findUser: (request, response) => {
        console.log("controller calling");
        patient.selectQuery();
        response.send({ "success": true });
    },
    findsymptom: (request, response) => {
        var userId = request.body.id;
        var result = patient.findsymptom(userId, function (result) {
            response.send({ "success": result });
        });


    }
};
