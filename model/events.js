Events = new Mongo.Collection("events");

Meteor.methods({
    saveEvent: (event) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        if(!!event.createdBy ) {
            event.createdBy = Meteor.userId();
            event.createdAt = new Date();
        }
        else {
            event.lastEditedBy = Meteor.userId();
            event.lastEditedAt = new Date();
        }

        Events.update({_id: event._id}, event, {upsert: true});

        console.log('Succesfully saved event: ', event);
    },
    deleteEvent: (event) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Events.remove(event._id);
        console.log('Removed event: ', event);
    }
});

// Initialise default events
Meteor.startup(() => {
    console.log('Meteor startup called');
    Meteor.setTimeout(function () {
        if (!Events.findOne({})) {
            var testEvent = {
                name: "Test Teambuilding",
                startDate: "2017-02-17",
                endDate: "2017-02-17",
                password: "cactus",
                program: "12:00 start, 14:00 slut",
                otherInfo: "Meeting in front of the school."
            };
            Events.insert(testEvent);
            if (Meteor.isServer) {
                Events._ensureIndex({"createdBy": 1});
            }
        }
    }, 10000);
});
