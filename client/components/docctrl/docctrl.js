angular.module('leukemiapp').controller('docctrl', docctrl);



function docctrl($scope, $stateParams) {

    console.log("DocCtrl "+ JSON.stringify($stateParams));

    $scope.pdfName = $stateParams.url;
    $scope.pdfUrl = "/pdf/"+$stateParams.url+".pdf";
    $scope.canvas = document.getElementById('pdfdocument');
    $scope.ctx = $scope.canvas.getContext('2d');

    $scope.renderPage = function(num) {

        // Update page number
        $scope.pageNum = num;

        // Using promise to fetch the page
        pdfDoc.getPage($scope.pageNum).then(function(page) {
            var viewport = page.getViewport($scope.canvas.width / page.getViewport(1.0).width);
            $scope.canvas.height = viewport.height;
            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }

    $scope.goPrevious = function() {
        if (pageNum <= 1) return;
        pageNum--;
        $scope.renderPage(pageNum);
    }

    $scope.goNext = function() {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        $scope.renderPage(pageNum);
    }

    PDFJS.getDocument($scope.pdfUrl).then(function getPdfHelloWorld(pdfDoc) {
        $scope.pdfDoc = pdfDoc;
        $scope.pageCount = pdfDoc.numPages;
        $scope.renderPage(pageNum);
    });
};

