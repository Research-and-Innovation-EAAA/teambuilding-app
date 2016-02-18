angular.module('leukemiapp')
   .config(function ($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      $stateProvider
         .state('frontpage', {
            url: '/frontpage',
            templateUrl: 'client/components/frontpage/frontpage.html'
         })
         .state('questionwizard', {
            url: '/questionwizard',
            templateUrl: 'client/components/wizard/question-wizard.html'
         });
      //.state('dataoverviewpage', {
      //   url: '/dataoverviewpage',
      //   templateUrl: 'templates/dataoverview.html'
      //});

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/frontpage');
   });