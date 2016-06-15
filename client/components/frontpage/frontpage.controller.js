angular.module('leukemiapp').controller('frontpageController', FrontpageController);

function FrontpageController($scope, $reactive, $ionicModal, ModuleManagementService) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.activeModules = ModuleManagementService.activeModules;
   vm.modules = ModuleManagementService.modules;

   //Dirty solution to re-render DOM and refresh templates
   //FIX in future
   vm.refresh = true;

   console.log('activeModules are: ', vm.activeModules);

   Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
   });

   //Settings for turning modules on/off

   $ionicModal.fromTemplateUrl("client/components/settings/settings.html", {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function (modal) {
      vm.modal = modal;
      $scope.modal = modal;
   });

   vm.openModal = function () {
      vm.modal.show();
   };
   $scope.closeModal = function () {
      vm.modal.hide();
      console.log('activeModules at vm.closeModal: ', vm.activeModules);
   };
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function () {
      vm.modal.remove();
      console.log('activeModules at $scope.$on(destroy)', vm.activeModules);
   });

   $scope.$on('modal.hidden', function () {
      console.log('activeModules at modal.hidden', vm.activeModules);
      console.log('vm.refresh is', vm.refresh);
      refreshModules();
   });
   // Execute action on remove modal
   $scope.$on('modal.removed', function () {
      console.log('activeModules at modal.removed', vm.activeModules);
   });

   function refreshModules() {
      vm.refresh = false;
      console.log('vm.refresh at 2 is', vm.refresh);
      vm.activeModules = ModuleManagementService.activeModules;
      $scope.$apply();
      vm.refresh = true;
      console.log('vm.refresh at 3 is', vm.refresh);
   }
}

