angular.module('leukemiapp').directive('bloodsampleCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/bloodsample/bloodsample-card.html',
      controllerAs: 'bloodcard',
      controller: BloodsampleCardController
   }
});

function BloodsampleCardController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.notes = '';
}