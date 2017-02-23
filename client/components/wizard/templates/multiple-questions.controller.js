angular.module('leukemiapp').controller('multipleQuestionsController', multipleQuestionsController);

function multipleQuestionsController($scope, $reactive, WizardHandler, $ionicScrollDelegate, WizardState, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.config = {};
    vm.dataType = Session.get('registrationType');

    $scope.$watch(
        function stepNumber(scope) {
            return WizardHandler.wizard().currentStepNumber();
        },
        function (newValue, oldValue) {
            initUi();
        }
    );

    initUi();
    function initUi() {

        vm.stepNumber = WizardHandler.wizard().currentStepNumber();
        WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);

        var step = {};
        var config = {};

        for (i = 0; i < Modules.length; i++) {
            if (Modules[i].name === vm.dataType) {

                if (Modules[i].wizard.steps[vm.stepNumber - 1] !== undefined) {
                    step = Modules[i].wizard.steps[vm.stepNumber - 1];

                    if (step.stepTemplate.config !== undefined) {
                        if (vm.stepTemplateUrl !== undefined && vm.stepTemplateUrl !== step.stepTemplate.url)
                            return;
                        vm.config = step.stepTemplate.config;
                        vm.stepTemplateUrl = step.stepTemplate.url;
                    } else {
                        console.error('No config defined for module ', vm.dataType, ' step number ', vm.stepNumber);
                    }
                } else {
                    console.error('Step undefined for module ', vm.dataType, ' step number ', vm.stepNumber);
                }
                break;
            }
        }
        console.log("config is ", vm.config);

        vm.questions = vm.config.questions;
        vm.mandatory = vm.config.mandatory;

        vm.registration = WizardState[vm.dataType];
    }


    vm.selected = (question, answer) => {
        return vm.registration[question.propertyName] === answer;
    }

    vm.isSmallScreen = () => {
        return window.innerWidth < 768;
    };

    vm.selectAnswer = function (questionPropertyName, newValue) {
        vm.registration[questionPropertyName] = newValue;
    };

    vm.validateData = (registration) => {
        if (vm.mandatory) {
            for (question in vm.questions) {
                if (!registration[vm.questions[question].propertyName]) {
                    return false;
                }
            }
        }
        return true;
    }
}