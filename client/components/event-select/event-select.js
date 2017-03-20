angular.module('leukemiapp').controller('eventSelectController', EventSelectController);

function EventSelectController($scope, $rootScope, $location, $reactive, $ionicNavBarDelegate, $ionicPopup, $timeout) {
    $reactive(this).attach($scope);
    var vm = this;

    //Code to be run every time view becomes visible
    //----------------------------------------------
    $scope.$on('$ionicView.beforeEnter', function (event, data) {
        vm.autorun(() => {
            vm.subscribe('events',
                () => [],
                () => {
                    console.log('Subscription ready for events card!');
                    vm.events = Events.find().fetch();
                });
        });
    });

    vm.events = Events.find().fetch();
    vm.eventPassword = "";

    $scope.$on('$ionicView.enter', function () {
        $timeout(function () {
            $ionicNavBarDelegate.align('center');
        });
    });

    vm.showEvent = function () {
        var event = _.where(vm.events, {password: vm.eventPassword})[0];
        // var event = Events.findOne({password:vm.eventPassword}); TODO not working???? return undefined, nothing in the collection?
        console.log(event);

        if (event != null) {
            Session.set('eventId', event._id);
            Session.set('event', event);
            $location.path("app/event");
        }
        else {
            $ionicPopup.alert({
                title: 'No event found!',
                template: "Incorrect event code. Please try again."
            });
        }
    }

    vm.backToLogout = function () {
        Meteor.logout(function () {
            $location.path("app/login");
        });
    }


    /*   //Analytics
     Accounts.onLogin(function () {
     ga('set', 'userId', Meteor.userId()); // Set the user ID using signed-in user_id.
     ga('set', 'dimension1', Meteor.userId()); // Set the custom dimension in Google Analytics to store the actual userId
     });*/
    /*
     Meteor.subscribe("settings", function () {
     var analyticsSettings = Settings.findOne({key: 'analytics'});
     console.log("Analytics settings", analyticsSettings);
     if (!!analyticsSettings.value) {
     console.log("turning on analytics");
     $rootScope.$on('$stateChangeSuccess', function (event, toState) {
     $timeout(function () {
     var type = "", title = "";

     if (toState.url == "/questionwizard") {
     type = Session.get('registrationType');
     title = Session.get('registrationType');
     }
     else if (toState.url == "/graphdata") {
     type = Session.get('graphDataType');
     title = Session.get('graphDataType');
     }
     else {
     title = "How-R-you";
     }
     console.log(toState.url + "/" + type + " | " + title);

     analytics.page(title, {
     title: title,
     path: toState.url + "/" + type
     });
     });
     });
     }
     else console.log("turning off analytics");
     });
     */
}

