angular.module('leukemiapp').controller('settingsController', SettingsController);

function SettingsController($scope, $reactive, ModuleManagementService) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.modules = ModuleManagementService.modules;

   vm.toggleModule = (moduleName) => {
      ModuleManagementService.toggleModule(moduleName);
   };

   vm.closeModal = () => {
      $scope.modal.hide();
   }
}