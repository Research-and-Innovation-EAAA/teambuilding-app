angular.module('leukemiapp').controller('multipleQuestionsController', multipleQuestionsController);

function multipleQuestionsController($scope, $reactive, WizardHandler, $ionicScrollDelegate) {
    $reactive(this).attach($scope);
    var vm = this;

    //Init
    var dataType = Session.get('registrationType');
    var stepNumber = WizardHandler.wizard().currentStepNumber();

    var step = {};
    var config = {};

    for (i = 0; i < Modules.length; i++) {
        if (Modules[i].name === dataType) {

            if (Modules[i].wizard.steps[stepNumber - 2] !== undefined) {
                step = Modules[i].wizard.steps[stepNumber - 2];

                if (step.stepTemplate.config !== undefined) {
                    config = step.stepTemplate.config;
                } else {
                    console.error('No config defined for module ', dataType, ' step number ', stepNumber);
                }
            } else {
                console.error('Step undefined for module ', dataType, ' step number ', stepNumber);
            }
            break;
        }
    }
    console.log("config is ", config);

    vm.questions = config.questions;


    vm.registration = Session.get('registration');


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

    function updateSessionVariables() {
        var validated = Session.get('regValidated');
        if (validated === undefined)
            validated = [];

        validated[stepNumber - 1] = step.validation(vm.registration);
        Session.set('regValidated', validated);
        console.log('regValidated session variable updated: ', validated);

        Session.set('registration', vm.registration);
        console.log('Registration updated: ', vm.registration);
    }
}