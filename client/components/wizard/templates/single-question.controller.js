angular.module('leukemiapp').controller('singleQuestionController', singleQuestionController);

function singleQuestionController($scope, $reactive, WizardHandler, $ionicScrollDelegate) {
    $reactive(this).attach($scope);
    var vm = this;

    $ionicScrollDelegate.$getByHandle('wizardStepContent').freezeScroll(false);

    vm.config = {};

    $scope.$watch(
        function stepNumber(scope) {
            return WizardHandler.wizard().currentStepNumber();
        },
        function (newValue, oldValue) {
            initUi();
        }
    );

    initUi();
    function initUi(){
        var dataType = Session.get('registrationType');
        vm.stepNumber = WizardHandler.wizard().currentStepNumber();

        var step = {};

        for (i = 0; i < Modules.length; i++) {
            if (Modules[i].name === dataType) {

                if (Modules[i].wizard.steps[vm.stepNumber - 2] !== undefined) {
                    step = Modules[i].wizard.steps[vm.stepNumber - 2];

                    if (step.stepTemplate.config !== undefined) {
                        vm.config = step.stepTemplate.config;
                    } else {
                        console.error('No config defined for module ', dataType, ' step number ', vm.stepNumber);
                    }
                } else {
                    console.error('Step undefined for module ', dataType, ' step number ', vm.stepNumber);
                }
                break;
            }
        }

        vm.registration = Session.get('registration');

        console.log("config is ", vm.config);
        vm.question = vm.config.question;
        vm.answers = vm.config.answers;
        vm.mandatory = vm.config.mandatory;
        vm.propertyName = vm.config.propertyName;
    }

    vm.selectAnswer = (answer) => {
        vm.registration[vm.config.propertyName] = answer;
        updateSessionVariables();
    };

    vm.validation = (registration) => {
        if (vm.mandatory) {
            return registration[vm.config.propertyName] != null;
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

        Session.set('registration', vm.registration);
        console.log('Registration updated: ', vm.registration);
    }

    updateSessionVariables();
}