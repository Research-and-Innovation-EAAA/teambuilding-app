UserInfo = new Mongo.Collection("userInfo");

UserInfo.deny({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

Meteor.startup(() => {
    if (Meteor.isServer) {
        UserInfo._ensureIndex({"userId": 1});
    }
});