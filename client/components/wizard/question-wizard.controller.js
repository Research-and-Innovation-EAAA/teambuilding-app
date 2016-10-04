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

    vm.helpers({
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        }
    });

    //Check if registration is newly created or updated
    $scope.$on('$ionicView.enter', () => {
        $ionicScrollDelegate.$getByHandle('wizardStepContent').freezeScroll(false);

        var registration = Session.get('registration');
        if (registration && registration._id) {
            //Skips timestamp registration
            vm.stepNumber = 1;
        }
    });

    vm.validateData = () => {
        var registration = getRegistration();
        var valid = WizardStateAccessor.validate(vm.dataType, registration, vm.stepNumber, vm.stepNumber);

        if (!valid && vm.errorPopup === undefined) {

            var stepno = WizardHandler.wizard().currentStepNumber();
            if (vm.stepNumber == 1) {
                vm.errorPopup = $ionicPopup.confirm({
                    title: $translate.instant('wizard.existingRecordTitle'),
                    template: $translate.instant('wizard.existingRecord')
                }).then((res) => {
                    if (res) {
                        //update initiated
                        valid=true;
                        Session.set('updating',true);
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

        return valid;
    };

    var getRegistration = () => {
        return WizardStateAccessor.getRegistration(vm.dataType);
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

                console.log("Save reg: ",registration);

                if (registration._id) {
                    //registration.updating = undefined;
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
            return vm.stepName;
        },
        function (newValue, oldValue) {
            vm.stepNumber = WizardHandler.wizard().currentStepNumber();
        }
    );

    $scope.$watch(
        function steps() {
            return vm.stepNumber;
        },
        function (newValue, oldValue) {
            vm.template = vm.modules[vm.dataType][vm.steps[newValue-1]];
            if (WizardHandler.wizard().currentStepNumber()!=newValue)
                WizardHandler.wizard().goTo(newValue);
            if (newValue != oldValue) {
                $ionicScrollDelegate.scrollTop();
            }
        }
    );
}