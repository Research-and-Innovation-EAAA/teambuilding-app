angular.module('leukemiapp').controller('medicineController', MedicineController);

function MedicineController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   //Init
   vm.registration = Session.get('registration');

   //if (vm.registration.SixMP === undefined) {
   //   vm.registration.SixMP = 0;
   //   vm.registration.MTX = 0;
   //   updateRegistration();
   //}

   var inputSixMP = document.getElementById('inputSixMP');
   inputSixMP.addEventListener('blur', updateRegistration, true);

   var inputMTX = document.getElementById('inputMTX');
   inputMTX.addEventListener('blur', updateRegistration, true);

   function updateRegistration() {
      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   }
}