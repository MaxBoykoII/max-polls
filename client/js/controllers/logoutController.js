angular.module('MaxPolls').controller("logoutController", ['$scope', '$location', 'Authenticate', function($scope, $location, Authenticate) {

    $scope.logout = function() {
        Authenticate.logout()
            .then(function() {
                $location.path('/');
                console.log(Authenticate.isLoggedIn());
            });
    }
}]);