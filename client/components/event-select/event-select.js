angular.module('leukemiapp').controller('eventSelectController', EventSelectController);

function EventSelectController($scope, $location, $reactive, $ionicNavBarDelegate, $ionicPopup, $translate, $timeout, $animate) {
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

    vm.myPopup;
    vm.closePopup = function () {
        console.log("CLOSE IT PLS");
        if (vm.myPopup && typeof vm.myPopup.close === 'function')
            vm.myPopup.close();
    }

    vm.showEvent = function () {
        var event = _.where(vm.events, {password: vm.eventPassword})[0];
        console.log(event);

        if (event != null) {
            Session.set('eventId', event._id);
            Session.set('event', event);
            $location.path("app/event");
        }
        else {
            var animationName = "animated shake";
            $('#eventpassword').addClass("inputError");
            $('#eventpassword').addClass(animationName).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                $('#eventpassword').removeClass(animationName);
                $('#eventpassword').removeClass("inputError");
            });

            /*vm.myPopup = $ionicPopup.alert({
             title: $translate.instant("errorNoEventFound"),
             template: $translate.instant("errorEventCode") + "<input autofocus ng-enter='vm.closePopup();' style='position: absolute; left: -9999px'>"
             });*/
        }
    }

    vm.backToLogout = function () {
        Meteor.logout(function () {
            // Clear all keys
            Object.keys(Session.keys).forEach(function (key) {
                Session.set(key, undefined);
            });
            Session.keys = {};

            $location.path("app/login");
        });
    }

    vm.goToEditor = function () {
        $location.path("app/editor");
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

