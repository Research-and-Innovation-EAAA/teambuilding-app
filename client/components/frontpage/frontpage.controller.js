angular.module('leukemiapp').controller('frontpageController', FrontpageController);

function FrontpageController($scope, $reactive, $ionicModal, ModuleManagementService) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.activeModules = ModuleManagementService.activeModules;
   vm.modules = ModuleManagementService.modules;

   //Hacky and dirty solution to re-render DOM and refresh templates
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
   }).then(function(modal) {
      vm.modal = modal;
   });

   vm.openModal = function() {
      vm.modal.show();
   };
   vm.closeModal = function() {
      vm.modal.hide();
      console.log('activeModules at vm.closeModal: ',vm.activeModules);
   };
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      vm.modal.remove();
      console.log('activeModules at $scope.$on(destroy)',vm.activeModules);
   });

   $scope.$on('modal.hidden', function() {
      refreshModules();
      console.log('activeModules at modal.hidden',vm.activeModules);
   });
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      console.log('activeModules at modal.removed',vm.activeModules);
   });

   function refreshModules() {
      vm.refresh = false;
      vm.activeModules = ModuleManagementService.activeModules;
      $scope.$apply();
      vm.refresh = true;
   }
}

