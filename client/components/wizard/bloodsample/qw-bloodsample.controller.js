angular.module('leukemiapp').controller('bloodsampleController', BloodsampleController);

function BloodsampleController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   var module = Modules[1];

   //Init
   vm.registration = Session.get('registration');

   function initData() {
      if (vm.registration.Leukocytter == undefined)
         vm.registration.Leukocytter = NaN;
      if (vm.registration.Neutrofile == undefined)
         vm.registration.Neutrofile = NaN;
      if (vm.registration.Thrombocytter == undefined)
         vm.registration.Thrombocytter = NaN;
      if (vm.registration.Hemoglobin == undefined)
         vm.registration.Hemoglobin = NaN;
      if (vm.registration.Alat == undefined)
         vm.registration.Alat = NaN;
      if (vm.registration.CRP == undefined)
         vm.registration.CRP = NaN;

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