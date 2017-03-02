angular.module('leukemiapp').controller('numberInputsController', numberInputsController);

function numberInputsController($scope, $reactive, WizardHandler, WizardState, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.config = {};
    vm.dataType = Session.get('registrationType');

    initUi();
    function initUi() {

        vm.stepNumber = WizardHandler.wizard().currentStepNumber();

        var step = {};
        var config = {};

        for (i = 0; i < Modules.length; i++) {
            if (Modules[i]._id === vm.dataType) {

                if (Modules[i].wizard.steps[vm.stepNumber - 1] !== undefined) {
                    step = Modules[i].wizard.steps[vm.stepNumber - 1];

                    if (step.stepTemplate.config !== undefined) {
                        if (vm.stepTemplateUrl !== undefined && vm.stepTemplateUrl !== step.stepTemplate.url)
                            return; //
                        config = step.stepTemplate.config;
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
        console.log("config is ", config);

        vm.questions = config.questions;
        vm.mandatory = config.mandatory;

        vm.registration = WizardState[vm.dataType];
    }

    function initData() {
        WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);

        for (question in vm.questions) {
            if (vm.registration[vm.questions[question].propertyName] === undefined)
                vm.registration[vm.questions[question].propertyName] = null;
        }

        vm.init = true;
    }

    $scope.$on('stepLoaded', (event, data) => {
        if (data['vm.dataType'] === Session.get('registrationType')) {
            console.log(data['vm.dataType'], 'step loaded! Step number:', data['stepNumber']);

            if (data['stepNumber'] == 1 && !vm.init) {
                initData();
            }
        }
    });

    vm.validateData = (registration) => {
        if (vm.mandatory) {
            for (question in vm.questions) {
                var prop = registration[vm.questions[question].propertyName];
                if (!prop && prop!==0) {
                    return false;
                }
            }
        }
        return true;
    }

    if (!vm.init) {
        initData();
    }

}