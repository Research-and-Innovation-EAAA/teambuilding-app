angular.module('leukemiapp').controller('painController', PainController);

function PainController($scope, $reactive, $ionicScrollDelegate) {
   $reactive(this).attach($scope);
   var vm = this;

   var module = Modules[2];

   //Init
   vm.registration = Session.get('registration');

   function initData() {
      if (vm.registration.painScore != null) {
         //registration is being updated
         if (vm.registration.flaccvalue == null) {
            //painscore was stored with smileys
            vm.showFlacc = false;
            vm.painScale = 'Wong-Baker score';
            var painScore = vm.registration.painScore;
            if (painScore % 2 == 0) {
               vm.selectSmiley(parseInt(painScore), true);
            } else {
               vm.selectSmiley(parseInt(painScore - 1), true);
            }
         } else {
            //painscore was stored with flacc
            vm.showFlacc = true;
            vm.painScale = 'FLACC score';
            vm.smileyDescription = "";
         }
      } else {
         vm.registration.flaccvalue = [];
         vm.showFlacc = true;
         vm.painScale = 'FLACC score';
         vm.smileyDescription = "";
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

   vm.changeScale = () => {
      vm.showFlacc = !vm.showFlacc;
      vm.showFlacc ? vm.painScale = 'FLACC score' : vm.painScale = 'Wong-Baker score';
      vm.registration.painScore = null;
      vm.selectedSmiley = null;
      if (vm.showFlacc) {
         vm.registration.flaccvalue = [];
      } else {
         vm.registration.flaccvalue = null;
      }
      vm.smileyDescription = "";
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollTop();
      validateData();
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
            vm.smileyDescription = "Man kan gøre fuldstændig, som man plejer uden at tænke på, at det gør ondt.";
            break;
         case 2:
            vm.smileyDescription = "Man kan gøre, som man plejer, men af og til må man standse op, fordi det gør ondt.";
            break;
         case 4:
            vm.smileyDescription = "Man har mest lyst til at sidde stille og få læst en historie eller se fjernsyn, fordi det gør ondt.";
            break;
         case 6:
            vm.smileyDescription = "Man tænker på, at det gør ondt hele tiden.";
            break;
         case 8:
            vm.smileyDescription = "Man har så ondt, at man har lyst til at græde, fordi det gør ondt.";
            break;
         case 10:
            vm.smileyDescription = "Man har så ondt, at man slet ikke kan holde det ud."
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