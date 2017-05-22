Events = new Mongo.Collection("events");

Meteor.methods({
    saveEvent: (event, moduleInfo) => {
        var user = Meteor.user();
        if (!user || !user.profile || !user.profile.admin) {
            throw new Meteor.Error('not-authorised', 'You are not an admin!');
        }

        if (event.shortEvent === undefined) {
            throw new Meteor.Error('not-valid', 'Event object does not contain shortEvent attribute.');
        }
        var foundEvent = Events.findOne({password: event.password});
        if (foundEvent !== undefined && foundEvent._id !== event._id) {
            throw new Meteor.Error('not-valid', 'Event with password ' + event.password + ' already exists.');
        }

        var newEvent = false;
        if (!event.createdBy) {
            event.createdBy = Meteor.userId();
            event.createdAt = new Date();
            newEvent = true;
        }
        else {
            event.lastEditedBy = Meteor.userId();
            event.lastEditedAt = new Date();
        }

        Events.update({_id: event._id}, event, {upsert: true});

        event._id = Events.findOne({password: event.password})._id;

        if (event.shortEvent) {
            module = ModuleTemplates.shortEvent;
            module.eventId = event._id;
            module.startTime = moduleInfo.startTime;
            module.endTime = moduleInfo.endTime;
            if (!newEvent) {
                module.wizard.steps = moduleInfo.steps;
            }
            CustomModules.update({eventId: event._id, number: 1}, module, {upsert: true});
        }
        else {
            module = ModuleTemplates.longEventBefore;
            module.eventId = event._id;
            module.startTime = moduleInfo.startTime1;
            module.endTime = moduleInfo.endTime1;
            if (!newEvent) {
                module.wizard.steps = moduleInfo.steps1;
            }

            CustomModules.update({eventId: event._id, number: 1}, module, {upsert: true});

            module = ModuleTemplates.longEventDuring;
            module.eventId = event._id;
            module.startTime = moduleInfo.startTime2;
            module.endTime = moduleInfo.endTime2;
            if (!newEvent) {
                module.wizard.steps = moduleInfo.steps2;
            }
            CustomModules.update({eventId: event._id, number: 2}, module, {upsert: true});

            module = ModuleTemplates.longEventAfter;
            module.eventId = event._id;
            module.startTime = moduleInfo.startTime3;
            module.endTime = moduleInfo.endTime3;
            if (!newEvent) {
                module.wizard.steps = moduleInfo.steps3;
            }
            CustomModules.update({eventId: event._id, number: 3}, module, {upsert: true});
        }

        console.log('Successfully saved event+modules: ', event);
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
