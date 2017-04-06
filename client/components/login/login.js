angular.module('leukemiapp').controller('loginController', LoginController);

function LoginController($scope, $rootScope, $location, $reactive, $ionicNavBarDelegate, $ionicLoading, $ionicHistory, $ionicPopup, $timeout) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.email = "";
    vm.password = "";

    vm.myPopup;
    vm.closePopup = function () {
        if (vm.myPopup && typeof vm.myPopup.close === 'function')
            vm.myPopup.close();
    }

    //Analytics
    Accounts.onLogin(function () {
        ga('set', 'userId', Meteor.userId()); // Set the user ID using signed-in user_id.
        ga('set', 'dimension1', Meteor.userId()); // Set the custom dimension in Google Analytics to store the actual userId
    });

    vm.submit = function () {
        var user = {'email': vm.email, 'password': vm.password};

        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in'
        });

        Accounts.createUser(user, function (err) {
            $ionicLoading.hide();

            if (!err) {
                $location.path("app/eventselect");
            } else {
                if (err.error === 403) { // Email already exists => try to log in
                    Meteor.loginWithPassword(vm.email, vm.password, function (err) {
                        if (!err) {
                            $location.path("app/eventselect");
                        }
                        else {
                            vm.myPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: "This email is already in the system, but the password does not match.<input autofocus ng-enter='vm.closePopup();' style='position: absolute; left: -9999px'>"
                            });
                        }
                    });
                }
                else if (err.error === 400) { // input error
                    vm.myPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: "Please fill in all the fields." + "<input autofocus ng-enter='vm.closePopup()' style='position: absolute; left: -9999px'>"
                    });
                }
                else {
                    vm.myPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: "Cannot create a user. Check internet connection and try again later. " + err + "<input autofocus ng-enter='vm.closePopup()' style='position: absolute; left: -9999px'>"
                    });

                    console.error(err);
                }

            }
        });
    };

    $scope.$on('$ionicView.beforeEnter', function () {
        $ionicHistory.clearHistory(); // hide back button
        $ionicHistory.clearCache();

        if (!!Meteor.userId()) { // skip this view, if the user is already logged in
            console.log("already logged in, skipping login screen");
            $ionicHistory.nextViewOptions({
                disableAnimate: true
            });
            $location.path("app/eventselect");
            return;
        }
    });

    $scope.$on('$ionicView.enter', function () {
        $timeout(function () {
            $ionicNavBarDelegate.align('center');

            vm.email = "";
            vm.password = "";
        });
    });


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

