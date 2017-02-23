angular.module('leukemiapp').controller('singleQuestionController', singleQuestionController);

function singleQuestionController($scope, $reactive, WizardHandler, $ionicScrollDelegate, WizardState, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;

    $ionicScrollDelegate.$getByHandle('wizardStepContent').freezeScroll(false);

    vm.config = {};

    $scope.$watch(
        function stepNumber(scope) {
            return WizardHandler.wizard().currentStepNumber();
        },
        function (newValue, oldValue) {
            //    if (oldValue !== vm.stepNumber) {
            vm.initUi();
            //   }
        }
    );

    vm.initUi = function() {
        vm.dataType = Session.get('registrationType');
        WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);

        vm.stepNumber = WizardHandler.wizard().currentStepNumber();

        var step = {};

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

        vm.registration = WizardState[vm.dataType];

        console.log("config is ", vm.config);
        vm.question = vm.config.question;
        vm.answers = vm.config.answers;
        vm.mandatory = vm.config.mandatory;
        vm.multipleChoice = vm.config.multipleChoice;
        vm.propertyName = vm.config.propertyName;

        if (vm.registration[vm.config.propertyName] == undefined || vm.registration[vm.config.propertyName] == null || vm.registration[vm.config.propertyName] == 0)
            vm.registration[vm.config.propertyName] = [];

        console.log("reg is", vm.registration);

    }

    vm.selectAnswer = (answer) => {
        if (vm.isSelected(answer)) {
            vm.registration[vm.config.propertyName].splice(vm.registration[vm.config.propertyName].indexOf(answer), 1);
        } else {
            if (!vm.multipleChoice) {
                vm.registration[vm.config.propertyName] = []; // reset previous choice
            }
            vm.registration[vm.config.propertyName].push(answer);
        }
    };

    vm.isSelected = (answer) => {
        return $.inArray(answer, vm.registration[vm.config.propertyName]) > -1;
    };

    vm.validateData = (registration, from, to) => {
        if (vm.mandatory) {
            var prop = registration[vm.config.propertyName];
            if ($.isArray(prop))
                return  prop.length > 0;
            else
               return prop;
        }
        else return true;
    }

    vm.initUi();
}