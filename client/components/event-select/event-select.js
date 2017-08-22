angular.module('leukemiapp').controller('eventSelectController', EventSelectController);

function EventSelectController($scope, $location, $reactive, $ionicNavBarDelegate, $ionicPopup, $translate, $timeout, $animate, SessionSetting) {
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

    vm.change = function()  {
        console.log("Change Event: '"+vm.eventPassword+"'");
    }

    vm.myPopup;
    vm.closePopup = function () {
        console.log("CLOSE IT PLS");
        if (vm.myPopup && typeof vm.myPopup.close === 'function')
            vm.myPopup.close();
    }

    vm.showEvent = function () {
        var event = _.where(vm.events, {password: vm.eventPassword})[0];
        console.log("NoOfEvents: "+Events.find().count());
        console.log("Event: '"+vm.eventPassword+"'");

        if (event != null) {
            SessionSetting.setValue('eventId', event._id);
            SessionSetting.setValue('event', event);
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
            SessionSetting.clearAllValues();
            $location.path("app/login");
        });
    }

    vm.goToEditor = function () {
        $location.path("app/editor");
    }

}

