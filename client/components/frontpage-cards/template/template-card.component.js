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

function TemplateCardController($scope, $reactive, $location, WizardStateAccessor, SessionSetting) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.module = {};

    //Code to be run every time view becomes visible
    //----------------------------------------------
    $scope.$on('$ionicView.beforeEnter', function (event, data) {
        vm.autorun(() => {
            vm.subscribe('customModules',
                () => [],
                () => {
                    console.log('Subscription ready for modules!');
                    vm.modules = CustomModules.find({eventId: vm.event._id}).fetch();
                    console.log(vm.modules);
                });
        });
    });


    getModuleFromName();

    //Find module from name
    function getModuleFromName() {
        for (moduleIndex = 0; moduleIndex < CustomModules.length; moduleIndex++) {
            if (CustomModules[moduleIndex].name === $scope.moduleName) {

                vm.module = CustomModules[moduleIndex];
                vm.moduleTitle = vm.module.name;

            }
        }
        console.log('getModuleFromName() called! module is', vm.module);
        console.log('vm.moduleTitle is ', vm.moduleTitle);
    }

    vm.newRegistration = () => {
        SessionSetting.setValue('registrationType', vm.module.name);
        WizardStateAccessor.setRegistration(vm.module.name, undefined);
        SessionSetting.setValue('updating', undefined);
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