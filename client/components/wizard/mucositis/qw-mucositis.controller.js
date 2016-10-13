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
         WizardStateAccessor.setRegistration(vm.dataType,vm.registration);
      }

      WizardStateAccessor.registerValidateFunction(vm.dataType, validateData);

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

   function validateData(registration, from, to) {
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

   vm.updateRegistration = function() {
      var neaseaScore = vm.registration.nauseaScore;
      if (typeof neaseaScore !== "number")
            vm.registration.nauseaScore = parseInt(neaseaScore);
   }

   if (!vm.init) {
      initData();
   }
}