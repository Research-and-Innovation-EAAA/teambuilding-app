//Medicine = new Mongo.Collection("Medicine");
//Bloodsample = new Mongo.Collection("Bloodsample");
//Pain = new Mongo.Collection("Pain");
//Mucositis = new Mongo.Collection("Mucositis");

Registrations = new Mongo.Collection("Registrations");

Meteor.methods({
   addRegistration: (registration, collection) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      registration.createdBy = Meteor.userId();
      registration.createdAt = new Date();
      registration.moduleName = collection;

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


