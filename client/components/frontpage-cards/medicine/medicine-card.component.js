angular.module('leukemiapp').directive('medicineCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/medicine/medicine-card.html',
      controllerAs: 'medcard',
      controller: MedicineCardController
   }
});

function MedicineCardController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.notes = '';
}