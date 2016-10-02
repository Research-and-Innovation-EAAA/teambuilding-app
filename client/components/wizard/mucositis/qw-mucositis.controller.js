angular.module('leukemiapp').controller('mucositisController', MucositisController);

function MucositisController($scope, $reactive, WizardState, WizardStateAccessor) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.dataType = Session.get('registrationType');
   WizardState[vm.dataType] = WizardStateAccessor.getRegistration(vm.dataType);
   vm.registration = WizardState[vm.dataType];

   var module = Modules[3];

   //Init
   function initData() {
      if (!vm.registration.diagnosis) {
         vm.registration.diagnosis = [];
         vm.registration.nauseaScore = 0;
         Session.set('registration', vm.registration);
      }

      WizardStateAccessor.registerValidateFunction(vm.dataType, validateData);
      /* if (vm.registration._validate == undefined)
       vm.registration._validate = validateData; */

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

   vm.setDiagnosis = function (number, value) {
      vm.registration.diagnosis[number] = value;
      switch (number) {
         case 0:
            vm.registration.pain = value;
            break;
         case 1:
            vm.registration.ulcers = value;
            break;
         case 2:
            vm.registration.food = value;
      }
   };

   function validateData() {
      var validated = Session.get('regValidated');
      if (validated != null) {

         for (i = 0; i < module.wizard.steps.length; i++) {
            validated[i + 1] = module.wizard.steps[i].validation(vm.registration);
         }

         Session.set('regValidated', validated);
         console.log('regValidated session variable updated');
      }
   }

   if (!vm.init) {
      initData();
   }
}