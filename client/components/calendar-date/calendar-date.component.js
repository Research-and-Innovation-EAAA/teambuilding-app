angular.module('leukemiapp').directive('calendarDate', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/calendar-date/calendar-date.html',
      controllerAs: 'caldate',
      controller: CalendarDateController
   }
});

function CalendarDateController($scope, $reactive, $translate) {
   $reactive(this).attach($scope);
   var vm = this;

   var monthNames = $translate.instant('monthsList').split("_");
   var dayOfWeekNames = $translate.instant('weekdaysList').split("_");

   vm.helpers({
      selectedDate: () => {
         return moment(Session.get('selectedDate')).date();
      },
      selectedDayOfWeek: () => {
         return dayOfWeekNames[moment(Session.get('selectedDate')).day()];
      },
      selectedMonth: () => {
         return monthNames[moment(Session.get('selectedDate')).month()];
      }
   });
}