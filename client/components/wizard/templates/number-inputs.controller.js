angular.module('leukemiapp').controller('numberInputsController', numberInputsController);

function numberInputsController($scope, $reactive, WizardHandler, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.config = {};

    initUi();
    function initUi() {
        var dataType = Session.get('registrationType');
        vm.stepNumber = WizardHandler.wizard().currentStepNumber();

        var step = {};
        var config = {};

        for (i = 0; i < Modules.length; i++) {
            if (Modules[i].name === dataType) {

                if (Modules[i].wizard.steps[vm.stepNumber - 2] !== undefined) {
                    step = Modules[i].wizard.steps[vm.stepNumber - 2];

                    if (step.stepTemplate.config !== undefined) {
                        if (vm.stepTemplateUrl !== undefined && vm.stepTemplateUrl !== step.stepTemplate.url)
                            return; //
                        config = step.stepTemplate.config;
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
        console.log("config is ", config);

        vm.questions = config.questions;
        vm.mandatory = config.mandatory;

        vm.registration = WizardState[dataType];
    }

    function initData() {
        for (question in vm.questions) {
            if (vm.registration[vm.questions[question].propertyName] === undefined)
                vm.registration[vm.questions[question].propertyName] = null;
        }

        WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);
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

    if (!vm.init) {
        initData();
    }
}