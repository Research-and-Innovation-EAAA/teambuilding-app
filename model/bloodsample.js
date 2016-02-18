Bloodsample = new Mongo.Collection("bloodsample");

Meteor.methods({
   addBloodsampleRegistration: (registration) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      registration.createdBy = Meteor.userId();

      Bloodsample.insert(registration);
   }
});