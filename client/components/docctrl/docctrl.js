angular.module('leukemiapp').controller('docctrl', docctrl);

function docctrl($scope, $stateParams) {

    console.log("DocCtrl "+ JSON.stringify($stateParams));

    $scope.pdfName = $stateParams.url;
    $scope.pdfUrl = "/pdf/"+$stateParams.url+".pdf";
    $scope.scroll = 0;
    $scope.loading = 'loading';

    $scope.getNavStyle = function(scroll) {
        if(scroll > 100) return 'pdf-controls fixed';
        else return 'pdf-controls';
    }

    $scope.onError = function(error) {
        console.log(error);
    }

    $scope.onLoad = function() {
        $scope.loading = '';
    }

    $scope.onProgress = function(progress) {
        console.log(progress);
    }

};

