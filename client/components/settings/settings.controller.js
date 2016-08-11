angular.module('leukemiapp').controller('settingsController', SettingsController);

function SettingsController($scope, $reactive, ModuleManagementService) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.modules = ModuleManagementService.modules;


   var modulesAtShown;
   var activeModulesAtShown;

   vm.toggleModule = (moduleName) => {
      ModuleManagementService.toggleModule(moduleName);
   };

   vm.cancelModal = () => {
      ModuleManagementService.modules = modulesAtShown;
      ModuleManagementService.activeModules = activeModulesAtShown;
      $scope.modal.hide();
   };

   vm.doneModal = () => {
      $scope.modal.hide();
   };

   $scope.$on('modal.shown', function() {
      console.log('modal is shown!');
      modulesAtShown = ModuleManagementService.modules;
      activeModulesAtShown = ModuleManagementService.activeModules;
   });
}