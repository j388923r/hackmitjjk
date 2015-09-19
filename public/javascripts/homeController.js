(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope']; 

    function homeController($scope) {
        $scope.title = 'homeController';

        activate();
        
        $scope.analyzeText = function (text) {
            $http.post('/textanalytics', {
                text: text
            }).success(function (analyzeText) {
                var json = $.xml2json(xml);
                console.log(json);           
            });
        }

        function activate() { }
    }
})();
