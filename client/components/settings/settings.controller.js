angular.module('leukemiapp').controller('settingsController', SettingsController);

function SettingsController($scope, $reactive, ModuleManagementService, SessionSetting) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.modules = ModuleManagementService.modules;

    vm.toggleModule = (moduleName) => {
        ModuleManagementService.toggleModule(moduleName);
    };

    vm.doneModal = () => {
        $scope.modal.hide();
    };

    $scope.$on('modal.shown', function () {
        console.log('modal is shown!');
    });
}