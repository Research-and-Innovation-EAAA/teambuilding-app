angular.module('leukemiapp').controller('pdfController', PdfViewerController);

function PdfViewerController($scope, $reactive, $ionicPopup) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.clickTester = () => {
      console.log('Click registered.');
   };

   vm.openUrl = (url) => {
      if (Meteor.isCordova) {
         $ionicPopup.alert({
            title: 'Funktion ikke tilgængelig',
            content: 'Denne funktion er kun tilgængelig på howryou.meteorapp.com'
         });
      } else {
         var analyticsSettings = Settings.findOne({key: 'analytics'});
         if (!!analyticsSettings.value) {
            analytics.page("PDF", {
               title: "PDF document " + url,
               path: url
            });
         }
         window.open(url, "_blank");
      }
   }
}