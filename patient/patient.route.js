const express = require("express");

var router = express.Router();

const PatientController = require('./patient.controller');
router.post('/covidpatient', function(req, res, next) {
     PatientController.covidpatient(req, res, next);
});

router.post('/addsymptom', function(req, res, next) {
    PatientController.addsymptom(req, res, next);
});

router.post('/add', function(req, res, next) {
   PatientController.add(req, res, next);
});

router.get('/all', PatientController.all);
router.delete('/:patientId', PatientController.delete);

module.exports = router;