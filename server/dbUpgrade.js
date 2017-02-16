Meteor.startup(() => {

    Meteor.setTimeout(function () {
        //Upgrade database if needed.
        var dbVersion = Settings.findOne({key: 'databaseVersion'});

        if (dbVersion === undefined) {
            dbVersion = 1;
        } else {
            dbVersion = dbVersion.value;
        }

    /*    if (dbVersion === 1) { // -----------------------------------------------------------
            // do necessary changes

            dbVersion = 2;
            Settings.update({key: "databaseVersion"}, {$set: {value: dbVersion}}, {upsert: true}); // update db version in database
        }

        if (dbVersion === 2) { //  -------------------------------------------------------------------
            // do necessary changes

            dbVersion = 3;
            Settings.update({key: "databaseVersion"}, {$set: {value: dbVersion}}, {upsert: true}); // update db version in database
        }
*/
    }, 1000);

});
