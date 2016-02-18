Medicine = new Mongo.Collection("medicine");

Meteor.methods({
   addMedicineRegistration: (registration) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      registration.createdBy = Meteor.userId();

      Medicine.insert(registration);
   }
});