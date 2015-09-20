(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', '$http', '$firebaseObject', '$firebaseArray']; 

    function homeController($scope, $http, $firebaseObject, $firebaseArray) {
        $scope.title = 'homeController';
        $scope.descriptors = [];
        var vars = getUrlVars();
        console.log(vars);
        $http.get('/fbuser?id=').success(function (data) {
            var rootUrl = "https://shining-heat-2156.firebaseio.com";
            
            var userId = 'jamarbrooks9';
            userId.replace(/\./g, "");
            
            var ref = new Firebase(rootUrl + '/');
            ref.on('value', function (snapshot) {
                console.log(snapshot.val());
                $scope.friends = snapshot.val();
                console.log($scope.friends, "Friends");
            });
            
            $scope.user = $firebaseObject(ref);
            
            $scope.user.friends = [
                'JordanAPPowell',
                'katxiao'
            ];
        });
        
        $scope.user.$save().then(function (data) {
            console.log(data);
        });

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
