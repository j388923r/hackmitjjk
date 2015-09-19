(function () {
    'use strict';
    var Clarifai = require('./clarifai-nodejs/clarifai_node.js');
    var CLIENT_ID = "_emnlpbMpvUbpXjRUZUbal7ia0wbworG7KuGJbzb";
    var CLIENT_SECRET = "P_TsClfyYlkQ3_zeG0QJXHlrq6HH341lXMtzqt0x";
    Clarifai.initAPI(CLIENT_ID, CLIENT_SECRET);

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
