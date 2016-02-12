angular.module('leukemiapp').directive('painCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/pain/pain-card.html',
      controllerAs: 'paincard',
      controller: PainCardController
   }
});

function PainCardController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.notes = '';
}