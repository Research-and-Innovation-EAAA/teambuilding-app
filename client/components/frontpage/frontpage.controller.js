angular.module('leukemiapp').controller('frontpageController', FrontpageController);

function FrontpageController($scope, $rootScope, $reactive, $ionicModal, ModuleManagementService, $timeout, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.activeModules = ModuleManagementService.activeModules;
   vm.modules = ModuleManagementService.modules;

   console.log('activeModules are: ', vm.activeModules);

   Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
   });

   $rootScope.$on('$stateChangeSuccess', function (event) {
      analytics.track("Page View", {
         eventName: "path",
         couponValue: $location.path()
      });
      analytics.identify
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

   $scope.$on('modal.hidden', function () {
      console.log('activeModules at modal.hidden', vm.activeModules);
      refreshModules();
      //$ionicScrollDelegate.$getByHandle('front-page-scroll').resize();
      //$ionicScrollDelegate.$getByHandle('front-page-scroll').scrollTop();
   });
   // Execute action on remove modal
   $scope.$on('modal.removed', function () {
      console.log('activeModules at modal.removed', vm.activeModules);
   });

   function refreshModules() {
      console.log('refreshModules called');
      $timeout(function(scope) {
         vm.activeModules = ModuleManagementService.activeModules;
      });
   }
}

