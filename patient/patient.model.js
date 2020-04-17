

// Copyright © 2015, 2017 IBM Corp. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict';


// load the Cloudant library
var async = require('async');
var Cloudant = require('@cloudant/cloudant');
const utility = require("../utility/utility");
//var cloudant = Cloudant({url: process.env.CLOUDANT_URL});
const cloudant = new Cloudant({ url: 'https://633f24c3-b128-4545-845b-6a7171ec5174-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'Fnm4HIcpY38re_vih-x0Wc4QJilVDtJFyjftv4B0iavp' } } });
var db = cloudant.db.use('c4c_db');;
var doc = null;

module.exports = {
    // create a document
    createDocument: function (payloadData, callback) {
        var payloadData = {
            _id: utility.createGUI(), name: payloadData.name, gender: payloadData.gender,symptom:[],
            mobileno: payloadData.mobileno, location: payloadData.location, temprature: payloadData.temprature,
            iscovid:false, healthstatus: "none"
        };
        // we are specifying the id of the document so we can update and delete it later
        db.insert(payloadData, function (err, data) {
            callback(err, data);
        });
    },

    // read a document
    readDocument: function (id, callback) {
        db.get(id, function (err, data) {
            doc=data;
            callback(err, data);
        });
    },

    // update a document
    updateDocument: function (uid, symptom, callback) {
        var response=null;
        var err=null;
        // make a change to the document, using the copy we kept from reading it back
        db.get(uid, function (err, data) {
           // err=err;
            data.symptom.push(symptom);
            db.insert(data, function (err, data) {
                // keep the revision of the update so we can delete it
                response = data.rev;
               // callback(err, data);
            });
        });
  // callback(err, response);
    },

    // deleting a document
    deleteDocument: function (callback) {
        console.log("Deleting document 'mydoc'");
        // supply the id and revision to be deleted
        db.destroy(doc._id, doc._rev, function (err, data) {
            console.log('Error:', err);
            console.log('Data:', data);
            callback(err, data);
        });
    },

    // deleting the database document
    deleteDatabase: function (callback) {
        console.log("Deleting database '" + dbname + "'");
        cloudant.db.destroy(dbname, function (err, data) {
            callback(err, data);
        });
    },
};
