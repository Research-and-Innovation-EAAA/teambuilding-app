angular.module('leukemiapp').controller('medicineController', MedicineController);

function MedicineController($scope, $reactive, WizardState) {
   $reactive(this).attach($scope);
   var vm = this;
   
   WizardState[Session.get('registrationType')] = Session.get('registration');
   vm.registration = WizardState[Session.get('registrationType')];
   
   var module = Modules[0];

   //Init
   function initData() {
      if (vm.registration.MTX == undefined)
         vm.registration.MTX = NaN;
      if (vm.registration.SixMP == undefined)
         vm.registration.SixMP = NaN;
      if (vm.registration._validate == undefined)
         vm.registration._validate = validateData;

      var inputSixMP = document.getElementById('inputSixMP');
      //inputSixMP.addEventListener('blur', updateRegistration, true);

      var inputMTX = document.getElementById('inputMTX');
      //inputMTX.addEventListener('blur', updateRegistration, true);
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
      //Session.set('registration', vm.registration);
      Session.set('registration', undefined);
      console.log('Registration updated');
      console.log(vm.registration);
   }

   if (!vm.init) {
      initData();
   }
}