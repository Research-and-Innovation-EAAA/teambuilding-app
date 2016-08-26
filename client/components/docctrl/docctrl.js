angular.module('leukemiapp').controller('docctrl', docctrl);

PDFJS.disableWorker = true;

function docctrl($scope, $stateParams) {

    console.log("DocCtrl "+ JSON.stringify($stateParams));

    $scope.isNative = Meteor.isCordova==true?true:false;
    $scope.pdfName = $stateParams.url;
    $scope.pdfUrl = "/pdf/"+$stateParams.url+".pdf";
    $scope.canvas = document.getElementById($scope.isNative?'pdfdocumentnative':'pdfdocumentweb');
    $scope.ctx = $scope.canvas.getContext('2d');
    $scope.pageCount = 1;
    $scope.pageNum = 1;
    $scope.scale = 1.0;

    $scope.renderPage = function() {

        // Using promise to fetch the page
        $scope.pdfDoc.getPage($scope.pageNum).then(function(page) {

            //Calculate view port scaling
            var width_scale = window.innerWidth / page.getViewport(1.0).width;
            var height_scale = window.innerHeight / page.getViewport(1.0).height;
            var dim_scale = width_scale<height_scale?width_scale:height_scale;
            var viewport = page.getViewport(dim_scale / $scope.scale);
            $scope.canvas.width = viewport.width;
            $scope.canvas.height = viewport.height;

            // Render PDF page into canvas context
            page.render({
                canvasContext: $scope.ctx,
                viewport: viewport
            });
        });
    }

    $scope.zoomOut = function() {
        $scope.scale = $scope.scale*1.25;
        $scope.renderPage();
    }

    $scope.zoomIn = function() {
        $scope.scale = $scope.scale*0.8;
        $scope.renderPage();
    }

    $scope.fit = function() {
        $scope.scale = 1.0;
        $scope.renderPage();
    }

    $scope.goPrevious = function() {
        if ($scope.pageNum <= 1) return;
        $scope.scale = 1.0;
        $scope.pageNum--;
        $scope.renderPage();
    }

    $scope.goNext = function() {
        if ($scope.pageNum >= $scope.pageCount) return;
        $scope.scale = 1.0;
        $scope.pageNum++;
        $scope.renderPage();
    }

    PDFJS.getDocument($scope.pdfUrl).then(function(pdfDoc) {
        $scope.pdfDoc = pdfDoc;
        $scope.pageCount = pdfDoc.numPages;
        $scope.renderPage();
    });
};


