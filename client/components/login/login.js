angular.module('leukemiapp').controller('loginController', LoginController);

function LoginController($scope, $rootScope, $location, $reactive, $ionicNavBarDelegate, $timeout) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.email = "";
    vm.password = "";

    vm.submit = function () {
        var user = {'email': vm.email, 'password': vm.password};

        Accounts.createUser(user, function (err) {
            if (!err) {
                $location.path("app/event");
            } else {
                console.error(err);
                if (err.error === 403) { // Email already exists.
                    Meteor.loginWithPassword(vm.email, vm.password, function (err) {
                        if (!err) {
                            $location.path("app/eventselect");
                        }
                        else {
                            alert("This email is already in the system, but the password does not match.");
                        }
                    });
                }
                else {
                    alert("Cannot create a user. Check internet connection and try again later.");
                    console.error(err);
                }

            }
        });
    };


    $scope.$on('$ionicView.enter', function () {
        $timeout(function () {
            $ionicNavBarDelegate.align('center');
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

