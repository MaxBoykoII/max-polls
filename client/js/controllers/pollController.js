angular.module('MaxPolls').controller("pollController", ['$scope', '$routeParams', '$rootScope', function($scope, $routeParams, $rootScope) {
    $scope.id = $routeParams.id;
    $scope.username = $rootScope.username;
     $scope.isLoggedIn = function(){
          if ($rootScope.user === undefined){
              return false;
          }
          else if ($rootScope.user === true){
        return true; 
          }
          else{
              return false;
          }
        
    }
}]);