angular.module('leukemiapp').controller('timestampController', TimestampController);

function TimestampController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

}