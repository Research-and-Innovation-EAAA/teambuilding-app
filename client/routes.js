angular.module('leukemiapp')
    .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

       // Ionic uses AngularUI Router which uses the concept of states
       // Learn more here: https://github.com/angular-ui/ui-router
       $stateProvider
           .state('app', {
              url: '/app',
              templateUrl: 'client/components/side-menu/side-menu.html'
           })
           .state('app.login', {
               url: '/login',
               views: {
                   'menuContent': {
                       templateUrl: 'client/components/login/login.html'
                   }
               }
           })
           .state('app.eventselect', {
               url: '/eventselect',
               views: {
                   'menuContent': {
                       templateUrl: 'client/components/event-select/event-select.html'
                   }
               }
           })
           .state('app.event', {
              url: '/event',
              views: {
                 'menuContent': {
                    templateUrl: 'client/components/event/event.html'
                 }
              }
           })
           .state('app.docctrl', {
              url: '/docctrl/:url',
              views: {
                 'menuContent': {
                    templateUrl: 'client/components/docctrl/docctrl.html'
                 }
              }
           })
           .state('app.questionwizard', {
              url: '/questionwizard',
              views: {
                 'menuContent': {
                    templateUrl: 'client/components/wizard/question-wizard.html'
                 }
              }
           });

       // if none of the above states are matched, use this as the fallback
       $urlRouterProvider.otherwise('/app/login');


       // general settings
        $ionicConfigProvider.backButton.previousTitleText(true);
    });
