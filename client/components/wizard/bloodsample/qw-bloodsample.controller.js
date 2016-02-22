angular.module('leukemiapp').controller('bloodsampleController', BloodsampleController);

function BloodsampleController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   //Init
   vm.registration = Session.get('registration');

   var inputLeukocytter = document.getElementById('inputLeukocytter');
   inputLeukocytter.addEventListener('blur', updateRegistration, true);

   var inputNeutrofile = document.getElementById('inputNeutrofile');
   inputNeutrofile.addEventListener('blur', updateRegistration, true);

   var inputThrombocytter = document.getElementById('inputThrombocytter');
   inputThrombocytter.addEventListener('blur', updateRegistration, true);

   var inputHemoglobin = document.getElementById('inputHemoglobin');
   inputHemoglobin.addEventListener('blur', updateRegistration, true);

   var inputAlat = document.getElementById('inputAlat');
   inputAlat.addEventListener('blur', updateRegistration, true);

   var inputCRP = document.getElementById('inputCRP');
   inputCRP.addEventListener('blur', updateRegistration, true);

   function validateData() {
      var validated = Session.get('regValidated');
      if (validated === undefined)
         validated = [];
      validated[0] = vm.registration.timestamp !== undefined;
      validated[1] =
         (vm.registration.Leukocytter !== undefined && 0.0 <= parseFloat(vm.registration.Leukocytter) && parseFloat(vm.registration.Leukocytter) <= 100.0) &&
         (vm.registration.Neutrofile !== undefined && 0.0 <= parseFloat(vm.registration.Neutrofile) && parseFloat(vm.registration.Neutrofile) <= 20.0) &&
         (vm.registration.Thrombocytter !== undefined && 0.0 <= parseFloat(vm.registration.Thrombocytter) && parseFloat(vm.registration.Thrombocytter) <= 100.0) &&
         (vm.registration.Hemoglobin !== undefined && 2.0 <= parseFloat(vm.registration.Hemoglobin) && parseFloat(vm.registration.Hemoglobin) <= 10.0) &&
         (vm.registration.Alat !== undefined && 99 <= parseInt(vm.registration.Alat) && parseInt(vm.registration.Alat) <= 9999) &&
         (vm.registration.CRP !== undefined && 1 <= parseInt(vm.registration.CRP) && parseInt(vm.registration.CRP) <= 999);
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