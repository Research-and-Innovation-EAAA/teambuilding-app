angular.module('leukemiapp').controller('frontpageController', FrontpageController);

function FrontpageController($scope, $rootScope, $reactive, $ionicModal, $ionicNavBarDelegate, $ionicHistory, $location, WizardStateAccessor, $timeout) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.event = Session.get('event');

    function getModules(){
        // get IDs of modules from completed registrations of a particular user
        var reg =  Registrations.find({
                $and: [
                    {moduleId: {$exists: true}},
                    {createdBy: Meteor.userId()},
                    {createdBy: {$exists: true}}
                ]},
            {moduleId: 1, _id: 0} // projection is not working
        ).fetch();
        reg = _.pluck(reg, 'moduleId');
        reg = _.uniq(reg);

        var now = new Date();

        return CustomModules.find(
            {
                _id : {$nin: reg}, // filter already filled in
                eventId: vm.event._id,
                startTime: {$lte: now, $exists: true},
                endTime: {$gte: now, $exists: true}
            }
        ).fetch();
    }

    vm.futureModules = function(){
        var now = new Date();

        return CustomModules.find(
            {
                eventId: vm.event._id,
                startTime: {$gte: now, $exists: true},
            }
        ).count();
    }

    vm.refresh = function (){
        vm.modules = getModules();
        console.log(JSON.stringify(vm.modules));
        $scope.$broadcast('scroll.refreshComplete');
    }

    //Code to be run every time view becomes visible
    //----------------------------------------------
    $scope.$on('$ionicView.beforeEnter', function (event, data) {
        vm.autorun(() => {
            var now = new Date();

            vm.subscribe('modulesAndRegistrations',
                () => [],
                () => {
                    console.log('Subscription ready for modules and registrations!');
                    vm.modules = getModules();
                    console.log(JSON.stringify(vm.modules));
                });
        });
    });


    /*    Accounts.ui.config({
     passwordSignupFields: "USERNAME_ONLY"
     });*/

    $scope.$on('$ionicView.enter', function () {
        $timeout(function () {
            $ionicNavBarDelegate.align('center');
        });
    });

    vm.backToLogout = function(){
        Meteor.logout(function(){
            $location.path("app/login");
        });
    }


    //Analytics
    Accounts.onLogin(function () {
        ga('set', 'userId', Meteor.userId()); // Set the user ID using signed-in user_id.
        ga('set', 'dimension1', Meteor.userId()); // Set the custom dimension in Google Analytics to store the actual userId
    });
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


    vm.newRegistration = (moduleIndex) => {
        var module = vm.modules[moduleIndex];

        if (module == null) {
            console.error("Module index " + moduleIndex + " not found");
            return;
        }

        Session.set('registrationType', module._id);
        WizardStateAccessor.setRegistration(module._id, undefined);
        Session.set('updating', undefined);
        $location.path("app/questionwizard");
    };


    //Settings for turning modules on/off

    $ionicModal.fromTemplateUrl("client/components/settings/settings.html", {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        vm.modal = modal;
        $scope.modal = modal;
    });

    vm.openModal = function () {
        vm.modal.show();
    };

    $scope.closeModal = function () {
        vm.modal.hide();
        console.log('activeModules at vm.closeModal: ', vm.modules);
    };

    $scope.$on('modal.hidden', function () {
        console.log('activeModules at modal.hidden', vm.modules);
        refreshModules();
        //$ionicScrollDelegate.$getByHandle('front-page-scroll').resize();
        //$ionicScrollDelegate.$getByHandle('front-page-scroll').scrollTop();
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        console.log('activeModules at modal.removed', vm.modules);
    });
}

