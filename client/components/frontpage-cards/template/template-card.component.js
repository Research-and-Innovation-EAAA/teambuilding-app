angular.module('leukemiapp').directive('templateCard', function () {
    return {
        scope: {
            moduleName: "@"
        },
        restrict: 'E',
        templateUrl: 'client/components/frontpage-cards/template/template-card.html',
        controllerAs: 'vm',
        controller: TemplateCardController
    }
});

function TemplateCardController($scope, $reactive, $location, WizardStateAccessor) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.module = {};

    getModuleFromName();

    vm.helpers({
            latestRegistration: () => {
                return Registrations.findOne({
                    moduleName: vm.getReactively('module.name')
                }, {
                    sort: {timestamp: -1}
                });
            }
        });

    //Find module from name
    function getModuleFromName() {
        for (moduleIndex = 0; moduleIndex < Modules.length; moduleIndex++) {
            if (Modules[moduleIndex].name === $scope.moduleName) {

                vm.module = Modules[moduleIndex];
                vm.moduleTitle = vm.module.name;

            }
        }
        console.log('getModuleFromName() called! module is', vm.module);
        console.log('vm.moduleTitle is ', vm.moduleTitle);
    }

    vm.newRegistration = () => {
        Session.set('registrationType', vm.module.name);
        WizardStateAccessor.setRegistration(vm.module.name, undefined);
        Session.set('updating', undefined);
        $location.path("app/questionwizard");
    };

    $scope.$watch(
        function () {
            return $scope.moduleName;
        },
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                console.log('Module name changed for component from ', oldValue, ' to ', newValue);
            }
            getModuleFromName();
        }
    );
}