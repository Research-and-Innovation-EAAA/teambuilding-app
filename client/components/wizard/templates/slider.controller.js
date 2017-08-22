angular.module('leukemiapp').controller('sliderController', sliderController);

function sliderController($scope, $reactive, WizardHandler, WizardState, WizardStateAccessor, SessionSetting) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.config = {};

    $scope.$watch(
        function stepNumber(scope) {
            return WizardHandler.wizard().currentStepNumber();
        },
        function (newValue, oldValue) {
            initUi();
            updateRegistration();
        }
    );

    initUi();
    function initUi() {
        vm.dataType = SessionSetting.getValue('registrationType');
        WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);
        vm.stepNumber = WizardHandler.wizard().currentStepNumber();

        var step = {};

        for (i = 0; i < Modules.length; i++) {
            if (Modules[i]._id === vm.dataType) {

                if (Modules[i].wizard.steps[vm.stepNumber - 1] !== undefined) {
                    step = Modules[i].wizard.steps[vm.stepNumber - 1];

                    if (step.stepTemplate.config !== undefined) {
                        if (vm.stepTemplateUrl !== undefined && vm.stepTemplateUrl !== step.stepTemplate.url)
                            return;
                        vm.config = step.stepTemplate.config;
                        vm.stepTemplateUrl = step.stepTemplate.url;
                        console.log('Config defined as ', vm.config);
                    } else {
                        console.error('No config defined for module ', vm.dataType, ' step number ', vm.stepNumber);
                    }
                } else {
                    console.error('Step undefined for module ', vm.dataType, ' step number ', vm.stepNumber);
                }
                break;
            }
        }

        vm.registration = WizardState[vm.dataType];
        if (vm.registration === undefined) {
            vm.registration = {};
        }

        vm.question = vm.config.question;
        vm.smiley = vm.config.smiley === undefined ? true : vm.config.smiley;
        vm.positiveText = vm.config.positiveText;
        vm.negativeText = vm.config.negativeText;

        console.log("config is ", vm.config);
        console.log("vm.question is " + vm.question);

        var value = vm.config.defaultValue;
        if (typeof vm.registration[vm.config.propertyName] === 'number') {
            value = vm.registration[vm.config.propertyName];
        }

        vm.slider = {
            value: value,
            options: {
                floor: vm.config.minValue,
                ceil: vm.config.maxValue,
                step: vm.config.step,
                precision: (vm.config.step % 1 == 0) ? 0 : 1, //decimal precision, 1 if step is a decimal
                hideLimitLabels: true,
                onEnd: updateRegistration
            }
        };
        console.log('vm.slider is ', vm.slider);


    }

    vm.validateConfig = () => {
        console.log('validateConfig called, config is ', vm.config);

        return (vm.config.propertyName !== undefined &&
        typeof vm.config.propertyName === 'string' &&
        vm.config.question !== undefined &&
        typeof vm.config.question === 'string' &&
        vm.config.minValue !== undefined &&
        vm.config.maxValue !== undefined &&
        vm.config.step !== undefined)
    };

    function updateRegistration() {
        vm.registration[vm.config.propertyName] = vm.slider.value;
    }

    vm.validateData = (registration, from, to) => {
        return true;
    }

    WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);
    updateRegistration();
}