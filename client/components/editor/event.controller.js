angular.module('leukemiapp').controller('eventEditorController', EventEditorController);

function EventEditorController($scope, $rootScope, $reactive, $ionicPopup, $ionicActionSheet) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.chooseType = (type) => {
        vm.eventType = type;
    };

    vm.cancelModal = () => {
        $scope.modal.hide();
        vm.event = undefined;
        vm.questionsShow = false;
    };

    vm.saveModal = () => {
        if (vm.event.startDate !== undefined) {
            vm.event.startDate = moment(vm.event.startDate).format('YYYY-MM-DD');
        }
        if (vm.event.endDate !== undefined) {
            vm.event.endDate = moment(vm.event.endDate).format('YYYY-MM-DD');
        }

        vm.event.shortEvent = vm.eventType != 3;

        if (vm.customModules !== undefined) {
            if (vm.event.shortEvent) {
                vm.moduleInfo["steps"] = vm.customModules[0].wizard.steps;
            }
            else {
                vm.moduleInfo["steps1"] = vm.customModules[0].wizard.steps;
                vm.moduleInfo["steps2"] = vm.customModules[1].wizard.steps;
                vm.moduleInfo["steps3"] = vm.customModules[2].wizard.steps;
            }
        }

        Meteor.call('saveEvent', vm.event, vm.moduleInfo, (error, result) => {
            if (error) {
                $ionicPopup.alert({
                    title: "Event not saved",
                    content: "Could not save event, try again! " + error
                });
            } else {
                $ionicPopup.alert({
                    title: "Event saved",
                    content: "We successfully saved event " + vm.event.name + "!"
                });

                $rootScope.$ionicGoBack();
            }
        });

    };

    vm.showQuestions = () => {
        vm.customModules = CustomModules.find({eventId: vm.event._id}, {sort: {number: 1}}).fetch();
        vm.questionsShow = !vm.questionsShow;
        if (vm.questionsShow && vm.customModules.length == 1) {
            vm.customModules[0].open = true;
        }
    };

    vm.showSteps = (number) => {
        console.log("showSteps " + number);
        var module = _.where(vm.customModules, {number: number})[0];
        module.open = !module.open;
        console.log("module.open: " + module.open);

    };

    vm.stepTypes = [
        {text: 'Slider'},
        {text: 'Single question'}
    ];

    vm.newStepId = undefined;

    vm.popoverNewStep = function (moduleId, number) {
        // Show the action sheet
        $ionicActionSheet.show({
            buttons: vm.stepTypes,
            titleText: 'Add a new question',
            cancelText: 'Cancel',
            cancel: function () {
                // cancel code..
            },
            buttonClicked: function (index) {
                vm.addStep(moduleId, number, vm.stepTypes[index].text);
                return true;
            }
        });
    };

    vm.addStep = (moduleId, number, type) => {
        var module = _.findWhere(vm.customModules, {_id: moduleId});
        console.log("found module " + JSON.stringify(module));

        if (type === 'Single question') {
            module.wizard.steps[number] = {
                "stepName": "Quiz question #1",
                "stepTemplate": {
                    "url": "client/components/wizard/templates/single-question.html",
                    "config": {
                        "propertyName": "qwwwww1",
                        "question": "",
                        "answers": [
                            "aa",
                            "bb"
                        ],
                        "mandatory": true
                    }
                }
            };
        }
        else if (type === 'Slider') {
            module.wizard.steps[number] = {
                "stepName": "Bilka",
                "stepTemplate": {
                    "url": "client/components/wizard/templates/slider.html",
                    "config": {
                        "question": "",
                        "propertyName": "cowBilkaAge",
                        "minValue": 0,
                        "maxValue": 10,
                        "step": 1,
                        "mandatory": true,
                        "smiley": true
                    }
                }
            };
        }

    };


    $scope.$on('$ionicView.beforeEnter', function () {
        if (Session.get('eventId')) {
            vm.pageTitle = "Edit event";
        }
        else {
            vm.pageTitle = "Add event";
        }

        console.log("EVENT ID: " + Session.get('eventId') + " " + vm.pageTitle);

        vm.questionsShow = false;
        vm.event = Events.findOne({'_id': Session.get('eventId')});

        if (vm.event !== undefined) {
            if (vm.event.startDate !== undefined) {
                vm.event.startDate = new Date(vm.event.startDate);
            }
            if (vm.event.endDate !== undefined) {
                vm.event.endDate = new Date(vm.event.endDate);
            }
            vm.eventType = vm.event.shortEvent ? 1 : 3;

            vm.moduleInfo = {};

            const handle = Meteor.subscribe('customModules');
            Tracker.autorun(() => {
                const isReady = handle.ready();

                if (isReady) {
                    console.log("FOUND CUST MODULES: " + CustomModules.find().fetch());

                    if (vm.eventType == 1) {
                        var module = CustomModules.findOne({eventId: vm.event._id, number: 1});
                        vm.moduleInfo.startTime = module.startTime;
                        vm.moduleInfo.endTime = module.endTime;
                    }
                    else {
                        var module = CustomModules.findOne({eventId: vm.event._id, number: 1});
                        vm.moduleInfo.startTime1 = module.startTime;
                        vm.moduleInfo.endTime1 = module.endTime;

                        var module = CustomModules.findOne({eventId: vm.event._id, number: 2});
                        vm.moduleInfo.startTime2 = module.startTime;
                        vm.moduleInfo.endTime2 = module.endTime;

                        var module = CustomModules.findOne({eventId: vm.event._id, number: 3});
                        vm.moduleInfo.startTime3 = module.startTime;
                        vm.moduleInfo.endTime3 = module.endTime;
                    }

                    console.log("MODULE INFO IS" + JSON.stringify(vm.moduleInfo));
                }
            });

        }
        else {
            vm.eventType = undefined;
            vm.moduleInfo = undefined;
        }


        console.log('modal is shown!');
    });


    //------------------------------------------ date time pickers ------------------------------------------
    /*
     vm.timePickerObj = {
     displayValue: function () {
     return formatTime(vm.timePickerObj.inputEpochTime);
     },
     inputEpochTime: (new Date().getHours() * 60 * 60 + Math.floor(new Date().getMinutes() / 5) * 5 * 60),  //Optional
     step: 5,  //Optional
     format: 24,  //Optional
     titleLabel: $translate.instant('dateTime.timestamp'),  //Optional
     setLabel: $translate.instant('dateTime.choose'),  //Optional
     closeLabel: $translate.instant('dateTime.close'),  //Optional
     setButtonType: 'button-positive',  //Optional
     closeButtonType: 'button-stable',  //Optional
     callback: function (val) {    //Mandatory
     if (val) {
     vm.timePickerObj.inputEpochTime = val;
     updateRegistrationTimestamp();
     }
     }
     };


     vm.datePickerObj = {
     titleLabel: $translate.instant('dateTime.date'),  //Optional
     todayLabel: $translate.instant('dateTime.today'),  //Optional
     closeLabel: $translate.instant('dateTime.close'),  //Optional
     setLabel: $translate.instant('dateTime.choose'),  //Optional
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
     return hours + ' : ' + (minutes < 10 ? '0' : '') + minutes;
     }

     function intializeTimeStamp() {
     var date = vm.datePickerObj.inputDate;

     if (date) {
     var hours = Math.floor(vm.timePickerObj.inputEpochTime / 3600);
     var minutes = Math.floor((vm.timePickerObj.inputEpochTime - hours * 3600) / 60);
     date.setHours(hours, minutes, 0, 0);

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
     */

}