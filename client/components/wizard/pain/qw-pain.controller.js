angular.module('leukemiapp').controller('painController', PainController);

function PainController($scope, $reactive, $ionicScrollDelegate) {
    $reactive(this).attach($scope);
    var vm = this;

    var module = Modules[2];

    //Init
    vm.registration = Session.get('registration');
    vm.wongBakerScale = "Wong-Baker score";
    vm.flaccScale = "FLACC score";

    function initData() {
        var usrSettings = UserSettings.findOne();

        //Initialize pain scale
        if (vm.registration.painScore != null) {
            //registration is being updated
            vm.changeScale(vm.registration.flaccvalue?vm.flaccScale:vm.wongBakerScale);
        } else {
            //registration is being created
            if (usrSettings && usrSettings.painScale) {
                vm.changeScale(usrSettings.painScale);
            } else {
                vm.changeScale(vm.flaccScale);
            }
        }

        if (!vm.isSmallScreen()) {
            $ionicScrollDelegate.$getByHandle('painScale').freezeScroll(true);
        }

        validateData();
        vm.init = true;
    }

    $scope.$on('stepLoaded', (event, data) => {
        if (data['dataType'] === Session.get('registrationType')) {
            console.log(data['dataType'], 'step loaded! Step number:', data['stepNumber']);

            if (data['stepNumber'] == 1 && !vm.init) {
                initData();
            }

            if (data['stepNumber'] == 3) {
                $ionicScrollDelegate.$getByHandle('wizardStepContent').freezeScroll(true);
            } else {
                $ionicScrollDelegate.$getByHandle('wizardStepContent').freezeScroll(false);
            }
        }
    });

    vm.isSmallScreen = () => {
        return window.innerWidth < 768;
    };


    function validateData() {
        var validated = Session.get('regValidated');
        if (validated != null) {
            for (i = 0; i < module.wizard.steps.length; i++) {
                validated[i + 1] = module.wizard.steps[i].validation(vm.registration);
            }

            Session.set('regValidated', validated);
            console.log('regValidated session variable updated');
        }
    }

    vm.updateRegistration = () => {
        validateData();

        Session.set('registration', vm.registration);
        console.log('Registration updated', vm.registration);
    };

    vm.selectPainType = (value) => {
        vm.registration.painType = value;
        vm.updateRegistration();
    };

    vm.painScaleNoScore = () => {
        return vm.painScale.substring(0, vm.painScale.indexOf(' score'));
    };

    //flacc selection
    vm.selectFlacc = function (flaccnumber, newvalue) {
        if (vm.registration.painScore == null) {
            vm.registration.painScore = 0;
        } else if (vm.registration.flaccvalue[flaccnumber] != null) {
            vm.registration.painScore -= vm.registration.flaccvalue[flaccnumber];
        }
        vm.registration.flaccvalue[flaccnumber] = newvalue;
        vm.registration.painScore += newvalue;
        vm.updateRegistration();
    };

    vm.changeScale = (destinationScale) => {
        vm.showFlacc = destinationScale?destinationScale===vm.flaccScale:!vm.showFlacc;
        vm.painScale = vm.showFlacc?vm.flaccScale:vm.wongBakerScale;
        vm.registration.painScore = 0;
        vm.selectedSmiley = null;
        vm.smileyDescription = "";
        if (vm.showFlacc) {
            vm.registration.flaccvalue = [];
        } else {
            vm.registration.flaccvalue = null;
            vm.selectSmiley(0, true);
        }

        $ionicScrollDelegate.resize();
        $ionicScrollDelegate.scrollTop();
        validateData();

        //Store current scale as the preferred one
        var usrSettings = UserSettings.findOne();
        if (usrSettings && usrSettings.painScale!==vm.painScale) {
            Meteor.call('setSelectedPainScale', vm.painScale, (error, result) => {
                console.log("SetSelectedPainScale ", vm.painScale," err: ", error,", result: ",result);
            });
        }
    };

    function scrollToSmiley() {
        var smileyWidth = vm.isSmallScreen() ? 75 : 125;
        var x = vm.registration.painScore / 2 * smileyWidth;
        $ionicScrollDelegate.$getByHandle('smiley-scroll').scrollTo(x, 0, true);
    }

    vm.smileySliderChanged = () => {
        if (vm.registration.painScore === undefined) {
            vm.registration.painScore = 0;
        }
        var painScore = vm.registration.painScore;
        if (painScore % 2 == 0) {
            vm.selectSmiley(parseInt(painScore));
        } else {
            //scrollToSmiley();
        }
        vm.updateRegistration();
    };

    vm.selectSmiley = (smileynumber, ignorePainScore) => {
        console.log('smileynumber is: ', smileynumber);
        vm.selectedSmiley = smileynumber;

        //updates painScore if method called from UI
        if (ignorePainScore === undefined)
            vm.registration.painScore = smileynumber;

        switch (smileynumber) {
            case 0:
                vm.smileyDescription = "pain.smiley0";
                break;
            case 2:
                vm.smileyDescription = "pain.smiley2";
                break;
            case 4:
                vm.smileyDescription = "pain.smiley4";
                break;
            case 6:
                vm.smileyDescription = "pain.smiley6";
                break;
            case 8:
                vm.smileyDescription = "pain.smiley8";
                break;
            case 10:
                vm.smileyDescription = "pain.smiley10";
                break;
            default:
                vm.smileyDescription = "";
        }
        if (vm.isSmallScreen()) {
            //scrollToSmiley();
        }
        vm.updateRegistration();
    };

    if (!vm.init) {
        initData();
    }
}