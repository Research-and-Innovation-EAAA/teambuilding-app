angular.module('leukemiapp').directive('calendar', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/calendar/calendar.html',
      controllerAs: 'calendar',
      controller: CalendarController
   }
});

function CalendarController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   Session.set('selectedDate', new Date().valueOf());

   vm.options = {
      defaultDate: new Date(),
      minDate: "2015-01-01",
      maxDate: "2020-12-31",
      disabledDates: [],
      dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
      mondayIsFirstDay: true,//set monday as first day of week. Default is false
      eventClick: function (date) {
         //saveNote();
         //calendarFactory.setSelectedDate(date.date);
         //$scope.checkBoxModel.bloodsample = false;
         //$scope.checkBoxModel.highdose = false;
         //$scope.notes = calendarFactory.getNoteForDay();
         //
         //date.event.forEach(function (event) {
         //   if (event.foo == 'bloodsample')
         //      $scope.checkBoxModel.bloodsample = true;
         //   if (event.foo == 'highdose')
         //      $scope.checkBoxModel.highdose = true;
         //});
         //
         //console.log(date);
      },
      dateClick: function (date) {
         //saveNote();
         Session.set('selectedDate', date.date.valueOf());
         //$scope.checkBoxModel.bloodsample = false;
         //$scope.checkBoxModel.highdose = false;
         //$scope.notes = calendarFactory.getNoteForDay();
      },
      changeMonth: function (month, year) {
         console.log('Month changed');
      }
   };

   vm.events = [];
}

//CalendarController.$inject = ['calendarService'];