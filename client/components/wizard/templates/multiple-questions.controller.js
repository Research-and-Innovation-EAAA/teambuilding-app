angular.module('leukemiapp').controller('multipleQuestionsController', multipleQuestionsController);

function multipleQuestionsController($scope, $reactive, WizardHandler, $ionicScrollDelegate, WizardState, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.config = {};

    $scope.$watch(
        function stepNumber(scope) {
            return WizardHandler.wizard().currentStepNumber();
        },
        function (newValue, oldValue) {
            initUi();
            updateSessionVariables();
        }
    );

    initUi();
    function initUi() {
        var dataType = Session.get('registrationType');
        vm.stepNumber = WizardHandler.wizard().currentStepNumber();
        WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);

        var step = {};
        var config = {};

        for (i = 0; i < Modules.length; i++) {
            if (Modules[i].name === dataType) {

                if (Modules[i].wizard.steps[vm.stepNumber - 2] !== undefined) {
                    step = Modules[i].wizard.steps[vm.stepNumber - 2];

                    if (step.stepTemplate.config !== undefined) {
                        if (vm.stepTemplateUrl !== undefined && vm.stepTemplateUrl !== step.stepTemplate.url)
                            return;
                        vm.config = step.stepTemplate.config;
                        vm.stepTemplateUrl = step.stepTemplate.url;
                    } else {
                        console.error('No config defined for module ', dataType, ' step number ', vm.stepNumber);
                    }
                } else {
                    console.error('Step undefined for module ', dataType, ' step number ', vm.stepNumber);
                }
                break;
            }
        }
        console.log("config is ", vm.config);

        vm.questions = vm.config.questions;
        vm.mandatory = vm.config.mandatory;

        vm.registration = WizardState[dataType];
    }


    vm.selected = (question, answer) => {
        return vm.registration[question.propertyName] === answer;
    }

    vm.isSmallScreen = () => {
        return window.innerWidth < 768;
    };

    vm.updateRegistration = () => {
        updateSessionVariables();
    };

    vm.selectAnswer = function (questionPropertyName, newValue) {
        vm.registration[questionPropertyName] = newValue;

        vm.updateRegistration();
    };

    vm.validateData = (registration, from, to) => {
        if (vm.mandatory) {
            var valid = true;
            var start = (typeof from=="number"&&from>=0)?from:0;
            var end = (typeof to=="number" && to<=module.wizard.steps.length)?to:module.wizard.steps.length-1;

            if (registration) {
                for (i=start; i<=end; i++) {
                    valid = valid && module.wizard.steps[i].validation(registration);
                }
            }
            return valid;
        }
        else return true;
    }

    function updateSessionVariables() {
        var validated = Session.get('regValidated');
        if (validated === undefined)
            validated = [];

        validated[vm.stepNumber - 1] = vm.validation(vm.registration);
        Session.set('regValidated', validated);
        console.log('regValidated session variable updated: ', validated);
    }
}