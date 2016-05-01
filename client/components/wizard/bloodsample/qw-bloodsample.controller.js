angular.module('leukemiapp').controller('bloodsampleController', BloodsampleController);

function BloodsampleController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   var module = Modules[1];

   //Init
   vm.registration = Session.get('registration');
   vm.registration.Leukocytter = null;
   vm.registration.Neutrofile = null;
   vm.registration.Thrombocytter = null;
   vm.registration.Hemoglobin = null;
   vm.registration.Alat = null;
   vm.registration.CRP = null;

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
      for (i = 0; i < module.wizard.steps.length; i++) {
         validated[i + 1] = module.wizard.steps[i].validation(vm.registration);
      }

      Session.set('regValidated', validated);
      console.log('regValidated session variable updated')
   }

   function updateRegistration() {
      validateData();
      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   }

   function validateBloodsamples() {
      var isValid = true;
      for (var property in vm.registration) {
         if (property === "_id" ||
            property === 'timestamp' ||
            property === 'createdBy' ||
            property === 'createdAt')
            continue;

         var bloodsample = vm.registration[property];
         if (bloodsample != null) {
            isValid = 0 <= parseFloat(bloodsample);
            if (!isValid) {
               //invalid data
               console.log('Data is invalid at property ', property, '. Value is ', bloodsample);
               return isValid;
            }
         }
      }
      return isValid;
   }
}