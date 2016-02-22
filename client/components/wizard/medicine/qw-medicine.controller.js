angular.module('leukemiapp').controller('medicineController', MedicineController);

function MedicineController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   //Init
   vm.registration = Session.get('registration');

   var inputSixMP = document.getElementById('inputSixMP');
   inputSixMP.addEventListener('blur', updateRegistration, true);

   var inputMTX = document.getElementById('inputMTX');
   inputMTX.addEventListener('blur', updateRegistration, true);

   function validateData() {
      var validated = Session.get('regValidated');
      if (validated === undefined)
         validated = [];
      validated[0] = vm.registration.timestamp !== undefined;
      validated[1] =
         (vm.registration.SixMP !== undefined) && (vm.registration.MTX !== undefined);
      Session.set('regValidated', validated);
      console.log('regValidated session variable updated')
   }

   function updateRegistration() {
      validateData();
      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   }
}