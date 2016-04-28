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


   Meteor.publish("notes", function () {
      return Notes.find({
         $and: [
            {createdBy: this.userId},
            {createdBy: {$exists: true}}
         ]
      });
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
})();
