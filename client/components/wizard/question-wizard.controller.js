angular.module('leukemiapp').controller('questionWizardController', QuestionWizardController);

function QuestionWizardController($scope, $rootScope, $reactive, $ionicPopup, $ionicScrollDelegate, $translate, WizardHandler, WizardState, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;
    vm.modules = {};

    for (moduleNumber = 0; moduleNumber < Modules.length; moduleNumber++) {
        var moduleSteps = {};
        moduleSteps[$translate.instant("wizard.time")] = "client/components/wizard/timestamp/qw-timestamp.html";

        var module = Modules[moduleNumber];

        for (stepNumber = 0; stepNumber < module.wizard.steps.length; stepNumber++) {
            var stepName = module.wizard.steps[stepNumber].stepName;
            var stepTemplate = module.wizard.steps[stepNumber].stepTemplate;

            if (stepTemplate.url !== undefined) {
                stepTemplate = stepTemplate.url;
            }

            moduleSteps[stepName] = stepTemplate;
        }

        vm.modules[module.name] = moduleSteps;
    }

    vm.dataType = Session.get('registrationType');
    vm.viewTitle = $translate.instant(vm.dataType);
    vm.steps = Object.keys(vm.modules[vm.dataType]);
    vm.stepNumber = 0; //First template, goes from 0 .. x
    vm.stepName = "";


    $scope.$watch(
        function templateUrl(scope) {
            return vm.stepNumber;
        },
        function (newValue, oldValue) {

            vm.template = vm.modules[vm.dataType][vm.steps[newValue]];

        }
    );


    vm.helpers({
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        }
    });

    //Check if registration is newly created or updated
    $scope.$on('$ionicView.enter', () => {
        $ionicScrollDelegate.$getByHandle('wizardStepContent').freezeScroll(false);

        var registration = Session.get('registration');
        if (registration != null && registration.updating) {

            WizardStateAccessor.validate(vm.dataType);

            /*    var registration = getRegistation();
            if (registration && typeof registration._validate === "function")
                registration._validate(); */
            var validated = Session.get('regValidated');
            if (validated == null) {
                validated = [];
                validated[0] = true;
            }
            Session.set('regValidated', validated);

            //Skips timestamp registration
            vm.stepNumber = 1;
            WizardHandler.wizard().goTo(vm.stepNumber);
        }
    });

    vm.validateData = () => {
        var registration = getRegistation();
        WizardStateAccessor.validate(vm.dataType, registration);
        /* if (registration && typeof registration._validate === "function")
            registration._validate(); */
        var validated = Session.get('regValidated');
        //goes from 1 .. x
        var stepNumber = WizardHandler.wizard().currentStepNumber();

        if (validated && !validated[stepNumber - 1] && vm.errorPopup === undefined) {

            if (stepNumber == 1) {
                vm.errorPopup = $ionicPopup.confirm({
                    title: $translate.instant('wizard.existingRecordTitle'),
                    template: $translate.instant('wizard.existingRecord')
                }).then((res) => {
                    if (res) {
                        //update initiated
                        validated[0] = true;
                        Session.set('regValidated', validated);
                        WizardHandler.wizard().next();
                        vm.stepNumber = vm.stepNumber + 1;
                        vm.errorPopup = undefined;
                    } else {
                        //update cancelled
                        vm.errorPopup = undefined;
                    }
                });
            } else {
                vm.errorPopup = $ionicPopup.alert({
                    title: $translate.instant('wizard.invalidInputTitle'),
                    template: $translate.instant('wizard.invalidInput')
                }).then(function (res) {
                    vm.errorPopup = undefined;
                });
            }
        }

        return validated[stepNumber - 1];
    };

    var getRegistation = () => {
        return WizardStateAccessor.getRegistration(Session.get('registrationType'));
    }

    vm.finishButtonText = () => {
        var registration = getRegistation();
        if (registration)
            return registration.updating ? $translate.instant('wizard.update') : $translate.instant('wizard.save');
        else
            return '';
    };

    vm.finishWizard = function () {
        //setTimeout(function () {
            console.log("Run finish wizard");
            if (vm.validateData()) {
                var registration = getRegistation();

                console.log('vm.finishWizard is called!');
                for (var property in registration) {
                    if (registration.hasOwnProperty(property)) {
                        if (registration[property] == null) {
                            registration[property] = "-";
                        }
                    }
                }

                console.log("Save reg: ",registration);

                if (registration.updating) {
                    registration.updating = undefined;
                    Meteor.call('updateRegistration', registration, (error, result) => {
                        if (error) {
                            saveError();
                        } else {
                            updateOk();
                        }
                    });
                } else {
                    Meteor.call('addRegistration', registration, vm.dataType, (error, result) => {
                        if (error) {
                            saveError();
                        } else {
                            saveOk();
                        }
                    });
                }

            }
        //}, 100);
    };

    vm.cancelRegistration = () => {
        WizardStateAccessor.setRegistration(vm.dataType,undefined);
        Session.set('regValidated', undefined);
        $rootScope.$ionicGoBack();
    };

    vm.stepLoaded = () => {
        if (vm.stepNumber > 0) {
            var analyticsSettings = Settings.findOne({key: 'analytics'});
            if (!!analyticsSettings.value) {
                var type = Session.get('registrationType');

                console.log("questionwizard/" + type + "/" + vm.stepNumber);

                var title = $translate.instant(vm.dataType);
                analytics.page(title, {
                    title: title,
                    path: "questionwizard/" + type + "/" + vm.stepNumber
                });
            }
        }

        $scope.$broadcast('stepLoaded', {
            dataType: vm.dataType,
            stepNumber: vm.stepNumber
        });
    };

    /* vm.nextStep = () =>{
     if (vm.validateData()) {
     qwiz.stepNumber = qwiz.stepNumber + 1;
     return true;
     }
     return false;
     //   qwiz.stepLoaded();
     };*/

    function saveOk() {
        $ionicPopup.alert({
            title: $translate.instant(vm.dataType),
            content: $translate.instant('wizard.saved')
        });
        WizardStateAccessor.setRegistration(vm.dataType,undefined);
        Session.set('regValidated', undefined);

        var analyticsSettings = Settings.findOne({key: 'analytics'});
        if (!!analyticsSettings.value) {
            analytics.track("Registration Completed " + vm.dataType, {
                type: vm.dataType
            });
        }
    }

    function saveError() {
        $ionicPopup.alert({
            title: vm.dataType,
            content: $translate.instant('wizard.failed')
        });
    }

    function updateOk() {
        $ionicPopup.alert({
            title: vm.dataType,
            content: $translate.instant('wizard.updated')
        });
        WizardStateAccessor.setRegistration(vm.dataType,undefined);
        Session.set('regValidated', undefined);

        var analyticsSettings = Settings.findOne({key: 'analytics'});
        if (!!analyticsSettings.value) {
            analytics.track("Registration Updated " + vm.dataType, {
                type: vm.dataType
            });
        }
    }

    $scope.$watch(
        function steps() {
            return vm.stepNumber;
        },
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                $ionicScrollDelegate.scrollTop();
            }
        }
    );
}