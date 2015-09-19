(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules
        'ngAnimate',
        'ngRoute'

        // Custom modules

        // 3rd Party Modules
    ]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/", {
            controller: 'homeController',
            templateUrl: '/views/home.html'
        });
    });
})();
