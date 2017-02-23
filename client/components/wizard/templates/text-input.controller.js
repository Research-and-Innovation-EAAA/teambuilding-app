angular.module('leukemiapp').controller('textInputController', textInputController);

function textInputController($scope, $reactive, WizardHandler, WizardState, WizardStateAccessor) {
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
            if (Modules[i].name === vm.dataType) {

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
        vm.config = config;
        console.log("config is ", config);

        vm.question = config.question;
        vm.mandatory = config.mandatory;

        vm.registration = WizardState[vm.dataType];
    }

    function initData() {
        WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);

        if (vm.registration[vm.config.propertyName] == undefined || vm.registration[vm.config.propertyName] == null || vm.registration[vm.config.propertyName] == 0)
            vm.registration[vm.config.propertyName] = [];

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

            var prop = registration[registration[vm.config.propertyName]];
            if (!prop && prop !== 0) {
                return false;
            }
        }
        return true;
    }

    if (!vm.init) {
        initData();
    }

}