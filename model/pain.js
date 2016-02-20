Pain = new Mongo.Collection("pain");

// TODO: Create one method for saving registrations with collection as parameter

Meteor.methods({
   addPainRegistration: (registration) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      registration.createdBy = Meteor.userId();

      Pain.insert(registration);
   }
})