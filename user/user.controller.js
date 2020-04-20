const user = require("./user.model");
const querystring = require('querystring');

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

    getUser: (request, response, next) => {
      var userId=  request.params.userid;
        user.readDocument(userId,function (err, data) {
            if(data) response.send({"success":true, "result":data});
            else  response.send({"success":false, "error":err});
        });
    },
    signin:(request, response, next)=>{
        var payloadData = {
            id: request.body.id, password: request.body.password
        }
        user.authentication(payloadData, function (err, data) {
            response.send(data);
        }); 
    }

};
