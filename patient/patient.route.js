const express = require("express");

var router = express.Router();

const PatientController = require('./patient.controller');
router.post('/covidpatient', function (req, res, next) {
    PatientController.covidpatient(req, res, next);
});

router.post('/addsymptom', function (req, res, next) {
    PatientController.addsymptom(req, res, next);
});
router.post('/findsymptom', function (req, res, next) {
    PatientController.findsymptom(req, res, next);
});

module.exports = router;