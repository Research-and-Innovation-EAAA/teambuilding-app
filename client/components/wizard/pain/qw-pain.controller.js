angular.module('leukemiapp').controller('painController', PainController);

function PainController($scope, $reactive, $ionicScrollDelegate) {
   $reactive(this).attach($scope);
   var vm = this;

   //Init
   vm.registration = Session.get('registration');

   if (vm.registration.flaccvalue === undefined) {
      vm.registration.flaccvalue = [undefined, undefined, undefined, undefined, undefined];
      vm.registration.painScore = 0;
   }
   //vm.selectedSmiley;
   vm.show = true;
   vm.painScale = 'FLACC score';
   validateData();

   vm.helpers({
      isSmallScreen: () => {
         return window.innerWidth < 768;
      }
   });

   function validateMorphine() {
      var isValidMorphine = true;
      console.log('registration.morphineType: ', vm.registration.morphineType);
      if (vm.registration.morphineType !== undefined) { //if there is a selected morphine type
         // check there is valid dose
         console.log(vm.registration.morphineDose);
         if (vm.registration.morphineDose === undefined || vm.registration.morphineDose == null || vm.registration.morphineDose < 0)
            isValidMorphine = false;
      } else { //if there is no selected morphine type
         // check if there is valid dose
         // to avoid confusion, if there is valid dose but no valid type do not validate until type is chosen or dose deleted
         console.log('registration.morphineDose: ', vm.registration.morphineDose, 'when vm.registration.morphineType === undefined');
         if (vm.registration.morphineDose != null) {
            isValidMorphine = false;
         }
      }
      return isValidMorphine;
   }

   function validateData() {
      var validated = Session.get('regValidated');
      if (validated === undefined)
         validated = [];
      validated[0] = vm.registration.timestamp !== undefined;
      validated[1] = validateMorphine();
      validated[2] = vm.registration.painType !== undefined;
      validated[3] = (vm.registration.flaccvalue != null &&
         vm.registration.flaccvalue[0] != null &&
         vm.registration.flaccvalue[1] != null &&
         vm.registration.flaccvalue[2] != null &&
         vm.registration.flaccvalue[3] != null &&
         vm.registration.flaccvalue[4] != null) || (vm.selectedSmiley != null);
      Session.set('regValidated', validated);
      console.log('regValidated session variable updated: ', validated);
      console.log('validated[3] part one: ', vm.registration.flaccvalue);
      console.log('validated[3] part two: ', vm.selectedSmiley);
   }

   vm.updateRegistration = () => {
      validateData();

      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   };

   vm.selectPainType = (value) => {
      vm.registration.painType = value;
      vm.updateRegistration();
   };

   //flacc selection
   vm.selectFlacc = function (flaccnumber, newvalue) {
      if (vm.registration.painScore === undefined) {
         vm.registration.painScore = 0;
      } else if (vm.registration.flaccvalue[flaccnumber] !== undefined) {
         vm.registration.painScore -= vm.registration.flaccvalue[flaccnumber];
      }
      vm.registration.flaccvalue[flaccnumber] = newvalue;
      vm.registration.painScore += newvalue;
      vm.updateRegistration();
   };

   vm.changeScale = () => {
      vm.show = !vm.show;
      vm.show ? vm.painScale = 'FLACC score' : vm.painScale = 'Wong-Baker score';
      vm.registration.painScore = 0;
      vm.selectedSmiley = undefined;
      vm.registration.flaccvalue = [undefined, undefined, undefined, undefined, undefined];
      vm.smileyDescription = "";
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.$getByHandle('smiley-scroll').scrollTop();
   };

   function scrollToSmiley() {
      var smileyWidth = 130;
      var x = vm.registration.painScore / 2 * smileyWidth;
      $ionicScrollDelegate.$getByHandle('smiley-scroll').scrollTo(x, 0, true);
   }

   vm.smileySliderChanged = () => {
      var painScore = vm.registration.painScore;
      if (painScore % 2 == 0) {
         vm.selectSmiley(parseInt(painScore));
      } else {
         scrollToSmiley();
      }
      vm.updateRegistration();
   };

   //smiley selection
   vm.selectedSmiley = undefined;
   vm.smileyDescription = "";

   vm.selectSmiley = (smileynumber) => {
      console.log('smileynumber is: ', smileynumber);
      vm.selectedSmiley = smileynumber;
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
      if (vm.isSmallScreen) {
         scrollToSmiley();
      }
      vm.updateRegistration();
   };
}