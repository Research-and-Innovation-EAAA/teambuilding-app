CustomModules = new Mongo.Collection("customModules");

Meteor.methods({
    /*setActiveModule: (module, active) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var updateVal = {};
        updateVal["modules." + module] = active;

        UserSettings.update({userId: Meteor.userId()}, {$set: updateVal}, {upsert: true});

        console.log('Successfully set module ' + module + " " + active);
    }*/
});