angular.module('leukemiapp').controller('eventEditorController', EventEditorController);

function EventEditorController($scope, $reactive, $ionicPopup) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.cancelModal = () => {
        $scope.modal.hide();
        vm.event = undefined;
    };

    vm.saveModal = () => {
        if (vm.event.startDate !== undefined) {
            vm.event.startDate = moment(vm.event.startDate).format('YYYY-MM-DD');
        }
        if (vm.event.endDate !== undefined) {
            vm.event.endDate = moment(vm.event.endDate).format('YYYY-MM-DD');
        }

        Meteor.call('saveEvent', vm.event, (error, result) => {
            if (error) {
                $ionicPopup.alert({
                    title: "Event not saved",
                    content: "Could not save event, try again! " + error
                });
            } else {
                $scope.modal.hide();

                $ionicPopup.alert({
                    title: "Event saved",
                    content: "We successfully saved event " + vm.event.name + "!"
                });
            }
        });

    };

    $scope.$on('modal.shown', function () {
        if ($scope.eventId) {
            vm.pageTitle = "Edit event";
        }
        else {
            vm.pageTitle = "Add event";
        }
        console.log("EVENT IDIDIDID: " + $scope.eventId + " " + vm.pageTitle);

        vm.event = Events.findOne({'_id': $scope.eventId});

        if (vm.event !== undefined) {
            if (vm.event.startDate !== undefined) {
                vm.event.startDate = new Date(vm.event.startDate);
            }
            if (vm.event.endDate !== undefined) {
                vm.event.endDate = new Date(vm.event.endDate);
            }
        }


        console.log('modal is shown!');
    });
}