angular.module('MaxPolls', ['ngRoute', 'chart.js', 'mgcrea.ngStrap']).run(function($rootScope, $location, $route, Authenticate) {
    $rootScope.$on('$routeChangeStart',
        function(event, next, current) {
            Authenticate.getUserStatus();
            if (next.access !== undefined) {
                if (next.access.restricted && !Authenticate.isLoggedIn()) {
                    $location.path('/');
                    $route.reload();
                }
            }
        })
});