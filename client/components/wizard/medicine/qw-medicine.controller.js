angular.module('leukemiapp').controller('medicineController', MedicineController);

function MedicineController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   var module = Modules[0];

   //Init
   vm.registration = Session.get('registration');

   function initData() {
      if (vm.registration.MTX == undefined)
         vm.registration.MTX = "-";
      if (vm.registration.SixMP == undefined)
         vm.registration.SixMP = "-";

      var inputSixMP = document.getElementById('inputSixMP');
      inputSixMP.addEventListener('blur', updateRegistration, true);

      var inputMTX = document.getElementById('inputMTX');
      inputMTX.addEventListener('blur', updateRegistration, true);
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

   function updateRegistration() {
      validateData();
      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   }

   if (!vm.init) {
      initData();
   }
}