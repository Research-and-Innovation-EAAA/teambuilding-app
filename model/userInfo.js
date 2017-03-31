UserInfo = new Mongo.Collection("userInfo");

Meteor.startup(() => {
    if (Meteor.isServer) {
        UserInfo._ensureIndex({"userId": 1});
    }
});