angular.module('MaxPolls').controller("registerController", ['$scope', '$location', 'Authenticate', function($scope, $location, Authenticate) {

 
    $scope.user = null;
    $scope.submit = function() {
        console.log($scope.user);
        Authenticate.register($scope.user.username, $scope.user.password).then(function(){
        $location.path("/login");
        console.log($location.path());
        console.log(Authenticate.getUserStatus());
        
        }, function(){ alert("failure!")});
        
        };
}]);