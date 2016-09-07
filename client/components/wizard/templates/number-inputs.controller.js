angular.module('leukemiapp').controller('numberInputsController', numberInputsController);

function numberInputsController($scope, $reactive, WizardHandler) {
    $reactive(this).attach($scope);
    var vm = this;

    var module = Modules[1];


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
    vm.mandatory = config.mandatory;

    vm.registration = Session.get('registration');

    function initData() {
        for (question in vm.questions) {
            console.warn("připravit pozor", vm.questions[question]);
            if (vm.registration[vm.questions[question].propertyName] === undefined)
                vm.registration[vm.questions[question].propertyName] = null;
        }

        validateData();
        vm.init = true;
    }

    $scope.$on('stepLoaded', (event, data) => {
        if (data['dataType'] === Session.get('registrationType')) {
            console.log(data['dataType'], 'step loaded! Step number:', data['stepNumber']);

            if (data['stepNumber'] == 1 && !vm.init) {
                initData();
            }
        }
    });

    vm.validation = (registration) => {
        if (vm.mandatory) {
            for (question in vm.questions) {
                if (registration[vm.questions[question].propertyName] == null) {
                    return false;
                }
            }
            return true;
        }
        else return true;
    }

    function validateData() {
        var validated = Session.get('regValidated');
        if (validated === undefined)
            validated = [];

        validated[stepNumber - 1] = vm.validation(vm.registration);
        Session.set('regValidated', validated);
        console.log('regValidated session variable updated: ', validated);
    }

    vm.updateRegistration = () => {
        validateData();
        Session.set('registration', vm.registration);
        console.log('Registration updated');
        console.log(vm.registration);
    }

    if (!vm.init) {
        initData();
    }
}