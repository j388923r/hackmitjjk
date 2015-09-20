(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','$http']; 

    function homeController($scope, $http) {
        $scope.title = 'homeController';
        $scope.descriptors = [];
        
        var rootUrl = "https://shining-heat-2156.firebaseio.com";

        var ref = new Firebase(rootUrl + '/jamar.brooks.9');
        
        var syncObject = $firebaseObject(ref);
        
        syncObject.$bindTo($scope.data, "data");
        
        $scope.data = {
            friends : [
                "JordanAPPowell",
                "katxiao"
            ]
        };

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
            }).success(function (analyzedText) {
                var json = $.xml2json(analyzedText);
                console.log(json);           
            });
        }

        function activate() { }
    }
})();
