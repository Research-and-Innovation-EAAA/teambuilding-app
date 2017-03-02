angular.module('leukemiapp').controller('questionWizardController', QuestionWizardController);

function QuestionWizardController($scope, $rootScope, $reactive, $ionicPopup, $ionicScrollDelegate, $translate, WizardHandler, WizardState, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;
    vm.modules = {};
    vm.moduleNames = {};

    for (moduleNumber = 0; moduleNumber < Modules.length; moduleNumber++) {
        var moduleSteps = {};

        var module = Modules[moduleNumber];

        for (stepNumber = 0; stepNumber < module.wizard.steps.length; stepNumber++) {
            var stepName = module.wizard.steps[stepNumber].stepName;
            var stepTemplate = module.wizard.steps[stepNumber].stepTemplate;

            if (stepTemplate.url !== undefined) {
                stepTemplate = stepTemplate.url;
            }

            moduleSteps[stepName] = stepTemplate;
        }

        vm.modules[module._id] = moduleSteps;
        vm.moduleNames[module._id] = module.name;
    }

    vm.moduleId = Session.get('registrationType');
    vm.viewTitle = $translate.instant(vm.moduleNames[vm.moduleId]);
    vm.steps = Object.keys(vm.modules[vm.moduleId]);
    vm.stepNumber = 0; //First template, goes from 0 .. x
    vm.stepName = "";
    WizardStateAccessor.setRegistration(vm.moduleId, {});

    vm.helpers({
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        }
    });

    vm.nextWizardStep = () => {
        var valid = vm.validateData();

        if (!valid && vm.errorPopup === undefined) {
            vm.errorPopup = $ionicPopup.alert({
                title: $translate.instant('wizard.invalidInputTitle'),
                template: $translate.instant('wizard.invalidInput')
            }).then(function (res) {
                vm.errorPopup = undefined;
            });
        }

        return valid;
    };

    vm.validateData = () => {
        return WizardStateAccessor.validate(vm.moduleId, getRegistration(), vm.stepNumber, vm.stepNumber);
    };

    var getRegistration = () => {
        return WizardStateAccessor.getRegistration(vm.moduleId);
    }

    vm.finishButtonText = () => {
        var registration = getRegistration();
        if (registration)
            return registration._id ? $translate.instant('wizard.update') : $translate.instant('wizard.save');
        else
            return '';
    };

    vm.finishWizard = function () {
        //setTimeout(function () {
        console.log("Run finish wizard");
        if (vm.validateData()) {
            var registration = getRegistration();

            console.log('vm.finishWizard is called!');
            for (var property in registration) {
                if (registration.hasOwnProperty(property)) {
                    if (registration[property] == null) {
                        registration[property] = "-";
                    }
                }
            }

            console.log("Save reg: ", registration);


            Meteor.call('addRegistration', registration, vm.moduleId, (error, result) => {
                if (error) {
                    saveError();
                } else {
                    saveOk();
                }
            });

        }
        //}, 100);
    };

    vm.cancelRegistration = () => {
        WizardStateAccessor.setRegistration(vm.moduleId, undefined);
        Session.set('regValidated', undefined);
        $rootScope.$ionicGoBack();
    };

    vm.stepLoaded = () => {
        if (vm.stepNumber > 0) {
            var analyticsSettings = Settings.findOne({key: 'analytics'});
            if (analyticsSettings && analyticsSettings.value) {
                var type = Session.get('registrationType');
                var title = vm.viewTitle;
                analytics.page(title, {
                    title: title,
                    path: "questionwizard/" + type + "/" + vm.stepNumber
                });
            }
        }

        $scope.$broadcast('stepLoaded', {
            moduleId: vm.moduleId,
            stepNumber: vm.stepNumber
        });
    };

    function saveOk() {
        $ionicPopup.alert({
            title: vm.viewTitle,
            content: $translate.instant('wizard.saved')
        });
        WizardStateAccessor.setRegistration(vm.moduleId, undefined);
        Session.set('regValidated', undefined);

        var analyticsSettings = Settings.findOne({key: 'analytics'});
        if (!!analyticsSettings.value) {
            analytics.track("Registration Completed " + vm.moduleId, {
                type: vm.moduleId
            });
        }
    }

    function saveError() {
        $ionicPopup.alert({
            title: vm.viewTitle,
            content: $translate.instant('wizard.failed')
        });
    }


    $scope.$watch(
        function steps() {
            return vm.stepName;
        },
        function (newValue, oldValue) {
            vm.stepNumber = WizardHandler.wizard().currentStepNumber();
            vm.template = undefined;
            setTimeout(function () {
                vm.template = vm.modules[vm.moduleId][vm.steps[vm.stepNumber - 1]];
                if (newValue != oldValue) {
                    $ionicScrollDelegate.scrollTop();
                }
            });
        }
    );
}