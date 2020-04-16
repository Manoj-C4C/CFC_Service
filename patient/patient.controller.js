const patient = require("./patient.model");
const cloudant = require('@cloudant/cloudant');
module.exports = {
    deletePatient: (request, response) => {
    },

    addpatient: (request, response) => {
        var payloadData = {
             name: request.body.name, gender: request.body.gender,
            mobileno: request.body.mobileno, location: request.body.location, temprature: request.body.temprature
        }
        patient.createDocument(payloadData, function (err, data) {
            response.send(data);
        });
    },

    getpatient: (request, response, next) => {
        patient.readDocument(function (err, data) {
            response.send(data);
        });
    }

};
