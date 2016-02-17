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
      Session.set('registration', vm.registration);
   };

   $scope.$watch(
      function nauseaScore(scope) {
         return (vm.registration.nauseaScore);
      },
      function updateRegistration() {
         Session.set('registration', vm.registration);
      }
   );


   vm.setNausea = function (value) {
      vm.registration.nauseaScore = value;
      Session.set('registration', vm.registration);
   };
}