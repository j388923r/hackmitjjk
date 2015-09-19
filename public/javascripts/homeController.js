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

        function activate() { }
    }
})();
