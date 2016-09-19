Meteor.startup(() => {
    Meteor.requiredDatabaseVersion = 3;

    Meteor.setTimeout(function () {
        //Upgrade database if needed.
        var dbVersion = Settings.findOne({key: 'databaseVersion'});

        if (dbVersion === undefined) {
            dbVersion = 1;
        } else {
            dbVersion = dbVersion.value;
        }

        if (dbVersion < Meteor.requiredDatabaseVersion) {
            console.log("DB UPGRADE from " + dbVersion + " to " + Meteor.requiredDatabaseVersion);
            if (dbVersion < 2){ // i18n db attributes rename -----------------------------------------------------------
                // moduleNames
                Registrations.update({moduleName: "Mucositis"}, {$set:{moduleName: "mucositis"}}, {multi: true});
                Registrations.update({moduleName: "Bloodsamples"}, {$set:{moduleName: "bloodsamples"}}, {multi: true});
                Registrations.update({moduleName: "Pain"}, {$set:{moduleName: "pain"}}, {multi: true});
                Registrations.update({moduleName: "Medicine"}, {$set:{moduleName: "medicine"}}, {multi: true});
                Registrations.update({moduleName: "Arthritis_Pain"}, {$set:{moduleName: "arthritis"}}, {multi: true});

                // pain values
                Registrations.update({moduleName: "pain", morphineType: "oral"}, {$set:{morphineType: "pain.oral"}}, {multi: true});
                Registrations.update({moduleName: "pain", morphineType: "intravenous"}, {$set:{morphineType: "pain.intravenous"}}, {multi: true});
                Registrations.update({moduleName: "pain", morphineMeasureUnit: "mg"}, {$set:{morphineMeasureUnit: "pain.mg"}}, {multi: true});
                Registrations.update({moduleName: "pain", morphineMeasureUnit: "mg/time"}, {$set:{morphineMeasureUnit: "pain.mgHour"}}, {multi: true});
                Registrations.update({moduleName: "pain", morphineMeasureUnit: "mg/døgn"}, {$set:{morphineMeasureUnit: "pain.mgDay"}}, {multi: true});
                Registrations.update({moduleName: "pain", painType: "Mave"}, {$set:{painType: "pain.stomach"}}, {multi: true});
                Registrations.update({moduleName: "pain", painType: "Ben"}, {$set:{painType: "pain.legs"}}, {multi: true});
                Registrations.update({moduleName: "pain", painType: "Arme"}, {$set:{painType: "pain.arms"}}, {multi: true});
                Registrations.update({moduleName: "pain", painType: "Hoved"}, {$set:{painType: "pain.head"}}, {multi: true});
                Registrations.update({moduleName: "pain", painType: "Andet"}, {$set:{painType: "pain.other"}}, {multi: true});

                Settings.update({ key: "databaseVersion" }, { $set: { value: 2 }}, { upsert: true }); // update db version in database
            }

            if (dbVersion < 3){ // arthritis modules -------------------------------------------------------------------
                CustomModules.insert({
                        "name" : "Smerter",
                        "wizard" : {
                            "steps" : [
                                {
                                    "stepName" : "Intensitet",
                                    "stepTemplate" : {
                                        "url" : "client/components/wizard/templates/slider.html",
                                        "config" : {
                                            "question" : "Hvor mange smerter har du haft i dag?",
                                            "propertyName" : "intensitet",
                                            "minValue" : 0,
                                            "maxValue" : 10,
                                            "step" : 0.5,
                                            "mandatory" : true
                                        }
                                    }
                                },
                                {
                                    "stepName" : "Placering",
                                    "stepTemplate" : {
                                        "url" : "client/components/wizard/templates/single-question.html",
                                        "config" : {
                                            "propertyName" : "placering",
                                            "question" : "Hvor har du haft ondt i dag?",
                                            "answers" : [
                                                "hoved",
                                                "nakke",
                                                "ryg",
                                                "ben",
                                                "fødder",
                                                "arme",
                                                "hænder",
                                                "ingen"
                                            ],
                                            "multipleChoice" : true,
                                            "mandatory" : true
                                        }
                                    }
                                },
                                {
                                    "stepName" : "Fysik",
                                    "stepTemplate" : {
                                        "url" : "client/components/wizard/templates/slider.html",
                                        "config" : {
                                            "question" : "Har smerten betydet at du ikke kunne være så fysisk aktiv som du ellers ville? (fx løbe, hoppe, skrive, klippe med saks)",
                                            "propertyName" : "fysik",
                                            "minValue" : 0,
                                            "maxValue" : 10,
                                            "step" : 0.5,
                                            "mandatory" : true
                                        }
                                    }
                                },
                                {
                                    "stepName" : "Aktivitet",
                                    "stepTemplate" : {
                                        "url" : "client/components/wizard/templates/slider.html",
                                        "config" : {
                                            "question" : "Har smerten forhindret dig i at lave det du ellers ville lave i dag? (fx skole, lege med kammerater, gå til sport)",
                                            "propertyName" : "aktivitet",
                                            "minValue" : 0,
                                            "maxValue" : 10,
                                            "step" : 0.5,
                                            "mandatory" : true
                                        }
                                    }
                                },
                                {
                                    "stepName" : "Humør",
                                    "stepTemplate" : {
                                        "url" : "client/components/wizard/templates/slider.html",
                                        "config" : {
                                            "question" : "Hvor meget har smerten haft af betydning for dit humør i løbet af dagen?",
                                            "propertyName" : "humør",
                                            "minValue" : 0,
                                            "maxValue" : 10,
                                            "step" : 0.5,
                                            "mandatory" : true
                                        }
                                    }
                                }
                            ]
                        },
                        "frontPage" : {
                            "properties" : [
                                "intensitet",
                                "placering"
                            ],
                            "propertyDescription" : [
                                "Intensitet",
                                "Placering"
                            ],
                            "iconUrl" : "/question-mark.png",
                            "barClass" : "bar-calm"
                        }
                    }
                );

                CustomModules.insert({
                        "name" : "Smertelindring",
                        "wizard" : {
                            "steps" : [
                                {
                                    "stepName" : "Smertelindring",
                                    "stepTemplate" : {
                                        "url" : "client/components/wizard/templates/single-question.html",
                                        "config" : {
                                            "propertyName" : "smertelindring",
                                            "question" : "Har I forsøgt smertelindring?",
                                            "answers" : [
                                                "nej",
                                                "tænkte på noget andet",
                                                "massage",
                                                "motion",
                                                "medicin",
                                                "andet"
                                            ],
                                            "multipleChoice" : true,
                                            "mandatory" : true
                                        }
                                    }
                                }
                            ]
                        },
                        "frontPage" : {
                            "properties" : [
                                "smertelindring"
                            ],
                            "propertyDescription" : [
                                "Smertelindring"
                            ],
                            "iconUrl" : "/question-mark.png",
                            "barClass" : "bar-calm"
                        }
                    }
                );

                Settings.update({ key: "databaseVersion" }, { $set: { value: 3 }}, { upsert: true }); // update db version in database
            }

        }
    }, 1000);

});