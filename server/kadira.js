Meteor.startup(function () {
    // Kadira.connect('SPS9uvJebd9eWc9vw', 'f7ff3f42-a832-4d50-a981-8c4da6d5ade6');
    // ↑previous

    // ↓Jakub's
    var kadiraSettings = Settings.findOne({key: 'kadira'});

    if (!!kadiraSettings.value) {
        console.log("kadira turned on");
        Kadira.connect('oa9KTw9kahpHAupAS', '62c0c9d9-be0d-4ab5-8982-e01e704bfb54');
    }
    else console.log("kadira turned off");
});