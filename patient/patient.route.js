const express = require("express");

var router = express.Router();

const PatientController = require('./patient.controller');
router.post('/covidpatient', function(req, res, next) {
    
});

router.post('/addpatientsymptom/:patientId', function(req, res, next) {
   
});

router.post('/addpatient', function(req, res, next) {
    PatientController.addpatient(req, res, next);
});
router.post('/addpatientSymptom', function(req, res, next) {
   
});
router.get('/getpatient', PatientController.getpatient);
router.delete('/:patientId', PatientController.deletePatient);

module.exports = router;