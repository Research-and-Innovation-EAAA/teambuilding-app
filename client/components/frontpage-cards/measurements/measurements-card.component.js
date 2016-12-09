angular.module('leukemiapp').directive('measurementsCard', function () {
    return {
        scope: {
            moduleName: "@"
        },
        restrict: 'E',
        templateUrl: 'client/components/frontpage-cards/measurements/measurements-card.html',
        controllerAs: 'vm',
        controller: MeasurementsCardController
    }
});

function MeasurementsCardController($scope, $reactive, $location) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.module = {};


    vm.helpers({
        latestRegistration: () => {
            return SmartWatchView.findOne({
                device: 'smartwatch'
            }, {
                sort: {date: -1}
            });
        }
    });

    vm.moduleTitle = "Smart Watch Sleep";
    vm.iconStyle = "/question-mark.png";
    vm.barClass = "bar-positive";

    vm.showGraphData = () => {
        Session.set('graphDataType', "smartwatch");
        $location.path("app/graphdatameasurements")
    };

    $scope.$watch(
        function () {
            return $scope.moduleName;
        },
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                console.log('Module name changed for component from ', oldValue, ' to ', newValue);
            }
        }
    );
}