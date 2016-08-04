(function () {

   Meteor.publish('moduleData', function (module) {
      return Registrations.find({
         $and: [
            {moduleName: module},
            {moduleName: {$exists: true}},
            {createdBy: this.userId},
            {createdBy: {$exists: true}}
         ]
      }, {
         sort: {
            timestamp: -1,
            createdAt: -1
         },
         limit: 1,
         fields: {
            createdBy: 0,
            id: 0,
            createdAt: 0,
            timestamp: 0
         }
      })
   });

   //Meteor.publish('moduleData', function (module) {
   //   return Registrations.find({
   //      $and: [
   //         {moduleName: module},
   //         {moduleName: {$exists: true}},
   //         {createdBy: this.userId},
   //         {createdBy: {$exists: true}}
   //      ]
   //   })
   //});

   Meteor.publish('graphData', function (module, startTimestamp, endTimestamp) {
      return Registrations.find({
         $and: [
            {moduleName: module},
            {moduleName: {$exists: true}},
            {createdBy: this.userId},
            {createdBy: {$exists: true}},
            {
               timestamp: {
                  $gte: startTimestamp,
                  $lte: endTimestamp
               }
            }
         ]
      },{
         sort: {timestamp: -1}
      })
   });

   Meteor.startup(function () {
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

   Meteor.startup(function () {
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

   Meteor.startup(function () {
      Reminders._ensureIndex({"createdBy": 1});
   });
})();
