angular.module('leukemiapp')

    .factory('SessionSetting', function () {

        var service = {};

        service.KEYS_STRING = "keys";

        service.getKeyValueObj = function() {
            var result = Session.get(service.KEYS_STRING);
            if (typeof result != 'object') {
                result = {};
                Session.set(Service.KEYS_STRING, result);
            }
            return result;
        };

        service.setKeyValueObj = function(keys) {
            Session.set(service.KEYS_STRING, keys);
        };

        service.setValue = function (key, value) {
            var keys = service.getKeyValueObj();
            keys[key] = value;
            service.setKeyValueObj(keys);
        };

        service.getValue = function(key) {
            var keys = service.getKeyValueObj();
            return keys[key];
        }

        service.clearAllValues = function () {
            service.setKeyValueObj({});
        }

        return service;

    })

    .factory('ModuleManagementService', function () {

            var service = {};

        service.activeModules = [];
        service.modules = {};

        for (moduleNumber = 0; moduleNumber < Modules.length; moduleNumber++) {
            var moduleName = Modules[moduleNumber].name;
            service.modules[moduleName] = true;
        }

        const handle = Meteor.subscribe('customModules');
        Tracker.autorun(() => {
            const isReady = handle.ready();

            if (isReady) {
                console.log(CustomModules.find().fetch());
                startup();
            }
        });

        service.toggleModule = (moduleId) => {
            if (!!Meteor.userId()) {
                if (moduleId !== undefined) {
                    setTimeout(Meteor.call('setActiveModule', moduleId, service.modules[moduleId]), 1000);
                }
            }

        };

        function startup() {
            if (!!Meteor.userId()) {
                addCustomModules();
            }
        }

        function addCustomModules() {
            CustomModules.find().forEach(function (item) {
                for (var step in item.wizard.steps) {
                    item.wizard.steps[step]["validation"] = () => true;
                    console.log("step", item.wizard.steps[step]);
                }

                Modules.push(item);
            });
        }

        return service;
    })

    .factory('WizardState', function () {
        return {};
    })

    .factory('WizardStateAccessor', function (WizardState) {
        var service = {
            validateFunction: []
        };

        service.getRegistration = (type) => {
            return WizardState[type];
        };

        service.setRegistration = (type, registration) => {
            WizardState[type] = registration;
        };

        service.registerValidateFunction = (type, validateFunction) => {
            service.validateFunction[type] = validateFunction;
        };

        service.validate = (type, registration, from, to) => {
            if (registration && service.validateFunction[type]) {
                return service.validateFunction[type](registration, from ? from - 1 : from, to ? to - 1 : to);
            }

            return undefined;
        };

        return service;
    });
