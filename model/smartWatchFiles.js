SmartWatchFiles = new FileCollection('smartwatchfs',  // base name of collection
    {
        resumable: false,          // Disable resumable.js upload support
        resumableIndexName: undefined,    // Not used when resumable is false
        chunkSize: 3 * 1024 * 1024 - 1024,    // Use 3MB chunks for gridFS
        baseURL: '\gridfs\fs',     // Default base URL for all HTTP methods
        locks: {                   // Parameters for gridfs-locks
            timeOut: 360,            // Seconds to wait for an unavailable lock
            pollingInterval: 5,      // Seconds to wait between lock attempts
            lockExpiration: 90       // Seconds until a lock expires
        },
        http: []    // HTTP method definitions, none by default
    }
);

/*Meteor.methods({
 addReminder: (reminder) => {
 if (!Meteor.userId()) {
 throw new Meteor.Error('not-authorized');
 }
 reminder.createdBy = Meteor.userId();

 Reminders.insert(reminder);
 console.log('Succesfully inserted reminder: ', reminder);
 },
 deleteReminder: (reminder) => {
 if (!Meteor.userId()) {
 throw new Meteor.Error('not-authorized');
 }

 Reminders.remove(reminder._id);
 console.log('Removed reminder: ', reminder);
 }
 });
 */