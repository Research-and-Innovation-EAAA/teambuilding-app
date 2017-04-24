angular.module('leukemiapp').controller('eventEditorController', EventEditorController);

function EventEditorController($scope, $reactive, ModuleManagementService) {
    $reactive(this).attach($scope);
    var vm = this;



    vm.toggleModule = (moduleName) => {
        ModuleManagementService.toggleModule(moduleName);
    };

    vm.doneModal = () => {
        $scope.modal.hide();
    };

    $scope.$on('modal.shown', function () {
        if ($scope.eventId) {
            vm.pageTitle = "Edit event";
        }
        else{
            vm.pageTitle = "Add event";
        }
        console.log("EVENT IDIDIDID: " + $scope.eventId + " " + vm.pageTitle);

        vm.event = Events.findOne({'_id': $scope.eventId});

        $('#summernote-editor').summernote();

        console.log('modal is shown!');
    });
}