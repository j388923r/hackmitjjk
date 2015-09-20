(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', '$http']; 

    function homeController($scope, $http) {
        $scope.title = 'homeController';
        $scope.descriptors = [];

        $scope.clicked = function(){
            // console.log("I'm being clicked alright");
        }

        $("#test").click(function(){
            console.log("Still being clicked");
            var imageLink = $("#search").val();
            $("#image").attr("src", imageLink);
            $scope.clarifai(imageLink);
        })

        $(document).ready(function() {
            $(".fb-image").each(function(index) {
                var rank = $(this).attr("id");
                $(this).css("position", "absolute");
                $(this).css("left", Math.max(rank*500*Math.random(), 5+5*Math.random()));
                $(this).css("top", Math.max(rank*500*Math.random(), 50+5*Math.random()));
            });
        })

        activate();
        
        $scope.analyzeText = function (text) {
            $http.post('/textanalytics', {
                text: text
            }).success(function (analyzedText) {
                var json = $.xml2json(analyzedText);
                console.log(json);           
            });
        }

        $scope.clarifai = function (text){
            $http.post('/clarifai', {
                text: text
            }).success(function(result){
                // console.log(result[0]);
                $scope.descriptors = [];
                $scope.descriptors = result[0];
                console.log(result[0]);
            });
        }

        function activate() { }
    }
})();
