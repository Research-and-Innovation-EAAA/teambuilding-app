angular.module('leukemiapp').directive('calendarDate', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/calendar-date/calendar-date.html',
      controllerAs: 'caldate',
      controller: CalendarDateController
   }
});

function CalendarDateController($scope, $reactive, $translate, SessionSetting) {
   $reactive(this).attach($scope);
   var vm = this;

   var monthNames = $translate.instant('monthsList').split("_");
   var dayOfWeekNames = $translate.instant('weekdaysList').split("_");

   vm.helpers({
      selectedDate: () => {
         return moment(SessionSetting.getValue('selectedDate')).date();
      },
      selectedDayOfWeek: () => {
         return dayOfWeekNames[moment(SessionSetting.getValue('selectedDate')).day()];
      },
      selectedMonth: () => {
         return monthNames[moment(SessionSetting.getValue('selectedDate')).month()];
      }
   });
}