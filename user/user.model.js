

// Copyright © 2020 Altran Corp. All rights reserved.

'use strict';


// load the Cloudant library
var async = require('async');
var Cloudant = require('@cloudant/cloudant');
const query = require("../db_query/query");
const weightageService = require("../service/service");
const utility = require("../utility/utility");
//const cloudant = new Cloudant({ url: 'https://633f24c3-b128-4545-845b-6a7171ec5174-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'Fnm4HIcpY38re_vih-x0Wc4QJilVDtJFyjftv4B0iavp' } } });
const cloudant = new Cloudant({ url: 'https://8380f2b2-3885-4d08-b0e2-1ab967504d36-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'kXM-uYt4dOwdIMVZa0GXliG_gHY87ImCYExvStPFT5GF' } } });
var db = cloudant.db.use('c4c_db');
var doc = null;

module.exports = {

    // create a document
    createDocument: function (payloadData, callback) {
        var pwd = utility.createPWD();
        var encryptedPwd = utility.encrypt(pwd);
        var qurantineData = { "isQurantine": false, "started": 0, "end": 0 };
        var payloadData = {
            _id: utility.createGUI(), name: payloadData.name, gender: payloadData.gender,
            age: payloadData.age, mobileno: payloadData.mobileno, location: payloadData.location, currentAssign: "none",
            morbidity: "none", isTestPerformed: true,
            password: encryptedPwd, symptom: [], iscovid: false, healthstatus: "none", doctorscreening: [],
            timestamp: Date.now(), doctorId: "", assignedByOperator: {}, assignedByDoctor: {}, usertype: "individual",
            qurantine: qurantineData, currentCovidScore: ""
        };
        // we are specifying the id of the document so we can update and delete it later
        db.insert(payloadData, function (err, data) {
            var response = {};
            if (data) {
                response["success"] = true;
                response["userId"] = data.id;
                response["mobileNo"] = payloadData.mobileno;
                response["password"] = pwd;

            }
            else {
                response["success"] = false;
            }
            callback(err, response);
        });
    },

    // read a document
    readDocument: (userId, callback)=> {
        if (userId != undefined && userId != null) {
            db.get(userId, async function (err, data) {
                if (data !== undefined) {
                    data["userId"] = data._id.toString();
                    delete data._id;
                    delete data.password;
                    delete data._rev;
                    callback(err, data);
                }
                else {
                    callback(err, { msg: "no records found !!! " });
                }
            });
        }
    },

    // update a document
    updateDocument: function (callback) {
        // make a change to the document, using the copy we kept from reading it back
        doc.c = true;
        db.insert(doc, function (err, data) {
            // keep the revision of the update so we can delete it
            doc._rev = data.rev;
            callback(err, data);
        });
    },

    authentication: function (payload, callback) {
        db.find(query.getSignIn(payload.id)).then((result) => {
            if (result.docs.length > 0) {
                // if (payload.password == utility.decrypt(data.password)) {
                //     callback(err, { userId: payload.id, success: true });
                // }
                // else {
                console.log("Response for authentication =>"+JSON.stringify(result.docs[0]));
                callback("", { userId: result.docs[0]._id, mobileNo: result.docs[0].mobileno, success: true, symptomDataLen: result.docs[0].symptom.length });
                //}
            }
            else {
                callback(err, { userId: payload.id, success: false });
            }
        }).catch(err => {
            callback(err, { userId: payload.id, success: false });
        });

    },
    getUserName: (payload, callback) => {
        db.find(query.getUserName(id)).then((result) => {
            if (result.docs.length > 0) {
                callback({ "sucess": "true", userName: result.docs[0].name, userId: result.docs[0]._id });
            }
            else {
                callback(false);
            }
        }).catch(err => {
            callback(err);
        });
    }
}

