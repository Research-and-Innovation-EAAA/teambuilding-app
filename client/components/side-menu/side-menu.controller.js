angular.module('leukemiapp').controller('pdfController', PdfViewerController);

function PdfViewerController($scope, $reactive, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.clickTester = () => {
      console.log('Click registered.');
   };

   vm.openUrl = (url) => {
      console.log("PdfUrl="+url);
      $location.path("app/docctrl/"+url);
   }
}
