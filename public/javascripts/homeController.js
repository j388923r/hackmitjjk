(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope']; 

    function homeController($scope) {
        $scope.title = 'homeController';
        $scope.descriptors = [];

        $scope.clicked = function(){
            // console.log("I'm being clicked alright");
        }

        $("#test").click(function(){
            console.log("Still being clicked");
            var imageLink = $("#search").val();
            $("#image").attr("src", imageLink);
        })

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
