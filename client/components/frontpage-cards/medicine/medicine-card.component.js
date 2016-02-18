angular.module('leukemiapp').directive('medicineCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/medicine/medicine-card.html',
      controllerAs: 'medcard',
      controller: MedicineCardController
   }
});

function MedicineCardController($scope, $reactive, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.subscribe('medicineData');

   vm.helpers({
      latestMedicineRegistration() {
         return Medicine.findOne({}, {
            sort: {timestamp: -1}
         });
      }
   });
   console.log(vm.latestMedicineRegistration);

   vm.newRegistration = () => {
      Session.set('registrationType', 'Medicine');
      $location.path("questionwizard");
   };

   vm.sixMP = () => {
      var registration = vm.latestMedicineRegistration;
      if (registration !== undefined)
         return registration.SixMP;
      else return ' - ';
   };

   vm.mtx = () => {
      var registration = vm.latestMedicineRegistration;
      if (registration !== undefined)
         return registration.MTX;
      else return ' - ';
   };
}