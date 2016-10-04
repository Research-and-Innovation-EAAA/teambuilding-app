angular.module('leukemiapp').controller('medicineController', MedicineController);

function MedicineController($scope, $reactive, WizardState, WizardStateAccessor) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.dataType = Session.get('registrationType');
   WizardState[vm.dataType] = WizardStateAccessor.getRegistration(vm.dataType);
   vm.registration = WizardState[vm.dataType];
   
   var module = Modules[0];

   //Init
   function initData() {
      if (vm.registration.MTX == undefined)
         vm.registration.MTX = NaN;
      if (vm.registration.SixMP == undefined)
         vm.registration.SixMP = NaN;

      WizardStateAccessor.registerValidateFunction(vm.dataType, validateData);

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

   function validateData(registration, from, to) {
      var invalid = true;
      var start = (typeof from=="number"&&from>=0)?from:0;
      var end = (typeof to=="number" && to<=module.wizard.steps.length)?to:module.wizard.steps.length-1;

      if (registration) {
         for (i=start; i<=end; i++) {
            invalid = invalid && !module.wizard.steps[i].validation(registration);
         }
      }

      return !invalid;
   }

   if (!vm.init) {
      initData();
   }
}