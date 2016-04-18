angular.module('MaxPolls').controller("userController", ['$scope', '$http', function($scope, $http) {
   
    $http.get('/user').then(function(res) {
        $scope.polls = res.data;
        
    });
}]);