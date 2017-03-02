Registrations = new Mongo.Collection("Registrations");

Meteor.methods({
   addRegistration: (registration, collection) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      registration.createdBy = Meteor.userId();
      registration.createdAt = new Date();
      registration.moduleId = collection;

      Registrations.insert(registration);
   },
   updateRegistration: (registration) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      registration.createdBy = Meteor.userId();
      registration.updatedAt = new Date();

      Registrations.update(registration._id, registration);
   },
   deleteRegistration: (registration) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }

      Registrations.remove(registration._id);
   }
});


