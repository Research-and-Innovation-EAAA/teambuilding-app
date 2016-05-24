(function () {

   Meteor.publish('moduleData', function (module) {
      return Registrations.find({
         $and: [
            {moduleName: module},
            {moduleName: {$exists: true}},
            {createdBy: this.userId},
            {createdBy: {$exists: true}}
         ]
      })
   });

   Meteor.startup(function() {
      Registrations._ensureIndex({"moduleName": 1});
      Registrations._ensureIndex({"createdBy": 1});
   });

   Meteor.publish("notes", function () {
      return Notes.find({
         $and: [
            {createdBy: this.userId},
            {createdBy: {$exists: true}}
         ]
      });
   });

   Meteor.startup(function() {
      Notes._ensureIndex({"createdBy": 1});
   });

   Meteor.publish("reminders", function () {
      return Reminders.find({
         $or: [
            {isListReminders: true},
            {
               $and: [
                  {createdBy: this.userId},
                  {createdBy: {$exists: true}}
               ]
            }]
      });
   });

   Meteor.startup(function() {
      Reminders._ensureIndex({"createdBy": 1});
   });
})();
