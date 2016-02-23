angular.module('leukemiapp').controller('graphDataController', GraphDataController);

function GraphDataController($scope, $reactive, $timeout, $filter) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.subscribe('mucositisData');

   if (!vm.endTimeStamp || !vm.startTimeStamp) {
      vm.endTimeStamp = new Date();
      vm.startTimeStamp = new Date();
      vm.startTimeStamp.setMonth(vm.startTimeStamp.getMonth() - 1);
   }

   vm.helpers({
      getDataForPeriod: () => {
         console.log('getDataForPeriod: ', vm.startTimeStamp, vm.endTimeStamp);
         return Mucositis.find({
            timestamp: {
               $gt: vm.startTimeStamp,
               $lt: vm.endTimeStamp
            }
         });
      }
   });

   vm.dataType = Session.get('graphDataType');

   if (vm.dataSeries === undefined) {
      vm.dataSeries = []; // Objects like {values: [{x:timeStap, y:value},...], color: ?, type: ?, key: ?, label: ?, visible: true}
   }

   if (vm.startTimePickerObject === undefined) {
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
               vm.updateDataObjects();
            }
         }
      };
   }
   if (vm.startDatepickerObject === undefined) {
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
         callback: function (val) {  //Mandatory
            if (val) {
               vm.startDatepickerObject.inputDate = val;
            }
            vm.updateStartTimeStamp();
            vm.updateDataObjects();
         },
         dateFormat: 'dd-MM-yyyy', //Optional
         closeOnSelect: false //Optional
      };
   }

   if (vm.endTimePickerObject === undefined) {
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
               vm.updateDataObjects();
            }
         }
      };
   }
   if (vm.endDatepickerObject === undefined) {
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
         callback: function (val) {  //Mandatory
            if (val) {
               vm.endDatepickerObject.inputDate = val;
            }
            vm.updateEndTimeStamp();
            vm.updateDataObjects();
         },
         dateFormat: 'dd-MM-yyyy', //Optional
         closeOnSelect: false //Optional
      };
   }

   vm.updateStartTimeStamp = function () {
      var date = vm.startDatepickerObject.inputDate;
      var hours = Math.floor(vm.startTimePickerObject.inputEpochTime / 3600);
      var minutes = Math.floor((vm.startTimePickerObject.inputEpochTime - hours * 3600) / 60);
      date.setHours(hours, minutes, 0, 0);
      vm.startTimeStamp = date;
      console.log("updated start timestamp");
      console.log(date);
   };

   vm.updateEndTimeStamp = function () {
      var date = vm.endDatepickerObject.inputDate;
      var hours = Math.floor(vm.endTimePickerObject.inputEpochTime / 3600);
      var minutes = Math.floor((vm.endTimePickerObject.inputEpochTime - hours * 3600) / 60);
      date.setHours(hours, minutes, 0, 0);
      vm.endTimeStamp = date;
   };

   function formatTime(inputEpochTime) {
      var selectedTime = new Date(inputEpochTime * 1000);
      var hours = selectedTime.getUTCHours();
      var minutes = selectedTime.getUTCMinutes();
      return (hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes;
   }

   vm.options = {
      chart: {
         type: 'multiChart',
         height: window.innerHeight / 2,
         showLegend: false,
         noData: "Ingen data valgt til visning",
         margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
         },
         "allcolors": [
            "#1f77b4",
            "#ff7f0e",
            "#2ca02c",
            "#d62728",
            "#9467bd",
            "#8c564b",
            "#e377c2",
            "#7f7f7f",
            "#bcbd22",
            "#17becf",
            "#1f77b4",
            "#ff7f0e",
            "#2ca02c",
            "#d62728",
            "#9467bd",
            "#8c564b",
            "#e377c2",
            "#7f7f7f",
            "#bcbd22",
            "#17becf",
            "#1f77b4",
            "#ff7f0e",
            "#2ca02c",
            "#d62728",
            "#9467bd",
            "#8c564b",
            "#e377c2",
            "#7f7f7f",
            "#bcbd22",
            "#17becf"
         ],
         //color: d3.scale.category10().range(),
         //useInteractiveGuideline: false,
         transitionDuration: 500,
         xAxis: {
            tickFormat: function (d) {
               if (!d) return d;
               return d3.time.format('%d/%m')(new Date(d));
            }
         },
         yAxis1: {
            tickFormat: function (d) {
               if (!d) return d;
               return d3.format(',.1f')(d);
            }
         },
         yAxis2: {
            tickFormat: function (d) {
               if (!d) return d;
               return d3.format(',.1f')(d);
            }
         }
      }
   };

   vm.config = {
      visible: true, // default: true
      extended: false, // default: false
      disabled: false, // default: false
      autorefresh: true, // default: true
      refreshDataOnly: true, // default: true
      deepWatchOptions: true, // default: true
      deepWatchData: true, // default: false
      deepWatchConfig: true, // default: true
      debounce: 10 // default: 10
   };

   //Data serie visibility control
   vm.updateFilteredDataSeries = function () {
      var curr = vm.displaytype;
      //using $timeout instead of $scope.$apply removes $digest already in progress error
      $timeout(function () {
         vm.filteredDataSeries = $filter('filter')(vm.dataSeries, {visible: true});
         console.log("Filtered DataSeries: ");
         console.log(vm.filteredDataSeries);
         var chart = nv.models.multiChart();
         d3.select("graph svg").datum(vm.filteredDataSeries).call(chart);
         if (curr == "chart")
            vm.displaytype = "table";
         else
            vm.displaytype = "chart";
      });
      $timeout(function () {
         vm.displaytype = curr;
      });
   };

   vm.updateDataObjects = function () {
      console.log("update data objects is called");
      //create graph dataseries content
      //Mongo.Collection.get(vm.dataType)
      var dataObjects = vm.getDataForPeriod;
      console.log(dataObjects);

      var dataserieNumber = 0;
      for (var objcount in dataObjects) {

         //Insert all timeStamp data in data series
         var obj = dataObjects[objcount];
         for (dataSerieName in obj) {
            if (!obj.hasOwnProperty(dataSerieName) ||
               dataSerieName === "_id" ||
               dataSerieName === "timestamp" ||
               dataSerieName === "createdAt" ||
               dataSerieName === 'createdBy')
               continue;

            //Lookup dataserie for dataSerieName
            var dataserie = vm.dataSeries.find(function (e) {
               return e.key == dataSerieName
            });
            if (dataserie === undefined) {
               dataserie = {};
               dataserie['values'] = [];
               dataserie['color'] = vm.options.chart.allcolors[vm.dataSeries.length + 1];
               dataserie['type'] = 'line';
               dataserie['key'] = dataSerieName;
               dataserie['label'] = dataSerieName;
               dataserie['visible'] = 0 == dataserieNumber++;
               vm.dataSeries.push(dataserie);
            }

            //Insert new dataserie value
            var dataValue = {'x': obj['timestamp'], 'y': obj[dataSerieName]};
            var position = dataserie.values.findIndex(function (e) {
               return e.x == obj['timestamp'];
            });
            if (position < 0)
               dataserie.values.push(dataValue);
            else
               dataserie.values.splice(position, 1, dataValue);
         }
      }

      //Remove all data out of period
      function isDataOutOfPeriod(element, index, array) {
         return (element.x < vm.startTimeStamp || element.x > vm.endTimeStamp);
      }

      for (dataserie in vm.dataSeries) {
         do {
            var removeIndex = vm.dataSeries[dataserie].values.findIndex(isDataOutOfPeriod);
            if (removeIndex >= 0)
               vm.dataSeries[dataserie].values.splice(removeIndex, 1);
         } while (removeIndex >= 0);
      }

      //Sort data values
      for (dataserie in vm.dataSeries) {
         vm.dataSeries[dataserie].values.sort(function (e1, e2) {
            return e1.x < e2.x
         });
      }

      //Data serie display control
      var countLeft = 0;
      var countRight = 0;
      vm.dataSeries.forEach(function (dataserie) {
         if (dataserie.yAxis === 1) {
            countLeft++;
         } else if (dataserie.yAxis === 2) {
            countRight++;
         }
      });
      vm.dataSeries.forEach(function (dataserie) {
         if (dataserie.yAxis !== 1 && dataserie.yAxis !== 2) {
            if (countRight < countLeft) {
               dataserie.yAxis = 2;
               countRight++
            } else {
               dataserie.yAxis = 1;
               countLeft++
            }
         }
      });
      vm.options.chart.color = vm.dataSeries.map(function (dataserie) {
         return dataserie.color;
      });

      //Data serie visibility control
      vm.updateFilteredDataSeries();
   };

   vm.toggleShowDataSerie = function (key) {
      var dataserie = vm.dataSeries.find(function (ds) {
         return ds.key == key;
      });
      dataserie.visible = !dataserie.visible;

      //Data serie visibility control
      vm.updateFilteredDataSeries();
   };

   vm.displaytype = "";//'chart' or 'table'
   vm.chartButtonClass = "";
   vm.tableButtonClass = "";

   vm.changeDisplayType = function (dis) {
      vm.displaytype = dis;
      //console.log("Type:" + dis);
      if (dis == "chart") {
         vm.chartButtonClass = "button-dark";
         vm.tableButtonClass = "button-light";
      } else if (dis == "table") {
         vm.chartButtonClass = "button-light";
         vm.tableButtonClass = "button-dark";
      }
   };
   vm.changeDisplayType("table");

   //Update data content
   vm.updateDataObjects();

   $scope.$watch(
      function () {
         return vm.startTimeStamp.getTime();
      },
      function (newValue, oldValue) {
         vm.updateDataObjects();
      }
   );
   $scope.$watch(
      function () {
         return vm.endTimeStamp.getTime();
      },
      function (newValue, oldValue) {
         vm.updateDataObjects();
      }
   );
}

