angular.module('leukemiapp').controller('bloodsampleController', BloodsampleController);

function BloodsampleController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   var module = Modules[1];

   //Init
   vm.registration = Session.get('registration');

   function initData() {
      if (vm.registration.leukocytes == undefined)
         vm.registration.leukocytes = NaN;
      if (vm.registration.neutrophiles == undefined)
         vm.registration.neutrophiles = NaN;
      if (vm.registration.thrombocytes == undefined)
         vm.registration.thrombocytes = NaN;
      if (vm.registration.hemoglobin == undefined)
         vm.registration.hemoglobin = NaN;
      if (vm.registration.alat == undefined)
         vm.registration.alat = NaN;
      if (vm.registration.crp == undefined)
         vm.registration.crp = NaN;

      var inputleukocytes = document.getElementById('inputleukocytes');
      inputleukocytes.addEventListener('blur', updateRegistration, true);

      var inputneutrophiles = document.getElementById('inputneutrophiles');
      inputneutrophiles.addEventListener('blur', updateRegistration, true);

      var inputthrombocytes = document.getElementById('inputthrombocytes');
      inputthrombocytes.addEventListener('blur', updateRegistration, true);

      var inputhemoglobin = document.getElementById('inputhemoglobin');
      inputhemoglobin.addEventListener('blur', updateRegistration, true);

      var inputalat = document.getElementById('inputalat');
      inputalat.addEventListener('blur', updateRegistration, true);

      var inputcrp = document.getElementById('inputcrp');
      inputcrp.addEventListener('blur', updateRegistration, true);

      validateData();
      vm.init = true;
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