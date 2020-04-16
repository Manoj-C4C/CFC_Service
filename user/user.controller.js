const user = require("./user.model");
const cloudant = require('@cloudant/cloudant');
module.exports = {
    deleteUser: (request, response) => {
    },

    addUser: (request, response) => {
        var payloadData = {
            name: request.body.name, gender: request.body.gender, age :request.body.age,
            mobileno: request.body.mobileno, location: request.body.location
        }
        user.createDocument(payloadData, function (err, data) {
            response.send(data);
        });
    },

    getUsers: (request, response, next) => {
        user.readDocument(function (err, data) {
            response.send(data);
        });
    }

};
