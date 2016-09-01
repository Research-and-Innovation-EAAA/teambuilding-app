Settings = new Mongo.Collection("settings");

// Initialise default settings
Meteor.startup(() => {
    if (Meteor.isServer) {

        console.log('Meteor startup called');
        if (!Settings.findOne({key: 'analytics'})) {
            Settings.insert({
                key: 'analytics',
                value: true
            });
        }
        if (!Settings.findOne({key: 'kadira'})) {
            Settings.insert({
                key: 'kadira',
                value: false
            });
        }

    }
});