Meteor.startup(() => {

    Meteor.setTimeout(function () {
        //Upgrade database if needed.
        var dbVersion = Settings.findOne({key: 'databaseVersion'});

        if (dbVersion === undefined) {
            dbVersion = 1;
        } else {
            dbVersion = dbVersion.value;
        }

        if (dbVersion === 1) { // i18n db attributes rename -----------------------------------------------------------
            // moduleNames
            Registrations.update({moduleName: "Mucositis"}, {$set: {moduleName: "mucositis"}}, {multi: true});
            Registrations.update({moduleName: "Bloodsamples"}, {$set: {moduleName: "bloodsamples"}}, {multi: true});
            Registrations.update({moduleName: "Pain"}, {$set: {moduleName: "pain"}}, {multi: true});
            Registrations.update({moduleName: "Medicine"}, {$set: {moduleName: "medicine"}}, {multi: true});
            Registrations.update({moduleName: "Arthritis_Pain"}, {$set: {moduleName: "arthritis"}}, {multi: true});

            // pain values
            Registrations.update({
                moduleName: "pain",
                morphineType: "oral"
            }, {$set: {morphineType: "pain.oral"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                morphineType: "intravenous"
            }, {$set: {morphineType: "pain.intravenous"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                morphineMeasureUnit: "mg"
            }, {$set: {morphineMeasureUnit: "pain.mg"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                morphineMeasureUnit: "mg/time"
            }, {$set: {morphineMeasureUnit: "pain.mgHour"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                morphineMeasureUnit: "mg/døgn"
            }, {$set: {morphineMeasureUnit: "pain.mgDay"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                painType: "Mave"
            }, {$set: {painType: "pain.stomach"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                painType: "Ben"
            }, {$set: {painType: "pain.legs"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                painType: "Arme"
            }, {$set: {painType: "pain.arms"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                painType: "Hoved"
            }, {$set: {painType: "pain.head"}}, {multi: true});
            Registrations.update({
                moduleName: "pain",
                painType: "Andet"
            }, {$set: {painType: "pain.other"}}, {multi: true});

            dbVersion = 2;
            Settings.update({key: "databaseVersion"}, {$set: {value: dbVersion}}, {upsert: true}); // update db version in database
        }

        if (dbVersion === 2) { // arthritis modules -------------------------------------------------------------------
            CustomModules.insert({
                    "name": "Gigtsmerter",
                    "wizard": {
                        "steps": [
                            {
                                "stepName": "Intensitet",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Hvor mange smerter har du haft i dag?",
                                        "propertyName": "intensitet",
                                        "minValue": 0,
                                        "maxValue": 10,
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Placering",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/single-question.html",
                                    "config": {
                                        "propertyName": "placering",
                                        "question": "Hvor har du haft ondt i dag?",
                                        "answers": [
                                            "hoved",
                                            "nakke",
                                            "ryg",
                                            "ben",
                                            "fødder",
                                            "arme",
                                            "hænder",
                                            "ingen"
                                        ],
                                        "multipleChoice": true,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Fysik",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Har smerten betydet at du ikke kunne være så fysisk aktiv som du ellers ville? (fx løbe, hoppe, skrive, klippe med saks)",
                                        "propertyName": "fysik",
                                        "minValue": 0,
                                        "maxValue": 10,
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Aktivitet",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Har smerten forhindret dig i at lave det du ellers ville lave i dag? (fx skole, lege med kammerater, gå til sport)",
                                        "propertyName": "aktivitet",
                                        "minValue": 0,
                                        "maxValue": 10,
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Humør",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Hvor meget har smerten haft af betydning for dit humør i løbet af dagen?",
                                        "propertyName": "humør",
                                        "minValue": 0,
                                        "maxValue": 10,
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            }
                        ]
                    },
                    "frontPage": {
                        "properties": [
                            "intensitet",
                            "placering"
                        ],
                        "propertyDescription": [
                            "Intensitet",
                            "Placering"
                        ],
                        "iconUrl": "/smertetransparent.png",
                        "barClass": "bar-balanced"
                    }
                }
            );

            CustomModules.insert({
                    "name": "Gigtlindring",
                    "wizard": {
                        "steps": [
                            {
                                "stepName": "Smertelindring",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/single-question.html",
                                    "config": {
                                        "propertyName": "smertelindring",
                                        "question": "Har I forsøgt smertelindring?",
                                        "answers": [
                                            "nej",
                                            "tænkte på noget andet",
                                            "massage",
                                            "motion",
                                            "medicin",
                                            "andet"
                                        ],
                                        "multipleChoice": true,
                                        "mandatory": true
                                    }
                                }
                            }
                        ]
                    },
                    "frontPage": {
                        "properties": [
                            "smertelindring"
                        ],
                        "propertyDescription": [
                            "Smertelindring"
                        ],
                        "iconUrl": "/lindringtransparent.png",
                        "barClass": "bar-energized"
                    }
                }
            );

            dbVersion = 3;
            Settings.update({key: "databaseVersion"}, {$set: {value: dbVersion}}, {upsert: true}); // update db version in database
        }

        if (dbVersion === 3) { // arthritis modules fix ---------------------------------------------------------------
            CustomModules.remove({name: "Gigtsmerter"});
            CustomModules.remove({name: "Gigtlindring"});
            Registrations.remove({moduleName: "Gigtsmerter"});
            Registrations.remove({moduleName: "Gigtlindring"});

            CustomModules.insert({
                    "name": "Smerter",
                    "wizard": {
                        "steps": [
                            {
                                "stepName": "Styrke",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Hvor mange smerter har du haft i dag?",
                                        "propertyName": "styrke",
                                        "minValue": 0,
                                        "positiveText": "ingen smerte",
                                        "maxValue": 10,
                                        "negativeText": "extrem smerte",
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Hvor",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/single-question.html",
                                    "config": {
                                        "propertyName": "hvor",
                                        "question": "Hvor har du haft ondt i dag?",
                                        "answers": [
                                            "hoved",
                                            "nakke",
                                            "ryg",
                                            "ben",
                                            "fødder",
                                            "arme",
                                            "hænder",
                                            "ingen smerter"
                                        ],
                                        "multipleChoice": true,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Fysik",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Har smerten betydet at du ikke kunne være så fysisk aktiv som du ellers ville? (fx løbe, hoppe, skrive, klippe med saks)",
                                        "propertyName": "fysik",
                                        "minValue": 0,
                                        "positiveText": "overhovedet ikke",
                                        "maxValue": 10,
                                        "negativeText": "fuldstændigt forhindret alle aktiviteter",
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Aktiv",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Har smerten forhindret dig i at lave det du ellers ville lave i dag? (fx skole, lege med kammerater, gå til sport)",
                                        "propertyName": "aktivitet",
                                        "minValue": 0,
                                        "positiveText": "overhovedet ikke",
                                        "maxValue": 10,
                                        "negativeText": "fuldstændigt forhindret alle aktiviteter",
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Humør",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Hvor meget har smerten haft af betydning for dit humør i løbet af dagen?",
                                        "propertyName": "humør",
                                        "minValue": 0,
                                        "positiveText": "overhovedet ingen",
                                        "maxValue": 10,
                                        "negativeText": "fuldstændigt forstyrret alle følelser",
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            }
                        ]
                    },
                    "frontPage": {
                        "properties": [
                            "styrke",
                            "hvor"
                        ],
                        "propertyDescription": [
                            "Intensitet",
                            "Placering"
                        ],
                        "iconUrl": "/smertetransparent.png",
                        "barClass": "bar-balanced"
                    }
                }
            );

            CustomModules.insert({
                    "name": "Smertelindring",
                    "wizard": {
                        "steps": [
                            {
                                "stepName": "Lindring",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/single-question.html",
                                    "config": {
                                        "propertyName": "smertelindring",
                                        "question": "Har du forsøgt smertelindring?",
                                        "answers": [
                                            "nej",
                                            "tænkte på noget andet",
                                            "massage",
                                            "motion",
                                            "medicin",
                                            "andet"
                                        ],
                                        "multipleChoice": true,
                                        "mandatory": true
                                    }
                                }
                            },
                            {
                                "stepName": "Effekt",
                                "stepTemplate": {
                                    "url": "client/components/wizard/templates/slider.html",
                                    "config": {
                                        "question": "Synes du det hjalp på smerterne?",
                                        "propertyName": "effekt",
                                        "minValue": 0,
                                        "positiveText": "smerterne forsvandt",
                                        "maxValue": 10,
                                        "negativeText": "ingen effekt på smerterne",
                                        "step": 0.5,
                                        "mandatory": true
                                    }
                                }
                            }
                        ]
                    },
                    "frontPage": {
                        "properties": [
                            "smertelindring"
                        ],
                        "propertyDescription": [
                            "Smertelindring"
                        ],
                        "iconUrl": "/lindringtransparent.png",
                        "barClass": "bar-energized"
                    }
                }
            );

            dbVersion = 4;
            Settings.update({key: "databaseVersion"}, {$set: {value: dbVersion}}, {upsert: true}); // update db version in database
        }


        if (dbVersion === 4) { // set dash on empty fields in database registrations ---------------------------------------------------------------

            /* Blood samples */
            Registrations.update({
                moduleName: "bloodsamples",
                Leukocytter: {'$exists': false}
            }, {$set: {Leukocytter: "-"}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                Neutrofile: {'$exists': false}
            }, {$set: {Neutrofile: "-"}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                Thrombocytter: {'$exists': false}
            }, {$set: {Thrombocytter: "-"}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                Hemoglobin: {'$exists': false}
            }, {$set: {Hemoglobin: "-"}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                Alat: {'$exists': false}
            }, {$set: {Alat: "-"}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                CRP: {'$exists': false}
            }, {$set: {CRP: "-"}}, {multi: true});

            /* Medicine */
            Registrations.update({
                moduleName: "medicine",
                MTX: {'$exists': false}
            }, {$set: {MTX: "-"}}, {multi: true});
            Registrations.update({
                moduleName: "medicine",
                SixMP: {'$exists': false}
            }, {$set: {SixMP: "-"}}, {multi: true});


            dbVersion = 5;
            Settings.update({key: "databaseVersion"}, {$set: {value: dbVersion}}, {upsert: true}); // update db version in database
        }

        if (dbVersion === 5) { // set dash on empty fields in database registrations ---------------------------------------------------------------

            /* Blood samples */
            Registrations.update({
                moduleName: "bloodsamples",
                Leukocytter: "-"
            }, {$set: {Leukocytter: NaN}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                Neutrofile: "-"
            }, {$set: {Neutrofile: NaN}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                Thrombocytter: "-"
            }, {$set: {Thrombocytter: NaN}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                Hemoglobin: "-"
            }, {$set: {Hemoglobin: NaN}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                Alat: "-"
            }, {$set: {Alat: NaN}}, {multi: true});
            Registrations.update({
                moduleName: "bloodsamples",
                CRP: "-"
            }, {$set: {CRP: NaN}}, {multi: true});

            /* Medicine */
            Registrations.update({
                moduleName: "medicine",
                MTX: "-"
            }, {$set: {MTX: NaN}}, {multi: true});
            Registrations.update({
                moduleName: "medicine",
                SixMP: "-"
            }, {$set: {SixMP: NaN}}, {multi: true});


            dbVersion = 6;
            Settings.update({key: "databaseVersion"}, {$set: {value: dbVersion}}, {upsert: true}); // update db version in database
        }

        if (dbVersion === 6) { // set dash on empty fields in database registrations ---------------------------------------------------------------

            /* Blood samples */
            Registrations.update({
                moduleName: "bloodsamples"
            }, {
                $rename: {
                    Leukocytter: "leukocytes",
                    Thrombocytter: "thrombocytes",
                    Hemoglobin: "hemoglobin",
                    Neutrofile: "neutrophiles",
                    Alat: "alat",
                    CRP: "crp"
                }
            }, {multi: true});

            dbVersion = 7;
            Settings.update({key: "databaseVersion"}, {$set: {value: dbVersion}}, {upsert: true}); // update db version in database
        }

    }, 1000);

});