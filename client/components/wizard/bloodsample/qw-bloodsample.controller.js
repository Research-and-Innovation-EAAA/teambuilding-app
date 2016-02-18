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

   function updateRegistration() {
      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   }
}