angular.module('leukemiapp').controller('timestampController', TimestampController);

function TimestampController($scope, $reactive, $timeout, $translate, WizardState, WizardStateAccessor) {
   $reactive(this).attach($scope);
   var vm = this;

   var subHandle;

   vm.helpers({
      registrationWithTimestamp: () => {
         return Registrations.findOne({
            $and: [
               {moduleName: vm.dataType},
               {timestamp: vm.getReactively('timestamp')}
            ]
         });
      }
   });

   $scope.$on('stepLoaded', function (event, data) {
      if (data.stepNumber == 1) {
         console.log('Timestamp loaded!');

         var registration = WizardStateAccessor.getRegistration(vm.dataType);
         if (registration && registration._id) {

            console.log('Timestamp init skipped because registration is updating');
            vm.datePickerObj.inputDate = registration.timestamp;
            vm.timePickerObj.inputEpochTime =
               (registration.timestamp.getHours() * 60 * 60 +
               Math.floor(registration.timestamp.getMinutes() / 5) * 5 * 60);

         } else {

            subHandle = vm.subscribe('registrationWithTimestamp',
               () => [vm.getReactively('dataType'), vm.getReactively('timestamp')],
               () => {
                  updateRegistrationTimestamp();
                  console.log('Subscription done!');
               });
         }
      }
   });

   //Init
   vm.dataType = Session.get('registrationType');
   WizardStateAccessor.registerValidateFunction(vm.dataType, validateRegistrationTimestamp);

   if (vm.timePickerObj === undefined)
      vm.timePickerObj = {
         displayValue: function () {
            return formatTime(vm.timePickerObj.inputEpochTime);
         },
         inputEpochTime: (new Date().getHours() * 60 * 60 + Math.floor(new Date().getMinutes() / 5) * 5 * 60),  //Optional
         step: 5,  //Optional
         format: 24,  //Optional
         titleLabel: $translate.instant('graphData.timestamp'),  //Optional
         setLabel: $translate.instant('graphData.choose'),  //Optional
         closeLabel: $translate.instant('graphData.close'),  //Optional
         setButtonType: 'button-positive',  //Optional
         closeButtonType: 'button-stable',  //Optional
         callback: function (val) {    //Mandatory
            if (val) {
               vm.timePickerObj.inputEpochTime = val;
               updateRegistrationTimestamp();
            }
         }
      };

   if (vm.datePickerObj === undefined)
      vm.datePickerObj = {
         titleLabel: $translate.instant('graphData.date'),  //Optional
         todayLabel: $translate.instant('graphData.today'),  //Optional
         closeLabel: $translate.instant('graphData.close'),  //Optional
         setLabel: $translate.instant('graphData.choose'),  //Optional
         setButtonType: 'button-positive',  //Optional
         todayButtonType: 'button-stable',  //Optional
         closeButtonType: 'button-stable',  //Optional
         inputDate: new Date(),  //Optional
         mondayFirst: true,  //Optional
         //disabledDates: disabledDates, //Optional
         weekDaysList: $translate.instant('weekdaysShortList').split("_"), //Optional
         monthList: $translate.instant('monthsList').split("_"), //Optional
         templateType: 'popup', //Optional
         showTodayButton: 'true', //Optional
         modalHeaderColor: 'bar-positive', //Optional
         modalFooterColor: 'bar-positive', //Optional
         //from: new Date(2012, 8, 2), //Optional
         //to: new Date(2018, 8, 25),  //Optional
         callback: function (val) {  //Mandatory
            if (val) {
               vm.datePickerObj.inputDate = val;
               updateRegistrationTimestamp();
            }
         },
         dateFormat: 'dd-MM-yyyy', //Optional
         closeOnSelect: false //Optional
      };

   function formatTime(inputEpochTime) {
      var selectedTime = new Date(inputEpochTime * 1000);
      var hours = selectedTime.getUTCHours();
      var minutes = selectedTime.getUTCMinutes();
      return (hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes;
   }

   function intializeTimeStamp() {
      var date = vm.datePickerObj.inputDate;

      if (date) {
         //TODO: Add propriety to module config file which controls if time is ignored
         if (vm.dataType !== 'Medicine' && vm.dataType !== 'Bloodsample') {
            var hours = Math.floor(vm.timePickerObj.inputEpochTime / 3600);
            var minutes = Math.floor((vm.timePickerObj.inputEpochTime - hours * 3600) / 60);
            date.setHours(hours, minutes, 0, 0);
         } else {
            date.setHours(12, 0, 0, 0);
         }
      }
   }

   function updateRegistrationTimestamp() {
      intializeTimeStamp();
      var date = vm.datePickerObj.inputDate;

      if (date) {
         $timeout(() => {
            vm.timestamp = new Date(date.getTime());
         }).then(storeTimeStamp);
      } else {
         storeTimeStamp()
      }
   }

   function storeTimeStamp() {
      intializeTimeStamp();

      //Code to execute after vm.timestamp is updated
      var registration = WizardStateAccessor.getRegistration(vm.dataType);
      var validated = Session.get('regValidated');

      if (validated === undefined)
         validated = [];
      if (vm.registrationWithTimestamp) {
         console.log('registrationWithTimestamp found!');
         validated[0] = false;
         registration = vm.registrationWithTimestamp;
      } else {
         if (!registration)
            registration = {};
         console.log('registrationWithTimestamp is null!');
         validated[0] = true;
         registration = {
            timestamp: vm.datePickerObj.inputDate
         };
      }
      Session.set('regValidated', validated);
      console.log('regValidated session variable updated', validated);
      WizardStateAccessor.setRegistration(vm.dataType, registration);
      console.log('registration session variable updated', registration);
   }

   function validateRegistrationTimestamp(registration, from, to) {
      return !registration._id || Session.get('updating');
   }
}
