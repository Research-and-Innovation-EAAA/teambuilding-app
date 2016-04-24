//Medicine = new Mongo.Collection("Medicine");
//Bloodsample = new Mongo.Collection("Bloodsample");
//Pain = new Mongo.Collection("Pain");
//Mucositis = new Mongo.Collection("Mucositis");

Collections = [];

(function (){
   for (i = 0; i < Modules.length; i++) {
      Collections[i] = new Mongo.Collection(Modules[i].name);
   }
})();

Meteor.methods({
   addRegistration: (registration, collection) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      registration.createdBy = Meteor.userId();
      registration.createdAt = new Date();

      Mongo.Collection.get(collection).insert(registration);
   }
});