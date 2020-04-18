'use strict';

module.exports = {
    searchQuery: function () {
        return {
            "selector": {
                "usertype": "individual"
            },
            "fields": [
                "_id", "name"
            ]
        };
    },
    getSymptom: function (id) {
        return {
            "selector": {
                "_id": id
            },
            "fields": [
                "_id",
                "symptom"
            ]
        };
    }
}