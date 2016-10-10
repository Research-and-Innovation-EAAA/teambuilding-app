Meteor.startup(function () {
    var kadiraSettings = Settings.findOne({key: 'kadira'});
    if (kadiraSettings.value) {
        console.log("kadira turned on");
        var kadAcct = Meteor.settings.public;
        if (kadAcct)
            kadAcct = kadAcct.analyticsSettings;
        if (kadAcct)
            kadAcct = kadAcct.KadiraAccount;
        if (kadAcct)
            Kadira.connect(kadAcct.appId, kadAcct.appSecret);
    }
    else console.log("kadira turned off");
});
