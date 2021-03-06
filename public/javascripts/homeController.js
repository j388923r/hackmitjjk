﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', '$http', '$firebaseObject', '$firebaseArray']; 

    function homeController($scope, $http, $firebaseObject, $firebaseArray) {
        $scope.title = 'homeController';
        $scope.descriptors = [];
        $scope.friends = [
            {name: "Jamar", picture: "https://scontent.xx.fbcdn.net/hphotos-xap1/t31.0-8/q84/s960x960/1493600_10202037529565456_346907594199783918_o.jpg"},
            {name: "Kat", picture: "https://scontent.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/11057280_10153613529293044_1594946172306589864_n.jpg?oh=7f40d20a216b0c12dad20056fc430ace&oe=56A2D64A"},
            {name: "Jordan", picture: "https://scontent.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/11011953_10206723096500287_2097854998406405417_n.jpg?oh=df5bc061855d562606f486cbd7d1211c&oe=56A99035"}
        ];
        $scope.me = {name: "Jordan Powell", photo: ""};

        // $scope.friends.pop();
        // $scope.friends.pop();
        $scope.photos = [];

        $http.get('/fbuser').success(function (data) {
            $scope.fbuser = data;
            $scope.me.photo = $scope.fbuser.picture.data.url;
            
            console.log($scope.fbuser.picture.data.url);
            console.log($scope.fbuser);

            var rootUrl = "https://shining-heat-2156.firebaseio.com";
            
            $http.post('/clarifai', { text: $scope.fbuser.picture.data.url }).success(function (data) {
                $scope.descriptors = data[0];

                console.log(data);
            });
            
            var userId = 'jamarbrooks9';
            userId.replace(/\./g, "");
            
            var ref = new Firebase(rootUrl + '/');
            ref.on('value', function (snapshot) {
                console.log(snapshot.val());
                // $scope.friends = snapshot.val();
                console.log($scope.friends, "Friends");
            });
            
            $scope.user = $firebaseObject(ref);
            
            $scope.user.friends = [
                'JordanAPPowell',
                'katxiao'
            ];
            
            $scope.user.$save().then(function (data) {
                 console.log(data);
            });
        });
        


        $scope.clicked = function(){
            // console.log("I'm being clicked alright");
        }

        $("#test").click(function(){
            $scope.me.photo= $("#search").val();
            $scope.clarifai($scope.me.photo);
        })

        $(document).keypress(function(e) {
            if(e.which == 13) {
                $scope.me.photo= $("#search").val();
                $scope.clarifai($scope.me.photo);
            }
        });

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
