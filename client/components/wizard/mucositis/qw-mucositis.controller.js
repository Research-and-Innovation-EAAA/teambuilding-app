angular.module('leukemiapp').controller('mucositisController', MucositisController);

function MucositisController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   //Init
   vm.registration = Session.get('registration');

   if (vm.registration.diagnosis === undefined) {
      vm.registration.diagnosis = [];
      vm.registration.nauseaScore = 5;
      Session.set('registration', vm.registration);
   }

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
         updateRegistration()
      }
   );

   function validateData() {
      var validated = Session.get('regValidated');
      if (validated === undefined)
         validated = [];
      validated[0] = vm.registration.timestamp !== undefined;
      validated[1] = true;
      for (var i = 0; i < 3; i++) {
         if (vm.registration.diagnosis[i] === undefined)
            validated[1] = false;
      }
      validated[2] = (vm.registration.nauseaScore >= 0) && (vm.registration.nauseaScore <= 10);
      Session.set('regValidated', validated);
      console.log('regValidated session variable updated', validated)
   }

   function updateRegistration() {
      validateData();
      vm.registration.nauseaScore = parseInt(vm.registration.nauseaScore);
      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   }
}