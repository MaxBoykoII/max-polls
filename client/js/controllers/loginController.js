angular.module('MaxPolls').controller("loginController", ['$scope', '$location', 'Authenticate', function($scope, $location, Authenticate) {

 
    $scope.user = null;
    $scope.submit = function() {
        Authenticate.login($scope.user.username, $scope.user.password).then(function(){
        $location.path("/user");
        }, function(){ alert("failure!")});
        
        };
}]);