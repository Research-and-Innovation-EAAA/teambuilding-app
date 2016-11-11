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
                    device: 'smartwatch' //vm.getReactively('module.name')
                }, {
                    sort: {date: -1}
                });
            }
        });

    /*//Find module from name
    function getModuleFromName() {
        for (moduleIndex = 0; moduleIndex < Modules.length; moduleIndex++) {
            if (Modules[moduleIndex].name === $scope.moduleName) {

                vm.module = Modules[moduleIndex];
                vm.moduleTitle = vm.module.name;

                if (vm.module.frontPage !== undefined) {
                    vm.iconStyle = {
                        content: 'url(' + vm.module.frontPage.iconUrl + ')'
                    };
                    vm.barClass = vm.module.frontPage.barClass;

                    vm.rowProperty = (rowNumber) => {
                        var value = undefined;
                        var registration = vm.latestRegistration;
                        if (registration) {
                            if (vm.module.frontPage.properties) {
                                if (rowNumber >= vm.module.frontPage.properties.length)
                                    return "";
                                var propertyName = vm.module.frontPage.properties[rowNumber];
                                if (registration)
                                    value = registration[propertyName];
                            } else if (vm.module.frontPage.propertyFunction) {
                                value = vm.module.frontPage.propertyFunction(registration, rowNumber);
                            };
                        }

                        if (value || (typeof value=="number" && !isNaN(value)))
                            return value+"";
                        else
                            return "-";
                    };

                    vm.rowDescription = (rowNumber) => {
                        var value = vm.module.frontPage.propertyDescription[rowNumber];
                        if (value)
                            return value;
                        return "";
                    };

                    vm.rowMeasurement = (rowNumber) => {
                        var measurement = vm.module.frontPage.propertyMeasurement;
                        if (measurement && rowNumber<measurement.length)
                            return measurement[rowNumber];
                        return "";
                    };
                }
            }
        }
        console.log('getModuleFromName() called! module is', vm.module);
        console.log('vm.moduleTitle is ', vm.moduleTitle);
    }*/

    vm.moduleTitle = "Smart Watch Sleep";
    vm.iconStyle = "/question-mark.png";
    vm.barClass= "bar-positive";

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
       //     getModuleFromName();
        }
    );
}