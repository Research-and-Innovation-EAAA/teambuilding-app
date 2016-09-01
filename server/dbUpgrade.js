Meteor.startup(() => {
    Meteor.requiredDatabaseVersion = 2;

    Meteor.setTimeout(function () {
        //Upgrade database if needed.
        var dbVersion = Settings.findOne({key: 'databaseVersion'});

        if (dbVersion === undefined) {
            dbVersion = 1;
        } else {
            dbVersion = dbVersion.value;
        }

        if (dbVersion < Meteor.requiredDatabaseVersion) {
            console.log("UPGRADE DB from " + dbVersion + " to " + Meteor.requiredDatabaseVersion);
            if (dbVersion === 1){
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
            }
            else {
                // ...
            }

            // update the current version value in DB
            Settings.update({ key: "databaseVersion" }, { $set: { value: Meteor.requiredDatabaseVersion }}, { upsert: true });
        }
    }, 1000);

});