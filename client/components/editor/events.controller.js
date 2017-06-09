angular.module('leukemiapp').controller('editorController', EditorController);

function EditorController($scope, $rootScope, $reactive, $ionicModal, $ionicNavBarDelegate, $location, $timeout) {
    $reactive(this).attach($scope);
    var vm = this;

    $scope.$on('$ionicView.beforeEnter', function (event, data) {
        vm.autorun(() => {
            var user = Meteor.user();
            if (!user || !user.profile || !user.profile.admin) {
                $location.path("app/eventselect");
            }

            else {
                vm.autorun(() => {
                    vm.subscribe('events',
                        () => [],
                        () => {
                            console.log('Subscription ready for events!');
                            vm.events = Events.find().fetch();
                        });
                });
            }
        });
    });

    //vm.events = Events.find().fetch();


    function getModules() {
        return Events.find().fetch();
    };

    vm.refresh = function () {
        vm.events = getModules();
        // console.log(JSON.stringify(vm.events));
        $scope.$broadcast('scroll.refreshComplete');
    }


    $scope.$on('$ionicView.enter', function () {
        $timeout(function () {
            $ionicNavBarDelegate.align('center');
        });
    });

    vm.backToLogout = function () {
        Meteor.logout(function () {
            Object.keys(Session.keys).forEach(function (key) {
                Session.set(key, undefined);
            });
            Session.keys = {};

            $location.path("app/login");
        });
    };

    vm.backToEvents = function () {
        Session.set('eventId', null);
        Session.set('event', null);

        $location.path("app/eventselect");
    };


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


    vm.openModal = function (eventId) {
        console.log("OPEN MODAL CALLED: " + eventId);
        Session.set('eventId', eventId);

        $location.path("app/editevent");
    };

    $scope.closeModal = function () {
        vm.modal.hide();
        console.log('activeModules at vm.closeModal: ', vm.modules);
    };

    $scope.$on('modal.hidden', function () {
        console.log('activeModules at modal.hidden', vm.modules);
        vm.refresh();

    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        console.log('activeModules at modal.removed', vm.modules);
    });
}

