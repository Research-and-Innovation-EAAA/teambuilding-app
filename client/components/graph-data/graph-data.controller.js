angular.module('leukemiapp').controller('graphDataController', GraphDataController);

function GraphDataController($scope, $reactive, $timeout, $filter, $translate) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.dataType = Session.get('graphDataType');
   vm.viewTitle = $translate.instant(vm.dataType);

   var handle = vm.subscribe('graphData',
      () => [vm.dataType, vm.getReactively('startTimeStamp'), vm.getReactively('endTimeStamp')]);

   //Init
   if (!vm.endTimeStamp || !vm.startTimeStamp) {
      vm.endTimeStamp = new Date();
      vm.startTimeStamp = new Date();
      vm.startTimeStamp.setMonth(vm.startTimeStamp.getMonth() - 1);
   }

   if (vm.filteredData == null) {
      vm.filteredData = [];
   }

   //vm.helpers({
   //   getDataForPeriod: () => {
   //      console.log('getDataForPeriod: ', vm.startTimeStamp, vm.endTimeStamp);
   //      return Registrations.find({
   //         moduleName: vm.dataType,
   //         timestamp: {
   //            $gt: vm.startTimeStamp,
   //            $lt: vm.endTimeStamp
   //         }
   //      }, {
   //         sort: {timestamp: -1},
   //         limit: 5
   //      });
   //   }
   //});

   vm.helpers({
      getDataForPeriod: () => {
         return Registrations.find({
            moduleName: vm.dataType
         });
      }
   });

   console.log('Data for period is: ', vm.getDataForPeriod);


   //Init of date- and timepickers
   //-----------------------------
   if (vm.startTimePickerObject == null) {
      vm.startTimePickerObject = {
         displayValue: function () {
            return formatTime(vm.startTimePickerObject.inputEpochTime);
         },
         inputEpochTime: ((vm.startTimeStamp ? vm.startTimeStamp : new Date()).getHours() * 60 * 60 +
         Math.floor((vm.startTimeStamp ? vm.startTimeStamp : new Date()).getMinutes() / 5) * 5 * 60),  //Optional
         step: 5,  //Optional
         format: 24,  //Optional
         titleLabel: 'Tidspunkt',  //Optional
         setLabel: 'Vælg',  //Optional
         closeLabel: 'Luk',  //Optional
         setButtonType: 'button-positive',  //Optional
         closeButtonType: 'button-stable',  //Optional
         callback: function (val) {    //Mandatory
            if (val) {
               vm.startTimePickerObject.inputEpochTime = val;
               vm.updateStartTimeStamp();

               handle = vm.subscribe('graphData',
                  () => [vm.dataType, vm.getReactively('startTimeStamp'), vm.getReactively('endTimeStamp')]);
            }
         }
      }
   }
   if (vm.startDatepickerObject == null) {
      vm.startDatepickerObject = {
         titleLabel: 'Dato',  //Optional
         todayLabel: 'I dag',  //Optional
         closeLabel: 'Luk',  //Optional
         setLabel: 'Vælg',  //Optional
         setButtonType: 'button-positive',  //Optional
         todayButtonType: 'button-stable',  //Optional
         closeButtonType: 'button-stable',  //Optional
         inputDate: (vm.startTimeStamp ? vm.startTimeStamp : new Date()),  //Optional
         mondayFirst: true,  //Optional
         //disabledDates: disabledDates, //Optional
         weekDaysList: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"], //Optional
         monthList: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], //Optional
         templateType: 'popup', //Optional
         showTodayButton: 'true', //Optional
         modalHeaderColor: 'bar-positive', //Optional
         modalFooterColor: 'bar-positive', //Optional
         //from: new Date(2012, 8, 2), //Optional
         //to: new Date(2018, 8, 25),  //Optional
         dateFormat: 'dd-MM-yyyy', //Optional
         closeOnSelect: false, //Optional
         callback: function (val) {  //Mandatory
            if (val) {
               vm.startDatepickerObject.inputDate = val;
               vm.updateStartTimeStamp();
            }
         }
      };
   }
   if (vm.endTimePickerObject == null) {
      vm.endTimePickerObject = {
         displayValue: function () {
            return formatTime(vm.endTimePickerObject.inputEpochTime);
         },
         inputEpochTime: ((vm.endTimeStamp ? vm.endTimeStamp : new Date()).getHours() * 60 * 60 +
         Math.floor((vm.endTimeStamp ? vm.endTimeStamp : new Date()).getMinutes() / 5) * 5 * 60),
         step: 5,  //Optional
         format: 24,  //Optional
         titleLabel: 'Tidspunkt',  //Optional
         setLabel: 'Vælg',  //Optional
         closeLabel: 'Luk',  //Optional
         setButtonType: 'button-positive',  //Optional
         closeButtonType: 'button-stable',  //Optional
         callback: function (val) {    //Mandatory
            if (val) {
               vm.endTimePickerObject.inputEpochTime = val;
               vm.updateEndTimeStamp();

               handle = vm.subscribe('graphData',
                  () => [vm.dataType, vm.getReactively('startTimeStamp'), vm.getReactively('endTimeStamp')]);
            }
         }
      };
   }
   if (vm.endDatepickerObject == null) {
      vm.endDatepickerObject = {
         titleLabel: 'Dato',  //Optional
         todayLabel: 'I dag',  //Optional
         closeLabel: 'Luk',  //Optional
         setLabel: 'Vælg',  //Optional
         setButtonType: 'button-positive',  //Optional
         todayButtonType: 'button-stable',  //Optional
         closeButtonType: 'button-stable',  //Optional
         inputDate: (vm.endTimeStamp ? vm.endTimeStamp : new Date()),  //Optional
         mondayFirst: true,  //Optional
         //disabledDates: disabledDates, //Optional
         weekDaysList: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"], //Optional
         monthList: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], //Optional
         templateType: 'popup', //Optional
         showTodayButton: 'true', //Optional
         modalHeaderColor: 'bar-positive', //Optional
         modalFooterColor: 'bar-positive', //Optional
         //from: new Date(2012, 8, 2), //Optional
         //to: new Date(2018, 8, 25),  //Optional
         dateFormat: 'dd-MM-yyyy', //Optional
         closeOnSelect: false, //Optional
         callback: function (val) {  //Mandatory
            if (val) {
               vm.endDatepickerObject.inputDate = val;
               vm.updateEndTimeStamp();
            }
         }
      };
   }

   function formatTime(inputEpochTime) {
      var selectedTime = new Date(inputEpochTime * 1000);
      var hours = selectedTime.getUTCHours();
      var minutes = selectedTime.getUTCMinutes();
      return (hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes;
   }

   vm.updateStartTimeStamp = function () {
      var date = vm.startDatepickerObject.inputDate;
      var hours = Math.floor(vm.startTimePickerObject.inputEpochTime / 3600);
      var minutes = Math.floor((vm.startTimePickerObject.inputEpochTime - hours * 3600) / 60);
      date.setHours(hours, minutes, 0, 0);
      vm.startTimeStamp = date;
      console.log("updated start timestamp to ", vm.startTimeStamp);
   };

   vm.updateEndTimeStamp = function () {
      var date = vm.endDatepickerObject.inputDate;
      var hours = Math.floor(vm.endTimePickerObject.inputEpochTime / 3600);
      var minutes = Math.floor((vm.endTimePickerObject.inputEpochTime - hours * 3600) / 60);
      date.setHours(hours, minutes, 0, 0);
      vm.endTimeStamp = date;
      console.log("updated end timestamp to ", vm.endTimeStamp);
   };

   Tracker.autorun(function() {
      if (handle.ready())
         console.log('Subscription ready!', vm.getDataForPeriod);
   });


}

