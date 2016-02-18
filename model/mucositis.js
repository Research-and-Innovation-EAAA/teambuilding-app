Mucositis = new Mongo.Collection("mucositis");

Meteor.methods({
   addMucositisRegistration: (registration) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      registration.createdBy = Meteor.userId();

      Mucositis.insert(registration);
   }
})