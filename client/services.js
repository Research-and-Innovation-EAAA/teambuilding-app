angular.module('leukemiapp')

   .factory('ModuleManagementService', function () {

      var service = {};

      service.activeModules = [];
      service.modules = {};

      for (moduleNumber = 0; moduleNumber < Modules.length; moduleNumber++) {
         var moduleName = Modules[moduleNumber].name;

         service.modules[moduleName] = true;
      }
      setActiveModules();

      service.toggleModule = (moduleName) => {

         if (moduleName !== undefined) {
            service.modules[moduleName] = !service.modules[moduleName];
         }

         setActiveModules();
      };

      function setActiveModules() {
         console.log('service.modules is ', service.modules);
         service.activeModules = [];

         for (var module in service.modules) {
            if (service.modules.hasOwnProperty(module) && module !== undefined) {
               if (service.modules[module] == true) {
                  service.activeModules.push(module);
               }
            }
         }

         console.log('active modules are ', service.activeModules);
      }

      return service;
   });