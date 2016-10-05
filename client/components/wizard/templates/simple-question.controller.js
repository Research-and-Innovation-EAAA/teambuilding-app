angular.module('leukemiapp').controller('simpleQuestionController', SimpleQuestionController);

function SimpleQuestionController($scope, $reactive, WizardHandler, $ionicScrollDelegate, WizardState, WizardStateAccessor) {
   $reactive(this).attach($scope);
   var vm = this;

   $ionicScrollDelegate.$getByHandle('wizardStepContent').freezeScroll(false);

   var dataType = Session.get('registrationType');
   var stepNumber = WizardHandler.wizard().currentStepNumber();

   var step = {};
   var config = {};

   WizardStateAccessor.registerValidateFunction(vm.dataType, vm.validateData);

   $scope.$watch(
       function stepNumber(scope) {
          return WizardHandler.wizard().currentStepNumber();
       },
       function (newValue, oldValue) {
          //    if (oldValue !== vm.stepNumber) {
          initUi();
          //   }
       }
   );

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

   vm.registration = WizardState[dataType];
   
   vm.question = config.question;
   vm.answers = config.answers;
   vm.propertyName = config.propertyName;

   vm.selectAnswer = (answer) => {
      vm.registration[config.propertyName] = answer;
   };

   vm.validateData = (registration, from, to) => {
      return step.validation(registration);
   }
}