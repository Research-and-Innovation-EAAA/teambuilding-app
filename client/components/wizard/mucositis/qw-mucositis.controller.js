angular.module('leukemiapp').controller('mucositisController', MucositisController);

function MucositisController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   var module = Modules[3];

   //Init
   vm.registration = Session.get('registration');

   function initData() {
      if (vm.registration.diagnosis == null) {
         vm.registration.diagnosis = [];
         vm.registration.nauseaScore = 0;
         Session.set('registration', vm.registration);
      }
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

   vm.setDiagnosis = function (number, value) {
      vm.registration.diagnosis[number] = value;
      switch (number) {
         case 0:
            vm.registration.pain = value;
            break;
         case 1:
            vm.registration.ulcers = value;
            break;
         case 2:
            vm.registration.food = value;
      }
      updateRegistration();
   };

   $scope.$watch(
      function nauseaScore(scope) {
         return vm.registration.nauseaScore;
      },
      function (newValue, oldValue) {
         if (newValue != oldValue)
            updateRegistration()
      }
   );

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
      vm.registration.nauseaScore = parseInt(vm.registration.nauseaScore);
      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   }

   if (!vm.init) {
      initData();
   }
}