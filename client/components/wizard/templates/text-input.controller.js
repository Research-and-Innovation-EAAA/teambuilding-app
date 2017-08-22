angular.module('leukemiapp').controller('textInputController', textInputController);

function textInputController($scope, $reactive, WizardHandler, WizardState, WizardStateAccessor, SessionSetting) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.config = {};
    vm.dataType = SessionSetting.getValue('registrationType');

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
        vm.config = config;
        console.log("config is ", config);

        vm.question = config.question;
        vm.mandatory = config.mandatory;
        vm.propertyName = config.propertyName;

        vm.registration = WizardState[vm.dataType];
    }

    function initData() {
        WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);

        if (vm.registration[vm.config.propertyName] == undefined || vm.registration[vm.config.propertyName] == null || vm.registration[vm.config.propertyName] == 0)
            vm.registration[vm.config.propertyName] = "";

        vm.init = true;
    }

    $scope.$on('stepLoaded', (event, data) => {
        if (data['vm.dataType'] === SessionSetting.getValue('registrationType')) {
            console.log(data['vm.dataType'], 'step loaded! Step number:', data['stepNumber']);

            if (data['stepNumber'] == 1 && !vm.init) {
                initData();
            }
        }
    });

    vm.validateData = (registration) => {
        if (vm.mandatory) {
            var prop = registration[vm.propertyName];
            if (!prop && prop !== 0 && prop.replace(/\s/g, "").length == 0) {  // trim white characters
                return false;
            }
        }
        return true;
    }

    if (!vm.init) {
        initData();
    }

}