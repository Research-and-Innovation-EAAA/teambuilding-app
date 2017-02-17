Events = new Mongo.Collection("events");

Meteor.methods({
    addEvent: (event) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        event.createdBy = Meteor.userId();

        Events.insert(event);
        console.log('Succesfully inserted event: ', reminder);
    },
    deleteEvent: (event) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Events.remove(event._id);
        console.log('Removed event: ', event);
    }
});

// Initialise default reminders
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
