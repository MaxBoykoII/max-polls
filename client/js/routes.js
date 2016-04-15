angular.module('MiracleMorning')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "/templates/pages/home/index.html",
                controller: "homeController",
                access: {
                    restricted: false
                }
            })
            .when('/login', {
                templateUrl: "/templates/pages/login/index.html",
                controller: "loginController",
                access: {
                    restricted: false
                }
            })
            .when('/register', {
                templateUrl: "/templates/pages/register/index.html",
                controller: "registerController",
                access: {
                    restricted: false
                }
            })
            .when('/logout', {
                templateUrl: "/templates/pages/logout/index.html",
                controller: "logoutController",
                access: {
                    restricted: true
                }
            })
            .when('/poll/:id', {
                templateUrl: "/templates/pages/poll/index.html",
                controller: "pollController",
                access: {
                    restricted: false
                }
            })
            .when('/user', {
                templateUrl: "/templates/pages/user/index.html",
                controller: 'userController',
                access: {
                    restricted: true
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);